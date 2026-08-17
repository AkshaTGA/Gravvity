"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play } from "lucide-react"

/* ═══════════════════════════════════════════════════════
 *  TYPES — mirrors AlgoInfo from cp-algo-visualizer
 * ═══════════════════════════════════════════════════════ */

export interface AlgoCardInfo {
  id: string
  name: string
  category: string
  description: string
  complexity: string
  icon: React.ReactNode
  gradient: string
  glow: string
  border: string
  accent: string
}

/* ═══════════════════════════════════════════════════════
 *  PSEUDOCODE SNIPPETS
 * ═══════════════════════════════════════════════════════ */

const ALGO_PSEUDOCODE: Record<string, string> = {
  bubble:
    "for i → 0 to n-1:\n  for j → 0 to n-i-2:\n    if arr[j] > arr[j+1]:\n      swap(arr[j], arr[j+1])",
  merge:
    "merge_sort(arr, lo, hi):\n  mid = (lo + hi) / 2\n  merge_sort(arr, lo, mid)\n  merge_sort(arr, mid+1, hi)\n  merge(arr, lo, mid, hi)",
  quick:
    "quick_sort(arr, lo, hi):\n  pivot = partition(arr, lo, hi)\n  quick_sort(arr, lo, pivot-1)\n  quick_sort(arr, pivot+1, hi)",
  heap:
    "heap_sort(arr):\n  build_max_heap(arr)\n  for i → n-1 to 1:\n    swap(arr[0], arr[i])\n    heapify(arr, 0, i)",
  bfs:
    "bfs(root):\n  queue ← [root]\n  while queue:\n    node = dequeue()\n    visit(node)\n    enqueue(children)",
  dfs:
    "dfs(root):\n  stack ← [root]\n  while stack:\n    node = pop()\n    visit(node)\n    push(children)",
  "binary-search":
    "search(arr, target):\n  lo, hi = 0, n-1\n  while lo ≤ hi:\n    mid = (lo+hi)/2\n    if arr[mid] == target: found\n    elif < target: lo=mid+1\n    else: hi=mid-1",
  dijkstra:
    "dijkstra(G, src):\n  dist[src] = 0\n  pq = [(0, src)]\n  while pq:\n    d, u = pop_min()\n    for v, w in adj[u]:\n      relax(u, v, w)",
  prim:
    "prim(G):\n  mst = {0}, pq = edges(0)\n  while |mst| < V:\n    u,v,w = pop_min()\n    if v ∉ mst:\n      mst.add(v)",
  kruskal:
    "kruskal(G):\n  sort edges by weight\n  for (u,v,w) in edges:\n    if find(u) ≠ find(v):\n      union(u, v)\n      mst.add(u,v,w)",
  heapify:
    "heapify(arr, i, n):\n  largest = i\n  l, r = 2i+1, 2i+2\n  if arr[l] > arr[largest]:\n    largest = l\n  if arr[r] > arr[largest]:\n    largest = r\n  if largest ≠ i:\n    swap & recurse",
  kadane:
    "kadane(arr):\n  max_sum = curr = arr[0]\n  for i → 1 to n-1:\n    curr = max(arr[i], curr+arr[i])\n    max_sum = max(max_sum, curr)\n  return max_sum",
}

/* ═══════════════════════════════════════════════════════
 *  ANIMATED PREVIEW — dispatches per category
 * ═══════════════════════════════════════════════════════ */

function AnimatedPreview({ algo, isHovered }: { algo: AlgoCardInfo; isHovered: boolean }) {
  if (algo.category === "sorting")
    return <LiveSortBars variant={algo.id} glow={algo.glow} isHovered={isHovered} />
  if (algo.category === "traversal")
    return <LiveTreeTraversal variant={algo.id as "bfs" | "dfs"} glow={algo.glow} isHovered={isHovered} />
  if (algo.id === "binary-search")
    return <LiveBinarySearch glow={algo.glow} isHovered={isHovered} />
  if (["dijkstra", "prim", "kruskal"].includes(algo.id))
    return <LiveGraphPreview glow={algo.glow} isHovered={isHovered} />
  if (algo.id === "heapify")
    return <LiveHeapTree glow={algo.glow} isHovered={isHovered} />
  if (algo.id === "kadane")
    return <LiveKadane glow={algo.glow} isHovered={isHovered} />
  return <div className="h-14" />
}

