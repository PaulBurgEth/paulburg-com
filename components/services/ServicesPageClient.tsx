"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesHero from "./sections/ServicesHero";
import ServicesProof from "./sections/ServicesProof";
import ServicesGrid from "./sections/ServicesGrid";
import { useRevealObserver } from "@/lib/useStageReveal";

const ServicesTurnkey = dynamic(() => import("./sections/ServicesTurnkey"), { ssr: false });
const ServicesCases   = dynamic(() => import("./sections/ServicesCases"),   { ssr: false });
const ServicesProcess = dynamic(() => import("./sections/ServicesProcess"), { ssr: false });
const ServicesPricing = dynamic(() => import("./sections/ServicesPricing"), { ssr: false });
const ServicesCTA     = dynamic(() => import("./sections/ServicesCTA"),     { ssr: false });

export default function ServicesPageClient() {
  useRevealObserver();
  return (
    <main className="min-h-screen" style={{ background: "var(--c-bg)", position: "relative" }}>
      {/* Ambient glow */}
      <div style={{ position: "fixed", top: "-30%", left: "-10%", width: "60%", height: "70%", background: "radial-gradient(ellipse, rgba(200,169,110,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-20%", right: "-10%", width: "50%", height: "60%", background: "radial-gradient(ellipse, rgba(122,171,143,0.03) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
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
      </div>
    </main>
  );
}
