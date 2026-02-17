"use client";

import React, {
    useRef,
    useState,
    useCallback,
    useEffect,
} from "react";
import "./gravity-mode.css";

// ── Types ─────────────────────────────────────────────────
interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface PhysicsBody {
    id: number;
    el: HTMLElement;
    home: Rect;            // original position (viewport coords at capture time)
    x: number;
    y: number;
    vx: number;
    vy: number;
    w: number;
    h: number;
    snapped: boolean;
    dragging: boolean;
    settled: boolean;
    rotation: number;
    vr: number;            // angular velocity
}

// ── Constants ──────────────────────────────────────────────
const GRAVITY = 1800;        // px/s²
const BOUNCE = 0.45;
const FRICTION = 0.92;
const MAGNETIC_RADIUS = 80;  // px – snap threshold
const SNAP_SPEED = 0.25;     // lerp factor for magnetic pull

// ── Component ──────────────────────────────────────────────
export function GravityMode({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const bodiesRef = useRef<PhysicsBody[]>([]);
    const rafRef = useRef<number | null>(null);
    const lastTimeRef = useRef(0);
    const scrollYRef = useRef(0);

    const [active, setActive] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const dragRef = useRef<{
        bodyId: number;
        offsetX: number;
        offsetY: number;
    } | null>(null);

    // ── Capture home positions & start physics ──────────────
    const activate = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        scrollYRef.current = window.scrollY;

        // Collect direct children of the container
        const kids = Array.from(container.children) as HTMLElement[];
        const bodies: PhysicsBody[] = [];

        kids.forEach((el, i) => {
            if (el.classList.contains("gravity-btn") || el.classList.contains("gravity-ghost") || el.classList.contains("gravity-overlay-hint")) return;
            const rect = el.getBoundingClientRect();
            bodies.push({
                id: i,
                el,
                home: { x: rect.left, y: rect.top, w: rect.width, h: rect.height },
                x: rect.left,
                y: rect.top,
                vx: (Math.random() - 0.5) * 120,   // random horizontal drift
                vy: 0,
                w: rect.width,
                h: rect.height,
                snapped: false,
                dragging: false,
                settled: false,
                rotation: 0,
                vr: (Math.random() - 0.5) * 40,
            });

            // Fix the element in place
            el.style.position = "fixed";
            el.style.left = `${rect.left}px`;
            el.style.top = `${rect.top}px`;
            el.style.width = `${rect.width}px`;
            el.style.margin = "0";
            el.style.zIndex = "1000";
            el.style.transition = "none";
            el.classList.add("gravity-element");
        });

        bodiesRef.current = bodies;

        // Scroll to top so fixed elements are visible
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";

        // Start physics loop
        lastTimeRef.current = performance.now();
        rafRef.current = requestAnimationFrame(physicsTick);
    }, []);

    // ── Physics tick ────────────────────────────────────────
    const physicsTick = useCallback((now: number) => {
        const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05); // cap to 50ms
        lastTimeRef.current = now;

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        bodiesRef.current.forEach((b) => {
            if (b.snapped || b.dragging) return;

            // Gravity
            b.vy += GRAVITY * dt;

            // Apply velocity
            b.x += b.vx * dt;
            b.y += b.vy * dt;
            b.rotation += b.vr * dt;

            // Floor bounce
            if (b.y + b.h > vh) {
                b.y = vh - b.h;
                b.vy = -b.vy * BOUNCE;
                b.vx *= FRICTION;
                b.vr *= FRICTION;
                if (Math.abs(b.vy) < 15) {
                    b.vy = 0;
                    b.settled = true;
                }
            }

            // Wall bounces
            if (b.x < 0) {
                b.x = 0;
                b.vx = -b.vx * BOUNCE;
            }
            if (b.x + b.w > vw) {
                b.x = vw - b.w;
                b.vx = -b.vx * BOUNCE;
            }

            // Friction on settled bodies
            if (b.settled) {
                b.vx *= 0.95;
                b.vr *= 0.95;
                if (Math.abs(b.vx) < 0.5) b.vx = 0;
                if (Math.abs(b.vr) < 0.5) b.vr = 0;
            }

            // Update DOM
            b.el.style.left = `${b.x}px`;
            b.el.style.top = `${b.y}px`;
            b.el.style.transform = `rotate(${b.rotation}deg)`;
        });

        rafRef.current = requestAnimationFrame(physicsTick);
    }, []);

    // ── Deactivate: restore everything ──────────────────────
    const deactivate = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;

        bodiesRef.current.forEach((b) => {
            b.el.style.position = "";
            b.el.style.left = "";
            b.el.style.top = "";
            b.el.style.width = "";
            b.el.style.margin = "";
            b.el.style.zIndex = "";
            b.el.style.transition = "";
            b.el.style.transform = "";
            b.el.classList.remove("gravity-element", "dragging", "snapped", "just-snapped");
        });

        bodiesRef.current = [];
        document.body.style.overflow = "";
        document.body.style.height = "";
        window.scrollTo({ top: scrollYRef.current, behavior: "instant" as ScrollBehavior });
    }, []);

    // ── Toggle handler ──────────────────────────────────────
    const toggle = useCallback(() => {
        setActive((prev) => {
            if (!prev) {
                // Turning ON
                setTimeout(() => activate(), 50);
                setShowHint(true);
                setTimeout(() => setShowHint(false), 3200);
                return true;
            } else {
                // Turning OFF
                deactivate();
                return false;
            }
        });
    }, [activate, deactivate]);

    // ── Pointer events for dragging ─────────────────────────
    const handlePointerDown = useCallback(
        (e: React.PointerEvent) => {
            if (!active) return;
            const target = e.target as HTMLElement;

            // Find the matching body
            const body = bodiesRef.current.find(
                (b) => b.el === target || b.el.contains(target)
            );
            if (!body) return;

            e.preventDefault();
            body.dragging = true;
            body.snapped = false;
            body.el.classList.add("dragging");
            body.el.classList.remove("snapped", "just-snapped");

            // Stop physics on this body
            body.vx = 0;
            body.vy = 0;
            body.vr = 0;

            dragRef.current = {
                bodyId: body.id,
                offsetX: e.clientX - body.x,
                offsetY: e.clientY - body.y,
            };

            (e.target as HTMLElement).setPointerCapture(e.pointerId);
        },
        [active]
    );

    const handlePointerMove = useCallback(
        (e: React.PointerEvent) => {
            if (!dragRef.current) return;
            const body = bodiesRef.current.find(
                (b) => b.id === dragRef.current!.bodyId
            );
            if (!body) return;

            body.x = e.clientX - dragRef.current.offsetX;
            body.y = e.clientY - dragRef.current.offsetY;

            body.el.style.left = `${body.x}px`;
            body.el.style.top = `${body.y}px`;
            body.el.style.transform = `rotate(0deg)`;
            body.rotation = 0;

            // Check magnetic pull
            const cx = body.x + body.w / 2;
            const cy = body.y + body.h / 2;
            const hcx = body.home.x + body.home.w / 2;
            const hcy = body.home.y + body.home.h / 2;
            const dist = Math.sqrt((cx - hcx) ** 2 + (cy - hcy) ** 2);

            // Update ghost classes for all bodies
            bodiesRef.current.forEach((b) => {
                const ghostEl = document.getElementById(`gravity-ghost-${b.id}`);
                if (!ghostEl) return;
                if (b.id === body.id && dist < MAGNETIC_RADIUS * 1.5) {
                    ghostEl.classList.add("magnetic-active");
                } else if (b.id === body.id) {
                    ghostEl.classList.remove("magnetic-active");
                }
            });
        },
        []
    );

    const handlePointerUp = useCallback(
        (e: React.PointerEvent) => {
            if (!dragRef.current) return;
            const body = bodiesRef.current.find(
                (b) => b.id === dragRef.current!.bodyId
            );
            dragRef.current = null;
            if (!body) return;

            body.el.classList.remove("dragging");
            body.dragging = false;

            // Check for snap
            const cx = body.x + body.w / 2;
            const cy = body.y + body.h / 2;
            const hcx = body.home.x + body.home.w / 2;
            const hcy = body.home.y + body.home.h / 2;
            const dist = Math.sqrt((cx - hcx) ** 2 + (cy - hcy) ** 2);

            if (dist < MAGNETIC_RADIUS) {
                // SNAP!
                body.x = body.home.x;
                body.y = body.home.y;
                body.rotation = 0;
                body.snapped = true;
                body.vx = 0;
                body.vy = 0;
                body.vr = 0;

                body.el.style.transition = "left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.35s ease";
                body.el.style.left = `${body.home.x}px`;
                body.el.style.top = `${body.home.y}px`;
                body.el.style.transform = `rotate(0deg)`;
                body.el.classList.add("snapped", "just-snapped");

                const ghostEl = document.getElementById(`gravity-ghost-${body.id}`);
                if (ghostEl) {
                    ghostEl.classList.remove("magnetic-active");
                    ghostEl.classList.add("snapped");
                }

                setTimeout(() => {
                    body.el.classList.remove("just-snapped");
                    body.el.style.transition = "none";
                }, 450);
            } else {
                // Resume physics – slight gravity pull
                body.settled = false;
                body.vy = 50;

                const ghostEl = document.getElementById(`gravity-ghost-${body.id}`);
                if (ghostEl) {
                    ghostEl.classList.remove("magnetic-active", "snapped");
                }
            }

            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        },
        []
    );

    // ── Cleanup on unmount ──────────────────────────────────
    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            document.body.style.overflow = "";
            document.body.style.height = "";
        };
    }, []);

    return (
        <>
            {/* Ghost outlines (only when active) */}
            {active &&
                bodiesRef.current.map((b) => (
                    <div
                        key={`ghost-${b.id}`}
                        id={`gravity-ghost-${b.id}`}
                        className="gravity-ghost"
                        style={{
                            left: b.home.x,
                            top: b.home.y,
                            width: b.home.w,
                            height: b.home.h,
                        }}
                    />
                ))}

            {/* Hint banner */}
            {showHint && (
                <div className="gravity-overlay-hint">
                    🌍 Drag elements back to their ghost outlines to snap them in place!
                </div>
            )}

            {/* Wrapped children */}
            <div
                ref={containerRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                style={{ position: "relative" }}
            >
                {children}
            </div>

            {/* Toggle button */}
            <button
                className={`gravity-btn ${active ? "active" : ""}`}
                onClick={toggle}
                title={active ? "Disable Gravity Mode" : "Enable Gravity Mode"}
            >
                <span style={{ fontSize: 20 }}>{active ? "💥" : "🌍"}</span>
                {active ? "Reset" : "Gravity"}
            </button>
        </>
    );
}
