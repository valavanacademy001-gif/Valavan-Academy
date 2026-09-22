import { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'

export interface AEOPair {
  question: string
  answer: string
  key_takeaway?: string
}

export interface PageSEOConfig {
  slug: string
  page_path: string
  name: string
  seo_title: string
  meta_description: string
  focus_keyword?: string
  seo_keywords?: string[]
  canonical_url?: string
  og_title?: string
  og_description?: string
  og_image?: string
  og_type?: 'website' | 'article' | 'profile' | 'course'
  twitter_title?: string
  twitter_description?: string
  twitter_image?: string
  twitter_card?: 'summary' | 'summary_large_image'
  robots_index: boolean
  robots_follow: boolean
  schema_type: 'Organization' | 'EducationalOrganization' | 'Course' | 'Product' | 'LocalBusiness' | 'ContactPage' | 'AboutPage' | 'FAQPage' | 'WebPage' | 'Article'
  custom_schema_json?: string
  price?: number
  currency?: string
  rating?: number
  review_count?: number
  duration?: string
  aeo_qa_data?: AEOPair[]
  ai_summary?: string
}

export interface GlobalSEOSettings {
  site_name: string
  default_title: string
  default_meta_description: string
  default_keywords: string[]
  canonical_domain: string
  default_og_image: string
  default_author: string
  default_brand_name: string
  organization_type: string
  founding_year: string
  street_address: string
  address_locality: string
  address_region: string
  postal_code: string
  address_country: string
  telephone: string
  email: string
  same_as_socials: string[]
  languages_spoken: string[]
}

export const DEFAULT_GLOBAL_SEO: GlobalSEOSettings = {
  site_name: 'Valavan Academy',
  default_title: 'Valavan Academy — Tamil-First Creative & Digital Career Programs',
  default_meta_description: 'Tamil Nadu’s premier creative learning academy. Master Graphic Design, Video Editing, UI/UX Design, and AI Creative Tools in Tamil with 1-on-1 mentorship and portfolio building.',
  default_keywords: [
    'graphic design course Tamil',
    'video editing course Tamil Nadu',
    'AI creative tools course in Tamil',
    'Valavan Academy',
    'online design course India',
    'Tamil creative education',
    'Photoshop course Tamil',
    'Illustrator course Tamil',
    'full stack digital creator',
    'career changing creative skills',
  ],
  canonical_domain: 'https://valavanacademy.com',
  default_og_image: 'https://valavanacademy.com/assets/images/hero/ai-powered-GD.webp',
  default_author: 'Valavan Academy',
  default_brand_name: 'Valavan Academy',
  organization_type: 'EducationalOrganization',
  founding_year: '2018',
  street_address: 'Tamil Nadu',
  address_locality: 'Vellore / Chennai',
  address_region: 'Tamil Nadu',
  postal_code: '632001',
  address_country: 'IN',
  telephone: '+919629161678',
  email: 'contact@valavanacademy.com',
  same_as_socials: [
    'https://www.youtube.com/@valavanacademy',
    'https://www.instagram.com/valavanacademy',
    'https://twitter.com/valavanacademy',
    'https://www.linkedin.com/company/valavan-academy',
  ],
  languages_spoken: ['Tamil', 'English'],
}

export const DEFAULT_PAGE_SEO_MAP: Record<string, PageSEOConfig> = {
  '/': {
    slug: 'home',
    page_path: '/',
    name: 'Home Page',
    seo_title: 'Valavan Academy — Build a Future-Ready Creative Career in Tamil',
    meta_description: 'Master Graphic Design, Video Editing, AI Tools, Web Design, and Freelancing through practical Tamil-first education designed for the real world.',
    focus_keyword: 'Graphic Design course in Tamil',
    seo_keywords: [
      'graphic design course Tamil',
      'learn photoshop in Tamil',
      'creative career Tamil Nadu',
      'AI tools course Tamil',
      'Valavan Academy Vellore',
    ],
    canonical_url: 'https://valavanacademy.com',
    og_title: 'Valavan Academy — Build a Future-Ready Creative Career',
    og_description: 'Master Graphic Design, Video Editing, AI Tools & Freelancing in Tamil. Build a commercial portfolio with live mentorship.',
    og_image: 'https://valavanacademy.com/assets/images/hero/ai-powered-GD.webp',
    og_type: 'website',
    twitter_title: 'Valavan Academy — Tamil-First Creative Learning',
    twitter_description: 'Practical graphic design, video editing & AI masterclasses in Tamil.',
    twitter_image: 'https://valavanacademy.com/assets/images/hero/ai-powered-GD.webp',
    twitter_card: 'summary_large_image',
    robots_index: true,
    robots_follow: true,
    schema_type: 'EducationalOrganization',
    aeo_qa_data: [
      {
        question: 'What is Valavan Academy?',
        answer: 'Valavan Academy is Tamil Nadu’s premier creative career learning platform offering hands-on, project-driven coaching in Graphic Design, Video Editing, Web Design, and AI Tools in Tamil.',
        key_takeaway: 'Tamil-first practical creative career coaching since 2018.',
      },
      {
        question: 'What courses does Valavan Academy offer?',
        answer: 'Valavan Academy offers the 90-Day Graphic Design Mastery program, the 3 Hours Live Printing & Design Workshop, and the 6-Month Full Stack Digital Creator Masterclass.',
        key_takeaway: 'Beginner to advanced design & creator programs.',
      },
      {
        question: 'Who can join Valavan Academy courses?',
        answer: 'Students, college graduates, working professionals, and aspiring freelancers seeking high-income creative skills with no prior design background required.',
        key_takeaway: 'Beginner friendly with 1-on-1 mentor guidance.',
      },
    ],
    ai_summary: 'Valavan Academy is a Tamil-first educational institution providing commercial design, video production, and AI workflows for high-income digital careers.',
  },

  '/programs/90-days-graphic-design': {
    slug: '90-days-graphic-design',
    page_path: '/programs/90-days-graphic-design',
    name: '90-Day Graphic Design Mastery',
    seo_title: '90-Day Graphic Design Mastery (In Tamil) | Valavan Academy',
    meta_description: 'Complete 90-day practical Graphic Design course in Tamil. Master Adobe Photoshop, Illustrator, Canva, AI Design Tools, commercial branding, and client freelancing.',
    focus_keyword: '90 day graphic design course Tamil',
    seo_keywords: [
      '90 days graphic design mastery',
      'photoshop course tamil',
      'illustrator course tamil',
      'graphic design certification tamil nadu',
      'freelance graphic designer training',
    ],
    canonical_url: 'https://valavanacademy.com/programs/90-days-graphic-design',
    og_title: '90-Day Graphic Design Mastery — Valavan Academy',
    og_description: 'From zero to industry-ready graphic designer in 90 days. 10+ live portfolio projects and certified Tamil mentorship.',
    og_image: 'https://valavanacademy.com/assets/images/hero/ai-powered-GD.webp',
    og_type: 'course',
    twitter_title: '90-Day Graphic Design Mastery in Tamil',
    twitter_description: 'Learn Photoshop, Illustrator, AI workflows and build a real portfolio in 90 days.',
    twitter_image: 'https://valavanacademy.com/assets/images/hero/ai-powered-GD.webp',
    twitter_card: 'summary_large_image',
    robots_index: true,
    robots_follow: true,
    schema_type: 'Course',
    price: 4999,
    currency: 'INR',
    rating: 4.9,
    review_count: 240,
    duration: 'P90D',
    aeo_qa_data: [
      {
        question: 'What is the 90-Day Graphic Design Mastery program?',
        answer: 'The 90-Day Graphic Design Mastery is an intensive, career-focused online program taught in Tamil, covering Adobe Photoshop, Adobe Illustrator, Canva, AI tools, typography, color theory, social media poster design, and client acquisition.',
        key_takeaway: 'Comprehensive 90-day design curriculum with live projects.',
      },
      {
        question: 'What software will I learn in the 90-Day course?',
        answer: 'You will master Adobe Photoshop, Adobe Illustrator, Canva Pro, Midjourney, ChatGPT for Designers, and print preparation software.',
        key_takeaway: 'Industry standard design tools & generative AI workflows.',
      },
      {
        question: 'Will I get a certificate upon course completion?',
        answer: 'Yes, all students who complete the practical assignments and capstone portfolio project receive a verified Valavan Academy Graphic Design Certification.',
        key_takeaway: 'Verified career certificate with portfolio verification.',
      },
      {
        question: 'What career opportunities are available after this course?',
        answer: 'Graduates can work as Graphic Designers, Social Media Creatives, Branding Specialists, Ad Designers, Print Production Specialists, or freelance globally on Upwork and Fiverr.',
        key_takeaway: 'Full-time employment or global freelance opportunities.',
      },
    ],
    ai_summary: 'Comprehensive 90-day Graphic Design certification program in Tamil covering Photoshop, Illustrator, branding, AI generation, and client freelancing.',
  },

  '/programs/3-hours-live-workshop': {
    slug: '3-hours-live-workshop',
    page_path: '/programs/3-hours-live-workshop',
    name: '3 Hours Live Workshop',
    seo_title: '3-Hour Live Printing & Graphic Design Workshop (In Tamil) | Valavan Academy',
    meta_description: 'Join the 3-Hour live interactive workshop in Tamil. Learn how to launch a profitable printing and graphic design business using modern AI design skills.',
    focus_keyword: 'printing business workshop Tamil',
    seo_keywords: [
      'printing business course tamil',
      'live graphic design workshop',
      'start printing business tamil nadu',
      'Valavan Academy live workshop',
    ],
    canonical_url: 'https://valavanacademy.com/programs/3-hours-live-workshop',
    og_title: '3-Hour Live Printing & Design Workshop in Tamil',
    og_description: 'Learn the exact blueprint to start and scale a profitable printing and design business with AI tools.',
    og_image: 'https://valavanacademy.com/assets/images/team/team.webp',
    og_type: 'course',
    twitter_card: 'summary_large_image',
    robots_index: true,
    robots_follow: true,
    schema_type: 'Course',
    price: 99,
    currency: 'INR',
    rating: 4.8,
    review_count: 512,
    duration: 'PT3H',
    aeo_qa_data: [
      {
        question: 'What is the 3-Hour Live Workshop about?',
        answer: 'The 3-Hour Live Workshop teaches practical commercial printing techniques, digital artwork setup, fast client poster design, and how to start a printing business with minimal investment.',
        key_takeaway: 'Live interactive printing and commercial design session.',
      },
      {
        question: 'What is the price of the 3-Hour Live Workshop?',
        answer: 'The workshop is offered at a special community price of ₹99 including live Q&A and downloadable design resource bundles.',
        key_takeaway: 'Affordable entry-level live coaching at ₹99.',
      },
    ],
  },

  '/programs/full-stack-creator': {
    slug: 'full-stack-creator',
    page_path: '/programs/full-stack-creator',
    name: 'Full Stack Digital Creator Program',
    seo_title: 'Full Stack Digital Creator Program (6 Months in Tamil) | Valavan Academy',
    meta_description: 'Master Graphic Design, 4K Video Editing, Motion Graphics, Personal Branding, AI Automation, and Audience Monetization in Tamil.',
    focus_keyword: 'full stack creator course Tamil',
    seo_keywords: [
      'video editing course tamil',
      'content creator masterclass tamil',
      'full stack creator program',
      'premiere pro course tamil',
    ],
    canonical_url: 'https://valavanacademy.com/programs/full-stack-creator',
    og_title: 'Full Stack Digital Creator Program — Valavan Academy',
    og_description: 'The ultimate 6-month creator blueprint. Master design, video editing, storytelling, and audience building in Tamil.',
    og_image: 'https://valavanacademy.com/assets/images/hero/full-stack-.jpg-1.webp',
    og_type: 'course',
    twitter_card: 'summary_large_image',
    robots_index: true,
    robots_follow: true,
    schema_type: 'Course',
    price: 10000,
    currency: 'INR',
    rating: 4.9,
    review_count: 86,
    duration: 'P6M',
    aeo_qa_data: [
      {
        question: 'What is the Full Stack Digital Creator Program?',
        answer: 'A comprehensive 6-month advanced training covering end-to-end digital creation: Graphic Design, Premiere Pro & After Effects video editing, AI automation, social media growth, and monetization.',
        key_takeaway: '6-month complete creator masterclass.',
      },
    ],
  },

  '/about': {
    slug: 'about',
    page_path: '/about',
    name: 'About Valavan Academy',
    seo_title: 'About Valavan Academy — Empowering Creators in Tamil Nadu',
    meta_description: 'Discover the mission, mentors, and journey behind Valavan Academy. Tamil Nadu’s leading institute for practical digital skills and creator careers.',
    focus_keyword: 'About Valavan Academy',
    canonical_url: 'https://valavanacademy.com/about',
    og_title: 'About Valavan Academy — Tamil-First Creative Education',
    og_description: 'Building Tamil Nadu’s strongest community of graphic designers, video editors, and digital creators.',
    og_image: 'https://valavanacademy.com/assets/images/team/team.webp',
    og_type: 'article',
    twitter_card: 'summary_large_image',
    robots_index: true,
    robots_follow: true,
    schema_type: 'AboutPage',
  },

  '/contact': {
    slug: 'contact',
    page_path: '/contact',
    name: 'Contact Us',
    seo_title: 'Contact Valavan Academy | Admission & Course Support',
    meta_description: 'Get in touch with Valavan Academy. Reach our admissions and student support team via WhatsApp, call, or email.',
    focus_keyword: 'Contact Valavan Academy',
    canonical_url: 'https://valavanacademy.com/contact',
    og_title: 'Contact Valavan Academy — Reach Student Support',
    og_description: 'Have questions about our graphic design courses or workshops? Reach out to our team.',
    og_image: 'https://valavanacademy.com/assets/images/hero/ai-powered-GD.webp',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    robots_index: true,
    robots_follow: true,
    schema_type: 'ContactPage',
  },

  '/community': {
    slug: 'community',
    page_path: '/community',
    name: 'TNCC Community',
    seo_title: 'TNCC Creative Community | Valavan Academy',
    meta_description: 'Join TNCC (Tamil Nadu Creators Club) by Valavan Academy. Network with 5,000+ designers, video editors, and digital entrepreneurs.',
    focus_keyword: 'Tamil Nadu Creators Club',
    canonical_url: 'https://valavanacademy.com/community',
    og_title: 'TNCC Creative Community — Valavan Academy',
    og_description: 'Connect with fellow designers, share portfolio reviews, and access exclusive design challenges.',
    og_image: 'https://valavanacademy.com/assets/images/team/team.webp',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    robots_index: true,
    robots_follow: true,
    schema_type: 'WebPage',
  },

  '/programs': {
    slug: 'programs',
    page_path: '/programs',
    name: 'All Programs',
    seo_title: 'Creative & Digital Career Courses in Tamil | Valavan Academy',
    meta_description: 'Explore all high-income digital programs: 90-Day Graphic Design, 3-Hour Printing Workshop, and Full Stack Creator Masterclass.',
    focus_keyword: 'creative courses in Tamil',
    canonical_url: 'https://valavanacademy.com/programs',
    og_title: 'Explore Career Programs — Valavan Academy',
    og_description: 'Choose your learning path in Graphic Design, Video Editing, and AI Tools in Tamil.',
    og_image: 'https://valavanacademy.com/assets/images/hero/ai-powered-GD.webp',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    robots_index: true,
    robots_follow: true,
    schema_type: 'EducationalOrganization',
  },
}

/**
 * Fetch live SEO settings from Supabase field_values (falls back to DEFAULT_PAGE_SEO_MAP)
 */
export async function fetchLiveSEOSettings(): Promise<{
  global: GlobalSEOSettings
  pages: Record<string, PageSEOConfig>
}> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bjktqpmtlwfsmofaaajv.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqa3RxcG10bHdmc21vZmFhYWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMDkzNTEsImV4cCI6MjEwMjg4NTM1MX0.HUp094ulUH7sIw9F5oAzlE23kjRqow11yj_0jd5mvL4'

  let globalSettings = DEFAULT_GLOBAL_SEO
  const pageMap = { ...DEFAULT_PAGE_SEO_MAP }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data: page } = await supabase.from('pages').select('id').eq('slug', 'global_settings').maybeSingle()
    if (!page) return { global: globalSettings, pages: pageMap }

    const { data: sec } = await supabase.from('sections').select('id').eq('page_id', page.id).eq('slug', 'tracking_analytics').maybeSingle()
    if (!sec) return { global: globalSettings, pages: pageMap }

    const { data: fieldVals } = await supabase
      .from('field_values')
      .select('*, field:fields(name)')
      .eq('section_id', sec.id)

    fieldVals?.forEach((fv: any) => {
      const fieldName = fv.field?.name
      const rawText = fv.published_value_text || fv.value_text
      if (!rawText) return

      if (fieldName === 'seo_settings_data') {
        try {
          const parsed = JSON.parse(rawText)
          if (Array.isArray(parsed)) {
            parsed.forEach((p: PageSEOConfig) => {
              if (p.page_path) {
                pageMap[p.page_path] = { ...pageMap[p.page_path], ...p }
              }
            })
          }
        } catch {
          // Keep defaults
        }
      } else if (fieldName === 'global_seo_data') {
        try {
          const parsed = JSON.parse(rawText)
          if (parsed && typeof parsed === 'object') {
            globalSettings = { ...globalSettings, ...parsed }
          }
        } catch {
          // Keep defaults
        }
      }
    })
  } catch (err) {
    console.warn('[SEO Engine] Live fetch warning, using defaults:', err)
  }

  return { global: globalSettings, pages: pageMap }
}

