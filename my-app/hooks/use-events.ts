"use client"

import { useEffect, useState } from "react"
import type { Event } from "@/lib/types"

export function useEvents() {
  const [events, setEvents] = useState<Event[]>(() => {
    try {
      if (typeof window === 'undefined') return []
      const raw = localStorage.getItem('gravity_events')
      if (!raw) return []
      const data = JSON.parse(raw) as Event[]
      return Array.isArray(data) ? data : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    let cancelled = false
    const KEY = 'gravity_events'

    // Fetch fresh events (public endpoint)
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
