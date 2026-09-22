import { MetadataRoute } from 'next'
import { fetchLiveSEOSettings, DEFAULT_GLOBAL_SEO } from '@/lib/seo'
import { getPublishedPrograms } from '@/lib/cms'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate hourly

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { global, pages } = await fetchLiveSEOSettings()
  const domain = global.canonical_domain || DEFAULT_GLOBAL_SEO.canonical_domain

  const sitemapEntries: MetadataRoute.Sitemap = []
  const currentDate = new Date()

  // 1. Static Core Pages
  const staticRoutes = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/programs', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/community', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
  ]

  staticRoutes.forEach((route) => {
    const pageConfig = pages[route.path]
    if (pageConfig && pageConfig.robots_index === false) return

    sitemapEntries.push({
      url: `${domain}${route.path === '/' ? '' : route.path}`,
      lastModified: currentDate,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })
  })

  // 2. Active Program / Course Pages
  const staticPrograms = [
    '/programs/90-days-graphic-design',
    '/programs/3-hours-live-workshop',
    '/programs/full-stack-creator',
  ]

  staticPrograms.forEach((pPath) => {
    const pageConfig = pages[pPath]
    if (pageConfig && pageConfig.robots_index === false) return

    sitemapEntries.push({
      url: `${domain}${pPath}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    })
  })

  // 3. Dynamic CMS Programs (if created by Admin)
  try {
    const publishedPrograms = await getPublishedPrograms()
    publishedPrograms.forEach((prog) => {
      const pPath = `/programs/${prog.slug}`
      const alreadyExists = sitemapEntries.some((e) => e.url === `${domain}${pPath}`)
      if (!alreadyExists && prog.is_visible !== false) {
        sitemapEntries.push({
          url: `${domain}${pPath}`,
          lastModified: currentDate,
          changeFrequency: 'weekly',
          priority: 0.9,
        })
      }
    })
  } catch (err) {
    console.warn('[Sitemap] Dynamic programs notice:', err)
  }

  // 4. Any other indexed pages defined in CMS Page SEO Manager
  Object.values(pages).forEach((page) => {
    if (!page.page_path || page.robots_index === false || page.page_path.startsWith('/thank-you')) {
      return
    }
    const fullUrl = `${domain}${page.page_path === '/' ? '' : page.page_path}`
    const alreadyExists = sitemapEntries.some((e) => e.url === fullUrl)
    if (!alreadyExists) {
      sitemapEntries.push({
        url: fullUrl,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  })

  return sitemapEntries
}
