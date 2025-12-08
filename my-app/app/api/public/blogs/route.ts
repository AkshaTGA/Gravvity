import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongoose";
import { Blog, migrateIfNeeded } from "@/lib/models/blog";

export const runtime = "nodejs";

export async function GET() {
  if (!process.env.MONGO_URI) {
    return NextResponse.json(
      { error: "Database unavailable (no MONGO_URI)" },
      { status: 503 }
    );
  }
  try {
    await connectToDatabase();
    await migrateIfNeeded();
    const blogs = await Blog.find({ approved: true }).sort({ date: -1 });
    return NextResponse.json(blogs);
  } catch (e: any) {
    console.error("[Public Blogs] error", e?.message);
    return NextResponse.json(
      { error: "Failed to load blogs" },
      { status: 500 }
    );
  }
}
