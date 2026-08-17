import { NextResponse } from "next/server"
import connectToDatabase from "../../../lib/mongoose"
import { Project } from "@/lib/models/project"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function unauthorized() {
  return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
}

function requireAuth(request: Request) {
  const auth = request.headers.get('authorization')
  const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me'
  if (!auth) return false
  try {
    const token = auth.replace('Bearer ', '')
    const jwt = require('jsonwebtoken')
    jwt.verify(token, JWT_SECRET)
    return true
  } catch (e) {
    return false
  }
}

export async function GET(_request: Request) {
  await connectToDatabase().catch((e) => console.error('DB connect failed', e))
  const projects = await Project.find().sort({ createdAt: -1 })
  return NextResponse.json(projects, { headers: { "Cache-Control": "no-store" } })
}

export async function POST(request: Request) {
  if (!requireAuth(request)) return unauthorized()
  const payload = await request.json().catch(() => ({}))
  await connectToDatabase()
  const created = await Project.create(payload)
  return NextResponse.json(created, { status: 201 })
}
