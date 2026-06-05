import { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Paul Burg — AI Systems for Business",
  description:
    "Custom AI chatbots, CRMs, BI and manager dashboards, matching engines, and process automation, built from scratch around your process. Ready in days.",
};

export default function Page() {
  const enPosts = getAllPosts("en").slice(0, 3);
  const ruPosts = getAllPosts("ru").slice(0, 3);
  return <HomePageClient latestPosts={{ en: enPosts, ru: ruPosts }} />;
}
