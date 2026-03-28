"use client"

import { useEffect, useMemo, useRef, useState, useCallback } from "react"
import { useMembers } from "@/hooks/use-members"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CPVizCard } from "@/components/cp-viz-card"
import { CPAlgoCode } from "@/components/cp-algo-code"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import {
  createSortOperations,
  type SortAlgorithm,
  type SortDirection,
  type SortKey,
} from "@/lib/cp-sorting"
import type { Member } from "@/lib/types"
import {
  ArrowUpAZ,
  ArrowDownZA,
  Play,
  RotateCcw,
  SkipForward,
  ArrowLeft,
  Zap,
  Activity,
  Shuffle,
  Check,
  Search,
  RefreshCw,
  MapPin,
  PenTool,
} from "lucide-react"
import Link from "next/link"
import { isSameWing } from "@/lib/wing-match"

function isCompetitiveCodingMember(member: Member): boolean {
  return isSameWing(member.wing, "Competitive Coding")
}

const algorithms: { value: SortAlgorithm; label: string; icon: React.ReactNode }[] = [
  { value: "bubble", label: "Bubble", icon: <Activity size={16} /> },
  { value: "merge", label: "Merge", icon: <Shuffle size={16} /> },
  { value: "quick", label: "Quick", icon: <Zap size={16} /> },
]

