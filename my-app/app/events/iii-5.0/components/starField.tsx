'use client';

import { useEffect, useRef, useState } from 'react';
import { Trophy, Medal, Award, Star } from 'lucide-react';
import CardWebOverlay from './card-web-overlay';

const prizes = [
  {
    rank: '1st Place',
    amount: '₹25,000',
    icon: Trophy,
    color: '#ddd6fe',
    glow: 'rgba(221,214,254,0.24)',
    border: 'rgba(221,214,254,0.28)',
    bg: 'rgba(221,214,254,0.06)',
    size: 'large',
  },
  {
    rank: '2nd Place',
    amount: '₹15,000',
    icon: Medal,
    color: '#c4b5fd',
    glow: 'rgba(196,181,253,0.2)',
    border: 'rgba(196,181,253,0.24)',
    bg: 'rgba(196,181,253,0.05)',
    size: 'medium',
  },
  {
    rank: '3rd Place',
    amount: '₹10,000',
    icon: Award,
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.2)',
    border: 'rgba(167,139,250,0.24)',
    bg: 'rgba(167,139,250,0.05)',
    size: 'medium',
  },
  {
    rank: 'Best 1st Year',
    amount: '₹10,000',
    icon: Star,
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.2)',
    border: 'rgba(139,92,246,0.24)',
    bg: 'rgba(139,92,246,0.05)',
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
    <section id="prizes" ref={ref} className="relative z-10 py-24 px-6">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.45), transparent)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="text-[#A68CFF] text-xs tracking-[0.3em] uppercase font-medium">Prize Pool</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Win{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #A68CFF, #8AE8FF)' }}
            >
              ₹60,000+
            </span>
          </h2>
          <p className="mt-3 text-white/50 text-base">Total prize pool up for grabs</p>
        </div>

        <div className="w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
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
                <Icon className="w-5 h-5 text-[#A68CFF] mb-2" />
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
          className={`mt-10 text-center transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-white/30 text-sm">
            All prizes will be awarded during the closing ceremony of Aproksha&apos;26
          </p>
        </div>
      </div>
    </section>
  );
}
