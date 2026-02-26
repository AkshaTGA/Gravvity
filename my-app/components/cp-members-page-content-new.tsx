"use client"

import { useMemo, useEffect, useState, useCallback } from "react"
import { useMembers } from "@/hooks/use-members"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import ProfileCard from "@/components/profile-card"
import "@/components/ProfileCard.css"
import type { Member } from "@/lib/types"
import { getRolePriority } from "@/lib/cp-sorting"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Code2, Users, Play } from "lucide-react"
import { CPGlobe } from "@/components/cp-globe"
import { isSameWing } from "@/lib/wing-match"

function isCompetitiveCodingMember(member: Member): boolean {
  return isSameWing(member.wing, "Competitive Coding")
}

function sortByRole(a: Member, b: Member): number {
  const pa = getRolePriority(a)
  const pb = getRolePriority(b)
  if (pa !== pb) return pa - pb
  return a.name.localeCompare(b.name)
}

/* ─── Mini animated sorting bars preview ─── */
function MiniSortPreview() {
  const BARS = [7, 3, 9, 2, 6, 4, 8, 1, 5]
  const [heights, setHeights] = useState(BARS)
  const [activeIdx, setActiveIdx] = useState<number[]>([])
  const [sorted, setSorted] = useState(false)

  const runSort = useCallback(() => {
    setSorted(false)
    const arr = [...BARS]
    const ops: { swap: [number, number] }[] = []
    // simple bubble sort to generate swap operations
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          ops.push({ swap: [j, j + 1] })
        }
      }
    }
    let step = 0
    const tick = () => {
      if (step >= ops.length) {
        setActiveIdx([])
        setSorted(true)
        return
      }
      const { swap } = ops[step]
      setActiveIdx(swap)
      setHeights((prev) => {
        const next = [...prev]
        ;[next[swap[0]], next[swap[1]]] = [next[swap[1]], next[swap[0]]]
        return next
      })
      step++
      setTimeout(tick, 120)
    }
    tick()
  }, [])

  useEffect(() => {
    const t = setTimeout(runSort, 800)
    return () => clearTimeout(t)
  }, [runSort])

  // restart loop after sorted
  useEffect(() => {
    if (!sorted) return
    const t = setTimeout(() => {
      setHeights(BARS)
      setActiveIdx([])
      setSorted(false)
      setTimeout(runSort, 600)
    }, 2000)
    return () => clearTimeout(t)
  }, [sorted, runSort])

  return (
    <div className="flex-1 rounded-xl bg-white/2 border border-white/5 p-3 flex items-end justify-center gap-1 h-28">
      {heights.map((h, i) => {
        const isActive = activeIdx.includes(i)
        const isSorted = sorted
        return (
          <motion.div
            key={i}
            layout
            className="rounded-sm w-2.5"
            animate={{
              height: `${h * 10}%`,
              backgroundColor: isSorted
                ? "rgb(134, 239, 172)"
                : isActive
                ? "rgb(196, 181, 253)"
                : "rgba(255,255,255,0.2)",
              boxShadow: isActive ? "0 0 8px rgba(168,85,247,0.5)" : "none",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )
      })}
    </div>
  )
}

/* ─── Mini animated tree traversal preview ─── */
function MiniTreePreview() {
  // Simple 7-node binary tree layout
  const nodes = [
    { id: 0, x: 60, y: 10, label: "R" },    // root
    { id: 1, x: 30, y: 38, label: "A" },     // left
    { id: 2, x: 90, y: 38, label: "B" },     // right
    { id: 3, x: 15, y: 66, label: "C" },     // left-left
    { id: 4, x: 45, y: 66, label: "D" },     // left-right
    { id: 5, x: 75, y: 66, label: "E" },     // right-left
    { id: 6, x: 105, y: 66, label: "F" },    // right-right
  ]
  const edges = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6],
  ]
  // BFS order
  const bfsOrder = [0, 1, 2, 3, 4, 5, 6]
  const [visitedSet, setVisitedSet] = useState<Set<number>>(new Set())
  const [currentNode, setCurrentNode] = useState<number | null>(null)
  const [done, setDone] = useState(false)

  const runBfs = useCallback(() => {
    setVisitedSet(new Set())
    setCurrentNode(null)
    setDone(false)
    let step = 0
    const tick = () => {
      if (step >= bfsOrder.length) {
        setCurrentNode(null)
        setDone(true)
        return
      }
      const nodeId = bfsOrder[step]
      setCurrentNode(nodeId)
      setVisitedSet((prev) => new Set([...prev, nodeId]))
      step++
      setTimeout(tick, 450)
    }
    tick()
  }, [])

  useEffect(() => {
    const t = setTimeout(runBfs, 1200)
    return () => clearTimeout(t)
  }, [runBfs])

  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => {
      setVisitedSet(new Set())
      setCurrentNode(null)
      setDone(false)
      setTimeout(runBfs, 600)
    }, 2500)
    return () => clearTimeout(t)
  }, [done, runBfs])

  return (
    <div className="flex-1 rounded-xl bg-white/2 border border-white/5 p-2 h-28 relative">
      <svg width="100%" height="100%" viewBox="0 0 120 90" className="overflow-visible">
        {/* Edges */}
        {edges.map(([from, to]) => {
          const f = nodes[from]
          const t = nodes[to]
          const visited = visitedSet.has(from) && visitedSet.has(to)
          return (
            <line
              key={`${from}-${to}`}
              x1={f.x}
              y1={f.y + 8}
              x2={t.x}
              y2={t.y}
              stroke={visited ? "rgb(134, 239, 172)" : "rgba(255,255,255,0.1)"}
              strokeWidth={visited ? 1.5 : 1}
              className="transition-all duration-300"
            />
          )
        })}
        {/* Nodes */}
        {nodes.map((node) => {
          const isCurrent = currentNode === node.id
          const isVisited = visitedSet.has(node.id) && !isCurrent
          return (
            <g key={node.id}>
              {isCurrent && (
                <circle
                  cx={node.x}
                  cy={node.y + 4}
                  r={11}
                  fill="none"
                  stroke="rgba(6,182,212,0.4)"
                  strokeWidth={2}
                  className="animate-ping"
                  style={{ transformOrigin: `${node.x}px ${node.y + 4}px` }}
                />
              )}
              <circle
                cx={node.x}
                cy={node.y + 4}
                r={8}
                fill={
                  isCurrent
                    ? "rgb(6, 182, 212)"
                    : isVisited
                    ? "rgb(134, 239, 172)"
                    : "rgba(255,255,255,0.12)"
                }
                stroke={
                  isCurrent
                    ? "rgb(6,182,212)"
                    : isVisited
                    ? "rgb(74, 222, 128)"
                    : "rgba(255,255,255,0.2)"
                }
                strokeWidth={1.5}
                className="transition-all duration-300"
              />
              <text
                x={node.x}
                y={node.y + 7.5}
                textAnchor="middle"
                fill={isCurrent || isVisited ? "rgb(10,10,30)" : "rgba(255,255,255,0.5)"}
                fontSize={7}
                fontWeight="bold"
                className="transition-all duration-300 select-none"
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export function CPMembersPageContent() {
  const members = useMembers()
  console.log(members, "all members in CP page content")
  const cpMembers = useMemo(
    () => members.filter(isCompetitiveCodingMember).sort(sortByRole),
    [members]
  )

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
        {/* Ambient glows */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-15%] left-[-5%] w-125 h-125 bg-purple-600/7 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-15%] right-[-5%] w-112.5 h-112.5 bg-blue-600/6 rounded-full blur-[100px]" />
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-87.5 h-87.5 bg-cyan-600/4 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Hero Section – split layout */}
          <div className="mb-20">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
              {/* ── Left: Globe (1:1 ratio) ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-1 flex items-center justify-center relative"
              >
                {/* Layered glow rings behind globe */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-96 h-96 rounded-full bg-purple-600/8 blur-[80px]" />
                </div>
                <CPGlobe className="relative z-10" />
              </motion.div>

              {/* ── Right: Content (1:1 ratio) ── */}
              <div className="flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="flex flex-col gap-6"
                >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 w-fit">
                    <Code2 className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                      Competitive Coding Wing
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                    <span className="bg-linear-to-r from-purple-400 via-pink-300 to-cyan-400 bg-clip-text text-transparent">
                      Our Team
                    </span>
                  </h1>

                  <p className="text-white/45 text-base md:text-lg max-w-xl leading-relaxed">
                    The minds behind competitive coding excellence. Problem solvers, algorithm enthusiasts, and contest warriors.
                  </p>

                  {/* ── Visual CTA: Mini sort + tree preview ── */}
                  <Link href="/members/competitive-coding/visualize">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative overflow-hidden rounded-2xl border border-purple-500/20 bg-[#0a0a1a]/80 backdrop-blur-sm cursor-pointer hover:border-purple-400/40 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/15"
                    >
                      {/* Animated shimmer sweep */}
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/4 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                      {/* Content */}
                      <div className="relative z-10 p-6">
                        {/* Header row */}
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-500/25">
                              <Play className="w-5 h-5 text-purple-300 fill-purple-300/30" />
                            </div>
                            <div>
                              <div className="text-white font-bold text-lg">Algorithm Visualizer</div>
                              <div className="text-white/35 text-xs">Watch algorithms come alive</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-purple-300/60 group-hover:text-purple-300 transition-colors">
                            <span className="text-xs font-medium hidden sm:inline">Enter</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>

                        {/* Two preview panels side by side */}
                        <div className="flex gap-3">
                          {/* Mini Sorting Preview */}
                          <MiniSortPreview />

                          {/* Mini Tree Preview */}
                          <MiniTreePreview />
                        </div>

                        {/* Bottom labels */}
                        <div className="flex gap-3 mt-3">
                          <div className="flex-1 text-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-300/50">Bubble &middot; Merge &middot; Quick Sort</span>
                          </div>
                          <div className="flex-1 text-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300/50">BFS &middot; DFS Traversal</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Members Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            {cpMembers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {cpMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + index * 0.05, duration: 0.5 }}
                  >
                    <ProfileCard
                      name={member.name}
                      title={member.bio || member.wing}
                      handle={member.name?.toLowerCase().replace(/\s+/g, "") || "member"}
                      status={member.role}
                      contactText="Contact"
                      avatarUrl={member.image || "/gravity-logo.png"}
                      socials={{
                        linkedin: member.socials?.linkedin,
                        x: member.socials?.twitter,
                        instagram: member.socials?.instagram,
                      }}
                      showUserInfo={true}
                      enableTilt={true}
                      behindGlowEnabled={true}
                      onContactClick={() => {}}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Users className="w-12 h-12 mx-auto text-white/20 mb-4" />
                <p className="text-white/40 text-lg">No members found.</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
