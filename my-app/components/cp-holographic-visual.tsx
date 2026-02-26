"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";

/* ════════════════════════════════════════════════════════════════════════════
 *  CPHolographicVisual — A gorgeous iridescent holographic CP-themed
 *  hero visual with:
 *    • Holographic shimmering card with rainbow refraction
 *    • Animated code snippets cycling through algorithms
 *    • Floating connected graph nodes with pulse effects
 *    • Binary data stream rain
 *    • Subtle scan-line & CRT-like effects
 * ════════════════════════════════════════════════════════════════════════════ */

const CODE_SNIPPETS = [
  {
    title: "merge_sort.cpp",
    lines: [
      "void merge_sort(int a[], int l, int r) {",
      "  if (l >= r) return;",
      "  int mid = (l + r) / 2;",
      "  merge_sort(a, l, mid);",
      "  merge_sort(a, mid + 1, r);",
      "  merge(a, l, mid, r);",
      "}",
    ],
  },
  {
    title: "dijkstra.cpp",
    lines: [
      "void dijkstra(int src) {",
      "  dist[src] = 0;",
      "  pq.push({0, src});",
      "  while (!pq.empty()) {",
      "    auto [d, u] = pq.top();",
      "    for (auto [v, w] : adj[u])",
      "      relax(u, v, w);",
      "  }",
      "}",
    ],
  },
  {
    title: "binary_search.cpp",
    lines: [
      "int search(int a[], int t) {",
      "  int lo = 0, hi = n - 1;",
      "  while (lo <= hi) {",
      "    int mid = (lo + hi) / 2;",
      "    if (a[mid] == t) return mid;",
      "    a[mid] < t ? lo=mid+1",
      "               : hi=mid-1;",
      "  }",
      "  return -1;",
      "}",
    ],
  },
  {
    title: "dfs.cpp",
    lines: [
      "void dfs(int u) {",
      "  vis[u] = true;",
      "  for (int v : adj[u]) {",
      "    if (!vis[v]) {",
      "      par[v] = u;",
      "      dfs(v);",
      "    }",
      "  }",
      "}",
    ],
  },
  {
    title: "segment_tree.cpp",
    lines: [
      "void build(int v, int l, int r) {",
      "  if (l == r) { t[v]=a[l]; return; }",
      "  int mid = (l + r) / 2;",
      "  build(2*v, l, mid);",
      "  build(2*v+1, mid+1, r);",
      "  t[v] = t[2*v] + t[2*v+1];",
      "}",
    ],
  },
];

/* ── Floating graph nodes for the background ── */
const GRAPH_NODES = [
  { x: 15, y: 20 },
  { x: 40, y: 12 },
  { x: 65, y: 22 },
  { x: 85, y: 15 },
  { x: 25, y: 45 },
  { x: 55, y: 40 },
  { x: 78, y: 42 },
  { x: 12, y: 70 },
  { x: 38, y: 68 },
  { x: 62, y: 72 },
  { x: 88, y: 65 },
  { x: 50, y: 88 },
];

const GRAPH_EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 6],
  [4, 5],
  [5, 6],
  [4, 7],
  [5, 8],
  [6, 10],
  [7, 8],
  [8, 9],
  [9, 10],
  [8, 11],
  [9, 11],
];

