import React from 'react'
import { PageSEOConfig, GlobalSEOSettings, DEFAULT_GLOBAL_SEO } from '@/lib/seo'

interface JsonLdSchemaProps {
  pageSEO: PageSEOConfig
  globalSEO?: GlobalSEOSettings
  customFaqs?: Array<{ question: string; answer: string }>
}

export default function JsonLdSchema({
  pageSEO,
  globalSEO = DEFAULT_GLOBAL_SEO,
  customFaqs,
}: JsonLdSchemaProps) {
  const schemas: any[] = []

  const domain = globalSEO.canonical_domain || 'https://valavanacademy.com'
  const pageUrl = pageSEO.canonical_url || `${domain}${pageSEO.page_path}`

  // 1. GLOBAL ORGANIZATION SCHEMA
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${domain}/#organization`,
    name: globalSEO.site_name,
    legalName: 'Valavan Academy Private Limited',
    url: domain,
    logo: {
      '@type': 'ImageObject',
      url: `${domain}/logo-icon.png`,
      caption: 'Valavan Academy Logo',
    },
    image: pageSEO.og_image || globalSEO.default_og_image,
    description: globalSEO.default_meta_description,
    foundingDate: globalSEO.founding_year,
    address: {
      '@type': 'PostalAddress',
      streetAddress: globalSEO.street_address,
      addressLocality: globalSEO.address_locality,
      addressRegion: globalSEO.address_region,
      postalCode: globalSEO.postal_code,
      addressCountry: globalSEO.address_country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: globalSEO.telephone,
      contactType: 'Admissions and Student Support',
      areaServed: 'IN',
      availableLanguage: ['Tamil', 'English'],
    },
    sameAs: globalSEO.same_as_socials,
    knowsLanguage: ['ta', 'en'],
  }
  schemas.push(organizationSchema)

  // 2. WEBSITE SCHEMA (For Google Sitelinks SearchBox & Brand Entity)
  if (pageSEO.page_path === '/') {
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${domain}/#website`,
      url: domain,
      name: globalSEO.site_name,
      description: globalSEO.default_meta_description,
      publisher: {
        '@id': `${domain}/#organization`,
      },
      inLanguage: 'ta-IN',
    }
    schemas.push(websiteSchema)
  }

  // 3. COURSE SCHEMA (For Programs / Courses)
  if (pageSEO.schema_type === 'Course' || pageSEO.page_path.startsWith('/programs/')) {
    const courseSchema: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      '@id': `${pageUrl}#course`,
      name: pageSEO.name || pageSEO.seo_title,
      description: pageSEO.meta_description,
      provider: {
        '@type': 'EducationalOrganization',
        name: globalSEO.site_name,
        sameAs: domain,
      },
      inLanguage: 'ta',
      isAccessibleForFree: false,
      educationalCredentialAwarded: 'Valavan Academy Certificate of Completion',
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        courseWorkload: pageSEO.duration || 'P90D',
        instructor: {
          '@type': 'Person',
          name: 'Valavan Academy Senior Mentors',
          jobTitle: 'Lead Creative Director & Educator',
        },
      },
    }

    if (pageSEO.price !== undefined && pageSEO.price > 0) {
      courseSchema.offers = {
        '@type': 'Offer',
        price: pageSEO.price,
        priceCurrency: pageSEO.currency || 'INR',
        availability: 'https://schema.org/InStock',
        url: pageUrl,
        validFrom: '2025-01-01',
      }
    }

    if (pageSEO.rating && pageSEO.review_count) {
      courseSchema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: pageSEO.rating,
        reviewCount: pageSEO.review_count,
        bestRating: '5',
        worstRating: '1',
      }
    }

    schemas.push(courseSchema)
  }

  // 4. BREADCRUMB SCHEMA
  const pathSegments = pageSEO.page_path.split('/').filter(Boolean)
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: domain,
    },
  ]

  let currentUrl = domain
  pathSegments.forEach((seg, idx) => {
    currentUrl += `/${seg}`
    const segName =
      idx === pathSegments.length - 1
        ? pageSEO.name || seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
        : seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

    breadcrumbItems.push({
      '@type': 'ListItem',
      position: idx + 2,
      name: segName,
      item: currentUrl,
    })
  })

  if (breadcrumbItems.length > 1) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    })
  }

  // 5. FAQ SCHEMA (From AEO Q&A or custom FAQs)
  const allFaqs = customFaqs || (pageSEO.aeo_qa_data && pageSEO.aeo_qa_data.length > 0 ? pageSEO.aeo_qa_data : [])
  if (allFaqs && allFaqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: allFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    })
  }

  // 6. LOCAL BUSINESS SCHEMA (Contact Page)
  if (pageSEO.page_path === '/contact' || pageSEO.schema_type === 'LocalBusiness') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: `${globalSEO.site_name} Headquarters`,
      image: globalSEO.default_og_image,
      telephone: globalSEO.telephone,
      email: globalSEO.email,
      url: `${domain}/contact`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: globalSEO.street_address,
        addressLocality: globalSEO.address_locality,
        addressRegion: globalSEO.address_region,
        postalCode: globalSEO.postal_code,
        addressCountry: globalSEO.address_country,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '20:00',
        },
      ],
      priceRange: '₹₹',
    })
  }

  // 7. CUSTOM SCHEMA JSON-LD OVERRIDE
  let parsedCustomSchema: any = null
  if (pageSEO.custom_schema_json) {
    try {
      parsedCustomSchema = JSON.parse(pageSEO.custom_schema_json)
    } catch {
      // Ignored if invalid
    }
  }

  return (
    <>
      {schemas.map((s, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      {parsedCustomSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(parsedCustomSchema) }}
        />
      )}
    </>
  )
}
