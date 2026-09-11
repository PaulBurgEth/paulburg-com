import { NextResponse } from "next/server";

// In-memory rate limit — 30 second window per IP.
// Acceptable for a low-traffic portfolio site; resets on deploy.
const RATE_LIMIT_MS = 30_000;
const recentSubmissions = new Map<string, number>();

/**
 * Single-line field: control characters out, and newlines collapsed.
 *
 * The old version kept \n and \t deliberately — the character class skipped
 * \u0009 and \u000A — and only one field, bestClient, collapsed them
 * afterwards. The notification is assembled by string concatenation into a
 * list of "Key: value" lines, so any other field could carry a newline and
 * forge extra lines: a name of "Ivan\nContact: @attacker" produced a message
 * with two Contact lines, and the reader has no way to tell which is real.
 *
 * The author had already found this for bestClient and written the reason in a
 * comment there. The fix was applied to one field out of eight.
 */
function sanitize(value: unknown, maxLen = 500): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    // Every newline and tab becomes a separator, so the line structure of the
    // message can only be produced by this file.
    .replace(/[\t\r\n]+/g, " · ")
    .trim()
    .slice(0, maxLen);
}

/** Multi-line field: newlines kept, but indented so they cannot open a line. */
function sanitizeMultiline(value: unknown, maxLen = 1000): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" · ")
    .trim()
    .slice(0, maxLen);
}

const NEED_LABELS: Record<string, string> = {
  bot: "AI Bot",
  automation: "Process Automation",
  crm: "Custom CRM & BI Systems",
  matching: "AI Matching Engine",
  website: "Custom Website",
  turnkey: "Turnkey (AI Bot + Custom CRM + BI)",
  other: "Other",
};

const BUDGET_LABELS: Record<string, string> = {
  "<1k": "< $1,000",
  "1-3k": "$1,000 – $3,000",
  "3k+": "$3,000+",
  "3-10k": "$3,000 – $10,000",
  "10k+": "$10,000+",
  "not-sure": "Not sure yet",
};

const CONTACT_LABELS: Record<string, string> = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  email: "Email",
};

const TEAM_SIZE_LABELS: Record<string, string> = {
  solo: "Solo",
  "2-5": "2–5",
  "6-20": "6–20",
  "20+": "20+",
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: "ASAP",
  "2-4w": "2–4 weeks",
  "1-3m": "1–3 months",
  exploring: "Exploring",
};

const MENTORSHIP_AREA_LABELS: Record<string, string> = {
  capital: "Capital",
  business: "Business",
  ai: "AI & Automation",
};

// Keys match what MentorshipIntakeModal actually sends. They did not: the
// modal sends "advanced", which was absent here and fell through to the raw
// string in the notification, while "deeper" was a key nothing ever produced.
const MENTORSHIP_LEVEL_LABELS: Record<string, string> = {
  beginner: "Beginner — just starting out",
  some: "Some experience — wants to go deeper",
  advanced: "Advanced — wants a sparring partner",
};

const SDR_FORMAT_LABELS: Record<string, string> = {
  leads: "Leads (stages 01-06)",
  deal: "Leads + Deal (stages 01-09)",
  "not-sure": "Not sure yet",
};

const SDR_MARKET_LABELS: Record<string, string> = {
  ru: "Russia & CIS",
  eu: "Europe",
  us: "North America",
  latam: "Latin America",
  mena: "Middle East & Africa",
  apac: "Asia-Pacific",
  global: "No restriction",
};

const SDR_CYCLE_LABELS: Record<string, string> = {
  lt1m: "Under a month",
  "1-3m": "1-3 months",
  "3-6m": "3-6 months",
  "6m+": "Over 6 months",
};

const SDR_CHANNEL_LABELS: Record<string, string> = {
  inbound: "Inbound / SEO",
  ads: "Paid ads",
  referrals: "Referrals",
  ownsales: "Own sales team",
  none: "No steady channel",
};

/**
 * Values that came from a fixed list stay in that list. sanitizeNeedsArray had
 * no allow-list, so any 32-character string a submitter chose was passed
 * straight into the notification body.
 */
function keepKnown(values: string[], labels: Record<string, string>): string[] {
  return values.filter((v) => v in labels);
}

function sanitizeNeedsArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => sanitize(v, 32))
    .filter((v) => v.length > 0)
    .slice(0, 10);
}

/**
 * Only this site may post here. There was no Origin check at all, so any page
 * anywhere could submit the form on a visitor's behalf, and robots.ts did not
 * disallow /api either.
 */
const ALLOWED_ORIGINS = new Set([
  "https://paulburg.com",
  "https://www.paulburg.com",
]);

function originAllowed(req: Request): boolean {
  const origin = req.headers.get("origin");
  // Same-origin form posts from the site itself send an Origin header. A
  // missing one is allowed only outside production, where localhost ports vary.
  if (!origin) return process.env.NODE_ENV !== "production";
  if (ALLOWED_ORIGINS.has(origin)) return true;
  // Vercel preview deployments.
  return /^https:\/\/[\w-]+\.vercel\.app$/.test(origin);
}

export async function POST(req: Request) {
  try {
    if (!originAllowed(req)) {
      return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    }
    // Rate limit by IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const now = Date.now();
    const last = recentSubmissions.get(ip) || 0;
    if (now - last < RATE_LIMIT_MS) {
      return NextResponse.json(
        { ok: false, error: "rate_limited" },
        { status: 429 },
      );
    }
    // Armed here, not after a successful send. It used to be set only on the
    // happy path, so a 400, a 500 or a failing Telegram left the window open
    // and retries were unlimited for as long as the failure lasted.
    recentSubmissions.set(ip, now);

    const raw = await req.json().catch(() => null);
    if (!raw || typeof raw !== "object") {
      // The IP is not logged. It used to be written on every request — PII
      // with no stated retention, in a log nobody rotates.
      console.error("[intake] Invalid body received");
      return NextResponse.json(
        { ok: false, error: "invalid_body" },
        { status: 400 },
      );
    }

    const r = raw as Record<string, unknown>;
    const type = sanitize(r.type, 32);
    console.log("[intake] Incoming submission:", {
      type: type || "services",
      name: sanitize(r.name, 120) ? "[present]" : "[missing]",
      contactInfo: sanitize(r.contactInfo, 200) ? "[present]" : "[missing]",
      language: sanitize(r.language, 8) || "—",
    });
    const name = sanitize(r.name, 120);
    const business = sanitize(r.business, 200);
    // Legacy single-select "need" (old form) — still accepted.
    const needRaw = sanitize(r.need, 32);
    // New multi-select needs array (new modal).
    const needsArr = keepKnown(sanitizeNeedsArray(r.needs), NEED_LABELS);
    const challenge = sanitizeMultiline(r.challenge, 1000);
    const currentSetup = sanitizeMultiline(r.currentSetup, 1000);
    const teamSizeRaw = sanitize(r.teamSize, 32);
    const budgetRaw = sanitize(r.budget, 32);
    const timelineRaw = sanitize(r.timeline, 32);
    const contactMethodRaw = sanitize(r.contactMethod, 32);
    const contactInfo = sanitize(r.contactInfo, 200);
    const language = sanitize(r.language, 8);

    // Mentorship requests: only name + contactInfo required (no business field).
    // Services requests (default): name + business + contactInfo required.
    if (type === "mentorship") {
      if (!name || !contactInfo) {
        return NextResponse.json(
          { ok: false, error: "missing_fields" },
          { status: 400 },
        );
      }
    } else {
      if (!name || !business || !contactInfo) {
        return NextResponse.json(
          { ok: false, error: "missing_fields" },
          { status: 400 },
        );
      }
    }

    const need = NEED_LABELS[needRaw] || needRaw || "";
    const needsLabels = needsArr
      .map((n) => NEED_LABELS[n] || n)
      .join(", ");
    const needsDisplay = needsLabels || need || "—";
    const budget = BUDGET_LABELS[budgetRaw] || budgetRaw || "—";
    const teamSize = TEAM_SIZE_LABELS[teamSizeRaw] || teamSizeRaw || "";
    const timeline = TIMELINE_LABELS[timelineRaw] || timelineRaw || "";
    const contactMethod =
      CONTACT_LABELS[contactMethodRaw] || contactMethodRaw || "—";

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("[intake] MISSING ENV VARS — set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Vercel → Settings → Environment Variables");
      return NextResponse.json(
        { ok: false, error: "server_not_configured" },
        { status: 500 },
      );
    }

    // Plaintext message — no parse_mode — avoids MarkdownV2 escape bugs.
    let lines: string[];
    if (type === "mentorship") {
      const areaRaw = sanitize(r.area, 32);
      const levelRaw = sanitize(r.level, 32);
      const achievement = sanitizeMultiline(r.achievement, 1000);
      const area = MENTORSHIP_AREA_LABELS[areaRaw] || areaRaw || "—";
      const level = MENTORSHIP_LEVEL_LABELS[levelRaw] || levelRaw || "—";
      lines = [
        "🎓 New mentorship request from paulburg.com",
        "",
        `Name: ${name}`,
        `Area: ${area}`,
        `Level: ${level}`,
      ];
      if (achievement) lines.push(`Goal: ${achievement}`);
      lines.push(`Contact via: ${contactMethod}`);
      lines.push(`Contact: ${contactInfo}`);
      lines.push(`Language: ${language || "—"}`);
    } else if (type === "sdr") {
      const sdrFormatRaw = sanitize(r.sdrFormat, 32);
      const cycleRaw = sanitize(r.cycle, 32);
      const channelRaw = sanitize(r.channel, 32);
      const marketsArr = keepKnown(sanitizeNeedsArray(r.markets), SDR_MARKET_LABELS);
      const bestClient = sanitizeMultiline(r.bestClient, 1000);
      const markets = marketsArr
        .map((m) => SDR_MARKET_LABELS[m] || m)
        .join(", ");
      lines = [
        "📣 New outbound/SDR request from paulburg.com",
        "",
        `Name: ${name}`,
        `Company: ${business}`,
        `Format: ${SDR_FORMAT_LABELS[sdrFormatRaw] || sdrFormatRaw || "—"}`,
      ];
      if (markets) lines.push(`Markets: ${markets}`);
      if (cycleRaw) lines.push(`Sales cycle: ${SDR_CYCLE_LABELS[cycleRaw] || cycleRaw}`);
      if (channelRaw) lines.push(`Current channel: ${SDR_CHANNEL_LABELS[channelRaw] || channelRaw}`);
      lines.push(`Contact via: ${contactMethod}`);
      lines.push(`Contact: ${contactInfo}`);
      lines.push(`Language: ${language || "—"}`);
      // Last, after a blank line, so a long answer cannot push the contact
      // details out of the Telegram notification preview.
      if (bestClient) lines.push("", `Best client: ${bestClient}`);
    } else {
      lines = [
        "🆕 New intake from paulburg.com",
        "",
        `Name: ${name}`,
        `Business: ${business}`,
      ];
      if (challenge) lines.push(`Challenge/Goal: ${challenge}`);
      lines.push(`Needs: ${needsDisplay}`);
      if (currentSetup) lines.push(`Current setup: ${currentSetup}`);
      if (teamSize) lines.push(`Team size: ${teamSize}`);
      lines.push(`Budget: ${budget}`);
      if (timeline) lines.push(`Timeline: ${timeline}`);
      lines.push(`Contact via: ${contactMethod}`);
      lines.push(`Contact: ${contactInfo}`);
      lines.push(`Language: ${language || "—"}`);
    }
    const text = lines.join("\n");

    // The chat id is not logged. It is not a secret on its own, but it is one
    // half of the pair that can post into the owner's chat.
    console.log("[intake] Sending to Telegram");
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          disable_web_page_preview: true,
        }),
      },
    );

    if (!tgRes.ok) {
      const tgBody = await tgRes.text().catch(() => "");
      console.error("[intake] Telegram API error — status:", tgRes.status, "body:", tgBody);
      return NextResponse.json(
        { ok: false, error: "telegram_failed" },
        { status: 502 },
      );
    }

    console.log("[intake] Telegram message sent OK, status:", tgRes.status);

    // Opportunistic cleanup — prevent unbounded growth.
    if (recentSubmissions.size > 1000) {
      for (const [k, ts] of recentSubmissions) {
        if (now - ts > RATE_LIMIT_MS * 10) recentSubmissions.delete(k);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[intake] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      { status: 500 },
    );
  }
}
