"use client";

import { useEffect, useRef } from "react";

/* ────────────────────────────────────────────────────────────────────────────
 *  CPCodeCanvas — Animated competitive-coding–themed hero visual
 *
 *  Shows a graph/network of nodes with edges, animated pathfinding pulses,
 *  floating code symbols, and a subtle code rain effect — all on a single
 *  <canvas> for performance.  Not distracting: low opacity, slow motion.
 * ──────────────────────────────────────────────────────────────────────────── */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  glow: number; // 0-1 pulse phase
  glowSpeed: number;
}

interface Edge {
  from: number;
  to: number;
  pulsePos: number; // 0-1 position of travelling pulse
  pulseSpeed: number;
  active: boolean;
}

interface FloatingSymbol {
  x: number;
  y: number;
  vy: number;
  opacity: number;
  char: string;
  size: number;
  fadeDir: number;
}

const CODE_SYMBOLS = [
  "{",
  "}",
  "<",
  ">",
  "(",
  ")",
  "[",
  "]",
  "//",
  "/*",
  "*/",
  "++",
  "->",
  "=>",
  "&&",
  "||",
  "!=",
  "==",
  "<=",
  ">=",
  "0",
  "1",
  "int",
  "dp",
  "for",
  "if",
  "O(n)",
  "log",
  "mod",
  "gcd",
  "bfs",
  "dfs",
];

const NODE_LABELS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "S",
  "T",
];

