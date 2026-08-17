"use client"
import { useEffect, useState } from "react"
import type { Member } from "@/lib/types"
import { isVisibleWing } from "@/lib/wing-visibility"

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    let cancelled = false
    const KEY = 'gravity_members'

    // Never render the legacy localStorage snapshot. It can outlive database
    // changes (or even an entire deployment) when a public request fails.
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(KEY)
      } catch {}
    }

    // Fetch the database-backed list. The timestamp also bypasses intermediary
    // caches that do not correctly honor Cache-Control: no-store.
    const loadMembers = async () => {
      try {
        const res = await fetch(`/api/public/members?ts=${Date.now()}`, {
          cache: 'no-store',
        })
        if (!res.ok) throw new Error(`Members request failed: ${res.status}`)
        const data = (await res.json()) as Member[]
        if (!Array.isArray(data)) throw new Error('Invalid members response')
        if (!cancelled) setMembers(data.filter((member) => isVisibleWing(member.wing)))
      } catch (e) {
        console.error('Failed to load members', e)
      }
    }
    void loadMembers()

    // Admin mutations publish the newly confirmed server response here. This is
    // used only as a live update signal, never as a persisted page-load source.
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && e.newValue) {
        try {
          const data = JSON.parse(e.newValue) as Member[]
          if (!cancelled && Array.isArray(data)) {
            setMembers(data.filter((member) => isVisibleWing(member.wing)))
          }
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
