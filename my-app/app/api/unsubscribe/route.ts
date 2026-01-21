import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getSubscribers, saveSubscribers } from "@/lib/subscribers";

export const runtime = "nodejs";

function htmlPage(title: string, body: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background:#0b1020; color:#e5e7eb; margin:0; padding:24px; }
      .card { max-width: 560px; margin: 0 auto; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 20px; }
      a { color:#a78bfa; }
      .muted { color: rgba(229,231,235,0.75); font-size: 14px; }
    </style>
  </head>
  <body>
    <div class="card">
      ${body}
      <p class="muted">If you didn’t request this, you can ignore it.</p>
      <p class="muted"><a href="/">Back to site</a></p>
    </div>
  </body>
</html>`;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token") || "";
    if (!token) {
      return new NextResponse(
        htmlPage(
          "Unsubscribe",
          `<h1>Missing token</h1><p class="muted">This unsubscribe link is incomplete.</p>`,
        ),
        {
          status: 400,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        },
      );
    }

    const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
    const payload = jwt.verify(token, JWT_SECRET) as {
      email?: unknown;
      purpose?: unknown;
    };

    const email = typeof payload.email === "string" ? payload.email : "";
    const purpose = typeof payload.purpose === "string" ? payload.purpose : "";

    if (!email || purpose !== "unsubscribe") {
      return new NextResponse(
        htmlPage(
          "Unsubscribe",
          `<h1>Invalid link</h1><p class="muted">This unsubscribe link is not valid.</p>`,
        ),
        {
          status: 400,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        },
      );
    }

    const list = await getSubscribers();
    const nextList = list.filter((e) => e !== email);
    const removed = nextList.length !== list.length;

    if (removed) {
      await saveSubscribers(nextList);
    }

    return new NextResponse(
      htmlPage(
        "Unsubscribe",
        removed
          ? `<h1>You’re unsubscribed</h1><p class="muted">${email} will no longer receive Gravity emails.</p>`
          : `<h1>Already unsubscribed</h1><p class="muted">${email} is not on our list.</p>`,
      ),
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  } catch (err: any) {
    const message =
      err?.name === "TokenExpiredError"
        ? "This link has expired."
        : "Unsubscribe failed.";
    return new NextResponse(
      htmlPage("Unsubscribe", `<h1>Error</h1><p class="muted">${message}</p>`),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }
}
