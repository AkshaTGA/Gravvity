"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { MetaverseAnimation } from "@/components/wing-animations/metaverse";

const MembersPageContent = dynamic(
  () =>
    import("@/components/members-page-content").then(
      (mod) => mod.MembersPageContent,
    ),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center text-foreground/70">
        Loading members...
      </div>
    ),
  },
);

const SIMULATION_URL = "/metaverse-sim/index.html";

export function MetaverseMembersView() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mode, setMode] = useState<"simple" | "full">("simple");

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const handleChange = () => setIsDesktop(media.matches);
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  // Listen for back-to-home from the iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "metaverse-go-home") {
        setMode("simple");
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  /* ─── Full metaverse ─── */
  if (mode === "full") {
    return (
      <main className="fixed inset-0 z-40 bg-background">
        <iframe
          src={SIMULATION_URL}
          title="Metaverse 3D Simulation"
          className="w-screen h-screen border-0"
          allow="fullscreen"
        />
      </main>
    );
  }

  /* ─── Simple view ─── */
  return (
    <div className="relative">
      <MembersPageContent
        wingFilter="Metaverse"
        lightweight={!isDesktop}
        topBanner={
          isDesktop ? (
            <div className="w-full mb-8">
              <div className="w-full bg-[#020204] border border-white/5 rounded-2xl overflow-hidden relative group transition-all duration-1000" style={{ minHeight: '200px' }}>

                {/* Atmospheric nebula — depth of a virtual world */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_110%,rgba(99,102,241,0.12)_0%,transparent_70%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_100%,rgba(139,92,246,0.08)_0%,transparent_60%)] group-hover:opacity-150 transition-opacity duration-1000" />
                </div>

                {/* Portal Ring System */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                  {/* Outer static rings */}
                  <div className="absolute w-[700px] h-[700px] rounded-full border border-white/[0.01]" />
                  <div className="absolute w-[500px] h-[500px] rounded-full border border-white/[0.015]" />
                  
                  {/* Mid ring — slow rotation, gains color on hover */}
                  <div className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-white/[0.03] group-hover:border-indigo-500/20 transition-colors duration-[1500ms] animate-[spin_40s_linear_infinite]" />
                  
                  {/* Inner ring with glow */}
                  <div className="absolute w-[180px] h-[180px] rounded-full border border-white/[0.04] group-hover:border-violet-500/30 group-hover:shadow-[0_0_60px_rgba(139,92,246,0.08)] transition-all duration-[1200ms]" />

                  {/* Scanning arc — rotates to suggest active probing */}
                  <div className="absolute w-[180px] h-[180px] rounded-full animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: 'conic-gradient(from 0deg, rgba(139,92,246,0.3) 0deg, transparent 60deg, transparent 360deg)' }}
                  />

                  {/* Portal core pulse */}
                  <div className="absolute w-3 h-3 rounded-full bg-indigo-500/30 group-hover:bg-violet-400/70 shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:shadow-[0_0_60px_rgba(139,92,246,0.8)] transition-all duration-1000" />
                  <div className="absolute w-3 h-3 rounded-full bg-indigo-400/20 animate-ping" />
                </div>

                {/* Orbiting Presence Dots */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  <div className="absolute w-[320px] h-[320px] animate-[spin_25s_linear_infinite]">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2">
                      <div className="w-2 h-2 bg-violet-400/50 rounded-full shadow-[0_0_12px_rgba(167,139,250,0.7)]" />
                    </div>
                  </div>
                  <div className="absolute w-[320px] h-[320px] animate-[spin_18s_linear_infinite_reverse]" style={{animationDelay:'-6s'}}>
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2">
                      <div className="w-1.5 h-1.5 bg-sky-400/50 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
                    </div>
                  </div>
                  <div className="absolute w-[320px] h-[320px] animate-[spin_35s_linear_infinite]" style={{animationDelay:'-12s'}}>
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2">
                      <div className="w-1.5 h-1.5 bg-emerald-400/40 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex items-center justify-between h-full px-14 py-10">

                  {/* Left: Identity */}
                  <div className="flex flex-col gap-3">
                    <div className="text-[9px] text-white/25 uppercase tracking-[0.6em] font-mono">Gravity · Metaverse</div>
                    <div className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-[1.1]">
                      Something<br />
                      <span className="text-violet-300/50 font-normal italic">awaits you.</span>
                    </div>
                    <div className="text-[10px] text-white/20 font-mono uppercase tracking-widest mt-1">
                      A space unlike any other
                    </div>
                  </div>

                  {/* Right: Presence + CTA */}
                  <div className="flex flex-col items-end gap-6">
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-3">
                        <div className="text-[8px] text-white/20 font-mono uppercase tracking-widest">Worlds active</div>
                        
                      </div>
                      <div className="h-px w-36 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>

                    <button
                      className="relative px-12 py-4 text-[11px] font-semibold text-white/40 uppercase tracking-widest border border-white/10 bg-white/[0.02] hover:bg-violet-500/10 hover:border-violet-400/40 hover:text-white transition-all duration-500 active:scale-95 cursor-pointer rounded-full font-mono group/btn overflow-hidden"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMode("full");
                      }}
                    >
                      {/* Shimmer on hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-[800ms]" />
                      <span className="relative">Enter World</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        }
      />
    </div>
  );
}
