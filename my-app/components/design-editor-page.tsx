"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useMembers } from "@/hooks/use-members";
import { isSameWing } from "@/lib/wing-match";
import ProfileCard from "@/components/profile-card";
import "@/components/ProfileCard.css";
import "./DesignEditor.css";
import {
  type CardStyleOverride,
  DEFAULT_STYLE,
  HOLO_THEMES,
  GRADIENT_PRESETS,
  GLOW_COLORS,
  FONT_PRESETS,
  loadSavedStyles,
  saveAllStyles,
  buildWrapperStyle,
  buildCardVariableStyle,
  normalizeCardStyle,
} from "@/lib/design-card-styles";
import {
  Save,
  X,
  RotateCcw,
  ChevronLeft,
  User,
  Paintbrush,
  Check,
  Crop,
  Move,
} from "lucide-react";

/* ─── Tiny sub-components for the panel ──────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-2 mt-5 first:mt-0">
      {children}
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  const safeValue = Number.isFinite(value) ? value : min;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-400">{label}</span>
        <span className="text-xs font-mono text-purple-300">
          {unit === "x" ? safeValue.toFixed(2) : safeValue}
          {unit !== "x" ? unit : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={safeValue}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer
          bg-zinc-800 accent-purple-500
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-400
          [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-purple-500/30
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-purple-300
          [&::-webkit-slider-thumb]:cursor-pointer"
      />
    </div>
  );
}

/* ─── Interactive crop preview ────────────────── */

/**
 * Shows the FULL member image with a vertical selection box.
 *
 * • Drag TOP / BOTTOM edges to change selection height → controls avatarZoom.
 *   zoom = 100 / selectionHeight%  (full image = zoom 1, half image = zoom 2)
 *
 * • A slider below controls vertical displacement (avatarCropY).
 *
 * Only the portion inside the selection is visible on the card.
 */

const MIN_SEL_H = 33; // minimum selection height %  (max zoom ≈ 3)

type VEdge = "n" | "s" | null;

