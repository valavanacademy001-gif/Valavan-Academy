import { MetadataRoute } from 'next'
import { fetchLiveSEOSettings, DEFAULT_GLOBAL_SEO } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { global } = await fetchLiveSEOSettings()
  const domain = global.canonical_domain || DEFAULT_GLOBAL_SEO.canonical_domain

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/dashboard/',
          '/admin/',
          '/thank-you/*',
        ],
      },
      // Search Engines
      {
        userAgent: ['Googlebot', 'Bingbot', 'Applebot', 'DuckDuckBot'],
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/admin/'],
      },
      // AI & Answer Engine Crawlers (ChatGPT, Perplexity, Claude, Gemini, Google AI)
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'CCBot',
          'Bytespider',
          'cohere-ai',
          'FacebookBot',
        ],
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/admin/'],
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
    host: domain,
  }
}
