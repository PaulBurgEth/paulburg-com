"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OutboundHero from "./sections/OutboundHero";
import OutboundNumbers from "./sections/OutboundNumbers";
import OutboundWhy from "./sections/OutboundWhy";
import OutboundFormats from "./sections/OutboundFormats";
// The form stays a static import on purpose: it is the #intake anchor for every
// CTA on the page, and an ssr:false chunk would not exist yet when the browser
// tries to resolve /outbound#intake on a cold load.
import OutboundForm from "./sections/OutboundForm";

const OutboundHow   = dynamic(() => import("./sections/OutboundHow"),   { ssr: false });
const OutboundProof = dynamic(() => import("./sections/OutboundProof"), { ssr: false });
const OutboundRules = dynamic(() => import("./sections/OutboundRules"), { ssr: false });
const OutboundPilot = dynamic(() => import("./sections/OutboundPilot"), { ssr: false });
const OutboundTerms = dynamic(() => import("./sections/OutboundTerms"), { ssr: false });
const OutboundStart = dynamic(() => import("./sections/OutboundStart"), { ssr: false });

export default function OutboundPageClient() {
  // No useRevealObserver here: every section animates itself via whileInView,
  // so nothing depends on a one-shot querySelectorAll at mount time.
  return (
    <main className="min-h-screen" style={{ background: "var(--c-bg)", position: "relative" }}>
      {/* Ambient glow */}
      <div style={{ position: "fixed", top: "-30%", left: "-10%", width: "60%", height: "70%", background: "radial-gradient(ellipse, rgba(200,169,110,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-20%", right: "-10%", width: "50%", height: "60%", background: "radial-gradient(ellipse, rgba(122,171,143,0.03) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <OutboundHero />
        <OutboundNumbers />
        <OutboundWhy />
        <OutboundFormats />
        <OutboundHow />
        <OutboundProof />
        <OutboundRules />
        <OutboundPilot />
        <OutboundTerms />
        <OutboundStart />
        <OutboundForm />
        <Footer />
      </div>
    </main>
  );
}
