import type { Metadata } from "next";
import { Inconsolata, Instrument_Sans, Newsreader, Fraunces, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import ScrollProgress from "@/components/ScrollProgress";
import { TELEGRAM_URL } from "@/lib/constants";

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

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
});

// Source Serif 4 — Cyrillic-capable serif. Acts as fallback for Fraunces/Newsreader
// for Cyrillic glyphs, and is the primary face for RU mode (via html[lang="ru"] CSS rule).
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const SEO_DESCRIPTION =
  "I build custom AI systems for business: chatbots, CRMs, BI and manager dashboards, matching engines, and process automation. Ready in days.";

export const metadata: Metadata = {
  metadataBase: new URL("https://paulburg.com"),
  title: "Paul Burg — AI Systems for Business",
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
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "https://paulburg.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Paul Burg — AI Systems for Business",
    description: SEO_DESCRIPTION,
    url: "https://paulburg.com",
    siteName: "Paul Burg",
    images: [{ url: "https://paulburg.com/og-image.png", width: 1200, height: 630, alt: "Paul Burg" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Burg — AI Systems for Business",
    description: SEO_DESCRIPTION,
    images: ["https://paulburg.com/og-image.png"],
    creator: "@PaulBurg_",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark');})();` }} />
      </head>
      <body
        className={`${inconsolata.variable} ${instrumentSans.variable} ${newsreader.variable} ${fraunces.variable} ${sourceSerif.variable} antialiased overflow-x-hidden`}
      >
        <Providers>
          <ScrollProgress />
          {children}
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
              "jobTitle": "AI Systems Builder",
              "description": "I build custom AI systems for businesses — chatbots, CRMs and BI dashboards, manager dashboards, matching engines, automated workflows, and web platforms. Entrepreneur since 2011."
            }),
          }}
        />
      </body>
    </html>
  );
}
