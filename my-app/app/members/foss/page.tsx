"use client";

import { useState } from "react";
import { MembersPageContent } from "@/components/members-page-content";
import { FossUbuntuDesktop } from "@/components/foss-ubuntu-desktop";
import { FossHeroVisual } from "@/components/foss-hero-visual";
import { useIsTrueDesktop } from "@/hooks/use-true-desktop";

export default function FossMembersPage() {
  const [showDesktop, setShowDesktop] = useState(false);
  const isDesktop = useIsTrueDesktop();

  if (showDesktop) {
    return <FossUbuntuDesktop onExit={() => setShowDesktop(false)} />;
  }

  return (
    <MembersPageContent
      wingFilter="FOSS"
      lightweight={!isDesktop}
      topBanner={
        isDesktop ? (
          <div className="w-full mb-10">
            <div
              className="w-full flex flex-col md:flex-row items-center justify-between bg-[#16161e]/60 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-[#7aa2f7]/50 transition-all group relative border-t-0"
              onClick={() => setShowDesktop(true)}
            >
              {/* Terminal Header */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-[#1f2335] flex items-center px-4 gap-2 border-b border-white/5 z-20">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#f7768e]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#e0af68]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#9ece6a]/80" />
                </div>
                <div className="mx-auto text-[10px] font-mono text-white/40 tracking-wider uppercase">
                  Terminal — foss-node-01
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7aa2f7]/5 via-transparent to-[#bb9af7]/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <div className="flex flex-col relative z-10 p-8 pt-12 text-left w-full md:w-auto">
                <div className="font-mono text-sm md:text-base flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#9ece6a]">foss@gravity</span>
                    <span className="text-white/40">:</span>
                    <span className="text-[#7aa2f7]">~/wings/foss</span>
                    <span className="text-white/40">$</span>
                    <span className="text-white group-hover:text-[#7aa2f7] transition-colors">./init_access</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-xs md:text-sm mt-1">
                    <span className="animate-pulse">_</span>
                    <span className="text-white/30 italic">Establishing secure tunnel...</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 p-8 pt-12">
                <button
                  className="relative overflow-hidden px-8 py-3 bg-[#1a1b26] text-[#7aa2f7] border border-[#7aa2f7]/30 font-mono text-sm font-bold rounded-md transition-all hover:bg-[#7aa2f7]/10 hover:border-[#7aa2f7] hover:shadow-[0_0_25px_rgba(122,162,247,0.2)] group/btn active:scale-95"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDesktop(true);
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    EXECUTE
                    <div className="w-1.5 h-4 bg-[#7aa2f7] animate-[blink_1s_infinite]" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                </button>
              </div>

              {/* Scanline Effect overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_4px,3px_100%] opacity-20" />
            </div>
            
            <style jsx>{`
              @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
              }
            `}</style>
          </div>
        ) : null
      }
    />
  );
}
