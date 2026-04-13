import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDir = path.join(process.cwd(), "content/posts");

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  readingTime: string;
};

export function getAllPosts(lang: "en" | "ru"): Post[] {
  const slugs = fs.readdirSync(postsDir);
  return slugs
    .filter((slug) => {
      const filePath = path.join(postsDir, slug, `${lang}.mdx`);
      return fs.existsSync(filePath);
    })
    .map((slug) => {
      const file = fs.readFileSync(
        path.join(postsDir, slug, `${lang}.mdx`),
        "utf-8"
      );
      const { data } = matter(file);
      const rt = readingTime(file);
      return {
        slug,
        title: data.title as string,
        excerpt: data.excerpt as string,
        date: data.date as string,
        tag: data.tag as string,
        readingTime: rt.text,
      };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export async function getPostBySlug(slug: string, lang: "en" | "ru") {
  const filePath = path.join(postsDir, slug, `${lang}.mdx`);
  const file = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(file);
  const rt = readingTime(file);
  return {
    content,
    frontmatter: {
      title: data.title as string,
      excerpt: data.excerpt as string,
      date: data.date as string,
      tag: data.tag as string,
      readingTime: rt.text,
    },
  };
}
