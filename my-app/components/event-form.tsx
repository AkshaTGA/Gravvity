"use client";

import type React from "react";

import { useEffect, useState } from "react";
import type { Event } from "@/lib/types";
import { wings } from "@/lib/data";
import MagicButton from "@/components/magic-button";
import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  buildEventDescription,
  parseEventDescription,
  type EventDescriptionFormat,
} from "@/lib/utils";

interface EventFormProps {
  event?: Event;
  onSubmit: (data: any) => void | Promise<void>;
  onCancel: () => void;
}

export function EventForm({ event, onSubmit, onCancel }: EventFormProps) {
  const initialDescription = parseEventDescription(event?.description || "");

  const [formData, setFormData] = useState<{
    title: string;
    date: string;
    wing: string;
    description: string;
    image: string;
  }>({
    title: event?.title || "",
    date: event?.date || new Date().toISOString().slice(0, 10),
    wing: event?.wing || "",
    description: initialDescription.content || "",
    image: event?.image || "",
  });

  const [descriptionFormat, setDescriptionFormat] =
    useState<EventDescriptionFormat>(initialDescription.format);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(
    event?.image || "",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [isGeneratingHtml, setIsGeneratingHtml] = useState(false);
  const [generateHtmlError, setGenerateHtmlError] = useState<string>("");

  useEffect(() => {
    return () => {
      if (imagePreviewUrl && imagePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    setSubmitError("");
    setImageFile(file);

    if (imagePreviewUrl && imagePreviewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitError("");
    try {
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      const payload = {
        ...event,
        ...formData,
        image: imageUrl,
        description: buildEventDescription(
          formData.description,
          descriptionFormat,
        ),
      };
      if (!payload.image) {
        payload.image = "/gravity-logo.png";
      }
      await onSubmit(payload);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save event";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateHtml = async () => {
    const text = formData.description.trim();
    if (!text) return;

    setGenerateHtmlError("");
    setSubmitError("");
    setIsGeneratingHtml(true);

    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("gravity_admin_token")
          : null;

      const res = await fetch("/api/admin/generate-event-html", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ text }),
      });

      const data = await res
        .json()
        .catch(() => ({ ok: false, error: "Invalid server response" }));

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to generate HTML");
      }

      if (typeof data?.html !== "string" || !data.html.trim()) {
        throw new Error("Empty HTML returned");
      }

      setFormData((prev) => ({ ...prev, description: data.html }));
      setDescriptionFormat("html");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to generate HTML";
      setGenerateHtmlError(message);
    } finally {
      setIsGeneratingHtml(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Wing</label>
        <select
          name="wing"
          value={formData.wing}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="">Select a wing</option>
          {wings.map((wing) => (
            <option key={wing.id} value={wing.name}>
              {wing.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <div className="mb-2 flex flex-wrap gap-4 text-sm text-foreground/80">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="descriptionFormat"
              value="text"
              checked={descriptionFormat === "text"}
              onChange={() => setDescriptionFormat("text")}
            />
            Plain text
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="descriptionFormat"
              value="html"
              checked={descriptionFormat === "html"}
              onChange={() => setDescriptionFormat("html")}
            />
            HTML
          </label>
          <span className="text-xs text-foreground/50">
            {descriptionFormat === "html"
              ? "HTML will be rendered on the site"
              : "Text will display as-is"}
          </span>

          {descriptionFormat === "html" && (
            <MagicButton
              type="button"
              onClick={handleGenerateHtml}
              disabled={
                isSubmitting || isGeneratingHtml || !formData.description.trim()
              }
              heightClass="h-9"
              className="ml-auto"
            >
              {isGeneratingHtml ? "Generating..." : "Generate HTML"}
            </MagicButton>
          )}
        </div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Describe the event"
        />

        {generateHtmlError && (
          <p className="mt-2 text-sm text-red-500">{generateHtmlError}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground file:bg-primary file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 cursor-pointer"
        />
        {imagePreviewUrl && (
          <div className="mt-2 flex items-center gap-3">
            <div className="relative w-28 h-16">
              <img
                src={imagePreviewUrl || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <span className="text-xs text-foreground/50 max-w-40 truncate">
              {imageFile ? "New image selected" : "Current image"}
            </span>
          </div>
        )}
      </div>

      {submitError && <p className="text-sm text-red-500">{submitError}</p>}

      <div className="flex gap-2 pt-4">
        <MagicButton
          type="submit"
          className="flex-1"
          heightClass="h-11"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Uploading..." : event ? "Update" : "Add"} Event
        </MagicButton>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 rounded-lg bg-card border border-border text-foreground font-medium hover:bg-card/80 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
