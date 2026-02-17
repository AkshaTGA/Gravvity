"use client"

import type { SortAlgorithm, SortDirection, SortKey } from "@/lib/cp-sorting"
import { motion } from "framer-motion"
import { ArrowUpAZ, ArrowDownZA } from "lucide-react"

type CPSortControlsProps = {
  algorithm: SortAlgorithm
  sortKey: SortKey
  direction: SortDirection
  isRunning: boolean
  disabled: boolean
  operationCount: number
  onAlgorithmChange: (value: SortAlgorithm) => void
  onSortKeyChange: (value: SortKey) => void
  onDirectionChange: (value: SortDirection) => void
  onRun: () => void
  onReset: () => void
}

const algorithms: { value: SortAlgorithm; label: string }[] = [
  { value: "bubble", label: "Bubble Sort" },
  { value: "merge", label: "Merge Sort" },
  { value: "quick", label: "Quick Sort" },
]

export function CPSortControlsNew({
  algorithm,
  sortKey,
  direction,
  isRunning,
  disabled,
  operationCount,
  onAlgorithmChange,
  onSortKeyChange,
  onDirectionChange,
  onRun,
  onReset,
}: CPSortControlsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 shadow-2xl overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />

      <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        
        {/* Algorithm Selector */}
        <div className="flex flex-col gap-3 w-full xl:w-auto">
          <label className="text-sm font-medium text-white/50 uppercase tracking-wider">Algorithm</label>
          <div className="flex flex-wrap gap-2 md:gap-0 bg-black/20 p-1 rounded-xl w-fit">
            {algorithms.map((algo) => (
              <button
                key={algo.value}
                onClick={() => onAlgorithmChange(algo.value)}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
                  algorithm === algo.value
                    ? "text-white shadow-lg"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {algorithm === algo.value && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{algo.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort Key & Direction Selector */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <label className="text-sm font-medium text-white/50 uppercase tracking-wider">Sort By</label>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-black/20 p-1 rounded-xl w-fit relative">
                <button
                    onClick={() => onSortKeyChange("name")}
                    disabled={isRunning}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
                      sortKey === "name"
                        ? "text-white shadow-lg"
                        : "text-white/40 hover:text-white/70"
                    }`}
                >
                    {sortKey === "name" && (
                      <motion.div
                        layoutId="activeSortKey"
                        className="absolute inset-0 bg-white/10 border border-white/20 rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">Name (A-Z)</span>
                </button>
                <button
                    onClick={() => onSortKeyChange("role-priority")}
                    disabled={isRunning}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
                      sortKey === "role-priority"
                        ? "text-white shadow-lg"
                        : "text-white/40 hover:text-white/70"
                    }`}
                >
                    {sortKey === "role-priority" && (
                      <motion.div
                        layoutId="activeSortKey"
                        className="absolute inset-0 bg-white/10 border border-white/20 rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">Role Priority</span>
                </button>
            </div>

            <button
                onClick={() => onDirectionChange(direction === "asc" ? "desc" : "asc")}
                disabled={isRunning}
                className="p-3 bg-black/20 hover:bg-black/40 rounded-xl text-white/70 transition-colors border border-white/5"
                title={direction === "asc" ? "Ascending" : "Descending"}
            >
                {direction === "asc" ? <ArrowUpAZ size={20} /> : <ArrowDownZA size={20} />}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-end gap-3 w-full xl:w-auto justify-end mt-4 xl:mt-0">
           <button
             onClick={onReset}
             disabled={isRunning}
             className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 font-medium transition-colors border border-white/5 disabled:opacity-50"
           >
             Reset
           </button>
           
           <button
             onClick={onRun}
             disabled={isRunning || disabled}
             className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group"
           >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">{isRunning ? "Sort Running..." : "Visualize Sort"}</span>
           </button>
        </div>

      </div>
    </motion.section>
  )
}