/* ─── Sorting Bars — animate on hover ─── */

function LiveSortBars({ variant, glow, isHovered }: { variant: string; glow: string; isHovered: boolean }) {
  const initialBars: Record<string, number[]> = {
    bubble: [6, 2, 8, 4, 1, 7, 3, 5, 9],
    merge: [5, 3, 7, 1, 6, 2, 8, 4, 9],
    quick: [4, 7, 2, 9, 1, 5, 8, 3, 6],
    heap: [3, 8, 1, 6, 4, 7, 2, 5, 9],
  }
  const startBars = initialBars[variant] || initialBars.bubble
  const [bars, setBars] = useState(startBars)
  const [activeIdx, setActiveIdx] = useState<number[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setBars([...startBars])
      setActiveIdx([])
      return
    }
    // Generate bubble-sort ops
    const ops: { compare: [number, number]; swap?: [number, number] }[] = []
    const a = [...startBars]
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        if (a[j] > a[j + 1]) {
          ops.push({ compare: [j, j + 1], swap: [j, j + 1] })
          ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        } else {
          ops.push({ compare: [j, j + 1] })
        }
      }
    }
    let step = 0
    const workArr = [...startBars]
    setBars([...workArr])

    intervalRef.current = setInterval(() => {
      if (step >= ops.length) {
        setActiveIdx([])
        step++
        setTimeout(() => {
          for (let k = 0; k < startBars.length; k++) workArr[k] = startBars[k]
          setBars([...workArr])
          step = 0
        }, 700)
        return
      }
      const op = ops[step]
      setActiveIdx([op.compare[0], op.compare[1]])
      if (op.swap) {
        const [i, j] = op.swap
        ;[workArr[i], workArr[j]] = [workArr[j], workArr[i]]
        setBars([...workArr])
      }
      step++
    }, 90)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered])

  return (
    <div className="flex items-end justify-center gap-[3px] h-14">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-2.5 rounded-t-sm"
          style={{
            height: `${(h / 10) * 100}%`,
            backgroundColor: activeIdx.includes(i) ? glow : "rgba(255,255,255,0.08)",
            boxShadow: activeIdx.includes(i) ? `0 0 10px ${glow}, 0 0 3px ${glow}` : "none",
            transition: "height 0.08s ease, background-color 0.12s, box-shadow 0.12s",
          }}
        />
      ))}
    </div>
  )
}

/* ─── Tree Traversal ─── */

function LiveTreeTraversal({ variant, glow, isHovered }: { variant: "bfs" | "dfs"; glow: string; isHovered: boolean }) {
  const [visited, setVisited] = useState<number[]>([])
  const [current, setCurrent] = useState(-1)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const nodes = [
    { x: 28, y: 6 }, { x: 14, y: 18 }, { x: 42, y: 18 },
    { x: 7, y: 30 }, { x: 21, y: 30 }, { x: 35, y: 30 }, { x: 49, y: 30 },
  ]
  const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]]
  const order = variant === "bfs" ? [0, 1, 2, 3, 4, 5, 6] : [0, 1, 3, 4, 2, 5, 6]

  useEffect(() => {
    if (!isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setVisited([])
      setCurrent(-1)
      return
    }
    let step = 0
    setVisited([])
    setCurrent(-1)

    intervalRef.current = setInterval(() => {
      if (step >= order.length) {
        setCurrent(-1)
        step++
        setTimeout(() => {
          setVisited([])
          step = 0
        }, 600)
        return
      }
      const node = order[step]
      setCurrent(node)
      setVisited((prev) => [...prev, node])
      step++
    }, 380)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, variant])

  return (
    <svg viewBox="0 0 56 38" className="w-full h-14">
      {edges.map(([f, t]) => (
        <line
          key={`${f}-${t}`}
          x1={nodes[f].x} y1={nodes[f].y} x2={nodes[t].x} y2={nodes[t].y}
          stroke={visited.includes(f) && visited.includes(t) ? glow : "rgba(255,255,255,0.05)"}
          strokeWidth={visited.includes(f) && visited.includes(t) ? 1.5 : 0.6}
          style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          {current === i && (
            <circle cx={n.x} cy={n.y} r={5} fill="transparent" stroke={glow} strokeWidth={0.6} opacity={0.5}>
              <animate attributeName="r" from="3.5" to="8" dur="0.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" repeatCount="indefinite" />
            </circle>
          )}
          <circle
            cx={n.x} cy={n.y} r={3.5}
            fill={current === i || visited.includes(i) ? glow : "rgba(255,255,255,0.06)"}
            opacity={current === i ? 1 : visited.includes(i) ? 0.5 : 0.3}
            style={{ transition: "fill 0.3s, opacity 0.3s" }}
          />
        </g>
      ))}
    </svg>
  )
}

