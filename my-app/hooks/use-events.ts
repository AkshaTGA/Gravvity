"use client"

import { useEffect, useState } from "react"
import type { Event } from "@/lib/types"

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    let cancelled = false
    const KEY = 'gravity_events'

    // 1. Load cached events immediately
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(KEY)
        if (raw) {
          const data = JSON.parse(raw) as Event[]
          if (Array.isArray(data)) setEvents(data)
        }
      } catch {}
    }

    // 2. Fetch fresh events (public endpoint)
    const load = async () => {
      try {
        const res = await fetch(`/api/public/events`, { headers: { 'Content-Type': 'application/json' } })
        if (!res.ok) return
        const data = (await res.json()) as Event[]
        if (!cancelled) {
          setEvents(data)
          try {
            localStorage.setItem(KEY, JSON.stringify(data))
          } catch {}
        }
      } catch (e) {
        console.error('Failed to load events', e)
      }
    }
    void load()

    // 3. Listen for admin mutations propagated via storage
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && e.newValue) {
        try {
          const data = JSON.parse(e.newValue) as Event[]
          if (!cancelled && Array.isArray(data)) setEvents(data)
        } catch {}
      }
    }
    const onFocus = () => { void load() }
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

  return events
}
