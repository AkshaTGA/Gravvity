"use client"

import { useEffect, useMemo, useRef, useState, useCallback } from "react"
import { useMembers } from "@/hooks/use-members"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import type { Member } from "@/lib/types"
import {
  buildMemberTree,
  generateBFSSteps,
  generateDFSSteps,
  flattenTree,
  getEdges,
  calculateLayout,
  NODE_W,
  NODE_H,
  TREE_PAD,
  type TreeNode,
  type TraversalStep,
  type TraversalAlgorithm,
} from "@/lib/cp-traversal"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Crown,
  Shield,
  Star,
  User,
  Zap,
  GitBranch,
  Layers,
  Eye,
  ArrowDownToLine,
  ArrowUpFromLine,
  Check,
} from "lucide-react"

/* ═══════════════ Helpers ═══════════════ */

function isCP(member: Member): boolean {
  return member.wing?.trim().toLowerCase() === "competitive coding"
}

function normalizeSrc(src?: string): string {
  if (!src) return "/gravity-logo.png"
  if (src.startsWith("./public/")) return src.replace("./public/", "/")
  return src
}

function getRoleIcon(member: Member) {
  if (member.isFacultyCoordinator) return <Crown className="w-3 h-3" />
  if (member.isOverallCoordinator) return <Shield className="w-3 h-3" />
  if (member.role === "coordinator") return <Star className="w-3 h-3" />
  return <User className="w-3 h-3" />
}

function getRoleLabel(member: Member): string {
  if (member.isFacultyCoordinator) return "Faculty"
  if (member.isOverallCoordinator) return "Overall Coord"
  if (member.role === "coordinator") return "Coordinator"
  return "Member"
}

/* ═══════════════ Node visual state ═══════════════ */

type NodeState = "idle" | "current" | "queued" | "stacked" | "visited"

function getNodeState(
  nodeId: string,
  step: TraversalStep | null,
  algo: TraversalAlgorithm,
): NodeState {
  if (!step) return "idle"
  if (step.type === "complete")
    return step.visitedState.includes(nodeId) ? "visited" : "idle"

  const isTarget = step.nodeId === nodeId
  if (
    (step.type === "visit" || step.type === "dequeue" || step.type === "pop") &&
    isTarget
  )
    return "current"

  if (step.visitedState.includes(nodeId)) return "visited"
  if (step.structureState.includes(nodeId))
    return algo === "bfs" ? "queued" : "stacked"

  return "idle"
}

const nodeVisuals: Record<
  NodeState,
  { border: string; bg: string; glow: string; ring: string }
> = {
  idle: {
    border: "border-white/8",
    bg: "bg-white/[0.03]",
    glow: "",
    ring: "ring-white/10",
  },
  current: {
    border: "border-cyan-400/80",
    bg: "bg-cyan-500/[0.15]",
    glow: "shadow-[0_0_40px_rgba(34,211,238,0.5),inset_0_0_20px_rgba(34,211,238,0.1)]",
    ring: "ring-cyan-400/60",
  },
  queued: {
    border: "border-blue-400/60",
    bg: "bg-blue-500/[0.08]",
    glow: "shadow-[0_0_25px_rgba(59,130,246,0.3)]",
    ring: "ring-blue-400/40",
  },
  stacked: {
    border: "border-orange-400/60",
    bg: "bg-orange-500/[0.08]",
    glow: "shadow-[0_0_25px_rgba(249,115,22,0.3)]",
    ring: "ring-orange-400/40",
  },
  visited: {
    border: "border-emerald-400/50",
    bg: "bg-emerald-500/[0.06]",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    ring: "ring-emerald-400/30",
  },
}

/* ═══════════════ Pseudocode data ═══════════════ */

const bfsPseudo = [
  "function BFS(root):",
  "  queue ← [root]",
  "  while queue is not empty:",
  "    node ← queue.dequeue()",
  "    visit(node)",
  "    for each child of node:",
  "      queue.enqueue(child)",
]

