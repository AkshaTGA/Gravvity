"use client";

import { useEffect, useRef, useCallback } from "react";
import "@/components/webd-hero-visual.css";

/* ═══════════════════════════════════════════════════════
   WebD Hero Visual — Flowing mesh + aurora + particles
   Premium, atmospheric, non-distracting
   ═══════════════════════════════════════════════════════ */

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
  speed: number;
};

/* Smooth noise function (value noise with cosine interpolation) */
function smoothNoise(x: number, y: number, seed: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  // Cosine interpolation for smoothness
  const sx = (1 - Math.cos(fx * Math.PI)) * 0.5;
  const sy = (1 - Math.cos(fy * Math.PI)) * 0.5;
  const hash = (a: number, b: number) => {
    const n = a * 127.1 + b * 311.7 + seed * 53.3;
    return (((Math.sin(n) * 43758.5453) % 1) + 1) % 1;
  };
  const v00 = hash(ix, iy);
  const v10 = hash(ix + 1, iy);
  const v01 = hash(ix, iy + 1);
  const v11 = hash(ix + 1, iy + 1);
  const top = v00 + (v10 - v00) * sx;
  const bot = v01 + (v11 - v01) * sx;
  return top + (bot - top) * sy;
}

function createParticles(w: number, h: number, count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    particles.push({
      x,
      y,
      baseX: x,
      baseY: y,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      size: 0.8 + Math.random() * 1.5,
      alpha: 0.2 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.5,
    });
  }
  return particles;
}

