"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef, useCallback } from "react";
import { Navigation } from "@/components/navigation";

const MembersPageContent = dynamic(
  () =>
    import("@/components/members-page-content").then(
      (mod) => mod.MembersPageContent,
    ),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center text-foreground/70">
        Loading members...
      </div>
    ),
  },
);

const SIMULATION_URL = "/metaverse-sim/index.html";

/* ────────────────────────────────────────────────────────────── */
/*  Floating‑particle canvas (subtle animated background)       */
/* ────────────────────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    type Dot = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      o: number;
    };
    const dots: Dot[] = Array.from({ length: 50 }, () => ({
      x: (Math.random() * canvas.width) / dpr,
      y: (Math.random() * canvas.height) / dpr,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: 1 + Math.random() * 2,
      o: 0.15 + Math.random() * 0.35,
    }));

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = w;
        if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        if (d.y > h) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(138,92,246,${d.o})`;
        ctx.fill();
      }

      // connection lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(138,92,246,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Main component                                              */
/* ────────────────────────────────────────────────────────────── */
export function MetaverseMembersView() {
  const [deviceMode, setDeviceMode] = useState<
    "unknown" | "mobile" | "desktop"
  >("unknown");
  const [mode, setMode] = useState<"chooser" | "simple" | "full">("chooser");

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 768px), (pointer: coarse), (hover: none)",
    );

    const updateDeviceMode = () => {
      const uaMobile = /Mobi|Android|iPhone|iPad|iPod|Mobile/i.test(
        navigator.userAgent,
      );
      const isMobile = mediaQuery.matches || uaMobile;
      setDeviceMode(isMobile ? "mobile" : "desktop");
      setMode((currentMode) => {
        if (isMobile && currentMode === "chooser") {
          return "simple";
        }
        return currentMode;
      });
    };

    updateDeviceMode();
    mediaQuery.addEventListener("change", updateDeviceMode);

    return () => {
      mediaQuery.removeEventListener("change", updateDeviceMode);
    };
  }, []);

  // Listen for back-to-home from the iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "metaverse-go-home") {
        setMode(deviceMode === "mobile" ? "simple" : "chooser");
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [deviceMode]);

  const activateFullMode = useCallback(() => {
    setMode("full");
  }, []);

  const activateSimpleMode = useCallback(() => {
    setMode("simple");
  }, []);

  const activateChooserMode = useCallback(() => {
    setMode("chooser");
  }, []);

  if (deviceMode === "unknown") {
    return null;
  }

  if (deviceMode === "desktop" && mode === "chooser") {
    return (
      <ModeChooser
        onEnterMetaverse={activateFullMode}
        onEnterSimple={activateSimpleMode}
      />
    );
  }

  /* ─── Simple view ─── */
  if (mode === "simple") {
    return (
      <div className="relative">
        {deviceMode === "desktop" && (
          <button
            type="button"
            onClick={activateChooserMode}
            className="fixed top-20 cursor-pointer right-5 md:top-24 z-40 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white
              bg-linear-to-r from-purple-600 via-indigo-500 to-blue-500
              shadow-[0_8px_30px_rgba(124,58,237,0.35)]
              hover:shadow-[0_10px_40px_rgba(124,58,237,0.45)]
              transition-all duration-300"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Choose Experience
          </button>
        )}

        <MembersPageContent
          wingFilter="Metaverse"
          lightweight={deviceMode === "mobile"}
        />
      </div>
    );
  }

  /* ─── Full metaverse ─── */
  return (
    <main className="fixed inset-0 z-40 bg-background">
      <iframe
        src={SIMULATION_URL}
        title="Metaverse 3D Simulation"
        className="w-screen h-screen"
        allow="fullscreen"
      />
    </main>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Mode Chooser                                                 */
/* ────────────────────────────────────────────────────────────── */
function ModeChooser({
  onEnterMetaverse,
  onEnterSimple,
}: {
  onEnterMetaverse: () => void;
  onEnterSimple: () => void;
}) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-linear-to-b from-[#0c0a1d] via-[#12102a] to-background">
      <Navigation />
      <ParticleCanvas />

      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center py-24 md:py-32 px-6 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Metaverse Members Wing
        </span>

        {/* Title */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
          <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-blue-300 to-emerald-300">
            Choose Your
          </span>
          <br />
          <span className="text-foreground">Experience Mode</span>
        </h2>

        {/* Subtitle */}
        <p className="max-w-xl text-muted-foreground text-lg md:text-xl leading-relaxed mb-10">
          You can explore the immersive 3D metaverse gallery or continue in the
          standard members view.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onEnterMetaverse}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold text-white
              bg-linear-to-r from-purple-600 cursor-pointer via-indigo-500 to-blue-500
              shadow-[0_8px_32px_rgba(124,58,237,0.35)]
              hover:shadow-[0_12px_48px_rgba(124,58,237,0.5)]
              hover:-translate-y-0.5
              transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-2xl bg-linear-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <svg
              className="w-6 h-6 transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Enter Metaverse
          </button>

          <button
            type="button"
            onClick={onEnterSimple}
            className="inline-flex cursor-pointer items-center gap-2 px-8 py-4 rounded-2xl text-lg font-semibold border border-white/15 text-foreground bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-300"
          >
            Open Simple Mode
          </button>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {[
            { label: "Keyboard Navigation" },
            { label: "Interactive Gallery" },
            { label: "Member Profiles" },
            { label: "Browser-Based Experience" },
          ].map(({ label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-muted-foreground backdrop-blur-sm"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/70" />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom fade to blend with content below */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
