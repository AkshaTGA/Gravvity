"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useMembers } from "@/hooks/use-members"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CPVisualizerHeader } from "@/components/cp-visualizer-header"
import ProfileCard from "@/components/profile-card"
import "@/components/ProfileCard.css"
import type { Member } from "@/lib/types"
import {
  createSortOperations,
  type SortAlgorithm,
  type SortDirection,
  type SortKey,
  getRolePriority,
} from "@/lib/cp-sorting"
import { LayoutGroup, motion, AnimatePresence } from "framer-motion"
import { isSameWing } from "@/lib/wing-match"

function isCompetitiveCodingMember(member: Member): boolean {
  return isSameWing(member.wing, "Competitive Coding")
}

export function CPMembersPageContent() {
  const members = useMembers()
  const cpMembers = useMemo(() => members.filter(isCompetitiveCodingMember), [members])

  const [algorithm, setAlgorithm] = useState<SortAlgorithm>("quick")
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [direction, setDirection] = useState<SortDirection>("asc")

  // State
  const [displayOrder, setDisplayOrder] = useState<number[]>([]) // Indices into cpMembers
  const [activeIndices, setActiveIndices] = useState<number[]>([]) // Indices in the displayOrder
  const [pivotIndex, setPivotIndex] = useState<number | null>(null) // Index in the displayOrder
  const [isRunning, setIsRunning] = useState(false)
  const [currentOperation, setCurrentOperation] = useState<"compare" | "swap" | "pivot" | "overwrite" | null>(null)

  const timerRef = useRef<number | null>(null)
  
  // Base order (unsorted initial state)
  const baseOrder = useMemo(() => cpMembers.map((_, index) => index), [cpMembers])

  const orderedMembers = useMemo(() => {
    // If we haven't started sorting, use base order
    if (!isRunning && displayOrder.length === 0) {
      return baseOrder.map((index) => cpMembers[index]).filter(Boolean)
    }
    const order = displayOrder.length === cpMembers.length ? displayOrder : baseOrder
    return order.map((index) => cpMembers[index]).filter(Boolean)
  }, [baseOrder, cpMembers, displayOrder, isRunning])

  const sortPlan = useMemo(() => {
    return createSortOperations(cpMembers, sortKey, direction, algorithm)
  }, [cpMembers, sortKey, direction, algorithm])

  // Adjustable speed: Slower for visibility
  const stepDuration = useMemo(() => {
    const baseWait = 800
    // Slightly faster if really long list
    if (cpMembers.length > 20) return 500
    return baseWait
  }, [cpMembers.length])

  const runSort = () => {
    if (isRunning || cpMembers.length < 2) return

    if (timerRef.current !== null) window.clearTimeout(timerRef.current)

    const operations = sortPlan.operations
    const workingOrder = [...displayOrder] // Start from current visual state

    setDisplayOrder(workingOrder)
    setActiveIndices([])
    setPivotIndex(null)
    setCurrentOperation(null)
    setIsRunning(true)

    let operationIndex = 0

    const tick = () => {
      if (operationIndex >= operations.length) {
        setDisplayOrder(sortPlan.sortedOrder)
        setActiveIndices([])
        setPivotIndex(null)
        setCurrentOperation(null)
        setIsRunning(false)
        return
      }

      const operation = operations[operationIndex]
      setCurrentOperation(operation.type)

      // Reset highlights first
      setActiveIndices([])
      setPivotIndex(null)

      if (operation.type === "compare") {
        setActiveIndices(operation.indices)
      } else if (operation.type === "pivot") {
        setPivotIndex(operation.indices[0])
      } else if (operation.type === "swap") {
        const [left, right] = operation.indices
        const temp = workingOrder[left]
        workingOrder[left] = workingOrder[right]
        workingOrder[right] = temp
        setDisplayOrder([...workingOrder])
        setActiveIndices([left, right])
      } else if (operation.type === "overwrite") {
        const [index] = operation.indices
        workingOrder[index] = operation.value
        setDisplayOrder([...workingOrder])
        setActiveIndices([index])
      }

      operationIndex += 1
      timerRef.current = window.setTimeout(tick, stepDuration)
    }

    tick()
  }

  const resetOrder = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }

    setIsRunning(false)
    setActiveIndices([])
    setPivotIndex(null)
    setCurrentOperation(null)
    // Randomize or just reset to base? Let's reset to base ID order
    setDisplayOrder(baseOrder)
  }

  // Helper to determine card glow color
  const getCardGlowColor = (index: number) => {
    if (!isRunning) return undefined // Default

    if (activeIndices.includes(index) && (currentOperation === 'compare' || currentOperation === 'swap')) {
        return currentOperation === 'compare' ? "rgba(234, 179, 8, 0.6)" : "rgba(34, 197, 94, 0.6)"
    }
    if (pivotIndex === index) {
        return "rgba(168, 85, 247, 0.6)"
    }
    return undefined
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen mt-10 bg-background text-foreground">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-10 mt-10 slide-in-up">
            <p className="text-md md:text-xl text-foreground/70">
              Visualize sorting algorithms on our CP team by name or role-priority.
            </p>
          </div>

          <CPVisualizerHeader
            algorithm={algorithm}
            sortKey={sortKey}
            direction={direction}
            isRunning={isRunning}
            disabled={cpMembers.length === 0}
            operationCount={sortPlan.operations.length}
            onAlgorithmChange={setAlgorithm}
            onSortKeyChange={setSortKey}
            onDirectionChange={setDirection}
            onRun={runSort}
            onReset={resetOrder}
          />

          <div className="flex flex-col gap-8">
            {/* Visualizer Section */}
            <section className="w-full min-h-[500px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {isRunning ? "Sorting in Progress..." : "Team Members"}
                </h2>
              </div>

               <LayoutGroup>
                  <motion.div 
                      layout 
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                      style={{ position: 'relative' }}
                  >
                      <AnimatePresence>
                      {orderedMembers.map((member, index) => {
                          const glowColor = getCardGlowColor(index)
                          return (
                              <motion.div
                                  layout
                                  key={member.id}
                                  transition={{
                                      type: "spring",
                                      damping: 25,
                                      stiffness: 120,
                                      mass: 1.2
                                  }}
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
                                      instagram: member.socials?.instagram
                                    }}
                                    showUserInfo={true}
                                    enableTilt={!isRunning} // Disable tilt during animation for performance
                                    behindGlowEnabled={true}
                                    behindGlowColor={glowColor}
                                    onContactClick={() => {}}
                                  />
                              </motion.div>
                          )
                      })}
                      </AnimatePresence>
                  </motion.div>
              </LayoutGroup>
            </section>


          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

