/**
 * Prefetch members data and cache it in localStorage
 * This runs during initial page load to have data ready before user needs it
 */
export async function prefetchMembers() {
  const KEY = "gravity_members";
  try {
    const res = await fetch(`/api/public/members`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return;
    const data = await res.json();
    if (Array.isArray(data)) {
      localStorage.setItem(KEY, JSON.stringify(data));
    }
  } catch (e) {
    console.error("Failed to prefetch members", e);
  }
}
