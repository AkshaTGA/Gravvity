'use client';

import { useEffect, useRef, useState } from 'react';
import { Trophy, Medal, Award, Star } from 'lucide-react';
import CardWebOverlay from './card-web-overlay';

const prizes = [
  {
    rank: '1st Place',
    amount: '₹25,000',
    icon: Trophy,
    color: '#d8b4fe', // purple-300
    glow: 'rgba(216,180,254,0.3)',
    border: 'rgba(216,180,254,0.2)',
    bg: 'rgba(216,180,254,0.05)',
    size: 'large',
  },
  {
    rank: '2nd Place',
    amount: '₹15,000',
    icon: Medal,
    color: '#c084fc', // purple-400
    glow: 'rgba(192,132,252,0.2)',
    border: 'rgba(192,132,252,0.2)',
    bg: 'rgba(192,132,252,0.04)',
    size: 'medium',
  },
  {
    rank: '3rd Place',
    amount: '₹10,000',
    icon: Award,
    color: '#a855f7', // purple-500
    glow: 'rgba(168,85,247,0.2)',
    border: 'rgba(168,85,247,0.2)',
    bg: 'rgba(168,85,247,0.04)',
    size: 'medium',
  },
  {
    rank: 'Best 1st Year',
    amount: '₹10,000',
    icon: Star,
    color: '#9333ea', // purple-600
    glow: 'rgba(147,51,234,0.2)',
    border: 'rgba(147,51,234,0.2)',
    bg: 'rgba(147,51,234,0.04)',
    size: 'medium',
  },
];

export default function PrizesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="prizes" ref={ref} className="relative z-10 py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <span className="text-[#8AE8FF] text-sm tracking-[0.4em] uppercase font-bold drop-shadow-[0_0_15px_rgba(138,232,255,0.45)]">Prize Pool</span>
          <h2 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight">
            Win{' '}
            <span
              className="text-transparent bg-clip-text animate-pulse"
              style={{ backgroundImage: 'linear-gradient(135deg, #c084fc, #e9d5ff, #c084fc)', backgroundSize: '200% auto' }}
            >
              ₹60,000+
            </span>
          </h2>
          <p className="mt-6 text-white/50 text-lg md:text-xl font-light tracking-wide">Total prize pool up for grabs</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {prizes.map((prize, i) => {
            const Icon = prize.icon;
            return (
              <div
                key={prize.rank}
                className="card-glow group flex flex-col items-center justify-center text-center p-5 h-40 sm:h-44 md:h-48 rounded-2xl transition-all duration-300 hover:scale-[1.03] relative overflow-hidden"
                style={{
                  transitionDelay: `${i * 120}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                <CardWebOverlay />
                <Icon className="w-5 h-5 text-[#A68CFF] mb-2" style={{ color: prize.color }} />
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-6 bg-purple-500/60" />
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8AE8FF]">{prize.rank}</span>
                </div>
                <span className="text-xl md:text-2xl font-bold leading-tight">{prize.amount}</span>
              </div>
            );
          })}
        </div>

        <div
          className={`mt-16 text-center transition-all duration-1000 delay-[800ms] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-white/30 text-sm">
            All prizes will be awarded during the closing ceremony of Aproksha&apos;26
          </p>
        </div>
      </div>
    </section>
  );
}
