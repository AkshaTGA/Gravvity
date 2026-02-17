"use client"

import type { SortAlgorithm, SortDirection, SortKey } from "@/lib/cp-sorting"
import { motion } from "framer-motion"
import { ArrowUpAZ, ArrowDownZA } from "lucide-react"
import { CPAlgoCode } from "./cp-algo-code"

type CPVisualizerHeaderProps = {
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

export function CPVisualizerHeader({
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
}: CPVisualizerHeaderProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10 w-full max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Part: Controls */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between gap-8">
                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
                 
                 <div className="relative z-10 flex flex-col gap-6">
                    {/* Algorithm Choice */}
                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium text-white/50 uppercase tracking-wider flex items-center gap-2">
                           Select Algorithm
                        </label>
                        <div className="flex flex-wrap gap-2 md:gap-0 bg-black/20 p-1.5 rounded-xl w-fit">
                            {algorithms.map((algo) => (
                            <button
                                key={algo.value}
                                onClick={() => onAlgorithmChange(algo.value)}
                                disabled={isRunning}
                                className={`px-4 md:px-6 py-2.5 rounded-lg text-sm md:text-base font-medium transition-all relative ${
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

                    <div className="h-px w-full bg-white/5" />

                    {/* Sorting Parameters */}
                    <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium text-white/50 uppercase tracking-wider">
                                Order Parameters
                            </label>
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex bg-black/20 p-1.5 rounded-xl w-fit relative">
                                    <button
                                        onClick={() => onSortKeyChange("name")}
                                        disabled={isRunning}
                                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all relative ${
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
                                        <span className="relative z-10">Name</span>
                                    </button>
                                    <button
                                        onClick={() => onSortKeyChange("role-priority")}
                                        disabled={isRunning}
                                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all relative ${
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
                                    className="p-3.5 bg-black/20 hover:bg-black/40 rounded-xl text-white/70 transition-colors border border-white/5 disabled:opacity-50"
                                    title={direction === "asc" ? "Ascending" : "Descending"}
                                >
                                    {direction === "asc" ? <ArrowUpAZ size={22} /> : <ArrowDownZA size={22} />}
                                </button>
                            </div>
                        </div>

                        {/* Visualizer Buttons */}
                        <div className="flex gap-3 mt-4 md:mt-0 w-full md:w-auto">
                            <button
                                onClick={onReset}
                                disabled={isRunning}
                                className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 font-medium transition-colors border border-white/5 disabled:opacity-50"
                            >
                                Reset
                            </button>
                            
                            <button
                                onClick={onRun}
                                disabled={isRunning || disabled}
                                className="flex-1 md:flex-none px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group min-w-[160px]"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative z-10">{isRunning ? "Running..." : "Visualize"}</span>
                            </button>
                        </div>
                    </div>
                 </div>
            </div>
        </div>

        {/* Right Part: Algorithm Code */}
        <div className="lg:col-span-5 xl:col-span-4 min-h-[300px] lg:min-h-[auto]">
            <CPAlgoCode algorithm={algorithm} />
        </div>

      </div>
    </motion.section>
  )
}