const dfsPseudo = [
  "function DFS(root):",
  "  stack ← [root]",
  "  while stack is not empty:",
  "    node ← stack.pop()",
  "    visit(node)",
  "    for each child of node:",
  "      stack.push(child)",
]

function getHighlightedLine(step: TraversalStep | null): number {
  if (!step || step.type === "complete") return -1
  if (step.type === "enqueue" || step.type === "push")
    return step.visitedState.length === 0 ? 1 : 6
  if (step.type === "dequeue" || step.type === "pop") return 3
  if (step.type === "visit") return 4
  return -1
}

/* ═══════════════ Tree Node Card ═══════════════ */

function TreeNodeCard({ node, state }: { node: TreeNode; state: NodeState }) {
  const v = nodeVisuals[state]
  return (
    <div
      className={`
        relative rounded-xl border backdrop-blur-xl transition-all duration-300 ease-out
        p-2.5 overflow-hidden
        ${v.border} ${v.bg} ${v.glow}
      `}
      style={{ width: NODE_W, height: NODE_H }}
    >
      {/* pulse overlay for current node */}
      {state === "current" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 bg-cyan-400/10 pointer-events-none"
        />
      )}

      <div className="flex items-center gap-2.5 h-full">
        {/* avatar */}
        <div
          className={`relative shrink-0 w-10 h-10 rounded-lg overflow-hidden ring-2 transition-all duration-300 ${v.ring}`}
        >
          <Image
            src={normalizeSrc(node.member.image)}
            alt={node.member.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>

        {/* info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-semibold text-white truncate leading-tight">
            {node.member.name}
          </h4>
          <span
            className={`
              inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full
              font-medium mt-0.5
              ${node.member.isFacultyCoordinator ? "bg-amber-500/15 text-amber-300" : ""}
              ${node.member.isOverallCoordinator && !node.member.isFacultyCoordinator ? "bg-blue-500/15 text-blue-300" : ""}
              ${node.member.role === "coordinator" && !node.member.isFacultyCoordinator && !node.member.isOverallCoordinator ? "bg-purple-500/15 text-purple-300" : ""}
              ${node.member.role === "member" ? "bg-white/10 text-white/50" : ""}
            `}
          >
            {getRoleIcon(node.member)}
            {getRoleLabel(node.member)}
          </span>
        </div>
      </div>

      {/* bottom accent bar */}
      {state !== "idle" && state !== "visited" && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className={`
            absolute bottom-0 left-0 right-0 h-0.5 origin-left
            ${state === "current" ? "bg-linear-to-r from-cyan-400/80 to-cyan-400/0" : ""}
            ${state === "queued" ? "bg-linear-to-r from-blue-400/60 to-blue-400/0" : ""}
            ${state === "stacked" ? "bg-linear-to-r from-orange-400/60 to-orange-400/0" : ""}
          `}
        />
      )}
    </div>
  )
}

/* ═══════════════ Pseudocode Panel ═══════════════ */

