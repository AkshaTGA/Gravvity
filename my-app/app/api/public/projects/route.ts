import { NextResponse } from "next/server"
import connectToDatabase from "../../../../lib/mongoose"
import { Project } from "@/lib/models/project"

export const runtime = "nodejs"

export async function GET() {
  if (!process.env.MONGO_URI) {
    return NextResponse.json({ error: 'Database unavailable (no MONGO_URI)' }, { status: 503 })
  }
  try {
    await connectToDatabase()
    const projects = await Project.find().sort({ createdAt: -1 })
    return NextResponse.json(projects)
  } catch (e: any) {
    console.error('[Public Projects] error', e?.message)
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 })
  }
}
