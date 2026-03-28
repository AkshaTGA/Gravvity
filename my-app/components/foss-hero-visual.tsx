"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const UBUNTU_ASCII = [
  "            .-/+oossssoo+/-.           ",
  "        `:+ssssssssssssssssss+:`       ",
  "      -+ssssssssssssssssssyyssss+-     ",
  "    .ossssssssssssssssssdMMMNysssso.   ",
  "   /ssssssssssshdmmNNmmyNMMMMhssssss/  ",
  "  +ssssssssshmydMMMMMMMNddddyssssssss+ ",
  " /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/",
  ".ssssssssdMMMNhsssssssssshNMMMdssssssss.",
  "+sssssssNMMMdssssssssssssssymNNysssssss+",
  "sssssssymMMNysssssssssssssssssssssssssss",
  "ssssssshMMMNhsssssssssssssssssssssssssss",
  "+sssssssNMMMdssssssssssssssymNNysssssss+",
  ".ssssssssdMMMNhsssssssssshNMMMdssssssss.",
  " /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/",
  "  +sssssssssdmydMMMMMMMNddddyssssssss+ ",
  "   /ssssssssssshdmmNNmmyNMMMMhssssss/  ",
  "    .ossssssssssssssssssdMMMNysssso.   ",
  "      -+sssssssssssssssssyyyssss+-     ",
  "        `:+ssssssssssssssssss+:`       ",
  "            .-/+oossssoo+/-.           ",
];

const SYSTEM_INFO = [
  { label: "OS", value: "Gravity FOSS OS x86_64" },
  { label: "Host", value: "Gravity-Wing-01" },
  { label: "Kernel", value: "6.8.0-foss-custom" },
  { label: "Uptime", value: "99.99% (Always Up)" },
  { label: "Packages", value: "1337 (apt)" },
  { label: "Shell", value: "zsh 5.9" },
  { label: "Resolution", value: "1920x1080" },
  { label: "DE", value: "FOSS-Lab Interactive" },
  { label: "WM", value: "OpenWM" },
  { label: "Theme", value: "Gravity-Dark [GTK3]" },
  { label: "Terminal", value: "gravity-term" },
  { label: "CPU", value: "Open Collaboration Engine" },
  { label: "Memory", value: "1024MiB / Infinite" },
];

export function FossHeroVisual() {
  const [step, setStep] = useState<"typing" | "running" | "done">("typing");
  const [typedCommand, setTypedCommand] = useState("");
  const command = "neofetch";

  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (step !== "typing") return;
    let i = 0;
    const interval = setInterval(() => {
      setTypedCommand(command.slice(0, i + 1));
      i++;
      if (i === command.length) {
        clearInterval(interval);
        setTimeout(() => setStep("running"), 300);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [step, command]);

  // Run command transition
  useEffect(() => {
    if (step === "running") {
      const t = setTimeout(() => setStep("done"), 150);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div className="w-full h-full relative border border-white/10 rounded-2xl overflow-hidden bg-[#1a1b26] flex flex-col font-mono text-[10px] sm:text-xs shadow-xl">
      {/* Window Title Bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#16161e] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#f7768e]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#e0af68]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#9ece6a]"></div>
        </div>
        <div className="mx-auto text-white/40 text-[10px] font-medium tracking-wider">
          guest@gravity-foss:~
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-4 text-[#a9b1d6] whitespace-pre-wrap leading-relaxed overflow-hidden flex flex-col gap-2">
        {/* Command line */}
        <div className="flex items-center">
          <span className="text-[#9ece6a] font-semibold mr-2">
            guest@gravity-foss:~$
          </span>
          <span className="text-[#c0caf5]">{typedCommand}</span>
          {step === "typing" && (
            <span
              className={`w-1.5 h-3 bg-[#c0caf5] ml-0.5 ${showCursor ? "opacity-100" : "opacity-0"}`}
            ></span>
          )}
        </div>

        {/* Neofetch Output */}
        {step === "done" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2"
          >
            {/* ASCII Logo */}
            <div className="text-[#ff9e64] hidden sm:block shrink-0 leading-tight">
              {UBUNTU_ASCII.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>

            {/* System Info */}
            <div className="flex flex-col gap-0.5 min-w-0">
              <div className="text-[#7aa2f7] font-bold mb-1">
                guest<span className="text-[#a9b1d6]">@</span>gravity-foss
              </div>
              <div className="text-[#a9b1d6] mb-1">-------------------</div>

              {SYSTEM_INFO.map((info, i) => (
                <div key={i} className="flex">
                  <span className="text-[#7aa2f7] font-semibold w-24 shrink-0">
                    {info.label}
                  </span>
                  <span className="text-[#c0caf5] truncate">{info.value}</span>
                </div>
              ))}

              <div className="mt-2 flex gap-1">
                <div className="w-4 h-4 bg-[#1a1b26]"></div>
                <div className="w-4 h-4 bg-[#f7768e]"></div>
                <div className="w-4 h-4 bg-[#9ece6a]"></div>
                <div className="w-4 h-4 bg-[#e0af68]"></div>
                <div className="w-4 h-4 bg-[#7aa2f7]"></div>
                <div className="w-4 h-4 bg-[#bb9af7]"></div>
                <div className="w-4 h-4 bg-[#7dcfff]"></div>
                <div className="w-4 h-4 bg-[#a9b1d6]"></div>
              </div>
            </div>
          </motion.div>
        )}

        {/* New prompt */}
        {step === "done" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center mt-2"
          >
            <span className="text-[#9ece6a] font-semibold mr-2">
              guest@gravity-foss:~$
            </span>
            <span
              className={`w-1.5 h-3 bg-[#c0caf5] ml-0.5 ${showCursor ? "opacity-100" : "opacity-0"}`}
            ></span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
