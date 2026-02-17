"use client";

import type React from "react";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useState } from "react";
import {
  Mail,
  MapPin,
  MessageSquare,
  CheckCircle,
  Loader2,
} from "lucide-react";
import MagicButton from "@/components/magic-button";

const nextFrame = () =>
  new Promise<void>((resolve) =>
    typeof window === "undefined"
      ? resolve()
      : requestAnimationFrame(() => resolve()),
  );

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  type Step =
    | "idle"
    | "validating"
    | "moderating"
    | "checkingEmail"
    | "sending"
    | "done"
    | "error";
  const [step, setStep] = useState<Step>("idle");

  const stageOrder: Record<Exclude<Step, "idle">, number> = {
    validating: 0,
    moderating: 1,
    checkingEmail: 2,
    sending: 3,
    done: 4,
    error: 4,
  };

  const stages: {
    key: Exclude<Step, "idle" | "done" | "error">;
    label: string;
  }[] = [
    { key: "validating", label: "Verifying your message details" },
    { key: "moderating", label: "Checking with reviewer for appropriateness" },
    { key: "checkingEmail", label: "Verifying email deliverability" },
    { key: "sending", label: "Sending email" },
  ];

  const stageState = (target: (typeof stages)[number]["key"]) => {
    if (step === "idle") return "pending";
    const current = stageOrder[step as Exclude<Step, "idle">];
    const idx = stageOrder[target];
    if (step === "done") return "done";
    if (step === "error") return idx < current ? "done" : "pending";
    if (current > idx) return "done";
    if (current === idx) return "active";
    return "pending";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    setStep("validating");
    try {
      setStep("moderating");
      await nextFrame();
      setStep("checkingEmail");
      await nextFrame();
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setStep("sending");
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to send message");
      }
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setStep("done");
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err: any) {
      setError(err?.message || "Network error");
      setStep("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen mt-10 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-16 slide-in-up">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
              Get In Touch
            </h1>
            <p className="text-xl text-center text-foreground/70">
              We’d love to hear from you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8 slide-in-up">
              <div className="card-glow p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--brand-from)] to-[var(--brand-to)] flex items-center justify-center shrink-0">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-foreground/70">gravity@iiita.ac.in</p>
                  </div>
                </div>
              </div>

              <div className="card-glow p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--brand-from)] to-[var(--brand-to)] flex items-center justify-center shrink-0">
                    <MessageSquare size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Discord</h3>
                    <p className="text-foreground/70">
                      Join our community server
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className="card-glow p-8 slide-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    required
                  />
                </div>

                <MagicButton
                  type="submit"
                  className="w-full"
                  heightClass="h-12"
                >
                  {sending
                    ? "Sending…"
                    : submitted
                      ? "Message Sent!"
                      : "Send Message"}
                </MagicButton>

                {sending && (
                  <div className="mt-2 p-3 rounded-lg bg-card border border-border text-sm text-foreground/80 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                      <span>Processing your request…</span>
                    </div>
                    <div className="space-y-1.5">
                      {stages.map((s) => {
                        const state = stageState(s.key);
                        return (
                          <div
                            key={s.key}
                            className="flex items-center gap-2 text-xs sm:text-sm"
                          >
                            {state === "done" ? (
                              <CheckCircle
                                size={16}
                                className="text-green-400"
                              />
                            ) : state === "active" ? (
                              <Loader2
                                size={16}
                                className="animate-spin text-primary"
                              />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-border" />
                            )}
                            <span
                              className={
                                state === "active"
                                  ? "text-foreground"
                                  : state === "done"
                                    ? "text-foreground/70"
                                    : "text-foreground/50"
                              }
                            >
                              {s.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mt-2 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
                    {error}
                  </div>
                )}
              </form>

              {submitted && (
                <div className="mt-4 p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300">
                  Thank you for your message! We’ll get back to you soon.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
