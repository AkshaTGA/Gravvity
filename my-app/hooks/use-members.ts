"use client"
import { useEffect, useState } from "react"
import type { Member } from "@/lib/types"

export function useMembers() {
  const [members, setMembers] = useState<Member[]>(() => {
    try {
      if (typeof window === 'undefined') return []
      const raw = localStorage.getItem('gravity_members')
      if (!raw) return []
      const data = JSON.parse(raw) as Member[]
      return Array.isArray(data) ? data : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    let cancelled = false
    const KEY = 'gravity_members'

    // Fetch fresh list
    const loadMembers = async () => {
      try {
        const res = await fetch(`/api/public/members`, { headers: { 'Content-Type': 'application/json' } })
        if (!res.ok) return
        const data = (await res.json()) as Member[]
        if (!cancelled) {
          setMembers(data)
          try {
            localStorage.setItem(KEY, JSON.stringify(data))
          } catch {}
        }
      } catch (e) {
        console.error('Failed to load members', e)
      }
    }
    void loadMembers()

    // 3. Listen for admin updates via storage event
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && e.newValue) {
        try {
          const data = JSON.parse(e.newValue) as Member[]
          if (!cancelled && Array.isArray(data)) setMembers(data)
        } catch {}
      }
    }
    const onFocus = () => { void loadMembers() }
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', onStorage)
      window.addEventListener('focus', onFocus)
    }

    return () => {
      cancelled = true
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', onStorage)
        window.removeEventListener('focus', onFocus)
      }
    }
  }, [])

  return members
}
