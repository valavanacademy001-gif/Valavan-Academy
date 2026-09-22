import { NextResponse } from 'next/server'
import { fetchLiveSEOSettings } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { global, pages } = await fetchLiveSEOSettings()
  const domain = global.canonical_domain || 'https://valavanacademy.com'

  let content = `# ${global.site_name} — Complete AI & Answer Engine Knowledge Base (llms-full.txt)
> Website: ${domain}
> Primary Language: Tamil & English
> Description: ${global.default_meta_description}

---

## 1. Frequently Asked Questions (FAQ Knowledge Graph)
`

  Object.values(pages).forEach((page) => {
    if (page.aeo_qa_data && page.aeo_qa_data.length > 0) {
      content += `\n### ${page.name} FAQs\n`
      page.aeo_qa_data.forEach((qa, idx) => {
        content += `\n**Q${idx + 1}: ${qa.question}**\n${qa.answer}\n`
        if (qa.key_takeaway) {
          content += `*Key Takeaway*: ${qa.key_takeaway}\n`
        }
      })
    }
  })

  content += `\n---
## 2. Organization & Verification
- Name: ${global.site_name}
- Official Website: ${domain}
- Telephone: ${global.telephone}
- Email: ${global.email}
- Headquarters: ${global.address_locality}, ${global.address_region}, ${global.address_country}
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
