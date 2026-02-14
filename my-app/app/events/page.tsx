"use client";

import { useEffect, useState, useMemo } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Calendar, MapPin, X } from "lucide-react";
import MagicButton from "@/components/magic-button";
import { useEvents } from "@/hooks/use-events";
import type { Event } from "@/lib/types";
import { parseEventDescription } from "@/lib/utils";

type EventCardProps = {
  event: Event;
  index: number;
  setSelected: (e: Event | null) => void;
};

function EventCard({ event, index, setSelected }: EventCardProps) {
  return (
    <div
      key={event.id}
      className="card-glow overflow-hidden group slide-in-up flex flex-col hover:scale-101 mx-auto w-full max-w-110 h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image Section */}
      <div className="relative w-full cursor-pointer aspect-square sm:aspect-3/2 md:aspect-square bg-black overflow-hidden">
        <img
          src={event.image || "/gravity-logo.png"}
          alt={event.title}
          onClick={() => setSelected(event)}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 ease-out"
        />
      </div>

      {/* Content */}
      <div className="px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 flex flex-col flex-1">
        <div className="inline-block px-3 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-xs font-medium text-purple-300 mb-2">
          {event.wing}
        </div>

        <h3 className="text-base sm:text-lg font-semibold group-hover:gradient-text transition-all line-clamp-2">
          {event.title}
        </h3>

        {/* Date + Venue */}
        <div className="pt-3 border-t border-border mt-2 flex flex-wrap justify-between gap-3 text-sm text-foreground/60">
          <div className="flex items-center gap-1.5">
            <Calendar size={15} />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin size={15} />
            <span>Campus</span>
          </div>
        </div>

        <button
          onClick={() => setSelected(event)}
          className="mt-3 text-sm font-medium text-primary hover:opacity-80 transition inline-flex items-center gap-1 self-start"
        >
          More <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const events = useEvents();
  const [selected, setSelected] = useState<Event | null>(null);
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<
    "idle" | "loading" | "ok" | "error"
  >("idle");
  const [subMessage, setSubMessage] = useState("");

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", onKey);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", onKey);
      }
    };
  }, []);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllPast, setShowAllPast] = useState(false);
  const VISIBLE_LIMIT = 6;

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const upcoming: Event[] = [];
    const past: Event[] = [];

    for (const ev of events) {
      const evDate = new Date(ev.date);
      if (
        !isNaN(evDate.getTime()) &&
        evDate.getTime() < startOfToday.getTime()
      ) {
        past.push(ev);
      } else {
        upcoming.push(ev);
      }
    }

    // Upcoming: soonest first. Past: most recent first.
    upcoming.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    past.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events]);

  const visibleUpcoming = showAllUpcoming
    ? upcomingEvents
    : upcomingEvents.slice(0, VISIBLE_LIMIT);
  const visiblePast = showAllPast
    ? pastEvents
    : pastEvents.slice(0, VISIBLE_LIMIT);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 sm:pt-24 md:pt-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 slide-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-3 sm:mb-4">
              Events & Activities
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 px-4">
              Join our exciting events and competitions
            </p>
          </div>

          {/* Events Grid */}
          {/* Upcoming Events (only when available) */}
          {upcomingEvents.length > 0 && (
            <section className="mb-10 sm:mb-12 md:mb-14">
              <div className="flex items-end justify-between gap-4 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                    Upcoming Events
                  </h2>
                  <p className="text-sm sm:text-base text-foreground/70">
                    Don’t miss what’s next
                  </p>
                </div>
                <span className="text-sm text-foreground/60">
                  {upcomingEvents.length}
                </span>
              </div>

              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                  {visibleUpcoming.map((event, index) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      index={index}
                      setSelected={setSelected}
                    />
                  ))}
                </div>

                <div className="mt-6 sm:mt-8 flex justify-center px-4">
                  {upcomingEvents.length > VISIBLE_LIMIT && (
                    <button
                      onClick={() => setShowAllUpcoming((s) => !s)}
                      className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-card border border-border hover:bg-card/80 transition-all text-sm sm:text-base font-medium hover:scale-105"
                    >
                      {showAllUpcoming
                        ? "Show Less"
                        : `Show All (${upcomingEvents.length})`}
                    </button>
                  )}
                </div>
              </>
            </section>
          )}

          {/* Past Events */}
          <section className="mb-10 sm:mb-12 md:mb-14">
            <div className="flex items-end justify-between gap-4 mb-4 sm:mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Past Events
                </h2>
                <p className="text-sm sm:text-base text-foreground/70">
                  Highlights from previous activities
                </p>
              </div>
              <span className="text-sm text-foreground/60">
                {pastEvents.length}
              </span>
            </div>

            {pastEvents.length === 0 ? (
              <div className="card-glow p-5 sm:p-6 text-center text-foreground/70">
                No past events yet.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                  {visiblePast.map((event, index) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      index={index}
                      setSelected={setSelected}
                    />
                  ))}
                </div>

                <div className="mt-6 sm:mt-8 flex justify-center px-4">
                  {pastEvents.length > VISIBLE_LIMIT && (
                    <button
                      onClick={() => setShowAllPast((s) => !s)}
                      className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-card border border-border hover:bg-card/80 transition-all text-sm sm:text-base font-medium hover:scale-105"
                    >
                      {showAllPast
                        ? "Show Less"
                        : `Show All (${pastEvents.length})`}
                    </button>
                  )}
                </div>
              </>
            )}
          </section>

          {/* Modal Overlay for selected event */}
          {selected && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelected(null)}
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
            >
              <div
                className="relative card-glow bg-card border border-border w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 rounded-lg p-1.5 sm:p-2 bg-black/70 hover:bg-black/90 text-white transition-colors shadow-lg"
                  aria-label="Close"
                >
                  <X size={18} className="sm:w-5 sm:h-5" />
                </button>

                {/* Responsive layout: stack on mobile, side-by-side on desktop */}
                <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto custom-scrollbar">
                  {/* Left: Image */}
                  <div className="relative flex items-center justify-center bg-black/20 p-4 sm:p-6 md:p-8 lg:p-10 md:w-1/2 md:min-h-125">
                    <img
                      src={selected.image || "/gravity-logo.png"}
                      alt={selected.title}
                      loading="lazy"
                      className="w-full h-auto max-h-62.5 sm:max-h-75 md:max-h-112.5 object-contain rounded-xl transition-transform duration-500 ease-out hover:scale-105"
                    />
                  </div>

                  {/* Right: Text content */}
                  <div className="flex flex-col md:w-1/2 p-4 sm:p-5 md:p-6 lg:p-8 md:overflow-y-auto custom-scrollbar">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-foreground pr-8">
                      {selected.title}
                    </h3>
                    {(() => {
                      const { format, content } = parseEventDescription(
                        selected.description,
                      );
                      if (format === "html") {
                        return (
                          <div
                            className="text-xs sm:text-sm md:text-base text-foreground/80 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: content }}
                          />
                        );
                      }
                      return (
                        <div className="text-xs sm:text-sm md:text-base text-foreground/80 leading-relaxed whitespace-pre-line">
                          {content}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-8 sm:mt-12 md:mt-16 card-glow overflow-hidden slide-in-up max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row">
              {/* Left Content — ~70% */}
              <div className="md:w-[70%] w-full p-5 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                  Stay Updated
                </h2>
                <p className="text-sm sm:text-base text-foreground/70 mb-4 sm:mb-6 max-w-md">
                  Subscribe to get notifications about upcoming events
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full max-w-md">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-card border border-border text-sm sm:text-base text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                  <MagicButton
                    onClick={async () => {
                      const valid =
                        /^(?:[a-zA-Z0-9_.'+\-]+)@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}$/.test(
                          email,
                        );
                      const email_validation_APIKEY =
                        process.env.NEXT_PUBLIC_EMAIL_VALIDATION_API_KEY ||
                        "75bc0b34614f4204960b0b3e6097c81b";
                      if (!valid) {
                        setSubStatus("error");
                        setSubMessage("Enter a valid email");
                        return;
                      }
                      try {
                        setSubStatus("loading");
                        const check = await fetch(
                          `https://emailreputation.abstractapi.com/v1?api_key=${email_validation_APIKEY}&&email=${email}`,
                        );
                        const d = await check.json();
                        console.log(d.email_deliverability.status);
                        if (d.email_deliverability.status == "undeliverable") {
                          setSubStatus("error");
                          setSubMessage(
                            "The Email you provided was undeliverable",
                          );
                          return;
                        }

                        const res = await fetch("/api/subscribe", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ email }),
                        });
                        const data = await res.json();
                        if (res.ok && data.ok) {
                          setSubStatus("ok");
                          setSubMessage("You're subscribed!");
                          setEmail("");
                        } else {
                          setSubStatus("error");
                          setSubMessage(data?.error || "Something went wrong");
                        }
                      } catch (e) {
                        setSubStatus("error");
                        setSubMessage("Network error");
                      }
                    }}
                    disabled={subStatus === "loading"}
                    heightClass="h-10"
                    className="w-5/6 sm:w-auto self-center"
                  >
                    {subStatus === "loading" ? "Subscribing…" : "Subscribe"}
                  </MagicButton>
                </div>
                {subStatus !== "idle" && (
                  <p
                    className={`mt-3 text-sm ${
                      subStatus === "ok" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {subMessage}
                  </p>
                )}
              </div>

              {/* Right Visual — ~30% */}
              <div className="md:w-[30%] w-full relative flex items-center justify-center p-6 overflow-hidden">
                {/* Notification bell with radiating pulses */}
                <div className="relative z-10">
                  <svg
                    width="140"
                    height="140"
                    viewBox="0 0 140 140"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Radiating pulse waves from bell */}
                    <circle
                      cx="70"
                      cy="65"
                      r="68"
                      stroke="rgba(167,139,250,0.5)"
                      strokeWidth="2"
                      fill="none"
                    >
                      <animate
                        attributeName="r"
                        values="35;85;35"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.7;0;0.7"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="70"
                      cy="65"
                      r="48"
                      stroke="rgba(138,232,255,0.6)"
                      strokeWidth="1.5"
                      fill="none"
                    >
                      <animate
                        attributeName="r"
                        values="25;60;25"
                        dur="3s"
                        repeatCount="indefinite"
                        begin="1.5s"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.8;0;0.8"
                        dur="3s"
                        repeatCount="indefinite"
                        begin="1.5s"
                      />
                    </circle>

                    {/* Soft glow behind bell */}
                    <circle
                      cx="70"
                      cy="65"
                      r="28"
                      fill="rgba(167,139,250,0.12)"
                    />

                    {/* Bell icon */}
                    <g transform="translate(70, 65)">
                      {/* Bell body */}
                      <path
                        d="M0 -20 C-11 -20 -16 -10 -16 0 L-16 7 L-20 13 L20 13 L16 7 L16 0 C16 -10 11 -20 0 -20Z"
                        fill="rgba(167,139,250,0.2)"
                        stroke="rgba(167,139,250,0.7)"
                        strokeWidth="1.8"
                      />
                      {/* Bell handle/top */}
                      <ellipse
                        cx="0"
                        cy="-22"
                        rx="4"
                        ry="3"
                        fill="none"
                        stroke="rgba(167,139,250,0.65)"
                        strokeWidth="1.8"
                      />
                      {/* Bell clapper */}
                      <ellipse
                        cx="0"
                        cy="16"
                        rx="5"
                        ry="3"
                        fill="rgba(167,139,250,0.5)"
                        stroke="rgba(167,139,250,0.4)"
                        strokeWidth="0.8"
                      />
                    </g>

                    {/* Subtle inner glow ring */}
                    <circle
                      cx="70"
                      cy="65"
                      r="32"
                      stroke="rgba(138,232,255,0.2)"
                      strokeWidth="0.8"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
