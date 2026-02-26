"use client";

import { wings } from "@/lib/data";
import Link from "next/link";
import MagicBorderExact from "@/components/magic-border-exact";
import { useEffect, useRef } from "react";
import { GradualSpacing } from "@/components/Text-Effect";
import { useRouter } from "next/navigation";
import { getWingMembersPath } from "@/lib/wing-routes";
import { ArrowRight } from "lucide-react";

/* ── per-wing highlights & accent colors ── */
const wingMeta: Record<
  string,
  { tagline: string; accent: string; accentBg: string; highlights: string[] }
> = {
  "Competitive Coding": {
    tagline: "Think fast. Code faster.",
    accent: "text-cyan-400",
    accentBg: "bg-cyan-400",
    highlights: [
      "Weekly rated contests & virtual judges",
      "Live problem-solving streams & editorials",
      "DSA crash courses – arrays to segment trees",
      "Mock interviews & placement prep sprints",
    ],
  },
  "Web Development": {
    tagline: "From localhost to production.",
    accent: "text-emerald-400",
    accentBg: "bg-emerald-400",
    highlights: [
      "Full-stack projects with React, Next.js & more",
      "API design, databases & deployment pipelines",
      "Collaborative open-source web tools",
      "UI/UX reviews & performance audits",
    ],
  },
  Design: {
    tagline: "Pixels with purpose.",
    accent: "text-pink-400",
    accentBg: "bg-pink-400",
    highlights: [
      "UI/UX design challenges & case studies",
      "Figma, Framer & motion design workshops",
      "Brand identity & visual storytelling",
      "Design critiques & portfolio reviews",
    ],
  },
  FOSS: {
    tagline: "Free as in freedom.",
    accent: "text-amber-400",
    accentBg: "bg-amber-400",
    highlights: [
      "Contribute to real open-source projects",
      "Linux, Git & command-line mastery",
      "Upstream patch submissions & code reviews",
      "GSOC / Outreachy mentorship & guidance",
    ],
  },
  "Private AI": {
    tagline: "Intelligence, responsibly.",
    accent: "text-violet-400",
    accentBg: "bg-violet-400",
    highlights: [
      "ML model training & Kaggle competitions",
      "Privacy-preserving AI & federated learning",
      "NLP, computer vision & gen-AI exploration",
      "Paper reading groups & research discussions",
    ],
  },
  Blockchain: {
    tagline: "Trustless by design.",
    accent: "text-orange-400",
    accentBg: "bg-orange-400",
    highlights: [
      "Smart contract development in Solidity & Rust",
      "DApp building on Ethereum & other L1/L2 chains",
      "Cryptography fundamentals & consensus protocols",
      "Web3 hackathons & bounty hunting",
    ],
  },
  Metaverse: {
    tagline: "Beyond the screen.",
    accent: "text-indigo-400",
    accentBg: "bg-indigo-400",
    highlights: [
      "3D modelling with Blender & Three.js",
      "VR/AR experiences with Unity & WebXR",
      "Spatial computing & immersive interaction",
      "Virtual gallery curation & world-building",
    ],
  },
};

export default function WingsPage() {
  const router = useRouter();
  const wingsRef = useRef<(HTMLDivElement | null)[]>([]);

  const slug = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  useEffect(() => {
    const scrollToHash = (hash?: string) => {
      const id = (hash || window.location.hash).replace(/^#/, "");
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    scrollToHash();
    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    wingsRef.current.forEach((ref) => {
      if (ref) ref.classList.add("visible");
    });

    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    );

    wingsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="min-h-screen bg-background" id="wings">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <GradualSpacing
            text="Our Seven Wings"
            className="text-5xl md:text-6xl font-bold gradient-text mb-4 select-none"
          />
          <p className="text-xl text-foreground/60 max-w-xl mx-auto">
            Seven specialised squads — one shared mission of technical
            excellence.
          </p>
        </div>

        {/* Wings List */}
        <div className="space-y-24">
          {wings.map((wing, index) => {
            const AnimationComponent = wing.animationComponent;
            const meta = wingMeta[wing.name];
            const isEven = index % 2 === 0;

            return (
              <div
                key={wing.id}
                id={`wing-${slug(wing.name)}`}
                className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center`}
              >
                {/* Animation / Visual */}
                <div
                  ref={(el) => {
                    wingsRef.current[index * 2] = el;
                  }}
                  className={`${!isEven ? "md:order-2" : ""} wings-animate ${
                    isEven ? "fade-in-right" : "fade-in-left"
                  }`}
                  style={{ animationDelay: "0ms" }}
                >
                  <div
                    className="w-full cursor-pointer max-w-3xl mx-auto"
                    onClick={() =>
                      router.push(getWingMembersPath(wing.name))
                    }
                  >
                    <MagicBorderExact
                      className="h-full w-full rounded-2xl"
                      innerClassName="h-full w-full flex items-center justify-center rounded-2xl p-3 sm:p-4 md:p-3 bg-slate-950/60 overflow-hidden"
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        {AnimationComponent ? (
                          <AnimationComponent />
                        ) : (
                          wing.icon
                        )}
                      </div>
                    </MagicBorderExact>
                  </div>
                </div>

                {/* Text content */}
                <div
                  ref={(el) => {
                    wingsRef.current[index * 2 + 1] = el;
                  }}
                  className={`${!isEven ? "md:order-1" : ""} wings-animate ${
                    isEven ? "fade-in-left" : "fade-in-right"
                  }`}
                  style={{ animationDelay: "100ms" }}
                >
                  {/* Wing name & icon */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="shrink-0 opacity-80">{wing.icon}</span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                      {wing.name}
                    </h2>
                  </div>

                  {/* Tagline */}
                  {meta && (
                    <p
                      className={`text-sm font-medium tracking-wide uppercase mb-4 ${meta.accent}`}
                    >
                      {meta.tagline}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-base sm:text-lg text-foreground/60 leading-relaxed mb-6">
                    {wing.description}
                  </p>

                  {/* Highlights */}
                  {meta && (
                    <ul className="space-y-3 mb-6">
                      {meta.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span
                            className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${meta.accentBg}`}
                          />
                          <span className="text-foreground/70 text-sm leading-snug">
                            {h}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  <Link
                    href={getWingMembersPath(wing.name)}
                    className={`group inline-flex items-center gap-2 text-sm font-semibold ${
                      meta?.accent ?? "text-purple-400"
                    } hover:opacity-80 transition-opacity`}
                  >
                    Explore wing
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
