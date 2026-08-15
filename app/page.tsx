import { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Paul Burg — AI Systems & B2B Outbound",
  description:
    "Custom AI systems built around your process — bots, CRMs, BI dashboards, automation — and a cold outbound channel that brings you B2B clients.",
  alternates: {
    canonical: "https://paulburg.com",
  },
};

export default function Page() {
  const enPosts = getAllPosts("en").slice(0, 3);
  const ruPosts = getAllPosts("ru").slice(0, 3);
  return <HomePageClient latestPosts={{ en: enPosts, ru: ruPosts }} />;
}
