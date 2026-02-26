"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useMembers } from "@/hooks/use-members";
import { isSameWing } from "@/lib/wing-match";
import type { Member } from "@/lib/types";
import "./FossUbuntu.css";

/* ═══════════════════════════════════════════════
   SVG Icons — Realistic Ubuntu 22.04
   ═══════════════════════════════════════════════ */

const FolderIcon = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="fld" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E8A848" />
        <stop offset="100%" stopColor="#C8862C" />
      </linearGradient>
    </defs>
    <path d="M4 14a4 4 0 014-4h9l4 4h17a4 4 0 014 4v19a4 4 0 01-4 4H8a4 4 0 01-4-4V14z" fill="url(#fld)" />
    <path d="M4 18h40v19a4 4 0 01-4 4H8a4 4 0 01-4-4V18z" fill="#F2C05C" opacity="0.85" />
    <rect x="4" y="18" width="40" height="2" fill="#D9A540" opacity="0.3" />
  </svg>
);

const TerminalIcon = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <rect x="2" y="4" width="44" height="40" rx="6" fill="#300A24" />
    <rect x="2" y="4" width="44" height="10" rx="6" fill="#3C3C3C" />
    <rect x="2" y="10" width="44" height="4" fill="#3C3C3C" />
    <circle cx="10" cy="9" r="2.5" fill="#E95420" />
    <circle cx="17" cy="9" r="2.5" fill="#F5A623" />
    <circle cx="24" cy="9" r="2.5" fill="#4CAF50" />
    <path d="M10 22l7 5.5-7 5.5" stroke="#4ECE4E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 35h16" stroke="#AAA" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CalcIcon = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <rect x="6" y="2" width="36" height="44" rx="6" fill="#3D3D3D" />
    <rect x="10" y="6" width="28" height="12" rx="3" fill="#1A1A1A" />
    <text x="34" y="16" fill="#87CEEB" fontSize="10" fontFamily="monospace" textAnchor="end">0</text>
    {[0, 1, 2].map((r) =>
      [0, 1, 2, 3].map((c) => (
        <rect key={`${r}${c}`} x={11 + c * 8} y={22 + r * 8} width="6" height="6" rx="1.5" fill={c === 3 ? "#DD4814" : "#555"} />
      )),
    )}
    {[0, 1, 2, 3].map((c) => (
      <rect key={`3${c}`} x={11 + c * 8} y={38} width="6" height="6" rx="1.5" fill={c === 3 ? "#DD4814" : "#555"} />
    ))}
  </svg>
);

const NotepadIcon = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <rect x="6" y="2" width="36" height="44" rx="4" fill="#EBEBEB" />
    <rect x="6" y="2" width="36" height="10" fill="#4A4A4A" />
    <rect x="6" y="2" width="36" height="4" rx="4" fill="#4A4A4A" />
    <path d="M12 18h24M12 24h20M12 30h16M12 36h22" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="6" r="1.5" fill="#E95420" />
    <circle cx="14" cy="6" r="1.5" fill="#F5A623" />
    <circle cx="18" cy="6" r="1.5" fill="#4CAF50" />
  </svg>
);

const FirefoxIcon = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <defs>
      <radialGradient id="ffg1" cx="0.3" cy="0.3" r="0.7">
        <stop offset="0%" stopColor="#FFBD4F" />
        <stop offset="50%" stopColor="#FF980E" />
        <stop offset="100%" stopColor="#C13F1A" />
      </radialGradient>
      <radialGradient id="ffg2" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#3DADF2" />
        <stop offset="100%" stopColor="#0078C8" />
      </radialGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#ffg1)" />
    <circle cx="24" cy="24" r="11" fill="url(#ffg2)" />
    <path d="M18 8c2 4 1 8-1 11 4-3 10-3 14 1-2-6 0-10 3-13-4 2-8 2-11-1-2 1-4 1-5 2z" fill="#FF6611" opacity="0.7" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="12" fill="#24292E" />
    <path d="M24 8C15.16 8 8 15.16 8 24c0 7.08 4.58 13.08 10.94 15.18.8.14 1.1-.34 1.1-.76v-2.68c-4.44.96-5.38-2.14-5.38-2.14-.72-1.84-1.78-2.32-1.78-2.32-1.46-1 .1-.98.1-.98 1.6.12 2.46 1.66 2.46 1.66 1.42 2.44 3.74 1.74 4.66 1.32.14-1.04.56-1.74 1.02-2.14-3.54-.4-7.26-1.78-7.26-7.9 0-1.74.62-3.18 1.64-4.3-.16-.4-.72-2.04.16-4.24 0 0 1.34-.42 4.4 1.64a15.14 15.14 0 018 0c3.04-2.06 4.38-1.64 4.38-1.64.88 2.2.32 3.84.16 4.24 1.02 1.12 1.64 2.56 1.64 4.3 0 6.14-3.74 7.48-7.3 7.88.58.5 1.08 1.48 1.08 2.98v4.42c0 .42.28.92 1.1.76C35.42 37.08 40 31.08 40 24c0-8.84-7.16-16-16-16z" fill="#fff" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="12" fill="#0A66C2" />
    <path d="M15 20h4v14h-4V20zm2-6a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm6 6h4v2c.6-1.1 2.2-2.4 4.5-2.4 4.8 0 5.5 3.2 5.5 7.2V34h-4v-6.4c0-1.6 0-3.6-2.2-3.6s-2.6 1.7-2.6 3.5V34h-4.2V20z" fill="#fff" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="12" fill="#4A4A4A" />
    <path d="M24 16a8 8 0 100 16 8 8 0 000-16zm0 12a4 4 0 110-8 4 4 0 010 8z" fill="#DDD" />
    <path d="M41 22h-3.2a14 14 0 00-1-2.5l2.3-2.3-2.8-2.8-2.3 2.3a14 14 0 00-2.5-1V12h-4v3.7a14 14 0 00-2.5 1l-2.3-2.3-2.8 2.8 2.3 2.3a14 14 0 00-1 2.5H18v4h3.2a14 14 0 001 2.5l-2.3 2.3 2.8 2.8 2.3-2.3a14 14 0 002.5 1V36h4v-3.7a14 14 0 002.5-1l2.3 2.3 2.8-2.8-2.3-2.3a14 14 0 001-2.5H41v-4z" fill="#DDD" opacity="0.5" />
  </svg>
);

const FilesIcon = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <rect x="4" y="8" width="40" height="32" rx="4" fill="#4A4A4A" />
    <rect x="4" y="8" width="14" height="32" rx="4" fill="#3D3D3D" />
    <path d="M22 16h18M22 22h18M22 28h14" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="7" y="14" width="8" height="2" rx="1" fill="#888" />
    <rect x="7" y="20" width="8" height="2" rx="1" fill="#E95420" />
    <rect x="7" y="26" width="8" height="2" rx="1" fill="#888" />
    <rect x="7" y="32" width="8" height="2" rx="1" fill="#888" />
  </svg>
);

const SoftwareIcon = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="12" fill="#DD4814" />
    <text x="24" y="32" fill="#fff" fontSize="24" fontFamily="Ubuntu,sans-serif" fontWeight="700" textAnchor="middle">
      A
    </text>
  </svg>
);

const ShowAppsIcon = () => (
  <svg viewBox="0 0 48 48" fill="none">
    {[0, 1, 2].map((r) =>
      [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={10 + c * 10} y={10 + r * 10} width="8" height="8" rx="2" fill="#ccc" />),
    )}
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="8.5" cy="8.5" r="5.5" />
    <path d="M12.5 12.5L17 17" />
  </svg>
);

const UbuntuLogo = () => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="36" fill="#DD4814" />
    <circle cx="40" cy="40" r="12" fill="none" stroke="#fff" strokeWidth="5" />
    <circle cx="40" cy="18" r="5" fill="#fff" />
    <circle cx="21" cy="51" r="5" fill="#fff" />
    <circle cx="59" cy="51" r="5" fill="#fff" />
  </svg>
);

