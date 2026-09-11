import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { Inconsolata, Instrument_Sans, Newsreader, Fraunces, Source_Serif_4, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import ScrollProgress from "@/components/ScrollProgress";
import SectionRail from "@/components/SectionRail";
import { TELEGRAM_URL } from "@/lib/constants";
import { LANG_HEADER } from "@/middleware";

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

// Variable fonts — load full variable-weight axis + opsz axis so the browser
// auto-selects display-optimized optical sizes at large hero scales (matches
// the mockup which uses Fraunces opsz 9..144).
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  style: ["normal", "italic"],
});

// SOFT and WONK are dropped. Neither is ever set: there is no
// font-variation-settings anywhere in the project, so both axes shipped as pure
// payload inside the variable font. Measured against Google's own files, the
// latin face is 120 800 bytes carrying all three axes and 67 388 bytes with
// opsz alone — 53 KB per style, 116 KB across the roman and the italic, for a
// face that renders identically. opsz stays: it is applied automatically and it
// is what gives the hero its display cut.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  style: ["normal", "italic"],
});

// Source Serif 4 — Cyrillic-capable serif. Acts as fallback for Fraunces/Newsreader
// for Cyrillic glyphs, and is the primary face for RU mode (via html[lang="ru"] CSS rule).
// preload: false — see the note above `inter` below. Weight 500 is gone: it was
// used three times in the whole project, and each static weight is another eight
// files (four subsets x roman and italic) in the preload set.
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  display: "swap",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  preload: false,
});

// Cyrillic counterparts. Inconsolata, Instrument Sans, Newsreader and Fraunces
// ship Latin only — no subset flag can add Cyrillic, the glyphs do not exist in
// those families. In RU the browser was therefore falling back to a system mono
// and a system grotesque for every label, caption, eyebrow and body paragraph,
// which is why Russian pages looked unrelated to the English ones. These two
// are swapped in by an html[lang="ru"] rule in globals.css; Inter matches
// Instrument Sans in proportion and JetBrains Mono keeps the terminal register
// the section markers depend on.
//
// They carry preload: false, and so does Source Serif 4 above.
//
// next/font emits a high-priority <link rel="preload"> for every declared family,
// on every page, in both languages. Measured on /outbound: 22 font files and
// 1 126 KB, against 273 KB of gzipped JS — fonts were 79% of the first screen.
// Of that, 531 KB never rendered a glyph in English (Inter 174, JetBrains Mono
// 68, Source Serif 289), and mirror-image in Russian 591 KB of Fraunces,
// Newsreader, Instrument Sans and Inconsolata never rendered either.
//
// The @font-face declarations stay, so the browser still fetches these the
// moment a Cyrillic glyph or the html[lang="ru"] rule asks for one — they are
// simply no longer racing the LCP text for bandwidth on a page that will not
// use them. Russian pays a swap for it, and already did: the server always
// renders lang="en" and the switch happens after hydration.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  display: "swap",
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  display: "swap",
  preload: false,
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
            Russian reader got a frame of Latin-only Fraunces and Inconsolata
            with no Cyrillic in them — every heading, eyebrow and § marker drawn
            in a system fallback — and only then the html[lang="ru"] rule in
            globals.css swapped the faces. <html> already carries
            suppressHydrationWarning, and LanguageContext sets the same value on
            mount, so the two agree.

            Theme falls back to prefers-color-scheme when nothing is stored.
            It used to default to dark unconditionally, so a first-time visitor
            whose system is set to light still got the dark site — the OS
            preference was never consulted anywhere in the project. */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}d.classList.toggle('dark',t==='dark');var q=new URLSearchParams(location.search).get('lang');if(q==='ru'||q==='en')d.lang=q;}catch(e){}})();` }} />
      </head>
      <body
        className={`${inconsolata.variable} ${instrumentSans.variable} ${newsreader.variable} ${fraunces.variable} ${sourceSerif.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased overflow-x-hidden`}
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
