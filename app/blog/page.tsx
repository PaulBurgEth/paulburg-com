import type { Metadata } from "next";
import BlogPageClient from "@/components/blog/BlogPageClient";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Paul Burg",
  description:
    "Thoughts on AI-assisted development, business, and building systems.",
};

export default function BlogPage() {
  const enPosts = getAllPosts("en");
  const ruPosts = getAllPosts("ru");
  return <BlogPageClient enPosts={enPosts} ruPosts={ruPosts} />;
}
