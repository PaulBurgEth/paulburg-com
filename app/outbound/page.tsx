import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import OutboundPageClient from "@/components/outbound/OutboundPageClient";

// Kept at 155 chars or under — see docs/DECISIONS.md (Ahrefs meta-description fix).
const OUTBOUND_DESCRIPTION =
  "Digital outbound for B2B. Beyond referrals and inbound, a third source of clients: companies picked one by one, each read before it is written to.";

export const metadata: Metadata = pageMetadata({
  title: "Digital Outbound for B2B — Paul Burg",
  description: OUTBOUND_DESCRIPTION,
  path: "/outbound",
});

export default function Page() {
  return <OutboundPageClient />;
}
