import { NextResponse } from "next/server"
import connectToDatabase from "../../../../lib/mongoose"
import { Event } from "@/lib/models/event"

export const runtime = "nodejs"

export async function GET() {
  if (!process.env.MONGO_URI) {
    return NextResponse.json({ error: 'Database unavailable (no MONGO_URI)' }, { status: 503 })
  }
  try {
    await connectToDatabase()
    const events = await Event.find().sort({ date: 1 })
    return NextResponse.json(events)
  } catch (e: any) {
    console.error('[Public Events] error', e?.message)
    return NextResponse.json({ error: 'Failed to load events' }, { status: 500 })
  }
}
