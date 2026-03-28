"use client";

import { useState, useMemo, useEffect } from "react";
import { useMembers } from "@/hooks/use-members";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import ProfileCard from "@/components/profile-card";
import "@/components/ProfileCard.css";
import MagicButton from "@/components/magic-button";
import { isSameWing } from "@/lib/wing-match";
import { DesignEditorPage } from "@/components/design-editor-page";
import {
  loadSavedStyles,
  buildWrapperStyle,
  buildCardVariableStyle,
  type CardStyleOverride,
} from "@/lib/design-card-styles";
import { Paintbrush } from "lucide-react";
import "@/components/wing-headings.css";
import { useIsTrueDesktop } from "@/hooks/use-true-desktop";

export default function DesignMembersPage() {
  const [editorOpen, setEditorOpen] = useState(false);
  const isTrueDesktop = useIsTrueDesktop();
  const members = useMembers();

  // Load saved per-card styles (re-load when editor closes)
  const [savedStyles, setSavedStyles] = useState<
    Record<string, CardStyleOverride>
  >({});
  useEffect(() => {
    setSavedStyles(loadSavedStyles());
  }, [editorOpen]); // re-read when editor toggles

  const { coordinators, regularMembers } = useMemo(() => {
    const list = members.filter(
      (m) =>
        isSameWing(m.wing, "Design") &&
        !m.isOverallCoordinator &&
        !m.isFacultyCoordinator,
    );
    return {
      coordinators: list.filter((m) => m.role === "coordinator"),
      regularMembers: list.filter((m) => m.role === "member"),
    };
  }, [members]);

  /* ── Editor overlay ── */
  if (editorOpen) {
    return <DesignEditorPage onClose={() => setEditorOpen(false)} />;
  }

  /* ── Render a card with optional saved overrides ── */
  const renderCard = (
    member: (typeof members)[number],
    fallbackAvatar: string,
  ) => {
    const override = savedStyles[member.id];
    const wrapperStyle = override ? buildWrapperStyle(override) : undefined;
    const cardVarStyle = override
      ? buildCardVariableStyle(override)
      : undefined;

    return (
      <div key={member.id} className="fade-in-up" style={wrapperStyle}>
        <ProfileCard
          name={member.name}
          title={member.bio || member.wing}
          handle={
            member.name?.toLowerCase().replace(/\s+/g, "") || "member"
          }
          status={member.role}
          contactText="Contact"
          avatarUrl={member.image || fallbackAvatar}
          innerGradient={override?.innerGradient}
          behindGlowColor={override?.behindGlowColor}
          behindGlowSize={override?.behindGlowSize}
          styleOverrides={cardVarStyle}
          socials={{
            linkedin: member.socials?.linkedin,
            instagram: member.socials?.instagram,
            x: member.socials?.twitter,
          }}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact", member.name)}
        />
      </div>
    );
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen m-10 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-16 slide-in-up">
            <h1
              className="text-4xl md:text-6xl font-bold design-super-heading mb-4"
              data-text="Design Wing"
            >
              Design Wing
            </h1>
            <p className="text-md md:text-xl text-foreground/70 mb-8">
              The creative pulse of Gravity, turning abstract ideas into visual realities.
            </p>

            {isTrueDesktop && (
              <div
                className="w-full bg-[#0a0a0c] border border-white/5 rounded-2xl px-12 py-8 group relative overflow-hidden transition-all duration-1000"
              >
                {/* Animated Prismatic Mesh Background (Subtle) */}
                <div className="absolute inset-0 opacity-5 blur-[120px] pointer-events-none bg-[conic-gradient(from_0deg_at_50%_50%,#3b82f6,#a855f7,#ec4899,#eab308,#3b82f6)] animate-[spin_10s_linear_infinite]" />
                
                {/* Floating Glass Assets: Holographic Card Stack (Scaled Down) */}
                <div className="absolute top-1/2 left-32 -translate-y-1/2 flex -space-x-16 opacity-10 group-hover:opacity-20 transition-all duration-1000 scale-[0.6] rotate-12 group-hover:rotate-0 group-hover:scale-[0.7] pointer-events-none select-none origin-center">
                  {[0, 1, 2].map((i) => (
                    <div 
                      key={i} 
                      className="w-40 h-56 bg-gradient-to-br from-white/20 to-transparent rounded-2xl border border-white/30 backdrop-blur-md shadow-2xl"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                  <div className="flex flex-col gap-6 text-left">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2 pointer-events-none">
                        <div className="w-2 h-2 rounded-full bg-sky-500/40 shadow-[0_0_15px_rgba(14,165,233,0.4)]" />
                        <div className="w-2 h-2 rounded-full bg-fuchsia-500/40 shadow-[0_0_15px_rgba(217,70,239,0.4)]" />
                        <div className="w-2 h-2 rounded-full bg-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.4)]" />
                      </div>
                      <div className="text-[10px] text-white/40 uppercase tracking-[0.5em] font-bold font-mono">
                        Gravity Design Lab
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <span className="text-3xl md:text-4xl font-light text-white tracking-tighter leading-none mb-1">
                          Explore the <span className="italic font-serif text-white/30">Studio</span>
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-fuchsia-400 to-rose-400 font-medium text-lg tracking-tight opacity-70">
                          Where art meets precision
                        </span>
                      </div>
                      <p className="text-[10px] text-white/30 max-w-sm border-l border-white/10 pl-3 py-0.5 uppercase tracking-widest font-bold">
                        Crafting Gravity&apos;s visual identity
                      </p>
                    </div>
                  </div>

                  <div className="relative group/btn mt-4 md:mt-0">
                    <button
                      className="relative z-10 px-16 py-4 bg-white text-[11px] font-bold text-black uppercase tracking-[0.4em] transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer rounded-full shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditorOpen(true);
                      }}
                    >
                      Open Studio
                    </button>
                    
                    {/* Collaborative Cursor (Clean) */}
                    <div className="absolute -top-10 -right-10 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:-translate-x-6 group-hover:translate-y-6 transition-all duration-[2.5s] ease-out flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        <svg width="12" height="12" viewBox="0 0 14 14" className="text-sky-500 fill-current drop-shadow-xl">
                          <path d="M0 0l14 4-6 2-2 6z" stroke="white" strokeWidth="1" />
                        </svg>
                        <div className="text-[8px] bg-sky-500 text-white px-2 py-0.5 rounded shadow-lg font-bold">Designer</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Elegant Full Chromatic Sweep */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-400 via-fuchsia-400 via-rose-400 to-transparent w-full -translate-x-full group-hover:translate-x-full transition-all duration-[4s] pointer-events-none" />
              </div>
            )}
          </div>

          {/* Coordinators */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-2 text-center">
              <span className="text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                  <path fill="#fff" d="M7.475 21Q5.2 21 3.6 19.4T2 15.525q0-2.15 1.438-3.713t3.587-1.737L3 2h7l2 4l2-4h7l-4 8.025q2.125.2 3.563 1.763T22 15.5q0 2.3-1.6 3.9T16.5 21q-.225 0-.462-.012t-.463-.063q1.375-.9 2.15-2.337T18.5 15.5q0-2.725-1.888-4.612T12 9t-4.612 1.888T5.5 15.5q0 1.7.7 3.2t2.2 2.225q-.225.05-.462.063T7.475 21M12 20q-1.875 0-3.187-1.312T7.5 15.5t1.313-3.187T12 11t3.188 1.313T16.5 15.5t-1.312 3.188T12 20m-1.85-1.75l1.85-1.4l1.85 1.4l-.7-2.275L15 14.65h-2.275L12 12.25l-.725 2.4H9l1.85 1.325z" />
                </svg>
              </span>
              <span>Coordinators</span>
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {coordinators.map((m) => renderCard(m, "/gravity-logo.png"))}
            </div>
          </div>

          {/* Members */}
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-2 text-center">
              <span className="text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 448 512">
                  <path fill="#fff" d="M224.3 128L139.7-12.9c-6.5-10.8-20.1-14.7-31.3-9.1L21.8 21.3C9.9 27.2 5.1 41.6 11 53.5l69.6 139.1C50.5 226.5 32.3 271.1 32.3 320c0 106 86 192 192 192s192-86 192-192c0-48.9-18.3-93.5-48.3-127.4l69.6-139.1c5.9-11.9 1.1-26.3-10.7-32.2l-86.7-43.4c-11.2-5.6-24.9-1.6-31.3 9.1zm30.8 142.5c1.4 2.8 4 4.7 7 5.1l50.1 7.3c7.7 1.1 10.7 10.5 5.2 16l-36.3 35.4c-2.2 2.2-3.2 5.2-2.7 8.3l8.6 49.9c1.3 7.6-6.7 13.5-13.6 9.9l-44.8-23.6c-2.7-1.4-6-1.4-8.7 0l-44.8 23.6c-6.9 3.6-14.9-2.2-13.6-9.9l8.6-49.9c.5-3-.5-6.1-2.7-8.3l-36.3-35.4c-5.6-5.4-2.5-14.8 5.2-16l50.1-7.3c3-.4 5.7-2.4 7-5.1l22.4-45.4c3.4-7 13.3-7 16.8 0l22.4 45.4z" />
                </svg>
              </span>
              <span>Members</span>
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {regularMembers.map((m) =>
                renderCard(m, "/placeholder-avatar.svg"),
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 card-glow p-8 text-center slide-in-up">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-foreground/70 mb-6">
              Interested in joining Gravity? We&apos;re always looking for
              passionate members!
            </p>
            <MagicButton href="/contact" className="mx-auto w-48 md:w-56">
              Get in Touch
            </MagicButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
