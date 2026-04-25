import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPostBySlug } from "@/lib/posts";
import ArticlePageClient from "@/components/blog/ArticlePageClient";
import type { Metadata } from "next";

export function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content/posts");
  const slugs = fs.readdirSync(postsDir).filter((s) =>
    fs.existsSync(path.join(postsDir, s, "en.mdx"))
  );
  return slugs.map((slug) => ({ slug }));
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

function extractToc(content: string): { id: string; text: string; level: 2 | 3 }[] {
  const lines = content.split("\n");
  const toc: { id: string; text: string; level: 2 | 3 }[] = [];
  for (const line of lines) {
    const m2 = line.match(/^##\s+(.+)/);
    const m3 = line.match(/^###\s+(.+)/);
    if (m2) {
      const text = m2[1].trim();
      toc.push({ id: text.toLowerCase().replace(/[^a-z0-9а-яёa-z]+/gi, "-").replace(/^-|-$/g, ""), text, level: 2 });
    } else if (m3) {
      const text = m3[1].trim();
      toc.push({ id: text.toLowerCase().replace(/[^a-z0-9а-яёa-z]+/gi, "-").replace(/^-|-$/g, ""), text, level: 3 });
    }
  }
  return toc;
}

function makeHeading(level: 2 | 3) {
  // eslint-disable-next-line react/display-name
  return function Heading({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    const text = typeof children === "string" ? children : "";
    const id = text.toLowerCase().replace(/[^a-z0-9а-яёa-z]+/gi, "-").replace(/^-|-$/g, "");
    return level === 2
      ? <h2 id={id} {...props}>{children}</h2>
      : <h3 id={id} {...props}>{children}</h3>;
  };
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
    const toc = extractToc(content);
    const { content: mdxContent } = await compileMDX({
      source: content,
      options: { parseFrontmatter: false },
      components: { h2: makeHeading(2), h3: makeHeading(3) },
    });

    return (
      <ArticlePageClient slug={slug} lang={lang} frontmatter={frontmatter} toc={toc}>
        {mdxContent}
      </ArticlePageClient>
    );
  } catch {
    notFound();
  }
}
