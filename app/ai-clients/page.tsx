import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import AiClientsPageClient from "@/components/ai-clients/AiClientsPageClient";

// Kept at 155 chars or under — see docs/DECISIONS.md (Ahrefs meta-description fix).
const AI_CLIENTS_DESCRIPTION =
  "Get named when buyers ask ChatGPT and Google AI Mode who to use, and answer every inquiry on your site in about a minute with an AI Sales Manager.";

export const metadata: Metadata = pageMetadata({
  title: "AI Answers and AI Sales Manager · Paul Burg",
  description: AI_CLIENTS_DESCRIPTION,
  path: "/ai-clients",
});

// Two services, no prices on purpose (decision 2026-10-15).
const SERVICES_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI answers (GEO)",
    serviceType: "Generative engine optimization",
    description: "Getting a company named when its buyers ask ChatGPT and Google AI Mode who to use, with re-measurement on day 30 and day 60.",
    provider: { "@type": "Person", name: "Paul Burg", url: "https://paulburg.com" },
    areaServed: "Worldwide",
    url: "https://paulburg.com/ai-clients",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Sales Manager",
    serviceType: "AI sales assistant for websites",
    description: "An assistant on the company's site that answers every inquiry in about a minute, day and night, qualifies the buyer and hands the manager a buyer ready to talk.",
    provider: { "@type": "Person", name: "Paul Burg", url: "https://paulburg.com" },
    areaServed: "Worldwide",
    url: "https://paulburg.com/ai-clients",
  },
];

export default function Page() {
  return (
    <>
      <AiClientsPageClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_LD) }} />
    </>
  );
}
