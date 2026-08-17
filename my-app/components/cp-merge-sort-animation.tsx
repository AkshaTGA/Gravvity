"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ────────────────────────────────────────────────────────────────
 *  MergeSortAnimation — A beautiful, looping merge-sort visualizer
 *
 *  Phases:  INITIAL → SPLIT → SORT → MERGE → DONE → (loop)
 *  Shows the array being recursively divided, elements compared
 *  and merged back together, with smooth transitions.
 * ──────────────────────────────────────────────────────────────── */

// Colors
const COLORS = {
  bar: "rgba(139, 92, 246, 0.5)", // purple idle
  barBorder: "rgba(168, 130, 255, 0.6)",
  active: "rgba(6, 182, 212, 0.85)", // cyan active
  activeBorder: "rgba(6, 182, 212, 1)",
  sorted: "rgba(134, 239, 172, 0.8)", // green sorted
  sortedBorder: "rgba(74, 222, 128, 1)",
  split: "rgba(244, 114, 182, 0.7)", // pink splitting
  splitBorder: "rgba(244, 114, 182, 1)",
  text: "rgba(255,255,255,0.9)",
  dimText: "rgba(255,255,255,0.4)",
  divider: "rgba(139, 92, 246, 0.25)",
  bg: "rgba(255,255,255,0.03)",
  label: "rgba(139, 92, 246, 0.6)",
};

const INITIAL_ARRAY = [38, 27, 43, 3, 9, 82, 10];

type Phase = "initial" | "splitting" | "sorted-leaves" | "merging" | "done";

interface ArrayBlock {
  id: string;
  values: number[];
  level: number; // depth in tree
  position: number; // horizontal position index at that level
  state: "idle" | "active" | "splitting" | "sorted";
}

/*
 * Pre-compute all the merge sort frames (snapshots of array blocks).
 * Each frame is a full state of the visualization.
 */
