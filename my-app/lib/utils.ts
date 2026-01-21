import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type EventDescriptionFormat = "text" | "html";

const EVENT_DESC_PREFIX_RE = /^<!--\s*gravity:desc=(text|html)\s*-->\s*\n?/i;

export function parseEventDescription(raw: unknown): {
  format: EventDescriptionFormat;
  content: string;
} {
  const str = (raw ?? "").toString();
  const match = str.match(EVENT_DESC_PREFIX_RE);
  if (match) {
    const format = (
      match[1]?.toLowerCase() === "html" ? "html" : "text"
    ) as EventDescriptionFormat;
    const content = str.replace(EVENT_DESC_PREFIX_RE, "");
    return { format, content };
  }
  return { format: "text", content: str };
}

export function buildEventDescription(
  content: unknown,
  format: EventDescriptionFormat,
): string {
  const cleaned = parseEventDescription(content).content;
  return `<!--gravity:desc=${format}-->\n${cleaned ?? ""}`;
}
