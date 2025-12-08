"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import MagicButton from "@/components/magic-button";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { submitBlog } from "@/lib/blog-store";

function isMediumUrl(url: string) {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    // Accept medium.com or *.medium.com or link.medium.com
    return host === "medium.com" || host.endsWith(".medium.com");
  } catch {
    return false;
  }
}

export default function BlogSubmitModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [author, setAuthor] = useState("");
  const [roll, setRoll] = useState("");
  const [title, setTitle] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [localPreview, setLocalPreview] = useState<string>("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState("");

  useEffect(() => {
    if (open) {
      setAuthor("");
      setRoll("");
      setLink("");
      setTitle("");
      setDatePublished("");
      setCategory("");
      setImage("");
      setUploading(false);
      setUploadError("");
      if (localPreview) {
        URL.revokeObjectURL(localPreview);
        setLocalPreview("");
      }
      setContent("");
      setError("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full mx-4 sm:mx-auto max-w-md md:max-w-lg lg:max-w-xl card-glow p-4 sm:p-6 rounded-2xl bg-card max-h-[85vh] overflow-y-auto"
      >
        <h3 className="text-xl font-bold mb-4">Submit Medium Blog</h3>
        {error && <div className="mb-3 text-sm text-red-400">{error}</div>}
        {submitted ? (
          <div className="flex items-center gap-3 p-4 rounded-md bg-green-900/70 border border-green-700">
            <CheckCircle className="text-green-300" />
            <div>
              <div className="font-semibold text-green-100">{submittedMsg}</div>
              <div className="text-sm text-green-200/80">
                Thanks — an admin will review your submission shortly.
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const trimmed = link.trim();
              if (!title.trim() || !author.trim() || !roll.trim() || !trimmed) {
                setError("All fields are required");
                return;
              }
              if (!isMediumUrl(trimmed)) {
                setError("Only Medium links are allowed (medium.com)");
                return;
              }
              if (uploading) {
                setError("Please wait for image upload to finish");
                return;
              }
              try {
                const res = await fetch("/api/blogs", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    title: title.trim(),
                    author: author.trim(),
                    content: content.trim(),
                    category: category.trim(),
                    image: image.trim(),
                    rollNumber: roll.trim(),
                    mediumUrl: trimmed,
                    date: datePublished || new Date().toISOString(),
                  }),
                });

                if (!res.ok) {
                  const errorData = await res.json().catch(() => ({}));
                  const errorMsg =
                    errorData?.error || `Server error (${res.status})`;
                  throw new Error(errorMsg);
                }

                // Optional: keep local fallback for instant UI
                submitBlog({
                  title: title.trim(),
                  author: author.trim(),
                  rollNumber: roll.trim(),
                  mediumUrl: trimmed,
                  image: image.trim(),
                  category: category.trim(),
                  content: content.trim(),
                  date: datePublished || new Date().toISOString(),
                });
                setSubmitted(true);
                setSubmittedMsg("Submitted — awaiting admin approval");
                setTimeout(() => {
                  setSubmitted(false);
                  onClose();
                }, 1400);
              } catch (err) {
                console.error("Blog submit failed", err);
                const message =
                  err instanceof Error ? err.message : "Submission failed";
                setError(message);
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold mb-1">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Article title"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Author Name
              </label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Category (optional)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select a category…</option>
                <option>Competitive Coding</option>
                <option>Web Development</option>
                <option>Design</option>
                <option>Private AI</option>
                <option>Blockchain</option>
                <option>Metaverse</option>
                <option>FOSS</option>
                <option>General</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Cover Image (optional)
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      setUploadError("");
                      // local preview
                      const preview = URL.createObjectURL(f);
                      if (localPreview) URL.revokeObjectURL(localPreview);
                      setLocalPreview(preview);
                      setUploading(true);
                      try {
                        const url = await uploadToCloudinary(f);
                        setImage(url);
                      } catch (err: any) {
                        console.error("Image upload failed", err);
                        setUploadError(err?.message || "Upload failed");
                      } finally {
                        setUploading(false);
                      }
                    }}
                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-purple-500/20 file:text-purple-200 hover:file:bg-purple-500/30"
                  />
                  {(image || localPreview) && (
                    <button
                      type="button"
                      onClick={() => {
                        setImage("");
                        if (localPreview) {
                          URL.revokeObjectURL(localPreview);
                          setLocalPreview("");
                        }
                      }}
                      className="px-3 py-2 rounded-lg bg-card border border-border hover:bg-card/80 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {(image || localPreview) && (
                  <div className="rounded-lg overflow-hidden border border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image || localPreview}
                      alt="Cover preview"
                      className="w-full h-40 object-cover"
                    />
                  </div>
                )}
                {uploading && (
                  <div className="text-xs text-foreground/60">
                    Uploading image…
                  </div>
                )}
                {uploadError && (
                  <div className="text-xs text-red-400">{uploadError}</div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Date Published (optional)
              </label>
              <input
                type="date"
                value={datePublished}
                onChange={(e) => setDatePublished(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Roll Number
              </label>
              <input
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. 23BCS1234"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Medium Link
              </label>
              <input
                type="url"
                inputMode="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://medium.com/@username/article"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Content (optional)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-28 md:min-h-36 resize-y"
                placeholder="Optional short description or excerpt"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <MagicButton
                type="submit"
                className="sm:flex-1"
                heightClass="h-11"
              >
                Submit
              </MagicButton>
              <button
                type="button"
                onClick={onClose}
                className="sm:flex-1 px-4 py-2 rounded-lg bg-card border border-border hover:bg-card/80"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
