import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const { name, email, message } = await request.json().catch(() => ({ name: "", email: "", message: "" }))

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing name, email or message" }, { status: 400 })
  }

  const host = process.env.CONTACT_SMTP_HOST || process.env.SMTP_HOST || "smtp.gmail.com"
  const port = Number(process.env.CONTACT_SMTP_PORT || process.env.SMTP_PORT || 587)
  const user = process.env.CONTACT_SMTP_USER || process.env.SMTP_USER
  const pass = process.env.CONTACT_SMTP_PASS || process.env.SMTP_PASS
  const to = process.env.CONTACT_TO || "raghavvohra375@gmail.com"
  const from = process.env.CONTACT_FROM || `Gravity Contact <${user}>`
  const secure = (process.env.CONTACT_SMTP_SECURE || process.env.SMTP_SECURE) === "true" || port === 465

  if (!user || !pass) {
    return NextResponse.json({ ok: false, error: "SMTP user/pass not configured" }, { status: 500 })
  }

  // Ensure credentials are trimmed and clean
  const cleanUser = user.trim()
  const cleanPass = pass.trim()

  console.log("SMTP Config:", { host, port, secure, user: cleanUser, passLength: cleanPass.length })

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false, // false for port 587, true for 465
    auth: { 
      user: cleanUser, 
      pass: cleanPass 
    },
  })

  try {
    const verified = await transporter.verify()
    console.log("SMTP connection verified successfully", verified)
  } catch (err: any) {
    console.error("Contact SMTP verify failed - Full error:", err)
    return NextResponse.json({ 
      ok: false, 
      error: `SMTP Authentication Failed: Check your email credentials or app password. Error: ${err?.message || "Unknown error"}` 
    }, { status: 500 })
  }

  const subject = `New Contact Form Submission from ${name}`
  const html = `
  <div style="
    font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
    line-height:1.6;
    background:#f6f8fb;
    padding:16px;
  ">

    <div style="
      max-width:520px;
      margin:0 auto;
      background:#ffffff;
      border:1px solid #e5e7eb;
      border-radius:6px;
      padding:16px;
      color:#111;
    ">

      <h2 style="
        margin:0 0 12px;
        font-size:18px;
        font-weight:600;
        color:#1f2937;
      ">
        Contact Form Submission
      </h2>

      <p style="margin:6px 0;color:#374151">
        <strong style="color:#111">Name:</strong> ${escapeHtml(name)}
      </p>

      <p style="margin:6px 0;color:#374151">
        <strong style="color:#111">Email:</strong> ${escapeHtml(email)}
      </p>

      <p style="margin:12px 0 6px;color:#111">
        <strong>Message:</strong>
      </p>

      <div style="
        white-space:pre-line;
        padding:10px 12px;
        background:#f9fafb;
        border-left:4px solid #2563eb;
        color:#1f2937;
      ">
        ${escapeHtml(message)}
      </div>

      <p style="
        margin-top:16px;
        font-size:12px;
        color:#6b7280;
      ">
        — Gravity Website
      </p>

    </div>

  </div>
`;


  try {
    const info = await transporter.sendMail({ from, to, subject, html, replyTo: email })
    console.log("Contact email accepted by SMTP:", { messageId: info.messageId, response: info.response })
    return NextResponse.json({ ok: true, id: info.messageId })
  } catch (err: any) {
    console.error("Contact email send failed", err)
    return NextResponse.json({ ok: false, error: err?.message || "Failed to send" }, { status: 500 })
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
