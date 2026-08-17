export function normalizeWingName(value?: string | null): string {
  if (!value) return ""
  return value
    .toLowerCase()
    .trim()
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
}

const WING_ALIASES: Record<string, string[]> = {
  "competitive coding": ["competitive coding", "competitivecoding", "competitive coding wing", "cp"],
  "web development": ["web development", "webdevelopment", "web development wing", "web dev", "webd"],
  design: ["design", "design wing"],
  foss: ["foss", "f o s s", "open source", "open-source"],
  "private ai": ["private ai", "private a i", "private a.i", "private ai wing", "privateai"],
}

function canonicalWingName(value?: string | null): string {
  const normalized = normalizeWingName(value)
  if (!normalized) return ""

  for (const [canonical, aliases] of Object.entries(WING_ALIASES)) {
    if (aliases.some((alias) => normalizeWingName(alias) === normalized)) {
      return canonical
    }
  }

  return normalized
}

export function isSameWing(a?: string | null, b?: string | null): boolean {
  const left = canonicalWingName(a)
  const right = canonicalWingName(b)
  return left.length > 0 && right.length > 0 && left === right
}
