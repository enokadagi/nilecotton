export const runtime = "edge";

const globalAny = globalThis as any;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_MAP = globalAny.__NILECOTTON_RATE_LIMITS ?? new Map<string, { count: number; reset: number }>();
if (!globalAny.__NILECOTTON_RATE_LIMITS) {
  globalAny.__NILECOTTON_RATE_LIMITS = RATE_LIMIT_MAP;
}

type ContactPayload = {
  name: string;
  company?: string;
  email: string;
  message: string;
  website?: string;
};

function getClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return new Response(JSON.stringify({ error: "Expected application/json" }), { status: 415 });
  }

  const origin = req.headers.get("origin") || "";
  if (origin && !origin.includes("localhost") && !origin.includes("127.0.0.1") && !origin.includes("nilecotton.com") && !origin.includes("nilelink.app")) {
    return new Response(JSON.stringify({ error: "Invalid request origin" }), { status: 403 });
  }

  const payload = (await req.json()) as ContactPayload;
  const ip = getClientIp(req);
  const limit = rateLimit(ip);

  if (!limit.ok) {
    return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
      status: 429,
      headers: { "Retry-After": String(limit.retryAfter) },
    });
  }

  if (!payload || !payload.name?.trim() || !payload.email?.trim() || !payload.message?.trim()) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }

  if (payload.website?.trim()) {
    return new Response(JSON.stringify({ error: "Spam detected" }), { status: 400 });
  }

  const name = payload.name.trim();
  const company = payload.company?.trim() || "";
  const email = payload.email.trim();
  const message = payload.message.trim();

  if (!isValidEmail(email)) {
    return new Response(JSON.stringify({ error: "Invalid email address" }), { status: 400 });
  }

  const CONTACT_TO = process.env.CONTACT_TO || "thenilecotton@gmail.com";
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

  if (!SENDGRID_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Email service configuration missing. Set SENDGRID_API_KEY in environment." }),
      { status: 500 },
    );
  }

  const textBody = `Name: ${name}\nCompany: ${company}\nEmail: ${email}\n\n${message}`;

  const sendgridRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: CONTACT_TO }],
          subject: `NileCotton inquiry from ${name}`,
        },
      ],
      from: { email: "noreply@nilecotton.com", name: "NileCotton" },
      reply_to: { email, name },
      content: [{ type: "text/plain", value: textBody }],
    }),
  });

  if (!sendgridRes.ok) {
    const errorText = await sendgridRes.text().catch(() => "Unable to parse SendGrid error");
    return new Response(JSON.stringify({ error: `SendGrid error: ${errorText}` }), { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
