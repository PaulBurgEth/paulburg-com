import { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Paul Burg — AI Systems for Business",
  description:
    "Custom chatbots, CRMs, BI dashboards, manager dashboards, matching engines, process automation, and websites — built from scratch around your process. Not a template. Not a no-code tool. Ready in days.",
};

export default function Page() {
  const enPosts = getAllPosts("en").slice(0, 3);
  const ruPosts = getAllPosts("ru").slice(0, 3);
  return <HomePageClient latestPosts={{ en: enPosts, ru: ruPosts }} />;
}
