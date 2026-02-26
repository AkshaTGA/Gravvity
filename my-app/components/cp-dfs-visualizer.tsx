"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";

/* ═══════════════════════════════════════════════════════════════
 *  DFS VISUALIZER — CONSTELLATION EDITION
 *  ───────────────────────────────────────
 *  Features:
 *  ◆ 8-node organic graph with depth-graded purple→cyan colours
 *  ◆ Orbiting electron rings around each node (different speeds/tilts)
 *  ◆ Floating ambient particles drifting through the scene
 *  ◆ Triple-layer expanding ripple rings on node visit
 *  ◆ Hexagonal background grid pattern
 *  ◆ Edge particles flowing along traversed edges
 *  ◆ Comet-tail travelling pulse with heavy glow
 *  ◆ Constellation connection lines between nearby nodes
 *  ◆ Breathing ambient glow that shifts colour over time
 *  ◆ ~14 s DFS cycle, cubic-bezier easing
 * ═══════════════════════════════════════════════════════════════ */

/* ── Types ── */
interface GNode {
  id: number;
  x: number;
  y: number;
  depth: number;
}
interface GEdge {
  from: number;
  to: number;
}

/* ── Graph topology ── */
const NODES: GNode[] = [
  { id: 0, x: 200, y: 45, depth: 0 },
  { id: 1, x: 115, y: 125, depth: 1 },
  { id: 2, x: 295, y: 115, depth: 1 },
  { id: 3, x: 55, y: 210, depth: 2 },
  { id: 4, x: 160, y: 220, depth: 2 },
  { id: 5, x: 250, y: 205, depth: 2 },
  { id: 6, x: 340, y: 195, depth: 2 },
  { id: 7, x: 95, y: 295, depth: 3 },
];
const EDGES: GEdge[] = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 3 },
  { from: 1, to: 4 },
  { from: 2, to: 5 },
  { from: 2, to: 6 },
  { from: 3, to: 7 },
];

function buildAdj() {
  const adj = new Map<number, number[]>();
  for (const n of NODES) adj.set(n.id, []);
  for (const e of EDGES) adj.get(e.from)!.push(e.to);
  return adj;
}
const ADJ = buildAdj();

/* ── DFS steps ── */
type Step =
  | { type: "visit"; node: number }
  | { type: "edge"; from: number; to: number }
  | { type: "back"; from: number; to: number };

function buildSteps(): Step[] {
  const steps: Step[] = [];
  const vis = new Set<number>();
  function dfs(u: number) {
    vis.add(u);
    steps.push({ type: "visit", node: u });
    for (const v of ADJ.get(u) ?? []) {
      if (!vis.has(v)) {
        steps.push({ type: "edge", from: u, to: v });
        dfs(v);
        steps.push({ type: "back", from: v, to: u });
      }
    }
  }
  dfs(0);
  return steps;
}
const STEPS = buildSteps();

/* ── Colours ── */
const DCOLS = [
  [168, 85, 247], // purple
  [139, 92, 246], // violet
  [99, 179, 237], // sky
  [34, 211, 238], // cyan
];
const dc = (d: number) => {
  const c = DCOLS[Math.min(d, 3)];
  return `${c[0]},${c[1]},${c[2]}`;
};
const dh = (d: number) => {
  const c = DCOLS[Math.min(d, 3)];
  return "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");
};

/* ── Easing ── */
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* ── Floating particles seed ── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  color: string;
  phase: number;
}

function seedParticles(count: number): Particle[] {
  const ps: Particle[] = [];
  for (let i = 0; i < count; i++) {
    ps.push({
      x: Math.random() * 400,
      y: Math.random() * 360,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.12,
      r: 0.8 + Math.random() * 1.5,
      opacity: 0.1 + Math.random() * 0.25,
      color: dc(Math.floor(Math.random() * 4)),
      phase: Math.random() * Math.PI * 2,
    });
  }
  return ps;
}

