"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INTAKE_ANCHOR } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import OutboundHero from "./sections/OutboundHero";
import OutboundProblem from "./sections/OutboundProblem";
import OutboundWhy from "./sections/OutboundWhy";
// The mechanism section is static as well: it is the third block on the page,
// it carries the pitch that everything below depends on, and an ssr:false chunk
// would keep the sample email out of the served HTML entirely.
import OutboundHow from "./sections/OutboundHow";
// The form stays a static import on purpose: it is the #intake anchor for every
// CTA on the page, and an ssr:false chunk would not exist yet when the browser
// tries to resolve /outbound#intake on a cold load.
import OutboundForm from "./sections/OutboundForm";

const OutboundFormats    = dynamic(() => import("./sections/OutboundFormats"),    { ssr: false });
const OutboundProof      = dynamic(() => import("./sections/OutboundProof"),      { ssr: false });
const OutboundRules      = dynamic(() => import("./sections/OutboundRules"),      { ssr: false });
const OutboundFit        = dynamic(() => import("./sections/OutboundFit"),        { ssr: false });
const OutboundPilot      = dynamic(() => import("./sections/OutboundPilot"),      { ssr: false });
const OutboundObjections = dynamic(() => import("./sections/OutboundObjections"), { ssr: false });
const OutboundTerms      = dynamic(() => import("./sections/OutboundTerms"),      { ssr: false });
const OutboundStart      = dynamic(() => import("./sections/OutboundStart"),      { ssr: false });

/**
 * Persistent CTA for small screens. The page runs twelve sections; on a phone
 * that is a long way between the hero button and the form, and the three MidCTAs
 * are the only things in between. Hidden once the form itself is on screen so it
 * never covers the thing it points at.
 */
function MobileCTA() {
  const { language } = useLanguage();
  const [show, setShow] = useState(false);

  // One rAF-throttled geometry check on scroll and resize. An earlier version
  // split this between two IntersectionObservers, which is cheaper but leaves
  // the bar stuck if a browser never delivers the initial callback; the two
  // conditions are one subtraction each, so measuring directly is safer.
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const hero = document.getElementById("outbound-top");
      const form = document.getElementById("intake");
      const y = window.scrollY;
      const pastHero = hero ? y > hero.offsetTop + hero.offsetHeight - 80 : y > 700;
      const atForm = form ? y + window.innerHeight > form.offsetTop + 120 : false;
      setShow(pastHero && !atForm);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      className="lg:hidden"
      aria-hidden={!show}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 60,
        padding: "10px 16px calc(10px + env(safe-area-inset-bottom))",
        background: "var(--c-bg2)",
        borderTop: "1px solid var(--c-border)",
        transform: show ? "translateY(0)" : "translateY(110%)",
        transition: "transform 260ms cubic-bezier(0.2,0.7,0.3,1)",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <a
        href={INTAKE_ANCHOR}
        tabIndex={show ? 0 : -1}
        style={{
          display: "block",
          textAlign: "center",
          background: "var(--c-gold)",
          color: "var(--c-bg)",
          border: "1px solid var(--c-gold)",
          borderRadius: 6,
          fontFamily: "var(--font-instrument-sans), sans-serif",
          fontWeight: 600,
          fontSize: 16,
          letterSpacing: "0.02em",
          padding: "13px 20px",
          textDecoration: "none",
        }}
      >
        {language === "ru" ? "Расскажите о вашем рынке" : "Tell me about your market"}
      </a>
    </div>
  );
}

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
        <OutboundProblem />
        <OutboundWhy />
        <OutboundHow />
        <OutboundFormats />
        <OutboundProof />
        <OutboundRules />
        <OutboundFit />
        <OutboundPilot />
        <OutboundObjections />
        <OutboundTerms />
        <OutboundStart />
        <OutboundForm />
        <Footer />
      </div>
      <MobileCTA />
    </main>
  );
}
