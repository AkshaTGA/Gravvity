'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import MagicButton from '@/components/magic-button';

function useWebEffect() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [size, setSize] = useState({ w: 400, h: 300 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return { ref, pos, hovering, setHovering, size, onMove };
}

const NODES = [
  { x: 10, y: 15 },
  { x: 30, y: 8 },
  { x: 50, y: 20 },
  { x: 70, y: 12 },
  { x: 90, y: 18 },
  { x: 15, y: 35 },
  { x: 40, y: 40 },
  { x: 65, y: 32 },
  { x: 85, y: 38 },
  { x: 8, y: 55 },
  { x: 25, y: 60 },
  { x: 55, y: 52 },
  { x: 75, y: 58 },
  { x: 92, y: 50 },
  { x: 20, y: 78 },
  { x: 45, y: 72 },
  { x: 60, y: 82 },
  { x: 80, y: 75 },
  { x: 95, y: 85 },
  { x: 12, y: 92 },
  { x: 35, y: 88 },
  { x: 68, y: 95 },
  { x: 88, y: 90 },
];

const CONNS: { f: number; t: number }[] = [];
NODES.forEach((a, i) =>
  NODES.forEach((b, j) => {
    if (i < j && Math.hypot(a.x - b.x, a.y - b.y) < 30) {
      CONNS.push({ f: i, t: j });
    }
  })
);

function NetworkBg({
  pos,
  hovering,
  size,
}: {
  pos: { x: number; y: number };
  hovering: boolean;
  size: { w: number; h: number };
}) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute -top-[20%] -right-[20%] w-[70%] h-[70%] rounded-full opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at center,rgba(139,92,246,.2) 0%,rgba(124,58,237,.08) 40%,transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-[15%] -left-[15%] w-[60%] h-[60%] rounded-full opacity-25"
        style={{
          background:
            'radial-gradient(ellipse at center,rgba(167,139,250,.18) 0%,rgba(139,92,246,.06) 45%,transparent 70%)',
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: hovering ? 0.86 : 0.28,
          transition: 'opacity .5s ease',
        }}
      >
        {CONNS.map((c, i) => {
          const a = NODES[c.f];
          const b = NODES[c.t];
          const mx = ((a.x + b.x) / 200) * size.w;
          const my = ((a.y + b.y) / 200) * size.h;
          const d = Math.hypot(pos.x - mx, pos.y - my);
          const t = hovering ? Math.max(0, 1 - d / 120) : 0;

          return (
            <line
              key={i}
              x1={`${a.x}%`}
              y1={`${a.y}%`}
              x2={`${b.x}%`}
              y2={`${b.y}%`}
              stroke={`rgba(167,139,250,${0.05 + t * 0.3})`}
              strokeWidth={0.55 + t * 0.9}
            />
          );
        })}

        {NODES.map((n, i) => {
          const x = (n.x / 100) * size.w;
          const y = (n.y / 100) * size.h;
          const d = Math.hypot(pos.x - x, pos.y - y);
          const t = hovering ? Math.max(0, 1 - d / 140) : 0;

          return (
            <circle
              key={i}
              cx={`${n.x}%`}
              cy={`${n.y}%`}
              r={1.3 + t * 1.9}
              fill={`rgba(167,139,250,${0.2 + t * 0.7})`}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const join = useWebEffect();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative z-10 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div
            ref={join.ref}
            className="card-glow overflow-hidden slide-in-up relative rounded-2xl"
            onMouseMove={join.onMove}
            onMouseEnter={() => join.setHovering(true)}
            onMouseLeave={() => join.setHovering(false)}
          >
            <NetworkBg
              pos={join.pos}
              hovering={join.hovering}
              size={join.size}
            />

            <div className="relative z-10 flex flex-col md:flex-row">
              <div className="md:w-[30%] w-full flex items-center justify-center p-8 md:p-6 min-h-55">
                <svg
                  width="160"
                  height="160"
                  viewBox="0 0 160 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="rgba(167,139,250,0.4)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="12 8 4 8"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 80 80"
                      to="360 80 80"
                      dur="25s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx="80"
                    cy="80"
                    r="54"
                    stroke="rgba(138,232,255,0.45)"
                    strokeWidth="1.2"
                    fill="none"
                    strokeDasharray="6 10"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="360 80 80"
                      to="0 80 80"
                      dur="18s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx="80"
                    cy="80"
                    r="42"
                    stroke="rgba(167,139,250,0.35)"
                    strokeWidth="1"
                    fill="none"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 80 80"
                      to="360 80 80"
                      dur="30s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx="80"
                    cy="80"
                    r="30"
                    fill="rgba(167,139,250,0.08)"
                  />
                  <rect
                    x="58"
                    y="66"
                    width="44"
                    height="30"
                    rx="4"
                    fill="rgba(167,139,250,0.15)"
                    stroke="rgba(167,139,250,0.5)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M58 70 L80 86 L102 70"
                    fill="none"
                    stroke="rgba(167,139,250,0.6)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="80" cy="10" r="3" fill="rgba(167,139,250,0.6)">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 80 80"
                      to="360 80 80"
                      dur="25s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="80" cy="26" r="2.5" fill="rgba(138,232,255,0.5)">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="360 80 80"
                      to="0 80 80"
                      dur="18s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </div>

              <div className="md:w-[70%] w-full p-8 flex flex-col items-center md:items-start justify-center text-center md:text-left">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-8 bg-purple-500/60" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-purple-400">
                    Register Now
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Join III 5.0</h2>
                <p className="text-foreground/70 mb-6 max-w-2xl">
                  Whether you&apos;re joining solo or with your team, III 5.0 is your chance to build,
                  iterate, and ship in 24 hours. Bring your idea and compete with the best at
                  Aproksha&apos;26.
                </p>
                <MagicButton
                  heightClass="h-11"
                  onClick={() => window.open('https://innovateiterateinterrupt-iii-5.devfolio.co/overview', '_blank', 'noopener,noreferrer')}
                >
                  Register for III 5.0
                </MagicButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
