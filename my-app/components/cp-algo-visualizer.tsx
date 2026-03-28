"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { HolographicAlgoCard } from "@/components/cp-algo-card-holographic";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  X,
  BarChart3,
  GitBranch,
  Layers,
  Zap,
  Network,
  Search,
  Route,
  Share2,
  Binary,
  TrendingUp,
  ArrowUpDown,
  Check,
  Star,
  Diamond,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  HelpCircle,
  Circle,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
 *  TYPES
 * ═══════════════════════════════════════════════════════ */

type AlgoId =
  | "bubble"
  | "merge"
  | "quick"
  | "heap"
  | "bfs"
  | "dfs"
  | "binary-search"
  | "dijkstra"
  | "prim"
  | "kruskal"
  | "heapify"
  | "kadane";
type AlgoCategory =
  | "sorting"
  | "traversal"
  | "searching"
  | "graph"
  | "data-structure"
  | "dynamic-programming";

interface AlgoInfo {
  id: AlgoId;
  name: string;
  category: AlgoCategory;
  description: string;
  complexity: string;
  icon: React.ReactNode;
  gradient: string;
  glow: string;
  border: string;
  accent: string;
}

/* ═══════════════════════════════════════════════════════
 *  ALGO DEFINITIONS
 * ═══════════════════════════════════════════════════════ */

const ALGOS: AlgoInfo[] = [
  {
    id: "bubble",
    name: "Bubble Sort",
    category: "sorting",
    description:
      "Repeatedly swaps adjacent elements if they are in the wrong order",
    complexity: "O(n²)",
    icon: <BarChart3 className="w-7 h-7" />,
    gradient: "from-purple-600/20 via-violet-600/10 to-purple-600/20",
    glow: "rgba(168,130,255,0.35)",
    border: "border-purple-500/20 hover:border-purple-400/40",
    accent: "text-purple-300",
  },
  {
    id: "merge",
    name: "Merge Sort",
    category: "sorting",
    description:
      "Divide and conquer — splits array, sorts halves, merges them back",
    complexity: "O(n log n)",
    icon: <Layers className="w-7 h-7" />,
    gradient: "from-purple-600/20 via-violet-600/10 to-purple-600/20",
    glow: "rgba(168,130,255,0.35)",
    border: "border-purple-500/20 hover:border-purple-400/40",
    accent: "text-purple-300",
  },
  {
    id: "quick",
    name: "Quick Sort",
    category: "sorting",
    description: "Picks a pivot, partitions around it, then recursively sorts",
    complexity: "O(n log n)",
    icon: <Zap className="w-7 h-7" />,
    gradient: "from-purple-600/20 via-violet-600/10 to-purple-600/20",
    glow: "rgba(168,130,255,0.35)",
    border: "border-purple-500/20 hover:border-purple-400/40",
    accent: "text-purple-300",
  },
  {
    id: "bfs",
    name: "BFS Traversal",
    category: "traversal",
    description:
      "Explores all neighbors at current depth before moving deeper — uses a Queue",
    complexity: "O(V + E)",
    icon: <Network className="w-7 h-7" />,
    gradient: "from-purple-600/20 via-violet-600/10 to-purple-600/20",
    glow: "rgba(168,130,255,0.35)",
    border: "border-purple-500/20 hover:border-purple-400/40",
    accent: "text-purple-300",
  },
  {
    id: "dfs",
    name: "DFS Traversal",
    category: "traversal",
    description: "Goes as deep as possible before backtracking — uses a Stack",
    complexity: "O(V + E)",
    icon: <GitBranch className="w-7 h-7" />,
    gradient: "from-purple-600/20 via-violet-600/10 to-purple-600/20",
    glow: "rgba(168,130,255,0.35)",
    border: "border-purple-500/20 hover:border-purple-400/40",
    accent: "text-purple-300",
  },
  {
    id: "heap",
    name: "Heap Sort",
    category: "sorting",
    description:
      "Builds a max-heap then repeatedly extracts the maximum element",
    complexity: "O(n log n)",
    icon: <ArrowUpDown className="w-7 h-7" />,
    gradient: "from-purple-600/20 via-violet-600/10 to-purple-600/20",
    glow: "rgba(168,130,255,0.35)",
    border: "border-purple-500/20 hover:border-purple-400/40",
    accent: "text-purple-300",
  },
  {
    id: "binary-search",
    name: "Binary Search",
    category: "searching",
    description:
      "Halves the search space each step on a sorted array to find a target",
    complexity: "O(log n)",
    icon: <Search className="w-7 h-7" />,
    gradient: "from-purple-600/20 via-violet-600/10 to-purple-600/20",
    glow: "rgba(168,130,255,0.35)",
    border: "border-purple-500/20 hover:border-purple-400/40",
    accent: "text-purple-300",
  },
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    category: "graph",
    description:
      "Finds shortest path from a source to all other nodes in a weighted graph",
    complexity: "O(V² / E log V)",
    icon: <Route className="w-7 h-7" />,
    gradient: "from-purple-600/20 via-violet-600/10 to-purple-600/20",
    glow: "rgba(168,130,255,0.35)",
    border: "border-purple-500/20 hover:border-purple-400/40",
    accent: "text-purple-300",
  },
  {
    id: "prim",
    name: "Prim's Algorithm",
    category: "graph",
    description:
      "Grows an MST by always adding the cheapest edge from the tree frontier",
    complexity: "O(E log V)",
    icon: <Share2 className="w-7 h-7" />,
    gradient: "from-purple-600/20 via-violet-600/10 to-purple-600/20",
    glow: "rgba(168,130,255,0.35)",
    border: "border-purple-500/20 hover:border-purple-400/40",
    accent: "text-purple-300",
  },
  {
    id: "kruskal",
    name: "Kruskal's Algorithm",
    category: "graph",
    description:
      "Sorts edges by weight and adds them if they don't form a cycle (Union-Find)",
    complexity: "O(E log E)",
    icon: <Network className="w-7 h-7" />,
    gradient: "from-purple-600/20 via-violet-600/10 to-purple-600/20",
    glow: "rgba(168,130,255,0.35)",
    border: "border-purple-500/20 hover:border-purple-400/40",
    accent: "text-purple-300",
  },
  {
    id: "heapify",
    name: "Heapify (Max & Min)",
    category: "data-structure",
    description:
      "Transforms an array into a valid max-heap or min-heap in-place",
    complexity: "O(n)",
    icon: <Binary className="w-7 h-7" />,
    gradient: "from-purple-600/20 via-violet-600/10 to-purple-600/20",
    glow: "rgba(168,130,255,0.35)",
    border: "border-purple-500/20 hover:border-purple-400/40",
    accent: "text-purple-300",
  },
  {
    id: "kadane",
    name: "Kadane's Algorithm",
    category: "dynamic-programming",
    description:
      "Finds the maximum contiguous subarray sum in O(n) — a classic DP technique",
    complexity: "O(n)",
    icon: <TrendingUp className="w-7 h-7" />,
    gradient: "from-purple-600/20 via-violet-600/10 to-purple-600/20",
    glow: "rgba(168,130,255,0.35)",
    border: "border-purple-500/20 hover:border-purple-400/40",
    accent: "text-purple-300",
  },
];

/* ═══════════════════════════════════════════════════════
 *  SORTING ENGINE — generates swap/compare/pivot ops
 * ═══════════════════════════════════════════════════════ */

type SortOp =
  | { type: "compare"; indices: [number, number] }
  | { type: "swap"; indices: [number, number] }
  | { type: "pivot"; index: number }
  | { type: "sorted"; index: number };

function generateBubbleOps(arr: number[]): SortOp[] {
  const a = [...arr];
  const ops: SortOp[] = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      ops.push({ type: "compare", indices: [j, j + 1] });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        ops.push({ type: "swap", indices: [j, j + 1] });
      }
    }
    ops.push({ type: "sorted", index: a.length - 1 - i });
  }
  return ops;
}

function generateMergeOps(arr: number[]): SortOp[] {
  const a = [...arr];
  const ops: SortOp[] = [];

  function mergeSort(lo: number, hi: number) {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    mergeSort(lo, mid);
    mergeSort(mid + 1, hi);
    merge(lo, mid, hi);
  }

  function merge(lo: number, mid: number, hi: number) {
    const temp = a.slice(lo, hi + 1);
    let i = 0;
    let j = mid - lo + 1;
    let k = lo;
    while (i <= mid - lo && j <= hi - lo) {
      ops.push({ type: "compare", indices: [lo + i, lo + j] });
      if (temp[i] <= temp[j]) {
        a[k] = temp[i];
        i++;
      } else {
        a[k] = temp[j];
        ops.push({ type: "swap", indices: [k, lo + j] });
        j++;
      }
      k++;
    }
    while (i <= mid - lo) {
      a[k] = temp[i];
      i++;
      k++;
    }
    while (j <= hi - lo) {
      a[k] = temp[j];
      j++;
      k++;
    }
  }

  mergeSort(0, a.length - 1);
  for (let i = 0; i < a.length; i++) ops.push({ type: "sorted", index: i });
  return ops;
}

function generateQuickOps(arr: number[]): SortOp[] {
  const a = [...arr];
  const ops: SortOp[] = [];

  function qs(lo: number, hi: number) {
    if (lo >= hi) {
      if (lo === hi) ops.push({ type: "sorted", index: lo });
      return;
    }
    ops.push({ type: "pivot", index: hi });
    let i = lo;
    for (let j = lo; j < hi; j++) {
      ops.push({ type: "compare", indices: [j, hi] });
      if (a[j] < a[hi]) {
        if (i !== j) {
          [a[i], a[j]] = [a[j], a[i]];
          ops.push({ type: "swap", indices: [i, j] });
        }
        i++;
      }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    ops.push({ type: "swap", indices: [i, hi] });
    ops.push({ type: "sorted", index: i });
    qs(lo, i - 1);
    qs(i + 1, hi);
  }

  qs(0, a.length - 1);
  return ops;
}

/* ═══════════════════════════════════════════════════════
 *  TREE STRUCTURE (10-node binary tree)
 * ═══════════════════════════════════════════════════════ */

interface TNode {
  id: number;
  value: number;
  left?: TNode;
  right?: TNode;
}

function buildTree(): TNode {
  // balanced-ish binary tree with values 1–10
  return {
    id: 0,
    value: 1,
    left: {
      id: 1,
      value: 2,
      left: {
        id: 3,
        value: 4,
        left: { id: 7, value: 8 },
        right: { id: 8, value: 9 },
      },
      right: { id: 4, value: 5, left: { id: 9, value: 10 } },
    },
    right: {
      id: 2,
      value: 3,
      left: { id: 5, value: 6 },
      right: { id: 6, value: 7 },
    },
  };
}

type TravOp = {
  type: "visit" | "enqueue" | "dequeue" | "push" | "pop" | "complete";
  nodeId: number;
};

function generateBFSOps(root: TNode): TravOp[] {
  const ops: TravOp[] = [];
  const queue: TNode[] = [root];
  ops.push({ type: "enqueue", nodeId: root.id });
  while (queue.length > 0) {
    const node = queue.shift()!;
    ops.push({ type: "dequeue", nodeId: node.id });
    ops.push({ type: "visit", nodeId: node.id });
    if (node.left) {
      queue.push(node.left);
      ops.push({ type: "enqueue", nodeId: node.left.id });
    }
    if (node.right) {
      queue.push(node.right);
      ops.push({ type: "enqueue", nodeId: node.right.id });
    }
  }
  ops.push({ type: "complete", nodeId: -1 });
  return ops;
}

function generateDFSOps(root: TNode): TravOp[] {
  const ops: TravOp[] = [];
  const stack: TNode[] = [root];
  ops.push({ type: "push", nodeId: root.id });
  while (stack.length > 0) {
    const node = stack.pop()!;
    ops.push({ type: "pop", nodeId: node.id });
    ops.push({ type: "visit", nodeId: node.id });
    // push right first so left is processed first
    if (node.right) {
      stack.push(node.right);
      ops.push({ type: "push", nodeId: node.right.id });
    }
    if (node.left) {
      stack.push(node.left);
      ops.push({ type: "push", nodeId: node.left.id });
    }
  }
  ops.push({ type: "complete", nodeId: -1 });
  return ops;
}

/* tree layout positions (hardcoded for 10 nodes) */
const TREE_NODES: { id: number; value: number; x: number; y: number }[] = [
  { id: 0, value: 1, x: 400, y: 40 }, // root
  { id: 1, value: 2, x: 220, y: 130 }, // L
  { id: 2, value: 3, x: 580, y: 130 }, // R
  { id: 3, value: 4, x: 130, y: 230 }, // LL
  { id: 4, value: 5, x: 310, y: 230 }, // LR
  { id: 5, value: 6, x: 490, y: 230 }, // RL
  { id: 6, value: 7, x: 670, y: 230 }, // RR
  { id: 7, value: 8, x: 80, y: 340 }, // LLL
  { id: 8, value: 9, x: 180, y: 340 }, // LLR
  { id: 9, value: 10, x: 300, y: 340 }, // LRL
];

const TREE_EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [2, 6],
  [3, 7],
  [3, 8],
  [4, 9],
];

/* ═══════════════════════════════════════════════════════
 *  MAIN COMPONENT
 * ═══════════════════════════════════════════════════════ */

