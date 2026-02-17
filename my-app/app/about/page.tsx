"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import MagicButton from "@/components/magic-button";
import { useState, useRef, useEffect } from "react";

export default function AboutPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cardSize, setCardSize] = useState({ width: 400, height: 300 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const element = cardRef.current;

    const updateSize = () => {
      setCardSize({ width: element.offsetWidth, height: element.offsetHeight });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Generate network nodes
  const nodes = [
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

  // Generate connections between nearby nodes
  const connections: { from: number; to: number }[] = [];
  nodes.forEach((node, i) => {
    nodes.forEach((other, j) => {
      if (i < j) {
        const dist = Math.sqrt(
          Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2),
        );
        if (dist < 30) {
          connections.push({ from: i, to: j });
        }
      }
    });
  });

  return (
    <>
      <Navigation />
      <main className="min-h-screen mt-10 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="mb-16 text-center slide-in-up">
            <h1 className="text-5xl md:text-6xl text-center font-bold gradient-text mb-4">
              About Gravity
            </h1>
            <p className="text-xl text-foreground/70">
              Building the future of technology together
            </p>
          </div>

          {/* Mission & Vision Section */}
          <div className="mb-16">
            <div
              ref={cardRef}
              className="card-glow p-8 md:p-10 slide-in-up relative overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Interactive Network Pattern Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Base gradient ambient */}
                <div
                  className="absolute -top-[20%] -right-[20%] w-[70%] h-[70%] rounded-full opacity-40"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(139,92,246,0.2) 0%, rgba(124,58,237,0.08) 40%, transparent 70%)",
                  }}
                />
                <div
                  className="absolute -bottom-[15%] -left-[15%] w-[60%] h-[60%] rounded-full opacity-35"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(167,139,250,0.18) 0%, rgba(139,92,246,0.06) 45%, transparent 70%)",
                  }}
                />

                {/* Network Pattern SVG */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  style={{
                    opacity: isHovering ? 1 : 0.4,
                    transition: "opacity 0.5s ease",
                  }}
                >
                  <defs>
                    {/* Radial gradient that follows cursor */}
                    <radialGradient id="cursorGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(167,139,250,0.6)" />
                      <stop offset="50%" stopColor="rgba(139,92,246,0.2)" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>

                  {/* Connection lines */}
                  {connections.map((conn, idx) => {
                    const from = nodes[conn.from];
                    const to = nodes[conn.to];
                    const midX = (from.x + to.x) / 2;
                    const midY = (from.y + to.y) / 2;

                    // Calculate distance from cursor to line midpoint
                    const cardWidth = cardSize.width;
                    const cardHeight = cardSize.height;
                    const lineMidPx = {
                      x: (midX / 100) * cardWidth,
                      y: (midY / 100) * cardHeight,
                    };
                    const distToCursor = Math.sqrt(
                      Math.pow(mousePos.x - lineMidPx.x, 2) +
                        Math.pow(mousePos.y - lineMidPx.y, 2),
                    );
                    const maxDist = 120;
                    const intensity = isHovering
                      ? Math.max(0, 1 - distToCursor / maxDist)
                      : 0;

                    return (
                      <line
                        key={`line-${idx}`}
                        x1={`${from.x}%`}
                        y1={`${from.y}%`}
                        x2={`${to.x}%`}
                        y2={`${to.y}%`}
                        stroke={`rgba(167,139,250,${0.06 + intensity * 0.38})`}
                        strokeWidth={0.6 + intensity * 1.2}
                        style={{
                          transition:
                            "stroke 0.15s ease, stroke-width 0.15s ease",
                        }}
                      />
                    );
                  })}

                  {/* Network nodes */}
                  {nodes.map((node, idx) => {
                    const cardWidth = cardSize.width;
                    const cardHeight = cardSize.height;
                    const nodePx = {
                      x: (node.x / 100) * cardWidth,
                      y: (node.y / 100) * cardHeight,
                    };
                    const distToCursor = Math.sqrt(
                      Math.pow(mousePos.x - nodePx.x, 2) +
                        Math.pow(mousePos.y - nodePx.y, 2),
                    );
                    const maxDist = 100;
                    const intensity = isHovering
                      ? Math.max(0, 1 - distToCursor / maxDist)
                      : 0;

                    return (
                      <g key={`node-${idx}`}>
                        {/* Glow effect */}
                        {intensity > 0.1 && (
                          <circle
                            cx={`${node.x}%`}
                            cy={`${node.y}%`}
                            r={5 + intensity * 10}
                            fill={`rgba(167,139,250,${intensity * 0.22})`}
                            style={{ transition: "all 0.2s ease" }}
                          />
                        )}
                        {/* Node dot */}
                        <circle
                          cx={`${node.x}%`}
                          cy={`${node.y}%`}
                          r={1.2 + intensity * 1.8}
                          fill={`rgba(196,181,253,${0.22 + intensity * 0.7})`}
                          style={{ transition: "all 0.15s ease" }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Cursor spotlight gradient */}
                {isHovering && (
                  <div
                    className="absolute w-48 h-48 rounded-full pointer-events-none transition-opacity duration-300"
                    style={{
                      left: mousePos.x - 96,
                      top: mousePos.y - 96,
                      background:
                        "radial-gradient(circle at center, rgba(139,92,246,0.08) 0%, rgba(167,139,250,0.04) 40%, transparent 70%)",
                      opacity: 0.8,
                    }}
                  />
                )}

                {/* Subtle edge vignette */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.1) 100%)",
                  }}
                />
              </div>

              {/* Content Grid */}
              <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Mission */}
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    Gravity is a technical society dedicated to fostering
                    innovation, collaboration, and excellence in technology. We
                    bring together passionate individuals across seven distinct
                    domains to create, learn, and grow together.
                  </p>
                  <p className="text-foreground/70 leading-relaxed">
                    Whether you’re into competitive programming, web
                    development, design, open-source, AI, blockchain, or the
                    metaverse, Gravity provides the platform and community to
                    achieve your goals.
                  </p>
                </div>

                {/* Vision */}
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    To create a vibrant ecosystem of tech enthusiasts who push
                    the boundaries of innovation and collaborate to solve
                    real-world problems.
                  </p>
                  <p className="text-foreground/70 leading-relaxed">
                    We believe in the power of community, continuous learning,
                    and practical application of knowledge. Together, we’re
                    shaping the future of technology.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  title: "Innovation",
                  icon: (
                    <div className="text-3xl mb-2 select-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="white"
                          d="M2.25 10A8.75 8.75 0 0 1 11 1.25c1.872 0 3.417.436 4.696 1.22c1.275.78 2.244 1.88 3.008 3.142c1.448 2.393 2.22 5.485 2.934 8.349l.09.357l.233.932H19.25v4h-3.5V23h-9.5v-5.65a8.74 8.74 0 0 1-4-7.35m10.181-4.996l.57 1.782l1.828-.397l1.432 2.479l-1.206 1.384l1.206 1.384l-1.432 2.48l-1.828-.398l-.57 1.782H9.57L9 13.718l-1.828.398l-1.432-2.48l1.206-1.384L5.74 8.868l1.432-2.48L9 6.786l.57-1.782zm-.036 5.248a1.392 1.392 0 1 0-2.784 0a1.392 1.392 0 0 0 2.784 0"
                        />
                      </svg>
                    </div>
                  ),
                  description:
                    "Pushing boundaries and exploring new technologies",
                },
                {
                  title: "Collaboration",
                  icon: (
                    <div className="text-3xl mb-2 select-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill="white"
                          d="M12.5 4.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m5 .5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-13 2a2 2 0 1 0 0-4a2 2 0 0 0 0 4M6 9.25C6 8.56 6.56 8 7.25 8h5.5c.69 0 1.25.56 1.25 1.25V14a4 4 0 0 1-8 0zm-1 0c0-.463.14-.892.379-1.25H3.25C2.56 8 2 8.56 2 9.25V13a3 3 0 0 0 3.404 2.973A5 5 0 0 1 5 14zM15 14c0 .7-.144 1.368-.404 1.973Q14.794 16 15 16a3 3 0 0 0 3-3V9.25C18 8.56 17.44 8 16.75 8h-2.129c.24.358.379.787.379 1.25z"
                        />
                      </svg>
                    </div>
                  ),
                  description: "Working together to achieve greater goals",
                },
                {
                  title: "Excellence",
                  icon: (
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                      >
                        <defs>
                          <mask id="SVGKkdZ2csA">
                            <g
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="4"
                            >
                              <path
                                fill="#fff"
                                stroke="#fff"
                                d="m24 4l5.253 3.832l6.503-.012l1.997 6.188l5.268 3.812L41 24l2.021 6.18l-5.268 3.812l-1.997 6.188l-6.503-.012L24 44l-5.253-3.832l-6.503.012l-1.997-6.188l-5.268-3.812L7 24l-2.021-6.18l5.268-3.812l1.997-6.188l6.503.012z"
                              />
                              <path stroke="#000" d="m17 24l5 5l10-10" />
                            </g>
                          </mask>
                        </defs>
                        <path
                          fill="#fff"
                          d="M0 0h48v48H0z"
                          mask="url(#SVGKkdZ2csA)"
                        />
                      </svg>
                    </div>
                  ),
                  description: "Striving for the highest quality in everything",
                },
                {
                  title: "Growth",
                  icon: (
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#fff"
                          d="M3 16.359V21h20v2H1V1h2v12.545l2.287-2.263a3 3 0 1 1 5.592-.437l2.757 2.482a3 3 0 0 1 2.256-.192l2.86-5.148a3 3 0 1 1 1.748.972l-2.995 5.39a3 3 0 1 1-5.246.43l-2.561-2.305A3 3 0 0 1 8 13c-.467 0-.91-.107-1.304-.298z"
                        />
                      </svg>
                    </div>
                  ),
                  description: "Continuous learning and personal development",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="card-glow p-6 flex items-center justify-center flex-col gap-2 text-center slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div>{value.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-foreground/60 text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Join Our Community */}
          <div className="card-glow overflow-hidden slide-in-up">
            <div className="flex flex-col md:flex-row">
              {/* Left Visual — ~30% */}
              <div className="md:w-[30%] w-full relative flex items-center justify-center p-8 md:p-6 overflow-hidden min-h-[220px]">
                {/* Central graphic — email with circular orbital rings */}
                <div className="relative z-10">
                  <svg
                    width="160"
                    height="160"
                    viewBox="0 0 160 160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Outer ring — slow rotation */}
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

                    {/* Middle ring — opposite direction */}
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

                    {/* Inner ring */}
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

                    {/* Soft glow behind email */}
                    <circle
                      cx="80"
                      cy="80"
                      r="30"
                      fill="rgba(167,139,250,0.08)"
                    />

                    {/* Email icon container */}
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

                    {/* Envelope flap */}
                    <path
                      d="M58 70 L80 86 L102 70"
                      fill="none"
                      stroke="rgba(167,139,250,0.6)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Small accent on outer ring */}
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

                    {/* Accent on middle ring */}
                    <circle
                      cx="80"
                      cy="26"
                      r="2.5"
                      fill="rgba(138,232,255,0.5)"
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
                  </svg>
                </div>
              </div>

              {/* Right Content — ~70% */}
              <div className="md:w-[70%] w-full p-8 flex flex-col items-center md:items-start justify-center text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                <p className="text-foreground/70 mb-6 max-w-2xl">
                  Whether you’re a beginner just starting your tech journey or
                  an experienced developer, Gravity welcomes you. Join us in
                  building an amazing tech community!
                </p>
                <MagicButton heightClass="h-11" href="/contact">
                  Get Started Today
                </MagicButton>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
