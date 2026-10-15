"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INTAKE_ANCHOR } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
// Static imports on purpose, as on /outbound: the sales copy must be in the served HTML.
import AiHero from "./sections/AiHero";
import AiMarket from "./sections/AiMarket";
import AiProblem from "./sections/AiProblem";
import AiNamed from "./sections/AiNamed";
import AiGet from "./sections/AiGet";
import AiSpeed from "./sections/AiSpeed";
import AiAgent from "./sections/AiAgent";
import AiFit from "./sections/AiFit";
import AiQuestions from "./sections/AiQuestions";
import AiWho from "./sections/AiWho";
import AiForm from "./sections/AiForm";

/** Sticky CTA on phones, hidden once the form is on screen. Same logic as /outbound. */
function MobileCTA() {
  const { language } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const hero = document.getElementById("ai-top");
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
        position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 60,
        padding: "10px 16px calc(10px + env(safe-area-inset-bottom))",
        background: "var(--c-bg2)", borderTop: "1px solid var(--c-border)",
        transform: show ? "translateY(0)" : "translateY(110%)",
        transition: "transform 260ms cubic-bezier(0.2,0.7,0.3,1)",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <a
        href={INTAKE_ANCHOR}
        tabIndex={show ? 0 : -1}
        style={{
          display: "block", textAlign: "center", background: "var(--c-gold)", color: "var(--c-on-gold)",
          border: "1px solid var(--c-gold)", borderRadius: 6, fontFamily: "var(--font-onest), sans-serif",
          fontWeight: 600, fontSize: 16, letterSpacing: "0.02em", padding: "13px 20px", textDecoration: "none",
        }}
      >
        {language === "ru" ? "Пришлите сайт" : "Send me your site"}
      </a>
    </div>
  );
}

export default function AiInboundPageClient() {
  return (
    <div className="min-h-screen" style={{ background: "var(--c-bg)", position: "relative" }}>
      <div style={{ position: "fixed", top: "-30%", left: "-10%", width: "60%", height: "70%", background: "radial-gradient(ellipse, rgba(200,169,110,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-20%", right: "-10%", width: "50%", height: "60%", background: "radial-gradient(ellipse, rgba(122,171,143,0.03) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <main id="content">
          <AiHero />
          <AiMarket />
          <AiProblem />
          <AiNamed />
          <AiGet />
          <AiSpeed />
          <AiAgent />
          <AiFit />
          <AiQuestions />
          <AiWho />
          <AiForm />
        </main>
        <Footer />
      </div>
      <MobileCTA />
    </div>
  );
}
