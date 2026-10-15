import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import HomePageClient from "@/components/home/HomePageClient";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = pageMetadata({
  title: "Paul Burg — AI Systems, AI Answers & B2B Outbound",
  description:
    "AI systems built around your process, your company visible to ChatGPT with an AI sales manager on your site, and cold outbound for B2B clients.",
  path: "",
});

export default function Page() {
  const enPosts = getAllPosts("en").slice(0, 3);
  const ruPosts = getAllPosts("ru").slice(0, 3);
  return <HomePageClient latestPosts={{ en: enPosts, ru: ruPosts }} />;
}
