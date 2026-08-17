"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle,
  X,
  FileText,
  Link,
  User,
  Hash,
  Tag,
  Calendar,
  Image as ImageIcon,
  AlignLeft,
  type LucideIcon,
} from "lucide-react";
import MagicButton from "@/components/magic-button";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { submitBlog } from "@/lib/blog-store";

function InputField({
  label,
  icon: Icon,
  optional,
  children,
}: {
  label: string;
  icon: LucideIcon;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-sm font-medium text-foreground/80">
        <Icon size={13} className="text-purple-400" />
        {label}
        {optional && (
          <span className="text-xs text-foreground/40 font-normal ml-1">
            optional
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-foreground/30 focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-200";

function isMediumUrl(url: string) {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
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
      setLocalPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return "";
      });
      setContent("");
      setError("");
      setSubmitted(false);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-xl bg-[#0d0d14] border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
        style={{
          boxShadow:
            "0 0 60px rgba(139,92,246,0.12), 0 25px 50px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(168,85,247,0.08) 50%, transparent 100%)",
            }}
          />
          <div className="relative flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <FileText size={16} className="text-purple-300" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-white">
                Submit Your Article
              </h3>
              <p className="text-xs text-foreground/50 mt-0.5">
                Share your Medium post with the community
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="relative w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-white/10 transition-all duration-200"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 custom-scrollbar">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                <CheckCircle size={30} className="text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-green-300 text-base">
                  {submittedMsg}
                </p>
                <p className="text-sm text-foreground/50 mt-1">
                  An admin will review your submission shortly.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const trimmed = link.trim();
                if (
                  !title.trim() ||
                  !author.trim() ||
                  !roll.trim() ||
                  !trimmed
                ) {
                  setError("Please fill in all required fields.");
                  return;
                }
                if (!isMediumUrl(trimmed)) {
                  setError("Only Medium links are allowed (medium.com).");
                  return;
                }
                if (uploading) {
                  setError("Please wait for the image to finish uploading.");
                  return;
                }
                setError("");
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
                    throw new Error(
                      errorData?.error || `Server error (${res.status})`,
                    );
                  }

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
                  }, 2500);
                } catch (err) {
                  const message =
                    err instanceof Error ? err.message : "Submission failed";
                  setError(message);
                }
              }}
              className="space-y-4"
            >
              {error && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/25 text-sm text-red-300">
                  <X size={13} className="shrink-0 text-red-400" />
                  {error}
                </div>
              )}

              {/* Title */}
              <InputField label="Title" icon={FileText}>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputCls}
                  placeholder="Article title"
                />
              </InputField>

              {/* Author + Roll side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Author Name" icon={User}>
                  <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className={inputCls}
                    placeholder="Your full name"
                  />
                </InputField>
                <InputField label="Roll Number" icon={Hash}>
                  <input
                    value={roll}
                    onChange={(e) => setRoll(e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 23BCS1234"
                  />
                </InputField>
              </div>

              {/* Category + Date side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Category" icon={Tag} optional>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={inputCls + " cursor-pointer"}
                  >
                    <option value="">Select…</option>
                    <option>Competitive Coding</option>
                    <option>Web Development</option>
                    <option>Design</option>
                    <option>Private AI</option>
                    <option>FOSS</option>
                    <option>General</option>
                  </select>
                </InputField>
                <InputField label="Date Published" icon={Calendar} optional>
                  <input
                    type="date"
                    value={datePublished}
                    onChange={(e) => setDatePublished(e.target.value)}
                    className={inputCls}
                  />
                </InputField>
              </div>

              {/* Medium Link */}
              <InputField label="Medium Link" icon={Link}>
                <input
                  type="url"
                  inputMode="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className={inputCls}
                  placeholder="https://medium.com/@username/article"
                />
              </InputField>

              {/* Cover Image */}
              <InputField label="Cover Image" icon={ImageIcon} optional>
                <div className="space-y-2">
                  <label className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-dashed border-white/15 bg-white/3 hover:bg-white/6 hover:border-purple-500/40 transition-all duration-200 cursor-pointer text-sm text-foreground/50 hover:text-foreground/80">
                    <ImageIcon size={14} />
                    <span>
                      {uploading ? "Uploading…" : "Click to upload image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        setUploadError("");
                        const preview = URL.createObjectURL(f);
                        if (localPreview) URL.revokeObjectURL(localPreview);
                        setLocalPreview(preview);
                        setUploading(true);
                        try {
                          const url = await uploadToCloudinary(f);
                          setImage(url);
                        } catch (err: any) {
                          setUploadError(err?.message || "Upload failed");
                        } finally {
                          setUploading(false);
                        }
                      }}
                    />
                  </label>
                  {uploadError && (
                    <p className="text-xs text-red-400">{uploadError}</p>
                  )}
                  {(image || localPreview) && (
                    <div className="relative rounded-xl overflow-hidden border border-white/10">
                      <img
                        src={image || localPreview}
                        alt="Cover preview"
                        className="w-full h-36 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImage("");
                          if (localPreview) {
                            URL.revokeObjectURL(localPreview);
                            setLocalPreview("");
                          }
                        }}
                        className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/70 border border-white/20 flex items-center justify-center text-white/80 hover:bg-black/90 transition-all"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </InputField>

              {/* Content */}
              <InputField label="Short Description" icon={AlignLeft} optional>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={inputCls + " min-h-24 resize-y"}
                  placeholder="A brief excerpt or description of your article…"
                />
              </InputField>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1 pb-1">
                <MagicButton
                  type="submit"
                  className="sm:flex-1"
                  heightClass="h-11"
                >
                  Submit Article
                </MagicButton>
                <button
                  type="button"
                  onClick={onClose}
                  className="sm:flex-[0.5] px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground/70 hover:bg-white/10 hover:text-foreground transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
