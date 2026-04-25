import type { Metadata } from "next";
import { Inconsolata, Instrument_Sans, Newsreader, Fraunces } from "next/font/google";
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

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paulburg.com"),
  title: "Paul Burg — AI Systems for Business",
  description: "I build custom AI systems for businesses: chatbots, CRMs, process automation, and web platforms. Ready in days, built around your process.",
  keywords: ["Paul Burg", "AI systems", "AI automation", "chatbot development", "CRM development", "business automation", "AI builder", "custom AI"],
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
    description: "I build custom AI systems for businesses: chatbots, CRMs, process automation, and web platforms. Ready in days, built around your process.",
    url: "https://paulburg.com",
    siteName: "Paul Burg",
    images: [{ url: "https://paulburg.com/og-image.png", width: 1200, height: 630, alt: "Paul Burg" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Burg — AI Systems for Business",
    description: "I build custom AI systems for businesses: chatbots, CRMs, process automation, and web platforms. Ready in days, built around your process.",
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
        className={`${inconsolata.variable} ${instrumentSans.variable} ${newsreader.variable} ${fraunces.variable} antialiased overflow-x-hidden`}
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
              "description": "I build custom AI systems for businesses — chatbots, CRMs, automated workflows, and web platforms. Entrepreneur since 2011."
            }),
          }}
        />
      </body>
    </html>
  );
}
