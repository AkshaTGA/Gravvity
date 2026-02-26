import { NextResponse } from "next/server"
import connectToDatabase from "../../../../lib/mongoose"
import { Member } from "@/lib/models/member"
import fallbackMembers from "@/data/members.json"

export const runtime = "nodejs"
let hasLoggedPublicMembersDbFailure = false

export async function GET() {
  if (!process.env.MONGO_URI) {
    return NextResponse.json(fallbackMembers)
  }
  try {
    await connectToDatabase()
    const members = await Member.find().sort({ createdAt: -1 })
    return NextResponse.json(members)

  } catch (e: any) {
    if (!hasLoggedPublicMembersDbFailure) {
      hasLoggedPublicMembersDbFailure = true
      console.warn('[Public Members] database unavailable, serving fallback data:', e?.message)
    }
    return NextResponse.json(fallbackMembers)
  }
}
