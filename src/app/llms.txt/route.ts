import { NextResponse } from 'next/server'
import { fetchLiveSEOSettings } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { global, pages } = await fetchLiveSEOSettings()
  const domain = global.canonical_domain || 'https://valavanacademy.com'

  const content = `# ${global.site_name} (llms.txt)
> ${global.default_meta_description}

## Core Information
- **Institution Name**: ${global.site_name}
- **Website**: ${domain}
- **Founded**: ${global.founding_year || '2018'}
- **Location**: ${global.address_locality}, ${global.address_region}, India
- **Primary Language**: Tamil (Tamil-First Creative Career Education)
- **Support Email**: ${global.email}
- **Support WhatsApp / Phone**: ${global.telephone}

## Overview & Mission
Valavan Academy is Tamil Nadu's leading practical creative skills platform. It provides project-driven courses in Graphic Design, Video Editing, Web Design, and Generative AI workflows, helping students and working professionals transition into high-income creative careers and global freelancing.

## Featured Programs & Courses
1. **90-Day Graphic Design Mastery**
   - URL: ${domain}/programs/90-days-graphic-design
   - Medium: Tamil
   - Duration: 90 Days (Live + Recorded + Mentorship)
   - Skills Covered: Adobe Photoshop, Adobe Illustrator, Canva, AI Tools (Midjourney, ChatGPT), Typography, Branding, Client Freelancing
   - Credentials: Verified Valavan Academy Certificate & 10+ Portfolio Projects

2. **3-Hour Live Printing & Design Workshop**
   - URL: ${domain}/programs/3-hours-live-workshop
   - Medium: Tamil
   - Focus: Commercial printing artwork setup, banner design, and starting a printing business with low investment

3. **Full Stack Digital Creator Program**
   - URL: ${domain}/programs/full-stack-creator
   - Medium: Tamil
   - Duration: 6 Months
   - Focus: Graphic design, 4K video editing (Premiere Pro & After Effects), personal branding, and digital monetization

## Key Differentiators
- **Tamil-First Mentorship**: Complex design and AI concepts explained simply in Tamil.
- **Hands-On Portfolio Building**: Students build real client-ready portfolio pieces.
- **TNCC Community**: Access to a network of 5,000+ Tamil creators.

## Important Links
- [All Programs](${domain}/programs)
- [About Valavan Academy](${domain}/about)
- [Contact & Support](${domain}/contact)
- [TNCC Community](${domain}/community)
- [Sitemap XML](${domain}/sitemap.xml)
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
