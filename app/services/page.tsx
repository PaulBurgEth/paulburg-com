import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ServicesPageClient from "@/components/services/ServicesPageClient";

const SERVICES_DESCRIPTION =
  "Three B2B services: outbound that finds clients by name, AI Inbound for ChatGPT answers and fast replies, and AI automation: bots, CRM, dashboards.";

export const metadata: Metadata = pageMetadata({
  title: "Services: Outbound, AI Inbound and AI Automation · Paul Burg",
  description: SERVICES_DESCRIPTION,
  path: "/services",
});

export default function Page() {
  return <ServicesPageClient />;
}