export function CPCodeCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 480;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;

    /* ── create graph nodes in a loose circle ── */
    const nodeCount = 14;
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const dist = 100 + Math.random() * 110;
      nodes.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: 4 + Math.random() * 3,
        label: NODE_LABELS[i % NODE_LABELS.length],
        glow: Math.random(),
        glowSpeed: 0.005 + Math.random() * 0.01,
      });
    }

    /* ── create edges (sparse graph — not every pair) ── */
    const edges: Edge[] = [];
    const edgeSet = new Set<string>();
    // Each node connects to 2-3 neighbours
    for (let i = 0; i < nodeCount; i++) {
      const connections = 2 + Math.floor(Math.random() * 2);
      // Find closest nodes
      const dists = nodes
        .map((n, j) => ({
          j,
          d: Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y),
        }))
        .filter((d) => d.j !== i)
        .sort((a, b) => a.d - b.d);
      for (let c = 0; c < connections && c < dists.length; c++) {
        const j = dists[c].j;
        const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edges.push({
            from: i,
            to: j,
            pulsePos: Math.random(),
            pulseSpeed: 0.003 + Math.random() * 0.005,
            active: Math.random() > 0.35,
          });
        }
      }
    }

    /* ── floating code symbols ── */
    const symbols: FloatingSymbol[] = [];
    for (let i = 0; i < 22; i++) {
      symbols.push({
        x: Math.random() * size,
        y: Math.random() * size,
        vy: 0.15 + Math.random() * 0.3,
        opacity: Math.random() * 0.18,
        char: CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)],
        size: 9 + Math.random() * 7,
        fadeDir: 1,
      });
    }

    let t = 0;

    /* ─────────── DRAW LOOP ─────────── */
    function draw() {
      ctx!.clearRect(0, 0, size, size);

      /* ── background radial glow ── */
      const bgGlow = ctx!.createRadialGradient(cx, cy, 0, cx, cy, size * 0.55);
      bgGlow.addColorStop(0, "rgba(139, 92, 246, 0.06)");
      bgGlow.addColorStop(0.4, "rgba(59, 130, 246, 0.03)");
      bgGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = bgGlow;
      ctx!.fillRect(0, 0, size, size);

      /* ── floating code symbols (background layer) ── */
      ctx!.save();
      for (const s of symbols) {
        s.y += s.vy;
        s.opacity += s.fadeDir * 0.001;
        if (s.opacity > 0.18) s.fadeDir = -1;
        if (s.opacity < 0.02) {
          s.fadeDir = 1;
          s.char =
            CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)];
        }
        if (s.y > size + 20) {
          s.y = -20;
          s.x = Math.random() * size;
        }
        ctx!.font = `${s.size}px "JetBrains Mono", "Fira Code", monospace`;
        ctx!.fillStyle = `rgba(168, 162, 255, ${Math.max(0, s.opacity)})`;
        ctx!.fillText(s.char, s.x, s.y);
      }
      ctx!.restore();

      /* ── draw edges ── */
      for (const edge of edges) {
        const a = nodes[edge.from];
        const b = nodes[edge.to];

        // base edge line
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.strokeStyle = edge.active
          ? "rgba(139, 92, 246, 0.12)"
          : "rgba(100, 100, 140, 0.06)";
        ctx!.lineWidth = edge.active ? 1.2 : 0.6;
        ctx!.stroke();

        // travelling pulse on active edges
        if (edge.active) {
          edge.pulsePos += edge.pulseSpeed;
          if (edge.pulsePos > 1) {
            edge.pulsePos = 0;
            // occasionally toggle active state
            if (Math.random() < 0.15) edge.active = false;
          }
          const px = a.x + (b.x - a.x) * edge.pulsePos;
          const py = a.y + (b.y - a.y) * edge.pulsePos;
          const pg = ctx!.createRadialGradient(px, py, 0, px, py, 10);
          pg.addColorStop(0, "rgba(6, 182, 212, 0.55)");
          pg.addColorStop(0.5, "rgba(139, 92, 246, 0.2)");
          pg.addColorStop(1, "rgba(0,0,0,0)");
          ctx!.fillStyle = pg;
          ctx!.fillRect(px - 10, py - 10, 20, 20);

          // trail
          const trail = 0.06;
          for (let tr = 1; tr <= 3; tr++) {
            const tp = edge.pulsePos - tr * trail;
            if (tp < 0) continue;
            const tx = a.x + (b.x - a.x) * tp;
            const ty = a.y + (b.y - a.y) * tp;
            ctx!.beginPath();
            ctx!.arc(tx, ty, 2 - tr * 0.4, 0, Math.PI * 2);
            ctx!.fillStyle = `rgba(6, 182, 212, ${0.3 - tr * 0.08})`;
            ctx!.fill();
          }
        } else {
          // chance to re-activate
          if (Math.random() < 0.001) edge.active = true;
        }
      }

      /* ── draw nodes ── */
      for (const node of nodes) {
        // gentle drift
        node.x += node.vx;
        node.y += node.vy;
        // soft bounds
        if (node.x < 30 || node.x > size - 30) node.vx *= -1;
        if (node.y < 30 || node.y > size - 30) node.vy *= -1;

        // pulse glow
        node.glow += node.glowSpeed;
        if (node.glow > 1) node.glow = 0;
        const glowIntensity = 0.15 + Math.sin(node.glow * Math.PI * 2) * 0.12;

        // outer glow
        const ng = ctx!.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius * 4,
        );
        ng.addColorStop(0, `rgba(139, 92, 246, ${glowIntensity})`);
        ng.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.fillStyle = ng;
        ctx!.fillRect(
          node.x - node.radius * 4,
          node.y - node.radius * 4,
          node.radius * 8,
          node.radius * 8,
        );

        // node circle
        const grad = ctx!.createRadialGradient(
          node.x - node.radius * 0.3,
          node.y - node.radius * 0.3,
          0,
          node.x,
          node.y,
          node.radius,
        );
        grad.addColorStop(0, "rgba(196, 181, 253, 0.9)");
        grad.addColorStop(0.6, "rgba(139, 92, 246, 0.7)");
        grad.addColorStop(1, "rgba(79, 70, 229, 0.5)");
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();

        // border
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.radius + 0.5, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(196, 181, 253, ${0.25 + glowIntensity})`;
        ctx!.lineWidth = 0.8;
        ctx!.stroke();

        // label
        ctx!.font = "bold 7px 'Inter', sans-serif";
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillStyle = `rgba(255, 255, 255, ${0.6 + glowIntensity})`;
        ctx!.fillText(node.label, node.x, node.y);
      }

      /* ── central code bracket ornament ── */
      const bracketAlpha = 0.06 + Math.sin(t * 0.5) * 0.03;
      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.font = `bold 72px "JetBrains Mono", "Fira Code", monospace`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.fillStyle = `rgba(139, 92, 246, ${bracketAlpha})`;
      ctx!.fillText("< / >", 0, 0);
      ctx!.restore();

      /* ── orbiting binary ring ── */
      const ringR = 195;
      const binaryCount = 40;
      for (let i = 0; i < binaryCount; i++) {
        const angle = (i / binaryCount) * Math.PI * 2 + t * 0.15;
        const bx = cx + Math.cos(angle) * ringR;
        const by = cy + Math.sin(angle) * ringR * 0.35;
        const depth = Math.sin(angle); // for fading back-face
        if (depth < -0.2) continue;
        const alpha = 0.04 + depth * 0.08;
        ctx!.font = "10px 'JetBrains Mono', monospace";
        ctx!.textAlign = "center";
        ctx!.fillStyle = `rgba(6, 182, 212, ${Math.max(0.02, alpha)})`;
        ctx!.fillText(i % 2 === 0 ? "0" : "1", bx, by);
      }

      /* ── subtle scan line (like a competitive judge checking) ── */
      const scanY = ((t * 12) % (size + 40)) - 20;
      const scanGrad = ctx!.createLinearGradient(0, scanY - 15, 0, scanY + 15);
      scanGrad.addColorStop(0, "rgba(6, 182, 212, 0)");
      scanGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.03)");
      scanGrad.addColorStop(1, "rgba(6, 182, 212, 0)");
      ctx!.fillStyle = scanGrad;
      ctx!.fillRect(0, scanY - 15, size, 30);

      t += 0.016;
      frameRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Soft ambient rings */}
      <div
        className="absolute w-96 h-96 rounded-full border border-purple-500/10 animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div className="absolute w-110 h-110 rounded-full border border-cyan-500/5" />
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10"
        style={{ width: 480, height: 480 }}
      />
    </div>
  );
}