/* ─── Graph Preview ─── */

function LiveGraphPreview({ glow, isHovered }: { glow: string; isHovered: boolean }) {
  const [activeEdges, setActiveEdges] = useState<number[]>([])
  const [activeNodes, setActiveNodes] = useState<number[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const nodes = [{ x: 8, y: 8 }, { x: 28, y: 4 }, { x: 48, y: 8 }, { x: 18, y: 24 }, { x: 38, y: 24 }]
  const edges: [number, number][] = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [3, 4]]

  useEffect(() => {
    if (!isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setActiveEdges([])
      setActiveNodes([])
      return
    }
    let step = 0
    setActiveEdges([])
    setActiveNodes([0])

    intervalRef.current = setInterval(() => {
      if (step >= edges.length) {
        step++
        setTimeout(() => {
          setActiveEdges([])
          setActiveNodes([])
          step = 0
        }, 600)
        return
      }
      setActiveEdges((prev) => [...prev, step])
      const [f, t] = edges[step]
      setActiveNodes((prev) => [...new Set([...prev, f, t])])
      step++
    }, 320)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered])

  return (
    <svg viewBox="0 0 56 30" className="w-full h-14">
      {edges.map(([f, t], i) => (
        <line
          key={i}
          x1={nodes[f].x} y1={nodes[f].y} x2={nodes[t].x} y2={nodes[t].y}
          stroke={activeEdges.includes(i) ? glow : "rgba(255,255,255,0.05)"}
          strokeWidth={activeEdges.includes(i) ? 1.5 : 0.6}
          style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          {activeNodes.includes(i) && (
            <circle cx={n.x} cy={n.y} r={5.5} fill="transparent" stroke={glow} strokeWidth={0.4} opacity={0.3}>
              <animate attributeName="r" from="4" to="7" dur="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur="1s" repeatCount="indefinite" />
            </circle>
          )}
          <circle
            cx={n.x} cy={n.y} r={3.5}
            fill={activeNodes.includes(i) ? glow : "rgba(255,255,255,0.06)"}
            opacity={activeNodes.includes(i) ? 1 : 0.3}
            style={{ transition: "fill 0.3s, opacity 0.3s" }}
          />
        </g>
      ))}
    </svg>
  )
}

/* ─── Binary Search ─── */

function LiveBinarySearch({ glow, isHovered }: { glow: string; isHovered: boolean }) {
  const vals = [2, 5, 8, 12, 16, 23, 38, 56]
  const [lo, setLo] = useState(0)
  const [hi, setHi] = useState(7)
  const [mid, setMid] = useState(3)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const steps = [
    { lo: 0, hi: 7, mid: 3 },
    { lo: 4, hi: 7, mid: 5 },
  ]

  useEffect(() => {
    if (!isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setLo(0)
      setHi(7)
      setMid(3)
      return
    }
    let step = 0
    intervalRef.current = setInterval(() => {
      if (step >= steps.length) {
        step++
        setTimeout(() => {
          setLo(0)
          setHi(7)
          setMid(3)
          step = 0
        }, 700)
        return
      }
      setLo(steps[step].lo)
      setHi(steps[step].hi)
      setMid(steps[step].mid)
      step++
    }, 650)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered])

  return (
    <div className="flex items-center justify-center gap-[3px] h-14">
      {vals.map((v, i) => (
        <div
          key={i}
          className={`w-6 h-7 rounded-sm flex items-center justify-center text-[8px] font-bold font-mono border transition-all duration-300 ${
            i === mid ? "scale-110" : ""
          }`}
          style={{
            borderColor: i === mid ? glow : i >= lo && i <= hi ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.03)",
            backgroundColor: i === mid ? `${glow}33` : i >= lo && i <= hi ? "rgba(255,255,255,0.03)" : "transparent",
            color: i === mid ? glow : i >= lo && i <= hi ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.12)",
            boxShadow: i === mid ? `0 0 12px ${glow}44` : "none",
          }}
        >
          {v}
        </div>
      ))}
    </div>
  )
}

