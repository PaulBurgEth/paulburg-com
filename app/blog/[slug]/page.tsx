import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPostBySlug } from "@/lib/posts";
import ArticlePageClient from "@/components/blog/ArticlePageClient";
import type { Metadata } from "next";

const SLUGS = ["ai-productivity-tool", "vietnam-megacity", "founder-feeling"];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { lang: langParam } = await searchParams;
  const lang = langParam === "ru" ? "ru" : "en";
  try {
    const { frontmatter } = await getPostBySlug(slug, lang);
    return {
      title: `${frontmatter.title} | Paul Burg`,
      description: frontmatter.excerpt,
    };
  } catch {
    return { title: "Blog | Paul Burg" };
  }
}

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const { lang: langParam } = await searchParams;
  const lang = langParam === "ru" ? "ru" : "en";

  try {
    const { content, frontmatter } = await getPostBySlug(slug, lang);
    const { content: mdxContent } = await compileMDX({
      source: content,
      options: { parseFrontmatter: false },
    });

    return (
      <ArticlePageClient slug={slug} lang={lang} frontmatter={frontmatter}>
        {mdxContent}
      </ArticlePageClient>
    );
  } catch {
    notFound();
  }
}
