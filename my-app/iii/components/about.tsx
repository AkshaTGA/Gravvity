'use client';

import { useEffect, useRef, useState } from 'react';
import { Zap, Globe, Code as Code2 } from 'lucide-react';
import CardWebOverlay from './card-web-overlay';

export default function AboutSection() {
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
    <section id="about" ref={ref} className="relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="text-[#A68CFF] text-xs tracking-[0.3em] uppercase font-medium">About the Event</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            What is{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #A68CFF, #8AE8FF)' }}
            >
              III 5.0?
            </span>
          </h2>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-8 items-center transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="space-y-5">
            <p className="text-white/70 text-base leading-relaxed">
              <span className="text-white font-semibold">Innovate-Iterate-Interrupt (III) 5.0</span> is the flagship
              hackathon of <span className="text-[#A68CFF]">Aproksha&apos;26</span> — IIIT Allahabad&apos;s annual
              technical fest — hosted in collaboration with{' '}
              <span className="text-[#A68CFF]">Gravity Technical Society</span>.
            </p>
            <p className="text-white/60 text-base leading-relaxed">
              Over 24 non-stop hours, teams of 1–4 will build, break, and iterate their way to groundbreaking
              solutions. From AI to Blockchain, Web to emerging tech — bring your best ideas and build something
              that matters.
            </p>
            <p className="text-white/60 text-base leading-relaxed">
              Running in hybrid mode, you can compete offline at the IIITA campus or join virtually — the
              stage is set for innovators across the country.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: Zap, title: '24 Hours Non-Stop', desc: 'Uninterrupted coding, mentoring, and building' },
              { icon: Globe, title: 'Hybrid Mode', desc: 'Compete offline at IIITA or join virtually' },
              { icon: Code2, title: 'Open Domains', desc: 'AI, Web, Blockchain, and more — your choice' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="card-glow group flex items-center gap-4 p-5 h-32 rounded-2xl transition-all duration-300 hover:scale-[1.03] relative overflow-hidden"
              >
                <CardWebOverlay />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(166,140,255,0.14)', border: '1px solid rgba(166,140,255,0.28)' }}
                >
                  <Icon className="w-5 h-5 text-[#A68CFF]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-px w-6 bg-purple-500/60" />
                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8AE8FF]">{title}</span>
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