export function WebDHeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = createParticles(w, h, 50);
      sizeRef.current = { w, h };
    }

    if (particlesRef.current.length === 0) {
      particlesRef.current = createParticles(w, h, 50);
      sizeRef.current = { w, h };
    }

    timeRef.current += 0.008;
    const t = timeRef.current;

    // ── Background: deep dark gradient ──
    ctx.clearRect(0, 0, w, h);

    // ── Flowing aurora ribbons ──
    // Two soft ribbons flowing across — gives life to the background
    for (let ribbon = 0; ribbon < 3; ribbon++) {
      const ribbonPhase = ribbon * 2.1;
      const yBase = h * (0.25 + ribbon * 0.25);
      ctx.beginPath();
      ctx.moveTo(0, yBase);

      for (let x = 0; x <= w; x += 4) {
        const nx = x / w;
        const wave1 = Math.sin(nx * 3.5 + t * 0.6 + ribbonPhase) * 35;
        const wave2 = Math.sin(nx * 7 + t * 0.3 + ribbonPhase * 1.3) * 15;
        const noise =
          smoothNoise(nx * 2 + t * 0.1, ribbon * 5 + t * 0.05, 42) * 20 - 10;
        const y = yBase + wave1 + wave2 + noise;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();

      const colors = [
        [
          `rgba(167,139,250,${0.03 + Math.sin(t + ribbon) * 0.01})`,
          `rgba(139,92,246,${0.01})`,
        ],
        [
          `rgba(96,165,250,${0.025 + Math.sin(t * 0.7 + ribbon) * 0.01})`,
          `rgba(59,130,246,${0.008})`,
        ],
        [
          `rgba(168,85,247,${0.02 + Math.sin(t * 0.5 + ribbon) * 0.008})`,
          `rgba(139,92,246,${0.005})`,
        ],
      ];
      const grad = ctx.createLinearGradient(0, yBase - 60, 0, yBase + 120);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.4, colors[ribbon][0]);
      grad.addColorStop(0.6, colors[ribbon][1]);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // ── Dot grid with wave distortion ──
    const gridSpacing = 40;
    const cols = Math.ceil(w / gridSpacing) + 1;
    const rows = Math.ceil(h / gridSpacing) + 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const baseX = col * gridSpacing;
        const baseY = row * gridSpacing;
        const nx = baseX / w;
        const ny = baseY / h;

        // Wave displacement
        const dx = Math.sin(ny * 4 + t * 0.5 + nx * 2) * 4;
        const dy = Math.cos(nx * 3 + t * 0.4 + ny * 2) * 4;
        const px = baseX + dx;
        const py = baseY + dy;

        // Distance from center for fade
        const cx = px / w - 0.5;
        const cy = py / h - 0.5;
        const distFromCenter = Math.sqrt(cx * cx + cy * cy);
        const fade = Math.max(0, 1 - distFromCenter * 1.6);

        const dotAlpha = 0.06 * fade + 0.02;
        const dotSize = 1 + fade * 0.5;

        ctx.beginPath();
        ctx.arc(px, py, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${dotAlpha})`;
        ctx.fill();
      }
    }

    // ── Connecting lines between nearby grid dots (very subtle mesh) ──
    // Only draw horizontal connections for performance, subtle
    for (let row = 0; row < rows; row++) {
      ctx.beginPath();
      for (let col = 0; col < cols; col++) {
        const baseX = col * gridSpacing;
        const baseY = row * gridSpacing;
        const nx = baseX / w;
        const ny = baseY / h;
        const dx = Math.sin(ny * 4 + t * 0.5 + nx * 2) * 4;
        const dy = Math.cos(nx * 3 + t * 0.4 + ny * 2) * 4;
        if (col === 0) ctx.moveTo(baseX + dx, baseY + dy);
        else ctx.lineTo(baseX + dx, baseY + dy);
      }
      ctx.strokeStyle = `rgba(167,139,250,0.025)`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // ── Floating particles ──
    const particles = particlesRef.current;
    for (const p of particles) {
      // Gentle floating motion
      p.x += Math.sin(t * p.speed + p.phase) * 0.3;
      p.y += Math.cos(t * p.speed * 0.8 + p.phase) * 0.2;

      // Wrap around
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      const pAlpha = p.alpha * (0.6 + Math.sin(t * 1.2 + p.phase) * 0.4);

      // Soft glow
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      grd.addColorStop(0, `rgba(167,139,250,${pAlpha * 0.6})`);
      grd.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,180,255,${pAlpha})`;
      ctx.fill();
    }

    // ── Subtle moving gradient orb (large, background-like) ──
    const orbX = w * (0.6 + Math.sin(t * 0.15) * 0.2);
    const orbY = h * (0.4 + Math.cos(t * 0.12) * 0.15);
    const orbR = Math.min(w, h) * 0.45;
    const orbGrad = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbR);
    orbGrad.addColorStop(
      0,
      `rgba(139,92,246,${0.04 + Math.sin(t * 0.3) * 0.015})`,
    );
    orbGrad.addColorStop(0.5, `rgba(96,165,250,${0.02})`);
    orbGrad.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(orbX, orbY, orbR, 0, Math.PI * 2);
    ctx.fillStyle = orbGrad;
    ctx.fill();

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  return (
    <div className="webd-hero-visual">
      <canvas ref={canvasRef} className="webd-hero-canvas" />

      {/* Frosted glass overlay with tag typography */}
      <div className="webd-hero-glass-overlay">
        <div className="webd-hero-tag-line">
          <span className="webd-hero-bracket">&lt;</span>
          <span className="webd-hero-tag-name">WebD</span>
          <span className="webd-hero-bracket"> /&gt;</span>
        </div>
        <div className="webd-hero-subtitle">Web Development Wing</div>
        <div className="webd-hero-tagline">Building the digital frontier</div>
      </div>

      {/* Floating tech badges */}
      <div className="webd-hero-badge webd-hb-react" aria-hidden="true">
        ⚛ React
      </div>
      <div className="webd-hero-badge webd-hb-next" aria-hidden="true">
        ▲ Next.js
      </div>
      <div className="webd-hero-badge webd-hb-ts" aria-hidden="true">
        TS TypeScript
      </div>
      <div className="webd-hero-badge webd-hb-node" aria-hidden="true">
        ⬡ Node
      </div>

      {/* Bottom code line */}
      <div className="webd-hero-code-strip">
        <span className="webd-cs-kw">const</span>{" "}
        <span className="webd-cs-var">future</span>{" "}
        <span className="webd-cs-op">=</span>{" "}
        <span className="webd-cs-kw">await</span>{" "}
        <span className="webd-cs-fn">webD</span>
        <span className="webd-cs-br">(</span>
        <span className="webd-cs-str">&apos;gravity&apos;</span>
        <span className="webd-cs-br">)</span>
        <span className="webd-cs-cursor">|</span>
      </div>
    </div>
  );
}
