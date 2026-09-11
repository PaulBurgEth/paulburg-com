import { NextResponse, type NextRequest } from "next/server";

/**
 * Resolves the reader's language on the server.
 *
 * Half the audience is Russian-speaking, and until this existed none of the
 * Russian site reached a server response: `curl "/outbound?lang=ru"` returned
 * zero Russian words. Language was a client-only concern — read from
 * localStorage, applied after hydration — so every page was served as
 * `lang="en"` with English copy. Google indexed one language of a bilingual
 * site, all thirteen fully translated articles included.
 *
 * The order is deliberate:
 *
 *   1. `?lang=` wins. Cold outbound links carry it, and a link that promises a
 *      Russian page has to deliver one regardless of what the browser stored.
 *   2. Then the cookie, which is what the client writes on every switch.
 *      A cookie rather than localStorage because the server cannot read
 *      localStorage, and the language has to be known before the first byte.
 *   3. Then Accept-Language, so a first-time Russian visitor gets Russian
 *      without having to find the switch.
 *   4. Then English.
 *
 * The resolved value travels on a request header that the root layout reads for
 * `<html lang>`, and is echoed into the cookie so a `?lang=` link is sticky for
 * the rest of the visit.
 */

export const LANG_HEADER = "x-pb-lang";
export const LANG_COOKIE = "pb-lang";

function pick(req: NextRequest): "en" | "ru" {
  const q = req.nextUrl.searchParams.get("lang");
  if (q === "ru" || q === "en") return q;

  const c = req.cookies.get(LANG_COOKIE)?.value;
  if (c === "ru" || c === "en") return c;

  // Only Russian is worth detecting: it is the one alternative the site has.
  const accept = req.headers.get("accept-language") ?? "";
  if (/\bru\b/i.test(accept.split(",")[0] ?? "")) return "ru";

  return "en";
}

export function middleware(req: NextRequest) {
  const lang = pick(req);

  const headers = new Headers(req.headers);
  headers.set(LANG_HEADER, lang);

  const res = NextResponse.next({ request: { headers } });

  // Persist only when it changed, so a plain visit does not rewrite the cookie
  // on every request.
  if (req.cookies.get(LANG_COOKIE)?.value !== lang) {
    res.cookies.set(LANG_COOKIE, lang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  return res;
}

export const config = {
  // Static assets and the API do not need a language, and running on them would
  // cost a middleware invocation per font file.
  matcher: ["/((?!_next/static|_next/image|api/|favicon|apple-icon|og-image|robots|sitemap|llms).*)"],
};
