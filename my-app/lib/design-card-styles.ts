/**
 * Shared types, presets, and localStorage helpers for Design wing card customisation.
 * Used by both the Design editor and the Design members page.
 */

/* ─── Override shape ──────────────────────────── */

export interface CardStyleOverride {
  innerGradient: string;
  behindGlowColor: string;
  behindGlowSize: string;
  cardRadius: number;       // px
  scale: number;            // 0.85 – 1.15
  avatarCropX: number;      // 0-100 object-position X %
  avatarCropY: number;      // 0-100 object-position Y %
  avatarZoom: number;       // 1-3  scale factor for avatar
  holoTheme: string;        // key from HOLO_THEMES
  fontFamily: string;       // CSS font-family
}

export const DEFAULT_STYLE: CardStyleOverride = {
  innerGradient:
    "linear-gradient(145deg, rgba(168,85,247,0.18) 0%, rgba(34,211,238,0.18) 100%)",
  behindGlowColor: "rgba(168, 85, 247, 0.28)",
  behindGlowSize: "25%",
  cardRadius: 30,
  scale: 1,
  avatarCropX: 50,
  avatarCropY: 50,
  avatarZoom: 1,
  holoTheme: "default",
  fontFamily: "inherit",
};

/* ─── Holographic (sunpillar) themes ──────────── */

export interface HoloTheme {
  label: string;
  preview: [string, string]; // two colours for the preview swatch
  colors: string[];           // 6 sunpillar HSL strings
}

export const HOLO_THEMES: Record<string, HoloTheme> = {
  default: {
    label: "Purple / Cyan",
    preview: ["hsl(260,100%,75%)", "hsl(195,100%,74%)"],
    colors: [
      "hsl(260,100%,75%)", "hsl(280,100%,72%)", "hsl(210,100%,70%)",
      "hsl(195,100%,74%)", "hsl(225,100%,74%)", "hsl(300,100%,73%)",
    ],
  },
  warm: {
    label: "Sunset",
    preview: ["hsl(20,100%,70%)", "hsl(350,100%,72%)"],
    colors: [
      "hsl(20,100%,70%)",  "hsl(350,100%,72%)", "hsl(40,100%,68%)",
      "hsl(10,100%,74%)",  "hsl(330,100%,70%)", "hsl(45,100%,72%)",
    ],
  },
  cool: {
    label: "Ocean",
    preview: ["hsl(200,100%,70%)", "hsl(180,100%,65%)"],
    colors: [
      "hsl(200,100%,70%)", "hsl(220,100%,75%)", "hsl(180,100%,65%)",
      "hsl(190,100%,72%)", "hsl(210,100%,78%)", "hsl(170,100%,68%)",
    ],
  },
  neon: {
    label: "Neon",
    preview: ["hsl(120,100%,65%)", "hsl(160,100%,60%)"],
    colors: [
      "hsl(120,100%,65%)", "hsl(160,100%,60%)", "hsl(80,100%,70%)",
      "hsl(140,100%,72%)", "hsl(100,100%,68%)", "hsl(150,100%,65%)",
    ],
  },
  rose: {
    label: "Rose",
    preview: ["hsl(330,100%,75%)", "hsl(300,100%,70%)"],
    colors: [
      "hsl(330,100%,75%)", "hsl(350,100%,72%)", "hsl(300,100%,70%)",
      "hsl(310,100%,74%)", "hsl(340,100%,76%)", "hsl(320,100%,73%)",
    ],
  },
  gold: {
    label: "Gold",
    preview: ["hsl(45,100%,70%)", "hsl(35,100%,68%)"],
    colors: [
      "hsl(45,100%,70%)",  "hsl(35,100%,68%)",  "hsl(55,100%,72%)",
      "hsl(40,100%,75%)",  "hsl(50,100%,65%)",  "hsl(30,100%,70%)",
    ],
  },
};

/* ─── Inner gradient (card overlay colour) ────── */

export const GRADIENT_PRESETS = [
  { id: "purple-cyan", label: "Purple / Cyan",  value: "linear-gradient(145deg, rgba(168,85,247,0.18) 0%, rgba(34,211,238,0.18) 100%)" },
  { id: "blue",        label: "Ocean Blue",     value: "linear-gradient(145deg, rgba(59,130,246,0.22) 0%, rgba(6,182,212,0.2) 100%)" },
  { id: "rose",        label: "Rose",           value: "linear-gradient(145deg, rgba(244,114,182,0.22) 0%, rgba(168,85,247,0.18) 100%)" },
  { id: "emerald",     label: "Emerald",        value: "linear-gradient(145deg, rgba(16,185,129,0.22) 0%, rgba(6,182,212,0.18) 100%)" },
  { id: "sunset",      label: "Sunset",         value: "linear-gradient(145deg, rgba(249,115,22,0.22) 0%, rgba(236,72,153,0.18) 100%)" },
  { id: "gold",        label: "Gold",           value: "linear-gradient(145deg, rgba(245,158,11,0.22) 0%, rgba(234,179,8,0.18) 100%)" },
  { id: "mono",        label: "Silver",         value: "linear-gradient(145deg, rgba(148,163,184,0.18) 0%, rgba(71,85,105,0.18) 100%)" },
  { id: "dark",        label: "Midnight",       value: "linear-gradient(145deg, rgba(15,23,42,0.35) 0%, rgba(30,41,59,0.35) 100%)" },
];

/* ─── Glow colour presets ─────────────────────── */

