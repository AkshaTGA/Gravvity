"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  createElement,
  type CSSProperties,
} from "react";
import type { Body, Engine, MouseConstraint, Runner } from "matter-js";
import Matter from "matter-js";
import { MembersPageContent } from "@/components/members-page-content";
import { useMembers } from "@/hooks/use-members";
import type { Member } from "@/lib/types";
import { WebDHeroVisual } from "@/components/webd-hero-visual";
import "@/components/webd-vintage-fun-mode.css";
import "@/components/webd-hero-visual.css";

type Phase = "search" | "results" | "showcase";

type GravityItem = {
  id: string;
  kind: "logo" | "heading" | "member";
  label: string;
  member?: Member;
  roleLabel?: string;
};

type Slot = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Position = {
  x: number;
  y: number;
};

const SNAP_DISTANCE = 80;

// ── Multicolour Gravity! logo ──
const LOGO_LETTERS = [
  { char: "G", color: "#4285f4" },
  { char: "r", color: "#ea4335" },
  { char: "a", color: "#fbbc02" },
  { char: "v", color: "#4285f4" },
  { char: "i", color: "#34a853" },
  { char: "t", color: "#ea4335" },
  { char: "y", color: "#4285f4" },
  { char: "!", color: "#fbbc02" },
];

function GravityLogo({ style }: { style?: CSSProperties }) {
  return (
    <span className="webd-glogo" style={style}>
      {LOGO_LETTERS.map(({ char, color }, i) => (
        <span key={i} style={{ color }}>
          {char}
        </span>
      ))}
    </span>
  );
}

function useDesktopMode() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 768px)");
    const handleChange = () => setIsDesktop(media.matches);
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return isDesktop;
}

function calculateSlots(items: GravityItem[], width: number, height: number) {
  const slots = new Map<string, Slot>();
  const padding = 24;
  const gap = 16;
  const cardWidth = 290;
  const cardHeight = 220;
  // Marquee bar spans full width; UC heading is a fixed-width card beside it
  const logoWidth = Math.max(300, width - padding * 2);
  const logoHeight = 52;
  const headingWidth = Math.min(380, width - padding * 2);
  const headingHeight = 60;

  slots.set("logo", {
    x: padding,
    y: padding,
    width: logoWidth,
    height: logoHeight,
  });
  slots.set("heading", {
    x: padding,
    y: padding + logoHeight + 12,
    width: headingWidth,
    height: headingHeight,
  });

  const cards = items.filter((item) => item.kind === "member");
  const columns = Math.max(
    1,
    Math.floor((width - padding * 2 + gap) / (cardWidth + gap)),
  );
  const gridTop = padding + logoHeight + 12 + headingHeight + 16;

  cards.forEach((item, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);
    const x = padding + col * (cardWidth + gap);
    const y = gridTop + row * (cardHeight + gap);
    slots.set(item.id, { x, y, width: cardWidth, height: cardHeight });
  });

  const rows = Math.max(1, Math.ceil(cards.length / columns));
  const requiredHeight = gridTop + rows * (cardHeight + gap) + 140;
  return { slots, boardHeight: Math.max(requiredHeight, height - 80) };
}

