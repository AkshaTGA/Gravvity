import { NextResponse, NextRequest } from "next/server"
import connectToDatabase from "../../../../lib/mongoose"
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

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!requireAuth(request)) return unauthorized()
  const payload = await request.json().catch(() => ({}))
  await connectToDatabase()
  const updated = await Event.findByIdAndUpdate(id, payload, { new: true })
  return NextResponse.json(updated)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!requireAuth(request)) return unauthorized()
  await connectToDatabase()
  await Event.findByIdAndDelete(id)
  return new NextResponse(null, { status: 204 })
}
