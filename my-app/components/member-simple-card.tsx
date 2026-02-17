"use client"

import type { Member } from "@/lib/types"
import Image from "next/image"
import { motion } from "framer-motion"

type MemberSimpleCardProps = {
  member: Member
  state?: "default" | "compare" | "swap" | "pivot" | "sorted"
}

function SocialLink({ href, label }: { href?: string; label: string }) {
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-xs md:text-sm text-primary hover:text-accent transition-colors"
    >
      {label}
    </a>
  )
}

export function MemberSimpleCard({ member, state = "default" }: MemberSimpleCardProps) {
  const getBorderColor = () => {
    switch (state) {
      case "compare":
        return "border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)] z-20"
      case "swap":
        return "border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)] z-20"
      case "pivot":
        return "border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] z-10"
      case "sorted":
        return "border-blue-500/50"
      default:
        return "border-border/80"
    }
  }

  return (
    <motion.article
      layout
      animate={{
        scale: state === "compare" ? 1.05 : 1,
        y: state === "swap" ? -10 : 0,
        backgroundColor: state === "swap" ? "rgba(34, 197, 94, 0.1)" : "rgba(0, 0, 0, 0)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      className={`relative p-4 flex items-start gap-4 rounded-xl border backdrop-blur-md bg-card/30 transition-all duration-300 ${getBorderColor()}`}
    >
      {state === "pivot" && (
        <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded-full z-10 font-bold tracking-wider shadow-lg">
          PIVOT
        </div>
      )}
      <Image
        src={member.image || "/gravity-logo.png"}
        alt={member.name}
        width={64}
        height={64}
        className="h-16 w-16 rounded-xl object-cover border border-border/80"
      />

      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold truncate text-foreground">{member.name}</h3>
        <p className="text-sm text-foreground/70 capitalize">{member.role}</p>

        <div className="mt-2 flex flex-wrap gap-3">
          <SocialLink href={member.socials?.github} label="GitHub" />
          <SocialLink href={member.socials?.linkedin} label="LinkedIn" />
          <SocialLink href={member.socials?.twitter} label="Twitter" />
          <SocialLink href={member.socials?.instagram} label="Instagram" />
        </div>
      </div>
    </motion.article>
  )
}
