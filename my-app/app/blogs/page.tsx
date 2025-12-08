"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useEffect, useMemo, useState } from "react";
import BlogSubmitModal from "@/components/blog-submit-modal";
import { Search, X } from "lucide-react";
import MagicButton from "@/components/magic-button";

export default function BlogsPage() {
  const formatDate = (input: string | number | Date) =>
    new Date(input).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

  const [open, setOpen] = useState(false);
  const [approved, setApproved] = useState(() => [] as any[]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Seed from cache and fetch fresh on focus/initial mount
    let mounted = true;
    const KEY = "gravity_approved_blogs";

    // 1) Seed from localStorage
    try {
      const raw =
        typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) {
        const cached = JSON.parse(raw);
        if (Array.isArray(cached)) setApproved(cached);
      }
    } catch {}

    // 2) Fetch fresh
    async function fetchApproved() {
      try {
        const res = await fetch("/api/public/blogs");
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) setApproved(data);
        try {
          localStorage.setItem(KEY, JSON.stringify(data));
        } catch {}
      } catch (e) {
        console.error("Failed to fetch approved blogs", e);
      }
    }
    fetchApproved();
    const onFocus = () => fetchApproved();
    if (typeof window !== "undefined") {
      window.addEventListener("focus", onFocus);
    }
    return () => {
      mounted = false;
      if (typeof window !== "undefined") {
        window.removeEventListener("focus", onFocus);
      }
    };
  }, []);

  // Removed demo static posts from rendering.

  const normalizedQuery = query.trim().toLowerCase();

  const filteredApproved = useMemo(() => {
    if (!normalizedQuery) return approved;
    return approved.filter((b) => {
      return (
        (b.title || "").toLowerCase().includes(normalizedQuery) ||
        (b.author || "").toLowerCase().includes(normalizedQuery) ||
        (b.category || "").toLowerCase().includes(normalizedQuery) ||
        (b.rollNumber || "").toLowerCase().includes(normalizedQuery) ||
        (b.mediumUrl || "").toLowerCase().includes(normalizedQuery)
      );
    });
  }, [approved, normalizedQuery]);

  // No static posts displayed on this page.
  return (
    <>
      <Navigation />
      <main className="min-h-screen mt-10 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header with search */}
          <div className="mb-10 slide-in-up">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  Blog & Articles
                </h1>
                <p className="text-base md:text-lg text-foreground/70">
                  Insights and stories from our community
                </p>
              </div>

              <div className="flex items-center gap-2 w-full md:w-1/2">
                <div className="relative flex-1">
                  <input
                    id="blog-search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title, Author or Roll No..."
                    className="w-full pl-10 pr-10 py-2 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
                  {query ? (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50"
                    >
                      <X />
                    </button>
                  ) : null}
                </div>
                <button
                  onClick={() => {
                    // normalize query to trigger any filtering and remove focus
                    setQuery((q) => q.trim());
                    const el = document.querySelector(
                      "#blog-search-input"
                    ) as HTMLInputElement | null;
                    if (el) el.blur();
                  }}
                  className="px-4 py-2 rounded-lg bg-card border border-border hover:bg-card/80 text-sm flex items-center gap-2"
                  aria-label="Search blogs"
                >
                  <Search />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>

          {/* Blog Posts (latest on top) - grid like Events/Projects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/** Community submissions first */}
            {filteredApproved.map((b, idx) => (
              <a
                key={b.id}
                href={b.mediumUrl}
                target="_blank"
                rel="noreferrer"
                className="card-glow overflow-hidden group cursor-pointer slide-in-up flex flex-col sm:min-h-[420px]"
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                {/* Top area: show cover image if available; else logo */}
                {b.image ? (
                  <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
                    <img
                      src={b.image}
                      alt={(b.title || "Blog cover") as string}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="relative w-full aspect-video overflow-hidden bg-card flex items-center justify-center rounded-t-lg">
                    <div className="rounded-full bg-black/80 p-3 transition-transform duration-300 group-hover:scale-105">
                      <img
                        src="/gravity-logo.png"
                        alt="Gravity logo"
                        loading="lazy"
                        className="w-32 h-32 object-contain"
                      />
                    </div>
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {b.category ? (
                      <span className="text-sm font-medium text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">
                        {b.category}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all line-clamp-2">
                      {(b.title || "Medium Article") as string}
                    </h2>
                    {b.content ? (
                      <p className="text-foreground/70 text-sm line-clamp-3 mb-2">
                        {b.content}
                      </p>
                    ) : (
                      <p className="text-foreground/70 break-all text-sm mb-2">
                        {b.mediumUrl}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-foreground/60 pt-3 border-t border-border mt-4">
                    <div className="flex items-center gap-1">
                      <span>By</span>
                      <span className="font-medium">{b.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Roll</span>
                      <span className="font-medium">{b.rollNumber}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{formatDate(b.date || b.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}

            {/* Demo blogs intentionally not rendered */}
          </div>

          {filteredApproved.length === 0 && query.length > 0 && (
            <div className="mt-8 text-center text-foreground/60">
              No results found for "{query}"
            </div>
          )}
          {filteredApproved.length === 0 && query.length === 0 && (
            <div className="mt-8 text-center text-foreground/60">
             No blogs have been approved yet. Be the first to submit one!
            </div>
          )}

          {/* CTA for more blogs */}
          <div className="mt-16 card-glow p-8 text-center slide-in-up">
            <h2 className="text-3xl font-bold mb-4">Share Your Story</h2>
            <p className="text-foreground/70 mb-6">
              Are you working on something interesting? Share your insights with
              the Gravity community!
            </p>
            <MagicButton heightClass="h-11" onClick={() => setOpen(true)}>
              Submit Article
            </MagicButton>
          </div>
        </div>
      </main>
      <BlogSubmitModal
        open={open}
        onClose={() => {
          setOpen(false);
          (async () => {
            try {
              const res = await fetch("/api/public/blogs");
              if (res.ok) {
                setApproved(await res.json());
              }
            } catch {}
          })();
        }}
      />
      <Footer />
    </>
  );
}