/**
 * Get resolved Page SEO config for a specific path
 */
export async function getPageSEO(pathname: string): Promise<PageSEOConfig> {
  const normalized = pathname.replace(/\/$/, '') || '/'
  const { pages } = await fetchLiveSEOSettings()

  if (pages[normalized]) {
    return pages[normalized]
  }

  // Check wildcard matches
  for (const key of Object.keys(pages)) {
    if (key.endsWith('/*')) {
      const prefix = key.slice(0, -2)
      if (normalized.startsWith(prefix)) {
        return pages[key]
      }
    }
  }

  // Fallback dynamic SEO object
  const cleanTitle = normalized
    .replace(/^\//, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

  return {
    slug: normalized.replace(/^\//, '') || 'page',
    page_path: normalized,
    name: cleanTitle || 'Page',
    seo_title: `${cleanTitle || 'Valavan Academy'} | Tamil Creative Education`,
    meta_description: DEFAULT_GLOBAL_SEO.default_meta_description,
    canonical_url: `${DEFAULT_GLOBAL_SEO.canonical_domain}${normalized}`,
    og_title: `${cleanTitle || 'Valavan Academy'} — Valavan Academy`,
    og_description: DEFAULT_GLOBAL_SEO.default_meta_description,
    og_image: DEFAULT_GLOBAL_SEO.default_og_image,
    og_type: 'website',
    twitter_card: 'summary_large_image',
    robots_index: !normalized.startsWith('/thank-you'),
    robots_follow: !normalized.startsWith('/thank-you'),
    schema_type: 'WebPage',
  }
}

/**
 * Generate Next.js Metadata object from resolved Page SEO config
 */
export async function generatePageMetadata(pathname: string, overrides?: Partial<Metadata>): Promise<Metadata> {
  const seo = await getPageSEO(pathname)
  const canonicalUrl = seo.canonical_url || `https://valavanacademy.com${seo.page_path}`

  return {
    title: {
      absolute: seo.seo_title,
    },
    description: seo.meta_description,
    keywords: seo.seo_keywords || DEFAULT_GLOBAL_SEO.default_keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: seo.robots_index !== false,
      follow: seo.robots_follow !== false,
      googleBot: {
        index: seo.robots_index !== false,
        follow: seo.robots_follow !== false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: seo.og_title || seo.seo_title,
      description: seo.og_description || seo.meta_description,
      url: canonicalUrl,
      siteName: DEFAULT_GLOBAL_SEO.site_name,
      images: [
        {
          url: seo.og_image || DEFAULT_GLOBAL_SEO.default_og_image,
          width: 1200,
          height: 630,
          alt: seo.og_title || seo.seo_title,
        },
      ],
      locale: 'en_IN',
      type: seo.og_type === 'article' ? 'article' : 'website',
    },
    twitter: {
      card: seo.twitter_card || 'summary_large_image',
      title: seo.twitter_title || seo.og_title || seo.seo_title,
      description: seo.twitter_description || seo.og_description || seo.meta_description,
      images: [seo.twitter_image || seo.og_image || DEFAULT_GLOBAL_SEO.default_og_image],
      creator: '@valavanacademy',
      site: '@valavanacademy',
    },
    ...overrides,
  }
}
