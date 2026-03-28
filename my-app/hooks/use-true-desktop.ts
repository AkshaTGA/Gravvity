"use client";

import { useState, useEffect } from "react";

/**
 * Detects whether the user is on a true desktop/PC device.
 * Unlike CSS media queries or matchMedia width checks, this cannot be
 * bypassed by toggling "Request Desktop Site" in mobile browsers.
 *
 * Checks:
 * 1. User-Agent for mobile device indicators
 * 2. navigator.maxTouchPoints (phones/tablets usually have > 0)
 * 3. Screen physical dimensions (screen.width/height remain small on phones
 *    even in "desktop site" mode)
 * 4. Coarse pointer media query (phones have coarse primary pointer)
 */
export function useIsTrueDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    function check(): boolean {
      // 1. User-Agent check
      const ua = navigator.userAgent || "";
      const mobileUARegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
      if (mobileUARegex.test(ua)) return false;

      // 2. Platform check (covers iPads with desktop UA)
      const platform = (navigator as any).userAgentData?.platform || navigator.platform || "";
      if (/iPad|iPhone|iPod|Android/i.test(platform)) return false;

      // 3. Max touch points – most phones/tablets have touch, desktops usually 0
      //    (Some touch-screen laptops have > 0, but they have large screens)
      const hasTouch = navigator.maxTouchPoints > 0;

      // 4. Physical screen size – phones have small physical screens
      //    Even in "desktop site" mode, screen.width stays at the device's
      //    physical resolution (CSS pixels), typically ≤ 450 for phones
      const screenW = window.screen.width;
      const screenH = window.screen.height;
      const smallScreen = Math.min(screenW, screenH) < 500;

      // If device has touch AND a small physical screen → phone
      if (hasTouch && smallScreen) return false;

      // 5. Coarse pointer media query (phones report "coarse")
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      // If only coarse pointer and small screen → phone
      if (coarsePointer && !finePointer && smallScreen) return false;

      return true;
    }

    setIsDesktop(check());
  }, []);

  return isDesktop;
}
