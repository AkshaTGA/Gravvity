"use client"

import type { Member } from "@/lib/types"
import type { SortDirection, SortKey } from "@/lib/cp-sorting"

type CPSortVisualizerProps = {
  orderedMembers: Member[]
  activeIndices: number[]
  pivotIndex: number | null
  sortKey: SortKey
  direction: SortDirection
}

function getWeight(member: Member, sortKey: SortKey): number {
  if (sortKey === "role-priority") {
    if (member.isFacultyCoordinator) return 100
    if (member.isOverallCoordinator) return 75
    if (member.role === "coordinator") return 50
    return 25
  }

  const normalized = member.name.trim().toLowerCase()
  if (!normalized) return 0
  const firstCharCode = normalized.charCodeAt(0)
  const clamped = Number.isNaN(firstCharCode) ? 97 : Math.max(97, Math.min(122, firstCharCode))
  return clamped - 96
}

function getRoleLabel(member: Member): string {
  if (member.isFacultyCoordinator) return "Faculty Coordinator"
  if (member.isOverallCoordinator) return "Overall Coordinator"
  if (member.role === "coordinator") return "Coordinator"
  return "Member"
}

export function CPSortVisualizer({ orderedMembers, activeIndices, pivotIndex, sortKey, direction }: CPSortVisualizerProps) {
  const maxWeight = Math.max(1, ...orderedMembers.map((member) => getWeight(member, sortKey)))

  return (
    <section className="card-glow p-6 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-2xl font-bold">Live Sort Visualizer</h2>
        <span className="text-sm text-foreground/70">
          Sorting by <strong>{sortKey === "name" ? "Name" : "Role Priority"}</strong> · <strong>{direction === "asc" ? "Ascending" : "Descending"}</strong>
        </span>
      </div>

      <div className="space-y-2">
        {orderedMembers.map((member, index) => {
          const weight = getWeight(member, sortKey)
          const widthPercentage = Math.max(18, (weight / maxWeight) * 100)
          const isActive = activeIndices.includes(index)
          const isPivot = pivotIndex === index

          return (
            <div key={member.id} className="relative rounded-lg border border-border/70 bg-card overflow-hidden">
              <div
                className={[
                  "h-12 transition-all duration-150 ease-linear",
                  isPivot
                    ? "bg-linear-to-r from-accent/70 to-primary/70"
                    : isActive
                      ? "bg-linear-to-r from-primary/60 to-secondary/60"
                      : "bg-linear-to-r from-primary/25 to-secondary/25",
                ].join(" ")}
                style={{ width: `${widthPercentage}%` }}
              />
              <div className="absolute inset-0 px-4 py-2 flex items-center justify-between text-sm md:text-base">
                <span className="font-semibold truncate max-w-[55%]">{index + 1}. {member.name}</span>
                <span className="text-foreground/75 truncate">{getRoleLabel(member)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
