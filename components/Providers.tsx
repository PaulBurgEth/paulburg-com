"use client";

import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/context/LanguageContext";
import { IntakeModalProvider } from "@/context/IntakeModalContext";
import { MentorshipModalProvider } from "@/context/MentorshipModalContext";
import IntakeModal from "@/components/IntakeModal";
import MentorshipIntakeModal from "@/components/MentorshipIntakeModal";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        /* reducedMotion="user" makes every framer-motion animation on the site
           honour prefers-reduced-motion. The @media block in globals.css only
           reaches .pb-reveal and .pb-cursor-blink; the 30 whileInView fade-ups
           are inline transforms written by JS and were ignoring the setting
           entirely — 28 of the 30, the two exceptions being the sections that
           call useReducedMotion by hand. Transforms are dropped, opacity is
           kept, so nothing disappears. */
        <MotionConfig reducedMotion="user">
        <LanguageProvider>
            <IntakeModalProvider>
                <MentorshipModalProvider>
                    {children}
                    <IntakeModal />
                    <MentorshipIntakeModal />
                </MentorshipModalProvider>
            </IntakeModalProvider>
        </LanguageProvider>
        </MotionConfig>
    );
}