/* ── Hexagonal grid points ── */
function hexGrid(w: number, h: number, spacing: number): [number, number][] {
  const pts: [number, number][] = [];
  const rowH = (spacing * Math.sqrt(3)) / 2;
  for (let row = 0; row * rowH < h + spacing; row++) {
    const offset = row % 2 === 0 ? 0 : spacing / 2;
    for (let col = 0; col * spacing - spacing < w + spacing; col++) {
      pts.push([col * spacing + offset - spacing, row * rowH - spacing]);
    }
  }
  return pts;
}

/* ── Orbit ring configs per node ── */
const ORBITS = NODES.map((_, i) => ({
  rx: 14 + (i % 3) * 4,
  ry: 8 + (i % 2) * 5,
  speed: 0.0008 + (i % 4) * 0.0003,
  tilt: -20 + (i % 5) * 12,
  phase: (i * 1.3) % (Math.PI * 2),
}));

/* ═══════ COMPONENT ═══════ */
interface Props {
  className?: string;
}

export function DFSVisualizer({ className = "" }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number>(0);
  const particles = useMemo(() => seedParticles(30), []);
  const hexPts = useMemo(() => hexGrid(400, 360, 32), []);

  const animate = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    /* ── Gather refs ── */
    const nodeEls = NODES.map((n) =>
      svg.querySelector<SVGCircleElement>(`[data-node="${n.id}"]`),
    );
    const ringEls: SVGCircleElement[][] = NODES.map((n) => {
      const els: SVGCircleElement[] = [];
      for (let r = 0; r < 3; r++) {
        const el = svg.querySelector<SVGCircleElement>(
          `[data-ring="${n.id}-${r}"]`,
        );
        if (el) els.push(el);
      }
      return els;
    });
    const orbitEls = NODES.map((n) =>
      svg.querySelector<SVGEllipseElement>(`[data-orbit="${n.id}"]`),
    );
    const orbitDotEls = NODES.map((n) =>
      svg.querySelector<SVGCircleElement>(`[data-orbit-dot="${n.id}"]`),
    );
    const edgeEls = EDGES.map((e) =>
      svg.querySelector<SVGLineElement>(`[data-edge="${e.from}-${e.to}"]`),
    );
    const edgeGlowEls = EDGES.map((e) =>
      svg.querySelector<SVGLineElement>(`[data-eglow="${e.from}-${e.to}"]`),
    );
    const particleEls: SVGCircleElement[] = [];
    for (let i = 0; i < particles.length; i++) {
      const el = svg.querySelector<SVGCircleElement>(`[data-particle="${i}"]`);
      if (el) particleEls.push(el);
      else particleEls.push(null as unknown as SVGCircleElement);
    }
    const pulseEl = svg.querySelector<SVGCircleElement>("[data-pulse]");
    const pulseTrailEl =
      svg.querySelector<SVGCircleElement>("[data-pulse-trail]");
    const pulseTrail2El = svg.querySelector<SVGCircleElement>(
      "[data-pulse-trail2]",
    );
    const hexDotsEls: SVGCircleElement[] = [];
    for (let i = 0; i < hexPts.length; i++) {
      const el = svg.querySelector<SVGCircleElement>(`[data-hex="${i}"]`);
      if (el) hexDotsEls.push(el);
      else hexDotsEls.push(null as unknown as SVGCircleElement);
    }

    // Timing
    const TOTAL = 14000;
    const STEP_DUR = TOTAL / STEPS.length;
    const PAUSE = 2500;
    const CYCLE = TOTAL + PAUSE;

    const ripples: { nodeId: number; t: number }[] = [];
    let lastVis = -1;
    let start: number | null = null;

    function frame(now: number) {
      if (start === null) start = now;
      const elapsed = (now - start) % CYCLE;
      const globalT = now * 0.001; // seconds for ambient animations

      /* ── Hex grid pulse ── */
      for (let i = 0; i < hexDotsEls.length; i++) {
        const el = hexDotsEls[i];
        if (!el) continue;
        const [hx, hy] = hexPts[i];
        // Subtle wave ripple
        const wave =
          Math.sin(hx * 0.03 + globalT * 0.5) *
          Math.cos(hy * 0.03 + globalT * 0.3);
        el.style.opacity = String(0.04 + wave * 0.03);
      }

      /* ── Floating particles ── */
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const el = particleEls[i];
        if (!el) continue;
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        // Wrap around
        if (p.x < -10) p.x = 410;
        if (p.x > 410) p.x = -10;
        if (p.y < -10) p.y = 370;
        if (p.y > 370) p.y = -10;
        // Gentle oscillation
        const osc = Math.sin(globalT * 0.8 + p.phase) * 0.08;
        el.setAttribute("cx", String(p.x));
        el.setAttribute("cy", String(p.y));
        el.style.opacity = String(p.opacity + osc);
      }

      /* ── Orbit rings (always animate) ── */
      for (let i = 0; i < NODES.length; i++) {
        const orb = orbitEls[i];
        const dot = orbitDotEls[i];
        if (!orb || !dot) continue;
        const cfg = ORBITS[i];
        const angle = globalT * cfg.speed * 1000 + cfg.phase;
        // Orbit ring rotates
        orb.setAttribute(
          "transform",
          `rotate(${cfg.tilt + globalT * 8} ${NODES[i].x} ${NODES[i].y})`,
        );
        // Electron dot orbits
        const dx = Math.cos(angle) * cfg.rx;
        const dy = Math.sin(angle) * cfg.ry;
        // Apply tilt rotation manually
        const rad = ((cfg.tilt + globalT * 8) * Math.PI) / 180;
        const rdx = dx * Math.cos(rad) - dy * Math.sin(rad);
        const rdy = dx * Math.sin(rad) + dy * Math.cos(rad);
        dot.setAttribute("cx", String(NODES[i].x + rdx));
        dot.setAttribute("cy", String(NODES[i].y + rdy));
      }

      /* ── DFS logic ── */
      if (elapsed >= TOTAL) {
        resetDFS();
        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      const sf = elapsed / STEP_DUR;
      const si = Math.min(Math.floor(sf), STEPS.length - 1);
      const st = ease(sf - si);

      const visNodes = new Set<number>();
      const actEdges = new Set<string>();
      for (let i = 0; i <= si; i++) {
        const s = STEPS[i];
        if (s.type === "visit") visNodes.add(s.node);
        if (s.type === "edge") actEdges.add(`${s.from}-${s.to}`);
      }
      const cur = STEPS[si];

      // Ripple trigger
      if (cur.type === "visit" && cur.node !== lastVis) {
        lastVis = cur.node;
        ripples.push({ nodeId: cur.node, t: now });
      }

      /* ── Nodes ── */
      for (let i = 0; i < NODES.length; i++) {
        const el = nodeEls[i];
        if (!el) continue;
        const n = NODES[i];
        const col = dc(n.depth);
        const orbEl = orbitEls[i];
        const dotEl = orbitDotEls[i];

        if (cur.type === "visit" && cur.node === n.id) {
          el.setAttribute("r", String(7 + st * 3));
          el.style.opacity = "0.95";
          el.style.fill = `rgba(${col}, 1)`;
          if (orbEl) orbEl.style.opacity = "0.6";
          if (dotEl) dotEl.style.opacity = "0.8";
        } else if (visNodes.has(n.id)) {
          el.setAttribute("r", "5.5");
          el.style.opacity = "0.55";
          el.style.fill = `rgba(${col}, 0.9)`;
          if (orbEl) orbEl.style.opacity = "0.3";
          if (dotEl) dotEl.style.opacity = "0.5";
        } else {
          el.setAttribute("r", "4.5");
          el.style.opacity = "0.2";
          el.style.fill = `rgba(${col}, 0.5)`;
          if (orbEl) orbEl.style.opacity = "0.08";
          if (dotEl) dotEl.style.opacity = "0.12";
        }
      }

      /* ── Triple ripple rings ── */
      for (let i = 0; i < NODES.length; i++) {
        const rings = ringEls[i];
        const active = ripples.filter((rp) => rp.nodeId === NODES[i].id);
        for (let r = 0; r < rings.length; r++) {
          const ring = rings[r];
          if (!ring) continue;
          if (active.length > 0) {
            const latest = active[active.length - 1];
            const delay = r * 120; // staggered
            const age = now - latest.t - delay;
            const dur = 1400;
            if (age > 0 && age < dur) {
              const t = age / dur;
              ring.setAttribute("r", String(8 + t * (22 + r * 8)));
              ring.style.opacity = String((0.5 - r * 0.12) * (1 - t));
              ring.style.strokeWidth = String(1.5 - r * 0.3);
            } else {
              ring.style.opacity = "0";
            }
          } else {
            ring.style.opacity = "0";
          }
        }
      }
      // Clean
      while (ripples.length > 0 && now - ripples[0].t > 2000) ripples.shift();

      /* ── Edges ── */
      for (let i = 0; i < EDGES.length; i++) {
        const el = edgeEls[i];
        const gl = edgeGlowEls[i];
        if (!el) continue;
        const key = `${EDGES[i].from}-${EDGES[i].to}`;
        if (actEdges.has(key)) {
          el.style.opacity = "0.6";
          el.style.strokeWidth = "1.8px";
          el.style.strokeDasharray = "8 5";
          el.style.strokeDashoffset = String((now / 12) % 200);
          if (gl) {
            gl.style.opacity = "0.3";
            gl.style.strokeWidth = "5px";
          }
        } else {
          el.style.opacity = "0.12";
          el.style.strokeWidth = "0.8px";
          el.style.strokeDasharray = "none";
          if (gl) gl.style.opacity = "0";
        }
      }

      /* ── Triple pulse (main + 2 trailing) ── */
      if (pulseEl && pulseTrailEl && pulseTrail2El) {
        if (cur.type === "edge" || cur.type === "back") {
          const f = NODES.find((n) => n.id === cur.from)!;
          const t = NODES.find((n) => n.id === cur.to)!;
          const px = f.x + (t.x - f.x) * st;
          const py = f.y + (t.y - f.y) * st;
          const t1 = Math.max(0, st - 0.12);
          const t2 = Math.max(0, st - 0.28);
          const isFwd = cur.type === "edge";

          pulseEl.setAttribute("cx", String(px));
          pulseEl.setAttribute("cy", String(py));
          pulseEl.style.opacity = isFwd ? "0.95" : "0.55";

          pulseTrailEl.setAttribute("cx", String(f.x + (t.x - f.x) * t1));
          pulseTrailEl.setAttribute("cy", String(f.y + (t.y - f.y) * t1));
          pulseTrailEl.style.opacity = isFwd ? "0.45" : "0.2";

          pulseTrail2El.setAttribute("cx", String(f.x + (t.x - f.x) * t2));
          pulseTrail2El.setAttribute("cy", String(f.y + (t.y - f.y) * t2));
          pulseTrail2El.style.opacity = isFwd ? "0.2" : "0.08";
        } else {
          const nd = NODES.find((n) => n.id === cur.node)!;
          pulseEl.setAttribute("cx", String(nd.x));
          pulseEl.setAttribute("cy", String(nd.y));
          pulseEl.style.opacity = "0.8";
          pulseTrailEl.setAttribute("cx", String(nd.x));
          pulseTrailEl.setAttribute("cy", String(nd.y));
          pulseTrailEl.style.opacity = "0.35";
          pulseTrail2El.setAttribute("cx", String(nd.x));
          pulseTrail2El.setAttribute("cy", String(nd.y));
          pulseTrail2El.style.opacity = "0.15";
        }
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    function resetDFS() {
      lastVis = -1;
      for (let i = 0; i < NODES.length; i++) {
        const el = nodeEls[i];
        if (el) {
          el.setAttribute("r", "4.5");
          el.style.opacity = "0.2";
        }
        for (const ring of ringEls[i]) if (ring) ring.style.opacity = "0";
        const orb = orbitEls[i];
        if (orb) orb.style.opacity = "0.08";
        const dot = orbitDotEls[i];
        if (dot) dot.style.opacity = "0.12";
      }
      for (let i = 0; i < EDGES.length; i++) {
        const el = edgeEls[i];
        if (el) {
          el.style.opacity = "0.12";
          el.style.strokeWidth = "0.8px";
          el.style.strokeDasharray = "none";
        }
        const gl = edgeGlowEls[i];
        if (gl) gl.style.opacity = "0";
      }
      if (pulseEl) pulseEl.style.opacity = "0";
      if (pulseTrailEl) pulseTrailEl.style.opacity = "0";
      if (pulseTrail2El) pulseTrail2El.style.opacity = "0";
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [particles, hexPts]);

  useEffect(() => {
    const cleanup = animate();
    return () => {
      cancelAnimationFrame(rafRef.current);
      cleanup?.();
    };
  }, [animate]);

  return (
    <div className={`relative select-none ${className}`} aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox="0 0 400 360"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Filters */}
          <filter id="g1" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="g2" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="10" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="g3" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
            </feMerge>
          </filter>
          <filter id="g4" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="16" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="b" />
            </feMerge>
          </filter>

          {/* Edge gradients */}
          {EDGES.map((e) => {
            const f = NODES.find((n) => n.id === e.from)!;
            const t = NODES.find((n) => n.id === e.to)!;
            return (
              <linearGradient
                key={`eg${e.from}${e.to}`}
                id={`eg${e.from}${e.to}`}
                x1={f.x}
                y1={f.y}
                x2={t.x}
                y2={t.y}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor={dh(f.depth)} />
                <stop offset="100%" stopColor={dh(t.depth)} />
              </linearGradient>
            );
          })}

          {/* Animated radial ambient */}
          <radialGradient id="amb" cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="rgba(139,92,246,0.1)" />
            <stop offset="40%" stopColor="rgba(99,179,237,0.05)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <radialGradient id="amb2" cx="30%" cy="65%" r="40%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.06)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* ═══ Background layers ═══ */}
        <rect x="0" y="0" width="400" height="360" fill="url(#amb)" />
        <rect x="0" y="0" width="400" height="360" fill="url(#amb2)" />

        {/* ── Hex grid dots ── */}
        {hexPts.map((pt, i) => (
          <circle
            key={`h${i}`}
            data-hex={i}
            cx={pt[0]}
            cy={pt[1]}
            r={0.8}
            fill="rgba(139,92,246,0.5)"
            style={{ opacity: 0.04 }}
          />
        ))}

        {/* ── Floating particles ── */}
        {particles.map((p, i) => (
          <circle
            key={`p${i}`}
            data-particle={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={`rgba(${p.color}, 0.8)`}
            filter="url(#g1)"
            style={{ opacity: p.opacity }}
          />
        ))}

        {/* ── Constellation lines (faint connections between nearby nodes) ── */}
        {NODES.map((a, i) =>
          NODES.slice(i + 1).map((b) => {
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d > 180) return null;
            const isEdge = EDGES.some(
              (e) =>
                (e.from === a.id && e.to === b.id) ||
                (e.from === b.id && e.to === a.id),
            );
            if (isEdge) return null;
            return (
              <line
                key={`c${a.id}${b.id}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="rgba(139,92,246,0.08)"
                strokeWidth="0.4"
                strokeDasharray="2 6"
              />
            );
          }),
        )}

        {/* ── Edge glow layers ── */}
        {EDGES.map((e) => {
          const f = NODES.find((n) => n.id === e.from)!;
          const t = NODES.find((n) => n.id === e.to)!;
          return (
            <line
              key={`gl${e.from}${e.to}`}
              data-eglow={`${e.from}-${e.to}`}
              x1={f.x}
              y1={f.y}
              x2={t.x}
              y2={t.y}
              stroke={`url(#eg${e.from}${e.to})`}
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#g3)"
              style={{ opacity: 0 }}
            />
          );
        })}

        {/* ── Edges ── */}
        {EDGES.map((e) => {
          const f = NODES.find((n) => n.id === e.from)!;
          const t = NODES.find((n) => n.id === e.to)!;
          return (
            <line
              key={`e${e.from}${e.to}`}
              data-edge={`${e.from}-${e.to}`}
              x1={f.x}
              y1={f.y}
              x2={t.x}
              y2={t.y}
              stroke={`url(#eg${e.from}${e.to})`}
              strokeWidth="0.8"
              strokeLinecap="round"
              style={{ opacity: 0.12 }}
            />
          );
        })}

        {/* ── Orbit ellipses (electron shells) ── */}
        {NODES.map((n, i) => {
          const cfg = ORBITS[i];
          return (
            <g key={`orb${n.id}`}>
              <ellipse
                data-orbit={n.id}
                cx={n.x}
                cy={n.y}
                rx={cfg.rx}
                ry={cfg.ry}
                fill="none"
                stroke={`rgba(${dc(n.depth)}, 0.3)`}
                strokeWidth="0.6"
                strokeDasharray="3 5"
                style={{ opacity: 0.08 }}
                transform={`rotate(${cfg.tilt} ${n.x} ${n.y})`}
              />
              <circle
                data-orbit-dot={n.id}
                cx={n.x + cfg.rx}
                cy={n.y}
                r={1.8}
                fill={`rgba(${dc(n.depth)}, 0.9)`}
                filter="url(#g1)"
                style={{ opacity: 0.12 }}
              />
            </g>
          );
        })}

        {/* ── Triple ripple rings per node ── */}
        {NODES.map((n) =>
          [0, 1, 2].map((r) => (
            <circle
              key={`r${n.id}${r}`}
              data-ring={`${n.id}-${r}`}
              cx={n.x}
              cy={n.y}
              r={8}
              fill="none"
              stroke={`rgba(${dc(n.depth)}, ${0.6 - r * 0.15})`}
              strokeWidth={1.5 - r * 0.3}
              style={{ opacity: 0 }}
            />
          )),
        )}

        {/* ── Node outer halo ── */}
        {NODES.map((n) => (
          <circle
            key={`nh${n.id}`}
            cx={n.x}
            cy={n.y}
            r={10}
            fill={`rgba(${dc(n.depth)}, 0.06)`}
            filter="url(#g4)"
          />
        ))}

        {/* ── Nodes ── */}
        {NODES.map((n) => (
          <circle
            key={`n${n.id}`}
            data-node={n.id}
            cx={n.x}
            cy={n.y}
            r={4.5}
            fill={`rgba(${dc(n.depth)}, 0.5)`}
            filter="url(#g1)"
            style={{ opacity: 0.2 }}
          />
        ))}

        {/* ── Pulse trail 2 (outermost ghost) ── */}
        <circle
          data-pulse-trail2=""
          cx={NODES[0].x}
          cy={NODES[0].y}
          r={18}
          fill="rgba(139,92,246,0.3)"
          filter="url(#g4)"
          style={{ opacity: 0 }}
        />

        {/* ── Pulse trail 1 ── */}
        <circle
          data-pulse-trail=""
          cx={NODES[0].x}
          cy={NODES[0].y}
          r={12}
          fill="rgba(139,92,246,0.5)"
          filter="url(#g2)"
          style={{ opacity: 0 }}
        />

        {/* ── Pulse (main bright dot) ── */}
        <circle
          data-pulse=""
          cx={NODES[0].x}
          cy={NODES[0].y}
          r={6}
          fill="rgba(168,85,247,1)"
          filter="url(#g2)"
          style={{ opacity: 0 }}
        />
      </svg>
    </div>
  );
}
