"use client"

import { useEffect, useRef } from "react"

/* ───────────────────────────────────────────────────── *
 *  Animated CSS / Canvas globe with an orbiting moon    *
 * ───────────────────────────────────────────────────── */

export function CPGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    /* hi-dpi support */
    const size = 480
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const cx = size / 2
    const cy = size / 2
    const R = 160 // globe radius
    const moonR = 22
    const orbitR = 220
    let t = 0

    function draw() {
      ctx!.clearRect(0, 0, size, size)

      /* ── outer glow ── */
      const glow = ctx!.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 1.6)
      glow.addColorStop(0, "rgba(139, 92, 246, 0.12)")
      glow.addColorStop(0.5, "rgba(59, 130, 246, 0.06)")
      glow.addColorStop(1, "rgba(0,0,0,0)")
      ctx!.fillStyle = glow
      ctx!.fillRect(0, 0, size, size)

      /* ── globe body ── */
      const grad = ctx!.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R)
      grad.addColorStop(0, "rgba(139, 92, 246, 0.35)")
      grad.addColorStop(0.35, "rgba(79, 70, 229, 0.22)")
      grad.addColorStop(0.7, "rgba(30, 27, 75, 0.45)")
      grad.addColorStop(1, "rgba(10, 10, 30, 0.7)")
      ctx!.beginPath()
      ctx!.arc(cx, cy, R, 0, Math.PI * 2)
      ctx!.fillStyle = grad
      ctx!.fill()

      /* ── globe border / atmosphere ── */
      const atmo = ctx!.createRadialGradient(cx, cy, R - 2, cx, cy, R + 6)
      atmo.addColorStop(0, "rgba(139, 92, 246, 0.5)")
      atmo.addColorStop(0.5, "rgba(99, 102, 241, 0.25)")
      atmo.addColorStop(1, "rgba(99, 102, 241, 0)")
      ctx!.beginPath()
      ctx!.arc(cx, cy, R + 3, 0, Math.PI * 2)
      ctx!.strokeStyle = atmo as unknown as string
      ctx!.lineWidth = 6
      ctx!.stroke()

      /* ── longitude lines (rotating) ── */
      ctx!.save()
      ctx!.beginPath()
      ctx!.arc(cx, cy, R, 0, Math.PI * 2)
      ctx!.clip()

      const longCount = 8
      for (let i = 0; i < longCount; i++) {
        const angle = (i / longCount) * Math.PI + t * 0.3
        const offsetX = Math.cos(angle) * R
        ctx!.beginPath()
        ctx!.ellipse(cx + offsetX * 0.05, cy, Math.abs(Math.sin(angle)) * R, R, 0, 0, Math.PI * 2)
        ctx!.strokeStyle = `rgba(168, 162, 255, ${0.08 + Math.abs(Math.sin(angle)) * 0.12})`
        ctx!.lineWidth = 1
        ctx!.stroke()
      }

      /* ── latitude lines ── */
      const latCount = 5
      for (let i = 1; i < latCount; i++) {
        const yOff = ((i / latCount) * 2 - 1) * R * 0.85
        const latR = Math.sqrt(R * R - yOff * yOff)
        ctx!.beginPath()
        ctx!.ellipse(cx, cy + yOff, latR, latR * 0.25, 0, 0, Math.PI * 2)
        ctx!.strokeStyle = "rgba(168, 162, 255, 0.1)"
        ctx!.lineWidth = 0.8
        ctx!.stroke()
      }

      /* ── dot grid on surface ── */
      for (let lat = 0; lat < 12; lat++) {
        const phi = ((lat + 0.5) / 12) * Math.PI
        for (let lon = 0; lon < 20; lon++) {
          const theta = ((lon / 20) * Math.PI * 2) + t * 0.3
          const x3d = R * Math.sin(phi) * Math.cos(theta)
          const z3d = R * Math.sin(phi) * Math.sin(theta)
          const y3d = R * Math.cos(phi)

          if (z3d < 0) continue // back face cull

          const sx = cx + x3d
          const sy = cy + y3d
          const alpha = 0.08 + (z3d / R) * 0.22

          ctx!.beginPath()
          ctx!.arc(sx, sy, 1.2, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(196, 181, 253, ${alpha})`
          ctx!.fill()
        }
      }

      ctx!.restore()

      /* ── specular highlight ── */
      const spec = ctx!.createRadialGradient(cx - R * 0.35, cy - R * 0.35, 0, cx - R * 0.35, cy - R * 0.35, R * 0.6)
      spec.addColorStop(0, "rgba(255, 255, 255, 0.08)")
      spec.addColorStop(1, "rgba(255, 255, 255, 0)")
      ctx!.beginPath()
      ctx!.arc(cx, cy, R, 0, Math.PI * 2)
      ctx!.fillStyle = spec
      ctx!.fill()

      /* ── orbit ring (back half) ── */
      ctx!.save()
      ctx!.setLineDash([4, 6])
      ctx!.beginPath()
      ctx!.ellipse(cx, cy, orbitR, orbitR * 0.38, -0.2, Math.PI * 0.05, Math.PI * 0.95)
      ctx!.strokeStyle = "rgba(168, 162, 255, 0.1)"
      ctx!.lineWidth = 1
      ctx!.stroke()
      ctx!.setLineDash([])
      ctx!.restore()

      /* ── moon ── */
      const moonAngle = t * 0.7
      const moonX = cx + Math.cos(moonAngle) * orbitR
      const moonY = cy + Math.sin(moonAngle) * orbitR * 0.38
      const moonZ = Math.sin(moonAngle) // behind vs in front

      if (moonZ < 0) {
        drawMoon(ctx!, moonX, moonY, moonR * (0.85 + moonZ * 0.15), 0.5)
      }

      /* ── orbit ring (front half) ── */
      ctx!.save()
      ctx!.setLineDash([4, 6])
      ctx!.beginPath()
      ctx!.ellipse(cx, cy, orbitR, orbitR * 0.38, -0.2, Math.PI * 1.05, Math.PI * 1.95)
      ctx!.strokeStyle = "rgba(168, 162, 255, 0.15)"
      ctx!.lineWidth = 1
      ctx!.stroke()
      ctx!.setLineDash([])
      ctx!.restore()

      if (moonZ >= 0) {
        drawMoon(ctx!, moonX, moonY, moonR * (0.85 + moonZ * 0.15), 1)
      }

      /* ── orbiting particles ── */
      for (let i = 0; i < 5; i++) {
        const pAngle = moonAngle + (i / 5) * Math.PI * 2
        const pX = cx + Math.cos(pAngle) * (orbitR + Math.sin(t * 2 + i) * 8)
        const pY = cy + Math.sin(pAngle) * (orbitR * 0.38 + Math.cos(t * 2 + i) * 4)
        const pAlpha = 0.15 + Math.sin(t * 3 + i * 1.2) * 0.1
        ctx!.beginPath()
        ctx!.arc(pX, pY, 1.5, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(196, 181, 253, ${pAlpha})`
        ctx!.fill()
      }

      t += 0.012
      frameRef.current = requestAnimationFrame(draw)
    }

    function drawMoon(c: CanvasRenderingContext2D, x: number, y: number, r: number, opacity: number) {
      /* moon glow */
      const mg = c.createRadialGradient(x, y, 0, x, y, r * 3)
      mg.addColorStop(0, `rgba(199, 210, 254, ${0.2 * opacity})`)
      mg.addColorStop(1, "rgba(199, 210, 254, 0)")
      c.fillStyle = mg
      c.fillRect(x - r * 3, y - r * 3, r * 6, r * 6)

      /* moon body */
      const mbg = c.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r)
      mbg.addColorStop(0, `rgba(226, 232, 255, ${0.9 * opacity})`)
      mbg.addColorStop(0.5, `rgba(165, 180, 252, ${0.7 * opacity})`)
      mbg.addColorStop(1, `rgba(99, 102, 241, ${0.5 * opacity})`)
      c.beginPath()
      c.arc(x, y, r, 0, Math.PI * 2)
      c.fillStyle = mbg
      c.fill()

      /* craters */
      const craters = [
        { ox: -0.25, oy: -0.2, s: 0.22 },
        { ox: 0.2, oy: 0.15, s: 0.18 },
        { ox: -0.1, oy: 0.3, s: 0.14 },
      ]
      craters.forEach(({ ox, oy, s }) => {
        c.beginPath()
        c.arc(x + ox * r, y + oy * r, s * r, 0, Math.PI * 2)
        c.fillStyle = `rgba(79, 70, 229, ${0.25 * opacity})`
        c.fill()
      })

      /* specular */
      const ms = c.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r * 0.6)
      ms.addColorStop(0, `rgba(255, 255, 255, ${0.2 * opacity})`)
      ms.addColorStop(1, "rgba(255, 255, 255, 0)")
      c.beginPath()
      c.arc(x, y, r, 0, Math.PI * 2)
      c.fillStyle = ms
      c.fill()
    }

    draw()
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Soft ambient ring */}
      <div className="absolute w-96 h-96 rounded-full border border-purple-500/10" />
      <div className="absolute w-110 h-110 rounded-full border border-indigo-500/5" />
      {/* Canvas globe */}
      <canvas
        ref={canvasRef}
        className="relative z-10"
        style={{ width: 480, height: 480 }}
      />
    </div>
  )
}