export const GLOW_COLORS = [
  "rgba(168, 85, 247, 0.28)",   // purple
  "rgba(34, 211, 238, 0.28)",   // cyan
  "rgba(244, 114, 182, 0.28)",  // pink
  "rgba(34, 197, 94, 0.28)",    // green
  "rgba(59, 130, 246, 0.28)",   // blue
  "rgba(249, 115, 22, 0.28)",   // orange
  "rgba(239, 68, 68, 0.28)",    // red
  "rgba(245, 158, 11, 0.28)",   // gold
];

/* ─── Font presets ────────────────────────────── */

export const FONT_PRESETS = [
  { label: "Default", value: "inherit" },
  { label: "Mono",    value: "ui-monospace, 'Cascadia Mono', Consolas, monospace" },
  { label: "Serif",   value: "ui-serif, Georgia, Cambria, 'Times New Roman', serif" },
];

/* ─── Persistence ─────────────────────────────── */

const STORAGE_KEY = "gravvity_design_card_styles";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function safeNumber(
  value: unknown,
  fallback: number,
  min: number,
  max: number,
) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return clamp(numeric, min, max);
}

function safePercentString(
  value: unknown,
  fallback: string,
  min: number,
  max: number,
) {
  if (typeof value === "string") {
    const match = value.match(/-?\d+(?:\.\d+)?/);
    if (match) {
      const parsed = Number(match[0]);
      if (Number.isFinite(parsed)) {
        return `${Math.round(clamp(parsed, min, max))}%`;
      }
    }
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return `${Math.round(clamp(value, min, max))}%`;
  }
  return fallback;
}

export function normalizeCardStyle(input?: Partial<CardStyleOverride>): CardStyleOverride {
  const gradient =
    typeof input?.innerGradient === "string" && input.innerGradient.trim().length > 0
      ? input.innerGradient
      : DEFAULT_STYLE.innerGradient;
  const glowColor =
    typeof input?.behindGlowColor === "string" &&
    input.behindGlowColor.trim().length > 0
      ? input.behindGlowColor
      : DEFAULT_STYLE.behindGlowColor;
  const fontFamily =
    typeof input?.fontFamily === "string" && input.fontFamily.trim().length > 0
      ? input.fontFamily
      : DEFAULT_STYLE.fontFamily;
  const holoTheme =
    typeof input?.holoTheme === "string" && HOLO_THEMES[input.holoTheme]
      ? input.holoTheme
      : DEFAULT_STYLE.holoTheme;

  return {
    innerGradient: gradient,
    behindGlowColor: glowColor,
    behindGlowSize: safePercentString(
      input?.behindGlowSize,
      DEFAULT_STYLE.behindGlowSize,
      10,
      70,
    ),
    cardRadius: safeNumber(input?.cardRadius, DEFAULT_STYLE.cardRadius, 4, 40),
    scale: safeNumber(input?.scale, DEFAULT_STYLE.scale, 0.8, 1.2),
    avatarCropX: safeNumber(input?.avatarCropX, DEFAULT_STYLE.avatarCropX, 0, 100),
    avatarCropY: safeNumber(input?.avatarCropY, DEFAULT_STYLE.avatarCropY, 0, 100),
    avatarZoom: safeNumber(input?.avatarZoom, DEFAULT_STYLE.avatarZoom, 1, 3),
    holoTheme,
    fontFamily,
  };
}

export function loadSavedStyles(): Record<string, CardStyleOverride> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};

    const normalized: Record<string, CardStyleOverride> = {};
    for (const [memberId, value] of Object.entries(parsed)) {
      if (typeof memberId === "string" && value && typeof value === "object") {
        normalized[memberId] = normalizeCardStyle(value as Partial<CardStyleOverride>);
      }
    }
    return normalized;
  } catch {
    return {};
  }
}

export function saveAllStyles(styles: Record<string, CardStyleOverride>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(styles));
  } catch {
    /* quota exceeded — ignore */
  }
}

/* ─── CSS variable builder ────────────────────── */

/**
 * Returns a CSSProperties-compatible object that, when set on a div
 * wrapping a `<ProfileCard>`, cascades CSS custom-property overrides
 * into the card (radius, sunpillar colours, font, scale).
 */
export function buildWrapperStyle(style: CardStyleOverride): React.CSSProperties {
  const vars = buildCardVariableStyle(style);
  return {
    ...vars,
    zoom: style.scale !== 1 ? style.scale : undefined,
  } as React.CSSProperties;
}

export function buildCardVariableStyle(
  style: CardStyleOverride,
): React.CSSProperties {
  const theme = HOLO_THEMES[style.holoTheme] ?? HOLO_THEMES.default;
  return {
    "--card-radius": `${style.cardRadius}px`,
    "--avatar-crop-x": `${style.avatarCropX}%`,
    "--avatar-crop-y": `${style.avatarCropY}%`,
    "--avatar-zoom": `${style.avatarZoom}`,
    "--behind-glow-color": style.behindGlowColor,
    "--behind-glow-size": style.behindGlowSize,
    "--sunpillar-1": theme.colors[0],
    "--sunpillar-2": theme.colors[1],
    "--sunpillar-3": theme.colors[2],
    "--sunpillar-4": theme.colors[3],
    "--sunpillar-5": theme.colors[4],
    "--sunpillar-6": theme.colors[5],
    "--sunpillar-clr-1": theme.colors[0],
    "--sunpillar-clr-2": theme.colors[1],
    "--sunpillar-clr-3": theme.colors[2],
    "--sunpillar-clr-4": theme.colors[3],
    "--sunpillar-clr-5": theme.colors[4],
    "--sunpillar-clr-6": theme.colors[5],
    fontFamily: style.fontFamily,
  } as React.CSSProperties;
}
