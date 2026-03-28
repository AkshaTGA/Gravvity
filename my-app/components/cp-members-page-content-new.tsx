"use client";

import { useMemo, useEffect, useState, useCallback } from "react";
import { useMembers } from "@/hooks/use-members";
import { useIsTrueDesktop } from "@/hooks/use-true-desktop";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import ProfileCard from "@/components/profile-card";
import "@/components/ProfileCard.css";
import type { Member } from "@/lib/types";
import { getRolePriority } from "@/lib/cp-sorting";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, Users, Play } from "lucide-react";
import { DFSVisualizer } from "@/components/cp-dfs-visualizer";
import { isSameWing } from "@/lib/wing-match";
import "@/components/wing-headings.css";

function isCompetitiveCodingMember(member: Member): boolean {
  return isSameWing(member.wing, "Competitive Coding");
}

function sortByRole(a: Member, b: Member): number {
  const pa = getRolePriority(a);
  const pb = getRolePriority(b);
  if (pa !== pb) return pa - pb;
  return a.name.localeCompare(b.name);
}

/* ─── Mini animated sorting bars preview ─── */
function MiniSortPreview() {
  const BARS = [7, 3, 9, 2, 6, 4, 8, 1, 5];
  const [heights, setHeights] = useState(BARS);
  const [activeIdx, setActiveIdx] = useState<number[]>([]);
  const [sorted, setSorted] = useState(false);

  const runSort = useCallback(() => {
    setSorted(false);
    const arr = [...BARS];
    const ops: { swap: [number, number] }[] = [];
    // simple bubble sort to generate swap operations
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          ops.push({ swap: [j, j + 1] });
        }
      }
    }
    let step = 0;
    const tick = () => {
      if (step >= ops.length) {
        setActiveIdx([]);
        setSorted(true);
        return;
      }
      const { swap } = ops[step];
      setActiveIdx(swap);
      setHeights((prev) => {
        const next = [...prev];
        [next[swap[0]], next[swap[1]]] = [next[swap[1]], next[swap[0]]];
        return next;
      });
      step++;
      setTimeout(tick, 120);
    };
    tick();
  }, []);

  useEffect(() => {
    const t = setTimeout(runSort, 800);
    return () => clearTimeout(t);
  }, [runSort]);

  // restart loop after sorted
  useEffect(() => {
    if (!sorted) return;
    const t = setTimeout(() => {
      setHeights(BARS);
      setActiveIdx([]);
      setSorted(false);
      setTimeout(runSort, 600);
    }, 2000);
    return () => clearTimeout(t);
  }, [sorted, runSort]);

  return (
    <div className="flex-1 rounded-xl bg-white/2 border border-white/5 p-3 flex items-end justify-center gap-1 h-28">
      {heights.map((h, i) => {
        const isActive = activeIdx.includes(i);
        const isSorted = sorted;
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
        );
      })}
    </div>
  );
}