/* ── Typing code animation ── */
function AnimatedCode({
  snippet,
  onDone,
}: {
  snippet: (typeof CODE_SNIPPETS)[0];
  onDone: () => void;
}) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    setVisibleLines(0);
    setCharIndex(0);
  }, [snippet]);

  useEffect(() => {
    if (visibleLines >= snippet.lines.length) {
      timerRef.current = setTimeout(onDone, 2200);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    const currentLine = snippet.lines[visibleLines];
    if (charIndex >= currentLine.length) {
      timerRef.current = setTimeout(() => {
        setVisibleLines((v) => v + 1);
        setCharIndex(0);
      }, 80);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    timerRef.current = setTimeout(() => {
      setCharIndex((c) => c + 2); // type 2 chars at a time for speed
    }, 25);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visibleLines, charIndex, snippet, onDone]);

  return (
    <div className="font-mono text-[10px] sm:text-xs leading-relaxed">
      {snippet.lines.map((line, i) => {
        if (i > visibleLines) return null;
        const text = i === visibleLines ? line.slice(0, charIndex) : line;
        const isCurrentLine =
          i === visibleLines && visibleLines < snippet.lines.length;
        return (
          <div key={i} className="flex">
            <span className="text-white/15 w-5 sm:w-6 text-right mr-2 sm:mr-3 select-none shrink-0">
              {i + 1}
            </span>
            <span className="text-cyan-300/80">
              {colorize(text)}
              {isCurrentLine && (
                <span className="inline-block w-1.5 h-3.5 sm:h-4 bg-cyan-400/80 ml-0.5 animate-pulse rounded-sm" />
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Syntax-ish coloring ── */
function colorize(text: string) {
  const keywords = /\b(void|int|bool|return|if|for|while|auto|true|false)\b/g;
  const funcs =
    /\b(merge_sort|merge|dijkstra|relax|search|dfs|build|push|pop|empty|top)\b/g;
  const nums = /\b(\d+)\b/g;
  const ops = /([{}();\[\]<>])/g;

  const parts: { text: string; cls: string }[] = [];
  let last = 0;

  const allMatches: { start: number; end: number; cls: string }[] = [];

  for (const m of text.matchAll(keywords)) {
    allMatches.push({
      start: m.index!,
      end: m.index! + m[0].length,
      cls: "text-purple-400",
    });
  }
  for (const m of text.matchAll(funcs)) {
    allMatches.push({
      start: m.index!,
      end: m.index! + m[0].length,
      cls: "text-amber-300/90",
    });
  }
  for (const m of text.matchAll(nums)) {
    allMatches.push({
      start: m.index!,
      end: m.index! + m[0].length,
      cls: "text-emerald-400/90",
    });
  }
  for (const m of text.matchAll(ops)) {
    allMatches.push({
      start: m.index!,
      end: m.index! + m[0].length,
      cls: "text-white/40",
    });
  }

  allMatches.sort((a, b) => a.start - b.start);

  // Resolve overlaps (first match wins)
  const resolved: typeof allMatches = [];
  let cursor = 0;
  for (const m of allMatches) {
    if (m.start >= cursor) {
      resolved.push(m);
      cursor = m.end;
    }
  }

  last = 0;
  const elements: React.ReactNode[] = [];
  for (const m of resolved) {
    if (m.start > last) {
      elements.push(
        <span key={`t-${last}`} className="text-cyan-300/70">
          {text.slice(last, m.start)}
        </span>,
      );
    }
    elements.push(
      <span key={`m-${m.start}`} className={m.cls}>
        {text.slice(m.start, m.end)}
      </span>,
    );
    last = m.end;
  }
  if (last < text.length) {
    elements.push(
      <span key={`t-${last}`} className="text-cyan-300/70">
        {text.slice(last)}
      </span>,
    );
  }

  return <>{elements}</>;
}

/* ── Pulsing graph overlay with animated pathfinding ── */
function GraphOverlay() {
  const [activeEdge, setActiveEdge] = useState(0);
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEdge((prev) => {
        const next = (prev + 1) % GRAPH_EDGES.length;
        const [from, to] = GRAPH_EDGES[next];
        setVisitedNodes((s) => {
          const ns = new Set(s);
          ns.add(from);
          ns.add(to);
          if (ns.size > 8) {
            // Reset when too many visited
            return new Set([from, to]);
          }
          return ns;
        });
        return next;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.35 }}
    >
      <defs>
        <filter id="glow-edge">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-node">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {GRAPH_EDGES.map(([from, to], i) => {
        const a = GRAPH_NODES[from];
        const b = GRAPH_NODES[to];
        const isActive = i === activeEdge;
        return (
          <line
            key={`e-${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={isActive ? "rgba(6,182,212,0.7)" : "rgba(139,92,246,0.15)"}
            strokeWidth={isActive ? 0.6 : 0.3}
            filter={isActive ? "url(#glow-edge)" : undefined}
            className="transition-all duration-500"
          />
        );
      })}

      {/* Nodes */}
      {GRAPH_NODES.map((node, i) => {
        const isVisited = visitedNodes.has(i);
        const [from, to] = GRAPH_EDGES[activeEdge];
        const isCurrent = i === from || i === to;
        return (
          <g key={`n-${i}`}>
            {isCurrent && (
              <circle
                cx={node.x}
                cy={node.y}
                r={3}
                fill="none"
                stroke="rgba(6,182,212,0.3)"
                strokeWidth={0.5}
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="5"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r={isCurrent ? 1.8 : isVisited ? 1.4 : 1}
              fill={
                isCurrent
                  ? "rgba(6,182,212,0.9)"
                  : isVisited
                    ? "rgba(134,239,172,0.6)"
                    : "rgba(139,92,246,0.3)"
              }
              filter={isCurrent ? "url(#glow-node)" : undefined}
              className="transition-all duration-300"
            />
          </g>
        );
      })}

      {/* Travelling pulse on active edge */}
      {(() => {
        const [from, to] = GRAPH_EDGES[activeEdge];
        const a = GRAPH_NODES[from];
        const b = GRAPH_NODES[to];
        return (
          <circle r="0.8" fill="rgba(6,182,212,1)" filter="url(#glow-node)">
            <animateMotion
              dur="0.6s"
              repeatCount="1"
              path={`M${a.x},${a.y} L${b.x},${b.y}`}
            />
          </circle>
        );
      })()}
    </svg>
  );
}

/* ── Binary rain columns ── */
function BinaryRain() {
  const columns = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      x: 5 + i * 8.5,
      speed: 8 + Math.random() * 12,
      delay: Math.random() * 5,
      chars: Array.from({ length: 8 }, () => (Math.random() > 0.5 ? "1" : "0")),
    }));
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity: 0.08 }}
    >
      {columns.map((col, i) => (
        <div
          key={i}
          className="absolute top-0 font-mono text-[8px] text-cyan-400 flex flex-col gap-1"
          style={{
            left: `${col.x}%`,
            animation: `binaryFall ${col.speed}s linear ${col.delay}s infinite`,
          }}
        >
          {col.chars.map((c, j) => (
            <span key={j} style={{ opacity: 0.3 + j * 0.1 }}>
              {c}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ═══════════ MAIN COMPONENT ═══════════ */
export function CPHolographicVisual({
  className = "",
}: {
  className?: string;
}) {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSnippet = CODE_SNIPPETS[snippetIdx];

  const handleNext = () => {
    setSnippetIdx((prev) => (prev + 1) % CODE_SNIPPETS.length);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  // Holographic gradient angle based on mouse
  const holoAngle = mousePos.x * 60 + mousePos.y * 30 + 120;
  const holoX = mousePos.x * 100;
  const holoY = mousePos.y * 100;

  return (
    <div className={`relative ${className}`}>
      {/* Inject keyframes */}
      <style>{`
        @keyframes binaryFall {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(500px); opacity: 0; }
        }
        @keyframes holoShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        @keyframes borderGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>

      {/* Outer glow */}
      <div
        className="absolute -inset-4 sm:-inset-8 rounded-3xl opacity-40 blur-2xl sm:blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${holoX}% ${holoY}%, rgba(139,92,246,0.3), rgba(6,182,212,0.15), transparent 70%)`,
        }}
      />

      {/* Main holographic card */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 20, rotateX: 5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative rounded-2xl overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        {/* Holographic rainbow border */}
        <div
          className="absolute -inset-px rounded-2xl z-0"
          style={{
            background: `linear-gradient(${holoAngle}deg, 
              rgba(255,0,128,0.4), 
              rgba(255,165,0,0.3), 
              rgba(255,255,0,0.3), 
              rgba(0,255,128,0.4), 
              rgba(0,200,255,0.4), 
              rgba(139,92,246,0.5), 
              rgba(255,0,128,0.4))`,
            backgroundSize: "200% 200%",
            animation: "holoShimmer 4s ease infinite",
          }}
        />

        {/* Inner card */}
        <div className="relative z-10 m-px rounded-2xl bg-[#07070f]/92 backdrop-blur-xl overflow-hidden">
          {/* Holographic overlay shimmer */}
          <div
            className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
            style={{
              background: `linear-gradient(${holoAngle + 45}deg, 
                transparent 0%, 
                rgba(255,255,255,0.03) 25%, 
                rgba(200,180,255,0.06) 35%,
                rgba(100,220,255,0.05) 50%, 
                rgba(255,200,255,0.04) 65%,
                transparent 100%)`,
              backgroundPosition: `${holoX}% ${holoY}%`,
            }}
          />

          {/* Scan line effect */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            <div
              className="w-full h-8 sm:h-12"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(6,182,212,0.02), transparent)",
                animation: "scanLine 4s linear infinite",
              }}
            />
          </div>

          {/* Graph overlay (background layer) */}
          <div className="absolute inset-0 z-0">
            <GraphOverlay />
          </div>

          {/* Binary rain */}
          <BinaryRain />

          {/* Content */}
          <div className="relative z-10 p-4 sm:p-6">
            {/* Top bar — fake terminal header */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-pulse" />
                <span className="text-[9px] sm:text-[10px] font-mono text-white/25 tracking-wider uppercase">
                  {currentSnippet.title}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {CODE_SNIPPETS.map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-all duration-500"
                    style={{
                      background:
                        i === snippetIdx
                          ? "rgb(6, 182, 212)"
                          : "rgba(255,255,255,0.1)",
                      boxShadow:
                        i === snippetIdx
                          ? "0 0 6px rgba(6,182,212,0.5)"
                          : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Separator */}
            <div
              className="h-px mb-3 sm:mb-4"
              style={{
                background: `linear-gradient(to right, transparent, rgba(139,92,246,0.3), rgba(6,182,212,0.3), transparent)`,
              }}
            />

            {/* Code area */}
            <div className="min-h-32 sm:min-h-44">
              <AnimatedCode snippet={currentSnippet} onDone={handleNext} />
            </div>

            {/* Bottom info bar */}
            <div
              className="mt-3 sm:mt-4 pt-3 sm:pt-4 flex items-center justify-between"
              style={{
                borderTop: "1px solid rgba(139,92,246,0.1)",
              }}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400/50" />
                  <span className="text-[8px] sm:text-[9px] font-mono text-green-400/40">
                    AC
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="text-[8px] sm:text-[9px] font-mono text-purple-400/40">
                    O(n log n)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-[8px] sm:text-[9px] font-mono text-white/15">
                  {"<"}/{">"}
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono text-cyan-400/30">
                  competitive_coding
                </span>
              </div>
            </div>
          </div>

          {/* Edge glow accents */}
          <div
            className="absolute top-0 left-0 w-16 sm:w-24 h-px"
            style={{
              background:
                "linear-gradient(to right, rgba(139,92,246,0.6), transparent)",
              animation: "borderGlow 3s ease infinite",
            }}
          />
          <div
            className="absolute top-0 right-0 w-16 sm:w-24 h-px"
            style={{
              background:
                "linear-gradient(to left, rgba(6,182,212,0.6), transparent)",
              animation: "borderGlow 3s ease 1.5s infinite",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-16 sm:w-24 h-px"
            style={{
              background:
                "linear-gradient(to right, rgba(6,182,212,0.6), transparent)",
              animation: "borderGlow 3s ease 0.75s infinite",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-16 sm:w-24 h-px"
            style={{
              background:
                "linear-gradient(to left, rgba(139,92,246,0.6), transparent)",
              animation: "borderGlow 3s ease 2.25s infinite",
            }}
          />

          {/* Corner accents */}
          <div
            className="absolute top-0 left-0 w-px h-8 sm:h-12"
            style={{
              background:
                "linear-gradient(to bottom, rgba(139,92,246,0.5), transparent)",
            }}
          />
          <div
            className="absolute top-0 right-0 w-px h-8 sm:h-12"
            style={{
              background:
                "linear-gradient(to bottom, rgba(6,182,212,0.5), transparent)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-px h-8 sm:h-12"
            style={{
              background:
                "linear-gradient(to top, rgba(6,182,212,0.5), transparent)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-px h-8 sm:h-12"
            style={{
              background:
                "linear-gradient(to top, rgba(139,92,246,0.5), transparent)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