export function CPAlgoVisualizer() {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgoId | null>(null);
  const [activeCategory, setActiveCategory] = useState<AlgoCategory | "all">(
    "all",
  );

  const filteredAlgos = useMemo(() => {
    if (activeCategory === "all") return ALGOS;
    return ALGOS.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
        {/* Ambient glows */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-15%] left-[-5%] w-125 h-125 bg-purple-600/7 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-15%] right-[-5%] w-112.5 h-112.5 bg-blue-600/6 rounded-full blur-[100px]" />
          <div className="absolute top-[30%] right-[10%] w-80 h-80 bg-cyan-600/5 rounded-full blur-[100px]" />
        </div>
        {/* Subtle grid background */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.12) 0.5px, transparent 0.5px)",
            backgroundSize: "40px 40px",
            opacity: 0.03,
          }}
        />

        <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14 flex flex-col md:flex-row md:items-start justify-between gap-6"
          >
            <div>
              <h1 className="text-4xl md:text-6xl font-black mb-3">
                <span className="bg-linear-to-r from-purple-400 via-pink-300 to-cyan-400 bg-clip-text text-transparent">
                  Algorithm Lab
                </span>
              </h1>
              <p className="text-white/40 text-lg max-w-xl">
                Pick an algorithm. Watch it run on 10 elements. Understand the
                magic behind the code.
              </p>
            </div>

            <Link
              href="/members/competitive-coding"
              className="group inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-white/80 hover:text-white text-sm font-semibold transition-all backdrop-blur-md shadow-lg shadow-black/20 self-start md:mt-4"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Team
            </Link>
          </motion.div>

          {/* ─── Terminal-style Category Filter ─── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-1 px-4 py-2 mb-5 rounded-lg bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
              <span className="text-emerald-400/70 font-mono text-xs">$</span>
              <span className="text-white/25 font-mono text-xs">
                filter --category=
              </span>
              <span className="text-cyan-300/80 font-mono text-xs font-bold">
                {activeCategory}
              </span>
              <span className="w-1.5 h-4 bg-cyan-400/50 ml-1 algo-cursor-blink" />
            </div>

            <div className="flex flex-wrap gap-2">
              {(
                [
                  {
                    value: "all",
                    label: "ALL",
                    icon: <Zap className="w-3.5 h-3.5" />,
                  },
                  {
                    value: "sorting",
                    label: "SORT",
                    icon: <BarChart3 className="w-3.5 h-3.5" />,
                  },
                  {
                    value: "searching",
                    label: "SEARCH",
                    icon: <Search className="w-3.5 h-3.5" />,
                  },
                  {
                    value: "traversal",
                    label: "TRAVERSE",
                    icon: <GitBranch className="w-3.5 h-3.5" />,
                  },
                  {
                    value: "graph",
                    label: "GRAPH",
                    icon: <Route className="w-3.5 h-3.5" />,
                  },
                  {
                    value: "data-structure",
                    label: "DS",
                    icon: <Binary className="w-3.5 h-3.5" />,
                  },
                  {
                    value: "dynamic-programming",
                    label: "DP",
                    icon: <TrendingUp className="w-3.5 h-3.5" />,
                  },
                ] as {
                  value: AlgoCategory | "all";
                  label: string;
                  icon: React.ReactNode;
                }[]
              ).map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`relative px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-2 overflow-hidden ${
                    activeCategory === cat.value
                      ? "text-white"
                      : "text-white/25 hover:text-white/50 border border-transparent hover:border-white/[0.06]"
                  }`}
                >
                  {activeCategory === cat.value && (
                    <motion.div
                      layoutId="algoLabCatTab"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow:
                          "0 0 24px rgba(139,92,246,0.12), inset 0 0 24px rgba(139,92,246,0.04)",
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.5,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {cat.icon}
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* ─── Algorithm Cards Grid ─── */}
          <LayoutGroup>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredAlgos.map((algo, i) => (
                  <HolographicAlgoCard
                    key={algo.id}
                    algo={algo}
                    index={i}
                    onClick={() => setSelectedAlgo(algo.id)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>

        {/* Fullscreen visualizer overlay */}
        <AnimatePresence>
          {selectedAlgo && (
            <FullscreenVisualizer
              algoId={selectedAlgo}
              onClose={() => setSelectedAlgo(null)}
            />
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

/* ═══════════════════════════════════════════════════════
 *  ALGO CARD
 * ═══════════════════════════════════════════════════════ */

/* ─── Mini Visual Previews for Cards ─── */

function MiniSortBars({
  variant,
}: {
  variant: "bubble" | "merge" | "quick" | "heap";
}) {
  // Static bar snapshot with highlighted pair to show the algorithm idea
  const configs = {
    bubble: {
      bars: [4, 7, 2, 9, 3, 6, 1, 8],
      hi: [1, 2],
      hiColor: "rgb(196,181,253)",
    },
    merge: {
      bars: [2, 4, 7, 9, 1, 3, 6, 8],
      hi: [0, 1, 2, 3],
      hiColor: "rgb(129,140,248)",
    },
    quick: {
      bars: [3, 1, 4, 7, 2, 8, 5, 6],
      hi: [7],
      hiColor: "rgb(251,191,36)",
    },
    heap: {
      bars: [9, 7, 8, 3, 6, 2, 5, 1],
      hi: [0],
      hiColor: "rgb(251,113,133)",
    },
  };
  const { bars, hi, hiColor } = configs[variant];
  return (
    <div className="flex items-end gap-0.75 h-10 mt-1">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-2 rounded-sm transition-all duration-300"
          style={{
            height: `${h * 10}%`,
            backgroundColor: hi.includes(i)
              ? hiColor
              : "rgba(255,255,255,0.12)",
            boxShadow: hi.includes(i) ? `0 0 6px ${hiColor}` : "none",
          }}
        />
      ))}
    </div>
  );
}

function MiniTreeGraph({ variant }: { variant: "bfs" | "dfs" }) {
  const nodes = [
    { x: 28, y: 4 },
    { x: 14, y: 16 },
    { x: 42, y: 16 },
    { x: 7, y: 28 },
    { x: 21, y: 28 },
    { x: 35, y: 28 },
    { x: 49, y: 28 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [2, 6],
  ];
  // BFS visits level by level, DFS goes deep first
  const visited = variant === "bfs" ? [0, 1, 2, 3] : [0, 1, 3, 4];
  const current = variant === "bfs" ? 3 : 4;
  const accentColor = variant === "bfs" ? "rgb(6,182,212)" : "rgb(16,185,129)";
  return (
    <svg viewBox="0 0 56 38" className="w-full h-10 mt-1">
      {edges.map(([f, t]) => (
        <line
          key={`${f}-${t}`}
          x1={nodes[f].x}
          y1={nodes[f].y + 3}
          x2={nodes[t].x}
          y2={nodes[t].y}
          stroke={
            visited.includes(f) && visited.includes(t)
              ? accentColor
              : "rgba(255,255,255,0.08)"
          }
          strokeWidth={visited.includes(f) && visited.includes(t) ? 1.2 : 0.8}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y + 3}
          r={3}
          fill={
            i === current
              ? accentColor
              : visited.includes(i)
                ? "rgb(134,239,172)"
                : "rgba(255,255,255,0.1)"
          }
          stroke={i === current ? "rgba(255,255,255,0.4)" : "transparent"}
          strokeWidth={0.8}
        />
      ))}
    </svg>
  );
}

function MiniGenericPreview({ algo }: { algo: AlgoInfo }) {
  // A mini visualization icon based on algo type
  if (algo.id === "binary-search") {
    // Show a sorted array with highlight in the middle
    const vals = [1, 3, 5, 7, 9, 11, 13, 15];
    return (
      <div className="flex items-center gap-0.5 h-10 mt-1">
        {vals.map((v, i) => (
          <div
            key={i}
            className={`w-5 h-6 rounded-sm flex items-center justify-center text-[7px] font-bold border ${
              i === 3
                ? "border-sky-400/60 bg-sky-500/20 text-sky-300"
                : i >= 1 && i <= 5
                  ? "border-white/10 bg-white/5 text-white/40"
                  : "border-white/5 bg-white/3 text-white/20"
            }`}
          >
            {v}
          </div>
        ))}
      </div>
    );
  }
  if (algo.id === "dijkstra" || algo.id === "prim" || algo.id === "kruskal") {
    // Mini graph
    const nodes = [
      { x: 10, y: 8 },
      { x: 30, y: 4 },
      { x: 50, y: 8 },
      { x: 20, y: 22 },
      { x: 40, y: 22 },
    ];
    const edges: [number, number][] = [
      [0, 1],
      [1, 2],
      [0, 3],
      [1, 4],
      [2, 4],
      [3, 4],
    ];
    const hi =
      algo.id === "dijkstra"
        ? [0, 1, 2]
        : algo.id === "prim"
          ? [0, 1, 4]
          : [0, 3];
    const ac =
      algo.id === "dijkstra"
        ? "rgb(20,184,166)"
        : algo.id === "prim"
          ? "rgb(132,204,22)"
          : "rgb(249,115,22)";
    return (
      <svg viewBox="0 0 56 30" className="w-full h-10 mt-1">
        {edges.map(([f, t], i) => (
          <line
            key={i}
            x1={nodes[f].x}
            y1={nodes[f].y}
            x2={nodes[t].x}
            y2={nodes[t].y}
            stroke={
              hi.includes(f) && hi.includes(t) ? ac : "rgba(255,255,255,0.08)"
            }
            strokeWidth={hi.includes(f) && hi.includes(t) ? 1.2 : 0.7}
          />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={3}
            fill={hi.includes(i) ? ac : "rgba(255,255,255,0.1)"}
          />
        ))}
      </svg>
    );
  }
  if (algo.id === "heapify") {
    // Mini tree
    const nodes = [
      { x: 28, y: 4 },
      { x: 14, y: 14 },
      { x: 42, y: 14 },
      { x: 7, y: 24 },
      { x: 21, y: 24 },
      { x: 35, y: 24 },
      { x: 49, y: 24 },
    ];
    const edges: [number, number][] = [
      [0, 1],
      [0, 2],
      [1, 3],
      [1, 4],
      [2, 5],
      [2, 6],
    ];
    return (
      <svg viewBox="0 0 56 32" className="w-full h-10 mt-1">
        {edges.map(([f, t]) => (
          <line
            key={`${f}-${t}`}
            x1={nodes[f].x}
            y1={nodes[f].y + 2}
            x2={nodes[t].x}
            y2={nodes[t].y}
            stroke="rgba(192,38,211,0.3)"
            strokeWidth={0.8}
          />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y + 2}
            r={3}
            fill={
              i === 0
                ? "rgb(192,38,211)"
                : i < 3
                  ? "rgba(192,38,211,0.5)"
                  : "rgba(255,255,255,0.1)"
            }
          />
        ))}
      </svg>
    );
  }
  if (algo.id === "kadane") {
    // Mini array with subarray highlight
    const vals = [-2, 1, -3, 4, -1, 2, 1, -5];
    return (
      <div className="flex items-center gap-0.5 h-10 mt-1">
        {vals.map((v, i) => (
          <div
            key={i}
            className={`w-5 h-6 rounded-sm flex items-center justify-center text-[7px] font-bold border ${
              i >= 3 && i <= 6
                ? "border-indigo-400/60 bg-indigo-500/20 text-indigo-300"
                : "border-white/5 bg-white/3 text-white/20"
            }`}
          >
            {v}
          </div>
        ))}
      </div>
    );
  }
  // fallback
  return <div className="h-10 mt-1" />;
}

function AlgoCard({
  algo,
  index,
  onClick,
}: {
  algo: AlgoInfo;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.07 }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border ${algo.border} bg-[#0a0a1a]/80 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-2xl`}
      style={{ boxShadow: `0 0 0 0 transparent` }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 8px 40px ${algo.glow}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 0 0 transparent`;
      }}
    >
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${algo.gradient} opacity-60`}
      />

      {/* Shimmer on hover */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />

      {/* Decorative corner glow */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
        style={{ background: algo.glow }}
      />

      <div className="relative z-10 p-6">
        {/* Icon + badge */}
        <div className="flex items-start justify-between mb-3">
          <div
            className={`p-3 rounded-xl bg-white/5 border border-white/10 ${algo.accent}`}
          >
            {algo.icon}
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
            {algo.complexity}
          </span>
        </div>

        {/* Mini visual preview */}
        <div className="mb-3">
          {algo.category === "sorting" ? (
            <MiniSortBars
              variant={algo.id as "bubble" | "merge" | "quick" | "heap"}
            />
          ) : algo.category === "traversal" ? (
            <MiniTreeGraph variant={algo.id as "bfs" | "dfs"} />
          ) : (
            <MiniGenericPreview algo={algo} />
          )}
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-white transition-colors">
          {algo.name}
        </h3>
        <p className="text-white/35 text-sm leading-relaxed line-clamp-2 mb-4">
          {algo.description}
        </p>

        {/* CTA */}
        <div
          className={`flex items-center gap-2 ${algo.accent} text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Visualize</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  FULLSCREEN VISUALIZER
 * ═══════════════════════════════════════════════════════ */

function FullscreenVisualizer({
  algoId,
  onClose,
}: {
  algoId: AlgoId;
  onClose: () => void;
}) {
  const algo = ALGOS.find((a) => a.id === algoId)!;
  const isSorting = algo.category === "sorting";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#050510]/95 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Content */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
        className="relative z-10 flex flex-col h-full"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-white/5 ${algo.accent}`}>
              {algo.icon}
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">{algo.name}</h2>
              <p className="text-white/30 text-xs">{algo.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Visualization area */}
        <div className="flex-1 overflow-auto">
          {algoId === "bubble" ? (
            <SortVisualizer
              algoId="bubble"
              accentColor={algo.glow}
              accent={algo.accent}
            />
          ) : algoId === "merge" ? (
            <MergeSortTreeViz accentColor={algo.glow} />
          ) : algoId === "quick" ? (
            <QuickSortTreeViz accentColor={algo.glow} />
          ) : algoId === "heap" ? (
            <HeapSortViz accentColor={algo.glow} />
          ) : algoId === "binary-search" ? (
            <BinarySearchViz accentColor={algo.glow} />
          ) : algoId === "dijkstra" ? (
            <DijkstraViz accentColor={algo.glow} />
          ) : algoId === "prim" ? (
            <PrimViz accentColor={algo.glow} />
          ) : algoId === "kruskal" ? (
            <KruskalViz accentColor={algo.glow} />
          ) : algoId === "heapify" ? (
            <HeapifyViz accentColor={algo.glow} />
          ) : algoId === "kadane" ? (
            <KadaneViz accentColor={algo.glow} />
          ) : (
            <TreeVisualizer
              algoId={algoId as "bfs" | "dfs"}
              accentColor={algo.glow}
              accent={algo.accent}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  SORT VISUALIZER (Array bars 1–10)
 * ═══════════════════════════════════════════════════════ */

function SortVisualizer({
  algoId,
  accentColor,
  accent,
}: {
  algoId: AlgoId;
  accentColor: string;
  accent: string;
}) {
  const INITIAL = [6, 3, 8, 1, 9, 2, 7, 4, 10, 5];
  const [arr, setArr] = useState(INITIAL);
  const [ops, setOps] = useState<SortOp[]>([]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const SPEED_MAP: Record<string, number> = { "1x": 400, "2x": 200, "4x": 100 };
  const [speedLabel, setSpeedLabel] = useState<"1x" | "2x" | "4x">("1x");
  const speed = SPEED_MAP[speedLabel];
  const [highlight, setHighlight] = useState<{
    compare: number[];
    swap: number[];
    pivot: number[];
    sorted: Set<number>;
  }>({
    compare: [],
    swap: [],
    pivot: [],
    sorted: new Set(),
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Generate ops on mount / reset
  const initOps = useCallback(() => {
    const a = [...INITIAL];
    let newOps: SortOp[] = [];
    if (algoId === "bubble") newOps = generateBubbleOps(a);
    else if (algoId === "merge") newOps = generateMergeOps(a);
    else if (algoId === "quick") newOps = generateQuickOps(a);
    setOps(newOps);
    setArr(INITIAL);
    setStep(0);
    setPlaying(false);
    setHighlight({ compare: [], swap: [], pivot: [], sorted: new Set() });
  }, [algoId]);

  useEffect(() => {
    initOps();
  }, [initOps]);

  // Apply step
  const applyStep = useCallback(
    (s: number, currentArr: number[], currentSorted: Set<number>) => {
      if (s >= ops.length) {
        setPlaying(false);
        setHighlight({
          compare: [],
          swap: [],
          pivot: [],
          sorted: new Set(Array.from({ length: 10 }, (_, i) => i)),
        });
        return;
      }
      const op = ops[s];
      const newH = {
        compare: [] as number[],
        swap: [] as number[],
        pivot: [] as number[],
        sorted: new Set(currentSorted),
      };

      if (op.type === "compare") {
        newH.compare = [...op.indices];
      } else if (op.type === "swap") {
        const a = [...currentArr];
        [a[op.indices[0]], a[op.indices[1]]] = [
          a[op.indices[1]],
          a[op.indices[0]],
        ];
        setArr(a);
        newH.swap = [...op.indices];
        currentArr = a;
      } else if (op.type === "pivot") {
        newH.pivot = [op.index];
      } else if (op.type === "sorted") {
        newH.sorted.add(op.index);
      }

      setHighlight(newH);
      setStep(s + 1);
    },
    [ops],
  );

  // Auto-play
  useEffect(() => {
    if (!playing) return;
    if (step >= ops.length) {
      setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => {
      applyStep(step, arr, highlight.sorted);
    }, speed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, step, ops.length, speed, applyStep, arr, highlight.sorted]);

  const handlePlay = () => setPlaying(true);
  const handlePause = () => setPlaying(false);
  const handleReset = () => initOps();
  const handleSkip = () => {
    // run all remaining to final state
    let a = [...arr];
    const s = new Set(highlight.sorted);
    for (let i = step; i < ops.length; i++) {
      const op = ops[i];
      if (op.type === "swap") {
        [a[op.indices[0]], a[op.indices[1]]] = [
          a[op.indices[1]],
          a[op.indices[0]],
        ];
      }
      if (op.type === "sorted") s.add(op.index);
    }
    setArr(a);
    setStep(ops.length);
    setPlaying(false);
    setHighlight({
      compare: [],
      swap: [],
      pivot: [],
      sorted: new Set(Array.from({ length: 10 }, (_, i) => i)),
    });
  };

  const isDone = step >= ops.length && ops.length > 0;

  // Derive current phase for badge
  const currentPhase =
    highlight.swap.length > 0
      ? "swap"
      : highlight.compare.length > 0
        ? "compare"
        : highlight.pivot.length > 0
          ? "pivot"
          : isDone
            ? "done"
            : "idle";

  return (
    <div className="flex h-full">
      {/* ── Left Side Panel ── */}
      <div className="w-56 shrink-0 flex flex-col gap-5 px-5 py-8 border-r border-white/5 bg-white/1">
        {/* Phase badge */}
        <AnimatePresence mode="wait">
          {currentPhase === "swap" ? (
            <motion.div
              key="swap"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-red-500/15 text-red-300 border border-red-500/30"
            >
              ⇄ Swapping
            </motion.div>
          ) : currentPhase === "compare" ? (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-violet-500/15 text-violet-300 border border-violet-500/30"
            >
              ? Comparing
            </motion.div>
          ) : currentPhase === "pivot" ? (
            <motion.div
              key="pivot"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-amber-500/15 text-amber-300 border border-amber-500/30"
            >
              ◆ Pivot Selected
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase text-center bg-white/3 text-white/25 border border-white/5"
            >
              {isDone ? (
                <>
                  <Check className="inline w-3 h-3 mr-1 mb-0.5" /> Complete
                </>
              ) : (
                "Ready"
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playback */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Playback
          </span>
          <div className="flex items-center gap-2">
            {!playing ? (
              <button
                onClick={handlePlay}
                disabled={isDone}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 transition-all"
              >
                <Play className="w-4 h-4 text-white fill-white/30" />
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <Pause className="w-4 h-4 text-white" />
              </button>
            )}
            <button
              onClick={handleSkip}
              disabled={isDone}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 transition-all"
            >
              <SkipForward className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <RotateCcw className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Speed */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Speed
          </span>
          <div className="flex gap-1.5">
            {(["1x", "2x", "4x"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSpeedLabel(s)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  speedLabel === s
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/40 shadow-[0_0_12px_rgba(139,92,246,0.2)]"
                    : "bg-white/3 text-white/35 border border-white/7 hover:bg-white/5"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Progress
          </span>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-violet-500/80 to-emerald-500/80"
              initial={{ width: "0%" }}
              animate={{
                width: ops.length ? `${(step / ops.length) * 100}%` : "0%",
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <span className="text-white/30 text-[11px] font-mono text-center">
            {Math.min(step, ops.length)} / {ops.length}
          </span>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2.5 mt-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Legend
          </span>
          {[
            {
              color: "rgb(196,181,253)",
              border: "rgba(139,92,246,0.5)",
              label: "Comparing",
              icon: <HelpCircle className="w-2.5 h-2.5" />,
            },
            {
              color: "rgb(248,113,113)",
              border: "rgba(248,113,113,0.5)",
              label: "Swapping",
              icon: <RefreshCw className="w-2.5 h-2.5" />,
            },
            {
              color: "rgb(251,191,36)",
              border: "rgba(251,191,36,0.5)",
              label: "Pivot",
              icon: <Diamond className="w-2.5 h-2.5" />,
            },
            {
              color: "rgb(134,239,172)",
              border: "rgba(134,239,172,0.5)",
              label: "Sorted",
              icon: <Check className="w-2.5 h-2.5" />,
            },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2.5">
              <div
                className="w-5 h-5 rounded-md shrink-0 border flex items-center justify-center text-[9px]"
                style={{
                  borderColor: l.border,
                  backgroundColor: `${l.color}15`,
                  color: l.color,
                }}
              >
                {l.icon}
              </div>
              <span className="text-[11px] text-white/40">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Visualization Area ── */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-6">
        <div className="relative rounded-2xl border border-white/5 bg-[#050510]/80 backdrop-blur-sm px-10 py-8 shadow-[0_0_80px_rgba(139,92,246,0.04)]">
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(139,92,246,0.04) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-4">
            {/* Swap arc indicator */}
            <div
              className="h-16 relative"
              style={{ width: `${arr.length * 72 + (arr.length - 1) * 8}px` }}
            >
              <AnimatePresence>
                {highlight.swap.length === 2 && (
                  <motion.svg
                    key={`arc-${step}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 overflow-visible"
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${arr.length * 80} 64`}
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      <filter id="bs-arc-glow">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    {(() => {
                      const [a, b] = highlight.swap;
                      const x1 = a * 80 + 36;
                      const x2 = b * 80 + 36;
                      const mx = (x1 + x2) / 2;
                      const bulge = -Math.abs(x2 - x1) * 0.5 - 20;
                      return (
                        <>
                          <path
                            d={`M ${x1} 58 Q ${mx} ${bulge} ${x2} 58`}
                            fill="none"
                            stroke="rgba(248,113,113,0.2)"
                            strokeWidth={8}
                            filter="url(#bs-arc-glow)"
                          />
                          <path
                            d={`M ${x1} 58 Q ${mx} ${bulge} ${x2} 58`}
                            fill="none"
                            stroke="rgb(248,113,113)"
                            strokeWidth={2.5}
                            strokeDasharray="6 4"
                            opacity={0.8}
                          />
                          <circle
                            cx={x1}
                            cy={58}
                            r={5}
                            fill="rgb(248,113,113)"
                            opacity={0.9}
                          >
                            <animate
                              attributeName="r"
                              values="4;6;4"
                              dur="1s"
                              repeatCount="indefinite"
                            />
                          </circle>
                          <circle
                            cx={x2}
                            cy={58}
                            r={5}
                            fill="rgb(248,113,113)"
                            opacity={0.9}
                          >
                            <animate
                              attributeName="r"
                              values="4;6;4"
                              dur="1s"
                              repeatCount="indefinite"
                            />
                          </circle>
                          <text
                            x={mx}
                            y={Math.max(8, 58 + bulge / 2)}
                            textAnchor="middle"
                            fill="rgb(248,113,113)"
                            fontSize={11}
                            fontWeight="800"
                            letterSpacing={2}
                          >
                            SWAP
                          </text>
                        </>
                      );
                    })()}
                  </motion.svg>
                )}
              </AnimatePresence>
            </div>

            {/* Array boxes */}
            <div className="flex items-center gap-2">
              {arr.map((val, i) => {
                const isCompare = highlight.compare.includes(i);
                const isSwap = highlight.swap.includes(i);
                const isPivot = highlight.pivot.includes(i);
                const isSorted = highlight.sorted.has(i);

                let borderColor = "rgba(255,255,255,0.1)";
                let bgColor = "rgba(255,255,255,0.03)";
                let shadowStyle = "none";
                let textColor = "rgba(255,255,255,0.55)";
                let label: React.ReactNode = "";

                if (isSorted && !isCompare && !isSwap) {
                  borderColor = "rgb(134, 239, 172)";
                  bgColor = "rgba(134,239,172,0.1)";
                  shadowStyle =
                    "0 0 24px rgba(134,239,172,0.25), inset 0 0 12px rgba(134,239,172,0.08)";
                  textColor = "rgb(134, 239, 172)";
                  label = <Check className="w-2.5 h-2.5" />;
                }
                if (isSwap) {
                  borderColor = "rgb(248, 113, 113)";
                  bgColor = "rgba(248,113,113,0.12)";
                  shadowStyle =
                    "0 0 30px rgba(248,113,113,0.4), inset 0 0 15px rgba(248,113,113,0.12)";
                  textColor = "rgb(248, 113, 113)";
                  label = "⇄";
                }
                if (isCompare && !isSwap) {
                  borderColor = "rgb(196, 181, 253)";
                  bgColor = "rgba(196,181,253,0.08)";
                  shadowStyle = "0 0 24px rgba(196,181,253,0.3)";
                  textColor = "rgb(196, 181, 253)";
                  label = "?";
                }
                if (isPivot && !isSwap && !isCompare) {
                  borderColor = "rgb(251, 191, 36)";
                  bgColor = "rgba(251,191,36,0.1)";
                  shadowStyle = "0 0 24px rgba(251,191,36,0.35)";
                  textColor = "rgb(251, 191, 36)";
                  label = "◆";
                }

                return (
                  <motion.div
                    key={i}
                    layout
                    className="flex flex-col items-center gap-1"
                  >
                    <AnimatePresence mode="wait">
                      {label ? (
                        <motion.span
                          key={`filled-${i}`}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="text-xs font-bold w-5 h-5 flex items-center justify-center"
                          style={{ color: borderColor }}
                        >
                          {label}
                        </motion.span>
                      ) : (
                        <motion.span key="empty" className="w-5 h-5" />
                      )}
                    </AnimatePresence>

                    <motion.div
                      layout
                      className="w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                      animate={{
                        borderColor,
                        backgroundColor: bgColor,
                        boxShadow: shadowStyle,
                        scale: isSwap ? 1.12 : 1,
                        y: isSwap ? -8 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <motion.span
                        layout
                        className="text-xl font-black tabular-nums font-mono"
                        style={{ color: textColor }}
                        animate={{ scale: isSwap ? 1.15 : 1 }}
                      >
                        {val}
                      </motion.span>
                    </motion.div>

                    <span className="text-[10px] text-white/15 font-mono">
                      [{i}]
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  MERGE SORT — RECURSION TREE VISUALIZER
 * ═══════════════════════════════════════════════════════ */

interface MNode {
  id: number;
  arr: number[];
  sorted: number[];
  left: number | null;
  right: number | null;
  level: number;
  isLeaf: boolean;
  cx: number;
  cy: number;
}

type MStep =
  | { type: "split"; nodeId: number }
  | { type: "merge"; nodeId: number };

const MERGE_INITIAL = [6, 3, 8, 1, 9, 2, 7, 4];

function buildMergeSortTree(initial: number[]) {
  const nodes: MNode[] = [];
  let nextId = 0;

  function build(arr: number[], level: number): number {
    const id = nextId++;
    const node: MNode = {
      id,
      arr: [...arr],
      sorted: [...arr].sort((a, b) => a - b),
      left: null,
      right: null,
      level,
      isLeaf: arr.length <= 1,
      cx: 0,
      cy: 0,
    };
    nodes.push(node);
    if (arr.length > 1) {
      const mid = Math.floor(arr.length / 2);
      node.left = build(arr.slice(0, mid), level + 1);
      node.right = build(arr.slice(mid), level + 1);
    }
    return id;
  }

  build(initial, 0);

  // Layout: leaves evenly spaced, parents centered over children
  const SVG_W = 960;
  const PAD = 50;
  const leaves: number[] = [];
  function collectLeaves(id: number) {
    const n = nodes[id];
    if (n.isLeaf) {
      leaves.push(id);
      return;
    }
    if (n.left !== null) collectLeaves(n.left);
    if (n.right !== null) collectLeaves(n.right);
  }
  collectLeaves(0);

  const usable = SVG_W - 2 * PAD;
  const leafGap = usable / leaves.length;
  leaves.forEach((lid, i) => {
    nodes[lid].cx = PAD + leafGap * i + leafGap / 2;
  });

  function setParentX(id: number): number {
    const n = nodes[id];
    if (n.isLeaf) return n.cx;
    const lx = n.left !== null ? setParentX(n.left) : 0;
    const rx = n.right !== null ? setParentX(n.right) : 0;
    n.cx = n.left !== null && n.right !== null ? (lx + rx) / 2 : lx || rx;
    return n.cx;
  }
  setParentX(0);

  const LEVEL_H = 120;
  const maxLevel = Math.max(...nodes.map((n) => n.level));
  nodes.forEach((n) => {
    n.cy = 60 + n.level * LEVEL_H;
  });

  const steps: MStep[] = [];
  function genSteps(id: number) {
    const n = nodes[id];
    if (n.isLeaf) return;
    steps.push({ type: "split", nodeId: id });
    genSteps(n.left!);
    genSteps(n.right!);
    steps.push({ type: "merge", nodeId: id });
  }
  genSteps(0);

  return {
    nodes,
    steps,
    svgW: SVG_W,
    svgH: 60 + (maxLevel + 1) * LEVEL_H + 40,
  };
}

function MergeSortTreeViz({ accentColor }: { accentColor: string }) {
  const { nodes, steps, svgW, svgH } = useMemo(
    () => buildMergeSortTree(MERGE_INITIAL),
    [],
  );

  const SPEED_MAP: Record<string, number> = {
    "1x": 1200,
    "2x": 600,
    "4x": 300,
  };
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedLabel, setSpeedLabel] = useState<"1x" | "2x" | "4x">("1x");
  const speed = SPEED_MAP[speedLabel];
  const [visible, setVisible] = useState<Set<number>>(() => new Set([0]));
  const [merged, setMerged] = useState<Set<number>>(() => {
    const s = new Set<number>();
    nodes.forEach((n) => {
      if (n.isLeaf) s.add(n.id);
    });
    return s;
  });
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeType, setActiveType] = useState<"split" | "merge" | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initState = useCallback(() => {
    setStep(0);
    setPlaying(false);
    setVisible(new Set([0]));
    const leafSet = new Set<number>();
    nodes.forEach((n) => {
      if (n.isLeaf) leafSet.add(n.id);
    });
    setMerged(leafSet);
    setActiveId(null);
    setActiveType(null);
  }, [nodes]);

  const applyStep = useCallback(
    (s: number) => {
      if (s >= steps.length) {
        setPlaying(false);
        setActiveId(null);
        setActiveType(null);
        return;
      }
      const op = steps[s];
      setActiveId(op.nodeId);
      setActiveType(op.type);
      if (op.type === "split") {
        setVisible((prev) => {
          const next = new Set(prev);
          const n = nodes[op.nodeId];
          if (n.left !== null) next.add(n.left);
          if (n.right !== null) next.add(n.right);
          return next;
        });
      } else {
        setMerged((prev) => new Set(prev).add(op.nodeId));
      }
      setStep(s + 1);
    },
    [steps, nodes],
  );

  useEffect(() => {
    if (!playing) return;
    if (step >= steps.length) {
      setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => applyStep(step), speed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, step, steps.length, speed, applyStep]);

  const isDone = step >= steps.length && steps.length > 0;

  const handleSkip = () => {
    const allIds = new Set(nodes.map((n) => n.id));
    setVisible(allIds);
    setMerged(allIds);
    setStep(steps.length);
    setPlaying(false);
    setActiveId(null);
    setActiveType(null);
  };

  const BOX = 34;
  const GAP = 4;
  const NPAD = 10;

  // Level-based accent colors for visual depth
  const levelColors = [
    {
      bg: "rgba(139,92,246,0.08)",
      border: "rgba(139,92,246,0.2)",
      text: "rgb(196,181,253)",
    }, // L0 violet
    {
      bg: "rgba(59,130,246,0.08)",
      border: "rgba(59,130,246,0.2)",
      text: "rgb(147,197,253)",
    }, // L1 blue
    {
      bg: "rgba(6,182,212,0.08)",
      border: "rgba(6,182,212,0.2)",
      text: "rgb(103,232,249)",
    }, // L2 cyan
    {
      bg: "rgba(16,185,129,0.07)",
      border: "rgba(16,185,129,0.18)",
      text: "rgb(110,231,183)",
    }, // L3 emerald
  ];

  return (
    <div className="flex h-full">
      {/* ── Left Side Panel ── */}
      <div className="w-56 shrink-0 flex flex-col gap-5 px-5 py-8 border-r border-white/5 bg-white/1">
        {/* Phase badge */}
        <AnimatePresence mode="wait">
          {activeType ? (
            <motion.div
              key={activeType}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center ${
                activeType === "split"
                  ? "bg-violet-500/15 text-violet-300 border border-violet-500/30"
                  : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
              }`}
            >
              {activeType === "split" ? "↓ Dividing" : "↑ Merging"}
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase text-center bg-white/3 text-white/25 border border-white/5"
            >
              {isDone ? (
                <>
                  <Check className="inline w-3 h-3 mr-1 mb-0.5" /> Complete
                </>
              ) : (
                "Ready"
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playback */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Playback
          </span>
          <div className="flex items-center gap-2">
            {!playing ? (
              <button
                onClick={() => setPlaying(true)}
                disabled={isDone}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 transition-all"
              >
                <Play className="w-4 h-4 text-white fill-white/30" />
              </button>
            ) : (
              <button
                onClick={() => setPlaying(false)}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <Pause className="w-4 h-4 text-white" />
              </button>
            )}
            <button
              onClick={handleSkip}
              disabled={isDone}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 transition-all"
            >
              <SkipForward className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={initState}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <RotateCcw className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Speed */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Speed
          </span>
          <div className="flex gap-1.5">
            {(["1x", "2x", "4x"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSpeedLabel(s)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  speedLabel === s
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                    : "bg-white/3 text-white/35 border border-white/7 hover:bg-white/5"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Progress
          </span>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-violet-500/80 to-emerald-500/80"
              initial={{ width: "0%" }}
              animate={{
                width: steps.length ? `${(step / steps.length) * 100}%` : "0%",
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <span className="text-white/30 text-[11px] font-mono text-center">
            {Math.min(step, steps.length)} / {steps.length}
          </span>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2.5 mt-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Legend
          </span>
          {[
            {
              color: "rgb(196,181,253)",
              border: "rgba(139,92,246,0.5)",
              label: "Dividing",
              icon: "↓",
            },
            {
              color: "rgb(134,239,172)",
              border: "rgba(16,185,129,0.5)",
              label: "Merging",
              icon: "↑",
            },
            {
              color: "rgb(134,239,172)",
              border: "rgba(134,239,172,0.5)",
              label: "Sorted",
              icon: <Check className="w-2.5 h-2.5" />,
            },
            {
              color: "rgba(255,255,255,0.5)",
              border: "rgba(255,255,255,0.15)",
              label: "Pending",
              icon: <Circle className="w-2.5 h-2.5" />,
            },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2.5">
              <div
                className="w-5 h-5 rounded-md shrink-0 border flex items-center justify-center text-[9px]"
                style={{
                  borderColor: l.border,
                  backgroundColor: `${l.color}15`,
                  color: l.color,
                }}
              >
                {l.icon}
              </div>
              <span className="text-[11px] text-white/40">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Tree Area ── */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-6">
        <div className="relative rounded-2xl border border-white/5 bg-[#050510]/80 backdrop-blur-sm overflow-auto shadow-[0_0_80px_rgba(139,92,246,0.04)]">
          {/* Subtle radial glow behind tree */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(139,92,246,0.04) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <svg
            width={svgW}
            height={svgH}
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="relative z-10"
          >
            <defs>
              {/* Glow filters */}
              <filter id="mg-glow-split">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="mg-glow-merge">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="mg-shadow">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="4"
                  floodColor="rgba(0,0,0,0.4)"
                />
              </filter>
              {/* Gradient for merged edges */}
              <linearGradient id="mg-edge-merged" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(134,239,172,0.5)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.3)" />
              </linearGradient>
              <linearGradient id="mg-edge-pending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
              </linearGradient>
            </defs>

            {/* Edges — curved paths instead of straight lines */}
            {nodes.map((n) => {
              if (!visible.has(n.id)) return null;
              return [n.left, n.right]
                .filter((c): c is number => c !== null && visible.has(c))
                .map((cid) => {
                  const child = nodes[cid];
                  const bothMerged = merged.has(n.id) && merged.has(cid);
                  const y1 = n.cy + BOX + NPAD;
                  const y2 = child.cy - NPAD;
                  const my = (y1 + y2) / 2;
                  return (
                    <g key={`me-${n.id}-${cid}`}>
                      {bothMerged && (
                        <path
                          d={`M ${n.cx} ${y1} C ${n.cx} ${my}, ${child.cx} ${my}, ${child.cx} ${y2}`}
                          fill="none"
                          stroke="rgba(134,239,172,0.15)"
                          strokeWidth={6}
                          className="blur-[2px]"
                        />
                      )}
                      <path
                        d={`M ${n.cx} ${y1} C ${n.cx} ${my}, ${child.cx} ${my}, ${child.cx} ${y2}`}
                        fill="none"
                        stroke={
                          bothMerged
                            ? "url(#mg-edge-merged)"
                            : "url(#mg-edge-pending)"
                        }
                        strokeWidth={bothMerged ? 2.5 : 1.5}
                        strokeDasharray={bothMerged ? "none" : "6 5"}
                        strokeLinecap="round"
                        className="transition-all duration-700"
                      />
                    </g>
                  );
                });
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              if (!visible.has(node.id)) return null;
              const isMerged = merged.has(node.id);
              const isActive = activeId === node.id;
              const display = isMerged && !node.isLeaf ? node.sorted : node.arr;
              const totalW = display.length * BOX + (display.length - 1) * GAP;
              const sx = node.cx - totalW / 2;
              const lc =
                levelColors[Math.min(node.level, levelColors.length - 1)];

              // State-based colors
              let bgFill = lc.bg;
              let borderStroke = lc.border;
              let boxFill = "rgba(255,255,255,0.04)";
              let boxStroke = "rgba(255,255,255,0.12)";
              let textFill = lc.text;
              let glowFilter = "";

              if (isMerged) {
                bgFill = "rgba(134,239,172,0.07)";
                borderStroke = "rgba(134,239,172,0.3)";
                boxFill = "rgba(134,239,172,0.1)";
                boxStroke = "rgba(134,239,172,0.35)";
                textFill = "rgb(134,239,172)";
              }
              if (isActive && activeType === "split") {
                bgFill = "rgba(139,92,246,0.12)";
                borderStroke = "rgba(139,92,246,0.6)";
                boxFill = "rgba(139,92,246,0.15)";
                boxStroke = "rgba(139,92,246,0.5)";
                textFill = "rgb(216,200,255)";
                glowFilter = "url(#mg-glow-split)";
              }
              if (isActive && activeType === "merge") {
                bgFill = "rgba(16,185,129,0.14)";
                borderStroke = "rgba(16,185,129,0.6)";
                boxFill = "rgba(16,185,129,0.18)";
                boxStroke = "rgba(16,185,129,0.55)";
                textFill = "rgb(167,243,208)";
                glowFilter = "url(#mg-glow-merge)";
              }

              return (
                <g key={`mn-${node.id}`}>
                  {/* Outer glow when active */}
                  {isActive && (
                    <>
                      <rect
                        x={sx - NPAD - 6}
                        y={node.cy - NPAD - 6}
                        width={totalW + 2 * NPAD + 12}
                        height={BOX + 2 * NPAD + 12}
                        rx={16}
                        fill="none"
                        stroke={
                          activeType === "split"
                            ? "rgba(139,92,246,0.2)"
                            : "rgba(16,185,129,0.2)"
                        }
                        strokeWidth={1.5}
                      >
                        <animate
                          attributeName="opacity"
                          values="0.2;0.6;0.2"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </rect>
                      <rect
                        x={sx - NPAD - 3}
                        y={node.cy - NPAD - 3}
                        width={totalW + 2 * NPAD + 6}
                        height={BOX + 2 * NPAD + 6}
                        rx={14}
                        fill="none"
                        stroke={
                          activeType === "split"
                            ? "rgba(139,92,246,0.35)"
                            : "rgba(16,185,129,0.35)"
                        }
                        strokeWidth={2}
                      >
                        <animate
                          attributeName="opacity"
                          values="0.4;0.9;0.4"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </rect>
                    </>
                  )}

                  {/* Card background with shadow */}
                  <rect
                    x={sx - NPAD}
                    y={node.cy - NPAD}
                    width={totalW + 2 * NPAD}
                    height={BOX + 2 * NPAD}
                    rx={12}
                    fill={bgFill}
                    stroke={borderStroke}
                    strokeWidth={1.5}
                    filter={glowFilter || "url(#mg-shadow)"}
                    className="transition-all duration-600"
                  />

                  {/* Phase label above */}
                  {isActive && (
                    <text
                      x={node.cx}
                      y={node.cy - NPAD - 8}
                      textAnchor="middle"
                      fill={
                        activeType === "split"
                          ? "rgb(196,181,253)"
                          : "rgb(134,239,172)"
                      }
                      fontSize={10}
                      fontWeight="800"
                      letterSpacing={2}
                    >
                      {activeType === "split" ? "DIVIDE" : "MERGE"}
                    </text>
                  )}

                  {/* Array boxes */}
                  {display.map((val, i) => (
                    <g key={i}>
                      <rect
                        x={sx + i * (BOX + GAP)}
                        y={node.cy}
                        width={BOX}
                        height={BOX}
                        rx={8}
                        fill={boxFill}
                        stroke={boxStroke}
                        strokeWidth={1}
                        className="transition-all duration-500"
                      />
                      <text
                        x={sx + i * (BOX + GAP) + BOX / 2}
                        y={node.cy + BOX / 2 + 5.5}
                        textAnchor="middle"
                        fill={textFill}
                        fontSize={14}
                        fontWeight="800"
                        fontFamily="monospace"
                        className="select-none transition-all duration-500"
                      >
                        {val}
                      </text>
                    </g>
                  ))}

                  {/* Level indicator — subtle depth badge */}
                  {!isActive && !isMerged && node.arr.length > 1 && (
                    <text
                      x={sx - NPAD - 6}
                      y={node.cy + BOX / 2 + 4}
                      textAnchor="end"
                      fill="rgba(255,255,255,0.08)"
                      fontSize={9}
                      fontWeight="700"
                    >
                      L{node.level}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  QUICK SORT — PARTITION TREE VISUALIZER
 * ═══════════════════════════════════════════════════════ */

interface QNode {
  id: number;
  arr: number[];
  partitioned: number[];
  pivotVal: number;
  pivotIdx: number;
  left: number | null;
  right: number | null;
  level: number;
  isLeaf: boolean;
  cx: number;
  cy: number;
}

type QStep =
  | { type: "partition"; nodeId: number }
  | { type: "done"; nodeId: number };

const QUICK_INITIAL = [8, 3, 5, 1, 7, 2, 6, 4];

function buildQuickSortTree(initial: number[]) {
  const nodes: QNode[] = [];
  let nextId = 0;

  function build(arr: number[], level: number): number {
    const id = nextId++;
    const node: QNode = {
      id,
      arr: [...arr],
      partitioned: [...arr],
      pivotVal: arr.length > 0 ? arr[arr.length - 1] : 0,
      pivotIdx: 0,
      left: null,
      right: null,
      level,
      isLeaf: arr.length <= 1,
      cx: 0,
      cy: 0,
    };
    nodes.push(node);

    if (arr.length <= 1) {
      return id;
    }

    // Partition using last element as pivot
    const a = [...arr];
    const pivot = a[a.length - 1];
    let i = 0;
    for (let j = 0; j < a.length - 1; j++) {
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        i++;
      }
    }
    [a[i], a[a.length - 1]] = [a[a.length - 1], a[i]];
    node.partitioned = a;
    node.pivotVal = pivot;
    node.pivotIdx = i;

    const leftArr = a.slice(0, i);
    const rightArr = a.slice(i + 1);
    if (leftArr.length > 0) node.left = build(leftArr, level + 1);
    if (rightArr.length > 0) node.right = build(rightArr, level + 1);

    return id;
  }

  build(initial, 0);

  // Layout
  const SVG_W = 960;
  const PAD = 50;
  const leaves: number[] = [];
  function collectLeaves(id: number) {
    const n = nodes[id];
    if (n.left === null && n.right === null) {
      leaves.push(id);
      return;
    }
    if (n.left !== null) collectLeaves(n.left);
    if (n.right !== null) collectLeaves(n.right);
  }
  collectLeaves(0);

  const usable = SVG_W - 2 * PAD;
  const leafGap = usable / Math.max(leaves.length, 1);
  leaves.forEach((lid, i) => {
    nodes[lid].cx = PAD + leafGap * i + leafGap / 2;
  });

  function setParentX(id: number): number {
    const n = nodes[id];
    if (n.left === null && n.right === null) return n.cx;
    if (n.left !== null && n.right !== null) {
      const lx = setParentX(n.left);
      const rx = setParentX(n.right);
      n.cx = (lx + rx) / 2;
    } else if (n.left !== null) {
      n.cx = setParentX(n.left);
    } else if (n.right !== null) {
      n.cx = setParentX(n.right);
    }
    return n.cx;
  }
  setParentX(0);

  const LEVEL_H = 120;
  const maxLevel = Math.max(...nodes.map((n) => n.level));
  nodes.forEach((n) => {
    n.cy = 60 + n.level * LEVEL_H;
  });

  // Steps: partition → recurse children → done
  const steps: QStep[] = [];
  function genSteps(id: number) {
    const n = nodes[id];
    steps.push({ type: "partition", nodeId: id });
    if (n.isLeaf) return;
    if (n.left !== null) genSteps(n.left);
    if (n.right !== null) genSteps(n.right);
    steps.push({ type: "done", nodeId: id });
  }
  genSteps(0);

  return {
    nodes,
    steps,
    svgW: SVG_W,
    svgH: 60 + (maxLevel + 1) * LEVEL_H + 40,
  };
}

function QuickSortTreeViz({ accentColor }: { accentColor: string }) {
  const { nodes, steps, svgW, svgH } = useMemo(
    () => buildQuickSortTree(QUICK_INITIAL),
    [],
  );

  const SPEED_MAP: Record<string, number> = {
    "1x": 1200,
    "2x": 600,
    "4x": 300,
  };
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedLabel, setSpeedLabel] = useState<"1x" | "2x" | "4x">("1x");
  const speed = SPEED_MAP[speedLabel];
  const [visible, setVisible] = useState<Set<number>>(() => new Set([0]));
  const [partitioned, setPartitioned] = useState<Set<number>>(new Set());
  const [done, setDone] = useState<Set<number>>(new Set());
  const [activeId, setActiveId] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initState = useCallback(() => {
    setStep(0);
    setPlaying(false);
    setVisible(new Set([0]));
    setPartitioned(new Set());
    setDone(new Set());
    setActiveId(null);
  }, []);

  const applyStep = useCallback(
    (s: number) => {
      if (s >= steps.length) {
        setPlaying(false);
        setActiveId(null);
        return;
      }
      const op = steps[s];
      setActiveId(op.nodeId);
      if (op.type === "partition") {
        const n = nodes[op.nodeId];
        setPartitioned((prev) => new Set(prev).add(op.nodeId));
        setVisible((prev) => {
          const next = new Set(prev);
          if (n.left !== null) next.add(n.left);
          if (n.right !== null) next.add(n.right);
          return next;
        });
        if (n.isLeaf) {
          setDone((prev) => new Set(prev).add(op.nodeId));
        }
      } else if (op.type === "done") {
        setDone((prev) => new Set(prev).add(op.nodeId));
      }
      setStep(s + 1);
    },
    [steps, nodes],
  );

  useEffect(() => {
    if (!playing) return;
    if (step >= steps.length) {
      setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => applyStep(step), speed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, step, steps.length, speed, applyStep]);

  const isDone = step >= steps.length && steps.length > 0;

  const handleSkip = () => {
    const allIds = new Set(nodes.map((n) => n.id));
    setVisible(allIds);
    setPartitioned(allIds);
    setDone(allIds);
    setStep(steps.length);
    setPlaying(false);
    setActiveId(null);
  };

  const BOX = 34;
  const GAP = 4;
  const NPAD = 10;

  const isActivePartition = activeId !== null && !done.has(activeId);
  const isActiveDone = activeId !== null && done.has(activeId) && step > 0;

  return (
    <div className="flex h-full">
      {/* ── Left Side Panel ── */}
      <div className="w-56 shrink-0 flex flex-col gap-5 px-5 py-8 border-r border-white/5 bg-white/1">
        {/* Phase badge */}
        <AnimatePresence mode="wait">
          {isActivePartition ? (
            <motion.div
              key="partitioning"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-amber-500/15 text-amber-300 border border-amber-500/30"
            >
              ⚡ Partitioning
            </motion.div>
          ) : isActiveDone ? (
            <motion.div
              key="sorted"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
            >
              ✓ Sorted
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase text-center bg-white/3 text-white/25 border border-white/5"
            >
              {isDone ? (
                <>
                  <Check className="inline w-3 h-3 mr-1 mb-0.5" /> Complete
                </>
              ) : (
                "Ready"
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playback */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Playback
          </span>
          <div className="flex items-center gap-2">
            {!playing ? (
              <button
                onClick={() => setPlaying(true)}
                disabled={isDone}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 transition-all"
              >
                <Play className="w-4 h-4 text-white fill-white/30" />
              </button>
            ) : (
              <button
                onClick={() => setPlaying(false)}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <Pause className="w-4 h-4 text-white" />
              </button>
            )}
            <button
              onClick={handleSkip}
              disabled={isDone}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 transition-all"
            >
              <SkipForward className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={initState}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <RotateCcw className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Speed */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Speed
          </span>
          <div className="flex gap-1.5">
            {(["1x", "2x", "4x"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSpeedLabel(s)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  speedLabel === s
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                    : "bg-white/3 text-white/35 border border-white/7 hover:bg-white/5"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Progress
          </span>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-amber-500/80 to-emerald-500/80"
              initial={{ width: "0%" }}
              animate={{
                width: steps.length ? `${(step / steps.length) * 100}%` : "0%",
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <span className="text-white/30 text-[11px] font-mono text-center">
            {Math.min(step, steps.length)} / {steps.length}
          </span>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2.5 mt-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Legend
          </span>
          {[
            {
              fill: "rgba(251,191,36,0.2)",
              border: "rgba(251,191,36,0.6)",
              label: "Pivot",
              icon: <Diamond className="w-2.5 h-2.5" />,
            },
            {
              fill: "rgba(96,165,250,0.12)",
              border: "rgba(96,165,250,0.4)",
              label: "< Pivot",
              icon: <ChevronLeft className="w-2.5 h-2.5" />,
            },
            {
              fill: "rgba(251,146,60,0.12)",
              border: "rgba(251,146,60,0.4)",
              label: "> Pivot",
              icon: <ChevronRight className="w-2.5 h-2.5" />,
            },
            {
              fill: "rgba(134,239,172,0.12)",
              border: "rgba(134,239,172,0.4)",
              label: "Sorted",
              icon: <Check className="w-2.5 h-2.5" />,
            },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2.5">
              <div
                className="w-5 h-5 rounded-md shrink-0 border flex items-center justify-center text-[9px]"
                style={{
                  borderColor: l.border,
                  backgroundColor: l.fill,
                  color: l.border,
                }}
              >
                {l.icon}
              </div>
              <span className="text-[11px] text-white/40">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Tree Area ── */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-6">
        <div className="relative rounded-2xl border border-white/5 bg-[#050510]/80 backdrop-blur-sm overflow-auto shadow-[0_0_80px_rgba(251,191,36,0.03)]">
          {/* Subtle warm glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(251,191,36,0.03) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <svg
            width={svgW}
            height={svgH}
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="relative z-10"
          >
            <defs>
              <filter id="qs-glow-active">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="qs-glow-done">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="qs-shadow">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="4"
                  floodColor="rgba(0,0,0,0.4)"
                />
              </filter>
              <linearGradient id="qs-edge-done" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(134,239,172,0.5)" />
                <stop offset="100%" stopColor="rgba(134,239,172,0.2)" />
              </linearGradient>
              <linearGradient id="qs-edge-left" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(96,165,250,0.35)" />
                <stop offset="100%" stopColor="rgba(96,165,250,0.12)" />
              </linearGradient>
              <linearGradient id="qs-edge-right" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(251,146,60,0.35)" />
                <stop offset="100%" stopColor="rgba(251,146,60,0.12)" />
              </linearGradient>
            </defs>

            {/* Edges — curved bezier paths */}
            {nodes.map((n) => {
              if (!visible.has(n.id)) return null;
              return [n.left, n.right]
                .filter((c): c is number => c !== null && visible.has(c))
                .map((cid) => {
                  const child = nodes[cid];
                  const bothDone = done.has(n.id) && done.has(cid);
                  const isLeft = n.left === cid;
                  const y1 = n.cy + BOX + NPAD;
                  const y2 = child.cy - NPAD;
                  const my = (y1 + y2) / 2;
                  return (
                    <g key={`qe-${n.id}-${cid}`}>
                      {/* Soft glow behind edge */}
                      {bothDone && (
                        <path
                          d={`M ${n.cx} ${y1} C ${n.cx} ${my}, ${child.cx} ${my}, ${child.cx} ${y2}`}
                          fill="none"
                          stroke="rgba(134,239,172,0.12)"
                          strokeWidth={6}
                          className="blur-[2px]"
                        />
                      )}
                      <path
                        d={`M ${n.cx} ${y1} C ${n.cx} ${my}, ${child.cx} ${my}, ${child.cx} ${y2}`}
                        fill="none"
                        stroke={
                          bothDone
                            ? "url(#qs-edge-done)"
                            : isLeft
                              ? "url(#qs-edge-left)"
                              : "url(#qs-edge-right)"
                        }
                        strokeWidth={bothDone ? 2.5 : 1.5}
                        strokeDasharray={bothDone ? "none" : "6 5"}
                        strokeLinecap="round"
                        className="transition-all duration-700"
                      />
                      {/* Edge labels */}
                      {!bothDone && (
                        <text
                          x={(n.cx + child.cx) / 2 + (isLeft ? -14 : 14)}
                          y={my}
                          textAnchor="middle"
                          fill={
                            isLeft
                              ? "rgba(96,165,250,0.55)"
                              : "rgba(251,146,60,0.55)"
                          }
                          fontSize={9}
                          fontWeight="800"
                          letterSpacing={0.5}
                        >
                          {isLeft ? "< P" : "> P"}
                        </text>
                      )}
                    </g>
                  );
                });
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              if (!visible.has(node.id)) return null;
              const isPart = partitioned.has(node.id);
              const isDoneNode = done.has(node.id);
              const isActive = activeId === node.id;
              const display = isPart ? node.partitioned : node.arr;

              const totalW = display.length * BOX + (display.length - 1) * GAP;
              const sx = node.cx - totalW / 2;

              const getBoxStyle = (idx: number) => {
                if (isDoneNode) {
                  return {
                    fill: "rgba(134,239,172,0.1)",
                    stroke: "rgba(134,239,172,0.35)",
                    text: "rgb(134,239,172)",
                  };
                }
                if (isPart && !node.isLeaf) {
                  if (idx === node.pivotIdx) {
                    return {
                      fill: "rgba(251,191,36,0.18)",
                      stroke: "rgba(251,191,36,0.55)",
                      text: "rgb(251,191,36)",
                    };
                  }
                  if (idx < node.pivotIdx) {
                    return {
                      fill: "rgba(96,165,250,0.1)",
                      stroke: "rgba(96,165,250,0.35)",
                      text: "rgb(147,197,253)",
                    };
                  }
                  return {
                    fill: "rgba(251,146,60,0.1)",
                    stroke: "rgba(251,146,60,0.35)",
                    text: "rgb(253,186,116)",
                  };
                }
                return {
                  fill: "rgba(255,255,255,0.04)",
                  stroke: "rgba(255,255,255,0.12)",
                  text: "rgba(255,255,255,0.55)",
                };
              };

              let bgFill = "rgba(255,255,255,0.02)";
              let borderStroke = "rgba(255,255,255,0.08)";
              let glowFilter = "";
              if (isDoneNode) {
                bgFill = "rgba(134,239,172,0.06)";
                borderStroke = "rgba(134,239,172,0.25)";
              } else if (isActive) {
                bgFill = "rgba(251,191,36,0.08)";
                borderStroke = "rgba(251,191,36,0.45)";
                glowFilter = "url(#qs-glow-active)";
              }

              return (
                <g key={`qn-${node.id}`}>
                  {/* Outer glow pulses when active */}
                  {isActive && !isDoneNode && (
                    <>
                      <rect
                        x={sx - NPAD - 6}
                        y={node.cy - NPAD - 6}
                        width={totalW + 2 * NPAD + 12}
                        height={BOX + 2 * NPAD + 12}
                        rx={16}
                        fill="none"
                        stroke="rgba(251,191,36,0.15)"
                        strokeWidth={1.5}
                      >
                        <animate
                          attributeName="opacity"
                          values="0.2;0.6;0.2"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </rect>
                      <rect
                        x={sx - NPAD - 3}
                        y={node.cy - NPAD - 3}
                        width={totalW + 2 * NPAD + 6}
                        height={BOX + 2 * NPAD + 6}
                        rx={14}
                        fill="none"
                        stroke="rgba(251,191,36,0.3)"
                        strokeWidth={2}
                      >
                        <animate
                          attributeName="opacity"
                          values="0.4;0.9;0.4"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </rect>
                    </>
                  )}

                  {/* Card background with shadow */}
                  <rect
                    x={sx - NPAD}
                    y={node.cy - NPAD}
                    width={totalW + 2 * NPAD}
                    height={BOX + 2 * NPAD}
                    rx={12}
                    fill={bgFill}
                    stroke={borderStroke}
                    strokeWidth={1.5}
                    filter={glowFilter || "url(#qs-shadow)"}
                    className="transition-all duration-600"
                  />

                  {/* PIVOT label above */}
                  {isPart && !node.isLeaf && !isDoneNode && (
                    <text
                      x={sx + node.pivotIdx * (BOX + GAP) + BOX / 2}
                      y={node.cy - NPAD - 8}
                      textAnchor="middle"
                      fill="rgb(251,191,36)"
                      fontSize={10}
                      fontWeight="800"
                      letterSpacing={2}
                    >
                      PIVOT
                    </text>
                  )}

                  {/* Array boxes */}
                  {display.map((val, i) => {
                    const s = getBoxStyle(i);
                    return (
                      <g key={i}>
                        <rect
                          x={sx + i * (BOX + GAP)}
                          y={node.cy}
                          width={BOX}
                          height={BOX}
                          rx={8}
                          fill={s.fill}
                          stroke={s.stroke}
                          strokeWidth={1}
                          className="transition-all duration-500"
                        />
                        <text
                          x={sx + i * (BOX + GAP) + BOX / 2}
                          y={node.cy + BOX / 2 + 5.5}
                          textAnchor="middle"
                          fill={s.text}
                          fontSize={14}
                          fontWeight="800"
                          fontFamily="monospace"
                          className="select-none transition-all duration-500"
                        >
                          {val}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  TREE VISUALIZER (10 numbered nodes)
 * ═══════════════════════════════════════════════════════ */

function TreeVisualizer({
  algoId,
  accentColor,
  accent,
}: {
  algoId: "bfs" | "dfs";
  accentColor: string;
  accent: string;
}) {
  const tree = buildTree();
  const [ops, setOps] = useState<TravOp[]>([]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const SPEED_MAP: Record<string, number> = { "1x": 600, "2x": 300, "4x": 150 };
  const [speedLabel, setSpeedLabel] = useState<"1x" | "2x" | "4x">("1x");
  const speed = SPEED_MAP[speedLabel];
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const [current, setCurrent] = useState<number | null>(null);
  const [queue, setQueue] = useState<number[]>([]);
  const [visitOrder, setVisitOrder] = useState<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDone = step >= ops.length && ops.length > 0;

  const initOps = useCallback(() => {
    const newOps =
      algoId === "bfs" ? generateBFSOps(tree) : generateDFSOps(tree);
    setOps(newOps);
    setStep(0);
    setPlaying(false);
    setVisited(new Set());
    setCurrent(null);
    setQueue([]);
    setVisitOrder([]);
  }, [algoId]);

  useEffect(() => {
    initOps();
  }, [initOps]);

  const applyStep = useCallback(
    (s: number) => {
      if (s >= ops.length) {
        setPlaying(false);
        setCurrent(null);
        return;
      }
      const op = ops[s];
      if (op.type === "visit") {
        setVisited((prev) => new Set([...prev, op.nodeId]));
        setCurrent(op.nodeId);
        setVisitOrder((prev) => [...prev, op.nodeId]);
      } else if (op.type === "enqueue" || op.type === "push") {
        setQueue((prev) => [...prev, op.nodeId]);
      } else if (op.type === "dequeue" || op.type === "pop") {
        setQueue((prev) => {
          const next = [...prev];
          if (op.type === "dequeue") next.shift();
          else next.pop();
          return next;
        });
        setCurrent(op.nodeId);
      } else if (op.type === "complete") {
        setCurrent(null);
      }
      setStep(s + 1);
    },
    [ops],
  );

  useEffect(() => {
    if (!playing) return;
    if (step >= ops.length) {
      setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => applyStep(step), speed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, step, ops.length, speed, applyStep]);

  const handlePlay = () => setPlaying(true);
  const handlePause = () => setPlaying(false);
  const handleReset = () => initOps();
  const handleSkip = () => {
    const v = new Set<number>();
    const ord: number[] = [];
    for (const op of ops) {
      if (op.type === "visit") {
        v.add(op.nodeId);
        ord.push(op.nodeId);
      }
    }
    setVisited(v);
    setVisitOrder(ord);
    setCurrent(null);
    setQueue([]);
    setStep(ops.length);
    setPlaying(false);
  };

  return (
    <div className="flex h-full">
      {/* ── Left Side Panel ── */}
      <div className="w-56 shrink-0 flex flex-col gap-5 px-5 py-8 border-r border-white/5 bg-white/1">
        {/* Phase badge */}
        <AnimatePresence mode="wait">
          {current !== null ? (
            <motion.div
              key="visiting"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center border"
              style={{
                backgroundColor: `${accentColor}18`,
                color: accentColor,
                borderColor: `${accentColor}40`,
              }}
            >
              ⚡ Visiting
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase text-center bg-white/3 text-white/25 border border-white/5"
            >
              {isDone ? (
                <>
                  <Check className="inline w-3 h-3 mr-1 mb-0.5" /> Complete
                </>
              ) : (
                "Ready"
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playback */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Playback
          </span>
          <div className="flex items-center gap-2">
            {!playing ? (
              <button
                onClick={handlePlay}
                disabled={isDone}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 transition-all"
              >
                <Play className="w-4 h-4 text-white fill-white/30" />
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <Pause className="w-4 h-4 text-white" />
              </button>
            )}
            <button
              onClick={handleSkip}
              disabled={isDone}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 transition-all"
            >
              <SkipForward className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <RotateCcw className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Speed */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Speed
          </span>
          <div className="flex gap-1.5">
            {(["1x", "2x", "4x"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSpeedLabel(s)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  speedLabel === s
                    ? "text-white/90"
                    : "bg-white/3 text-white/35 border-white/7 hover:bg-white/5"
                }`}
                style={
                  speedLabel === s
                    ? {
                        backgroundColor: `${accentColor}25`,
                        color: accentColor,
                        borderColor: `${accentColor}55`,
                        boxShadow: `0 0 12px ${accentColor}30`,
                      }
                    : undefined
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Progress
          </span>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(to right, ${accentColor}cc, rgba(134,239,172,0.8))`,
              }}
              initial={{ width: "0%" }}
              animate={{
                width: ops.length ? `${(step / ops.length) * 100}%` : "0%",
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <span className="text-white/30 text-[11px] font-mono text-center">
            {Math.min(step, ops.length)} / {ops.length}
          </span>
        </div>

        {/* Queue/Stack */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            {algoId === "bfs" ? "Queue" : "Stack"}
          </span>
          <div className="flex flex-wrap gap-1.5 min-h-7">
            {queue.length === 0 ? (
              <span className="text-white/15 text-xs italic">empty</span>
            ) : (
              queue.map((nodeId, i) => {
                const val =
                  TREE_NODES.find((n) => n.id === nodeId)?.value ?? "?";
                return (
                  <motion.span
                    key={`${nodeId}-${i}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold border"
                    style={{
                      backgroundColor: "rgba(99,102,241,0.15)",
                      borderColor: "rgba(99,102,241,0.35)",
                      color: "rgb(196,181,253)",
                    }}
                  >
                    {val}
                  </motion.span>
                );
              })
            )}
          </div>
        </div>

        {/* Visit order */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Visited
          </span>
          <div className="flex flex-wrap gap-1 min-h-6">
            {visitOrder.map((nodeId, i) => {
              const val = TREE_NODES.find((n) => n.id === nodeId)?.value ?? "?";
              return (
                <motion.span
                  key={`v-${nodeId}-${i}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold text-emerald-900 bg-emerald-400/80"
                >
                  {val}
                </motion.span>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2.5 mt-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Legend
          </span>
          {[
            {
              color: accentColor,
              border: `${accentColor}80`,
              label: "Current",
              icon: "●",
            },
            {
              color: "rgb(134,239,172)",
              border: "rgba(134,239,172,0.5)",
              label: "Visited",
              icon: <Check className="w-2.5 h-2.5" />,
            },
            {
              color: "rgba(255,255,255,0.4)",
              border: "rgba(255,255,255,0.15)",
              label: "Unvisited",
              icon: <Circle className="w-2.5 h-2.5" />,
            },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2.5">
              <div
                className="w-5 h-5 rounded-full shrink-0 border flex items-center justify-center text-[9px]"
                style={{
                  borderColor: l.border,
                  backgroundColor: `${l.color}15`,
                  color: l.color,
                }}
              >
                {l.icon}
              </div>
              <span className="text-[11px] text-white/40">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Tree Area ── */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-6">
        <div className="relative rounded-2xl border border-white/5 bg-[#050510]/80 backdrop-blur-sm overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.04)]">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 40% at 50% 30%, ${accentColor}08 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <svg
            width="800"
            height="420"
            viewBox="0 0 800 420"
            className="relative z-10"
          >
            <defs>
              <filter id="tv-glow">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="tv-shadow">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="4"
                  floodColor="rgba(0,0,0,0.5)"
                />
              </filter>
              <linearGradient id="tv-edge-visited" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accentColor} stopOpacity={0.7} />
                <stop offset="100%" stopColor="rgba(134,239,172,0.5)" />
              </linearGradient>
              <linearGradient id="tv-edge-pending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
              </linearGradient>
              <radialGradient id="tv-node-visited">
                <stop offset="0%" stopColor="rgb(134,239,172)" />
                <stop offset="100%" stopColor="rgb(74,222,128)" />
              </radialGradient>
            </defs>

            {/* Edges — curved bezier */}
            {TREE_EDGES.map(([from, to]) => {
              const f = TREE_NODES[from];
              const t = TREE_NODES[to];
              const isVisitedEdge = visited.has(from) && visited.has(to);
              const y1 = f.y + 22;
              const y2 = t.y - 2;
              const my = (y1 + y2) / 2;

              return (
                <g key={`${from}-${to}`}>
                  {isVisitedEdge && (
                    <path
                      d={`M ${f.x} ${y1} C ${f.x} ${my}, ${t.x} ${my}, ${t.x} ${y2}`}
                      fill="none"
                      stroke={accentColor}
                      strokeWidth={6}
                      opacity={0.15}
                      className="blur-[2px]"
                    />
                  )}
                  <path
                    d={`M ${f.x} ${y1} C ${f.x} ${my}, ${t.x} ${my}, ${t.x} ${y2}`}
                    fill="none"
                    stroke={
                      isVisitedEdge
                        ? "url(#tv-edge-visited)"
                        : "url(#tv-edge-pending)"
                    }
                    strokeWidth={isVisitedEdge ? 2.5 : 1.5}
                    strokeLinecap="round"
                    strokeDasharray={isVisitedEdge ? "none" : "6 5"}
                    className="transition-all duration-500"
                  />
                </g>
              );
            })}

            {/* Nodes */}
            {TREE_NODES.map((node) => {
              const isCurrent = current === node.id;
              const isVisitedNode = visited.has(node.id) && !isCurrent;
              const orderIndex = visitOrder.indexOf(node.id);

              return (
                <g key={node.id}>
                  {/* Double ring pulse for current */}
                  {isCurrent && (
                    <>
                      <circle
                        cx={node.x}
                        cy={node.y + 10}
                        r={34}
                        fill="none"
                        stroke={accentColor}
                        strokeWidth={1.5}
                      >
                        <animate
                          attributeName="r"
                          values="30;38;30"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.15;0.4;0.15"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle
                        cx={node.x}
                        cy={node.y + 10}
                        r={28}
                        fill="none"
                        stroke={accentColor}
                        strokeWidth={2}
                      >
                        <animate
                          attributeName="opacity"
                          values="0.3;0.7;0.3"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </>
                  )}

                  {/* Node circle with shadow */}
                  <circle
                    cx={node.x}
                    cy={node.y + 10}
                    r={22}
                    fill={
                      isCurrent
                        ? accentColor
                        : isVisitedNode
                          ? "url(#tv-node-visited)"
                          : "rgba(255,255,255,0.04)"
                    }
                    stroke={
                      isCurrent
                        ? "rgba(255,255,255,0.5)"
                        : isVisitedNode
                          ? "rgba(134,239,172,0.45)"
                          : "rgba(255,255,255,0.1)"
                    }
                    strokeWidth={2}
                    filter={isCurrent ? "url(#tv-glow)" : "url(#tv-shadow)"}
                    className="transition-all duration-400"
                  />

                  {/* Node value */}
                  <text
                    x={node.x}
                    y={node.y + 15.5}
                    textAnchor="middle"
                    fill={
                      isCurrent || isVisitedNode
                        ? "rgb(10,10,30)"
                        : "rgba(255,255,255,0.45)"
                    }
                    fontSize={15}
                    fontWeight="800"
                    fontFamily="monospace"
                    className="select-none transition-all duration-300"
                  >
                    {node.value}
                  </text>

                  {/* Visit order badge */}
                  {orderIndex >= 0 && !isCurrent && (
                    <g>
                      <circle
                        cx={node.x + 18}
                        cy={node.y - 8}
                        r={11}
                        fill="rgb(99,102,241)"
                        stroke="rgb(30,27,75)"
                        strokeWidth={2}
                        filter="url(#tv-shadow)"
                      />
                      <text
                        x={node.x + 18}
                        y={node.y - 4}
                        textAnchor="middle"
                        fill="white"
                        fontSize={10}
                        fontWeight="800"
                        className="select-none"
                      >
                        {orderIndex + 1}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  SHARED SIDE PANEL
 * ═══════════════════════════════════════════════════════ */

function VizSidePanel({
  phaseBadge,
  playing,
  setPlaying,
  isDone,
  onSkip,
  onReset,
  speedLabel,
  setSpeedLabel,
  accentColor,
  step,
  totalSteps,
  legend,
  children,
}: {
  phaseBadge: React.ReactNode;
  playing: boolean;
  setPlaying: (v: boolean) => void;
  isDone: boolean;
  onSkip: () => void;
  onReset: () => void;
  speedLabel: "1x" | "2x" | "4x";
  setSpeedLabel: (v: "1x" | "2x" | "4x") => void;
  accentColor: string;
  step: number;
  totalSteps: number;
  legend: {
    color: string;
    border: string;
    label: string;
    icon: React.ReactNode | string;
  }[];
  children?: React.ReactNode;
}) {
  return (
    <div className="w-56 shrink-0 flex flex-col gap-5 px-5 py-8 border-r border-white/5 bg-white/1">
      <AnimatePresence mode="wait">{phaseBadge}</AnimatePresence>

      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
          Playback
        </span>
        <div className="flex items-center gap-2">
          {!playing ? (
            <button
              onClick={() => setPlaying(true)}
              disabled={isDone}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 transition-all"
            >
              <Play className="w-4 h-4 text-white fill-white/30" />
            </button>
          ) : (
            <button
              onClick={() => setPlaying(false)}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <Pause className="w-4 h-4 text-white" />
            </button>
          )}
          <button
            onClick={onSkip}
            disabled={isDone}
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 transition-all"
          >
            <SkipForward className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={onReset}
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <RotateCcw className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
          Speed
        </span>
        <div className="flex gap-1.5">
          {(["1x", "2x", "4x"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSpeedLabel(s)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${speedLabel === s ? "text-white/90" : "bg-white/3 text-white/35 border-white/7 hover:bg-white/5"}`}
              style={
                speedLabel === s
                  ? {
                      backgroundColor: `${accentColor}25`,
                      color: accentColor,
                      borderColor: `${accentColor}55`,
                      boxShadow: `0 0 12px ${accentColor}30`,
                    }
                  : undefined
              }
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
          Progress
        </span>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(to right, ${accentColor}cc, rgba(134,239,172,0.8))`,
            }}
            initial={{ width: "0%" }}
            animate={{
              width: totalSteps ? `${(step / totalSteps) * 100}%` : "0%",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <span className="text-white/30 text-[11px] font-mono text-center">
          {Math.min(step, totalSteps)} / {totalSteps}
        </span>
      </div>

      {children}

      <div className="flex flex-col gap-2.5 mt-auto">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
          Legend
        </span>
        {legend.map((l) => (
          <div key={l.label} className="flex items-center gap-2.5">
            <div
              className="w-5 h-5 rounded-md shrink-0 border flex items-center justify-center text-[9px]"
              style={{
                borderColor: l.border,
                backgroundColor: `${l.color}15`,
                color: l.color,
              }}
            >
              {l.icon}
            </div>
            <span className="text-[11px] text-white/40">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VizMainArea({
  accentColor,
  children,
}: {
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex items-center justify-center overflow-auto p-6">
      <div
        className="relative rounded-2xl border border-white/5 bg-[#050510]/80 backdrop-blur-sm overflow-auto"
        style={{ boxShadow: `0 0 80px ${accentColor}08` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 30%, ${accentColor}06 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  HEAP SORT VISUALIZER
 * ═══════════════════════════════════════════════════════ */

type HeapOp =
  | { type: "compare"; i: number; j: number }
  | { type: "swap"; i: number; j: number }
  | { type: "extract"; i: number }
  | { type: "sorted"; i: number };

function generateHeapSortOps(arr: number[]): {
  ops: HeapOp[];
  finalArr: number[];
} {
  const a = [...arr];
  const ops: HeapOp[] = [];
  const n = a.length;
  function heapify(size: number, root: number) {
    let largest = root;
    const l = 2 * root + 1,
      r = 2 * root + 2;
    if (l < size) {
      ops.push({ type: "compare", i: largest, j: l });
      if (a[l] > a[largest]) largest = l;
    }
    if (r < size) {
      ops.push({ type: "compare", i: largest, j: r });
      if (a[r] > a[largest]) largest = r;
    }
    if (largest !== root) {
      ops.push({ type: "swap", i: root, j: largest });
      [a[root], a[largest]] = [a[largest], a[root]];
      heapify(size, largest);
    }
  }
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
  for (let i = n - 1; i > 0; i--) {
    ops.push({ type: "swap", i: 0, j: i });
    [a[0], a[i]] = [a[i], a[0]];
    ops.push({ type: "sorted", i });
    heapify(i, 0);
  }
  ops.push({ type: "sorted", i: 0 });
  return { ops, finalArr: a };
}

function HeapSortViz({ accentColor }: { accentColor: string }) {
  const INITIAL = [4, 10, 3, 5, 1, 8, 7, 2, 9, 6];
  const { ops, finalArr } = useMemo(() => generateHeapSortOps(INITIAL), []);
  const SPEED_MAP: Record<string, number> = {
    "1x": 1200,
    "2x": 700,
    "4x": 350,
  };
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedLabel, setSpeedLabel] = useState<"1x" | "2x" | "4x">("1x");
  const speed = SPEED_MAP[speedLabel];
  const [arr, setArr] = useState([...INITIAL]);
  const [highlight, setHighlight] = useState<{
    compare: number[];
    swap: number[];
    sorted: Set<number>;
  }>({ compare: [], swap: [], sorted: new Set() });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initState = useCallback(() => {
    setStep(0);
    setPlaying(false);
    setArr([...INITIAL]);
    setHighlight({ compare: [], swap: [], sorted: new Set() });
  }, []);

  const applyStep = useCallback(
    (s: number) => {
      if (s >= ops.length) {
        setPlaying(false);
        setHighlight((h) => ({ ...h, compare: [], swap: [] }));
        return;
      }
      const op = ops[s];
      const h = {
        compare: [] as number[],
        swap: [] as number[],
        sorted: new Set(highlight.sorted),
      };
      if (op.type === "compare") {
        h.compare = [op.i, op.j];
      } else if (op.type === "swap") {
        h.swap = [op.i, op.j];
        setArr((prev) => {
          const a = [...prev];
          [a[op.i], a[op.j]] = [a[op.j], a[op.i]];
          return a;
        });
      } else if (op.type === "sorted") {
        h.sorted.add(op.i);
      }
      setHighlight(h);
      setStep(s + 1);
    },
    [ops, highlight.sorted],
  );

  useEffect(() => {
    if (!playing) return;
    if (step >= ops.length) {
      setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => applyStep(step), speed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, step, ops.length, speed, applyStep]);

  const isDone = step >= ops.length && ops.length > 0;
  const handleSkip = () => {
    setArr([...finalArr]);
    setStep(ops.length);
    setPlaying(false);
    setHighlight({
      compare: [],
      swap: [],
      sorted: new Set(Array.from({ length: INITIAL.length }, (_, i) => i)),
    });
  };

  // Heap tree positions for 10 elements
  const POS: { x: number; y: number }[] = [
    { x: 400, y: 60 },
    { x: 220, y: 150 },
    { x: 580, y: 150 },
    { x: 130, y: 240 },
    { x: 310, y: 240 },
    { x: 490, y: 240 },
    { x: 670, y: 240 },
    { x: 85, y: 330 },
    { x: 175, y: 330 },
    { x: 265, y: 330 },
  ];

  return (
    <div className="flex h-full">
      <VizSidePanel
        phaseBadge={
          highlight.swap.length > 0 ? (
            <motion.div
              key="swap"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-rose-500/15 text-rose-300 border border-rose-500/30"
            >
              ⇄ Swapping
            </motion.div>
          ) : highlight.compare.length > 0 ? (
            <motion.div
              key="cmp"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-sky-500/15 text-sky-300 border border-sky-500/30"
            >
              ? Comparing
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase text-center bg-white/3 text-white/25 border border-white/5"
            >
              {isDone ? (
                <>
                  <Check className="inline w-3 h-3 mr-1 mb-0.5" /> Complete
                </>
              ) : (
                "Ready"
              )}
            </motion.div>
          )
        }
        playing={playing}
        setPlaying={setPlaying}
        isDone={isDone}
        onSkip={handleSkip}
        onReset={initState}
        speedLabel={speedLabel}
        setSpeedLabel={setSpeedLabel}
        accentColor={accentColor}
        step={step}
        totalSteps={ops.length}
        legend={[
          {
            color: "rgb(251,113,133)",
            border: "rgba(244,63,94,0.5)",
            label: "Swapping",
            icon: <RefreshCw className="w-2.5 h-2.5" />,
          },
          {
            color: "rgb(125,211,252)",
            border: "rgba(14,165,233,0.5)",
            label: "Comparing",
            icon: <HelpCircle className="w-2.5 h-2.5" />,
          },
          {
            color: "rgb(134,239,172)",
            border: "rgba(134,239,172,0.5)",
            label: "Sorted",
            icon: <Check className="w-2.5 h-2.5" />,
          },
          {
            color: "rgba(255,255,255,0.4)",
            border: "rgba(255,255,255,0.15)",
            label: "Unsorted",
            icon: <Circle className="w-2.5 h-2.5" />,
          },
        ]}
      />
      <VizMainArea accentColor={accentColor}>
        <svg width={800} height={400} viewBox="0 0 800 400">
          <defs>
            <filter id="hs-glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="hs-shadow">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="3"
                floodColor="rgba(0,0,0,0.4)"
              />
            </filter>
          </defs>
          {/* Edges */}
          {arr.map((_, i) => {
            const children = [2 * i + 1, 2 * i + 2].filter(
              (c) => c < arr.length,
            );
            return children.map((c) => {
              const p = POS[i],
                ch = POS[c];
              const bothSorted =
                highlight.sorted.has(i) && highlight.sorted.has(c);
              const my = (p.y + 22 + ch.y - 2) / 2;
              return (
                <path
                  key={`he-${i}-${c}`}
                  d={`M ${p.x} ${p.y + 22} C ${p.x} ${my}, ${ch.x} ${my}, ${ch.x} ${ch.y - 2}`}
                  fill="none"
                  stroke={
                    bothSorted
                      ? "rgba(134,239,172,0.35)"
                      : "rgba(255,255,255,0.08)"
                  }
                  strokeWidth={bothSorted ? 2 : 1.5}
                  strokeDasharray={bothSorted ? "none" : "6 5"}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              );
            });
          })}
          {/* Nodes */}
          {arr.map((val, i) => {
            const pos = POS[i];
            const isSwap = highlight.swap.includes(i);
            const isCmp = highlight.compare.includes(i);
            const isSorted = highlight.sorted.has(i);
            let fill = "rgba(255,255,255,0.04)",
              stroke = "rgba(255,255,255,0.1)",
              text = "rgba(255,255,255,0.5)";
            if (isSorted) {
              fill = "rgba(134,239,172,0.15)";
              stroke = "rgba(134,239,172,0.4)";
              text = "rgb(134,239,172)";
            }
            if (isCmp) {
              fill = "rgba(14,165,233,0.15)";
              stroke = "rgba(14,165,233,0.5)";
              text = "rgb(125,211,252)";
            }
            if (isSwap) {
              fill = "rgba(244,63,94,0.2)";
              stroke = "rgba(244,63,94,0.6)";
              text = "rgb(251,113,133)";
            }
            return (
              <g key={`hn-${i}`}>
                {(isSwap || isCmp) && (
                  <circle
                    cx={pos.x}
                    cy={pos.y + 10}
                    r={28}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={1.5}
                  >
                    <animate
                      attributeName="opacity"
                      values="0.2;0.6;0.2"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                <circle
                  cx={pos.x}
                  cy={pos.y + 10}
                  r={22}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={2}
                  filter={isSwap || isCmp ? "url(#hs-glow)" : "url(#hs-shadow)"}
                  className="transition-all duration-400"
                />
                <text
                  x={pos.x}
                  y={pos.y + 15.5}
                  textAnchor="middle"
                  fill={text}
                  fontSize={15}
                  fontWeight="800"
                  fontFamily="monospace"
                  className="select-none"
                >
                  {val}
                </text>
              </g>
            );
          })}
        </svg>
      </VizMainArea>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  BINARY SEARCH VISUALIZER
 * ═══════════════════════════════════════════════════════ */

type BSStep = { lo: number; hi: number; mid: number; found: boolean };

function generateBinarySearchSteps(arr: number[], target: number): BSStep[] {
  const steps: BSStep[] = [];
  let lo = 0,
    hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    steps.push({ lo, hi, mid, found: arr[mid] === target });
    if (arr[mid] === target) break;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return steps;
}

function BinarySearchViz({ accentColor }: { accentColor: string }) {
  const SORTED = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
  const [target, setTarget] = useState(23);
  const [inputVal, setInputVal] = useState("23");
  const bsSteps = useMemo(
    () => generateBinarySearchSteps(SORTED, target),
    [target],
  );
  const SPEED_MAP: Record<string, number> = {
    "1x": 1000,
    "2x": 500,
    "4x": 250,
  };
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedLabel, setSpeedLabel] = useState<"1x" | "2x" | "4x">("1x");
  const speed = SPEED_MAP[speedLabel];
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const applyTarget = useCallback((t: number) => {
    setTarget(t);
    setInputVal(String(t));
    setStep(0);
    setPlaying(false);
  }, []);
  const initState = useCallback(() => {
    setStep(0);
    setPlaying(false);
  }, []);
  const isDone = step >= bsSteps.length;
  const currentStep = step > 0 ? bsSteps[step - 1] : null;

  useEffect(() => {
    if (!playing || isDone) {
      if (isDone) setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => setStep((s) => s + 1), speed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, step, isDone, speed]);

  const handleSkip = () => {
    setStep(bsSteps.length);
    setPlaying(false);
  };

  const found = currentStep?.found ?? false;
  const lo = currentStep?.lo ?? 0;
  const hi = currentStep?.hi ?? SORTED.length - 1;
  const mid = currentStep?.mid ?? -1;

  return (
    <div className="flex h-full">
      <VizSidePanel
        phaseBadge={
          found ? (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
            >
              ✓ Found!
            </motion.div>
          ) : isDone && !found ? (
            <motion.div
              key="notfound"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-rose-500/15 text-rose-300 border border-rose-500/30"
            >
              ✗ Not Found
            </motion.div>
          ) : step > 0 ? (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-sky-500/15 text-sky-300 border border-sky-500/30"
            >
              🔍 Searching
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase text-center bg-white/3 text-white/25 border border-white/5"
            >
              Ready
            </motion.div>
          )
        }
        playing={playing}
        setPlaying={setPlaying}
        isDone={isDone}
        onSkip={handleSkip}
        onReset={initState}
        speedLabel={speedLabel}
        setSpeedLabel={setSpeedLabel}
        accentColor={accentColor}
        step={step}
        totalSteps={bsSteps.length}
        legend={[
          {
            color: "rgb(56,189,248)",
            border: "rgba(14,165,233,0.5)",
            label: "Mid (checking)",
            icon: "▼",
          },
          {
            color: "rgb(134,239,172)",
            border: "rgba(134,239,172,0.5)",
            label: "Found / Target",
            icon: <Check className="w-2.5 h-2.5" />,
          },
          {
            color: "rgb(196,181,253)",
            border: "rgba(139,92,246,0.5)",
            label: "Search range",
            icon: "─",
          },
          {
            color: "rgba(255,255,255,0.3)",
            border: "rgba(255,255,255,0.1)",
            label: "Eliminated",
            icon: <X className="w-2.5 h-2.5" />,
          },
        ]}
      >
        {/* Target input */}
        <div className="flex flex-col gap-2 px-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">
            Target
          </span>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const n = parseInt(inputVal);
                  if (!isNaN(n)) applyTarget(n);
                }
              }}
              disabled={playing}
              className="w-16 h-8 rounded-lg bg-white/5 border border-white/10 text-center text-sm font-black font-mono text-sky-300 outline-none focus:border-sky-500/50 focus:bg-sky-500/5 transition-all disabled:opacity-40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              onClick={() => {
                const n = parseInt(inputVal);
                if (!isNaN(n)) applyTarget(n);
              }}
              disabled={playing}
              className="h-8 px-2.5 rounded-lg bg-sky-500/15 border border-sky-500/30 text-[10px] font-bold uppercase tracking-wider text-sky-300 hover:bg-sky-500/25 transition-all disabled:opacity-30"
            >
              Go
            </button>
          </div>
        </div>
        {/* Quick pick from array values */}
        <div className="flex flex-col gap-1.5 px-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">
            Quick Pick
          </span>
          <div className="flex flex-wrap gap-1">
            {SORTED.map((v) => (
              <button
                key={v}
                onClick={() => applyTarget(v)}
                disabled={playing}
                className={`w-9 h-7 rounded-md text-[11px] font-bold font-mono border transition-all disabled:opacity-30 ${v === target ? "bg-sky-500/20 border-sky-500/40 text-sky-300" : "bg-white/3 border-white/8 text-white/40 hover:bg-white/6 hover:text-white/60"}`}
              >
                {v}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              const miss = [1, 7, 15, 30, 50, 99];
              applyTarget(miss[Math.floor(Math.random() * miss.length)]);
            }}
            disabled={playing}
            className="mt-0.5 h-6 rounded-md bg-rose-500/10 border border-rose-500/20 text-[9px] font-bold uppercase tracking-wider text-rose-300/60 hover:bg-rose-500/20 hover:text-rose-300 transition-all disabled:opacity-30"
          >
            Random miss
          </button>
        </div>
      </VizSidePanel>
      <VizMainArea accentColor={accentColor}>
        <div className="flex flex-col items-center gap-6 px-12 py-10">
          {/* Range bracket */}
          {step > 0 && !found && (
            <div
              className="flex items-end h-6"
              style={{ width: `${SORTED.length * 76}px` }}
            >
              <div
                style={{
                  marginLeft: `${lo * 76 + 4}px`,
                  width: `${(hi - lo) * 76 + 68}px`,
                }}
                className="h-1.5 rounded-full bg-violet-500/30 border border-violet-500/40"
              />
            </div>
          )}
          {step === 0 && <div className="h-6" />}
          {/* Mid pointer */}
          <div
            className="flex items-end h-8"
            style={{ width: `${SORTED.length * 76}px` }}
          >
            {mid >= 0 && step > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center"
                style={{ marginLeft: `${mid * 76 + 20}px` }}
              >
                <span className="text-[10px] font-bold text-sky-300 tracking-wider">
                  MID
                </span>
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-sky-400" />
              </motion.div>
            )}
          </div>
          {/* Array boxes */}
          <div className="flex items-center gap-2">
            {SORTED.map((val, i) => {
              const inRange = step > 0 && i >= lo && i <= hi;
              const isMid = step > 0 && i === mid;
              const isFound = found && i === mid;

              let border = "rgba(255,255,255,0.08)";
              let bg = "rgba(255,255,255,0.02)";
              let text = "rgba(255,255,255,0.25)";
              let shadow = "none";

              if (inRange && !isMid) {
                border = "rgba(139,92,246,0.35)";
                bg = "rgba(139,92,246,0.08)";
                text = "rgb(196,181,253)";
              }
              if (isMid && !isFound) {
                border = "rgba(14,165,233,0.6)";
                bg = "rgba(14,165,233,0.15)";
                text = "rgb(56,189,248)";
                shadow = "0 0 20px rgba(14,165,233,0.3)";
              }
              if (isFound) {
                border = "rgba(134,239,172,0.6)";
                bg = "rgba(134,239,172,0.15)";
                text = "rgb(134,239,172)";
                shadow = "0 0 24px rgba(134,239,172,0.4)";
              }

              return (
                <motion.div
                  key={i}
                  layout
                  animate={{ scale: isMid ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-16 h-16 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                  style={{
                    borderColor: border,
                    backgroundColor: bg,
                    boxShadow: shadow,
                    color: text,
                  }}
                >
                  <span className="text-lg font-black tabular-nums font-mono">
                    {val}
                  </span>
                </motion.div>
              );
            })}
          </div>
          {/* Index labels */}
          <div className="flex items-center gap-2">
            {SORTED.map((_, i) => (
              <div
                key={i}
                className="w-16 text-center text-[10px] text-white/15 font-mono"
              >
                [{i}]
              </div>
            ))}
          </div>
        </div>
      </VizMainArea>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  GRAPH DATA — shared by Dijkstra, Prim, Kruskal
 * ═══════════════════════════════════════════════════════ */

interface GNode {
  id: number;
  label: string;
  x: number;
  y: number;
}
interface GEdge {
  from: number;
  to: number;
  weight: number;
}

const GRAPH_NODES: GNode[] = [
  { id: 0, label: "A", x: 120, y: 60 },
  { id: 1, label: "B", x: 320, y: 40 },
  { id: 2, label: "C", x: 520, y: 60 },
  { id: 3, label: "D", x: 80, y: 220 },
  { id: 4, label: "E", x: 320, y: 200 },
  { id: 5, label: "F", x: 560, y: 220 },
  { id: 6, label: "G", x: 200, y: 340 },
  { id: 7, label: "H", x: 440, y: 340 },
];

const GRAPH_EDGES: GEdge[] = [
  { from: 0, to: 1, weight: 4 },
  { from: 0, to: 3, weight: 8 },
  { from: 1, to: 2, weight: 3 },
  { from: 1, to: 4, weight: 5 },
  { from: 2, to: 5, weight: 2 },
  { from: 3, to: 4, weight: 6 },
  { from: 3, to: 6, weight: 7 },
  { from: 4, to: 5, weight: 1 },
  { from: 4, to: 7, weight: 9 },
  { from: 5, to: 7, weight: 4 },
  { from: 6, to: 7, weight: 3 },
];

/* ═══════════════════════════════════════════════════════
 *  DIJKSTRA VISUALIZER
 * ═══════════════════════════════════════════════════════ */

type DijkStep =
  | { type: "visit"; nodeId: number; dist: number }
  | { type: "relax"; from: number; to: number; newDist: number }
  | { type: "finalize"; nodeId: number; dist: number };

function generateDijkstraSteps(start: number): DijkStep[] {
  const n = GRAPH_NODES.length;
  const dist = Array(n).fill(Infinity);
  const visited = new Set<number>();
  dist[start] = 0;
  const steps: DijkStep[] = [];

  for (let iter = 0; iter < n; iter++) {
    let u = -1;
    for (let i = 0; i < n; i++) {
      if (!visited.has(i) && (u === -1 || dist[i] < dist[u])) u = i;
    }
    if (u === -1 || dist[u] === Infinity) break;
    visited.add(u);
    steps.push({ type: "visit", nodeId: u, dist: dist[u] });
    for (const e of GRAPH_EDGES) {
      const v = e.from === u ? e.to : e.to === u ? e.from : -1;
      if (v === -1 || visited.has(v)) continue;
      const nd = dist[u] + e.weight;
      if (nd < dist[v]) {
        dist[v] = nd;
        steps.push({ type: "relax", from: u, to: v, newDist: nd });
      }
    }
    steps.push({ type: "finalize", nodeId: u, dist: dist[u] });
  }
  return steps;
}

function GraphSvg({
  visitedNodes,
  visitedEdges,
  currentNode,
  relaxingEdge,
  distances,
  accentColor,
  showWeights = true,
  rejectedEdge,
  finalPathEdges,
  mstWeight,
}: {
  visitedNodes: Set<number>;
  visitedEdges: Set<string>;
  currentNode: number | null;
  relaxingEdge: { from: number; to: number } | null;
  distances?: Map<number, number>;
  accentColor: string;
  showWeights?: boolean;
  rejectedEdge?: { from: number; to: number } | null;
  finalPathEdges?: Set<string>;
  mstWeight?: number;
}) {
  const W = 700,
    H = 420;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <filter id="gr-glow">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="gr-shadow">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="4"
            floodColor="rgba(0,0,0,0.5)"
          />
        </filter>
        <filter id="gr-edge-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="gr-weight-shadow">
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="2"
            floodColor="rgba(0,0,0,0.6)"
          />
        </filter>
        <linearGradient id="gr-final-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(134,239,172)" />
          <stop offset="100%" stopColor="rgb(52,211,153)" />
        </linearGradient>
        <marker
          id="gr-arrow-active"
          markerWidth="8"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L8,3 L0,6" fill={accentColor} fillOpacity="0.6" />
        </marker>
      </defs>

      {/* Edges */}
      {GRAPH_EDGES.map((e, idx) => {
        const a = GRAPH_NODES[e.from],
          b = GRAPH_NODES[e.to];
        const ek = `${Math.min(e.from, e.to)}-${Math.max(e.from, e.to)}`;
        const isVisited = visitedEdges.has(ek);
        const isFinal = finalPathEdges?.has(ek);
        const isRelaxing =
          relaxingEdge &&
          ((relaxingEdge.from === e.from && relaxingEdge.to === e.to) ||
            (relaxingEdge.from === e.to && relaxingEdge.to === e.from));
        const isRejected =
          rejectedEdge &&
          ((rejectedEdge.from === e.from && rejectedEdge.to === e.to) ||
            (rejectedEdge.from === e.to && rejectedEdge.to === e.from));

        // Curved bezier with offset perpendicular to edge
        const dx = b.x - a.x,
          dy = b.y - a.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const nx = -dy / len,
          ny = dx / len;
        const bulge = 25;
        const cx1 = (a.x + b.x) / 2 + nx * bulge,
          cy1 = (a.y + b.y) / 2 + ny * bulge;
        const mx = (a.x + 2 * cx1 + b.x) / 4,
          my = (a.y + 2 * cy1 + b.y) / 4;
        const pathD = `M ${a.x} ${a.y} Q ${cx1} ${cy1}, ${b.x} ${b.y}`;

        let edgeColor = "rgba(255,255,255,0.06)";
        let edgeWidth = 1.5;
        let dashArray = "8 6";
        let edgeGlow = false;

        if (isRejected) {
          edgeColor = "rgba(248,113,113,0.7)";
          edgeWidth = 2.5;
          dashArray = "none";
          edgeGlow = true;
        } else if (isFinal) {
          edgeColor = "rgb(134,239,172)";
          edgeWidth = 3.5;
          dashArray = "none";
          edgeGlow = true;
        } else if (isRelaxing) {
          edgeColor = "rgb(251,191,36)";
          edgeWidth = 3;
          dashArray = "none";
          edgeGlow = true;
        } else if (isVisited) {
          edgeColor = accentColor;
          edgeWidth = 2.5;
          dashArray = "none";
          edgeGlow = true;
        }

        return (
          <g key={idx}>
            {/* Wide glow behind active edges */}
            {edgeGlow && (
              <path
                d={pathD}
                fill="none"
                stroke={edgeColor}
                strokeWidth={edgeWidth + 6}
                opacity={0.12}
                strokeLinecap="round"
                className="blur-[3px]"
              />
            )}
            {/* Main edge */}
            <path
              d={pathD}
              fill="none"
              stroke={edgeColor}
              strokeWidth={edgeWidth}
              strokeDasharray={dashArray}
              strokeLinecap="round"
              filter={edgeGlow ? "url(#gr-edge-glow)" : undefined}
              className="transition-all duration-500"
            />
            {/* Animated dash for relaxing */}
            {isRelaxing && (
              <path
                d={pathD}
                fill="none"
                stroke="rgb(251,191,36)"
                strokeWidth={1.5}
                strokeDasharray="4 8"
                strokeLinecap="round"
                opacity={0.6}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;24"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            )}
            {/* Rejected flash */}
            {isRejected && (
              <path
                d={pathD}
                fill="none"
                stroke="rgb(248,113,113)"
                strokeWidth={2}
                opacity={0.4}
              >
                <animate
                  attributeName="opacity"
                  values="0.6;0;0.6"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </path>
            )}
            {/* Final path shimmer */}
            {isFinal && (
              <path
                d={pathD}
                fill="none"
                stroke="rgb(134,239,172)"
                strokeWidth={1.5}
                strokeDasharray="6 10"
                strokeLinecap="round"
                opacity={0.5}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;32"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
            )}
            {/* Weight label */}
            {showWeights && (
              <g filter="url(#gr-weight-shadow)">
                <rect
                  x={mx - 14}
                  y={my - 11}
                  width={28}
                  height={22}
                  rx={8}
                  fill={
                    isRejected
                      ? "rgba(127,29,29,0.85)"
                      : isFinal
                        ? "rgba(6,78,59,0.85)"
                        : isRelaxing
                          ? "rgba(120,53,15,0.85)"
                          : isVisited
                            ? "rgba(0,0,0,0.75)"
                            : "rgba(0,0,0,0.55)"
                  }
                  stroke={
                    isRejected
                      ? "rgba(248,113,113,0.5)"
                      : isFinal
                        ? "rgba(134,239,172,0.5)"
                        : isRelaxing
                          ? "rgba(251,191,36,0.6)"
                          : isVisited
                            ? `${accentColor}50`
                            : "rgba(255,255,255,0.08)"
                  }
                  strokeWidth={1.5}
                />
                <text
                  x={mx}
                  y={my + 4}
                  textAnchor="middle"
                  fill={
                    isRejected
                      ? "rgb(252,165,165)"
                      : isFinal
                        ? "rgb(167,243,208)"
                        : isRelaxing
                          ? "rgb(253,230,138)"
                          : isVisited
                            ? accentColor
                            : "rgba(255,255,255,0.4)"
                  }
                  fontSize={12}
                  fontWeight="900"
                  fontFamily="monospace"
                  className="select-none"
                >
                  {e.weight}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {GRAPH_NODES.map((n) => {
        const isCurrent = currentNode === n.id;
        const isVisited = visitedNodes.has(n.id) && !isCurrent;
        const dist = distances?.get(n.id);

        let fill = "rgba(255,255,255,0.03)";
        let stroke = "rgba(255,255,255,0.1)";
        let text = "rgba(255,255,255,0.5)";
        let labelFill = "rgba(255,255,255,0.25)";
        let shadowFilter = "url(#gr-shadow)";

        if (isVisited) {
          fill = `${accentColor}20`;
          stroke = `${accentColor}55`;
          text = accentColor;
          labelFill = `${accentColor}88`;
          shadowFilter = "url(#gr-shadow)";
        }
        if (isCurrent) {
          fill = accentColor;
          stroke = "rgba(255,255,255,0.6)";
          text = "rgb(10,10,30)";
          labelFill = accentColor;
          shadowFilter = "url(#gr-glow)";
        }

        return (
          <g key={n.id}>
            {/* Pulse rings for current */}
            {isCurrent && (
              <>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={34}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth={1.5}
                >
                  <animate
                    attributeName="r"
                    values="30;40;30"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.1;0.4;0.1"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={28}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth={2}
                >
                  <animate
                    attributeName="opacity"
                    values="0.25;0.6;0.25"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </>
            )}

            {/* Node circle */}
            <circle
              cx={n.x}
              cy={n.y}
              r={24}
              fill={fill}
              stroke={stroke}
              strokeWidth={2.5}
              filter={shadowFilter}
              className="transition-all duration-400"
            />

            {/* Node label */}
            <text
              x={n.x}
              y={n.y + 6}
              textAnchor="middle"
              fill={text}
              fontSize={16}
              fontWeight="900"
              fontFamily="monospace"
              className="select-none"
            >
              {n.label}
            </text>

            {/* Distance badge (for Dijkstra) */}
            {distances && dist !== undefined && (
              <g>
                <rect
                  x={n.x + 17}
                  y={n.y - 32}
                  width={dist >= 10 ? 34 : 28}
                  height={22}
                  rx={8}
                  fill={isCurrent ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.7)"}
                  stroke={
                    isCurrent ? "rgba(255,255,255,0.3)" : `${accentColor}50`
                  }
                  strokeWidth={1.5}
                  filter="url(#gr-shadow)"
                />
                <text
                  x={n.x + 17 + (dist >= 10 ? 17 : 14)}
                  y={n.y - 18}
                  textAnchor="middle"
                  fill={isCurrent ? "rgba(255,255,255,0.9)" : accentColor}
                  fontSize={12}
                  fontWeight="900"
                  fontFamily="monospace"
                  className="select-none"
                >
                  {dist === Infinity ? "∞" : dist}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* MST total weight badge */}
      {mstWeight !== undefined && mstWeight > 0 && (
        <g>
          <rect
            x={W - 140}
            y={H - 50}
            width={120}
            height={36}
            rx={12}
            fill="rgba(0,0,0,0.6)"
            stroke={`${accentColor}40`}
            strokeWidth={1.5}
          />
          <text
            x={W - 80}
            y={H - 38}
            textAnchor="middle"
            fill="rgba(255,255,255,0.4)"
            fontSize={9}
            fontWeight="700"
            letterSpacing="1.5"
            className="select-none uppercase"
          >
            Total Weight
          </text>
          <text
            x={W - 80}
            y={H - 20}
            textAnchor="middle"
            fill={accentColor}
            fontSize={16}
            fontWeight="900"
            fontFamily="monospace"
            className="select-none"
          >
            {mstWeight}
          </text>
        </g>
      )}
    </svg>
  );
}

function DijkstraViz({ accentColor }: { accentColor: string }) {
  const steps = useMemo(() => generateDijkstraSteps(0), []);
  // Build shortest-path tree edges from relax steps (last relax to each node wins)
  const spTreeEdges = useMemo(() => {
    const parent = new Map<number, number>();
    for (const s of steps) {
      if (s.type === "relax") parent.set(s.to, s.from);
    }
    const edges = new Set<string>();
    parent.forEach((from, to) =>
      edges.add(`${Math.min(from, to)}-${Math.max(from, to)}`),
    );
    return edges;
  }, [steps]);

  const SPEED_MAP: Record<string, number> = { "1x": 800, "2x": 400, "4x": 200 };
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedLabel, setSpeedLabel] = useState<"1x" | "2x" | "4x">("1x");
  const speed = SPEED_MAP[speedLabel];
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [visitedEdges, setVisitedEdges] = useState<Set<string>>(new Set());
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [relaxingEdge, setRelaxingEdge] = useState<{
    from: number;
    to: number;
  } | null>(null);
  const [distances, setDistances] = useState<Map<number, number>>(
    new Map([[0, 0]]),
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initState = useCallback(() => {
    setStep(0);
    setPlaying(false);
    setVisitedNodes(new Set());
    setVisitedEdges(new Set());
    setCurrentNode(null);
    setRelaxingEdge(null);
    setDistances(new Map([[0, 0]]));
  }, []);

  const applyStep = useCallback(
    (s: number) => {
      if (s >= steps.length) {
        setPlaying(false);
        setCurrentNode(null);
        setRelaxingEdge(null);
        return;
      }
      const op = steps[s];
      setRelaxingEdge(null);
      if (op.type === "visit") {
        setCurrentNode(op.nodeId);
        setVisitedNodes((prev) => new Set(prev).add(op.nodeId));
        setDistances((prev) => new Map(prev).set(op.nodeId, op.dist));
      } else if (op.type === "relax") {
        setRelaxingEdge({ from: op.from, to: op.to });
        const ek = `${Math.min(op.from, op.to)}-${Math.max(op.from, op.to)}`;
        setVisitedEdges((prev) => new Set(prev).add(ek));
        setDistances((prev) => new Map(prev).set(op.to, op.newDist));
      } else if (op.type === "finalize") {
        setCurrentNode(null);
      }
      setStep(s + 1);
    },
    [steps],
  );

  useEffect(() => {
    if (!playing) return;
    if (step >= steps.length) {
      setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => applyStep(step), speed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, step, steps.length, speed, applyStep]);
  const isDone = step >= steps.length && steps.length > 0;
  const handleSkip = () => {
    const vn = new Set<number>(),
      ve = new Set<string>(),
      d = new Map<number, number>();
    for (const s of steps) {
      if (s.type === "visit") {
        vn.add(s.nodeId);
        d.set(s.nodeId, s.dist);
      } else if (s.type === "relax") {
        ve.add(`${Math.min(s.from, s.to)}-${Math.max(s.from, s.to)}`);
        d.set(s.to, s.newDist);
      }
    }
    setVisitedNodes(vn);
    setVisitedEdges(ve);
    setDistances(d);
    setCurrentNode(null);
    setRelaxingEdge(null);
    setStep(steps.length);
    setPlaying(false);
  };

  return (
    <div className="flex h-full">
      <VizSidePanel
        phaseBadge={
          relaxingEdge ? (
            <motion.div
              key="relax"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-amber-500/15 text-amber-300 border border-amber-500/30"
            >
              ↝ Relaxing
            </motion.div>
          ) : currentNode !== null ? (
            <motion.div
              key="visit"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-teal-500/15 text-teal-300 border border-teal-500/30"
            >
              ● Visiting
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase text-center bg-white/3 text-white/25 border border-white/5"
            >
              {isDone ? (
                <>
                  <Check className="inline w-3 h-3 mr-1 mb-0.5" /> Shortest
                  Paths Found
                </>
              ) : (
                "Ready"
              )}
            </motion.div>
          )
        }
        playing={playing}
        setPlaying={setPlaying}
        isDone={isDone}
        onSkip={handleSkip}
        onReset={initState}
        speedLabel={speedLabel}
        setSpeedLabel={setSpeedLabel}
        accentColor={accentColor}
        step={step}
        totalSteps={steps.length}
        legend={[
          {
            color: "rgb(20,184,166)",
            border: "rgba(20,184,166,0.5)",
            label: "Current",
            icon: "●",
          },
          {
            color: "rgb(251,191,36)",
            border: "rgba(251,191,36,0.5)",
            label: "Relaxing",
            icon: "↝",
          },
          {
            color: "rgb(134,239,172)",
            border: "rgba(134,239,172,0.5)",
            label: "SP Tree edge",
            icon: "━",
          },
          {
            color: "rgba(255,255,255,0.3)",
            border: "rgba(255,255,255,0.1)",
            label: "Unvisited",
            icon: <Circle className="w-2.5 h-2.5" />,
          },
        ]}
      >
        {/* Distance table */}
        <div className="flex flex-col gap-1.5 px-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">
            Distances from A
          </span>
          <div className="flex flex-col gap-0.5">
            {GRAPH_NODES.map((n) => {
              const d = distances.get(n.id);
              return (
                <div key={n.id} className="flex items-center gap-2 py-0.5">
                  <span
                    className={`w-5 text-[11px] font-bold font-mono ${visitedNodes.has(n.id) ? "text-emerald-400" : "text-white/30"}`}
                  >
                    {n.label}
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                  <span
                    className={`text-[11px] font-bold font-mono tabular-nums ${d !== undefined ? (visitedNodes.has(n.id) ? "text-emerald-300" : "text-amber-300") : "text-white/15"}`}
                  >
                    {d !== undefined ? d : "∞"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </VizSidePanel>
      <VizMainArea accentColor={accentColor}>
        <GraphSvg
          visitedNodes={visitedNodes}
          visitedEdges={visitedEdges}
          currentNode={currentNode}
          relaxingEdge={relaxingEdge}
          distances={distances}
          accentColor={accentColor}
          finalPathEdges={isDone ? spTreeEdges : undefined}
        />
      </VizMainArea>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  PRIM'S ALGORITHM VISUALIZER
 * ═══════════════════════════════════════════════════════ */

type PrimStep =
  | { type: "add-node"; nodeId: number }
  | { type: "add-edge"; from: number; to: number; weight: number }
  | { type: "consider-edge"; from: number; to: number };

function generatePrimSteps(start: number): PrimStep[] {
  const steps: PrimStep[] = [];
  const inMST = new Set<number>();
  inMST.add(start);
  steps.push({ type: "add-node", nodeId: start });

  while (inMST.size < GRAPH_NODES.length) {
    let bestEdge: GEdge | null = null,
      bestW = Infinity;
    for (const e of GRAPH_EDGES) {
      const a = e.from,
        b = e.to;
      if ((inMST.has(a) && !inMST.has(b)) || (inMST.has(b) && !inMST.has(a))) {
        steps.push({ type: "consider-edge", from: a, to: b });
        if (e.weight < bestW) {
          bestW = e.weight;
          bestEdge = e;
        }
      }
    }
    if (!bestEdge) break;
    const newNode = inMST.has(bestEdge.from) ? bestEdge.to : bestEdge.from;
    steps.push({
      type: "add-edge",
      from: bestEdge.from,
      to: bestEdge.to,
      weight: bestEdge.weight,
    });
    inMST.add(newNode);
    steps.push({ type: "add-node", nodeId: newNode });
  }
  return steps;
}

function PrimViz({ accentColor }: { accentColor: string }) {
  const steps = useMemo(() => generatePrimSteps(0), []);
  const SPEED_MAP: Record<string, number> = { "1x": 700, "2x": 350, "4x": 175 };
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedLabel, setSpeedLabel] = useState<"1x" | "2x" | "4x">("1x");
  const speed = SPEED_MAP[speedLabel];
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [visitedEdges, setVisitedEdges] = useState<Set<string>>(new Set());
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [relaxingEdge, setRelaxingEdge] = useState<{
    from: number;
    to: number;
  } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initState = useCallback(() => {
    setStep(0);
    setPlaying(false);
    setVisitedNodes(new Set());
    setVisitedEdges(new Set());
    setCurrentNode(null);
    setRelaxingEdge(null);
  }, []);

  const applyStep = useCallback(
    (s: number) => {
      if (s >= steps.length) {
        setPlaying(false);
        setCurrentNode(null);
        setRelaxingEdge(null);
        return;
      }
      const op = steps[s];
      setRelaxingEdge(null);
      if (op.type === "add-node") {
        setVisitedNodes((prev) => new Set(prev).add(op.nodeId));
        setCurrentNode(op.nodeId);
      } else if (op.type === "add-edge") {
        const ek = `${Math.min(op.from, op.to)}-${Math.max(op.from, op.to)}`;
        setVisitedEdges((prev) => new Set(prev).add(ek));
      } else if (op.type === "consider-edge") {
        setRelaxingEdge({ from: op.from, to: op.to });
      }
      setStep(s + 1);
    },
    [steps],
  );

  useEffect(() => {
    if (!playing) return;
    if (step >= steps.length) {
      setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => applyStep(step), speed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, step, steps.length, speed, applyStep]);
  const isDone = step >= steps.length && steps.length > 0;
  const handleSkip = () => {
    const vn = new Set<number>(),
      ve = new Set<string>();
    for (const s of steps) {
      if (s.type === "add-node") vn.add(s.nodeId);
      if (s.type === "add-edge")
        ve.add(`${Math.min(s.from, s.to)}-${Math.max(s.from, s.to)}`);
    }
    setVisitedNodes(vn);
    setVisitedEdges(ve);
    setCurrentNode(null);
    setRelaxingEdge(null);
    setStep(steps.length);
    setPlaying(false);
  };

  return (
    <div className="flex h-full">
      <VizSidePanel
        phaseBadge={
          relaxingEdge ? (
            <motion.div
              key="consider"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-amber-500/15 text-amber-300 border border-amber-500/30"
            >
              ↝ Checking Edge
            </motion.div>
          ) : currentNode !== null ? (
            <motion.div
              key="add"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-lime-500/15 text-lime-300 border border-lime-500/30"
            >
              + Adding Node
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase text-center bg-white/3 text-white/25 border border-white/5"
            >
              {isDone ? (
                <>
                  <Check className="inline w-3 h-3 mr-1 mb-0.5" /> MST Complete
                </>
              ) : (
                "Ready"
              )}
            </motion.div>
          )
        }
        playing={playing}
        setPlaying={setPlaying}
        isDone={isDone}
        onSkip={handleSkip}
        onReset={initState}
        speedLabel={speedLabel}
        setSpeedLabel={setSpeedLabel}
        accentColor={accentColor}
        step={step}
        totalSteps={steps.length}
        legend={[
          {
            color: "rgb(132,204,22)",
            border: "rgba(132,204,22,0.5)",
            label: "In MST",
            icon: "●",
          },
          {
            color: "rgb(251,191,36)",
            border: "rgba(251,191,36,0.5)",
            label: "Checking",
            icon: "↝",
          },
          {
            color: "rgba(255,255,255,0.3)",
            border: "rgba(255,255,255,0.1)",
            label: "Not in MST",
            icon: <Circle className="w-2.5 h-2.5" />,
          },
        ]}
      />
      <VizMainArea accentColor={accentColor}>
        <GraphSvg
          visitedNodes={visitedNodes}
          visitedEdges={visitedEdges}
          currentNode={currentNode}
          relaxingEdge={relaxingEdge}
          accentColor={accentColor}
        />
      </VizMainArea>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  KRUSKAL'S ALGORITHM VISUALIZER
 * ═══════════════════════════════════════════════════════ */

type KruskalStep =
  | { type: "consider"; from: number; to: number; weight: number }
  | { type: "accept"; from: number; to: number }
  | { type: "reject"; from: number; to: number };

function generateKruskalSteps(): KruskalStep[] {
  const sorted = [...GRAPH_EDGES].sort((a, b) => a.weight - b.weight);
  const parent = Array.from({ length: GRAPH_NODES.length }, (_, i) => i);
  function find(x: number): number {
    return parent[x] === x ? x : (parent[x] = find(parent[x]));
  }
  function union(a: number, b: number) {
    parent[find(a)] = find(b);
  }
  const steps: KruskalStep[] = [];
  for (const e of sorted) {
    steps.push({ type: "consider", from: e.from, to: e.to, weight: e.weight });
    if (find(e.from) !== find(e.to)) {
      union(e.from, e.to);
      steps.push({ type: "accept", from: e.from, to: e.to });
    } else {
      steps.push({ type: "reject", from: e.from, to: e.to });
    }
  }
  return steps;
}

function KruskalViz({ accentColor }: { accentColor: string }) {
  const steps = useMemo(() => generateKruskalSteps(), []);
  const SPEED_MAP: Record<string, number> = { "1x": 800, "2x": 400, "4x": 200 };
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedLabel, setSpeedLabel] = useState<"1x" | "2x" | "4x">("1x");
  const speed = SPEED_MAP[speedLabel];
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [visitedEdges, setVisitedEdges] = useState<Set<string>>(new Set());
  const [relaxingEdge, setRelaxingEdge] = useState<{
    from: number;
    to: number;
  } | null>(null);
  const [rejected, setRejected] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initState = useCallback(() => {
    setStep(0);
    setPlaying(false);
    setVisitedNodes(new Set());
    setVisitedEdges(new Set());
    setRelaxingEdge(null);
    setRejected(false);
  }, []);

  const applyStep = useCallback(
    (s: number) => {
      if (s >= steps.length) {
        setPlaying(false);
        setRelaxingEdge(null);
        return;
      }
      const op = steps[s];
      setRejected(false);
      if (op.type === "consider") {
        setRelaxingEdge({ from: op.from, to: op.to });
      } else if (op.type === "accept") {
        const ek = `${Math.min(op.from, op.to)}-${Math.max(op.from, op.to)}`;
        setVisitedEdges((prev) => new Set(prev).add(ek));
        setVisitedNodes((prev) => {
          const n = new Set(prev);
          n.add(op.from);
          n.add(op.to);
          return n;
        });
        setRelaxingEdge(null);
      } else if (op.type === "reject") {
        setRejected(true);
        setRelaxingEdge({ from: op.from, to: op.to });
      }
      setStep(s + 1);
    },
    [steps],
  );

  useEffect(() => {
    if (!playing) return;
    if (step >= steps.length) {
      setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => applyStep(step), speed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, step, steps.length, speed, applyStep]);
  const isDone = step >= steps.length && steps.length > 0;
  const handleSkip = () => {
    const vn = new Set<number>(),
      ve = new Set<string>();
    for (const s of steps) {
      if (s.type === "accept") {
        ve.add(`${Math.min(s.from, s.to)}-${Math.max(s.from, s.to)}`);
        vn.add(s.from);
        vn.add(s.to);
      }
    }
    setVisitedNodes(vn);
    setVisitedEdges(ve);
    setRelaxingEdge(null);
    setStep(steps.length);
    setPlaying(false);
  };

  return (
    <div className="flex h-full">
      <VizSidePanel
        phaseBadge={
          rejected ? (
            <motion.div
              key="reject"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-red-500/15 text-red-300 border border-red-500/30"
            >
              ✗ Cycle — Rejected
            </motion.div>
          ) : relaxingEdge ? (
            <motion.div
              key="consider"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-amber-500/15 text-amber-300 border border-amber-500/30"
            >
              ↝ Checking Edge
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase text-center bg-white/3 text-white/25 border border-white/5"
            >
              {isDone ? (
                <>
                  <Check className="inline w-3 h-3 mr-1 mb-0.5" /> MST Complete
                </>
              ) : (
                "Ready"
              )}
            </motion.div>
          )
        }
        playing={playing}
        setPlaying={setPlaying}
        isDone={isDone}
        onSkip={handleSkip}
        onReset={initState}
        speedLabel={speedLabel}
        setSpeedLabel={setSpeedLabel}
        accentColor={accentColor}
        step={step}
        totalSteps={steps.length}
        legend={[
          {
            color: "rgb(249,115,22)",
            border: "rgba(249,115,22,0.5)",
            label: "MST Edge",
            icon: "─",
          },
          {
            color: "rgb(251,191,36)",
            border: "rgba(251,191,36,0.5)",
            label: "Checking",
            icon: "↝",
          },
          {
            color: "rgb(248,113,113)",
            border: "rgba(248,113,113,0.5)",
            label: "Rejected",
            icon: <X className="w-2.5 h-2.5" />,
          },
          {
            color: "rgba(255,255,255,0.3)",
            border: "rgba(255,255,255,0.1)",
            label: "Unused",
            icon: <Circle className="w-2.5 h-2.5" />,
          },
        ]}
      />
      <VizMainArea accentColor={accentColor}>
        <GraphSvg
          visitedNodes={visitedNodes}
          visitedEdges={visitedEdges}
          currentNode={null}
          relaxingEdge={rejected ? null : relaxingEdge}
          accentColor={accentColor}
        />
      </VizMainArea>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  HEAPIFY (MAX & MIN) VISUALIZER
 * ═══════════════════════════════════════════════════════ */

type HeapifyOp =
  | { type: "compare"; i: number; j: number }
  | { type: "swap"; i: number; j: number }
  | { type: "done"; i: number };

function generateHeapifyOps(arr: number[], mode: "max" | "min"): HeapifyOp[] {
  const a = [...arr];
  const ops: HeapifyOp[] = [];
  function heapify(n: number, root: number) {
    let target = root;
    const l = 2 * root + 1,
      r = 2 * root + 2;
    if (l < n) {
      ops.push({ type: "compare", i: target, j: l });
      if (mode === "max" ? a[l] > a[target] : a[l] < a[target]) target = l;
    }
    if (r < n) {
      ops.push({ type: "compare", i: target, j: r });
      if (mode === "max" ? a[r] > a[target] : a[r] < a[target]) target = r;
    }
    if (target !== root) {
      ops.push({ type: "swap", i: root, j: target });
      [a[root], a[target]] = [a[target], a[root]];
      heapify(n, target);
    }
    ops.push({ type: "done", i: root });
  }
  for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) heapify(a.length, i);
  return ops;
}

function HeapifyViz({ accentColor }: { accentColor: string }) {
  const INITIAL = [3, 9, 2, 1, 4, 5, 8, 6, 7, 10];
  const [mode, setMode] = useState<"max" | "min">("max");
  const ops = useMemo(() => generateHeapifyOps(INITIAL, mode), [mode]);
  const SPEED_MAP: Record<string, number> = { "1x": 600, "2x": 300, "4x": 150 };
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedLabel, setSpeedLabel] = useState<"1x" | "2x" | "4x">("1x");
  const speed = SPEED_MAP[speedLabel];
  const [arr, setArr] = useState([...INITIAL]);
  const [highlight, setHighlight] = useState<{
    compare: number[];
    swap: number[];
    done: Set<number>;
  }>({ compare: [], swap: [], done: new Set() });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initState = useCallback(() => {
    setStep(0);
    setPlaying(false);
    setArr([...INITIAL]);
    setHighlight({ compare: [], swap: [], done: new Set() });
  }, []);

  // Reset when mode changes
  useEffect(() => {
    initState();
  }, [mode, initState]);

  const applyStep = useCallback(
    (s: number) => {
      if (s >= ops.length) {
        setPlaying(false);
        setHighlight((h) => ({ ...h, compare: [], swap: [] }));
        return;
      }
      const op = ops[s];
      const h = {
        compare: [] as number[],
        swap: [] as number[],
        done: new Set(highlight.done),
      };
      if (op.type === "compare") {
        h.compare = [op.i, op.j];
      } else if (op.type === "swap") {
        h.swap = [op.i, op.j];
        setArr((prev) => {
          const a = [...prev];
          [a[op.i], a[op.j]] = [a[op.j], a[op.i]];
          return a;
        });
      } else if (op.type === "done") {
        h.done.add(op.i);
      }
      setHighlight(h);
      setStep(s + 1);
    },
    [ops, highlight.done],
  );

  useEffect(() => {
    if (!playing) return;
    if (step >= ops.length) {
      setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => applyStep(step), speed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, step, ops.length, speed, applyStep]);
  const isDone = step >= ops.length && ops.length > 0;
  const handleSkip = () => {
    // Compute final heapified array
    const a = [...INITIAL];
    for (const op of ops) {
      if (op.type === "swap") {
        [a[op.i], a[op.j]] = [a[op.j], a[op.i]];
      }
    }
    setArr(a);
    setStep(ops.length);
    setPlaying(false);
    setHighlight({
      compare: [],
      swap: [],
      done: new Set(Array.from({ length: INITIAL.length }, (_, i) => i)),
    });
  };

  const POS: { x: number; y: number }[] = [
    { x: 400, y: 60 },
    { x: 220, y: 150 },
    { x: 580, y: 150 },
    { x: 130, y: 240 },
    { x: 310, y: 240 },
    { x: 490, y: 240 },
    { x: 670, y: 240 },
    { x: 85, y: 330 },
    { x: 175, y: 330 },
    { x: 265, y: 330 },
  ];

  return (
    <div className="flex h-full">
      <VizSidePanel
        phaseBadge={
          highlight.swap.length > 0 ? (
            <motion.div
              key="swap"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30"
            >
              ⇄ Swapping
            </motion.div>
          ) : highlight.compare.length > 0 ? (
            <motion.div
              key="cmp"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-sky-500/15 text-sky-300 border border-sky-500/30"
            >
              ? Comparing
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase text-center bg-white/3 text-white/25 border border-white/5"
            >
              {isDone
                ? `<><Check className="inline w-3 h-3 mr-1 mb-0.5"/> ${mode === "max" ? "Max" : "Min"}-Heap Built</>`
                : "Ready"}
            </motion.div>
          )
        }
        playing={playing}
        setPlaying={setPlaying}
        isDone={isDone}
        onSkip={handleSkip}
        onReset={initState}
        speedLabel={speedLabel}
        setSpeedLabel={setSpeedLabel}
        accentColor={accentColor}
        step={step}
        totalSteps={ops.length}
        legend={[
          {
            color: "rgb(232,121,249)",
            border: "rgba(192,38,211,0.5)",
            label: "Swapping",
            icon: <RefreshCw className="w-2.5 h-2.5" />,
          },
          {
            color: "rgb(125,211,252)",
            border: "rgba(14,165,233,0.5)",
            label: "Comparing",
            icon: <HelpCircle className="w-2.5 h-2.5" />,
          },
          {
            color: "rgb(134,239,172)",
            border: "rgba(134,239,172,0.5)",
            label: "Heapified",
            icon: <Check className="w-2.5 h-2.5" />,
          },
          {
            color: "rgba(255,255,255,0.4)",
            border: "rgba(255,255,255,0.15)",
            label: "Pending",
            icon: <Circle className="w-2.5 h-2.5" />,
          },
        ]}
      >
        {/* Mode toggle */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-1">
            Heap Type
          </span>
          <div className="flex gap-1.5">
            {(["max", "min"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  mode === m
                    ? "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40"
                    : "bg-white/3 text-white/35 border-white/7 hover:bg-white/5"
                }`}
              >
                {m === "max" ? "Max" : "Min"}
              </button>
            ))}
          </div>
        </div>
      </VizSidePanel>
      <VizMainArea accentColor={accentColor}>
        <svg width={800} height={400} viewBox="0 0 800 400">
          <defs>
            <filter id="hf-glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="hf-shadow">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="3"
                floodColor="rgba(0,0,0,0.4)"
              />
            </filter>
          </defs>
          {arr.map((_, i) => {
            const children = [2 * i + 1, 2 * i + 2].filter(
              (c) => c < arr.length,
            );
            return children.map((c) => {
              const p = POS[i],
                ch = POS[c];
              const bothDone = highlight.done.has(i) && highlight.done.has(c);
              const my = (p.y + 22 + ch.y - 2) / 2;
              return (
                <path
                  key={`hfe-${i}-${c}`}
                  d={`M ${p.x} ${p.y + 22} C ${p.x} ${my}, ${ch.x} ${my}, ${ch.x} ${ch.y - 2}`}
                  fill="none"
                  stroke={
                    bothDone
                      ? "rgba(134,239,172,0.3)"
                      : "rgba(255,255,255,0.08)"
                  }
                  strokeWidth={bothDone ? 2 : 1.5}
                  strokeDasharray={bothDone ? "none" : "6 5"}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              );
            });
          })}
          {arr.map((val, i) => {
            const pos = POS[i];
            const isSwap = highlight.swap.includes(i),
              isCmp = highlight.compare.includes(i),
              isDoneN = highlight.done.has(i);
            let fill = "rgba(255,255,255,0.04)",
              stroke = "rgba(255,255,255,0.1)",
              text = "rgba(255,255,255,0.5)";
            if (isDoneN) {
              fill = "rgba(134,239,172,0.12)";
              stroke = "rgba(134,239,172,0.35)";
              text = "rgb(134,239,172)";
            }
            if (isCmp) {
              fill = "rgba(14,165,233,0.15)";
              stroke = "rgba(14,165,233,0.5)";
              text = "rgb(125,211,252)";
            }
            if (isSwap) {
              fill = "rgba(192,38,211,0.2)";
              stroke = "rgba(192,38,211,0.6)";
              text = "rgb(232,121,249)";
            }
            return (
              <g key={`hfn-${i}`}>
                {(isSwap || isCmp) && (
                  <circle
                    cx={pos.x}
                    cy={pos.y + 10}
                    r={28}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={1.5}
                  >
                    <animate
                      attributeName="opacity"
                      values="0.2;0.6;0.2"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                <circle
                  cx={pos.x}
                  cy={pos.y + 10}
                  r={22}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={2}
                  filter={isSwap || isCmp ? "url(#hf-glow)" : "url(#hf-shadow)"}
                  className="transition-all duration-400"
                />
                <text
                  x={pos.x}
                  y={pos.y + 15.5}
                  textAnchor="middle"
                  fill={text}
                  fontSize={15}
                  fontWeight="800"
                  fontFamily="monospace"
                  className="select-none"
                >
                  {val}
                </text>
              </g>
            );
          })}
        </svg>
      </VizMainArea>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  KADANE'S ALGORITHM VISUALIZER
 * ═══════════════════════════════════════════════════════ */

type KadaneStep = {
  idx: number;
  currentSum: number;
  maxSum: number;
  start: number;
  end: number;
  bestStart: number;
  bestEnd: number;
  reset: boolean;
};

function generateKadaneSteps(arr: number[]): KadaneStep[] {
  const steps: KadaneStep[] = [];
  let currentSum = 0,
    maxSum = -Infinity,
    start = 0,
    bestStart = 0,
    bestEnd = 0;
  for (let i = 0; i < arr.length; i++) {
    const willReset = currentSum + arr[i] < arr[i];
    if (willReset) {
      currentSum = arr[i];
      start = i;
    } else {
      currentSum += arr[i];
    }
    let end = i;
    if (currentSum > maxSum) {
      maxSum = currentSum;
      bestStart = start;
      bestEnd = end;
    }
    steps.push({
      idx: i,
      currentSum,
      maxSum,
      start,
      end,
      bestStart,
      bestEnd,
      reset: willReset,
    });
  }
  return steps;
}

function KadaneViz({ accentColor }: { accentColor: string }) {
  const ARR = [-2, 1, -3, 4, -1, 2, 1, -5, 4, 3];
  const kadaneSteps = useMemo(() => generateKadaneSteps(ARR), []);
  const SPEED_MAP: Record<string, number> = { "1x": 800, "2x": 400, "4x": 200 };
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedLabel, setSpeedLabel] = useState<"1x" | "2x" | "4x">("1x");
  const speed = SPEED_MAP[speedLabel];
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initState = useCallback(() => {
    setStep(0);
    setPlaying(false);
  }, []);
  const isDone = step >= kadaneSteps.length;
  const currentStep = step > 0 ? kadaneSteps[step - 1] : null;

  useEffect(() => {
    if (!playing || isDone) {
      if (isDone) setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => setStep((s) => s + 1), speed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, step, isDone, speed]);

  const handleSkip = () => {
    setStep(kadaneSteps.length);
    setPlaying(false);
  };

  const cs = currentStep;
  const maxSumDisplay = cs ? cs.maxSum : 0;

  return (
    <div className="flex h-full">
      <VizSidePanel
        phaseBadge={
          cs?.reset ? (
            <motion.div
              key="reset"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-amber-500/15 text-amber-300 border border-amber-500/30"
            >
              ↻ Reset subarray
            </motion.div>
          ) : step > 0 ? (
            <motion.div
              key="extend"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-center bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
            >
              → Extending
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase text-center bg-white/3 text-white/25 border border-white/5"
            >
              {isDone ? (
                <>
                  <Check className="inline w-3 h-3 mr-1 mb-0.5" /> Complete
                </>
              ) : (
                "Ready"
              )}
            </motion.div>
          )
        }
        playing={playing}
        setPlaying={setPlaying}
        isDone={isDone}
        onSkip={handleSkip}
        onReset={initState}
        speedLabel={speedLabel}
        setSpeedLabel={setSpeedLabel}
        accentColor={accentColor}
        step={step}
        totalSteps={kadaneSteps.length}
        legend={[
          {
            color: "rgb(129,140,248)",
            border: "rgba(99,102,241,0.5)",
            label: "Current sub",
            icon: "─",
          },
          {
            color: "rgb(134,239,172)",
            border: "rgba(134,239,172,0.5)",
            label: "Best sub",
            icon: <Star className="w-2.5 h-2.5" />,
          },
          {
            color: "rgb(251,191,36)",
            border: "rgba(251,191,36,0.5)",
            label: "Scanning",
            icon: <ChevronRight className="w-2.5 h-2.5" />,
          },
          {
            color: "rgba(255,255,255,0.3)",
            border: "rgba(255,255,255,0.1)",
            label: "Unvisited",
            icon: <Circle className="w-2.5 h-2.5" />,
          },
        ]}
      >
        <div className="flex flex-col gap-3 px-1">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">
              Current Sum
            </span>
            <span className="text-xl font-black font-mono text-indigo-300">
              {cs ? cs.currentSum : 0}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">
              Max Sum
            </span>
            <span className="text-xl font-black font-mono text-emerald-300">
              {maxSumDisplay}
            </span>
          </div>
        </div>
      </VizSidePanel>
      <VizMainArea accentColor={accentColor}>
        <div className="flex flex-col items-center gap-6 px-12 py-10">
          {/* Best subarray bracket */}
          {cs && (
            <div
              className="flex items-end h-6"
              style={{ width: `${ARR.length * 76}px` }}
            >
              <div
                style={{
                  marginLeft: `${cs.bestStart * 76 + 4}px`,
                  width: `${(cs.bestEnd - cs.bestStart) * 76 + 68}px`,
                }}
                className="h-1.5 rounded-full bg-emerald-500/30 border border-emerald-500/40"
              />
            </div>
          )}
          {!cs && <div className="h-6" />}
          {/* Array boxes */}
          <div className="flex items-center gap-2">
            {ARR.map((val, i) => {
              const isScanned = cs && i <= cs.idx;
              const isCurrent = cs && i === cs.idx;
              const inCurrentSub = cs && i >= cs.start && i <= cs.idx;
              const inBestSub = cs && i >= cs.bestStart && i <= cs.bestEnd;

              let border = "rgba(255,255,255,0.08)";
              let bg = "rgba(255,255,255,0.02)";
              let text = "rgba(255,255,255,0.25)";
              let shadow = "none";

              if (isScanned && !inCurrentSub && !inBestSub) {
                border = "rgba(255,255,255,0.06)";
                text = "rgba(255,255,255,0.2)";
              }
              if (inBestSub) {
                border = "rgba(134,239,172,0.4)";
                bg = "rgba(134,239,172,0.08)";
                text = "rgb(134,239,172)";
              }
              if (inCurrentSub) {
                border = "rgba(99,102,241,0.5)";
                bg = "rgba(99,102,241,0.1)";
                text = "rgb(129,140,248)";
              }
              if (isCurrent) {
                border = "rgba(251,191,36,0.6)";
                bg = "rgba(251,191,36,0.12)";
                text = "rgb(251,191,36)";
                shadow = "0 0 20px rgba(251,191,36,0.3)";
              }

              return (
                <motion.div
                  key={i}
                  layout
                  animate={{ scale: isCurrent ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-16 h-16 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                  style={{
                    borderColor: border,
                    backgroundColor: bg,
                    boxShadow: shadow,
                  }}
                >
                  <span
                    className="text-lg font-black tabular-nums font-mono"
                    style={{ color: text }}
                  >
                    {val}
                  </span>
                </motion.div>
              );
            })}
          </div>
          {/* Index labels */}
          <div className="flex items-center gap-2">
            {ARR.map((_, i) => (
              <div
                key={i}
                className="w-16 text-center text-[10px] text-white/15 font-mono"
              >
                [{i}]
              </div>
            ))}
          </div>
        </div>
      </VizMainArea>
    </div>
  );
}
