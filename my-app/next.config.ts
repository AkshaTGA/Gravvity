import type { NextConfig } from "next";

const isNetlify = process.env.NETLIFY === "true";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || (isNetlify ? "" : "http://localhost:4000");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async rewrites() {
    // We migrated CRUD + public endpoints into Next.js API routes.
    // Preserve optional delegation only when an explicit external backend is desired.
    if (!BACKEND_URL) return [];
    if (process.env.USE_EXTERNAL_BACKEND !== 'true') {
      // Serve everything from internal API (no rewrites for members/events/projects/admin/public).
      return [];
    }
    return [
      {
        source: "/api/health",
        destination: `${BACKEND_URL}/api/health`,
      },
      {
        source: "/api/public/:path*",
        destination: `${BACKEND_URL}/api/public/:path*`,
      },
      {
        source: "/api/members/:path*",
        destination: `${BACKEND_URL}/api/members/:path*`,
      },
      {
        source: "/api/events/:path*",
        destination: `${BACKEND_URL}/api/events/:path*`,
      },
      {
        source: "/api/projects/:path*",
        destination: `${BACKEND_URL}/api/projects/:path*`,
      },
      {
        source: "/api/admin/:path*",
        destination: `${BACKEND_URL}/api/admin/:path*`,
      },
    ];
  },
};

export default nextConfig;
