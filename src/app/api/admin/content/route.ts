import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { SiteContent } from "@/lib/siteContent";
import { AUTH_COOKIE_NAME, readSiteContent, verifyAdminCookie, writeSiteContent } from "@/lib/siteContent";

export async function GET(request: NextRequest) {
  const cookieValue = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!verifyAdminCookie(cookieValue)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const content = await readSiteContent();
  return NextResponse.json(content);
}

export async function POST(request: NextRequest) {
  const cookieValue = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!verifyAdminCookie(cookieValue)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const incoming = (await request.json()) as SiteContent;
  await writeSiteContent(incoming);
  return NextResponse.json({ ok: true });
}
