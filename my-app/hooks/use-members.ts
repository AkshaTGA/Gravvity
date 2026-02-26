"use client"
import { useEffect, useState } from "react"
import type { Member } from "@/lib/types"
import fallbackMembers from "@/data/members.json"

const KEY = "gravity_members"

type RawMember = Partial<Member> & {
  _id?: string
  role?: string
  createdAt?: string | number
}

function normalizeRole(value?: string): Member["role"] {
  return value?.toLowerCase().trim() === "coordinator" ? "coordinator" : "member"
}

function normalizeMember(raw: RawMember, index: number): Member | null {
  if (!raw || typeof raw !== "object") return null

  const name = typeof raw.name === "string" ? raw.name.trim() : ""
  if (!name) return null

  const id =
    typeof raw.id === "string" && raw.id.trim().length > 0
      ? raw.id
      : typeof raw._id === "string" && raw._id.trim().length > 0
        ? raw._id
        : `member-${index + 1}`

  const createdAtValue =
    typeof raw.createdAt === "number"
      ? raw.createdAt
      : typeof raw.createdAt === "string"
        ? Date.parse(raw.createdAt)
        : undefined

  return {
    id,
    name,
    role: normalizeRole(raw.role),
    wing: typeof raw.wing === "string" ? raw.wing : "",
    bio: typeof raw.bio === "string" ? raw.bio : "",
    image: typeof raw.image === "string" && raw.image.trim() ? raw.image : "/placeholder-avatar.svg",
    isOverallCoordinator: Boolean(raw.isOverallCoordinator),
    isFacultyCoordinator: Boolean(raw.isFacultyCoordinator),
    socials: {
      github: typeof raw.socials?.github === "string" ? raw.socials.github : "",
      linkedin: typeof raw.socials?.linkedin === "string" ? raw.socials.linkedin : "",
      twitter: typeof raw.socials?.twitter === "string" ? raw.socials.twitter : "",
      instagram: typeof raw.socials?.instagram === "string" ? raw.socials.instagram : "",
    },
    createdAt: Number.isFinite(createdAtValue) ? createdAtValue : undefined,
  }
}

function sanitizeMembers(input: unknown): Member[] {
  if (!Array.isArray(input)) return []
  return input
    .map((entry, index) => normalizeMember(entry as RawMember, index))
    .filter((entry): entry is Member => Boolean(entry))
}

const DEFAULT_MEMBERS = sanitizeMembers(fallbackMembers)

export function useMembers() {
  const [members, setMembers] = useState<Member[]>(() => {
    try {
      if (typeof window === "undefined") return DEFAULT_MEMBERS
      const raw = localStorage.getItem(KEY)
      if (!raw) return DEFAULT_MEMBERS
      const data = sanitizeMembers(JSON.parse(raw))
      return data.length > 0 ? data : DEFAULT_MEMBERS
    } catch {
      return DEFAULT_MEMBERS
    }
  })

  useEffect(() => {
    let cancelled = false

    // Fetch fresh list
    const loadMembers = async () => {
      try {
        const res = await fetch(`/api/public/members`, { headers: { "Content-Type": "application/json" } })
        if (!res.ok) {
          if (!cancelled) {
            setMembers((prev) => (prev.length > 0 ? prev : DEFAULT_MEMBERS))
          }
          return
        }
        const data = sanitizeMembers(await res.json())
        if (!cancelled) {
          const next = data.length > 0 ? data : DEFAULT_MEMBERS
          setMembers(next)
          try {
            localStorage.setItem(KEY, JSON.stringify(next))
          } catch {}
        }
      } catch (e) {
        if (!cancelled) {
          setMembers((prev) => (prev.length > 0 ? prev : DEFAULT_MEMBERS))
        }
        console.error("Failed to load members", e)
      }
    }
    void loadMembers()

    // 3. Listen for admin updates via storage event
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && e.newValue) {
        try {
          const data = sanitizeMembers(JSON.parse(e.newValue))
          if (!cancelled) setMembers(data.length > 0 ? data : DEFAULT_MEMBERS)
        } catch {}
      }
    }
    const onFocus = () => { void loadMembers() }
    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage)
      window.addEventListener("focus", onFocus)
    }

    return () => {
      cancelled = true
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", onStorage)
        window.removeEventListener("focus", onFocus)
      }
    }
  }, [])

  return members
}