const GravvityCrown = () => (
  <svg viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <ellipse cx="200" cy="290" rx="120" ry="25" stroke="#fff" strokeWidth="4" fill="none" />
    <ellipse cx="200" cy="280" rx="110" ry="8" fill="#fff" opacity="0.3" />
    <path d="M90 280 L70 140 L130 190 L200 100 L270 190 L330 140 L310 280" stroke="#fff" strokeWidth="4" fill="none" />
    <circle cx="200" cy="100" r="8" fill="#fff" opacity="0.5" />
    <circle cx="130" cy="190" r="6" fill="#fff" opacity="0.4" />
    <circle cx="270" cy="190" r="6" fill="#fff" opacity="0.4" />
    <circle cx="100" cy="265" r="5" fill="#fff" opacity="0.3" />
    <circle cx="150" cy="265" r="5" fill="#fff" opacity="0.3" />
    <circle cx="200" cy="265" r="5" fill="#fff" opacity="0.3" />
    <circle cx="250" cy="265" r="5" fill="#fff" opacity="0.3" />
    <circle cx="300" cy="265" r="5" fill="#fff" opacity="0.3" />
    <path d="M85 230 Q50 200 60 160 Q65 140 80 150 Q90 155 85 170 Q80 185 85 200" stroke="#fff" strokeWidth="2.5" fill="none" opacity="0.4" />
    <path d="M315 230 Q350 200 340 160 Q335 140 320 150 Q310 155 315 170 Q320 185 315 200" stroke="#fff" strokeWidth="2.5" fill="none" opacity="0.4" />
  </svg>
);

/* ═══════════════════════════════════════════════
   System Tray Icons
   ═══════════════════════════════════════════════ */

const WifiIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 12.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm-4-3a5.5 5.5 0 018 0l-1.2 1.2a3.8 3.8 0 00-5.6 0L4 9.5zm-2.5-2.5a8.5 8.5 0 0113 0l-1.2 1.2a7 7 0 00-10.6 0L1.5 7z" />
  </svg>
);

const VolumeIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M3 5.5v5h3l4 3V2.5l-4 3H3zm9-.3v5.6a3.5 3.5 0 000-5.6z" />
  </svg>
);

const BatteryIcon = () => (
  <svg viewBox="0 0 20 16" fill="currentColor">
    <rect x="1" y="3" width="16" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3" y="5" width="10" height="6" rx="1" fill="currentColor" opacity="0.8" />
    <rect x="17" y="6" width="2" height="4" rx="0.5" fill="currentColor" />
  </svg>
);

const PowerIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1v6M4.2 3.8a6 6 0 107.6 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ═══════════════════════════════════════════════
   Wallpaper Definitions
   ═══════════════════════════════════════════════ */

interface WallpaperDef {
  id: string;
  name: string;
  css: string;
  thumb: string; // small gradient for thumbnail
}

const WALLPAPERS: WallpaperDef[] = [
  {
    id: "ubuntu-default",
    name: "Ubuntu Default",
    css: "radial-gradient(ellipse at 65% 50%, rgba(180,60,100,0.35) 0%, transparent 60%), linear-gradient(135deg, #2c001e 0%, #5a1040 25%, #77216f 40%, #5e2750 55%, #c84b31 85%, #e95420 100%)",
    thumb: "linear-gradient(135deg, #2c001e 0%, #77216f 40%, #e95420 100%)",
  },
  {
    id: "mountain-lake",
    name: "Mountain Lake",
    css: "linear-gradient(to bottom, #1a3a5c 0%, #3d7eaa 30%, #87ceeb 50%, #6bb3c9 55%, #1a5276 70%, #0d3b66 100%)",
    thumb: "linear-gradient(to bottom, #1a3a5c, #87ceeb 50%, #0d3b66)",
  },
  {
    id: "sunset-volcano",
    name: "Sunset Volcano",
    css: "radial-gradient(ellipse at 50% 70%, #8b2500 0%, transparent 50%), linear-gradient(to bottom, #ff6b35 0%, #f7931e 30%, #cc4400 60%, #661100 100%)",
    thumb: "linear-gradient(to bottom, #ff6b35, #cc4400, #661100)",
  },
  {
    id: "northern-lights",
    name: "Northern Lights",
    css: "radial-gradient(ellipse at 40% 40%, #00ff88 0%, transparent 50%), radial-gradient(ellipse at 60% 60%, #0088ff 0%, transparent 50%), linear-gradient(to bottom, #0a1628 0%, #0d2137 40%, #1a4a2e 70%, #0a1628 100%)",
    thumb: "linear-gradient(to bottom, #0a1628, #0d4d2a, #0a1628)",
  },
  {
    id: "pink-gradient",
    name: "Pink Haze",
    css: "radial-gradient(ellipse at 30% 40%, #ff69b4 0%, transparent 60%), linear-gradient(135deg, #2c001e 0%, #8b0a50 40%, #ff1493 70%, #c71585 100%)",
    thumb: "linear-gradient(135deg, #2c001e, #ff1493, #c71585)",
  },
  {
    id: "desert-canyon",
    name: "Desert Canyon",
    css: "radial-gradient(ellipse at 50% 80%, #8b4513 0%, transparent 50%), linear-gradient(to bottom, #ff8c42 0%, #e76f51 30%, #994400 60%, #641e16 100%)",
    thumb: "linear-gradient(to bottom, #ff8c42, #994400, #641e16)",
  },
  {
    id: "cosmic",
    name: "Cosmic",
    css: "radial-gradient(ellipse at 30% 30%, #ff00ff33 0%, transparent 40%), radial-gradient(ellipse at 70% 70%, #00ffff33 0%, transparent 40%), linear-gradient(135deg, #0a0015 0%, #1a0a2e 30%, #2d1b69 50%, #0a0015 100%)",
    thumb: "linear-gradient(135deg, #0a0015, #2d1b69, #0a0015)",
  },
  {
    id: "neon-wave",
    name: "Neon Wave",
    css: "radial-gradient(ellipse at 50% 50%, rgba(0,255,200,0.15) 0%, transparent 60%), linear-gradient(180deg, #0d0d0d 0%, #1a0033 30%, #330066 50%, #0d0d0d 100%)",
    thumb: "linear-gradient(180deg, #0d0d0d, #330066, #0d0d0d)",
  },
  {
    id: "ocean-deep",
    name: "Ocean Deep",
    css: "radial-gradient(ellipse at 50% 30%, #005f73 0%, transparent 60%), linear-gradient(to bottom, #001219 0%, #005f73 40%, #0a9396 60%, #001219 100%)",
    thumb: "linear-gradient(to bottom, #001219, #0a9396, #001219)",
  },
  {
    id: "gravvity-crown",
    name: "Gravvity Dark",
    css: "radial-gradient(ellipse at 50% 50%, #1a1a2e 0%, #0a0a0a 100%)",
    thumb: "radial-gradient(ellipse at 50% 50%, #1a1a2e, #0a0a0a)",
  },
  {
    id: "amber-hills",
    name: "Amber Hills",
    css: "radial-gradient(ellipse at 60% 70%, #b8860b 0%, transparent 50%), linear-gradient(to bottom, #ffb347 0%, #ff8c00 40%, #cc5500 70%, #331400 100%)",
    thumb: "linear-gradient(to bottom, #ffb347, #cc5500, #331400)",
  },
  {
    id: "forest",
    name: "Forest",
    css: "radial-gradient(ellipse at 50% 40%, #228B22 0%, transparent 60%), linear-gradient(to bottom, #0b3d0b 0%, #1a5e1a 30%, #2d8b2d 50%, #0b3d0b 100%)",
    thumb: "linear-gradient(to bottom, #0b3d0b, #2d8b2d, #0b3d0b)",
  },
];

/* ═══════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════ */

interface WindowState {
  id: string;
  type: "member" | "calculator" | "notepad" | "firefox" | "terminal" | "settings";
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minimized: boolean;
  member?: Member;
}