function CropPreview({
  imageUrl,
  cropY,
  zoom,
  onChangeY,
  onChangeZoom,
}: {
  imageUrl: string;
  cropY: number;   // 0-100
  zoom: number;    // 1-3
  onChangeY: (v: number) => void;
  onChangeZoom: (v: number) => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);

  // Derive selection height from zoom  (selH = 100 / zoom)
  const selH = Math.max(MIN_SEL_H, Math.min(100, 100 / zoom));

  // Derive selection top from cropY (centre of selection at cropY %)
  const selTop = Math.max(0, Math.min(100 - selH, cropY - selH / 2));

  const dragRef = useRef<{
    edge: VEdge;
    startY: number;
    origSelTop: number;
    origSelH: number;
  } | null>(null);

  // Commit zoom from a given selection height
  const commit = useCallback(
    (h: number) => {
      const newZoom = Math.round((100 / h) * 100) / 100; // 2 decimals
      onChangeZoom(Math.max(1, Math.min(3, newZoom)));
    },
    [onChangeZoom],
  );

  // Hit-test: near top edge or bottom edge
  const hitTest = useCallback(
    (clientY: number): VEdge => {
      const el = boxRef.current;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const py = ((clientY - rect.top) / rect.height) * 100;
      const T = 5;

      const nearT = Math.abs(py - selTop) < T;
      const nearB = Math.abs(py - (selTop + selH)) < T;

      if (nearT) return "n";
      if (nearB) return "s";
      return null;
    },
    [selTop, selH],
  );

  const cursorFor = (e: VEdge) =>
    e === "n" || e === "s" ? "ns-resize" : "default";

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const onDown = (ev: PointerEvent) => {
      ev.preventDefault();
      const target = ev.target as HTMLElement | null;
      const forcedEdge = target?.closest("[data-crop-edge]")?.getAttribute("data-crop-edge") as VEdge | null;
      const edge = forcedEdge ?? hitTest(ev.clientY);
      if (!edge) return;
      el.setPointerCapture(ev.pointerId);
      dragRef.current = {
        edge,
        startY: ev.clientY,
        origSelTop: selTop,
        origSelH: selH,
      };
    };

    const onMove = (ev: PointerEvent) => {
      if (!dragRef.current) {
        el.style.cursor = cursorFor(hitTest(ev.clientY));
        return;
      }

      const rect = el.getBoundingClientRect();
      const dy = ((ev.clientY - dragRef.current.startY) / rect.height) * 100;
      const o = dragRef.current;
      const edge = o.edge;

      let h = o.origSelH;

      if (edge === "n") {
        // Drag top edge
        const newTop = Math.max(
          0,
          Math.min(o.origSelTop + o.origSelH - MIN_SEL_H, o.origSelTop + dy),
        );
        h = o.origSelH - (newTop - o.origSelTop);
      } else if (edge === "s") {
        // Drag bottom edge
        h = Math.max(MIN_SEL_H, Math.min(100 - o.origSelTop, o.origSelH + dy));
      }

      commit(h);
    };

    const onUp = () => {
      dragRef.current = null;
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [selTop, selH, hitTest, commit]);

  return (
    <div className="space-y-3">
      {/* Image with vertical selection overlay */}
      <div
        ref={boxRef}
        className="relative rounded-lg overflow-hidden select-none group touch-none bg-black"
      >
        {/* Full un-cropped image */}
        <img
          src={imageUrl}
          alt="Crop preview"
          className="w-full h-auto block"
          draggable={false}
          style={{ minHeight: 120 }}
        />

        {/* Dark overlay ABOVE */}
        <div
          className="absolute left-0 right-0 top-0 bg-black/60 pointer-events-none transition-none"
          style={{ height: `${selTop}%` }}
        />
        {/* Dark overlay BELOW */}
        <div
          className="absolute left-0 right-0 bottom-0 bg-black/60 pointer-events-none transition-none"
          style={{ height: `${100 - selTop - selH}%` }}
        />

        {/* Selection rectangle (full width, variable height) */}
        <div
          className="absolute left-0 right-0 border-y-2 border-dashed border-purple-400 pointer-events-none"
          style={{ top: `${selTop}%`, height: `${selH}%` }}
        >
          {/* Top edge handle bar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-1.5 rounded-full bg-purple-400/80" />
          {/* Bottom edge handle bar */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-1.5 rounded-full bg-purple-400/80" />

          {/* Corner markers */}
          <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-purple-300" />
          <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-purple-300" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-purple-300" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-purple-300" />

          {/* Centre horizontal line */}
          <div className="absolute left-2 right-2 top-1/2 h-px bg-purple-400/30" />
        </div>

        {/* Explicit edge hit-zones for reliable resize */}
        <div
          data-crop-edge="n"
          className="absolute left-0 right-0 z-10 cursor-ns-resize"
          style={{ top: `${Math.max(0, selTop - 2)}%`, height: "4%" }}
        />
        <div
          data-crop-edge="s"
          className="absolute left-0 right-0 z-10 cursor-ns-resize"
          style={{ top: `${Math.max(0, selTop + selH - 2)}%`, height: "4%" }}
        />

        {/* Hint */}
        <div className="absolute inset-x-0 bottom-1 flex justify-center pointer-events-none">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 text-[9px] text-zinc-400
            opacity-0 group-hover:opacity-100 transition-opacity">
            <Move size={9} /> drag top/bottom edges to resize
          </div>
        </div>
      </div>

      {/* Slider for vertical position */}
      <SliderRow
        label="Vertical Position"
        value={cropY}
        min={0}
        max={100}
        unit="%"
        onChange={onChangeY}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Main Export — Design Editor (fullscreen overlay)
   ═══════════════════════════════════════════════ */

export function DesignEditorPage({ onClose }: { onClose: () => void }) {
  const members = useMembers();

  const designMembers = useMemo(
    () =>
      members
        .filter(
          (m) =>
            isSameWing(m.wing, "Design") &&
            !m.isOverallCoordinator &&
            !m.isFacultyCoordinator,
        )
        .sort((a, b) =>
          a.role === "coordinator" && b.role !== "coordinator"
            ? -1
            : b.role === "coordinator" && a.role !== "coordinator"
              ? 1
              : 0,
        ),
    [members],
  );

  /* ── Per-card saved styles ── */
  const [savedStyles, setSavedStyles] = useState<
    Record<string, CardStyleOverride>
  >({});
  useEffect(() => {
    setSavedStyles(loadSavedStyles());
  }, []);

  /* ── Currently editing ── */
  const [editingId, setEditingId] = useState<string | null>(null);
  const [workingStyle, setWorkingStyle] = useState<CardStyleOverride>({
    ...DEFAULT_STYLE,
  });
  const [dirty, setDirty] = useState(false);

  /* ── Auto-select first member when none selected ── */
  useEffect(() => {
    if (!editingId && designMembers.length > 0) {
      const first = designMembers[0];
      setEditingId(first.id);
      const existing = savedStyles[first.id];
      setWorkingStyle(
        existing ? normalizeCardStyle(existing) : { ...DEFAULT_STYLE },
      );
    }
  }, [designMembers]); // eslint-disable-line react-hooks/exhaustive-deps

  const editingMember = useMemo(
    () => designMembers.find((m) => m.id === editingId) ?? null,
    [designMembers, editingId],
  );

  /* ── Actions ── */
  const selectMember = useCallback(
    (id: string) => {
      // Auto-save current before switching
      if (dirty && editingId) {
        const next = { ...savedStyles, [editingId]: workingStyle };
        setSavedStyles(next);
        saveAllStyles(next);
      }
      setEditingId(id);
      const existing = savedStyles[id];
      setWorkingStyle(existing ? normalizeCardStyle(existing) : { ...DEFAULT_STYLE });
      setDirty(false);
    },
    [dirty, editingId, savedStyles, workingStyle],
  );

  const updateStyle = useCallback((patch: Partial<CardStyleOverride>) => {
    setWorkingStyle((prev) => ({ ...prev, ...patch }));
    setDirty(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!editingId) return;
    const next = { ...savedStyles, [editingId]: workingStyle };
    setSavedStyles(next);
    saveAllStyles(next);
    setDirty(false);
  }, [editingId, savedStyles, workingStyle]);

  const handleReset = useCallback(() => {
    setWorkingStyle({ ...DEFAULT_STYLE });
    setDirty(true);
  }, []);

  const handleClose = useCallback(() => {
    if (dirty && editingId) {
      const next = { ...savedStyles, [editingId]: workingStyle };
      setSavedStyles(next);
      saveAllStyles(next);
    }
    onClose();
  }, [dirty, editingId, savedStyles, workingStyle, onClose]);

  /* ── Wrapper CSS vars for the live preview ── */
  const wrapperStyle = useMemo(
    () => buildWrapperStyle(workingStyle),
    [workingStyle],
  );
  const cardVariableStyle = useMemo(
    () => buildCardVariableStyle(workingStyle),
    [workingStyle],
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#06060c] flex flex-col">
      {/* ─── Top Bar ─────────────────────── */}
      <div className="flex items-center justify-between px-4 h-12 bg-[#0c0c14] border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={handleClose}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors text-sm"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <div className="w-px h-5 bg-white/10" />
          <Paintbrush size={16} className="text-purple-400" />
          <span className="text-sm font-semibold text-zinc-200 tracking-wide">
            Design Studio
          </span>
          {editingMember && (
            <span className="text-xs text-zinc-500 hidden sm:inline">
              — {editingMember.name}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {dirty && (
            <span className="text-[10px] text-amber-400/80 mr-1">
              unsaved
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={!dirty || !editingId}
            title="Save"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all
              bg-purple-600/20 text-purple-300 hover:bg-purple-600/40
              disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Save size={13} /> Save
          </button>
          <button
            onClick={handleReset}
            disabled={!editingId}
            title="Reset to default"
            className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-white/5
              disabled:opacity-30 transition-colors"
          >
            <RotateCcw size={14} />
          </button>
          <div className="w-px h-5 bg-white/10 mx-1" />
          <button
            onClick={handleClose}
            title="Close"
            className="p-1.5 rounded-md text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* ─── Main Area ────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ─── Left: Member List ──────────── */}
        <div className="w-56 shrink-0 bg-[#0a0a12] border-r border-white/5 flex flex-col overflow-hidden">
          <div className="px-3 py-3 border-b border-white/5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Members
            </span>
          </div>
          <div className="flex-1 overflow-y-auto de-panel-scroll">
            {designMembers.map((m) => {
              const hasSaved = !!savedStyles[m.id];
              const isActive = editingId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => selectMember(m.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-150 border-l-2
                    ${
                      isActive
                        ? "bg-purple-600/10 border-purple-500 text-zinc-100"
                        : "border-transparent text-zinc-400 hover:bg-white/3 hover:text-zinc-200"
                    }`}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/10 bg-zinc-900">
                    <img
                      src={m.image || "/gravity-logo.png"}
                      alt={m.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/gravity-logo.png";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">
                      {m.name}
                    </div>
                    <div className="text-[10px] opacity-50 capitalize">
                      {m.role}
                    </div>
                  </div>
                  {hasSaved && (
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0"
                      title="Customized"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Center: Canvas with real ProfileCard ── */}
        <div
          className="flex-1 overflow-auto de-canvas-area de-canvas-dots relative"
          style={{ background: "#0c0c16" }}
        >
          {!editingMember ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <User
                  size={48}
                  className="mx-auto text-zinc-700 mb-4"
                  strokeWidth={1}
                />
                <p className="text-zinc-500 text-sm">
                  Select a member to start editing their card
                </p>
                <p className="text-zinc-600 text-[11px] mt-1">
                  Changes are saved per card and appear on the Design page
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-full p-10">
              {/* Wrapper cascades CSS-var overrides into ProfileCard */}
              <div className="relative" style={wrapperStyle}>
                <div
                  className="de-selected-ring"
                  style={{ borderRadius: `${workingStyle.cardRadius}px` }}
                />
                <ProfileCard
                  key={editingId}
                  name={editingMember.name}
                  title={editingMember.bio || editingMember.wing}
                  handle={
                    editingMember.name
                      ?.toLowerCase()
                      .replace(/\s+/g, "") || "member"
                  }
                  status={editingMember.role}
                  contactText="Contact"
                  avatarUrl={editingMember.image || "/gravity-logo.png"}
                  innerGradient={workingStyle.innerGradient}
                  behindGlowColor={workingStyle.behindGlowColor}
                  behindGlowSize={workingStyle.behindGlowSize}
                  styleOverrides={cardVariableStyle}
                  socials={{
                    linkedin: editingMember.socials?.linkedin,
                    instagram: editingMember.socials?.instagram,
                    x: editingMember.socials?.twitter,
                  }}
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                />
              </div>
            </div>
          )}
        </div>

        {/* ─── Right: Properties Panel ────── */}
        {editingMember && (
          <div className="de-right-panel w-72 shrink-0 bg-[#0a0a12] border-l border-white/5 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-300 truncate">
                {editingMember.name}
              </span>
              {dirty && (
                <button
                  onClick={handleSave}
                  className="text-[10px] text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  <Check size={10} /> save
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex-1 overflow-y-auto de-panel-scroll p-4 space-y-1">
              {/* ── Holographic Theme ── */}
              <SectionLabel>Holographic Theme</SectionLabel>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(HOLO_THEMES).map(([key, theme]) => (
                  <button
                    key={key}
                    onClick={() => updateStyle({ holoTheme: key })}
                    title={theme.label}
                    className={`de-theme-btn flex flex-col items-center gap-1 p-1.5 rounded-lg border transition-all
                      ${
                        workingStyle.holoTheme === key
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-white/5 hover:border-purple-500/30 bg-white/2"
                      }`}
                  >
                    <div className="flex w-full h-4 rounded overflow-hidden">
                      <div
                        className="flex-1"
                        style={{ background: theme.preview[0] }}
                      />
                      <div
                        className="flex-1"
                        style={{ background: theme.preview[1] }}
                      />
                    </div>
                    <span className="text-[8px] text-zinc-500 truncate w-full text-center">
                      {theme.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="h-px bg-white/5 my-3" />

              {/* ── Card Gradient ── */}
              <SectionLabel>Card Gradient</SectionLabel>
              <div className="grid grid-cols-4 gap-2">
                {GRADIENT_PRESETS.map((g) => {
                  // make swatch visible by boosting alpha
                  const swatchBg = g.value.replace(
                    /[\d.]+\)(?=\s+\d)/g,
                    "0.6)",
                  );
                  return (
                    <button
                      key={g.id}
                      onClick={() =>
                        updateStyle({ innerGradient: g.value })
                      }
                      title={g.label}
                      className={`h-8 rounded-lg border-2 transition-all duration-200
                        ${
                          workingStyle.innerGradient === g.value
                            ? "border-purple-400 scale-110 shadow-md shadow-purple-500/20"
                            : "border-transparent hover:border-zinc-600 hover:scale-105"
                        }`}
                      style={{ background: swatchBg }}
                    />
                  );
                })}
              </div>

              {/* ── Glow Colour ── */}
              <SectionLabel>Glow Colour</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {GLOW_COLORS.map((c) => {
                  const opaque = c.replace(/[\d.]+\)$/, "1)");
                  return (
                    <button
                      key={c}
                      onClick={() =>
                        updateStyle({ behindGlowColor: c })
                      }
                      className={`w-6 h-6 rounded-full border-2 transition-all duration-200
                        ${
                          workingStyle.behindGlowColor === c
                            ? "border-white scale-125 shadow-lg"
                            : "border-transparent hover:scale-110"
                        }`}
                      style={{ background: opaque }}
                    />
                  );
                })}
              </div>

              {/* ── Glow Size ── */}
              <SectionLabel>Glow Size</SectionLabel>
              <SliderRow
                label="Spread"
                value={Number.parseInt(workingStyle.behindGlowSize, 10)}
                min={10}
                max={70}
                unit="%"
                onChange={(v) =>
                  updateStyle({ behindGlowSize: `${v}%` })
                }
              />

              <div className="h-px bg-white/5 my-3" />

              {/* ── Corner Radius ── */}
              <SectionLabel>Corner Radius</SectionLabel>
              <SliderRow
                label="Roundness"
                value={workingStyle.cardRadius}
                min={4}
                max={40}
                unit="px"
                onChange={(cardRadius) => updateStyle({ cardRadius })}
              />

              {/* ── Scale ── */}
              <SectionLabel>Card Scale</SectionLabel>
              <SliderRow
                label="Size"
                value={workingStyle.scale}
                min={0.8}
                max={1.2}
                step={0.05}
                unit="x"
                onChange={(scale) => updateStyle({ scale })}
              />

              {/* ── Image Crop ── */}
              <SectionLabel>
                <span className="flex items-center gap-1.5">
                  <Crop size={11} /> Image Crop
                </span>
              </SectionLabel>
              <CropPreview
                imageUrl={editingMember.image || "/gravity-logo.png"}
                cropY={workingStyle.avatarCropY}
                zoom={workingStyle.avatarZoom}
                onChangeY={(avatarCropY) => updateStyle({ avatarCropY })}
                onChangeZoom={(avatarZoom) => updateStyle({ avatarZoom })}
              />

              <div className="h-px bg-white/5 my-3" />

              {/* ── Font ── */}
              <SectionLabel>Font Family</SectionLabel>
              <div className="flex gap-1 bg-zinc-900/60 rounded-lg p-1">
                {FONT_PRESETS.map((f) => (
                  <button
                    key={f.label}
                    onClick={() =>
                      updateStyle({ fontFamily: f.value })
                    }
                    className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                      ${
                        workingStyle.fontFamily === f.value
                          ? "bg-purple-600/30 text-purple-300 shadow-sm"
                          : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                      }`}
                    style={{ fontFamily: f.value }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── Status Bar ──────────────────── */}
      <div className="h-7 shrink-0 bg-[#0a0a12] border-t border-white/5 flex items-center px-4 gap-4 text-[10px] text-zinc-500">
        <span>{designMembers.length} members</span>
        <div className="w-px h-3 bg-white/5" />
        <span>
          {editingMember ? `Editing: ${editingMember.name}` : "No selection"}
        </span>
        <div className="w-px h-3 bg-white/5" />
        <span>{Object.keys(savedStyles).length} customized</span>
        <div className="flex-1" />
        <span className="flex items-center gap-1">
          <Paintbrush size={10} /> Design Studio
        </span>
      </div>
    </div>
  );
}