/* ─── Mini animated tree traversal preview ─── */
function MiniTreePreview() {
  // Simple 7-node binary tree layout
  const nodes = [
    { id: 0, x: 60, y: 10, label: "R" }, // root
    { id: 1, x: 30, y: 38, label: "A" }, // left
    { id: 2, x: 90, y: 38, label: "B" }, // right
    { id: 3, x: 15, y: 66, label: "C" }, // left-left
    { id: 4, x: 45, y: 66, label: "D" }, // left-right
    { id: 5, x: 75, y: 66, label: "E" }, // right-left
    { id: 6, x: 105, y: 66, label: "F" }, // right-right
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [2, 6],
  ];
  // BFS order
  const bfsOrder = [0, 1, 2, 3, 4, 5, 6];
  const [visitedSet, setVisitedSet] = useState<Set<number>>(new Set());
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const runBfs = useCallback(() => {
    setVisitedSet(new Set());
    setCurrentNode(null);
    setDone(false);
    let step = 0;
    const tick = () => {
      if (step >= bfsOrder.length) {
        setCurrentNode(null);
        setDone(true);
        return;
      }
      const nodeId = bfsOrder[step];
      setCurrentNode(nodeId);
      setVisitedSet((prev) => new Set([...prev, nodeId]));
      step++;
      setTimeout(tick, 450);
    };
    tick();
  }, []);

  useEffect(() => {
    const t = setTimeout(runBfs, 1200);
    return () => clearTimeout(t);
  }, [runBfs]);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => {
      setVisitedSet(new Set());
      setCurrentNode(null);
      setDone(false);
      setTimeout(runBfs, 600);
    }, 2500);
    return () => clearTimeout(t);
  }, [done, runBfs]);

  return (
    <div className="flex-1 rounded-xl bg-white/2 border border-white/5 p-2 h-28 relative">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 120 90"
        className="overflow-visible"
      >
        {/* Edges */}
        {edges.map(([from, to]) => {
          const f = nodes[from];
          const t = nodes[to];
          const visited = visitedSet.has(from) && visitedSet.has(to);
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
          );
        })}
        {/* Nodes */}
        {nodes.map((node) => {
          const isCurrent = currentNode === node.id;
          const isVisited = visitedSet.has(node.id) && !isCurrent;
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
                fill={
                  isCurrent || isVisited
                    ? "rgb(10,10,30)"
                    : "rgba(255,255,255,0.5)"
                }
                fontSize={7}
                fontWeight="bold"
                className="transition-all duration-300 select-none"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function CPMembersPageContent() {
  const members = useMembers();
  const cpMembers = useMemo(
    () => members.filter(isCompetitiveCodingMember).sort(sortByRole),
    [members],
  );
  const coordinators = useMemo(
    () => cpMembers.filter((m) => m.role === "coordinator"),
    [cpMembers],
  );
  const regularMembers = useMemo(
    () => cpMembers.filter((m) => m.role !== "coordinator"),
    [cpMembers],
  );

  const isDesktop = useIsTrueDesktop();

  return (
    <>
      <Navigation />
      <main className="min-h-screen mt-5 bg-background text-foreground relative overflow-hidden">
        {/* Ambient glows */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-15%] left-[-5%] w-125 h-125 bg-purple-600/7 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-15%] right-[-5%] w-112.5 h-112.5 bg-blue-600/6 rounded-full blur-[100px]" />
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-87.5 h-87.5 bg-cyan-600/4 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-20">
          {/* Hero Section – split layout */}
          <div className="mb-10">
            <div className="flex justify-center items-center mb-5">
              <h1 
                className="text-4xl text-center md:text-6xl font-bold cp-super-heading mb-4 leading-tight"
                data-text="Competitive Coding Wing"
              >
                Competitive Coding Wing
              </h1>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
              {isDesktop && (
                <>
                  {/* ── Left: DFS Background Visualizer ── */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex-1 flex items-center justify-center relative"
                  >
                    <DFSVisualizer className="w-full max-w-md" />
                  </motion.div>

                  {/* ── Right: Content (1:1 ratio) ── */}
                  <div className="flex-1 min-w-0">
                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, delay: 0.15 }}
                      className="flex flex-col gap-6"
                    >
                      {/* Heading */}

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
                                  <div className="text-white font-bold text-lg">
                                    Algorithm Visualizer
                                  </div>
                                  <div className="text-white/35 text-xs">
                                    Watch algorithms come alive
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-purple-300/60 group-hover:text-purple-300 transition-colors">
                                <span className="text-xs font-medium hidden sm:inline">
                                  Enter
                                </span>
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
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-300/50">
                                  Bubble &middot; Merge &middot; Quick Sort
                                </span>
                              </div>
                              <div className="flex-1 text-center">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300/50">
                                  BFS &middot; DFS Traversal
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Coordinators Section ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-2 text-center">
              <span className="text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="M7.475 21Q5.2 21 3.6 19.4T2 15.525q0-2.15 1.438-3.713t3.587-1.737L3 2h7l2 4l2-4h7l-4 8.025q2.125.2 3.563 1.763T22 15.5q0 2.3-1.6 3.9T16.5 21q-.225 0-.462-.012t-.463-.063q1.375-.9 2.15-2.337T18.5 15.5q0-2.725-1.888-4.612T12 9t-4.612 1.888T5.5 15.5q0 1.7.7 3.2t2.2 2.225q-.225.05-.462.063T7.475 21M12 20q-1.875 0-3.187-1.312T7.5 15.5t1.313-3.187T12 11t3.188 1.313T16.5 15.5t-1.312 3.188T12 20m-1.85-1.75l1.85-1.4l1.85 1.4l-.7-2.275L15 14.65h-2.275L12 12.25l-.725 2.4H9l1.85 1.325z"
                  />
                </svg>
              </span>
              <span>Coordinators</span>
            </h2>
            {coordinators.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-8 max-w-[1100px] mx-auto">
                {coordinators.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + index * 0.08, duration: 0.5 }}
                  >
                    <ProfileCard
                      name={member.name}
                      title={member.bio || member.wing}
                      handle={
                        member.name?.toLowerCase().replace(/\s+/g, "") ||
                        "coordinator"
                      }
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
            ) : null}
          </motion.div>

          {/* ── Members Section ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-2 text-center">
              <span className="text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#fff"
                    d="M224.3 128L139.7-12.9c-6.5-10.8-20.1-14.7-31.3-9.1L21.8 21.3C9.9 27.2 5.1 41.6 11 53.5l69.6 139.1C50.5 226.5 32.3 271.1 32.3 320c0 106 86 192 192 192s192-86 192-192c0-48.9-18.3-93.5-48.3-127.4l69.6-139.1c5.9-11.9 1.1-26.3-10.7-32.2l-86.7-43.4c-11.2-5.6-24.9-1.6-31.3 9.1zm30.8 142.5c1.4 2.8 4 4.7 7 5.1l50.1 7.3c7.7 1.1 10.7 10.5 5.2 16l-36.3 35.4c-2.2 2.2-3.2 5.2-2.7 8.3l8.6 49.9c1.3 7.6-6.7 13.5-13.6 9.9l-44.8-23.6c-2.7-1.4-6-1.4-8.7 0l-44.8 23.6c-6.9 3.6-14.9-2.2-13.6-9.9l8.6-49.9c.5-3-.5-6.1-2.7-8.3l-36.3-35.4c-5.6-5.4-2.5-14.8 5.2-16l50.1-7.3c3-.4 5.7-2.4 7-5.1l22.4-45.4c3.4-7 13.3-7 16.8 0l22.4 45.4z"
                  />
                </svg>
              </span>
              <span>Members</span>
            </h2>
            {regularMembers.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-8 max-w-[1100px] mx-auto">
                {regularMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                  >
                    <ProfileCard
                      name={member.name}
                      title={member.bio || member.wing}
                      handle={
                        member.name?.toLowerCase().replace(/\s+/g, "") ||
                        "member"
                      }
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
  );
}
