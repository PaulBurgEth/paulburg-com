import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import OutboundPageClient from "@/components/outbound/OutboundPageClient";

// Kept at 155 chars or under — see docs/DECISIONS.md (Ahrefs meta-description fix).
const OUTBOUND_DESCRIPTION =
  "Cold outbound for B2B. Your pipeline is referrals plus whoever finds you. The third source: companies with a fresh reason to buy, reached by name.";

export const metadata: Metadata = pageMetadata({
  title: "Cold Outbound & Sales Pipeline — Paul Burg",
  description: OUTBOUND_DESCRIPTION,
  path: "/outbound",
});

export default function Page() {
  return <OutboundPageClient />;
}
