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

/**
 * Prefetch events data and cache it in localStorage under the same key used by hooks
 */
export async function prefetchEvents() {
  const KEY = "gravity_events";
  try {
    const res = await fetch(`/api/public/events`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return;
    const data = await res.json();
    if (Array.isArray(data)) {
      localStorage.setItem(KEY, JSON.stringify(data));
    }
  } catch (e) {
    console.error("Failed to prefetch events", e);
  }
}

/**
 * Prefetch approved blogs and cache for quick load in Blogs page
 */
export async function prefetchBlogs() {
  const KEY = "gravity_approved_blogs";
  try {
    const res = await fetch(`/api/public/blogs`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return;
    const data = await res.json();
    if (Array.isArray(data)) {
      localStorage.setItem(KEY, JSON.stringify(data));
    }
  } catch (e) {
    console.error("Failed to prefetch blogs", e);
  }
}

/**
 * Fire all prefetchers in parallel (best-effort)
 */
export function prefetchAll() {
  // Fire-and-forget; ignore errors here
  void Promise.allSettled([
    prefetchMembers(),
    prefetchEvents(),
    prefetchBlogs(),
  ]);
}
