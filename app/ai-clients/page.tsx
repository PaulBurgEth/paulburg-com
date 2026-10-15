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

export default function Page() {
  return <AiClientsPageClient />;
}
