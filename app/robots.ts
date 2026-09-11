import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            // The intake endpoint is not content. It accepts POST and was both
            // crawlable and, until the Origin check, ungated.
            disallow: '/api/',
        },
        sitemap: 'https://paulburg.com/sitemap.xml',
    }
}
