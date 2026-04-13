"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { IntakeModalProvider } from "@/context/IntakeModalContext";
import { MentorshipModalProvider } from "@/context/MentorshipModalContext";
import IntakeModal from "@/components/IntakeModal";
import MentorshipIntakeModal from "@/components/MentorshipIntakeModal";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <IntakeModalProvider>
                <MentorshipModalProvider>
                    {children}
                    <IntakeModal />
                    <MentorshipIntakeModal />
                </MentorshipModalProvider>
            </IntakeModalProvider>
        </LanguageProvider>
    );
}
