import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ServicesPageClient from "@/components/services/ServicesPageClient";

const SERVICES_DESCRIPTION =
  "AI systems built from scratch: bots, CRM and BI, dashboards, matching engines, websites, scoped per project. Plus a cold outbound channel that brings clients.";

export const metadata: Metadata = pageMetadata({
  title: "AI Systems & Client Pipelines — Paul Burg",
  description: SERVICES_DESCRIPTION,
  path: "/services",
});

export default function Page() {
  return <ServicesPageClient />;
}
