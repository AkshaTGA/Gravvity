import { NextResponse } from "next/server"
import connectToDatabase from "../../../lib/mongoose"
import { Event } from "@/lib/models/event"

export const runtime = "nodejs"

function unauthorized() {
  return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
}

function requireAuth(request: Request) {
  const auth = request.headers.get('authorization')
  const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me'
  if (!auth) return false
  try {
    const token = auth.replace('Bearer ', '')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const jwt = require('jsonwebtoken')
    jwt.verify(token, JWT_SECRET)
    return true
  } catch (e) {
    return false
  }
}

export async function GET(_request: Request) {
  // Public read-only list (matches Express public endpoints)
  await connectToDatabase().catch((e) => console.error('DB connect failed', e))
  const events = await Event.find().sort({ date: 1 })
  return NextResponse.json(events)
}

export async function POST(request: Request) {
  if (!requireAuth(request)) return unauthorized()
  const payload = await request.json().catch(() => ({}))
  await connectToDatabase()
  const created = await Event.create(payload)
  return NextResponse.json(created, { status: 201 })
}
