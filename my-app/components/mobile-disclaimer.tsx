"use client";

import { useState, useEffect } from "react";
import { Monitor } from "lucide-react";

const MOBILE_DISCLAIMER_KEY = "gravity-mobile-disclaimer-seen";

/**
 * Detects if the current device is a phone/tablet (true mobile device).
 * This cannot be bypassed by "Request Desktop Site" mode.
 */
function isTrueMobileDevice(): boolean {
  if (typeof window === "undefined") return false;

  const ua = navigator.userAgent || "";
  const mobileUA =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  if (mobileUA.test(ua)) return true;

  const platform =
    (navigator as any).userAgentData?.platform || navigator.platform || "";
  if (/iPad|iPhone|iPod|Android/i.test(platform)) return true;

  const hasTouch = navigator.maxTouchPoints > 0;
  const screenW = window.screen.width;
  const screenH = window.screen.height;
  const smallScreen = Math.min(screenW, screenH) < 500;

  if (hasTouch && smallScreen) return true;

  return false;
}

export function MobileDisclaimer() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isTrueMobileDevice()) return;

    // Only show once per session
    const seen = sessionStorage.getItem(MOBILE_DISCLAIMER_KEY);
    if (!seen) {
      setShow(true);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem(MOBILE_DISCLAIMER_KEY, "1");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      id="mobile-disclaimer-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        animation: "mobileDisclaimerFadeIn 0.3s ease-out",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          padding: "40px 32px",
          maxWidth: "340px",
          textAlign: "center",
        }}
      >
        {/* Monitor icon */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "16px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Monitor size={32} color="rgba(255,255,255,0.6)" />
        </div>

        {/* Message */}
        <div>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#fff",
              margin: "0 0 8px 0",
              letterSpacing: "-0.02em",
            }}
          >
            Best on Desktop
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.5)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            For the best experience, we recommend using a Desktop or PC.
          </p>
        </div>

        {/* Continue button */}
        <button
          onClick={handleDismiss}
          style={{
            padding: "12px 36px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#000",
            background: "#fff",
            border: "none",
            borderRadius: "999px",
            cursor: "pointer",
            letterSpacing: "0.02em",
            transition: "opacity 0.2s",
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.8";
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
          }}
        >
          Continue Anyway
        </button>
      </div>

      <style>{`
        @keyframes mobileDisclaimerFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
