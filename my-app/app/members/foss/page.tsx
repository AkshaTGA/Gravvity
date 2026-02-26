"use client";

import { useState } from "react";
import { MembersPageContent } from "@/components/members-page-content";
import { FossUbuntuDesktop } from "@/components/foss-ubuntu-desktop";

export default function FossMembersPage() {
  const [showDesktop, setShowDesktop] = useState(false);

  if (showDesktop) {
    return <FossUbuntuDesktop onExit={() => setShowDesktop(false)} />;
  }

  return (
    <MembersPageContent
      wingFilter="FOSS"
      headerAction={
        <button
          onClick={() => setShowDesktop(true)}
          style={{
            padding: "10px 24px",
            fontSize: 14,
            fontWeight: 600,
            background: "#dd4814",
            color: "#fff",
            border: "none",
            borderRadius: 24,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            transition: "all 0.25s",
            letterSpacing: 0.4,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#e9652e";
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(221,72,20,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#dd4814";
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="36" fill="#fff" opacity="0.2"/>
            <circle cx="40" cy="40" r="12" fill="none" stroke="#fff" strokeWidth="5"/>
            <circle cx="40" cy="18" r="5" fill="#fff"/>
            <circle cx="21" cy="51" r="5" fill="#fff"/>
            <circle cx="59" cy="51" r="5" fill="#fff"/>
          </svg>
          Enter Ubuntu Desktop
        </button>
      }
    />
  );
}
