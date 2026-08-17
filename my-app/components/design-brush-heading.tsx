"use client";

import { useEffect, useState } from "react";
import "./design-brush-heading.css";

export function DesignBrushHeading({ text = "Design Wing" }: { text?: string }) {
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setPhase(0);
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1500);
    const t3 = setTimeout(() => setPhase(3), 2300);
    const tReset = setTimeout(() => {
      setPhase(0);
      setCycle((c) => c + 1);
    }, 11000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tReset);
    };
  }, [cycle]);

  return (
    <div className="dbh-wrap" key={cycle}>
      {/* SVG filter: realistic paint grain with visible fibers */}
      <svg className="dbh-defs" aria-hidden="true">
        <defs>
          <filter id="dbh-grain" x="-5%" y="-5%" width="110%" height="110%">
            {/* Generate horizontal fiber-like turbulence noise */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="2.8 0.4"
              numOctaves="4"
              seed="12"
              result="noise"
            />
            {/* Convert noise to grayscale */}
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0.4 0 0 0 0.3
                      0.4 0 0 0 0.3
                      0.4 0 0 0 0.3
                      0   0 0 3 -1"
              result="grain"
            />
            {/* Multiply grain ONLY over the source text pixels */}
            <feComposite in="grain" in2="SourceGraphic" operator="in" result="maskedGrain" />
            {/* Blend back with multiply: darkens paint where grain is heavy */}
            <feBlend in="SourceGraphic" in2="maskedGrain" mode="multiply" />
          </filter>
        </defs>
      </svg>

      {/* Base: white text (the blank canvas) */}
      <h1 className="dbh-canvas">{text}</h1>

      {/* Stroke 1: Diagonal from top-left, warm rose */}
      <span
        className={`dbh-layer dbh-s1 ${phase >= 1 ? "dbh-reveal" : ""}`}
        aria-hidden="true"
        style={{ filter: "url(#dbh-grain)" }}
      >
        {text}
      </span>

      {/* Stroke 2: Sweeping from right, deep crimson */}
      <span
        className={`dbh-layer dbh-s2 ${phase >= 2 ? "dbh-reveal" : ""}`}
        aria-hidden="true"
        style={{ filter: "url(#dbh-grain)" }}
      >
        {text}
      </span>

      {/* Stroke 3: Rising from bottom, soft pink */}
      <span
        className={`dbh-layer dbh-s3 ${phase >= 3 ? "dbh-reveal" : ""}`}
        aria-hidden="true"
        style={{ filter: "url(#dbh-grain)" }}
      >
        {text}
      </span>
    </div>
  );
}
