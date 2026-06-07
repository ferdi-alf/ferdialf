import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY);

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    req.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const fingerprint = req.headers.get("x-device-fingerprint") ?? "unknown";
    const userAgent = (req.headers.get("user-agent") ?? "unknown").substring(
      0,
      30,
    );
    const acceptLang = req.headers.get("accept-language") ?? "";

    const rateLimitKey = [
      "contact",
      ip,
      fingerprint.substring(0, 16),
      userAgent.replace(/[^a-zA-Z0-9]/g, "").substring(0, 12),
      acceptLang.substring(0, 8),
    ].join(":");

    const rateResult = checkRateLimit(rateLimitKey, 3, 60 * 60 * 1000);

    if (!rateResult.allowed) {
      const resetInMin = Math.ceil(
        (rateResult.resetAt - Date.now()) / 1000 / 60,
      );
      return NextResponse.json(
        { error: `Too many requests. Try again in ${resetInMin} minute(s).` },
        { status: 429 },
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 },
      );
    }

    const { name, email, message } = body as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 },
      );
    }
    if (name.length > 100 || message.length > 2000 || email.length > 254) {
      return NextResponse.json({ error: "Input too long." }, { status: 400 });
    }

    const safe = (s: string) => s.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "ferdialf.dev@gmail.com",

      replyTo: email,

      subject: `✉️ New message from ${safe(name)} — Portfolio`,
      html: `
        <div style="font-family:-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#f9f9f9;border-radius:12px;">
          <h2 style="margin:0 0 4px;color:#111;font-size:20px;">New Portfolio Message</h2>
          <p style="margin:0 0 24px;color:#888;font-size:13px;">Sent via your portfolio contact form</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr>
              <td style="padding:10px 0;color:#888;font-size:13px;width:72px;vertical-align:top;">Name</td>
              <td style="padding:10px 0;color:#111;font-size:14px;font-weight:500;">${safe(name)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;">Email</td>
              <td style="padding:10px 0;">
                <a href="mailto:${safe(email)}" style="color:#4f46e5;font-size:14px;text-decoration:none;">${safe(email)}</a>
              </td>
            </tr>
          </table>
          <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px 20px;">
            <p style="margin:0 0 8px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.05em;">Message</p>
            <p style="margin:0;color:#111;font-size:14px;line-height:1.7;white-space:pre-wrap;">${safe(message)}</p>
          </div>
          <p style="margin:20px 0 0;color:#aaa;font-size:11px;">IP: ${ip} · Sent at ${new Date().toUTCString()}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
