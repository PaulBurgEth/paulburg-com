import { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";

export const metadata: Metadata = {
  title: "Paul Burg — AI Systems for Business",
  description:
    "Custom chatbots, CRMs, process automation, and websites — built from scratch around your process. Not a template. Not a no-code tool. Ready in days.",
};

export default function Page() {
  return <HomePageClient />;
}
