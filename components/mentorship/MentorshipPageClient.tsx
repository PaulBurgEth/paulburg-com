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
        <main className="min-h-screen" style={{ background: "var(--c-bg)" }}>
            <Navbar />
            <MentorshipHero />
            <MentorshipBridge />
            <MentorshipPainPoints />
            <MentorshipTestimonial />
            <MentorshipServices />
            <MentorshipFormats />
            <MentorshipCTA />
            <Footer />
        </main>
    );
}
