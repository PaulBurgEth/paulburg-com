import { Metadata } from "next";
import ServicesPageClient from "@/components/services/ServicesPageClient";

const SERVICES_DESCRIPTION =
  "Custom AI chatbots, CRM & BI systems, manager dashboards, AI matching engines for marketplaces, process automation, and websites. Built for your process. From $500. Turnkey from $3,000.";

export const metadata: Metadata = {
  title: "AI Systems & Automation — Paul Burg",
  description: SERVICES_DESCRIPTION,
  openGraph: {
    title: "AI Systems & Automation — Paul Burg",
    description: SERVICES_DESCRIPTION,
    url: "https://paulburg.com/services",
  },
};

export default function Page() {
  return <ServicesPageClient />;
}
