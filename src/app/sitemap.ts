import { MetadataRoute } from 'next'

import { Locale } from '@/constants/locale'
import { SITE_URL } from '@/constants/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/download', changeFrequency: 'monthly' as const, priority: 0.9 },
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  for (const route of routes) {
    const url = `${SITE_URL}${route.path || '/'}`

    sitemapEntries.push({
      url,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          Locale.supported.map((loc) => [
            loc === 'pt' ? 'pt-BR' : 'en-US',
            url,
          ]),
        ),
      },
    })
  }

  return sitemapEntries
}
