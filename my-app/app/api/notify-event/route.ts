import { NextResponse } from "next/server";
import { getSubscribers } from "@/lib/subscribers";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";
// Email fan-out can take time depending on SMTP and subscriber count.
// Vercel honors this to allow a longer function execution window.
export const maxDuration = 60;

const DESC_PREFIX_RE = /^<!--\s*gravity:desc=(text|html)\s*-->\s*\n?/i;

function parseDescription(raw: unknown): {
  format: "text" | "html";
  content: string;
} {
  const str = (raw ?? "").toString();
  const match = str.match(DESC_PREFIX_RE);
  if (match) {
    const format = match[1]?.toLowerCase() === "html" ? "html" : "text";
    const content = str.replace(DESC_PREFIX_RE, "");
    return { format, content };
  }
  return { format: "text", content: str };
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getBaseUrl() {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.URL ||
    "";
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export async function POST(request: Request) {
  const { event } = await request.json().catch(() => ({ event: null }));
  if (!event || !event.title || !event.date) {
    return NextResponse.json(
      { ok: false, error: "Missing event payload" },
      { status: 400 },
    );
  }

  const emails = await getSubscribers();
  if (!emails.length) {
    return NextResponse.json(
      { ok: false, error: "No subscribers" },
      { status: 400 },
    );
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.FROM_EMAIL || user;

  if (!host || !user || !pass || !from) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "SMTP configuration missing. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL",
      },
      { status: 500 },
    );
  }

  // Gmail requirements:
  // - If using port 465 -> secure true (implicit TLS)
  // - If using port 587 -> secure false + STARTTLS upgrade
  // - Password MUST be a 16‑char Gmail App Password (NOT the normal account password)
  const secure = port === 465 || process.env.SMTP_SECURE === "true";
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    // Helpful diagnostics while debugging failed auth / TLS
    logger: true,
    debug: true,
    requireTLS: !secure, // force STARTTLS on 587
    authMethod: "LOGIN",
  });

  const subject = `New Event: ${event.title}`;
  const dateStr = new Date(event.date).toLocaleDateString();
  const { format: descFormat, content: descContent } = parseDescription(
    event.description,
  );
  const descriptionHtml =
    descFormat === "html"
      ? (descContent || "").toString()
      : escapeHtml((descContent || "").toString()).replace(/\n/g, "<br />");
  const baseUrl = getBaseUrl();

  const buildHtml = (unsubscribeUrl: string) => `
<div style="
  background:#0b1020;
  padding:16px;
  font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
">

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    style="max-width:600px;margin:0 auto;"
  >
    <tr>
      <td style="
        background:#020617;
        padding:22px;
        color:#e5e7eb;
        line-height:1.6;
      ">

        <!-- Accent bar -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="
              height:4px;
              background:#818cf8;
            "></td>
          </tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr><td height="16"></td></tr>
        </table>

        <!-- Label -->
        <p style="
          font-size:12px;
          letter-spacing:1.2px;
          color:#a5b4fc;
          font-weight:700;
          text-transform:uppercase;
          padding:0;
        ">
          Event Update
        </p>

        <!-- Title -->
        <p style="
          font-size:26px;
          line-height:1.25;
          font-weight:700;
          color:#f1f5f9;
          padding:0;
        ">
          ${event.title}
        </p>

        <!-- Meta -->
        <p style="
          font-size:14px;
          color:#cbd5f5;
          padding:0;
        ">
          <strong style="color:#e5e7eb;">Date:</strong> ${dateStr}
          ${event.wing ? `<br /><strong style="color:#e5e7eb;">Wing:</strong> ${event.wing}` : ""}
        </p>

        ${
          event.image
            ? `
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr><td height="16"></td></tr>
          </table>

          <img
            src="${event.image}"
            alt="Event visual"
            style="
              width:100%;
              height:auto;
              display:block;
              background:#020617;
            "
          />
        `
            : ""
        }

        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr><td height="18"></td></tr>
        </table>

        <!-- Description -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="
              font-size:15px;
              color:#e5e7eb;
              line-height:1.65;
            ">
              ${descriptionHtml}
            </td>
          </tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr><td height="22"></td></tr>
        </table>

        <hr style="
          border:none;
          border-top:1px solid #1e293b;
        " />

        <!-- Footer -->
        <p style="
          font-size:14px;
          color:#cbd5f5;
          padding:0;
        ">
          Cheers,<br />
          <strong style="color:#f1f5f9;">Gravity</strong>
        </p>

      </td>
    </tr>
  </table>

  <p style="
    text-align:center;
    font-size:12px;
    color:#94a3b8;
    padding:14px 0 0;
  ">
    You’re receiving this because you’re part of the Gravity community.<br />
    <a href="${unsubscribeUrl}" style="color:#818cf8;text-decoration:underline;">
      Unsubscribe
    </a>
  </p>
</div>

`;

  try {
    // Verify connection & credentials first to catch auth errors distinctly
    await transporter.verify();
  } catch (err: any) {
    console.error("SMTP verify failed", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          (err?.message || "SMTP verify failed") +
          " | Ensure Gmail App Password (16 chars) and 2FA enabled.",
      },
      { status: 500 },
    );
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

    let sent = 0;
    for (const toEmail of emails) {
      const token = jwt.sign(
        { email: toEmail, purpose: "unsubscribe" },
        JWT_SECRET,
        { expiresIn: "365d" },
      );
      const unsubscribeUrl = `${baseUrl}/api/unsubscribe?token=${encodeURIComponent(token)}`;
      const html = buildHtml(unsubscribeUrl);
      await transporter.sendMail({ from, to: toEmail, subject, html });
      sent++;
    }

    return NextResponse.json({ ok: true, sent });
  } catch (err: any) {
    console.error("Email send failed", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          (err?.message || "Failed to send") +
          " | If 535 error persists regenerate App Password.",
        code: err?.code,
      },
      { status: 500 },
    );
  }
}
