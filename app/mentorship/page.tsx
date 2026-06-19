import { Metadata } from "next";
import MentorshipPageClient from "@/components/mentorship/MentorshipPageClient";

export const metadata: Metadata = {
  title: "Mentorship for Business, Capital, and AI — Paul Burg",
  description:
    "Individual mentorship in business strategy, capital management, and working with AI effectively. $50/hour. Free 15-min intro call.",
  alternates: {
    canonical: "https://paulburg.com/mentorship",
  },
  openGraph: {
    title: "Mentorship for Business, Capital, and AI — Paul Burg",
    description:
      "Individual mentorship in business strategy, capital management, and working with AI effectively. $50/hour. Free 15-min intro call.",
    url: "https://paulburg.com/mentorship",
    siteName: "Paul Burg",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Paul Burg Mentorship",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mentorship for Business, Capital, and AI — Paul Burg",
    description:
      "Individual mentorship in business strategy, capital management, and working with AI effectively. $50/hour. Free 15-min intro call.",
    images: ["/og-image.png"],
    creator: "@PaulBurg_",
  },
};

export default function Page() {
  return <MentorshipPageClient />;
}
