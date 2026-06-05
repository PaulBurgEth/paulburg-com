import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE = 'https://paulburg.com'

export default function sitemap(): MetadataRoute.Sitemap {
    const postsDir = path.join(process.cwd(), 'content/posts')
    const slugs = fs
        .readdirSync(postsDir)
        .filter((s) => fs.existsSync(path.join(postsDir, s, 'en.mdx')))

    const now = new Date()

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
        { url: `${BASE}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${BASE}/mentorship`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ]

    const postRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
        url: `${BASE}/blog/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    return [...staticRoutes, ...postRoutes]
}
