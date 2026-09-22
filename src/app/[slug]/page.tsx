import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import DynamicSectionRenderer from '@/components/dynamic/DynamicSectionRenderer'
import { generatePageMetadata, getPageSEO } from '@/lib/seo'
import JsonLdSchema from '@/components/seo/JsonLdSchema'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return generatePageMetadata(`/${slug}`)
}

export default async function DynamicCMSPage({ params }: Props) {
  const { slug } = await params

  try {
    const seo = await getPageSEO(`/${slug}`)

    // 1. Fetch published page
    const { data: page, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()

    if (error || !page) {
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
        <JsonLdSchema pageSEO={seo} />
        {(sections || []).map((section) => (
          <DynamicSectionRenderer
            key={section.id}
            section={section}
            fields={fieldsBySection[section.id] || {}}
          />
        ))}
      </main>
    )
  } catch (e) {
    console.error('Error fetching CMS page:', e)
    notFound()
  }
}