interface DesktopIconPos {
  id: string;
  x: number;
  y: number;
}

const ICON_DRAG_THRESHOLD = 6;
const DESKTOP_ICON_SIZE = 88;
const ICONS_AREA_LEFT_OFFSET = 76;
const ICONS_AREA_RIGHT_OFFSET = 10;
const ICONS_AREA_TOP_OFFSET = 34;
const ICONS_AREA_BOTTOM_OFFSET = 10;

/* ═══════════════════════════════════════════════
   Boot Screen
   ═══════════════════════════════════════════════ */

function BootScreen({ onDone }: { onDone: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 2800);
    const t2 = setTimeout(onDone, 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div className={`ubuntu-boot ${fadeOut ? "fade-out" : ""}`}>
      <div className="ubuntu-logo">
        <UbuntuLogo />
      </div>
      <div className="ubuntu-boot-dots">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="ubuntu-boot-text">Ubuntu 24.04 LTS — FOSS Wing</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Window Component
   ═══════════════════════════════════════════════ */

function UbuntuWindow({
  win,
  focused,
  onFocus,
  onClose,
  onMinimize,
  onDragStart,
  children,
}: {
  win: WindowState;
  focused: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onDragStart: (e: React.PointerEvent) => void;
  children: React.ReactNode;
}) {
  if (win.minimized) return null;

  return (
    <div className={`ubuntu-window ${focused ? "focused" : ""}`} style={{ left: win.x, top: win.y, width: win.w, height: win.h }} onPointerDown={onFocus}>
      <div className="ubuntu-window-titlebar" onPointerDown={onDragStart}>
        <div className="ubuntu-window-controls">
          <span
            className="wc-close"
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClose();
            }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />
          <span
            className="wc-min"
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onMinimize();
            }}
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
          />
          <span
            className="wc-max"
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          />
        </div>
        <div className="ubuntu-window-title">{win.title}</div>
      </div>
      <div className="ubuntu-window-body">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   App: Interactive Terminal
   ═══════════════════════════════════════════════ */

interface TermLine {
  type: "prompt" | "output" | "error" | "divider" | "ascii" | "image";
  content: string;
  prompt?: string;
  imageSrc?: string;
  imageAlt?: string;
}

function TerminalApp({ initialMember, fossMembers }: { initialMember?: Member; fossMembers: Member[] }) {
  const [lines, setLines] = useState<TermLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLines = useCallback((newLines: TermLine[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const neofetch = useCallback((): TermLine[] => {
    return [
      { type: "ascii", content: "            .-/+oossssoo+/-." },
      { type: "ascii", content: "        `:+ssssssssssssssssss+:`" },
      { type: "ascii", content: "      -+ssssssssssssssssssyyssss+-      OS: Ubuntu 24.04 LTS (FOSS Wing)" },
      { type: "ascii", content: "    .ossssssssssssssssss" + "dMMMNy" + "sssso.    Host: Gravvity — IIITA" },
      { type: "ascii", content: "   /sssssssssss" + "hdmmNNmmyNMMMMh" + "ssssss/   Kernel: 6.8.0-gravvity" },
      { type: "ascii", content: "  +sssssssss" + "hmydMMMMMMMNddddy" + "ssssssss+  Uptime: ∞" },
      { type: "ascii", content: " /ssssssss" + "hNMMMyhhyyy" + "hmmmho" + "ssssssssss/ Shell: bash 5.2.21" },
      { type: "ascii", content: ".ssssssss" + "dMMMNh" + "ssssssssss" + "mNMMMs" + "sssssss. Terminal: gnome-terminal" },
      { type: "ascii", content: "+ssss" + "hhhyNMMNy" + "ssssssssssss" + "mNMMMo" + "ssssss+ CPU: FOSS@∞GHz" },
      { type: "ascii", content: "oss" + "yNMMMNyMMh" + "ssssssssssssss" + "mNMMN" + "osssss  Memory: 16GB / ∞" },
      { type: "ascii", content: "+ssss" + "hhhyNMMNy" + "ssssssssssss" + "mNMMMo" + "ssssss+ Members: " + fossMembers.length },
      { type: "ascii", content: ".ssssssss" + "dMMMNh" + "ssssssssss" + "mNMMMs" + "sssssss." },
      { type: "ascii", content: " /ssssssss" + "hNMMMyhhyyy" + "hmmmho" + "ssssssssss/" },
      { type: "ascii", content: "  +sssssssss" + "dmydMMMMMMMNddddy" + "ssssssss+" },
      { type: "ascii", content: "   /sssssssssss" + "hdmNNNNmyNMMMMh" + "ssssss/" },
      { type: "ascii", content: "    .osssssssssssssssss" + "dMMMNy" + "sssso." },
      { type: "ascii", content: "      -+sssssssssssssssss" + "yyy" + "ssss+-" },
      { type: "ascii", content: "        `:+ssssssssssssssssss+:`" },
      { type: "ascii", content: "            .-/+oossssoo+/-." },
    ];
  }, [fossMembers.length]);

  // Show initial content
  useEffect(() => {
    const initLines: TermLine[] = [
      { type: "output", content: "Welcome to Ubuntu 24.04 LTS (FOSS Wing Edition)" },
      { type: "output", content: "Gravvity — Indian Institute of Information Technology, Allahabad" },
      { type: "output", content: "─".repeat(56) },
      { type: "output", content: "" },
    ];

    if (initialMember) {
      initLines.push(
        { type: "prompt", content: `cat /home/foss/members/${initialMember.name.toLowerCase().replace(/\s+/g, "_")}`, prompt: "foss@gravvity:~$ " },
        { type: "divider", content: "" },
      );
      if (initialMember.image) {
        initLines.push({ type: "image", content: "", imageSrc: initialMember.image, imageAlt: initialMember.name });
      }
      initLines.push(
        { type: "output", content: `  Name     : ${initialMember.name}` },
        { type: "output", content: `  Role     : ${initialMember.role === "coordinator" ? "Coordinator" : "Member"}` },
        { type: "output", content: `  Wing     : ${initialMember.wing || "FOSS"}` },
      );
      if (initialMember.bio) initLines.push({ type: "output", content: `  Bio      : ${initialMember.bio}` });
      if (initialMember.socials?.github) initLines.push({ type: "output", content: `  GitHub   : ${initialMember.socials.github}` });
      if (initialMember.socials?.linkedin) initLines.push({ type: "output", content: `  LinkedIn : ${initialMember.socials.linkedin}` });
      initLines.push({ type: "divider", content: "" }, { type: "output", content: "" });
    } else {
      initLines.push(...neofetch(), { type: "output", content: "" }, { type: "output", content: 'Type "help" for available commands.' }, { type: "output", content: "" });
    }

    setLines(initLines);
  }, [initialMember, neofetch]);

  useEffect(() => {
    const output = outputRef.current;
    if (!output) return;
    output.scrollTop = output.scrollHeight;
  }, [lines]);

  useEffect(() => {
    if (!inputRef.current) return;
    try {
      inputRef.current.focus({ preventScroll: true });
    } catch {
      inputRef.current.focus();
    }
  }, []);

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      const promptLine: TermLine = { type: "prompt", content: trimmed, prompt: "foss@gravvity:~$ " };
      const newLines: TermLine[] = [promptLine];

      if (!trimmed) {
        addLines(newLines);
        return;
      }
      setHistory((prev) => [...prev, trimmed]);
      setHistIdx(-1);

      const parts = trimmed.split(/\s+/);
      const command = parts[0].toLowerCase();

      switch (command) {
        case "help":
          newLines.push(
            { type: "output", content: "" },
            { type: "output", content: "Available commands:" },
            { type: "output", content: "  ls              — List members" },
            { type: "output", content: "  cat <name>      — View member info" },
            { type: "output", content: "  whoami          — Current user" },
            { type: "output", content: "  pwd             — Print working directory" },
            { type: "output", content: "  neofetch        — System info" },
            { type: "output", content: "  uname -a        — Kernel info" },
            { type: "output", content: "  date            — Current date/time" },
            { type: "output", content: "  echo <text>     — Print text" },
            { type: "output", content: "  clear           — Clear terminal" },
            { type: "output", content: "  tree            — Show directory tree" },
            { type: "output", content: "  fortune         — Random quote" },
            { type: "output", content: "  cowsay <text>   — ASCII cow" },
            { type: "output", content: "  sudo <cmd>      — Run as root" },
            { type: "output", content: "" },
          );
          break;

        case "ls":
          newLines.push({ type: "output", content: "" });
          fossMembers.forEach((m) => {
            const isCoord = m.role === "coordinator";
            newLines.push({ type: "output", content: `  📁 ${m.name}${isCoord ? " [Coordinator]" : ""}` });
          });
          newLines.push({ type: "output", content: `\n  Total: ${fossMembers.length} member(s)` }, { type: "output", content: "" });
          break;

        case "cat": {
          const nameQuery = parts.slice(1).join(" ").toLowerCase().replace(/[/_]/g, " ");
          if (!nameQuery) {
            newLines.push({ type: "error", content: "Usage: cat <member_name>" });
            break;
          }
          const member = fossMembers.find((m) => m.name.toLowerCase().includes(nameQuery));
          if (!member) {
            newLines.push({ type: "error", content: `cat: No member found matching '${parts.slice(1).join(" ")}'` });
            break;
          }
          newLines.push({ type: "divider", content: "" });
          if (member.image) {
            newLines.push({ type: "image", content: "", imageSrc: member.image, imageAlt: member.name });
          }
          newLines.push(
            { type: "output", content: `  Name     : ${member.name}` },
            { type: "output", content: `  Role     : ${member.role === "coordinator" ? "Coordinator" : "Member"}` },
            { type: "output", content: `  Wing     : ${member.wing || "FOSS"}` },
          );
          if (member.bio) newLines.push({ type: "output", content: `  Bio      : ${member.bio}` });
          if (member.socials?.github) newLines.push({ type: "output", content: `  GitHub   : ${member.socials.github}` });
          if (member.socials?.linkedin) newLines.push({ type: "output", content: `  LinkedIn : ${member.socials.linkedin}` });
          if (member.socials?.twitter) newLines.push({ type: "output", content: `  Twitter  : ${member.socials.twitter}` });
          newLines.push({ type: "divider", content: "" }, { type: "output", content: "" });
          break;
        }

        case "whoami":
          newLines.push({ type: "output", content: "foss" });
          break;

        case "pwd":
          newLines.push({ type: "output", content: "/home/foss/members" });
          break;

        case "neofetch":
          newLines.push({ type: "output", content: "" }, ...neofetch(), { type: "output", content: "" });
          break;

        case "uname":
          newLines.push({ type: "output", content: "Linux gravvity-foss 6.8.0-gravvity #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux" });
          break;

        case "date":
          newLines.push({ type: "output", content: new Date().toString() });
          break;

        case "echo":
          newLines.push({ type: "output", content: parts.slice(1).join(" ") });
          break;

        case "clear":
          setLines([]);
          return;

        case "tree":
          newLines.push(
            { type: "output", content: "/home/foss/members" },
            { type: "output", content: "├── coordinators/" },
          );
          fossMembers
            .filter((m) => m.role === "coordinator")
            .forEach((m, i, arr) => {
              newLines.push({ type: "output", content: `│   ${i === arr.length - 1 ? "└" : "├"}── ${m.name.toLowerCase().replace(/\s+/g, "_")}` });
            });
          newLines.push({ type: "output", content: "└── members/" });
          fossMembers
            .filter((m) => m.role !== "coordinator")
            .forEach((m, i, arr) => {
              newLines.push({ type: "output", content: `    ${i === arr.length - 1 ? "└" : "├"}── ${m.name.toLowerCase().replace(/\s+/g, "_")}` });
            });
          newLines.push({ type: "output", content: "" });
          break;

        case "fortune": {
          const quotes = [
            '"Talk is cheap. Show me the code." — Linus Torvalds',
            '"Free software is a matter of liberty, not price." — Richard Stallman',
            '"Given enough eyeballs, all bugs are shallow." — Eric S. Raymond',
            '"Any fool can write code that a computer can understand." — Martin Fowler',
            '"First, solve the problem. Then, write the code." — John Johnson',
            '"The best way to predict the future is to invent it." — Alan Kay',
            '"In open source, we feel strongly that to really do something well, you have to get a lot of people involved." — Linus Torvalds',
          ];
          newLines.push({ type: "output", content: "" }, { type: "output", content: quotes[Math.floor(Math.random() * quotes.length)] }, { type: "output", content: "" });
          break;
        }

        case "cowsay": {
          const msg = parts.slice(1).join(" ") || "Moo! FOSS is freedom!";
          const border = "─".repeat(msg.length + 2);
          newLines.push(
            { type: "output", content: ` ┌${border}┐` },
            { type: "output", content: ` │ ${msg} │` },
            { type: "output", content: ` └${border}┘` },
            { type: "output", content: "        \\   ^__^" },
            { type: "output", content: "         \\  (oo)\\_______" },
            { type: "output", content: "            (__)\\       )\\/\\" },
            { type: "output", content: "                ||----w |" },
            { type: "output", content: "                ||     ||" },
            { type: "output", content: "" },
          );
          break;
        }

        case "sudo":
          newLines.push({ type: "error", content: "Nice try! But this is a simulated terminal 😄" });
          break;

        case "exit":
          newLines.push({ type: "output", content: "Can't exit — you're in the FOSS zone forever! 🐧" });
          break;

        case "apt":
        case "apt-get":
          newLines.push({ type: "output", content: "E: Unable to locate package. This is a simulation!" });
          break;

        case "rm":
          newLines.push({ type: "error", content: "Permission denied. No deleting in the simulation!" });
          break;

        default:
          newLines.push({ type: "error", content: `bash: ${command}: command not found. Type 'help' for available commands.` });
      }

      addLines(newLines);
    },
    [fossMembers, addLines, neofetch],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
        setHistIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx >= 0) {
        const newIdx = histIdx + 1;
        if (newIdx >= history.length) {
          setHistIdx(-1);
          setInput("");
        } else {
          setHistIdx(newIdx);
          setInput(history[newIdx]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Tab completion for member names
      const partial = input.trim().toLowerCase();
      if (partial.startsWith("cat ")) {
        const namePartial = partial.slice(4);
        const match = fossMembers.find((m) => m.name.toLowerCase().startsWith(namePartial));
        if (match) setInput("cat " + match.name.toLowerCase().replace(/\s+/g, "_"));
      }
    }
  };

  return (
    <div className="ubuntu-terminal-app" onClick={() => inputRef.current?.focus()}>
      <div ref={outputRef} className="terminal-output">
        {lines.map((line, i) => {
          if (line.type === "divider") return <div key={i} className="term-line-divider" />;
          if (line.type === "prompt")
            return (
              <div key={i} className="term-line">
                <span className="term-prompt-text">{line.prompt}</span>
                <span className="term-cmd-text">{line.content}</span>
              </div>
            );
          if (line.type === "error")
            return (
              <div key={i} className="term-line term-error">
                {line.content}
              </div>
            );
          if (line.type === "ascii")
            return (
              <div key={i} className="term-line term-ascii">
                {line.content}
              </div>
            );
          if (line.type === "image" && line.imageSrc)
            return (
              <div key={i} className="term-line term-image-row">
                <img src={line.imageSrc} alt={line.imageAlt || "Member"} className="term-member-image" />
              </div>
            );
          return (
            <div key={i} className="term-line">
              {line.content}
            </div>
          );
        })}
        <div className="term-input-line">
          <span className="term-prompt-text">foss@gravvity:~$ </span>
          <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} className="term-input" spellCheck={false} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   App: Calculator
   ═══════════════════════════════════════════════ */

function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [fresh, setFresh] = useState(true);

  const input = (val: string) => {
    if (fresh) {
      setDisplay(val);
      setFresh(false);
    } else setDisplay(display === "0" ? val : display + val);
  };
  const doOp = (nextOp: string) => {
    const cur = parseFloat(display);
    if (prev !== null && op) {
      let res = prev;
      if (op === "+") res = prev + cur;
      else if (op === "-") res = prev - cur;
      else if (op === "×") res = prev * cur;
      else if (op === "÷") res = cur !== 0 ? prev / cur : 0;
      setDisplay(String(parseFloat(res.toFixed(10))));
      setPrev(res);
    } else {
      setPrev(cur);
    }
    setOp(nextOp);
    setFresh(true);
  };
  const equals = () => {
    if (prev === null || !op) return;
    doOp(op);
    setOp(null);
  };
  const clear = () => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setFresh(true);
  };

  const buttons = [
    { label: "C", cls: "clear", action: clear },
    { label: "±", action: () => setDisplay(String(-parseFloat(display))) },
    { label: "%", action: () => setDisplay(String(parseFloat(display) / 100)) },
    { label: "÷", cls: "op", action: () => doOp("÷") },
    { label: "7", action: () => input("7") },
    { label: "8", action: () => input("8") },
    { label: "9", action: () => input("9") },
    { label: "×", cls: "op", action: () => doOp("×") },
    { label: "4", action: () => input("4") },
    { label: "5", action: () => input("5") },
    { label: "6", action: () => input("6") },
    { label: "-", cls: "op", action: () => doOp("-") },
    { label: "1", action: () => input("1") },
    { label: "2", action: () => input("2") },
    { label: "3", action: () => input("3") },
    { label: "+", cls: "op", action: () => doOp("+") },
    { label: "0", action: () => input("0") },
    { label: ".", action: () => { if (!display.includes(".")) setDisplay(display + "."); } },
    { label: "⌫", action: () => setDisplay(display.length > 1 ? display.slice(0, -1) : "0") },
    { label: "=", cls: "op", action: equals },
  ];

  return (
    <div className="ubuntu-calc">
      <div className="ubuntu-calc-display">{display}</div>
      <div className="ubuntu-calc-grid">
        {buttons.map((b) => (
          <button key={b.label} className={`ubuntu-calc-btn ${b.cls || ""}`} onClick={b.action}>
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   App: Improved Notepad
   ═══════════════════════════════════════════════ */

function NotepadApp() {
  const [text, setText] = useState(
    `#!/bin/bash
# ──────────────────────────────────────
# FOSS Wing — Welcome Script
# Gravvity, IIITA
# ──────────────────────────────────────

echo "Welcome to the FOSS Wing!"
echo "Free and Open Source Software"
echo ""

# Why FOSS matters:
# - Transparency & Security
# - Community Collaboration  
# - Freedom to Innovate
# - Knowledge Sharing

MEMBERS=$(ls /home/foss/members | wc -l)
echo "Active members: $MEMBERS"

# Start contributing today!
echo "Happy hacking! 🐧"
`,
  );
  const [fileName, setFileName] = useState("welcome.sh");
  const [saved, setSaved] = useState(true);
  const [wordWrap, setWordWrap] = useState(true);

  const lineCount = text.split("\n").length;

  const handleChange = (val: string) => {
    setText(val);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    // Simulate save
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newText = text.substring(0, start) + "  " + text.substring(end);
      setText(newText);
      setSaved(false);
      // Set cursor position after React re-render
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
    if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="ubuntu-notepad-v2">
      {/* Header bar */}
      <div className="notepad-header">
        <div className="notepad-tabs">
          <div className="notepad-tab active">
            <span className="notepad-tab-name">{fileName}</span>
            {!saved && <span className="notepad-unsaved-dot" />}
          </div>
        </div>
        <div className="notepad-header-actions">
          <button className="notepad-action-btn" onClick={handleSave} title="Save (Ctrl+S)">
            💾
          </button>
          <button className="notepad-action-btn" onClick={() => setWordWrap(!wordWrap)} title="Toggle word wrap">
            ↩
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="notepad-toolbar">
        <div className="notepad-toolbar-group">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Search</span>
          <span>Help</span>
        </div>
        <div className="notepad-toolbar-info">
          <span>Ln {lineCount}</span>
          <span>UTF-8</span>
          <span>Bash</span>
        </div>
      </div>

      {/* Editor area with line numbers */}
      <div className="notepad-editor-area">
        <div className="notepad-line-numbers">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="notepad-line-num">
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          style={{ whiteSpace: wordWrap ? "pre-wrap" : "pre" }}
          className="notepad-textarea"
        />
      </div>

      {/* Status bar */}
      <div className="notepad-statusbar">
        <span>{fileName}</span>
        <span>{saved ? "Saved" : "Modified"}</span>
        <span>{text.length} characters</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   App: Firefox Browser
   ═══════════════════════════════════════════════ */

const GRAVVITY_WING_RESULTS = [
  { slug: "foss", name: "FOSS Wing", path: "/members/foss", keywords: ["open source", "linux", "oss"] },
  { slug: "design", name: "Design Wing", path: "/members/design", keywords: ["ui", "ux", "graphics", "creative"] },
  { slug: "metaverse", name: "Metaverse Wing", path: "/members/metaverse", keywords: ["ar", "vr", "3d", "xr"] },
  { slug: "private-ai", name: "Private AI Wing", path: "/members/private-ai", keywords: ["ai", "ml", "llm", "agents"] },
  { slug: "web-development", name: "Web Development Wing", path: "/members/web-development", keywords: ["frontend", "backend", "web"] },
  { slug: "blockchain", name: "Blockchain Wing", path: "/members/blockchain", keywords: ["web3", "smart contract", "crypto"] },
  { slug: "competitive-coding", name: "Competitive Coding Wing", path: "/members/competitive-coding", keywords: ["cp", "dsa", "algorithms"] },
];

function FirefoxApp() {
  const [url, setUrl] = useState("https://www.google.com/webhp?igu=1");
  const [inputUrl, setInputUrl] = useState("https://www.google.com");
  const [wingResults, setWingResults] = useState<typeof GRAVVITY_WING_RESULTS>([]);
  const [showWingResults, setShowWingResults] = useState(false);

  const runWingSearch = (query: string) => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      setWingResults([]);
      setShowWingResults(false);
      return;
    }

    const genericSocietyQuery = ["gravvity", "gravity", "wing", "wings", "member", "members", "society"].some((token) => normalized.includes(token));

    const matches = genericSocietyQuery
      ? GRAVVITY_WING_RESULTS
      : GRAVVITY_WING_RESULTS.filter(
          (wing) =>
            wing.name.toLowerCase().includes(normalized) ||
            wing.slug.includes(normalized) ||
            wing.keywords.some((keyword) => keyword.includes(normalized)),
        );

    setWingResults(matches);
    setShowWingResults(true);
    setUrl("");
  };

  const openWingLink = (path: string) => {
    setShowWingResults(false);
    setUrl(path);
    setInputUrl(path);
  };

  const navigate = () => {
    const raw = inputUrl.trim();
    if (!raw) {
      setUrl("");
      setShowWingResults(false);
      return;
    }

    const looksLikeUrl = raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("/") || raw.includes(".");
    if (looksLikeUrl) {
      const resolvedUrl = raw.startsWith("http") || raw.startsWith("/") ? raw : `https://${raw}`;
      setShowWingResults(false);
      setUrl(resolvedUrl);
      return;
    }

    runWingSearch(raw);
  };

  return (
    <div className="ubuntu-firefox">
      <div className="ubuntu-firefox-toolbar">
        <button className="ff-nav-btn" onClick={() => setUrl("")}>
          ←
        </button>
        <button className="ff-nav-btn" onClick={navigate}>
          →
        </button>
        <button className="ff-nav-btn" onClick={navigate}>
          ↻
        </button>
        <input className="ubuntu-firefox-urlbar" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && navigate()} placeholder="Search or enter address" />
      </div>
      <div className="ubuntu-firefox-body">
        {showWingResults ? (
          <div className="wing-search-results">
            <div className="wing-search-title">Gravvity Wings</div>
            {wingResults.length > 0 ? (
              wingResults.map((wing) => (
                <button key={wing.slug} className="wing-search-item" onClick={() => openWingLink(wing.path)}>
                  <div className="wing-search-item-title">{wing.name}</div>
                  <div className="wing-search-item-link">{wing.path}</div>
                </button>
              ))
            ) : (
              <div className="wing-search-empty">No matching wing found. Try: foss, design, metaverse, ai, web, blockchain, cp.</div>
            )}
          </div>
        ) : url ? (
          <iframe src={url} title="Firefox" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
        ) : (
          <div className="ubuntu-firefox-placeholder">
            <FirefoxIcon />
            <span>Search Gravvity wings (example: foss, design, ai) or enter a URL</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   App: Settings / Appearance Panel
   ═══════════════════════════════════════════════ */

const ACCENT_COLORS = [
  { id: "orange", color: "#e95420" },
  { id: "bark", color: "#787c63" },
  { id: "sage", color: "#657b51" },
  { id: "olive", color: "#8a9441" },
  { id: "viridian", color: "#03875c" },
  { id: "teal", color: "#308280" },
  { id: "blue", color: "#0073e5" },
  { id: "purple", color: "#7764d8" },
  { id: "magenta", color: "#b34cb3" },
  { id: "red", color: "#da3450" },
];

function AppearanceSettings({
  selectedWallpaper,
  onSelectWallpaper,
  accentColor,
  onSelectAccent,
  isDark,
  onToggleDark,
  customWallpaper,
  onSetCustomWallpaper,
}: {
  selectedWallpaper: string;
  onSelectWallpaper: (id: string) => void;
  accentColor: string;
  onSelectAccent: (color: string) => void;
  isDark: boolean;
  onToggleDark: () => void;
  customWallpaper: string | null;
  onSetCustomWallpaper: (url: string | null) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        onSetCustomWallpaper(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="settings-appearance">
      <h2 className="settings-title">Appearance</h2>

      {/* Style section */}
      <div className="settings-section">
        <h3 className="settings-section-label">Style</h3>
        <div className="settings-style-row">
          <div className={`settings-style-option ${!isDark ? "selected" : ""}`} onClick={() => isDark && onToggleDark()}>
            <div className="style-preview light">
              <div className="style-preview-window" />
            </div>
            <span>Default</span>
          </div>
          <div className={`settings-style-option ${isDark ? "selected" : ""}`} onClick={() => !isDark && onToggleDark()}>
            <div className="style-preview dark">
              <div className="style-preview-window" />
            </div>
            <span>Dark</span>
          </div>
        </div>
      </div>

      {/* Color accent section */}
      <div className="settings-section">
        <h3 className="settings-section-label">Color</h3>
        <div className="settings-color-row">
          {ACCENT_COLORS.map((c) => (
            <button
              key={c.id}
              className={`settings-color-dot ${accentColor === c.id ? "selected" : ""}`}
              style={{ background: c.color }}
              onClick={() => onSelectAccent(c.id)}
              title={c.id}
            />
          ))}
        </div>
      </div>

      {/* Background section */}
      <div className="settings-section">
        <div className="settings-section-header">
          <h3 className="settings-section-label">Background</h3>
          <button className="settings-add-pic-btn" onClick={() => fileInputRef.current?.click()}>
            + Add Picture…
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileUpload} />
        </div>
        <div className="settings-bg-grid">
          {WALLPAPERS.map((wp) => (
            <div
              key={wp.id}
              className={`settings-bg-thumb ${selectedWallpaper === wp.id ? "selected" : ""}`}
              style={{ background: wp.thumb }}
              onClick={() => {
                onSetCustomWallpaper(null);
                onSelectWallpaper(wp.id);
              }}
              title={wp.name}
            >
              {wp.id === "gravvity-crown" && (
                <div style={{ opacity: 0.3, width: 40, height: 40 }}>
                  <GravvityCrown />
                </div>
              )}
              {selectedWallpaper === wp.id && !customWallpaper && <div className="bg-thumb-check">✓</div>}
            </div>
          ))}
          {customWallpaper && (
            <div
              className="settings-bg-thumb selected"
              style={{ backgroundImage: `url(${customWallpaper})`, backgroundSize: "cover", backgroundPosition: "center" }}
              title="Custom wallpaper"
            >
              <div className="bg-thumb-check">✓</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Activities / Search Overlay
   ═══════════════════════════════════════════════ */

function ActivitiesOverlay({
  query,
  setQuery,
  fossMembers,
  windows: openWindows,
  onOpenMember,
  onOpenApp,
  onFocusWindow,
  onClose,
}: {
  query: string;
  setQuery: (q: string) => void;
  fossMembers: Member[];
  windows: WindowState[];
  onOpenMember: (m: Member) => void;
  onOpenApp: (type: WindowState["type"], title: string, w?: number, h?: number) => void;
  onFocusWindow: (id: string) => void;
  onClose: () => void;
}) {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const lq = query.toLowerCase();

  const matchedMembers = lq ? fossMembers.filter((m) => m.name.toLowerCase().includes(lq) || m.role.toLowerCase().includes(lq) || (m.bio && m.bio.toLowerCase().includes(lq))) : [];

  type AppEntry = { name: string; type: WindowState["type"]; title: string; icon: React.ReactNode; w?: number; h?: number };
  const apps: AppEntry[] = [
    { name: "Terminal", type: "terminal", title: "Terminal", icon: <TerminalIcon />, w: 620, h: 440 },
    { name: "Files", type: "terminal", title: "Files", icon: <FilesIcon />, w: 620, h: 440 },
    { name: "Calculator", type: "calculator", title: "Calculator", icon: <CalcIcon />, w: 320, h: 440 },
    { name: "Text Editor", type: "notepad", title: "Text Editor", icon: <NotepadIcon />, w: 620, h: 480 },
    { name: "Firefox", type: "firefox", title: "Firefox", icon: <FirefoxIcon />, w: 920, h: 620 },
    { name: "Settings", type: "settings", title: "Settings", icon: <SettingsIcon />, w: 540, h: 520 },
    { name: "GitHub", type: "terminal", title: "GitHub", icon: <GitHubIcon /> },
    { name: "LinkedIn", type: "terminal", title: "LinkedIn", icon: <LinkedInIcon /> },
  ];

  const matchedApps = lq ? apps.filter((a) => a.name.toLowerCase().includes(lq)) : apps;

  const hasQuery = lq.length > 0;
  const noResults = hasQuery && matchedMembers.length === 0 && matchedApps.length === 0;

  return (
    <div className="ubuntu-activities-overlay" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="act-search-bar">
          <div className="act-search-icon">
            <SearchIcon />
          </div>
          <input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type to search…" onKeyDown={(e) => e.key === "Escape" && onClose()} />
        </div>
      </div>

      {!hasQuery && openWindows.length > 0 && (
        <div className="act-windows-row" onClick={(e) => e.stopPropagation()}>
          {openWindows.map((w) => (
            <div
              key={w.id}
              className="act-window-thumb"
              onClick={() => {
                onFocusWindow(w.id);
                onClose();
              }}
            >
              <div className="thumb-title">{w.title}</div>
            </div>
          ))}
        </div>
      )}

      {!hasQuery && (
        <div className="act-results-grid" onClick={(e) => e.stopPropagation()}>
          {apps.map((a) => (
            <div
              key={a.name}
              className="act-result-item"
              onClick={() => {
                if (a.name === "GitHub") {
                  window.open("https://github.com/Gravvity-IIITA", "_blank");
                  onClose();
                  return;
                }
                if (a.name === "LinkedIn") {
                  window.open("https://www.linkedin.com/company/gravvity-iiita", "_blank");
                  onClose();
                  return;
                }
                onOpenApp(a.type, a.title, a.w, a.h);
                onClose();
              }}
            >
              <div className="act-result-icon">{a.icon}</div>
              <span>{a.name}</span>
            </div>
          ))}
        </div>
      )}

      {hasQuery && matchedMembers.length > 0 && (
        <div onClick={(e) => e.stopPropagation()}>
          <div className="act-section-label" style={{ paddingLeft: 40 }}>
            Members
          </div>
          <div className="act-results-grid">
            {matchedMembers.map((m) => (
              <div key={m.id} className="act-result-item" onClick={() => { onOpenMember(m); onClose(); }}>
                <div className="act-result-icon">
                  <FolderIcon />
                </div>
                <span>{m.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasQuery && matchedApps.length > 0 && (
        <div onClick={(e) => e.stopPropagation()}>
          <div className="act-section-label" style={{ paddingLeft: 40 }}>
            Applications
          </div>
          <div className="act-results-grid">
            {matchedApps.map((a) => (
              <div
                key={a.name}
                className="act-result-item"
                onClick={() => {
                  if (a.name === "GitHub") {
                    window.open("https://github.com/Gravvity-IIITA", "_blank");
                    onClose();
                    return;
                  }
                  if (a.name === "LinkedIn") {
                    window.open("https://www.linkedin.com/company/gravvity-iiita", "_blank");
                    onClose();
                    return;
                  }
                  onOpenApp(a.type, a.title, a.w, a.h);
                  onClose();
                }}
              >
                <div className="act-result-icon">{a.icon}</div>
                <span>{a.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {noResults && <div className="act-no-results">No results found</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Main: Ubuntu Desktop
   ═══════════════════════════════════════════════ */

const SOCIETY_GITHUB = "https://github.com/Gravvity-IIITA";
const SOCIETY_LINKEDIN = "https://www.linkedin.com/company/gravvity-iiita";

let winIdCounter = 0;

export function FossUbuntuDesktop({ onExit }: { onExit?: () => void }) {
  const members = useMembers();

  const fossMembers = useMemo(
    () =>
      members
        .filter((m) => isSameWing(m.wing, "FOSS") && !m.isOverallCoordinator && !m.isFacultyCoordinator)
        .sort((a, b) => (a.role === "coordinator" && b.role !== "coordinator" ? -1 : b.role === "coordinator" && a.role !== "coordinator" ? 1 : a.name.localeCompare(b.name))),
    [members],
  );

  /* ── State ── */
  const [phase, setPhase] = useState<"boot" | "desktop">("boot");
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [time, setTime] = useState("");
  const [showActivities, setShowActivities] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Settings state
  const [selectedWallpaper, setSelectedWallpaper] = useState("ubuntu-default");
  const [accentColor, setAccentColor] = useState("orange");
  const [isDarkStyle, setIsDarkStyle] = useState(true);
  const [customWallpaper, setCustomWallpaper] = useState<string | null>(null);

  // Desktop icon positions for drag
  const [iconPositions, setIconPositions] = useState<Record<string, DesktopIconPos>>({});
  const iconDragRef = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number; moved: boolean; pointerId: number } | null>(null);
  const recentlyDraggedIconRef = useRef<{ id: string; until: number } | null>(null);

  const desktopRef = useRef<HTMLDivElement>(null);

  // Clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
          "  " +
          now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
      );
    };
    tick();
    const i = setInterval(tick, 15000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, []);

  // Initialize icon positions in a grid
  useEffect(() => {
    if (fossMembers.length > 0 && Object.keys(iconPositions).length === 0) {
      const positions: Record<string, DesktopIconPos> = {};
      fossMembers.forEach((m, idx) => {
        const col = Math.floor(idx / 8);
        const row = idx % 8;
        positions[m.id] = { id: m.id, x: col * 100, y: row * 96 };
      });
      setIconPositions(positions);
    }
  }, [fossMembers, iconPositions]);

  /* ── Window management ── */
  const openWindow = useCallback(
    (type: WindowState["type"], title: string, member?: Member, w = 520, h = 420) => {
      if (type === "member" && member) {
        const existing = windows.find((win) => win.type === "member" && win.member?.id === member.id);
        if (existing) {
          setFocusedId(existing.id);
          setWindows((prev) => prev.map((win) => (win.id === existing.id ? { ...win, minimized: false } : win)));
          return;
        }
      }
      if (type !== "member") {
        const existing = windows.find((win) => win.type === type);
        if (existing) {
          setFocusedId(existing.id);
          setWindows((prev) => prev.map((win) => (win.id === existing.id ? { ...win, minimized: false } : win)));
          return;
        }
      }
      const id = `win-${++winIdCounter}`;
      const offsetX = 100 + (winIdCounter % 8) * 30;
      const offsetY = 50 + (winIdCounter % 6) * 30;
      setWindows((prev) => [...prev, { id, type, title, x: offsetX, y: offsetY, w, h, minimized: false, member }]);
      setFocusedId(id);
    },
    [windows],
  );

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedId((prev) => (prev === id ? null : prev));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  }, []);

  /* ── Window Dragging ── */
  const dragRef = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);

  const handleDragStart = useCallback(
    (winId: string, e: React.PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      const win = windows.find((w) => w.id === winId);
      if (!win) return;
      const titlebarEl = e.currentTarget as HTMLDivElement;
      titlebarEl.setPointerCapture(e.pointerId);
      const startPointerId = e.pointerId;
      dragRef.current = { id: winId, startX: e.clientX, startY: e.clientY, origX: win.x, origY: win.y };
      setFocusedId(winId);

      const onMove = (ev: PointerEvent) => {
        const dragState = dragRef.current;
        if (!dragState) return;
        const dx = ev.clientX - dragState.startX;
        const dy = ev.clientY - dragState.startY;
        const dragId = dragState.id;
        const nextX = dragState.origX + dx;
        const nextY = dragState.origY + dy;

        setWindows((prev) =>
          prev.map((w) =>
            w.id === dragId
              ? { ...w, x: nextX, y: nextY }
              : w,
          ),
        );
      };
      const onUp = () => {
        try {
          titlebarEl.releasePointerCapture(startPointerId);
        } catch {}
        dragRef.current = null;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [windows],
  );

  /* ── Desktop Icon Dragging ── */
  const handleIconDragStart = useCallback(
    (memberId: string, e: React.PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      const pos = iconPositions[memberId];
      if (!pos) return;
      const iconEl = e.currentTarget as HTMLDivElement;
      iconEl.setPointerCapture(e.pointerId);
      iconDragRef.current = { id: memberId, startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y, moved: false, pointerId: e.pointerId };
      const startPointerId = e.pointerId;

      const onMove = (ev: PointerEvent) => {
        const dragState = iconDragRef.current;
        if (!dragState) return;
        const dx = ev.clientX - dragState.startX;
        const dy = ev.clientY - dragState.startY;

        if (!dragState.moved) {
          if (Math.hypot(dx, dy) < ICON_DRAG_THRESHOLD) return;
          dragState.moved = true;
        }

        const dragId = dragState.id;
        const areaWidth = (desktopRef.current?.clientWidth ?? window.innerWidth) - ICONS_AREA_LEFT_OFFSET - ICONS_AREA_RIGHT_OFFSET;
        const areaHeight = (desktopRef.current?.clientHeight ?? window.innerHeight) - ICONS_AREA_TOP_OFFSET - ICONS_AREA_BOTTOM_OFFSET;
        const maxX = Math.max(0, areaWidth - DESKTOP_ICON_SIZE);
        const maxY = Math.max(0, areaHeight - DESKTOP_ICON_SIZE);

        const nextX = Math.max(0, Math.min(maxX, dragState.origX + dx));
        const nextY = Math.max(0, Math.min(maxY, dragState.origY + dy));

        setIconPositions((prev) => {
          const currentPos = prev[dragId];
          if (!currentPos) return prev;
          return {
            ...prev,
            [dragId]: {
              ...currentPos,
              x: nextX,
              y: nextY,
            },
          };
        });
      };
      const onUp = () => {
        if (iconDragRef.current?.moved) {
          recentlyDraggedIconRef.current = { id: iconDragRef.current.id, until: Date.now() + 250 };
        }
        try {
          iconEl.releasePointerCapture(startPointerId);
        } catch {}
        iconDragRef.current = null;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [iconPositions],
  );

  /* ── Get wallpaper CSS ── */
  const wallpaperCSS = useMemo(() => {
    if (customWallpaper) return undefined;
    const wp = WALLPAPERS.find((w) => w.id === selectedWallpaper);
    return wp?.css || WALLPAPERS[0].css;
  }, [selectedWallpaper, customWallpaper]);

  /* ── Render content for a window ── */
  const renderContent = (win: WindowState) => {
    switch (win.type) {
      case "member":
        return <TerminalApp initialMember={win.member} fossMembers={fossMembers} />;
      case "terminal":
        return <TerminalApp fossMembers={fossMembers} />;
      case "calculator":
        return <CalculatorApp />;
      case "notepad":
        return <NotepadApp />;
      case "firefox":
        return <FirefoxApp />;
      case "settings":
        return (
          <AppearanceSettings
            selectedWallpaper={selectedWallpaper}
            onSelectWallpaper={setSelectedWallpaper}
            accentColor={accentColor}
            onSelectAccent={setAccentColor}
            isDark={isDarkStyle}
            onToggleDark={() => setIsDarkStyle((p) => !p)}
            customWallpaper={customWallpaper}
            onSetCustomWallpaper={setCustomWallpaper}
          />
        );
      default:
        return null;
    }
  };

  const toggleActivities = useCallback(() => {
    setShowActivities((prev) => {
      if (!prev) setSearchQuery("");
      return !prev;
    });
  }, []);

  /* ── Phase: Boot ── */
  if (phase === "boot") {
    return <BootScreen onDone={() => setPhase("desktop")} />;
  }

  /* ── Dock items ── */
  const dockItems: Array<{
    id: string;
    icon: React.ReactNode;
    label: string;
    active: boolean;
    action: () => void;
  }> = [
    { id: "firefox", icon: <FirefoxIcon />, label: "Firefox Web Browser", active: windows.some((w) => w.type === "firefox"), action: () => openWindow("firefox", "Firefox", undefined, 920, 620) },
    { id: "files", icon: <FilesIcon />, label: "Files", active: windows.some((w) => w.type === "member"), action: () => { if (fossMembers.length > 0) openWindow("member", fossMembers[0].name, fossMembers[0], 700, 500); } },
    { id: "terminal", icon: <TerminalIcon />, label: "Terminal", active: windows.some((w) => w.type === "terminal"), action: () => openWindow("terminal", "Terminal", undefined, 620, 440) },
    { id: "notepad", icon: <NotepadIcon />, label: "Text Editor", active: windows.some((w) => w.type === "notepad"), action: () => openWindow("notepad", "Text Editor", undefined, 620, 480) },
    { id: "software", icon: <SoftwareIcon />, label: "Ubuntu Software", active: false, action: () => {} },
    { id: "settings", icon: <SettingsIcon />, label: "Settings", active: windows.some((w) => w.type === "settings"), action: () => openWindow("settings", "Settings", undefined, 540, 520) },
    { id: "calc", icon: <CalcIcon />, label: "Calculator", active: windows.some((w) => w.type === "calculator"), action: () => openWindow("calculator", "Calculator", undefined, 320, 440) },
  ];

  const dockExtraItems = [
    { id: "github", icon: <GitHubIcon />, label: "GitHub", action: () => window.open(SOCIETY_GITHUB, "_blank") },
    { id: "linkedin", icon: <LinkedInIcon />, label: "LinkedIn", action: () => window.open(SOCIETY_LINKEDIN, "_blank") },
  ];

  const accentObj = ACCENT_COLORS.find((c) => c.id === accentColor);

  /* ── Phase: Desktop ── */
  return (
    <div ref={desktopRef} className="ubuntu-desktop" style={{ "--accent-color": accentObj?.color || "#e95420" } as React.CSSProperties}>
      {/* Wallpaper */}
      <div
        className="ubuntu-wallpaper"
        style={
          customWallpaper
            ? { backgroundImage: `url(${customWallpaper})`, backgroundSize: "cover", backgroundPosition: "center", background: undefined }
            : { background: wallpaperCSS }
        }
      >
        {!customWallpaper && (
          <div className="ubuntu-wallpaper-watermark">
            <GravvityCrown />
          </div>
        )}
      </div>

      {/* ── Top Bar ── */}
      <div className="ubuntu-topbar">
        <div className="ubuntu-topbar-left">
          <span className="topbar-activities" onClick={toggleActivities}>
            Activities
          </span>
        </div>
        <div className="ubuntu-topbar-center">{time}</div>
        <div className="ubuntu-topbar-right">
          <div className="topbar-tray-icon">
            <WifiIcon />
          </div>
          <div className="topbar-tray-icon">
            <VolumeIcon />
          </div>
          <div className="topbar-tray-icon">
            <BatteryIcon />
          </div>
          <div className="topbar-tray-icon topbar-power" title="Exit Desktop" onClick={() => onExit?.()}>
            <PowerIcon />
          </div>
        </div>
      </div>

      {/* ── Left Dock ── */}
      <div className="ubuntu-dock">
        {dockItems.map((item) => (
          <div key={item.id} className={`ubuntu-dock-icon ${item.active ? "active" : ""}`} onClick={item.action}>
            <div className="dock-icon-inner">{item.icon}</div>
            <div className="dock-tooltip">{item.label}</div>
          </div>
        ))}

        <div className="ubuntu-dock-sep" />

        {dockExtraItems.map((item) => (
          <div key={item.id} className="ubuntu-dock-icon" onClick={item.action}>
            <div className="dock-icon-inner">{item.icon}</div>
            <div className="dock-tooltip">{item.label}</div>
          </div>
        ))}

        <div className="ubuntu-dock-show-apps" onClick={toggleActivities} title="Show Applications">
          <ShowAppsIcon />
        </div>
      </div>

      {/* ── Desktop Icons (Draggable Member Folders) ── */}
      <div className="ubuntu-icons-area">
        {fossMembers.map((m) => {
          const pos = iconPositions[m.id];
          return (
            <div
              key={m.id}
              className="ubuntu-desktop-icon draggable"
              style={pos ? { position: "absolute", left: pos.x, top: pos.y } : undefined}
              onPointerDown={(e) => handleIconDragStart(m.id, e)}
              onClick={() => {
                const lastDrag = recentlyDraggedIconRef.current;
                if (lastDrag && lastDrag.id === m.id && Date.now() < lastDrag.until) {
                  recentlyDraggedIconRef.current = null;
                  return;
                }
                openWindow("member", m.name, m, 700, 500);
              }}
            >
              <div className="icon-img">
                <FolderIcon />
              </div>
              <span>{m.name}</span>
            </div>
          );
        })}
      </div>

      {/* ── Windows ── */}
      {windows.map((win) => (
        <UbuntuWindow key={win.id} win={win} focused={focusedId === win.id} onFocus={() => setFocusedId(win.id)} onClose={() => closeWindow(win.id)} onMinimize={() => minimizeWindow(win.id)} onDragStart={(e) => handleDragStart(win.id, e)}>
          {renderContent(win)}
        </UbuntuWindow>
      ))}

      {/* ── Activities / Search Overlay ── */}
      {showActivities && (
        <ActivitiesOverlay
          query={searchQuery}
          setQuery={setSearchQuery}
          fossMembers={fossMembers}
          windows={windows}
          onOpenMember={(m) => openWindow("member", m.name, m, 700, 500)}
          onOpenApp={(type, title, w, h) => openWindow(type, title, undefined, w, h)}
          onFocusWindow={(id) => {
            setFocusedId(id);
            setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)));
          }}
          onClose={() => setShowActivities(false)}
        />
      )}
    </div>
  );
}
