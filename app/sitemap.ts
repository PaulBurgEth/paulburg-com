import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

const BASE = 'https://paulburg.com'

/**
 * Both languages, with real dates.
 *
 * Two things were wrong. Every entry claimed `lastModified: new Date()`, so all
 * eighteen URLs announced that they had changed today, on every build — which
 * devalues the signal entirely. And there was not one Russian URL, although all
 * thirteen articles are fully translated: the declared Russian half of the site
 * was absent from the sitemap and therefore from search.
 *
 * The dates now come from the posts themselves through getAllPosts, which
 * already reads the frontmatter — the sitemap used to re-read the directory by
 * hand alongside it.
 */
function ru(url: string): string {
  return `${url}${url.includes('?') ? '&' : '?'}lang=ru`
}

function pair(url: string) {
  return { languages: { en: url, ru: ru(url) } }
}

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts('en')

    // The static pages have no natural date. The newest post is the best
    // available proxy for "the site changed", and it stops the whole sitemap
    // resetting to today on every deploy.
    const newest = posts[0]?.date ? new Date(posts[0].date) : new Date()

    const staticRoutes: { url: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
        { url: BASE, changeFrequency: 'weekly', priority: 1 },
        { url: `${BASE}/services`, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${BASE}/outbound`, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${BASE}/mentorship`, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    ]

    const entries: MetadataRoute.Sitemap = []

    for (const r of staticRoutes) {
        entries.push({ url: r.url, lastModified: newest, changeFrequency: r.changeFrequency, priority: r.priority, alternates: pair(r.url) })
        entries.push({ url: ru(r.url), lastModified: newest, changeFrequency: r.changeFrequency, priority: r.priority, alternates: pair(r.url) })
    }

    for (const post of posts) {
        const url = `${BASE}/blog/${post.slug}`
        const lastModified = post.date ? new Date(post.date) : newest
        entries.push({ url, lastModified, changeFrequency: 'monthly', priority: 0.7, alternates: pair(url) })
        entries.push({ url: ru(url), lastModified, changeFrequency: 'monthly', priority: 0.7, alternates: pair(url) })
    }

    return entries
}
