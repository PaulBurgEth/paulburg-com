import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import MentorshipPageClient from "@/components/mentorship/MentorshipPageClient";

const MENTORSHIP_DESCRIPTION =
  "Individual mentorship in business strategy, capital management, and working with AI effectively. $50/hour.";

export const metadata: Metadata = pageMetadata({
  title: "Mentorship for Business, Capital, and AI — Paul Burg",
  description: MENTORSHIP_DESCRIPTION,
  path: "/mentorship",
});

export default function Page() {
  return <MentorshipPageClient />;
}