function VintageFunOverlay({
  onClose,
  coordinators,
  members,
}: {
  onClose: () => void;
  coordinators: Member[];
  members: Member[];
}) {
  const [phase, setPhase] = useState<Phase>("search");
  const [searchText, setSearchText] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [searchState, setSearchState] = useState<
    "idle" | "success" | "404" | "loading"
  >("idle");
  const [physicsEnabled, setPhysicsEnabled] = useState(false);
  const [slots, setSlots] = useState<Map<string, Slot>>(new Map());
  const [positions, setPositions] = useState<Map<string, Position>>(new Map());
  const [snappedIds, setSnappedIds] = useState<Set<string>>(new Set());
  const [flashIds, setFlashIds] = useState<Set<string>>(new Set());
  const [boardHeight, setBoardHeight] = useState(700);
  const boardRef = useRef<HTMLDivElement | null>(null);

  const engineRef = useRef<Engine | null>(null);
  const runnerRef = useRef<Runner | null>(null);
  const mouseConstraintRef = useRef<MouseConstraint | null>(null);
  const bodiesRef = useRef<Map<string, Body>>(new Map());
  const boundaryBodiesRef = useRef<{
    floor: Body;
    leftWall: Body;
    rightWall: Body;
    ceiling: Body;
  } | null>(null);
  const snappedIdsRef = useRef<Set<string>>(new Set());
  const mouseVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const prevMousePosRef = useRef<{ x: number; y: number } | null>(null);

  const items = useMemo<GravityItem[]>(() => {
    const teamCards = [...coordinators, ...members].map((member) => ({
      id: `member-${member.id}`,
      kind: "member" as const,
      label: member.name,
      member,
      roleLabel: member.role === "coordinator" ? "Coordinator" : "Member",
    }));

    return [
      { id: "logo", kind: "logo", label: "WebD Logo" },
      {
        id: "heading",
        kind: "heading",
        label: "The WebD Wing - Center of Mass",
      },
      ...teamCards,
    ];
  }, [coordinators, members]);

  const teardownPhysics = useCallback(() => {
    const engine = engineRef.current;
    const runner = runnerRef.current;
    const mouseConstraint = mouseConstraintRef.current;

    if (engine && mouseConstraint) {
      Matter.World.remove(engine.world, mouseConstraint);
    }
    if (engine) {
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    }
    if (runner) {
      Matter.Runner.stop(runner);
    }

    engineRef.current = null;
    runnerRef.current = null;
    mouseConstraintRef.current = null;
    bodiesRef.current.clear();
    boundaryBodiesRef.current = null;
    setPhysicsEnabled(false);
  }, []);

  const resetLayoutToSlots = useCallback(
    (nextSlots: Map<string, Slot>) => {
      const nextPositions = new Map<string, Position>();
      items.forEach((item) => {
        const slot = nextSlots.get(item.id);
        if (!slot) return;
        nextPositions.set(item.id, { x: slot.x, y: slot.y });
      });
      setPositions(nextPositions);
      setSnappedIds(new Set());
      snappedIdsRef.current = new Set();
      setFlashIds(new Set());
    },
    [items],
  );

  const recalculateLayout = useCallback(() => {
    const board = boardRef.current;
    if (!board) return;
    const rect = board.getBoundingClientRect();
    const next = calculateSlots(items, rect.width, rect.height);
    setSlots(next.slots);
    setBoardHeight(next.boardHeight);
    if (!physicsEnabled) {
      resetLayoutToSlots(next.slots);
    }
  }, [items, physicsEnabled, resetLayoutToSlots]);

  useEffect(() => {
    const timer = window.setTimeout(recalculateLayout, 0);
    return () => window.clearTimeout(timer);
  }, [recalculateLayout]);

  useEffect(() => {
    const onResize = () => {
      recalculateLayout();
      const board = boardRef.current;
      const boundaryBodies = boundaryBodiesRef.current;
      if (!board || !boundaryBodies) return;
      const rect = board.getBoundingClientRect();
      const thickness = 200;
      Matter.Body.setPosition(boundaryBodies.floor, {
        x: rect.width / 2,
        y: rect.height + thickness / 2,
      });
      Matter.Body.setVertices(
        boundaryBodies.floor,
        Matter.Bodies.rectangle(
          rect.width / 2,
          rect.height + thickness / 2,
          rect.width,
          thickness,
        ).vertices,
      );
      Matter.Body.setPosition(boundaryBodies.leftWall, {
        x: -thickness / 2,
        y: rect.height / 2,
      });
      Matter.Body.setVertices(
        boundaryBodies.leftWall,
        Matter.Bodies.rectangle(
          -thickness / 2,
          rect.height / 2,
          thickness,
          rect.height * 5,
        ).vertices,
      );
      Matter.Body.setPosition(boundaryBodies.rightWall, {
        x: rect.width + thickness / 2,
        y: rect.height / 2,
      });
      Matter.Body.setVertices(
        boundaryBodies.rightWall,
        Matter.Bodies.rectangle(
          rect.width + thickness / 2,
          rect.height / 2,
          thickness,
          rect.height * 5,
        ).vertices,
      );
      Matter.Body.setPosition(boundaryBodies.ceiling, {
        x: rect.width / 2,
        y: -thickness / 2,
      });
      Matter.Body.setVertices(
        boundaryBodies.ceiling,
        Matter.Bodies.rectangle(
          rect.width / 2,
          -thickness / 2,
          rect.width,
          thickness,
        ).vertices,
      );
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [recalculateLayout]);

  useEffect(() => {
    return () => teardownPhysics();
  }, [teardownPhysics]);

  const playSnapSound = useCallback(() => {
    if (typeof window === "undefined") return;
    const AudioContextClass =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.frequency.setValueAtTime(840, ctx.currentTime);
    oscillator.type = "square";
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.12);
    window.setTimeout(() => void ctx.close(), 180);
  }, []);

  const snapBodyToGhost = useCallback(
    (itemId: string, body: Body) => {
      const slot = slots.get(itemId);
      if (!slot) return false;
      const targetX = slot.x + slot.width / 2;
      const targetY = slot.y + slot.height / 2;
      const dx = body.position.x - targetX;
      const dy = body.position.y - targetY;
      const distance = Math.hypot(dx, dy);

      if (distance > SNAP_DISTANCE) return false;

      Matter.Body.setVelocity(body, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(body, 0);
      Matter.Body.setAngle(body, 0);
      Matter.Body.setPosition(body, { x: targetX, y: targetY });
      Matter.Body.setStatic(body, true);

      setPositions((prev) => {
        const next = new Map(prev);
        next.set(itemId, { x: slot.x, y: slot.y });
        return next;
      });

      setSnappedIds((prev) => {
        const next = new Set(prev);
        next.add(itemId);
        snappedIdsRef.current = next;
        return next;
      });

      setFlashIds((prev) => {
        const next = new Set(prev);
        next.add(itemId);
        return next;
      });
      window.setTimeout(() => {
        setFlashIds((prev) => {
          const next = new Set(prev);
          next.delete(itemId);
          return next;
        });
      }, 280);

      playSnapSound();
      return true;
    },
    [playSnapSound, slots],
  );

  const startGravity = useCallback(() => {
    const board = boardRef.current;
    if (!board || physicsEnabled) return;

    const rect = board.getBoundingClientRect();
    // Default gravity scale is 0.001. 0.002 makes it a bit heavier/faster
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1, scale: 0.002 },
      positionIterations: 8,
      velocityIterations: 6,
    });
    const runner = Matter.Runner.create();

    // Much thicker walls to prevent passing through at high speeds
    const thickness = 200;

    const commonWallOptions = {
      isStatic: true,
      restitution: 0.8, // Bouncy walls!
      friction: 0.5,
    };

    const floor = Matter.Bodies.rectangle(
      rect.width / 2,
      rect.height + thickness / 2,
      rect.width,
      thickness,
      commonWallOptions,
    );
    const leftWall = Matter.Bodies.rectangle(
      -thickness / 2,
      rect.height / 2,
      thickness,
      rect.height * 5,
      commonWallOptions,
    );
    const rightWall = Matter.Bodies.rectangle(
      rect.width + thickness / 2,
      rect.height / 2,
      thickness,
      rect.height * 5,
      commonWallOptions,
    );
    const ceiling = Matter.Bodies.rectangle(
      rect.width / 2,
      -thickness / 2,
      rect.width,
      thickness,
      commonWallOptions,
    );

    boundaryBodiesRef.current = { floor, leftWall, rightWall, ceiling };
    Matter.World.add(engine.world, [floor, leftWall, rightWall, ceiling]);

    const newBodies = new Map<string, Body>();
    items.forEach((item) => {
      const slot = slots.get(item.id);
      if (!slot) return;
      // Bouncier cards, higher air friction
      const body = Matter.Bodies.rectangle(
        slot.x + slot.width / 2,
        slot.y + slot.height / 2,
        slot.width,
        slot.height,
        {
          restitution: 0.6,
          friction: 0.3,
          frictionAir: 0.02,
          density: item.kind === "member" ? 0.002 : 0.0015,
        },
      );
      newBodies.set(item.id, body);
    });

    bodiesRef.current = newBodies;
    Matter.World.add(engine.world, Array.from(newBodies.values()));

    const mouse = Matter.Mouse.create(board);
    // Prevent Matter.js from hijacking scroll events on the board
    const mx = mouse as unknown as {
      mousewheel: EventListenerOrEventListenerObject;
    };
    mouse.element.removeEventListener("mousewheel", mx.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mx.mousewheel);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.35,
        damping: 0.0,
        render: { visible: false },
      },
    });
    Matter.World.add(engine.world, mouseConstraint);
    mouseConstraintRef.current = mouseConstraint;

    Matter.Events.on(mouseConstraint, "enddrag", (event) => {
      const dragEvent = event as typeof event & { body?: Body };
      if (!dragEvent.body) return;
      const itemId = Array.from(newBodies.entries()).find(
        ([, body]) => body.id === dragEvent.body?.id,
      )?.[0];
      if (!itemId) return;
      // Try snap first; if not close enough, apply throw velocity from tracked mouse delta
      const snapped = snapBodyToGhost(itemId, dragEvent.body);
      if (!snapped) {
        const vel = mouseVelocityRef.current;
        const MAX_VEL = 25;
        const throwX = Math.max(-MAX_VEL, Math.min(MAX_VEL, vel.x * 12));
        const throwY = Math.max(-MAX_VEL, Math.min(MAX_VEL, vel.y * 12));

        Matter.Body.setVelocity(dragEvent.body, {
          x: throwX,
          y: throwY,
        });
        Matter.Body.setAngularVelocity(
          dragEvent.body,
          (Math.random() - 0.5) * 0.2,
        );
      }
    });

    Matter.Events.on(engine, "afterUpdate", () => {
      // Track mouse velocity for throw impulse
      const curPos = mouse.position;
      if (mouseConstraintRef.current?.body && prevMousePosRef.current) {
        mouseVelocityRef.current = {
          x: curPos.x - prevMousePosRef.current.x,
          y: curPos.y - prevMousePosRef.current.y,
        };
      } else {
        mouseVelocityRef.current = { x: 0, y: 0 };
      }
      prevMousePosRef.current = { x: curPos.x, y: curPos.y };

      // Boundary safety check
      newBodies.forEach((body) => {
        if (body.isStatic) return;
        const bX = body.position.x;
        const bY = body.position.y;

        let reset = false;
        let newX = bX;
        let newY = bY;

        const w = rect.width;
        const h = rect.height;
        const Pad = 30;

        if (bX < -Pad) {
          newX = Pad;
          reset = true;
          Matter.Body.setVelocity(body, { x: 5, y: body.velocity.y });
        }
        if (bX > w + Pad) {
          newX = w - Pad;
          reset = true;
          Matter.Body.setVelocity(body, { x: -5, y: body.velocity.y });
        }
        if (bY < -Pad) {
          newY = Pad;
          reset = true;
          Matter.Body.setVelocity(body, { x: body.velocity.x, y: 5 });
        }
        if (bY > h + Pad) {
          newY = h - Pad;
          reset = true;
          Matter.Body.setVelocity(body, { x: body.velocity.x, y: -5 });
        }

        if (reset) {
          Matter.Body.setPosition(body, { x: newX, y: newY });
        }
      });

      setPositions((prev) => {
        const next = new Map(prev);
        newBodies.forEach((body, id) => {
          if (snappedIdsRef.current.has(id)) return;
          const slot = slots.get(id);
          if (!slot) return;
          next.set(id, {
            x: body.position.x - slot.width / 2,
            y: body.position.y - slot.height / 2,
          });
        });
        return next;
      });
    });

    engineRef.current = engine;
    runnerRef.current = runner;
    setPhysicsEnabled(true);
    Matter.Runner.run(runner, engine);
  }, [items, physicsEnabled, slots, snapBodyToGhost, snappedIds]);

  const resetGravity = useCallback(() => {
    teardownPhysics();
    resetLayoutToSlots(slots);
  }, [resetLayoutToSlots, slots, teardownPhysics]);

  const handleSearch = useCallback(() => {
    const normalizedQuery = searchText.trim();
    if (!normalizedQuery) return; // Prevent empty search
    const value = normalizedQuery.toLowerCase();
    setSubmittedQuery(normalizedQuery);
    setPhase("results");
    if (value === "gravity") {
      setSearchState("success");
      return;
    }
    setSearchState(Math.random() > 0.5 ? "404" : "loading");
  }, [searchText]);

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        teardownPhysics();
        onClose();
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose, teardownPhysics]);

  return (
    <div className="fixed inset-0 z-[9999] webd-fun-overlay">
      {/* Fixed exit button – Win98 style, excluded from physics */}
      {/* Fixed exit button – only for search/results phases; showcase phase has it in toolbar */}
      {phase !== "showcase" ? (
        <button
          onClick={() => {
            teardownPhysics();
            onClose();
          }}
          className="webd-back-btn"
          style={{ position: "fixed", right: 10, top: 6, zIndex: 10000 }}
        >
          [X] EXIT
        </button>
      ) : null}

      {/* ===================== PHASE: SEARCH HOMEPAGE ===================== */}
      {phase === "search" ? (
        <section className="webd-fun-overlay h-full w-full overflow-auto bg-white">
          {/* Centered home layout */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100%",
              paddingBottom: 80,
            }}
          >
            {/* Multicolour logo */}
            <GravityLogo
              style={{ fontSize: 96, marginBottom: 10, display: "block" }}
            />

            <div
              style={{
                background: "#eee",
                padding: "10px 20px",
                border: "1px solid #ccc",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  marginBottom: 4,
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Search the web using Gravity!
              </div>

              {/* Search bar row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                  width: "100%",
                  maxWidth: 540,
                }}
              >
                <input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  aria-label="Gravity Search"
                  className="webd-search-input"
                  style={{ flex: 1, width: 300 }}
                />
              </div>

              {/* Buttons row */}
              <div
                style={{ display: "flex", gap: 8, justifyContent: "center" }}
              >
                <button className="webd-btn" onClick={handleSearch}>
                  Gravity Search
                </button>
                <button className="webd-btn" onClick={handleSearch}>
                  I&apos;m Feeling Lucky
                </button>
              </div>
            </div>

            {/* Tiny subtitle */}
            <p
              style={{
                fontSize: 11,
                color: "#000",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <a
                href="#"
                style={{ color: "#0000cc", textDecoration: "underline" }}
              >
                Help!
              </a>{" "}
              &nbsp;|&nbsp;
              <a
                href="#"
                style={{ color: "#0000cc", textDecoration: "underline" }}
              >
                About Gravity!
              </a>{" "}
              &nbsp;|&nbsp;
              <a
                href="#"
                style={{ color: "#0000cc", textDecoration: "underline" }}
              >
                Company Info
              </a>{" "}
              &nbsp;|&nbsp;
              <a
                href="#"
                style={{ color: "#0000cc", textDecoration: "underline" }}
              >
                Gravity!
              </a>
            </p>
            <p style={{ fontSize: 10, color: "#666", marginTop: 10 }}>
              Index contains ~∞ member cards (soon to be even bigger)
            </p>
          </div>

          {/* Bottom copyright bar */}
          <div
            style={{
              borderTop: "1px solid #ccc",
              textAlign: "center",
              padding: "6px 0",
              fontSize: 11,
              color: "#555",
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              background: "#fff",
            }}
          >
            Copyright ©2025 Gravity Technical Society
          </div>
        </section>
      ) : null}

      {/* ===================== PHASE: RESULTS PAGE ===================== */}
      {phase === "results" ? (
        <section className="webd-fun-overlay h-full w-full overflow-auto bg-white">
          {/* Top bar – logo + search input */}
          <div
            style={{
              borderBottom: "1px solid #ccc",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <button
              onClick={() => setPhase("search")}
              aria-label="Back to Gravity Search"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                lineHeight: 1,
              }}
            >
              <GravityLogo style={{ fontSize: 36 }} />
            </button>
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="webd-search-input"
              style={{ width: 340 }}
            />
            <button
              className="webd-btn"
              onClick={handleSearch}
              style={{ minWidth: "auto", padding: "4px 12px" }}
            >
              Search our site
            </button>
          </div>

          {/* Results body */}
          <div style={{ maxWidth: 700, padding: "14px 20px" }}>
            {/* Results count bar */}
            <div className="webd-results-bar">
              Searched <b>Gravity Search</b> pages for{" "}
              <b>{submittedQuery || "..."}.</b>
            </div>

            {searchState === "success" ? (
              <div style={{ marginTop: 4 }}>
                <p
                  style={{
                    fontSize: 13,
                    color: "#cc0000",
                    fontStyle: "italic",
                    marginBottom: 12,
                  }}
                >
                  Did you mean:{" "}
                  <b
                    style={{
                      color: "#0000cc",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    The Best Technical Society of IIIT Allahabad
                  </b>
                </p>
                <button
                  className="webd-result-title"
                  onClick={() => {
                    setPhase("showcase");
                    window.setTimeout(() => recalculateLayout(), 0);
                  }}
                >
                  The WebD Wing &ndash; Center of Mass
                </button>
                <p className="webd-result-url">
                  gravity.dev/webd/center-of-mass –{" "}
                  <span className="webd-similar">Similar pages</span>
                </p>
                <p className="webd-result-desc">
                  The <b>Web Development</b> wing of the Gravity Technical
                  Society. Meet the coordinators and members driving the digital
                  frontier. Click to open the interactive team showcase &mdash;
                  or trigger <b>gravity</b> and reconstruct the layout yourself.
                </p>
              </div>
            ) : null}

            {searchState === "404" ? (
              <p style={{ color: "#eb2626ff", fontSize: 13 }}>
                Your search &ndash; <b>{submittedQuery}</b> &ndash; did not
                match any Gravity pages.
                <br />
                <br />
                <i>
                  Did you mean: <b>gravity</b>?
                </i>
              </p>
            ) : null}

            {searchState === "loading" ? (
              <p style={{ fontSize: 13, color: "#333" }}>
                Loading results<span className="webd-dot-loader">...</span>
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ===================== PHASE: SHOWCASE (GEOCITIES) ===================== */}
      {phase === "showcase" ? (
        <section
          style={{
            height: "100%",
            width: "100%",
            overflowY: "auto",
            background: "#000066",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Win98 toolbar */}
          <div className="webd-gc-toolbar">
            <button
              onClick={() => setPhase("results")}
              className="webd-gc-btn"
              style={{ padding: "2px 8px", fontSize: 10, minWidth: 0 }}
            >
              ← Back
            </button>
            <span className="webd-gc-toolbar-title">
              ★ WebD Wing &mdash; Center of Mass &mdash; Gravity Technical
              Society ★
            </span>
            <button
              className="webd-gc-btn webd-gc-btn-primary"
              onClick={startGravity}
              disabled={physicsEnabled}
            >
              ⚡ INITIATE GRAVITY
            </button>
            <button className="webd-gc-btn" onClick={resetGravity}>
              ↺ Reset Page
            </button>
            <button
              className="webd-gc-btn"
              style={{
                marginLeft: "auto",
                background: "#800000",
                color: "#ffffff",
                borderColor: "#ff4444",
                fontWeight: "bold",
              }}
              onClick={() => {
                teardownPhysics();
                onClose();
              }}
            >
              ✕ EXIT
            </button>
          </div>

          {/* Physics / Geocities board */}
          <div
            ref={boardRef}
            className="webd-gc-board"
            style={{ flex: 1, minHeight: `${boardHeight}px` }}
          >
            {/* Ghost scars – shown while physics is active */}
            {physicsEnabled
              ? items.map((item) => {
                  const slot = slots.get(item.id);
                  if (!slot) return null;
                  return (
                    <div
                      key={`ghost-${item.id}`}
                      className="webd-gc-ghost"
                      style={{
                        left: slot.x,
                        top: slot.y,
                        width: slot.width,
                        height: slot.height,
                        opacity: snappedIds.has(item.id) ? 0.1 : 0.7,
                      }}
                    />
                  );
                })
              : null}

            {/* Draggable / falling elements */}
            {items.map((item) => {
              const slot = slots.get(item.id);
              const pos = positions.get(item.id);
              if (!slot || !pos) return null;

              const isSnappedFlash = flashIds.has(item.id);
              const isLocked = snappedIds.has(item.id);
              const cursor = physicsEnabled && !isLocked ? "grab" : "default";
              const snapCls = isSnappedFlash ? "gc-snapped" : "";
              // Read live rotation angle from the physics body for tumbling effect
              const physBody = physicsEnabled
                ? bodiesRef.current.get(item.id)
                : null;
              const angle =
                physicsEnabled && physBody && !isLocked ? physBody.angle : 0;

              return (
                <div
                  key={item.id}
                  style={
                    {
                      position: "absolute",
                      width: slot.width,
                      height: slot.height,
                      transform: `translate3d(${pos.x}px,${pos.y}px,0) rotate(${angle}rad)`,
                      cursor,
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      touchAction: "none",
                    } as React.CSSProperties
                  }
                >
                  {/* Prevent any image dragging ghost and selection */}
                  <div
                    style={{
                      pointerEvents: physicsEnabled ? "none" : "auto",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {/* ── Marquee banner (logo item) ── */}
                    {item.kind === "logo" ? (
                      <div className={`webd-gc-marquee-card ${snapCls}`}>
                        {createElement(
                          "marquee",
                          { scrollamount: "4", style: { width: "100%" } },
                          createElement(
                            "span",
                            { className: "webd-gc-marquee-text" },
                            "★ Welcome to the WebD Wing ★ Construction in Progress ★ Gravity Technical Society ★ Est. 2024 ★ Best viewed in 800x600 ★",
                          ),
                        )}
                      </div>
                    ) : null}

                    {/* ── Under-Construction heading card ── */}
                    {item.kind === "heading" ? (
                      <div className={`webd-gc-uc-card ${snapCls}`}>
                        <span className="webd-gc-uc-title">
                          ⚠️ UNDER CONSTRUCTION ⚠️
                          <br />
                          WebD Wing &mdash; Center of Mass
                        </span>
                        <span className="webd-gc-uc-sub webd-blink">
                          * Page last updated: 1999 *
                        </span>
                      </div>
                    ) : null}

                    {/* ── Member fieldset card ── */}
                    {item.kind === "member" && item.member
                      ? (() => {
                          const m = item.member;
                          const socials = m.socials ?? {};
                          const socialLinks = [
                            socials.linkedin
                              ? { label: "LinkedIn", href: socials.linkedin }
                              : null,
                            socials.github
                              ? { label: "GitHub", href: socials.github }
                              : null,
                            socials.twitter
                              ? { label: "Twitter", href: socials.twitter }
                              : null,
                            socials.instagram
                              ? { label: "Instagram", href: socials.instagram }
                              : null,
                          ].filter(Boolean) as {
                            label: string;
                            href: string;
                          }[];

                          return (
                            <fieldset className={`webd-gc-fieldset ${snapCls}`}>
                              <legend className="webd-gc-legend">
                                {m.name}
                                <span
                                  className={
                                    item.roleLabel === "Coordinator"
                                      ? "webd-gc-role-coord"
                                      : "webd-gc-role-member"
                                  }
                                >
                                  {item.roleLabel}
                                </span>
                              </legend>

                              <div className="webd-gc-card-body">
                                <img
                                  src={m.image || "/gravity-logo.png"}
                                  alt={m.name}
                                  className="webd-gc-photo"
                                />
                                <div className="webd-gc-info">
                                  <span className="webd-gc-wing">{m.wing}</span>
                                  <span className="webd-gc-bio">
                                    {m.bio || "Member of the WebD Wing."}
                                  </span>
                                </div>
                              </div>

                              {socialLinks.length > 0 ? (
                                <div className="webd-gc-socials">
                                  {socialLinks.map((s, idx) => (
                                    <span
                                      key={s.href}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 5,
                                      }}
                                    >
                                      {idx > 0 ? (
                                        <span className="webd-gc-socials-sep">
                                          ·
                                        </span>
                                      ) : null}
                                      <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                          pointerEvents: "auto",
                                          userSelect: "auto",
                                        }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          // If dragging, we might want to prevent click, but standard behavior usually handles this.
                                          // The user specifically asked for them to be clickable.
                                        }}
                                        onMouseDown={(e) => e.stopPropagation()} // Prevent drag start on the link itself
                                      >
                                        {s.label}
                                      </a>
                                    </span>
                                  ))}
                                </div>
                              ) : null}
                            </fieldset>
                          );
                        })()
                      : null}
                  </div>
                </div>
              );
            })}

            {/* Hit counter – bottom of the board, inside the board div */}
            <div
              className="webd-gc-counter"
              style={{ position: "absolute", bottom: 20, left: 0, right: 0 }}
            >
              <span>You are visitor #</span>
              <span className="webd-gc-counter-digits">001337</span>
              <span> &mdash; Thanks for stopping by!</span>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export function WebDMembersPage() {
  const [funModeOpen, setFunModeOpen] = useState(false);
  const isDesktop = useDesktopMode();
  const members = useMembers();

  const filtered = useMemo(
    () =>
      members.filter(
        (member) =>
          member.wing === "Web Development" &&
          !member.isOverallCoordinator &&
          !member.isFacultyCoordinator,
      ),
    [members],
  );

  const coordinators = useMemo(
    () => filtered.filter((member) => member.role === "coordinator"),
    [filtered],
  );
  const regularMembers = useMemo(
    () => filtered.filter((member) => member.role === "member"),
    [filtered],
  );

  return (
    <>
      <MembersPageContent
        wingFilter="Web Development"
        topBanner={
          isDesktop ? (
            <div className="webd-hero-split hidden md:flex">
              {/* Left: animated web development visual */}
              <div className="webd-hero-split-left">
                <WebDHeroVisual />
              </div>

              {/* Right: fun mode banner */}
              <div className="webd-hero-split-right">
                <div className="webd-designer-banner flex">
                  <div className="webd-scan-line"></div>
                  <div className="webd-db-content">
                    <div className="webd-db-title">
                      <span>✨</span> SYSTEM OVERRIDE AVAILABLE
                    </div>
                    <div className="webd-db-sub">
                      gravity_module.exe found // click to initialize vintage
                      mode
                    </div>
                  </div>
                  <button
                    className="webd-db-btn"
                    onClick={() => setFunModeOpen(true)}
                  >
                    INITIALIZE
                  </button>
                </div>
              </div>
            </div>
          ) : null
        }
      />

      {isDesktop ? (
        funModeOpen ? (
          <VintageFunOverlay
            onClose={() => setFunModeOpen(false)}
            coordinators={coordinators}
            members={regularMembers}
          />
        ) : null
      ) : null}
    </>
  );
}
