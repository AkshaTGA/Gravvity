import { NextResponse } from "next/server";
import { getSubscribers, saveSubscribers } from "@/lib/subscribers";

export const runtime = "nodejs";

const EMAIL_RE = /^(?:[a-zA-Z0-9_.'+\-]+)@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}$/;

function unauthorized() {
  return NextResponse.json(
    { ok: false, error: "Unauthorized" },
    { status: 401 },
  );
}

function requireAuth(request: Request) {
  const auth = request.headers.get("authorization");
  const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
  if (!auth) return false;
  try {
    const token = auth.replace("Bearer ", "");
    // Lazy require to avoid ESM/CJS interop issues
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const jwt = require("jsonwebtoken");
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  // Admin-only: don't publicly expose subscriber list
  if (!requireAuth(request)) return unauthorized();
  const list = await getSubscribers();
  return NextResponse.json({ emails: list });
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json().catch(() => ({ email: "" }));
    const isValid = typeof email === "string" && EMAIL_RE.test(email);
    if (!isValid) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 },
      );
    }
    const list = await getSubscribers().catch((e) => {
      console.error("getSubscribers failed", e);
      throw new Error("Storage read failed");
    });
    if (!list.includes(email)) {
      list.push(email);
      try {
        await saveSubscribers(list);
      } catch (e) {
        console.error("saveSubscribers failed", e);
        return NextResponse.json(
          { ok: false, error: "Could not persist subscription" },
          { status: 500 },
        );
      }
    }
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Unexpected error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    // Admin-only: prevent deleting arbitrary emails without auth
    if (!requireAuth(request)) return unauthorized();

    const url = new URL(request.url);
    const emailFromQuery = url.searchParams.get("email");
    const emailFromBody = await request
      .json()
      .then((b) => (b && typeof b.email === "string" ? b.email : ""))
      .catch(() => "");

    const email = (emailFromQuery || emailFromBody || "").trim();
    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Email required" },
        { status: 400 },
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 },
      );
    }

    const list = await getSubscribers().catch((e) => {
      console.error("getSubscribers failed", e);
      throw new Error("Storage read failed");
    });

    const nextList = list.filter((e) => e !== email);
    const removed = nextList.length !== list.length;
    if (removed) {
      try {
        await saveSubscribers(nextList);
      } catch (e) {
        console.error("saveSubscribers failed", e);
        return NextResponse.json(
          { ok: false, error: "Could not persist deletion" },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({ ok: true, removed });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Unexpected error" },
      { status: 500 },
    );
  }
}
