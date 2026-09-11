import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPostBySlug } from "@/lib/posts";
import { childText, headingId } from "@/lib/text";
import ArticlePageClient from "@/components/blog/ArticlePageClient";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

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
    return pageMetadata({
      title: `${frontmatter.title} | Paul Burg`,
      description: frontmatter.excerpt,
      path: `/blog/${slug}`,
      lang,
    });
  } catch {
    return { title: "Blog | Paul Burg" };
  }
}

function extractToc(content: string): { id: string; text: string; level: 2 | 3 }[] {
  const seen = new Set<string>();
  const toc: { id: string; text: string; level: 2 | 3 }[] = [];
  for (const line of content.split("\n")) {
    const m = line.match(/^(##|###)\s+(.+)/);
    if (!m) continue;
    const text = m[2].trim();
    toc.push({ id: headingId(text, seen), text, level: m[1] === "##" ? 2 : 3 });
  }
  return toc;
}

/**
 * The heading ids have to match the ones extractToc produced, in the same
 * order — so this walks the same counter. Deriving them independently is what
 * let the two drift apart.
 */
function makeHeadings(toc: { id: string; text: string; level: 2 | 3 }[]) {
  const queue = { 2: toc.filter((t) => t.level === 2), 3: toc.filter((t) => t.level === 3) };
  const used = { 2: 0, 3: 0 };
  const make = (level: 2 | 3) =>
    function Heading({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
      // Match by position, falling back to deriving from the rendered children
      // when the two lists disagree — which is better than the old `id=""`.
      const entry = queue[level][used[level]++];
      const id = entry?.id ?? headingId(childText(children));
      return level === 2
        ? <h2 id={id} {...props}>{children}</h2>
        : <h3 id={id} {...props}>{children}</h3>;
    };
  return { h2: make(2), h3: make(3) };
}

// Split off the trailing Sources/Footnotes/References/Источники section so it
// can be rendered in its own styled block.
// Note: no \b after the keyword — \b is ASCII-only in JS regex and fails after
// Cyrillic "источники". Headings are normalized to exactly these words.
const SOURCES_HEADING =
  /^#{1,3}[ \t]+(?:sources|footnotes|references|источники)[ \t]*$/im;

function splitSources(content: string): { body: string; sources: string | null } {
  const m = content.match(SOURCES_HEADING);
  if (m?.index == null) return { body: content, sources: null };
  return {
    body: content.slice(0, m.index).trimEnd(),
    sources: content.slice(m.index),
  };
}

// Prepare the sources block for rendering: put each [N] reference on its own
// line (some articles inline the whole list in one paragraph) and make bare
// URLs clickable (no remark-gfm in the pipeline).
function formatSources(md: string): string {
  // Break before an inline " [N] " marker (space-prefixed) so each reference
  // starts a new paragraph. Refs already at line-start are unaffected.
  md = md.replace(/ (\[\d+\]) /g, "\n\n$1 ");
  // Linkify bare URLs not already inside markdown link syntax.
  md = md.replace(/(?<![([\]])\bhttps?:\/\/[^\s<>)\]]+/g, (url) => `[${url}](${url})`);
  return md;
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

  // Only the loading and compiling sits in the try. The JSX used to be inside
  // it too, which React's own lint rule flags: components are not rendered at
  // the moment they are constructed, so a render-time throw inside
  // ArticlePageClient would escape this catch anyway — the guard was narrower
  // than it looked. The bare catch was also swallowing real failures: a syntax
  // error in an .mdx body or a malformed frontmatter field surfaced as a silent
  // 404 with the cause discarded, which is the worst possible way to find out.
  let article: Awaited<ReturnType<typeof loadArticle>>;
  try {
    article = await loadArticle(slug, lang);
  } catch (err) {
    // A missing file is a 404. Anything else is a bug, and it should say so.
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") notFound();
    throw err;
  }

  return (
    <ArticlePageClient
      slug={slug}
      lang={lang}
      frontmatter={article.frontmatter}
      toc={article.toc}
      sources={article.sourcesContent}
    >
      {article.mdxContent}
    </ArticlePageClient>
  );
}

async function loadArticle(slug: string, lang: "en" | "ru") {
  const { content, frontmatter } = await getPostBySlug(slug, lang);
  const { body, sources } = splitSources(content);
  const toc = extractToc(body);
  const { content: mdxContent } = await compileMDX({
    source: body,
    options: { parseFrontmatter: false },
    components: makeHeadings(toc),
  });

  let sourcesContent = null;
  if (sources) {
    const compiled = await compileMDX({
      source: formatSources(sources),
      options: { parseFrontmatter: false },
      components: makeHeadings([]),
    });
    sourcesContent = compiled.content;
  }

  return { frontmatter, toc, mdxContent, sourcesContent };
}
