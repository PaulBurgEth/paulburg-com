import type { Metadata } from "next";

const BASE = "https://paulburg.com";
const OG_IMAGE = `${BASE}/og-image.png`;

/**
 * One place that assembles canonical, hreflang, Open Graph and Twitter cards.
 *
 * Next merges metadata shallowly, one field at a time: a child route that
 * declares `openGraph` *replaces* the parent's object rather than merging into
 * it, and only `title` and `description` are backfilled from the page's own
 * metadata afterwards (see resolve-metadata's postProcessMetadata /
 * inheritFromMetadata). So adding `openGraph: { locale }` to the article route
 * in the previous pass silently removed og:image from all thirteen articles in
 * both languages — an article shared to LinkedIn or Telegram arrived with no
 * preview picture at all.
 *
 * Per-page openGraph was also uneven: two routes declared none, one declared it
 * without an image, one was complete. This makes that impossible to get wrong
 * by giving every route the same call.
 */
export function pageMetadata({
  title,
  description,
  path,
  lang = "en",
  image = OG_IMAGE,
}: {
  title: string;
  description: string;
  /** Route path with a leading slash, or "" for the home page. */
  path: string;
  lang?: "en" | "ru";
  image?: string;
}): Metadata {
  const en = `${BASE}${path}`;
  const ru = `${en}${en.includes("?") ? "&" : "?"}lang=ru`;
  const self = lang === "ru" ? ru : en;

  return {
    title,
    description,
    alternates: {
      canonical: self,
      // Each language gets its own canonical and the pair is declared, so the
      // Russian version stops announcing itself as a duplicate of the English.
      languages: { en, ru },
    },
    openGraph: {
      title,
      description,
      url: self,
      siteName: "Paul Burg",
      type: "website",
      locale: lang === "ru" ? "ru_RU" : "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: "Paul Burg" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@PaulBurg_",
    },
  };
}