/* ─── Heapify Tree ─── */

function LiveHeapTree({ glow, isHovered }: { glow: string; isHovered: boolean }) {
  const nodes = [
    { x: 28, y: 6 }, { x: 14, y: 16 }, { x: 42, y: 16 },
    { x: 7, y: 28 }, { x: 21, y: 28 }, { x: 35, y: 28 }, { x: 49, y: 28 },
  ]
  const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]]
  const [activeNode, setActiveNode] = useState(-1)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setActiveNode(-1)
      return
    }
    const order = [5, 6, 2, 3, 4, 1, 0]
    let step = 0

    intervalRef.current = setInterval(() => {
      if (step >= order.length) {
        step++
        setTimeout(() => {
          setActiveNode(-1)
          step = 0
        }, 500)
        return
      }
      setActiveNode(order[step])
      step++
    }, 280)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered])

  return (
    <svg viewBox="0 0 56 36" className="w-full h-14">
      {edges.map(([f, t]) => (
        <line
          key={`${f}-${t}`}
          x1={nodes[f].x} y1={nodes[f].y} x2={nodes[t].x} y2={nodes[t].y}
          stroke="rgba(255,255,255,0.05)" strokeWidth={0.6}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          {activeNode === i && (
            <circle cx={n.x} cy={n.y} r={5} fill="transparent" stroke={glow} strokeWidth={0.5}>
              <animate attributeName="r" from="3.5" to="7" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.5" to="0" dur="0.6s" repeatCount="indefinite" />
            </circle>
          )}
          <circle
            cx={n.x} cy={n.y} r={3.5}
            fill={activeNode === i ? glow : "rgba(255,255,255,0.06)"}
            opacity={activeNode === i ? 1 : 0.3}
            style={{ transition: "fill 0.2s" }}
          />
        </g>
      ))}
    </svg>
  )
}

/* ─── Kadane's DP ─── */

