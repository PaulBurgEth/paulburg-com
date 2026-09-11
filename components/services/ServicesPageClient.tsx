"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesHero from "./sections/ServicesHero";
import ServicesProof from "./sections/ServicesProof";
import ServicesGrid from "./sections/ServicesGrid";
import ServicesOutbound from "./sections/ServicesOutbound";
import { useRevealObserver } from "@/lib/useStageReveal";

// Static imports, not `dynamic(..., { ssr: false })`.
//
// Seven of the ten sections used to load lazily with SSR off, and the served
// document was 420 words against 1 020 rendered — the turnkey banner, the
// cases, the machines, the process, the price table and the closing CTA were
// absent from the HTML entirely. Nothing that reads the page without running
// JS, search engines included, ever saw the flagship offer or a single price.
//
// This is the same fix /outbound got on 2026-08-19; it was never carried over
// here. Cost is the same shape too: a bigger first-screen bundle, against a
// page that is actually complete when it arrives.
import ServicesTurnkey from "./sections/ServicesTurnkey";
import ServicesCases from "./sections/ServicesCases";
import ServicesMachines from "./sections/ServicesMachines";
import ServicesProcess from "./sections/ServicesProcess";
import ServicesPricing from "./sections/ServicesPricing";
import ServicesCTA from "./sections/ServicesCTA";

export default function ServicesPageClient() {
  useRevealObserver();
  return (
    <div className="min-h-screen" style={{ background: "var(--c-bg)", position: "relative" }}>
      {/* Ambient glow */}
      <div style={{ position: "fixed", top: "-30%", left: "-10%", width: "60%", height: "70%", background: "radial-gradient(ellipse, rgba(200,169,110,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-20%", right: "-10%", width: "50%", height: "60%", background: "radial-gradient(ellipse, rgba(122,171,143,0.03) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
      {/* Navbar and Footer sit outside <main> on purpose. They used to be inside
          it, which strips <footer> of its implicit contentinfo role per the
          HTML-AAM — so these pages had no banner, no navigation and no
          contentinfo landmark at all, just one main wrapped around the whole
          document. The home page was the only one built correctly. */}
        <Navbar />
        <main id="content">
        <ServicesHero />
        <ServicesProof />
        <ServicesGrid />
        <ServicesTurnkey />
        <ServicesCases />
        <ServicesMachines />
        <ServicesOutbound />
        <ServicesProcess />
        <ServicesPricing />
        <ServicesCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
