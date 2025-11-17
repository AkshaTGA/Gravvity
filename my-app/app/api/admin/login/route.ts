import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectToDatabase from "../../../../lib/mongoose"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const { id, password } = body as { id?: string; password?: string }

  if (!id || !password) return NextResponse.json({ ok: false, error: 'Missing id or password' }, { status: 400 })

  const ADMIN_ID = process.env.ADMIN_ID || '123456'
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gravity123'
  const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me'

  if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ admin: true, id }, JWT_SECRET, { expiresIn: '2h' })
    return NextResponse.json({ token })
  }

  return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 })
}
