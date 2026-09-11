import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import BlogPageClient from "@/components/blog/BlogPageClient";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Paul Burg",
  // Was "Thoughts on AI-assisted development, B2B sales, and building systems
  // that run a business" — a description of a different blog. The thirteen
  // posts are about AI and inequality, the global precariat, how wealth
  // concentrates, the gender pay gap, Vietnam, and payment rails.
  description:
    "Essays on AI and inequality, wealth and work, Vietnam from the inside, and the engineering behind it.",
  path: "/blog",
});

export default function BlogPage() {
  const enPosts = getAllPosts("en");
  const ruPosts = getAllPosts("ru");
  return <BlogPageClient enPosts={enPosts} ruPosts={ruPosts} />;
}
