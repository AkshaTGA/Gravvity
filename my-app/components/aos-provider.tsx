"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import AOS from "aos"

/**
 * AOSProvider initializes Animate On Scroll (AOS) once on the client.
 * Place this near the root (e.g. inside `app/layout.tsx` body) so data-aos attributes work anywhere.
 */
export function AOSProvider() {
  const pathname = usePathname()

  // Init AOS (repeatable animations)
  useEffect(() => {
    // If the global light-mode flag is present, reduce AOS durations to be lighter.
    const isLight = document.documentElement.dataset.light === '1'
    AOS.init({
      duration: isLight ? 360 : 700,
      easing: "ease-out-quart",
      once: false,
      offset: 40,
      mirror: false,
      anchorPlacement: "top-bottom",
      disable: false, // Ensure AOS is never disabled
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
    })

    // Force multiple refreshes to ensure animations are detected
    const t1 = setTimeout(() => AOS.refresh(), 50)
    const t2 = setTimeout(() => AOS.refresh(), 150)
    const t3 = setTimeout(() => AOS.refresh(), 300)
    const onLoad = () => {
      AOS.refresh()
      // Additional refresh after images load
      setTimeout(() => AOS.refresh(), 100)
    }
    window.addEventListener("load", onLoad)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      window.removeEventListener("load", onLoad)
    }
  }, [])

  useEffect(() => {
    // Refresh immediately on route change, then again after paint
    AOS.refresh()
    const id = setTimeout(() => AOS.refresh(), 100)
    return () => clearTimeout(id)
  }, [pathname])

  useEffect(() => {
    const onFocus = () => AOS.refresh()
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        AOS.refresh()
        setTimeout(() => AOS.refresh(), 50)
      }
    }
    const onResize = () => AOS.refresh()
    
    window.addEventListener("focus", onFocus)
    window.addEventListener("resize", onResize, { passive: true })
    document.addEventListener("visibilitychange", onVisibility)
    
    return () => {
      window.removeEventListener("focus", onFocus)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return null
}
