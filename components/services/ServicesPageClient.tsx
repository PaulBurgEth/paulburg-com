"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesHero from "./sections/ServicesHero";
import ServicesProof from "./sections/ServicesProof";
import ServicesGrid from "./sections/ServicesGrid";

const ServicesTurnkey = dynamic(() => import("./sections/ServicesTurnkey"), { ssr: false });
const ServicesCases   = dynamic(() => import("./sections/ServicesCases"),   { ssr: false });
const ServicesProcess = dynamic(() => import("./sections/ServicesProcess"), { ssr: false });
const ServicesPricing = dynamic(() => import("./sections/ServicesPricing"), { ssr: false });
const ServicesCTA     = dynamic(() => import("./sections/ServicesCTA"),     { ssr: false });

export default function ServicesPageClient() {
  return (
    <main className="min-h-screen" style={{ background: "var(--c-bg)" }}>
      <Navbar />
      <ServicesHero />
      <ServicesProof />
      <ServicesGrid />
      <ServicesTurnkey />
      <ServicesCases />
      <ServicesProcess />
      <ServicesPricing />
      <ServicesCTA />
      <Footer />
    </main>
  );
}
