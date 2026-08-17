const REMOVED_WINGS = new Set(["blockchain", "metaverse"]);

export function isVisibleWing(value: unknown): boolean {
  if (typeof value !== "string") return true;
  return !REMOVED_WINGS.has(value.trim().toLowerCase());
}
