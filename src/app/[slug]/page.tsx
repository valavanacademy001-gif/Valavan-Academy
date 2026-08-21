import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import DynamicSectionRenderer from '@/components/dynamic/DynamicSectionRenderer'

export const revalidate = 0 // always fetch fresh published data

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: page } = await supabase
    .from('pages')
    .select('title, description, seo_title, seo_description, og_title, og_description, og_image_url')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!page) {
    return { title: 'Page Not Found — Valavan Academy' }
  }

  return {
    title: page.seo_title || `${page.title} — Valavan Academy`,
    description: page.seo_description || page.description || 'Valavan Academy — Tamil-first creative learning platform',
    openGraph: {
      title: page.og_title || page.seo_title || page.title,
      description: page.og_description || page.seo_description || page.description,
      images: page.og_image_url ? [page.og_image_url] : [],
    },
  }
}

export default async function DynamicCMSPage({ params }: Props) {
  const { slug } = await params

  // 1. Fetch published page
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!page) {
    notFound()
  }

  // 2. Fetch visible sections
  const { data: sections } = await supabase
    .from('sections')
    .select(`
      *,
      section_type:section_types(id, name, slug)
    `)
    .eq('page_id', page.id)
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })

  // 3. Fetch fields and published values for all sections
  const sectionIds = (sections || []).map((s) => s.id)
  
  let fieldsBySection: Record<string, Record<string, string | null>> = {}

  if (sectionIds.length > 0) {
    const { data: fields } = await supabase
      .from('fields')
      .select(`
        id, section_id, name, field_type,
        value:field_values(published_value_text, value_text, value_url, published_value_json, value_json)
      `)
      .in('section_id', sectionIds)

    if (fields) {
      for (const field of fields) {
        if (!fieldsBySection[field.section_id]) {
          fieldsBySection[field.section_id] = {}
        }
        const val = Array.isArray(field.value) ? field.value[0] : field.value
        const textVal = val?.published_value_text ?? val?.value_text ?? val?.value_url ?? ''
        fieldsBySection[field.section_id][field.name] = textVal
      }
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {(sections || []).map((section) => (
        <DynamicSectionRenderer
          key={section.id}
          section={section}
          fields={fieldsBySection[section.id] || {}}
        />
      ))}
    </main>
  )
}
