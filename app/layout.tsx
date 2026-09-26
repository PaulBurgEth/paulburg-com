import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { Martian_Mono, Onest } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import ScrollProgress from "@/components/ScrollProgress";
import SectionRail from "@/components/SectionRail";
import { TELEGRAM_URL } from "@/lib/constants";
import { LANG_HEADER } from "@/middleware";

// Two families, both with Cyrillic drawn into the face itself. Until 2026-09
// the site loaded seven: Fraunces, Newsreader, Instrument Sans and Inconsolata
// (all Latin-only) plus Source Serif 4, Inter and JetBrains Mono as Cyrillic
// stand-ins — about 1.1 MB, more than half of which never rendered a glyph in
// any one language, and RU was set in different faces from EN. Now one file per
// subset carries both alphabets, so both languages render in the same type.

// Display and the mono layer. Variable: wdth 75–112.5 and wght 100–800.
const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  display: "swap",
  axes: ["wdth"],
});

// Body, lede and UI labels.
const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  display: "swap",
});

const SEO_DESCRIPTION =
  "I build custom AI systems — chatbots, CRMs, BI dashboards, automation — and run the cold outbound channel that fills them with B2B clients.";

export const metadata: Metadata = {
  metadataBase: new URL("https://paulburg.com"),
  title: "Paul Burg — AI Systems & B2B Outbound",
  description: SEO_DESCRIPTION,
  keywords: [
    "Paul Burg",
    "AI systems",
    "AI automation",
    "AI matching engines",
    "vertical marketplace",
    "real estate matching",
    "chatbot development",
    "CRM development",
    "BI dashboards",
    "manager dashboards",
    "business automation",
    "AI builder",
    "custom AI",
    "PropTech AI",
    "cold outbound",
    "B2B lead generation",
    "SDR as a service",
    "sales pipeline",
    "cold email",
    "outbound agency",
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Paul Burg — AI Systems & B2B Outbound",
    description: SEO_DESCRIPTION,
    url: "https://paulburg.com",
    siteName: "Paul Burg",
    images: [{ url: "https://paulburg.com/og-image.png", width: 1200, height: 630, alt: "Paul Burg" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Burg — AI Systems & B2B Outbound",
    description: SEO_DESCRIPTION,
    images: ["https://paulburg.com/og-image.png"],
    creator: "@PaulBurg_",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Language resolved by middleware.ts, so <html lang> is correct in the first
  // byte. It used to be hardcoded "en" and corrected in an effect after
  // hydration, which meant Russian copy was served inside lang="en" — wrong for
  // a screen reader, and invisible to a crawler that does not run JS.
  const lang = (await headers()).get(LANG_HEADER) === "ru" ? "ru" : "en";

  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Theme and language both have to be settled before the first paint.
            Language was not: it was applied in an effect after hydration, so a
            Russian reader got a frame of Russian copy inside lang="en" (and,
            while the site still ran Latin-only faces, a frame of system
            fallbacks before a lang rule swapped them). <html> already carries
            suppressHydrationWarning, and LanguageContext sets the same value on
            mount, so the two agree.

            Theme falls back to prefers-color-scheme when nothing is stored.
            It used to default to dark unconditionally, so a first-time visitor
            whose system is set to light still got the dark site — the OS
            preference was never consulted anywhere in the project. */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}d.classList.toggle('dark',t==='dark');var q=new URLSearchParams(location.search).get('lang');if(q==='ru'||q==='en')d.lang=q;}catch(e){}})();` }} />
      </head>
      <body
        className={`${martianMono.variable} ${onest.variable} antialiased overflow-x-hidden`}
      >
        <Providers initialLanguage={lang}>
          {/* First thing in the tab order, before the rail and the navbar. */}
          <a className="skip-link" href="#content">Skip to content</a>
          <ScrollProgress />
          {children}
          {/* The rail renders fixed, so its position in the document is free —
              and putting it after the content keeps a dozen section buttons out
              of the way of a keyboard user heading for the page itself. */}
          <SectionRail />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Paul Burg",
              "url": "https://paulburg.com",
              "sameAs": [
                "https://x.com/PaulBurg_",
                "https://www.linkedin.com/in/paul-burg",
                TELEGRAM_URL
              ],
              "jobTitle": "AI Systems Builder & B2B Outbound",
              "description": "Two things for B2B companies: I build the systems that run the business — chatbots, CRMs and BI dashboards, matching engines, automated workflows, web platforms — and I run the cold outbound channel that fills them with clients. Entrepreneur since 2011."
            }),
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K8D4TS6Q7B"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-K8D4TS6Q7B');`}
        </Script>
      </body>
    </html>
  );
}
