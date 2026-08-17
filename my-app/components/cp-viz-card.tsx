"use client"

import { motion } from "framer-motion"
import type { Member } from "@/lib/types"
import Image from "next/image"
import { Crown, Shield, Star, User } from "lucide-react"

interface CPVizCardProps {
  member: Member
  index: number
  highlightState: "none" | "compare" | "swap" | "pivot" | "sorted"
  compact?: boolean
}

function getRoleIcon(member: Member) {
  if (member.isFacultyCoordinator) return <Crown className="w-3.5 h-3.5" />
  if (member.isOverallCoordinator) return <Shield className="w-3.5 h-3.5" />
  if (member.role === "coordinator") return <Star className="w-3.5 h-3.5" />
  return <User className="w-3.5 h-3.5" />
}

function getRoleLabel(member: Member): string {
  if (member.isFacultyCoordinator) return "Faculty Coordinator"
  if (member.isOverallCoordinator) return "Overall Coordinator"
  if (member.role === "coordinator") return "Coordinator"
  return "Member"
}

const highlightStyles = {
  none: {
    border: "border-white/10",
    bg: "bg-white/[0.03]",
    glow: "",
    shadow: "",
  },
  compare: {
    border: "border-yellow-400/60",
    bg: "bg-yellow-500/[0.08]",
    glow: "shadow-[0_0_30px_rgba(234,179,8,0.3),inset_0_0_20px_rgba(234,179,8,0.05)]",
    shadow: "shadow-yellow-500/20",
  },
  swap: {
    border: "border-emerald-400/70",
    bg: "bg-emerald-500/[0.12]",
    glow: "shadow-[0_0_40px_rgba(16,185,129,0.4),inset_0_0_25px_rgba(16,185,129,0.08)]",
    shadow: "shadow-emerald-500/25",
  },
  pivot: {
    border: "border-purple-400/70",
    bg: "bg-purple-500/[0.10]",
    glow: "shadow-[0_0_35px_rgba(168,85,247,0.35),inset_0_0_20px_rgba(168,85,247,0.06)]",
    shadow: "shadow-purple-500/20",
  },
  sorted: {
    border: "border-cyan-400/50",
    bg: "bg-cyan-500/[0.06]",
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.2)]",
    shadow: "shadow-cyan-500/15",
  },
}

function normalizeSrc(src?: string): string {
  if (!src) return "/gravity-logo.png"
  if (src.startsWith("./public/")) return src.replace("./public/", "/")
  return src
}

export function CPVizCard({ member, index, highlightState, compact }: CPVizCardProps) {
  const style = highlightStyles[highlightState]

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl backdrop-blur-xl transition-all duration-300 ease-out
        ${style.border} ${style.bg} ${style.glow}
        border
        ${compact ? "p-3" : "p-4"}
      `}
    >
      {/* Animated highlight overlay */}
      {highlightState !== "none" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              highlightState === "compare"
                ? "radial-gradient(ellipse at center, rgba(234,179,8,0.08) 0%, transparent 70%)"
                : highlightState === "swap"
                  ? "radial-gradient(ellipse at center, rgba(16,185,129,0.1) 0%, transparent 70%)"
                  : highlightState === "pivot"
                    ? "radial-gradient(ellipse at center, rgba(168,85,247,0.08) 0%, transparent 70%)"
                    : "radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Index badge */}
      <div className="absolute top-2 right-2 z-10">
        <span
          className={`
          text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md
          ${highlightState === "compare" ? "bg-yellow-500/20 text-yellow-300" : ""}
          ${highlightState === "swap" ? "bg-emerald-500/20 text-emerald-300" : ""}
          ${highlightState === "pivot" ? "bg-purple-500/20 text-purple-300" : ""}
          ${highlightState === "none" || highlightState === "sorted" ? "bg-white/10 text-white/40" : ""}
        `}
        >
          #{index + 1}
        </span>
      </div>

      <div className={`flex items-center gap-3 ${compact ? "gap-2.5" : "gap-3.5"}`}>
        {/* Avatar */}
        <div
          className={`
          relative shrink-0 rounded-xl overflow-hidden
          ${compact ? "w-12 h-12" : "w-16 h-16"}
          ring-2 transition-all duration-300
          ${highlightState === "compare" ? "ring-yellow-400/50" : ""}
          ${highlightState === "swap" ? "ring-emerald-400/50" : ""}
          ${highlightState === "pivot" ? "ring-purple-400/50" : ""}
          ${highlightState === "none" || highlightState === "sorted" ? "ring-white/10" : ""}
        `}
        >
          <Image
            src={normalizeSrc(member.image)}
            alt={member.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-white truncate ${compact ? "text-sm" : "text-base"}`}>
            {member.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`
              text-[11px] flex items-center gap-1 px-2 py-0.5 rounded-full font-medium
              ${member.isFacultyCoordinator ? "bg-amber-500/15 text-amber-300" : ""}
              ${member.isOverallCoordinator ? "bg-blue-500/15 text-blue-300" : ""}
              ${member.role === "coordinator" && !member.isFacultyCoordinator && !member.isOverallCoordinator ? "bg-purple-500/15 text-purple-300" : ""}
              ${member.role === "member" ? "bg-white/10 text-white/60" : ""}
            `}
            >
              {getRoleIcon(member)}
              {getRoleLabel(member)}
            </span>
          </div>
        </div>
      </div>

      {/* Operation indicator bar */}
      {highlightState !== "none" && highlightState !== "sorted" && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className={`
            absolute bottom-0 left-0 right-0 h-0.5 origin-left
            ${highlightState === "compare" ? "bg-linear-to-r from-yellow-400/80 to-yellow-400/0" : ""}
            ${highlightState === "swap" ? "bg-linear-to-r from-emerald-400/80 to-emerald-400/0" : ""}
            ${highlightState === "pivot" ? "bg-linear-to-r from-purple-400/80 to-purple-400/0" : ""}
          `}
        />
      )}
    </div>
  )
}