function PseudoCodePanel({
  algorithm,
  highlightLine,
}: {
  algorithm: TraversalAlgorithm
  highlightLine: number
}) {
  const lines = algorithm === "bfs" ? bfsPseudo : dfsPseudo

  return (
    <div className="h-full flex flex-col bg-[#0d1117]/80 backdrop-blur-sm rounded-xl overflow-hidden border border-white/5 shadow-2xl">
      {/* title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/5">
        <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          {algorithm.toUpperCase()}.PSEUDO
        </span>
        <div className="flex gap-1.5 opacity-60">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
      </div>

      {/* code body */}
      <div className="flex-1 overflow-auto">
        <pre className="p-3 font-mono text-[11px] sm:text-xs leading-[1.9]">
          <AnimatePresence mode="wait">
            <motion.code
              key={algorithm}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`
                    flex transition-all duration-300 rounded-sm py-0.5
                    ${
                      i === highlightLine
                        ? "bg-cyan-500/15 border-l-2 border-cyan-400 -ml-0.5 pl-0.5"
                        : "border-l-2 border-transparent"
                    }
                  `}
                >
                  <span className="w-5 text-right pr-2 select-none text-white/20 text-[10px] shrink-0">
                    {i + 1}
                  </span>
                  <span
                    className={`whitespace-pre ${
                      i === highlightLine
                        ? "text-cyan-200 font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    {line}
                  </span>
                </div>
              ))}
            </motion.code>
          </AnimatePresence>
        </pre>
      </div>
    </div>
  )
}

/* ═══════════════ Queue / Stack Panel ═══════════════ */

function DataStructurePanel({
  algorithm,
  items,
  memberMap,
}: {
  algorithm: TraversalAlgorithm
  items: string[]
  memberMap: Map<string, Member>
}) {
  const label = algorithm === "bfs" ? "Queue" : "Stack"
  const Icon = algorithm === "bfs" ? Layers : GitBranch
  const isBFS = algorithm === "bfs"

  // For stack, the "top" is the last element → we reverse visually
  const display = isBFS ? items : [...items].reverse()
  // highlight index of next-to-process element
  const hotIdx = isBFS ? 0 : 0 // top of visual is index 0 in both cases after reverse

  return (
    <div className="backdrop-blur-xl bg-white/3 border border-white/8 rounded-xl p-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-white/40" />
        <span className="text-xs font-bold text-white/50 uppercase tracking-wider">
          {label}
        </span>
        <span className="text-xs text-white/30 font-mono">
          ({items.length} {items.length === 1 ? "item" : "items"})
        </span>
      </div>

      <div className="flex flex-wrap gap-2 min-h-9">
        <AnimatePresence mode="popLayout">
          {display.length === 0 ? (
            <motion.span
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-white/20 italic py-1"
            >
              Empty
            </motion.span>
          ) : (
            display.map((id, i) => {
              const member = memberMap.get(id)
              if (!member) return null
              const isHot = i === hotIdx
              return (
                <motion.div
                  key={id}
                  layout
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    x: isBFS ? 20 : 0,
                    y: !isBFS ? -10 : 0,
                  }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className={`
                    px-2.5 py-1 rounded-lg text-[11px] font-medium border
                    flex items-center gap-1.5 transition-all
                    ${
                      isBFS
                        ? "bg-blue-500/10 border-blue-500/25 text-blue-300"
                        : "bg-orange-500/10 border-orange-500/25 text-orange-300"
                    }
                    ${
                      isHot
                        ? "ring-1 " +
                          (isBFS ? "ring-blue-400/50" : "ring-orange-400/50")
                        : ""
                    }
                  `}
                >
                  <div className="w-4 h-4 rounded-full overflow-hidden shrink-0 bg-white/10">
                    <Image
                      src={normalizeSrc(member.image)}
                      alt={member.name}
                      width={16}
                      height={16}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {member.name.split(" ")[0]}
                  {isHot && (
                    <span className="text-[9px] opacity-60">
                      {isBFS ? "← next" : "← top"}
                    </span>
                  )}
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
      </div>

      <div className="mt-2 flex items-center text-[10px] text-white/20 select-none">
        {isBFS ? (
          <>
            <span>← dequeue</span>
            <span className="flex-1" />
            <span>enqueue →</span>
          </>
        ) : (
          <span>↑ push / pop (top)</span>
        )}
      </div>
    </div>
  )
}

/* ═══════════════ Main Page ═══════════════ */

export function CPTraversalPage() {
  const members = useMembers()
  const cpMembers = useMemo(() => members.filter(isCP), [members])

  const [algorithm, setAlgorithm] = useState<TraversalAlgorithm>("bfs")
  const [isRunning, setIsRunning] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [stepIndex, setStepIndex] = useState(-1)
  const [speed, setSpeed] = useState(1)

  const timerRef = useRef<number | null>(null)
  const stepIdxRef = useRef(-1)

  /* derived data */
  const tree = useMemo(() => buildMemberTree(cpMembers), [cpMembers])
  const layout = useMemo(() => (tree ? calculateLayout(tree) : null), [tree])
  const allNodes = useMemo(() => (tree ? flattenTree(tree) : []), [tree])
  const edges = useMemo(() => (tree ? getEdges(tree) : []), [tree])

  const memberMap = useMemo(() => {
    const m = new Map<string, Member>()
    allNodes.forEach(n => m.set(n.id, n.member))
    return m
  }, [allNodes])

  const steps = useMemo(() => {
    if (!tree) return []
    return algorithm === "bfs"
      ? generateBFSSteps(tree)
      : generateDFSSteps(tree)
  }, [tree, algorithm])

  const currentStep =
    stepIndex >= 0 && stepIndex < steps.length ? steps[stepIndex] : null
  const highlightLine = getHighlightedLine(currentStep)
  const structureItems = currentStep?.structureState ?? []
  const progressPercent =
    steps.length > 0 && stepIndex >= 0
      ? ((stepIndex + 1) / steps.length) * 100
      : 0

  const getStepDuration = useCallback(() => 700 / speed, [speed])

  /* ── playback controls ── */

  const play = useCallback(() => {
    if (isRunning || !tree || steps.length === 0) return

    const startFrom = isDone ? -1 : stepIdxRef.current
    if (isDone) setIsDone(false)

    setIsRunning(true)
    let idx = startFrom

    const tick = () => {
      idx++
      stepIdxRef.current = idx
      if (idx >= steps.length) {
        setIsRunning(false)
        setIsDone(true)
        setStepIndex(steps.length - 1)
        return
      }
      setStepIndex(idx)
      timerRef.current = window.setTimeout(tick, getStepDuration())
    }

    timerRef.current = window.setTimeout(tick, 300)
  }, [isRunning, isDone, tree, steps, getStepDuration])

  const pause = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setIsRunning(false)
  }, [])

  const skipToResult = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setIsRunning(false)
    setIsDone(true)
    const last = steps.length - 1
    setStepIndex(last)
    stepIdxRef.current = last
  }, [steps])

  const reset = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setIsRunning(false)
    setIsDone(false)
    setStepIndex(-1)
    stepIdxRef.current = -1
  }, [])

  // Reset when algorithm changes
  useEffect(() => {
    reset()
  }, [algorithm, reset])

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [])

  /* scroll current node into view */
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  useEffect(() => {
    if (currentStep && currentStep.type === "visit") {
      const el = nodeRefs.current.get(currentStep.nodeId)
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }
    }
  }, [currentStep])

  /* edge helpers */
  function edgeColor(_from: string, to: string): string {
    if (!currentStep) return "rgba(255,255,255,0.08)"
    const s = getNodeState(to, currentStep, algorithm)
    if (s === "current") return "#22d3ee"
    if (s === "visited") return "rgba(52,211,153,0.5)"
    if (s === "queued") return "rgba(96,165,250,0.3)"
    if (s === "stacked") return "rgba(251,146,60,0.3)"
    return "rgba(255,255,255,0.08)"
  }

  function edgeWidth(_from: string, to: string): number {
    if (!currentStep) return 1.5
    const s = getNodeState(to, currentStep, algorithm)
    if (s === "current") return 3
    if (s === "visited") return 2
    return 1.5
  }

  function edgeGlow(_from: string, to: string): boolean {
    if (!currentStep) return false
    const s = getNodeState(to, currentStep, algorithm)
    return s === "current" || s === "visited"
  }

  /* ═══════════════ Render ═══════════════ */

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
        {/* ambient glows */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-150 h-150 bg-cyan-600/7 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-125 h-125 bg-purple-600/7 rounded-full blur-[120px]" />
          <div className="absolute top-[40%] right-[20%] w-75 h-75 bg-blue-600/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* ── top bar ── */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/members/competitive-coding"
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Members</span>
            </Link>

            {isDone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-emerald-300">
                  Traversal Complete
                </span>
              </motion.div>
            )}
          </div>

          {/* ── header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-linear-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent mb-3">
              Tree Traversal
            </h1>
            <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto">
              Watch BFS &amp; DFS algorithms explore the member hierarchy tree
              in real time.
            </p>
          </motion.div>

          {/* ── controls + pseudocode ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 xl:grid-cols-12 gap-5 mb-8"
          >
            {/* controls panel */}
            <div className="xl:col-span-8">
              <div className="backdrop-blur-2xl bg-white/3 border border-white/8 rounded-2xl p-5 md:p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/4 via-transparent to-purple-500/4 pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  {/* algorithm toggle */}
                  <div>
                    <label className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-2.5 block">
                      Algorithm
                    </label>
                    <div className="flex gap-2">
                      {(
                        [
                          {
                            value: "bfs" as const,
                            label: "BFS",
                            icon: <Layers className="w-4 h-4" />,
                            desc: "Breadth-First Search",
                          },
                          {
                            value: "dfs" as const,
                            label: "DFS",
                            icon: <GitBranch className="w-4 h-4" />,
                            desc: "Depth-First Search",
                          },
                        ] as const
                      ).map(algo => (
                        <button
                          key={algo.value}
                          onClick={() => !isRunning && setAlgorithm(algo.value)}
                          disabled={isRunning}
                          className={`
                            flex-1 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all
                            relative overflow-hidden
                            ${
                              algorithm === algo.value
                                ? "bg-white/10 text-white border border-white/20 shadow-lg"
                                : "bg-white/3 text-white/40 border border-white/5 hover:text-white/70 hover:bg-white/6"
                            }
                            disabled:opacity-50
                          `}
                        >
                          <span className="flex items-center justify-center gap-2.5">
                            {algo.icon}
                            <span>{algo.label}</span>
                            <span className="text-[10px] text-white/30 font-normal hidden sm:inline">
                              ({algo.desc})
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* speed + actions */}
                  <div className="flex flex-wrap gap-4 items-end">
                    <div>
                      <label className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-2.5 block">
                        Speed
                      </label>
                      <div className="flex bg-black/20 p-1 rounded-xl">
                        {[1, 2, 4].map(s => (
                          <button
                            key={s}
                            onClick={() => setSpeed(s)}
                            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                              speed === s
                                ? "bg-white/10 text-white"
                                : "text-white/40 hover:text-white/60"
                            }`}
                          >
                            {s}x
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 flex-1 justify-end">
                      <button
                        onClick={reset}
                        disabled={stepIndex < 0 && !isDone}
                        className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white/80 font-medium text-sm transition-all border border-white/5 flex items-center gap-2 disabled:opacity-40"
                      >
                        <RotateCcw size={16} />
                        Reset
                      </button>

                      {isRunning && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          onClick={skipToResult}
                          className="px-5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-semibold text-sm transition-all border border-amber-500/20 flex items-center gap-2"
                        >
                          <SkipForward size={16} />
                          Skip to Result
                        </motion.button>
                      )}

                      {!isRunning ? (
                        <button
                          onClick={play}
                          disabled={cpMembers.length === 0}
                          className="px-8 py-2.5 rounded-xl bg-linear-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group flex items-center gap-2"
                        >
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                          <Play size={16} className="relative z-10" />
                          <span className="relative z-10">
                            {isDone
                              ? "Replay"
                              : stepIndex >= 0
                                ? "Resume"
                                : "Start"}
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={pause}
                          className="px-8 py-2.5 rounded-xl bg-white/10 text-white font-bold transition-all flex items-center gap-2 border border-white/10"
                        >
                          <Pause size={16} />
                          Pause
                        </button>
                      )}
                    </div>
                  </div>

                  {/* progress bar */}
                  {stepIndex >= 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between text-[11px] text-white/40">
                        <span className="flex items-center gap-1.5">
                          {currentStep?.type === "visit" && <><Eye size={14}/> Visiting...</>}
                          {(currentStep?.type === "enqueue" ||
                            currentStep?.type === "push") &&
                            (algorithm === "bfs"
                              ? <><ArrowDownToLine size={14}/> Enqueueing...</>
                              : <><ArrowDownToLine size={14}/> Pushing...</>)}
                          {(currentStep?.type === "dequeue" ||
                            currentStep?.type === "pop") &&
                            (algorithm === "bfs"
                              ? <><ArrowUpFromLine size={14}/> Dequeueing...</>
                              : <><ArrowUpFromLine size={14}/> Popping...</>)}
                          {currentStep?.type === "complete" && <span className="text-emerald-400 flex items-center gap-1.5"><Check size={14}/> Complete</span>}
                        </span>
                        <span className="font-mono">
                          Step {stepIndex + 1} / {steps.length}
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            isDone
                              ? "bg-linear-to-r from-emerald-400 to-cyan-400"
                              : "bg-linear-to-r from-cyan-500 to-blue-500"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* pseudocode */}
            <div className="xl:col-span-4 min-h-60">
              <PseudoCodePanel
                algorithm={algorithm}
                highlightLine={highlightLine}
              />
            </div>
          </motion.div>

          {/* ── data structure viz ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6"
          >
            <DataStructurePanel
              algorithm={algorithm}
              items={structureItems}
              memberMap={memberMap}
            />
          </motion.div>

          {/* ── legend ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-6 justify-center"
          >
            {[
              {
                label: "Current",
                color: "bg-cyan-400",
                border: "border-cyan-400/40",
              },
              {
                label: algorithm === "bfs" ? "In Queue" : "In Stack",
                color: algorithm === "bfs" ? "bg-blue-400" : "bg-orange-400",
                border:
                  algorithm === "bfs"
                    ? "border-blue-400/40"
                    : "border-orange-400/40",
              },
              {
                label: "Visited",
                color: "bg-emerald-400",
                border: "border-emerald-400/40",
              },
              {
                label: "Unvisited",
                color: "bg-white/30",
                border: "border-white/10",
              },
            ].map(item => (
              <div
                key={item.label}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${item.border} bg-white/2`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                <span className="text-xs text-white/60 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* ═══════ Tree Visualization ═══════ */}
          {tree && layout ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-2xl border border-white/5 bg-black/20 backdrop-blur-sm overflow-x-auto overflow-y-visible pb-2"
            >
              <div
                className="relative mx-auto"
                style={{
                  width: layout.width + TREE_PAD * 2,
                  height: layout.height + TREE_PAD * 2,
                  minWidth: "100%",
                }}
              >
                {/* SVG edges */}
                <svg
                  className="absolute inset-0 pointer-events-none"
                  width={layout.width + TREE_PAD * 2}
                  height={layout.height + TREE_PAD * 2}
                  style={{ overflow: "visible" }}
                >
                  <defs>
                    <filter id="edgeGlow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {edges.map(e => {
                    const from = layout.positions.get(e.from)
                    const to = layout.positions.get(e.to)
                    if (!from || !to) return null

                    const x1 = from.x + NODE_W / 2 + TREE_PAD
                    const y1 = from.y + NODE_H + TREE_PAD
                    const x2 = to.x + NODE_W / 2 + TREE_PAD
                    const y2 = to.y + TREE_PAD
                    const midY = (y1 + y2) / 2
                    const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`

                    return (
                      <path
                        key={`${e.from}-${e.to}`}
                        d={d}
                        fill="none"
                        strokeLinecap="round"
                        style={{
                          stroke: edgeColor(e.from, e.to),
                          strokeWidth: edgeWidth(e.from, e.to),
                          transition:
                            "stroke 0.5s ease, stroke-width 0.3s ease",
                          filter: edgeGlow(e.from, e.to)
                            ? "url(#edgeGlow)"
                            : "none",
                        }}
                      />
                    )
                  })}
                </svg>

                {/* node cards */}
                {allNodes.map(node => {
                  const pos = layout.positions.get(node.id)
                  if (!pos) return null
                  const state = getNodeState(node.id, currentStep, algorithm)
                  return (
                    <div
                      key={node.id}
                      ref={el => {
                        if (el) nodeRefs.current.set(node.id, el)
                      }}
                      className="absolute transition-all duration-300"
                      style={{
                        left: pos.x + TREE_PAD,
                        top: pos.y + TREE_PAD,
                      }}
                    >
                      <TreeNodeCard node={node} state={state} />
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            /* empty state */
            <div className="text-center py-20">
              <Zap className="w-12 h-12 mx-auto text-white/20 mb-4" />
              <p className="text-white/40 text-lg">
                No competitive coding members found.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
