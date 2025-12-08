"use client";
import { cn } from "@/lib/utils";
import {
  motion,
  useInView,
  Transition,
  Easing,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import React, { useRef, useEffect, useState, useMemo } from "react";

export function LettersPullUp({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const splittedText = text.split("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const pullupVariant = {
    initial: { y: 8, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.03,
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as Easing,
      },
    }),
  };

  return (
    <div ref={ref} className="flex justify-center">
      {splittedText.map((current, i) => (
        <motion.div
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          custom={i}
          className={cn(
            "text-2xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-16",
            className
          )}
        >
          {current == " " ? <span>&nbsp;</span> : current}
        </motion.div>
      ))}
    </div>
  );
}

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

function BlurTextComponent({
  text = "",
  delay = 50,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.2,
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const ref = useRef<HTMLParagraphElement>(null);
  // Animate once only - never re-trigger
  const inView = useInView(ref, { once: true, amount: threshold });

  // Detect mobile for performance optimization
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
  }, []);

  // Simple fade + slide with subtle blur for visual effect (no blur on mobile)
  const fromState = useMemo(
    () =>
      direction === "top"
        ? { opacity: 0, y: -15, filter: isMobile ? "blur(0px)" : "blur(3px)" }
        : { opacity: 0, y: 15, filter: isMobile ? "blur(0px)" : "blur(3px)" },
    [direction, isMobile]
  );

  const toState = useMemo(
    () => ({ opacity: 1, y: 0, filter: "blur(0px)" }),
    []
  );

  const finalFrom = animationFrom ?? fromState;
  const finalTo = animationTo?.[animationTo.length - 1] ?? toState;

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {elements.map((segment, index) => {
        const spanTransition: Transition = {
          duration: 0.4,
          delay: (index * delay) / 1000,
          ease: "easeOut",
        };

        return (
          <motion.span
            key={index}
            initial={finalFrom}
            animate={inView ? finalTo : finalFrom}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
            style={{
              display: "inline-block",
            }}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </p>
  );
}

export const BlurText: React.FC<BlurTextProps> = React.memo(BlurTextComponent);

export function GradualSpacing({
  text = "Our Seven Wings",
  className = "",
}: {
  text: string;
  className: string;
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div
      ref={ref}
      className="flex flex-wrap justify-center items-center gap-x-2 gap-y-0"
    >
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="flex">
          {word.split("").map((char, charIndex) => (
            <motion.p
              key={`${wordIndex}-${charIndex}`}
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{
                duration: 0.4,
                delay: (wordIndex * word.length + charIndex) * 0.03,
                ease: "easeOut",
              }}
              className={className}
            >
              {char}
            </motion.p>
          ))}
        </div>
      ))}
    </div>
  );
}
