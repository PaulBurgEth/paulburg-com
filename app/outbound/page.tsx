import { Metadata } from "next";
import OutboundPageClient from "@/components/outbound/OutboundPageClient";

// Kept at 155 chars or under — see docs/DECISIONS.md (Ahrefs meta-description fix).
const OUTBOUND_DESCRIPTION =
  "Cold outbound as a service for B2B. I find companies in open registries, reach the decision-maker, write in your name, and hand you a client ready to talk.";

export const metadata: Metadata = {
  title: "Cold Outbound & Sales Pipeline — Paul Burg",
  description: OUTBOUND_DESCRIPTION,
  alternates: {
    canonical: "https://paulburg.com/outbound",
  },
  openGraph: {
    title: "Cold Outbound & Sales Pipeline — Paul Burg",
    description: OUTBOUND_DESCRIPTION,
    url: "https://paulburg.com/outbound",
    images: [{ url: "/og-image.png" }],
  },
};

export default function Page() {
  return <OutboundPageClient />;
}
