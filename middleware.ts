import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 25;

const globalAny = globalThis as any;
const RATE_LIMIT_MAP = globalAny.__NILECOTTON_MIDDLEWARE_RATE_LIMITS ?? new Map<string, { count: number; reset: number }>();
if (!globalAny.__NILECOTTON_MIDDLEWARE_RATE_LIMITS) {
  globalAny.__NILECOTTON_MIDDLEWARE_RATE_LIMITS = RATE_LIMIT_MAP;
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) {
    return cfIp;
  }
  return "unknown";
}

function rateLimit(ip: string) {
  const existing = RATE_LIMIT_MAP.get(ip);
  const now = Date.now();

  if (!existing || existing.reset < now) {
    RATE_LIMIT_MAP.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((existing.reset - now) / 1000) };
  }

  existing.count += 1;
  RATE_LIMIT_MAP.set(ip, existing);
  return { ok: true };
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const csp = [
    "default-src 'self'",
    "script-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "img-src 'self' data:",
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    "connect-src 'self' https://api.sendgrid.com",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("X-XSS-Protection", "0");
  response.headers.set("Cache-Control", "public, max-age=0, s-maxage=3600, stale-while-revalidate=60");

  if (request.nextUrl.pathname.startsWith("/api/contact") && request.method === "POST") {
    const ip = getClientIp(request);
    const limit = rateLimit(ip);

    if (!limit.ok) {
      return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(limit.retryAfter),
        },
      });
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
