"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MentorshipHero from "@/components/mentorship/MentorshipHero";
import MentorshipBridge from "@/components/mentorship/MentorshipBridge";
import MentorshipPainPoints from "@/components/mentorship/MentorshipPainPoints";
import MentorshipTestimonial from "@/components/mentorship/MentorshipTestimonial";
import MentorshipServices from "@/components/mentorship/MentorshipServices";
import MentorshipFormats from "@/components/mentorship/MentorshipFormats";
import MentorshipCTA from "@/components/mentorship/MentorshipCTA";
import { useRevealObserver } from "@/lib/useStageReveal";

export default function MentorshipPageClient() {
    useRevealObserver();
    return (
        <>
            {/* Navbar and Footer sit outside <main> on purpose. They used to be inside
                it, which strips <footer> of its implicit contentinfo role per the
                HTML-AAM — so these pages had no banner, no navigation and no
                contentinfo landmark at all, just one main wrapped around the whole
                document. The home page was the only one built correctly. */}
            <Navbar />
            <main id="content" className="min-h-screen" style={{ background: "var(--c-bg)" }}>
            <MentorshipHero />
            <MentorshipBridge />
            <MentorshipPainPoints />
            <MentorshipTestimonial />
            <MentorshipServices />
            <MentorshipFormats />
            <MentorshipCTA />
            </main>
            <Footer />
        </>
    );
}