function LiveKadane({ glow, isHovered }: { glow: string; isHovered: boolean }) {
  const vals = [-2, 1, -3, 4, -1, 2, 1, -5]
  const maxRange: [number, number] = [3, 6]
  const [scanIdx, setScanIdx] = useState(-1)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setScanIdx(-1)
      return
    }
    let idx = 0
    intervalRef.current = setInterval(() => {
      if (idx >= vals.length) {
        idx++
        setTimeout(() => {
          setScanIdx(-1)
          idx = 0
        }, 500)
        return
      }
      setScanIdx(idx)
      idx++
    }, 300)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered])

  return (
    <div className="flex items-center justify-center gap-[3px] h-14">
      {vals.map((v, i) => (
        <div
          key={i}
          className="w-6 h-7 rounded-sm flex items-center justify-center text-[8px] font-bold font-mono border transition-all duration-300"
          style={{
            borderColor:
              i === scanIdx
                ? glow
                : i >= maxRange[0] && i <= maxRange[1]
                  ? `${glow}66`
                  : "rgba(255,255,255,0.03)",
            backgroundColor:
              i === scanIdx
                ? `${glow}33`
                : i >= maxRange[0] && i <= maxRange[1]
                  ? `${glow}11`
                  : "transparent",
            color: i >= maxRange[0] && i <= maxRange[1] ? glow : "rgba(255,255,255,0.15)",
            boxShadow: i === scanIdx ? `0 0 10px ${glow}44` : "none",
          }}
        >
          {v}
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
 *  HOLOGRAPHIC ALGO CARD
 *  3D tilt • spinning border • scanline • live preview
 *  holographic shimmer • terminal code • neon glow
 * ═══════════════════════════════════════════════════════ */

interface HolographicAlgoCardProps {
  algo: AlgoCardInfo
  index: number
  onClick: () => void
}

export function HolographicAlgoCard({ algo, index, onClick }: HolographicAlgoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const pseudocode = ALGO_PSEUDOCODE[algo.id]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, y: 10 }}
      transition={{
        delay: Math.min(0.06 + index * 0.05, 0.6),
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        className={`relative cursor-pointer transition-transform duration-300 ${isHovered ? "scale-[1.02]" : "scale-100"}`}
      >
        {/* ── Card body ── */}
        <div
          className={`relative z-10 rounded-2xl border ${algo.border} overflow-hidden`}
          style={{
            backgroundColor: "rgba(7,7,26,0.93)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Background gradient wash */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${algo.gradient} opacity-50 pointer-events-none`}
          />

          {/* Grid dot pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.5) 0.5px, transparent 0.5px)",
              backgroundSize: "24px 24px",
              opacity: 0.02,
            }}
          />

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none algo-scanline"
            style={{
              opacity: isHovered ? 0.04 : 0.012,
              transition: "opacity 0.3s",
            }}
          />

          {/* Holographic shimmer follows mouse */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
            style={{
              background: `radial-gradient(
                ellipse at 50% 50%,
                rgba(255,255,255,0.15) 0%,
                rgba(167,139,250,0.08) 25%,
                rgba(6,182,212,0.06) 45%,
                transparent 70%
              )`,
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Corner accent glows */}
          <div
            className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
            style={{ background: algo.glow, opacity: isHovered ? 0.2 : 0.04 }}
          />
          <div
            className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
            style={{ background: algo.glow, opacity: isHovered ? 0.1 : 0 }}
          />

          {/* ── Content ── */}
          <div className="relative z-20 p-5 sm:p-6">
            {/* Top: Icon + Status + Complexity */}
            <div className="flex items-start justify-between mb-4">
              <div
                className={`relative p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] ${algo.accent} transition-all duration-300`}
                style={{
                  boxShadow: isHovered ? `0 0 20px ${algo.glow}33` : "none",
                }}
              >
                {algo.icon}
                {/* Ping animation on hover */}
                {isHovered && (
                  <span
                    className="absolute inset-0 rounded-xl animate-ping pointer-events-none"
                    style={{
                      border: `1.5px solid ${algo.glow}`,
                      opacity: 0.15,
                    }}
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 algo-status-blink" />
                  <span className="text-[9px] font-mono font-bold text-emerald-400/90 uppercase tracking-wider">
                    Ready
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/40">
                  {algo.complexity}
                </span>
              </div>
            </div>

            {/* Animated Mini Visualization */}
            <div
              className="mb-4 rounded-xl bg-black/30 border border-white/[0.04] p-3 overflow-hidden"
              style={{
                boxShadow: isHovered ? `inset 0 0 30px ${algo.glow}08` : "none",
                transition: "box-shadow 0.3s",
              }}
            >
              <AnimatedPreview algo={algo} isHovered={isHovered} />
            </div>

            {/* Name & Description */}
            <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{algo.name}</h3>
            <p className="text-white/28 text-[13px] leading-relaxed line-clamp-2 mb-3">
              {algo.description}
            </p>

            {/* Terminal Code Snippet — expands on hover */}
            <AnimatePresence>
              {isHovered && pseudocode && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="mb-3 overflow-hidden"
                >
                  <div className="rounded-lg bg-[#08081a] border border-white/10 overflow-hidden" style={{ boxShadow: `0 0 20px ${algo.glow}15, inset 0 0 30px rgba(0,0,0,0.4)` }}>
                    {/* Mac-style terminal header */}
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.03] border-b border-white/[0.06]">
                      <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                      <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                      <span className="text-[9px] font-mono text-white/30 ml-2">
                        pseudocode.py
                      </span>
                    </div>
                    <pre
                      className="p-3.5 text-[11.5px] font-mono leading-[1.8] overflow-hidden"
                    >
                      <code className="text-purple-200" style={{ opacity: 1, textShadow: '0 0 6px rgba(216,180,254,0.3)' }}>{pseudocode}</code>
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA row */}
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center gap-2 ${algo.accent} text-sm font-semibold transition-all duration-300 ${
                  isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Visualize</span>
              </div>
              <div
                className={`text-[10px] font-mono text-white/15 transition-all duration-300 ${
                  isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"
                }`}
              >
                click →
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
