'use client';

import { useEffect, useRef } from 'react';

const NODES = [
  { x: 8, y: 16 },
  { x: 26, y: 10 },
  { x: 44, y: 18 },
  { x: 62, y: 12 },
  { x: 82, y: 20 },
  { x: 14, y: 40 },
  { x: 34, y: 34 },
  { x: 56, y: 38 },
  { x: 76, y: 34 },
  { x: 10, y: 64 },
  { x: 28, y: 58 },
  { x: 48, y: 62 },
  { x: 70, y: 58 },
  { x: 88, y: 64 },
  { x: 18, y: 84 },
  { x: 40, y: 80 },
  { x: 62, y: 86 },
  { x: 84, y: 82 },
];

const CONNECTIONS: Array<{ f: number; t: number }> = [];
for (let i = 0; i < NODES.length; i += 1) {
  for (let j = i + 1; j < NODES.length; j += 1) {
    const dx = NODES[i].x - NODES[j].x;
    const dy = NODES[i].y - NODES[j].y;
    if (Math.hypot(dx, dy) < 28) {
      CONNECTIONS.push({ f: i, t: j });
    }
  }
}

type CardWebOverlayProps = {
  className?: string;
};

export default function CardWebOverlay({ className = '' }: CardWebOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const host = overlay?.parentElement;
    if (!host) return;

    host.style.setProperty('--mx', '50%');
    host.style.setProperty('--my', '50%');

    const onMove = (ev: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      host.style.setProperty('--mx', `${ev.clientX - rect.left}px`);
      host.style.setProperty('--my', `${ev.clientY - rect.top}px`);
    };

    const onLeave = () => {
      host.style.setProperty('--mx', '50%');
      host.style.setProperty('--my', '50%');
    };

    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', onLeave);

    return () => {
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${className}`}
      style={{
        maskImage: 'radial-gradient(220px 220px at var(--mx) var(--my), rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
        WebkitMaskImage: 'radial-gradient(220px 220px at var(--mx) var(--my), rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
      }}
    >
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(72,58,140,0.22), transparent 72%)' }}
      />
      <div
        className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(52,112,136,0.2), transparent 72%)' }}
      />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {CONNECTIONS.map((c, i) => {
          const a = NODES[c.f];
          const b = NODES[c.t];
          return (
            <line
              key={`l-${i}`}
              x1={`${a.x}%`}
              y1={`${a.y}%`}
              x2={`${b.x}%`}
              y2={`${b.y}%`}
              stroke="rgba(98,82,174,0.34)"
              strokeWidth="0.9"
            />
          );
        })}
        {NODES.map((n, i) => (
          <circle
            key={`n-${i}`}
            cx={`${n.x}%`}
            cy={`${n.y}%`}
            r="1.45"
            fill="rgba(122,102,210,0.5)"
          />
        ))}
      </svg>
    </div>
  );
}
