import { Metadata } from "next";
import ServicesPageClient from "@/components/services/ServicesPageClient";

export const metadata: Metadata = {
  title: "AI Systems & Automation — Paul Burg",
  description:
    "Custom AI chatbots, CRM systems, process automation, and websites. Built for your process. From $500. Turnkey from $3,000.",
  openGraph: {
    title: "AI Systems & Automation — Paul Burg",
    description:
      "Custom AI chatbots, CRM systems, process automation, and websites. Built for your process. From $500. Turnkey from $3,000.",
    url: "https://paulburg.com/services",
  },
};

export default function Page() {
  return <ServicesPageClient />;
}
