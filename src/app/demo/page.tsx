import type { Metadata } from 'next'
import CourseDemoClient from '@/components/demo/CourseDemoClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Free Course Demo Classes | Valavan Academy',
  description: 'Watch free sample demo classes for the 90-Day Graphic Design Mastery program from Valavan Academy in Tamil.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function DemoPage() {
  return <CourseDemoClient />
}
