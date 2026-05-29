import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAdminToken, verifyAdminCredentials, AUTH_COOKIE_NAME } from "@/lib/siteContent";

type AdminLoginBody = { email?: unknown; password?: unknown };

export async function POST(request: NextRequest) {
  const body = (await request.json()) as AdminLoginBody;
  const email = String(body?.email ?? "").trim();
  const password = String(body?.password ?? "").trim();

  if (!verifyAdminCredentials(email, password)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: getAdminToken(email, password),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return response;
}