function generateMergeSortFrames(arr: number[]): ArrayBlock[][] {
  const frames: ArrayBlock[][] = [];

  // Frame 0: Full array
  frames.push([
    { id: "0", values: [...arr], level: 0, position: 0, state: "idle" },
  ]);

  // Frame 1: Show full array as active (about to split)
  frames.push([
    { id: "0", values: [...arr], level: 0, position: 0, state: "splitting" },
  ]);

  // Split into 2
  const mid = Math.ceil(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // Frame 2: Two halves at level 1
  frames.push([
    { id: "0", values: [...arr], level: 0, position: 0, state: "idle" },
    { id: "1-0", values: [...left], level: 1, position: 0, state: "idle" },
    { id: "1-1", values: [...right], level: 1, position: 1, state: "idle" },
  ]);

  // Frame 3: Left half splitting
  frames.push([
    { id: "0", values: [...arr], level: 0, position: 0, state: "idle" },
    { id: "1-0", values: [...left], level: 1, position: 0, state: "splitting" },
    { id: "1-1", values: [...right], level: 1, position: 1, state: "idle" },
  ]);

  // Split left further
  const ll = left.slice(0, Math.ceil(left.length / 2));
  const lr = left.slice(Math.ceil(left.length / 2));

  // Frame 4: Left is split into two, right still idle
  frames.push([
    { id: "0", values: [...arr], level: 0, position: 0, state: "idle" },
    { id: "1-0", values: [...left], level: 1, position: 0, state: "idle" },
    { id: "1-1", values: [...right], level: 1, position: 1, state: "idle" },
    { id: "2-0", values: [...ll], level: 2, position: 0, state: "idle" },
    { id: "2-1", values: [...lr], level: 2, position: 1, state: "idle" },
  ]);

  // Frame 5: Right half splitting
  frames.push([
    { id: "0", values: [...arr], level: 0, position: 0, state: "idle" },
    { id: "1-0", values: [...left], level: 1, position: 0, state: "idle" },
    {
      id: "1-1",
      values: [...right],
      level: 1,
      position: 1,
      state: "splitting",
    },
    { id: "2-0", values: [...ll], level: 2, position: 0, state: "idle" },
    { id: "2-1", values: [...lr], level: 2, position: 1, state: "idle" },
  ]);

  const rl = right.slice(0, Math.ceil(right.length / 2));
  const rr = right.slice(Math.ceil(right.length / 2));

  // Frame 6: All split into leaf-level sub-arrays
  frames.push([
    { id: "0", values: [...arr], level: 0, position: 0, state: "idle" },
    { id: "1-0", values: [...left], level: 1, position: 0, state: "idle" },
    { id: "1-1", values: [...right], level: 1, position: 1, state: "idle" },
    { id: "2-0", values: [...ll], level: 2, position: 0, state: "idle" },
    { id: "2-1", values: [...lr], level: 2, position: 1, state: "idle" },
    { id: "2-2", values: [...rl], level: 2, position: 2, state: "idle" },
    { id: "2-3", values: [...rr], level: 2, position: 3, state: "idle" },
  ]);

  // Frame 7: Leaves marked as active (sorting)
  frames.push([
    { id: "0", values: [...arr], level: 0, position: 0, state: "idle" },
    { id: "1-0", values: [...left], level: 1, position: 0, state: "idle" },
    { id: "1-1", values: [...right], level: 1, position: 1, state: "idle" },
    {
      id: "2-0",
      values: [...ll.sort((a, b) => a - b)],
      level: 2,
      position: 0,
      state: "active",
    },
    {
      id: "2-1",
      values: [...lr.sort((a, b) => a - b)],
      level: 2,
      position: 1,
      state: "active",
    },
    {
      id: "2-2",
      values: [...rl.sort((a, b) => a - b)],
      level: 2,
      position: 2,
      state: "active",
    },
    {
      id: "2-3",
      values: [...rr.sort((a, b) => a - b)],
      level: 2,
      position: 3,
      state: "active",
    },
  ]);

  // Frame 8: Leaves sorted (green), begin merging left pair
  const mergedLeft = [...ll, ...lr].sort((a, b) => a - b);
  frames.push([
    { id: "0", values: [...arr], level: 0, position: 0, state: "idle" },
    {
      id: "1-0",
      values: [...mergedLeft],
      level: 1,
      position: 0,
      state: "active",
    },
    { id: "1-1", values: [...right], level: 1, position: 1, state: "idle" },
    {
      id: "2-0",
      values: [...ll.sort((a, b) => a - b)],
      level: 2,
      position: 0,
      state: "sorted",
    },
    {
      id: "2-1",
      values: [...lr.sort((a, b) => a - b)],
      level: 2,
      position: 1,
      state: "sorted",
    },
    {
      id: "2-2",
      values: [...rl.sort((a, b) => a - b)],
      level: 2,
      position: 2,
      state: "sorted",
    },
    {
      id: "2-3",
      values: [...rr.sort((a, b) => a - b)],
      level: 2,
      position: 3,
      state: "sorted",
    },
  ]);

  // Frame 9: Merge right pair
  const mergedRight = [...rl, ...rr].sort((a, b) => a - b);
  frames.push([
    { id: "0", values: [...arr], level: 0, position: 0, state: "idle" },
    {
      id: "1-0",
      values: [...mergedLeft],
      level: 1,
      position: 0,
      state: "sorted",
    },
    {
      id: "1-1",
      values: [...mergedRight],
      level: 1,
      position: 1,
      state: "active",
    },
    {
      id: "2-0",
      values: [...ll.sort((a, b) => a - b)],
      level: 2,
      position: 0,
      state: "sorted",
    },
    {
      id: "2-1",
      values: [...lr.sort((a, b) => a - b)],
      level: 2,
      position: 1,
      state: "sorted",
    },
    {
      id: "2-2",
      values: [...rl.sort((a, b) => a - b)],
      level: 2,
      position: 2,
      state: "sorted",
    },
    {
      id: "2-3",
      values: [...rr.sort((a, b) => a - b)],
      level: 2,
      position: 3,
      state: "sorted",
    },
  ]);

  // Frame 10: Both halves merged, now merge them into final
  const finalSorted = [...arr].sort((a, b) => a - b);
  frames.push([
    {
      id: "0",
      values: [...finalSorted],
      level: 0,
      position: 0,
      state: "active",
    },
    {
      id: "1-0",
      values: [...mergedLeft],
      level: 1,
      position: 0,
      state: "sorted",
    },
    {
      id: "1-1",
      values: [...mergedRight],
      level: 1,
      position: 1,
      state: "sorted",
    },
  ]);

  // Frame 11: Done - final array sorted
  frames.push([
    {
      id: "0",
      values: [...finalSorted],
      level: 0,
      position: 0,
      state: "sorted",
    },
  ]);

  return frames;
}

/* ── Single array block component ── */
function ArrayBlockView({
  block,
  phase,
}: {
  block: ArrayBlock;
  phase: string;
}) {
  const getBg = () => {
    switch (block.state) {
      case "splitting":
        return "rgba(244, 114, 182, 0.08)";
      case "active":
        return "rgba(6, 182, 212, 0.08)";
      case "sorted":
        return "rgba(134, 239, 172, 0.06)";
      default:
        return "rgba(255,255,255,0.02)";
    }
  };
  const getBorder = () => {
    switch (block.state) {
      case "splitting":
        return "rgba(244, 114, 182, 0.3)";
      case "active":
        return "rgba(6, 182, 212, 0.35)";
      case "sorted":
        return "rgba(134, 239, 172, 0.3)";
      default:
        return "rgba(255,255,255,0.08)";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="flex gap-1 rounded-lg px-2 py-1.5"
      style={{
        background: getBg(),
        border: `1px solid ${getBorder()}`,
      }}
    >
      {block.values.map((val, i) => {
        const getBarColor = () => {
          switch (block.state) {
            case "splitting":
              return COLORS.split;
            case "active":
              return COLORS.active;
            case "sorted":
              return COLORS.sorted;
            default:
              return COLORS.bar;
          }
        };
        const getBarBorder = () => {
          switch (block.state) {
            case "splitting":
              return COLORS.splitBorder;
            case "active":
              return COLORS.activeBorder;
            case "sorted":
              return COLORS.sortedBorder;
            default:
              return COLORS.barBorder;
          }
        };
        const maxVal = Math.max(...INITIAL_ARRAY);
        const heightPercent = (val / maxVal) * 100;
        return (
          <div
            key={`${block.id}-${i}`}
            className="flex flex-col items-center gap-0.5"
          >
            <div
              className="w-5 sm:w-6 rounded-sm transition-all duration-500"
              style={{
                height: `${Math.max(heightPercent * 0.45, 4)}px`,
                background: getBarColor(),
                border: `1px solid ${getBarBorder()}`,
                boxShadow:
                  block.state === "active"
                    ? "0 0 8px rgba(6, 182, 212, 0.3)"
                    : block.state === "sorted"
                      ? "0 0 8px rgba(134, 239, 172, 0.2)"
                      : "none",
              }}
            />
            <span
              className="text-[9px] sm:text-[10px] font-mono font-bold tabular-nums"
              style={{
                color:
                  block.state === "sorted"
                    ? COLORS.sorted
                    : block.state === "active"
                      ? COLORS.active
                      : block.state === "splitting"
                        ? COLORS.split
                        : COLORS.dimText,
              }}
            >
              {val}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
}

/* ── Phase label ── */
function PhaseLabel({ frame, total }: { frame: number; total: number }) {
  const getLabel = () => {
    if (frame <= 1) return "Initial Array";
    if (frame <= 6) return "Dividing...";
    if (frame === 7) return "Sorting Leaves";
    if (frame <= 9) return "Merging...";
    if (frame === 10) return "Final Merge";
    return "Sorted!";
  };
  const getColor = () => {
    if (frame <= 1) return "text-purple-400";
    if (frame <= 6) return "text-pink-400";
    if (frame === 7) return "text-cyan-400";
    if (frame <= 10) return "text-cyan-400";
    return "text-green-400";
  };
  return (
    <div className="flex items-center justify-between w-full mb-3">
      <motion.span
        key={getLabel()}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-xs font-semibold uppercase tracking-wider ${getColor()}`}
      >
        {getLabel()}
      </motion.span>
      <div className="flex gap-0.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              background:
                i === frame
                  ? "rgb(139, 92, 246)"
                  : i < frame
                    ? "rgba(139, 92, 246, 0.3)"
                    : "rgba(255,255,255,0.1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main component ── */
export function MergeSortHeroAnimation({
  className = "",
}: {
  className?: string;
}) {
  const frames = useMemo(() => generateMergeSortFrames(INITIAL_ARRAY), []);
  const [frameIdx, setFrameIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentBlocks = frames[frameIdx];

  // Group blocks by level
  const levels = useMemo(() => {
    const map = new Map<number, ArrayBlock[]>();
    for (const block of currentBlocks) {
      if (!map.has(block.level)) map.set(block.level, []);
      map.get(block.level)!.push(block);
    }
    // sort by level
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [currentBlocks]);

  // Auto-advance frames
  useEffect(() => {
    const delays = [
      1800, // frame 0 → 1: show initial
      1000, // frame 1 → 2: split highlight
      900, // frame 2 → 3: show halves
      800, // frame 3 → 4: left splitting
      900, // frame 4 → 5: left split done
      800, // frame 5 → 6: right splitting
      900, // frame 6 → 7: all leaves
      1200, // frame 7 → 8: leaves sorted
      1000, // frame 8 → 9: merge left
      1000, // frame 9 → 10: merge right
      1200, // frame 10 → 11: final merge
      2500, // frame 11 → 0: done, pause then restart
    ];
    const delay = delays[frameIdx] || 1000;

    timerRef.current = setTimeout(() => {
      setFrameIdx((prev) => (prev + 1) % frames.length);
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [frameIdx, frames.length]);

  return (
    <div className={`relative ${className}`}>
      {/* Glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 rounded-full bg-purple-600/6 blur-[80px]" />
      </div>

      <div className="relative z-10 rounded-2xl border border-white/5 bg-[#0a0a1a]/70 backdrop-blur-sm p-5 sm:p-6 max-w-lg mx-auto">
        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-[11px] font-mono text-purple-300/70 uppercase tracking-widest">
            Merge Sort Visualization
          </span>
        </div>

        <PhaseLabel frame={frameIdx} total={frames.length} />

        {/* Visualization area */}
        <div className="flex flex-col items-center gap-3 min-h-50 justify-center">
          <AnimatePresence mode="popLayout">
            {levels.map(([level, blocks]) => (
              <motion.div
                key={`level-${level}-${frameIdx}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-end justify-center gap-2 sm:gap-3 flex-wrap"
              >
                {blocks
                  .sort((a, b) => a.position - b.position)
                  .map((block) => (
                    <ArrayBlockView key={block.id} block={block} phase="" />
                  ))}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Decorative bottom bar */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-purple-500/20 to-transparent" />
          <span className="text-[9px] font-mono text-white/20">O(n log n)</span>
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-purple-500/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}
