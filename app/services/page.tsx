import { Metadata } from "next";
import ServicesPageClient from "@/components/services/ServicesPageClient";

const SERVICES_DESCRIPTION =
  "Custom AI chatbots, CRM and BI systems, manager dashboards, matching engines, process automation, and websites. From $500. Turnkey from $3,000.";

export const metadata: Metadata = {
  title: "AI Systems & Automation — Paul Burg",
  description: SERVICES_DESCRIPTION,
  alternates: {
    canonical: "https://paulburg.com/services",
  },
  openGraph: {
    title: "AI Systems & Automation — Paul Burg",
    description: SERVICES_DESCRIPTION,
    url: "https://paulburg.com/services",
  },
};

export default function Page() {
  return <ServicesPageClient />;
}
