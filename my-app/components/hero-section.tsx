"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Grab, Sparkles } from "lucide-react";
const Galaxy = dynamic(() => import("./Galaxy"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0" />,
});
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import MagicButton from "@/components/magic-button";
import { LettersPullUp } from "@/components/Text-Effect";
import { motion, useAnimation } from "framer-motion";

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

export function HeroSection() {
  const isMobile = useIsMobile();
  const logoRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef(0);
  const [data, setdata] = useState(false);

  const [_k, _sk] = useState("");
  const [_b, _sb] = useState<Array<{ id: number; text: string; pos: number }>>(
    [],
  );
  const [_id, _sid] = useState(0);
  const [_fm, _sfm] = useState(false);
  const _controls = useAnimation();
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileStars = useMemo(
    () =>
      Array.from({ length: 15 }, (_, index) => {
        const seed = index + 1;
        return {
          id: index,
          top: (seed * 23) % 100,
          left: (seed * 47) % 100,
          animationDelay: ((seed * 13) % 30) / 10,
          animationDuration: 2 + ((seed * 19) % 20) / 10,
          opacity: 0.3 + ((seed * 11) % 5) / 10,
        };
      }),
    [],
  );

  const scheduleReset = useCallback(
    (delay = 2000) => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
      resetTimer.current = setTimeout(() => {
        _controls.start({
          x: 0,
          y: 0,
          transition: { duration: 0.2, ease: "easeOut" },
        });
        resetTimer.current = null;
      }, delay);
    },
    [_controls],
  );

  useEffect(() => {
    console.log(
      "%cCTRL+SPACE ^_^ ",
      "color: rgb(255,255,255); background: BLACK; font-size: 24px;border-radius:100px; font-weight: bold; padding: 10px;",
    );
  }, [_controls, scheduleReset]);

  useEffect(() => {
    const _h = (e: KeyboardEvent) => {
      const _c = e.shiftKey && e.key === "G" ? "g" : e.key.toLowerCase();
      const _n = _k + _c;
      const _i = _n.length - 1;

      if (_k.length > 0 && _i < _t.length && _c === _t[_i]) {
        _sk(_n);
        if (_i < _m.length) {
          const _nid = _id + 1;
          _sid(_nid);
          _sb((p) => [
            ...p,
            {
              id: _nid,
              text: _m[_i],
              pos: Math.floor(10 + Math.random() * 60),
            },
          ]);
          setTimeout(() => _sb((p) => p.filter((b) => b.id !== _nid)), 4000);
        }
        if (_n === _t) setTimeout(() => _sk(""), 5000);
      } else if (_c === "g" && e.shiftKey) {
        _sk("g");
        const _nid = _id + 1;
        _sid(_nid);
        _sb([
          { id: _nid, text: _m[0], pos: Math.floor(10 + Math.random() * 60) },
        ]);
        setTimeout(() => _sb((p) => p.filter((b) => b.id !== _nid)), 4000);
      } else {
        _sk("");
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", _h);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", _h);
      }
    };
  }, [_k, _id]);

  useEffect(() => {
    const _togg = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === "Space") {
        try {
          e.preventDefault();
        } catch {}
        _sfm((p) => {
          const n = !p;
          if (!n) {
            if (resetTimer.current) {
              clearTimeout(resetTimer.current);
              resetTimer.current = null;
            }
            _controls.start({ x: 0, y: 0, transition: { duration: 0.3 } });
          } else {
            scheduleReset(2000);
          }
          return n;
        });
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", _togg);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", _togg);
      }
    };
  }, [_controls, scheduleReset]);

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
        resetTimer.current = null;
      }
    };
  }, []);

  const handleLogoClick = () => {
    // Toggle spin class without triggering React re-render
    const el = logoRef.current;
    if (el) {
      el.classList.add("logo-spin-once");
    }

    // Track clicks in a ref to avoid re-render each click
    counterRef.current = counterRef.current + 1;
    if (counterRef.current === 10) {
      setdata(true);
      setTimeout(() => {
        setdata(false);
        counterRef.current = 0;
      }, 5000);
    }
  };

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-4 md:pt-8">
      {/* Galaxy background covering the whole hero - disabled on mobile for performance */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Galaxy />
        </div>
      )}
      {/* Mobile-optimized animated background */}
      {isMobile && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-purple-900/30 via-purple-800/10 to-black animate-gradient" />
          <div
            className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "4s" }}
          />
          {/* Lightweight particle stars */}
          {mobileStars.map((star) => (
            <div
              key={star.id}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                animationDelay: `${star.animationDelay}s`,
                animationDuration: `${star.animationDuration}s`,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-2 mb-6 flex justify-center"
        >
          <Link
            href="/events/iii"
            className="group inline-flex items-center gap-2 rounded-full border border-cyan-300/45 bg-linear-to-r from-[#2b155c]/95 via-[#132039]/95 to-[#10314f]/95 px-5 py-2.5 text-sm font-bold tracking-wide text-white shadow-[0_0_34px_rgba(138,232,255,0.28)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-200/80 hover:shadow-[0_0_42px_rgba(166,140,255,0.45)]"
          >
            <Sparkles className="h-4 w-4 text-cyan-300" />
            <span className="text-cyan-200">HOT</span>
            <span className="text-white">III 5.0 is live</span>
            <ArrowRight className="h-4 w-4 text-cyan-200 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <div className="pt-8 flex justify-center">
          <div
            className="flex items-center gap-1"
            role="img"
            aria-label="Gravity Logo"
          >
            <motion.div
              className={`${
                !_fm ? "cursor-pointer" : "cursor-grab"
              } z-100 active:cursor-grabbing inline-flex mb-2 hero-g-hover`}
              drag={!isMobile}
              animate={isMobile ? { scale: [1, 1.008, 1] } : _controls}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              dragElastic={0.5}
              dragTransition={{ bounceStiffness: 500, bounceDamping: 10 }}
              dragConstraints={{
                top: -70,
                left: -500,
                right: 500,
                bottom: 350,
              }}
              dragListener={isMobile ? false : _fm}
              onDragStart={() => {
                if (resetTimer.current) {
                  clearTimeout(resetTimer.current);
                  resetTimer.current = null;
                }
                _controls.stop();
              }}
              onDragEnd={() => {
                scheduleReset(100);
              }}
              onPointerDown={() => {
                if (resetTimer.current) {
                  clearTimeout(resetTimer.current);
                  resetTimer.current = null;
                }
              }}
              onClick={handleLogoClick}
              ref={logoRef}
              onAnimationEnd={(e) => {
                (e.currentTarget as HTMLDivElement).classList.remove(
                  "logo-spin-once",
                );
              }}
            >
              <img
                src="/gravity-logo.ico"
                alt="Gravity G"
                className="h-12 sm:h-20 sm:w-20 object-contain drop-shadow-[0_0_12px_rgba(124,92,255,0.35)] hero-g-float select-none opacity-100!"
                loading="lazy"
                decoding="async"
                draggable={false}
                style={{ opacity: 1 }}
              />
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              <img
                src="/GRAVITY_Cover_No_BG.png"
                alt="Gravity"
                className="h-12 sm:h-30 w-auto object-contain drop-shadow-[0_0_16px_rgba(124,92,255,0.35)] select-none pointer-events-none"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </motion.div>
          </div>
        </div>

        {/* Main Heading */}
        <div className={isMobile ? "animate-fade-in-up" : ""}>
          <LettersPullUp
            text={`TECHNICAL SOCIETY`}
            className="select-none gradient-text"
          />
        </div>

        {/* Subheading */}
        <p
          className={`text-sm md:text-2xl selection:bg-[#65555563] selection:text-white text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed ${
            isMobile ? "animate-fade-in-up" : ""
          }`}
          style={isMobile ? { animationDelay: "0.2s" } : {}}
        >
          Five wings of innovation: Competitive Coding, Web Development,
          Private AI, Design, and FOSS
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 ${
            isMobile ? "animate-fade-in-up" : ""
          }`}
          style={isMobile ? { animationDelay: "0.4s" } : {}}
        >
          <MagicButton
            href="#wings"
            className="font-bold w-60 sm:w-auto self-center"
          >
            <span>Explore Wings</span>
            <ArrowRight size={20} />
          </MagicButton>
          <MagicButton
            href="/contact"
            className="font-bold w-56 sm:w-auto self-center"
            heightClass="h-12"
          >
            Get in Touch
          </MagicButton>
        </div>
      </div>

      {data && <S1 />}
      <S2 __b={_b} />
    </section>
  );
}

const S1: React.FC = (): React.JSX.Element => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 1 }}
    className="fixed bottom-8 left-1/2 translate-x-1/2 z-50 px-6 py-3 rounded-full backdrop-blur-xs bg-white/10 border border-white/20 shadow-lg"
  >
    <p className="flex items-center gap-2 text-white text-sm font-medium">
      <Sparkles className="w-4 h-4 text-yellow-400" /> You found one of the
      secrets, Try saying the one-word secret. ;&gt;
    </p>
  </motion.div>
);

const S2: React.FC<{
  __b: Array<{ id: number; text: string; pos: number }>;
}> = ({ __b }) => (
  <>
    {__b.map((_bb) => (
      <motion.div
        key={_bb.id}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: [0, 1, 1, 0], y: -200 }}
        transition={{ duration: 3.5, ease: "easeOut" }}
        className="fixed z-50 px-4 py-2 rounded-full backdrop-blur-md bg-linear-to-br from-purple-500/20 to-pink-500/20 border border-white/30 shadow-xl pointer-events-none"
        style={{
          right: `${10 + (_bb.id % 5) * 15}%`,
          top: `${_bb.pos}%`,
        }}
      >
        <span className="text-white font-medium text-sm">{_bb.text}</span>
      </motion.div>
    ))}
  </>
);

let _m = ["Hey,", "the", "footer", "seems", "a", "bit", "sus."];
let _t = "gravity";
