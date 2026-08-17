import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import OpenAI from "openai"

export const runtime = "nodejs"

type ModerationVerdict = {
  approved: boolean
  verdict: "approve" | "reject"
  reason?: string
  issues?: string[]
  sanitized_message?: string
}

type DeliverabilityResult = {
  ok: boolean
  reason?: string
  issues?: string[]
}

const MODERATION_SYSTEM_PROMPT = `You are a strict content safety and quality reviewer for a public contact form.

Return ONLY a compact JSON object with these keys:
{
  "approved": boolean,
  "verdict": "approve" | "reject",
  "reason": string,
  "issues": string[],
  "sanitized_message": string
}

Rules:
- Approve only if the message is polite, non-harmful, non-spam, and relevant to contacting Gravity.
- Reject if it contains hate, threats, harassment, explicit content, self-harm, scams, ads/spam, sensitive personal data, or anything unsafe/irrelevant.
- "issues" should list short bullet reasons when rejecting; empty array when approving.
- "sanitized_message" must remove links, phone numbers, and emails not in the original sender field, while keeping the useful body text. If nothing needs sanitizing, return the original message.
- NEVER return code fences or extra text. Output JSON only.`

export async function POST(request: Request) {
  const { name, email, message } = await request.json().catch(() => ({ name: "", email: "", message: "" }))

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing name, email or message" }, { status: 400 })
  }
  const [moderationResult, deliverabilityResult] = await Promise.allSettled([
    runModeration({ name, email, message }),
    checkEmailDeliverability(email),
  ])

  const moderation =
    moderationResult.status === "fulfilled"
      ? moderationResult.value
      : {
          approved: false,
          verdict: "reject" as const,
          reason: moderationResult.reason?.message || "Moderation failed",
          issues: ["LLM moderation call failed"],
          sanitized_message: message,
        }

  const deliver =
    deliverabilityResult.status === "fulfilled"
      ? deliverabilityResult.value
      : {
          ok: false,
          reason: deliverabilityResult.reason?.message || "Email verification failed",
          issues: ["Email verification failed"],
        }

  if (!deliver.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: deliver.reason || "Email could not be verified",
        issues: deliver.issues || [],
      },
      { status: 400 },
    )
  }

  if (!moderation.approved) {
    return NextResponse.json(
      {
        ok: false,
        error: moderation.reason || "Message rejected by safety filter",
        issues: moderation.issues || [],
      },
      { status: 400 },
    )
  }

  const safeMessage = moderation.sanitized_message?.trim() || message

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
    await transporter.verify()
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
        ${escapeHtml(safeMessage)}
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

async function runModeration(payload: { name: string; email: string; message: string }): Promise<ModerationVerdict> {
  const apiKey = process.env.NVIDIA_API_KEY || process.env.NVIDIA_NIM_API_KEY || process.env.OPENAI_API_KEY

  if (!apiKey) {
    console.warn("[contact] moderation skipped - missing API key")
    return {
      approved: false,
      verdict: "reject",
      reason: "Moderation service not configured",
      issues: ["Missing LLM API key"],
      sanitized_message: payload.message,
    }
  }

  const client = new OpenAI({
    apiKey,
    baseURL: process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1",
  })

  const userContent = JSON.stringify({
    sender_name: payload.name,
    sender_email: payload.email,
    message: payload.message,
  })

  let raw = ""
  try {
    const completion = await client.chat.completions.create({
      model: process.env.NVIDIA_MODEL || "mistralai/devstral-2-123b-instruct-2512",
      messages: [
        { role: "system", content: MODERATION_SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
      temperature: 0,
      top_p: 0.9,
      max_tokens: 512,
      stream: false,
    })

    raw = completion.choices?.[0]?.message?.content?.trim() || ""
  } catch (err) {
    console.error("[contact] moderation call failed", err)
    return {
      approved: false,
      verdict: "reject",
      reason: "Moderation service unavailable",
      issues: ["LLM call failed"],
      sanitized_message: payload.message,
    }
  }

  const parsed = parseModerationJson(raw)
  const normalized = normalizeModeration(parsed, payload.message)
  return normalized
}

async function checkEmailDeliverability(email: string): Promise<DeliverabilityResult> {
  const apiKey =
    process.env.EMAIL_VALIDATION_API_KEY ||
    process.env.NEXT_PUBLIC_EMAIL_VALIDATION_API_KEY ||
    ""

  if (!apiKey) {
    console.warn("[contact] email validation skipped - missing API key")
    return {
      ok: false,
      reason: "Email validation service not configured",
      issues: ["Missing EMAIL_VALIDATION_API_KEY"],
    }
  }

  const url = `https://emailreputation.abstractapi.com/v1?api_key=${apiKey}&email=${encodeURIComponent(email)}`
  try {
    const res = await fetch(url)
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      throw new Error(`Validation failed: ${res.status} ${text}`)
    }
    const data = (await res.json()) as any
    const status = data?.email_deliverability?.status

    if (status === "undeliverable") {
      return {
        ok: false,
        reason: "The email you provided was undeliverable",
        issues: ["Email marked undeliverable"],
      }
    }

    return { ok: true }
  } catch (err: any) {
    const msg = err?.message || "Email validation failed"
    const isNetwork = typeof msg === "string" && /fetch failed|EAI_AGAIN|ENOTFOUND/i.test(msg)
    if (isNetwork) {
      return {
        ok: true,
        issues: ["Email validation skipped due to network error"],
      }
    }
    return {
      ok: false,
      reason: msg,
      issues: ["Email validation request errored"],
    }
  }
}

function parseModerationJson(raw: string): Partial<ModerationVerdict> {
  try {
    return JSON.parse(raw)
  } catch {}

  const match = raw.match(/\{[\s\S]*\}/)
  if (match) {
    try {
      return JSON.parse(match[0])
    } catch {}
  }

  return {}
}

function normalizeModeration(data: Partial<ModerationVerdict> | undefined, fallbackMessage: string): ModerationVerdict {
  const approvedFlag = data?.approved === true || data?.verdict === "approve"
  const verdict: ModerationVerdict["verdict"] = data?.verdict === "reject" ? "reject" : approvedFlag ? "approve" : "reject"
  const reason =
    typeof data?.reason === "string" && data.reason.trim()
      ? data.reason.trim()
      : verdict === "approve"
        ? "Approved"
        : "Rejected by policy"

  const issues = Array.isArray(data?.issues)
    ? data.issues.map((item) => String(item)).filter(Boolean).slice(0, 5)
    : []

  const sanitized =
    typeof data?.sanitized_message === "string" && data.sanitized_message.trim()
      ? data.sanitized_message.trim()
      : fallbackMessage

  return {
    approved: verdict === "approve" && approvedFlag,
    verdict,
    reason,
    issues,
    sanitized_message: sanitized,
  }
}
