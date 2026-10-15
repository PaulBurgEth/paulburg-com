import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import AiInboundPageClient from "@/components/ai-inbound/AiInboundPageClient";

// Kept at 155 chars or under — see docs/DECISIONS.md (Ahrefs meta-description fix).
const AI_INBOUND_DESCRIPTION =
  "Your company visible to ChatGPT and Google's AI answers, and every inquiry answered in a minute.";

export const metadata: Metadata = pageMetadata({
  title: "AI Inbound: AI Answers and AI Sales Manager · Paul Burg",
  description: AI_INBOUND_DESCRIPTION,
  path: "/ai-inbound",
});

// Two services, no prices on purpose (decision 2026-10-15).
const SERVICES_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI answers (GEO)",
    serviceType: "Generative engine optimization",
    description: "Making a company's site and data visible to ChatGPT, Gemini and Google's AI answers, measured before the work and on day 30 and day 60.",
    provider: { "@type": "Person", name: "Paul Burg", url: "https://paulburg.com" },
    areaServed: "Worldwide",
    url: "https://paulburg.com/ai-inbound",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Sales Manager",
    serviceType: "AI sales assistant for websites",
    description: "An assistant on the company's site that answers every inquiry in about a minute, day and night, qualifies the buyer and hands the manager a buyer ready to talk.",
    provider: { "@type": "Person", name: "Paul Burg", url: "https://paulburg.com" },
    areaServed: "Worldwide",
    url: "https://paulburg.com/ai-inbound",
  },
];

export default function Page() {
  return (
    <>
      <AiInboundPageClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_LD) }} />
    </>
  );
}
