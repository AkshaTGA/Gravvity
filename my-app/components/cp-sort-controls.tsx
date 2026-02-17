"use client"

import type { SortAlgorithm, SortDirection, SortKey } from "@/lib/cp-sorting"
import MagicButton from "@/components/magic-button"

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

export function CPSortControls({
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
    <section className="card-glow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Sorting Controls</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label className="flex flex-col gap-2 text-sm text-foreground/80">
          <span className="font-medium">Algorithm</span>
          <select
            value={algorithm}
            onChange={(event) => onAlgorithmChange(event.target.value as SortAlgorithm)}
            disabled={isRunning || disabled}
            className="rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="quick">Quick Sort</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-foreground/80">
          <span className="font-medium">Sort By</span>
          <select
            value={sortKey}
            onChange={(event) => onSortKeyChange(event.target.value as SortKey)}
            disabled={isRunning || disabled}
            className="rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
          >
            <option value="name">Name</option>
            <option value="role-priority">Role Priority</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-foreground/80">
          <span className="font-medium">Direction</span>
          <select
            value={direction}
            onChange={(event) => onDirectionChange(event.target.value as SortDirection)}
            disabled={isRunning || disabled}
            className="rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-5">
        <MagicButton onClick={onRun} disabled={disabled || isRunning} className="w-40">
          {isRunning ? "Sorting..." : "Run Sort"}
        </MagicButton>
        <MagicButton onClick={onReset} disabled={disabled} className="w-40">
          Reset Order
        </MagicButton>
        <span className="text-sm text-foreground/70">
          Steps: <strong>{operationCount}</strong>
        </span>
      </div>
    </section>
  )
}
