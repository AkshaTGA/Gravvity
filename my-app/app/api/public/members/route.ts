import { NextResponse } from "next/server"
import connectToDatabase from "../../../../lib/mongoose"
import { Member } from "@/lib/models/member"

export const runtime = "nodejs"

export async function GET() {
  if (!process.env.MONGO_URI) {
    return NextResponse.json({ error: 'Database unavailable (no MONGO_URI)' }, { status: 503 })
  }
  try {
    await connectToDatabase()
    const members = await Member.find().sort({ createdAt: -1 })
    return NextResponse.json(members)
  } catch (e: any) {
    console.error('[Public Members] error', e?.message)
    return NextResponse.json({ error: 'Failed to load members' }, { status: 500 })
  }
}