export function CPVisualizePage() {
  const members = useMembers()
  const cpMembers = useMemo(() => members.filter(isCompetitiveCodingMember), [members])

  const [algorithm, setAlgorithm] = useState<SortAlgorithm>("quick")
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [direction, setDirection] = useState<SortDirection>("asc")

  const [displayOrder, setDisplayOrder] = useState<number[]>([])
  const [activeIndices, setActiveIndices] = useState<number[]>([])
  const [pivotIndex, setPivotIndex] = useState<number | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [currentOperation, setCurrentOperation] = useState<"compare" | "swap" | "pivot" | "overwrite" | null>(null)
  const [operationProgress, setOperationProgress] = useState(0)
  const [totalOperations, setTotalOperations] = useState(0)
  const [speed, setSpeed] = useState(1) // 1x, 2x, 4x

  const timerRef = useRef<number | null>(null)
  const operationIndexRef = useRef(0)
  const workingOrderRef = useRef<number[]>([])
  const sortPlanRef = useRef<ReturnType<typeof createSortOperations> | null>(null)

  const baseOrder = useMemo(() => cpMembers.map((_, index) => index), [cpMembers])

  // Initialize display order
  useEffect(() => {
    if (cpMembers.length > 0 && displayOrder.length === 0) {
      setDisplayOrder([...baseOrder])
    }
  }, [cpMembers, baseOrder, displayOrder.length])

  const orderedMembers = useMemo(() => {
    const order = displayOrder.length === cpMembers.length ? displayOrder : baseOrder
    return order.map((index) => cpMembers[index]).filter(Boolean)
  }, [baseOrder, cpMembers, displayOrder])

  const sortPlan = useMemo(() => {
    return createSortOperations(cpMembers, sortKey, direction, algorithm)
  }, [cpMembers, sortKey, direction, algorithm])

  const getStepDuration = useCallback(() => {
    const base = cpMembers.length > 20 ? 400 : 600
    return base / speed
  }, [cpMembers.length, speed])

  const getHighlightState = useCallback(
    (index: number): "none" | "compare" | "swap" | "pivot" | "sorted" => {
      if (isDone) return "sorted"
      if (!isRunning) return "none"
      if (pivotIndex === index) return "pivot"
      if (activeIndices.includes(index)) {
        if (currentOperation === "swap") return "swap"
        return "compare"
      }
      return "none"
    },
    [isRunning, isDone, activeIndices, pivotIndex, currentOperation]
  )

  const runSort = useCallback(() => {
    if (isRunning || cpMembers.length < 2) return

    if (timerRef.current !== null) window.clearTimeout(timerRef.current)

    const plan = createSortOperations(cpMembers, sortKey, direction, algorithm)
    sortPlanRef.current = plan
    const operations = plan.operations
    const workingOrder = [...baseOrder]
    workingOrderRef.current = workingOrder

    setDisplayOrder([...workingOrder])
    setActiveIndices([])
    setPivotIndex(null)
    setCurrentOperation(null)
    setIsRunning(true)
    setIsDone(false)
    setTotalOperations(operations.length)
    setOperationProgress(0)
    operationIndexRef.current = 0

    const tick = () => {
      const idx = operationIndexRef.current
      if (idx >= operations.length) {
        setDisplayOrder(plan.sortedOrder)
        setActiveIndices([])
        setPivotIndex(null)
        setCurrentOperation(null)
        setIsRunning(false)
        setIsDone(true)
        return
      }

      const operation = operations[idx]
      setCurrentOperation(operation.type)
      setOperationProgress(idx + 1)
      setActiveIndices([])
      setPivotIndex(null)

      if (operation.type === "compare") {
        setActiveIndices(operation.indices)
      } else if (operation.type === "pivot") {
        setPivotIndex(operation.indices[0])
      } else if (operation.type === "swap") {
        const [left, right] = operation.indices
        const wo = workingOrderRef.current
        const temp = wo[left]
        wo[left] = wo[right]
        wo[right] = temp
        setDisplayOrder([...wo])
        setActiveIndices([left, right])
      } else if (operation.type === "overwrite") {
        const [index] = operation.indices
        const wo = workingOrderRef.current
        wo[index] = operation.value
        setDisplayOrder([...wo])
        setActiveIndices([index])
      }

      operationIndexRef.current = idx + 1
      timerRef.current = window.setTimeout(tick, getStepDuration())
    }

    timerRef.current = window.setTimeout(tick, 300)
  }, [isRunning, cpMembers, sortKey, direction, algorithm, baseOrder, getStepDuration])

  const skipToResult = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }

    const plan = sortPlanRef.current || sortPlan
    setDisplayOrder(plan.sortedOrder)
    setActiveIndices([])
    setPivotIndex(null)
    setCurrentOperation(null)
    setIsRunning(false)
    setIsDone(true)
    setOperationProgress(plan.operations.length)
    setTotalOperations(plan.operations.length)
  }, [sortPlan])

  const resetOrder = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setIsRunning(false)
    setIsDone(false)
    setActiveIndices([])
    setPivotIndex(null)
    setCurrentOperation(null)
    setOperationProgress(0)
    setTotalOperations(0)

    // Shuffle for visual interest
    const shuffled = [...baseOrder].sort(() => Math.random() - 0.5)
    setDisplayOrder(shuffled)
  }, [baseOrder])

  const shuffleOrder = useCallback(() => {
    if (isRunning) return
    setIsDone(false)
    const shuffled = [...baseOrder].sort(() => Math.random() - 0.5)
    setDisplayOrder(shuffled)
  }, [baseOrder, isRunning])

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [])

  const progressPercent = totalOperations > 0 ? (operationProgress / totalOperations) * 100 : 0

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
        {/* Ambient background effects */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-150 h-150 bg-purple-600/7 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-125 h-125 bg-blue-600/7 rounded-full blur-[120px]" />
          <div className="absolute top-[40%] right-[20%] w-75 h-75 bg-cyan-600/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Top bar */}
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
                <span className="text-xs font-medium text-emerald-300">Sort Complete</span>
              </motion.div>
            )}
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-linear-to-r from-purple-400 via-pink-300 to-cyan-400 bg-clip-text text-transparent mb-3">
              Sort Visualizer
            </h1>
            <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto">
              Watch sorting algorithms in action on real member cards. Choose an algorithm and hit play.
            </p>
          </motion.div>

          {/* Controls + Code Side by Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 xl:grid-cols-12 gap-5 mb-10"
          >
            {/* Controls Panel */}
            <div className="xl:col-span-8">
              <div className="backdrop-blur-2xl bg-white/3 border border-white/8 rounded-2xl p-5 md:p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/4 via-transparent to-blue-500/4 pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  {/* Algorithm Selector */}
                  <div>
                    <label className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-2.5 block">
                      Algorithm
                    </label>
                    <div className="flex gap-2">
                      {algorithms.map((algo) => (
                        <button
                          key={algo.value}
                          onClick={() => !isRunning && setAlgorithm(algo.value)}
                          disabled={isRunning}
                          className={`
                            flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all relative overflow-hidden group
                            ${algorithm === algo.value
                              ? "bg-white/10 text-white border border-white/20 shadow-lg"
                              : "bg-white/3 text-white/40 border border-white/5 hover:text-white/70 hover:bg-white/6"
                            }
                            disabled:opacity-50
                          `}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <span className="text-base">{algo.icon}</span>
                            {algo.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort Parameters Row */}
                  <div className="flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-50">
                      <label className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-2.5 block">
                        Sort By
                      </label>
                      <div className="flex bg-black/20 p-1 rounded-xl">
                        <button
                          onClick={() => !isRunning && setSortKey("name")}
                          disabled={isRunning}
                          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            sortKey === "name"
                              ? "bg-white/10 text-white"
                              : "text-white/40 hover:text-white/60"
                          }`}
                        >
                          Name
                        </button>
                        <button
                          onClick={() => !isRunning && setSortKey("role-priority")}
                          disabled={isRunning}
                          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            sortKey === "role-priority"
                              ? "bg-white/10 text-white"
                              : "text-white/40 hover:text-white/60"
                          }`}
                        >
                          Role
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-2.5 block">
                        Order
                      </label>
                      <button
                        onClick={() => !isRunning && setDirection(direction === "asc" ? "desc" : "asc")}
                        disabled={isRunning}
                        className="p-3 bg-black/20 hover:bg-black/30 rounded-xl text-white/60 hover:text-white/80 transition-all border border-white/5"
                      >
                        {direction === "asc" ? <ArrowUpAZ size={20} /> : <ArrowDownZA size={20} />}
                      </button>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-2.5 block">
                        Speed
                      </label>
                      <div className="flex bg-black/20 p-1 rounded-xl">
                        {[1, 2, 4].map((s) => (
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
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={shuffleOrder}
                      disabled={isRunning}
                      className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white/80 font-medium text-sm transition-all border border-white/5 flex items-center gap-2 disabled:opacity-40"
                    >
                      <Shuffle size={16} />
                      Shuffle
                    </button>

                    <button
                      onClick={resetOrder}
                      disabled={isRunning}
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

                    <button
                      onClick={runSort}
                      disabled={isRunning || cpMembers.length === 0}
                      className="ml-auto px-8 py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group flex items-center gap-2"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <Play size={16} className="relative z-10" />
                      <span className="relative z-10">
                        {isRunning ? "Sorting..." : "Start Sort"}
                      </span>
                    </button>
                  </div>

                  {/* Progress Bar */}
                  {(isRunning || isDone) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between text-[11px] text-white/40">
                        <span className="flex items-center gap-1.5">
                          <Activity size={12} />
                          {currentOperation ? (
                            <span className="capitalize flex items-center gap-1.5">
                              {currentOperation === "compare" && <><Search size={14}/> Comparing...</>}
                              {currentOperation === "swap" && <><RefreshCw size={14}/> Swapping...</>}
                              {currentOperation === "pivot" && <><MapPin size={14}/> Selecting Pivot...</>}
                              {currentOperation === "overwrite" && <><PenTool size={14}/> Writing...</>}
                            </span>
                          ) : isDone ? (
                            <span className="flex items-center gap-1.5 text-emerald-400"><Check size={14}/> Complete</span>
                          ) : (
                            "Ready"
                          )}
                        </span>
                        <span className="font-mono">
                          {operationProgress} / {totalOperations} ops
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full transition-colors duration-300 ${
                            isDone
                              ? "bg-linear-to-r from-emerald-400 to-cyan-400"
                              : "bg-linear-to-r from-blue-500 to-purple-500"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Algorithm Code Panel */}
            <div className="xl:col-span-4 min-h-70">
              <CPAlgoCode algorithm={algorithm} />
            </div>
          </motion.div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 mb-6 justify-center"
          >
            {[
              { label: "Comparing", color: "bg-yellow-400", border: "border-yellow-400/40" },
              { label: "Swapping", color: "bg-emerald-400", border: "border-emerald-400/40" },
              { label: "Pivot", color: "bg-purple-400", border: "border-purple-400/40" },
              { label: "Sorted", color: "bg-cyan-400", border: "border-cyan-400/40" },
            ].map((item) => (
              <div key={item.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${item.border} bg-white/2`}>
                <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                <span className="text-xs text-white/60 font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <LayoutGroup>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                <AnimatePresence mode="popLayout">
                  {orderedMembers.map((member, index) => (
                    <motion.div
                      key={member.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        layout: {
                          type: "spring",
                          damping: 20,
                          stiffness: 150,
                          mass: 0.8,
                        },
                        opacity: { duration: 0.2 },
                        scale: { duration: 0.2 },
                      }}
                    >
                      <CPVizCard
                        member={member}
                        index={index}
                        highlightState={getHighlightState(index)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
          </motion.div>

          {/* Empty state */}
          {cpMembers.length === 0 && (
            <div className="text-center py-20">
              <Zap className="w-12 h-12 mx-auto text-white/20 mb-4" />
              <p className="text-white/40 text-lg">No competitive coding members found.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
