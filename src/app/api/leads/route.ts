import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

function parseBrowserFromUA(ua: string): string {
  if (!ua) return 'Chrome'
  if (ua.includes('Edg/')) return 'Edge'
  if (ua.includes('Chrome/') && !ua.includes('Edg/')) return 'Chrome'
  if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Safari'
  if (ua.includes('Firefox/')) return 'Firefox'
  if (ua.includes('Opera') || ua.includes('OPR/')) return 'Opera'
  return 'Chrome'
}

const DEFAULT_PROGRAM_CONVERSIONS: Record<string, { payment_url: string; name: string }> = {
  '3-hours-live-workshop': {
    name: '3 Hours Live Graphic Design Workshop',
    payment_url: 'https://rzp.io/rzp/e9OpaQTo',
  },
  '90-days-graphic-design': {
    name: '90-Day Graphic Design Mastery',
    payment_url: 'https://pages.razorpay.com/pl_SuHNtUTy7rhIe0/view',
  },
  'full-stack-creator': {
    name: 'Full Stack Digital Creator Masterclass',
    payment_url: 'https://rzp.io/rzp/v8ykjCk',
  },
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      name,
      age,
      phone,
      email,
      occupation,
      program_name,
      program_slug = '90-days-graphic-design',
      fallback_payment_url,
      page_url = '/',
      referrer = '',
      utm_source = 'direct',
      utm_medium = 'none',
      utm_campaign = 'direct',
      utm_term = '',
      utm_content = '',
      visitor_id,
      session_id,
      device = 'desktop',
    } = body

    const userAgent = req.headers.get('user-agent') || ''
    const country = req.headers.get('x-vercel-ip-country') || req.headers.get('cf-ipcountry') || 'IN'
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || ''

    let resolvedPaymentUrl = fallback_payment_url || DEFAULT_PROGRAM_CONVERSIONS[program_slug]?.payment_url || 'https://pages.razorpay.com/pl_SuHNtUTy7rhIe0/view'

    // 1. Fetch dynamic CMS program conversion settings if present
    try {
      const { data: page } = await supabase.from('pages').select('id').eq('slug', 'global_settings').maybeSingle()
      if (page) {
        const { data: sec } = await supabase.from('sections').select('id').eq('page_id', page.id).eq('slug', 'tracking_analytics').maybeSingle()
        if (sec) {
          const { data: fieldVals } = await supabase
            .from('field_values')
            .select('*, field:fields(name)')
            .eq('section_id', sec.id)

          const convField = fieldVals?.find((f: any) => f.field?.name === 'program_conversion_settings')

          if (convField) {
            const raw = convField.published_value_text || convField.value_text
            if (raw) {
              const programSettingsList = JSON.parse(raw)
              if (Array.isArray(programSettingsList)) {
                const matched = programSettingsList.find((p: any) => p.slug === program_slug || p.id === program_slug)
                if (matched && matched.payment_url) {
                  resolvedPaymentUrl = matched.payment_url
                }
              }
            }
          }
        }
      }
    } catch (err) {
      console.warn('Notice fetching dynamic program settings:', err)
    }

    const cleanProgramName = program_name || DEFAULT_PROGRAM_CONVERSIONS[program_slug]?.name || '90-Day Graphic Design Mastery'

    const leadRecord = {
      id: 'lead_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
      name: name || 'Lead Prospect',
      age: age ? Number(age) : null,
      phone: phone || '',
      email: email || '',
      occupation: occupation || 'Student',
      program_interested: cleanProgramName,
      program_slug: program_slug,
      source: 'Lead Capture Form',
      status: 'New Lead',
      sales_notes: '',
      assigned_to: 'Unassigned',
      utm_source: utm_source || 'direct',
      utm_medium: utm_medium || 'none',
      utm_campaign: utm_campaign || 'direct',
      utm_term: utm_term || '',
      utm_content: utm_content || '',
      landing_page: page_url,
      referrer: referrer || '',
      visitor_id: visitor_id || ('vid_anon_' + Date.now().toString(36)),
      session_id: session_id || ('sid_anon_' + Date.now().toString(36)),
      device: device || (/mobile/i.test(userAgent) ? 'mobile' : 'desktop'),
      browser: parseBrowserFromUA(userAgent),
      country: country,
      ip: ip,
      created_at: new Date().toISOString(),
    }

    console.log(`[Lead Form Captured] ${leadRecord.name} (${leadRecord.phone}) for ${leadRecord.program_interested}`)

    // 2. Persist Lead in Supabase field_values (leads_data) and Event in events_log_data
    try {
      const { data: page } = await supabase.from('pages').select('id').eq('slug', 'global_settings').maybeSingle()
      if (page) {
        const { data: sec } = await supabase.from('sections').select('id').eq('page_id', page.id).eq('slug', 'tracking_analytics').maybeSingle()
        if (sec) {
          // --- A. Save Lead ---
          let { data: leadField } = await supabase.from('fields').select('id').eq('section_id', sec.id).eq('name', 'leads_data').maybeSingle()
          if (!leadField) {
            const { data: newF } = await supabase.from('fields').insert({
              section_id: sec.id,
              name: 'leads_data',
              label: 'Leads Data',
              field_type: 'json',
              sort_order: 21,
            }).select('id').single()
            leadField = newF
          }

          if (leadField) {
            const { data: fv } = await supabase.from('field_values').select('id, value_text, published_value_text').eq('field_id', leadField.id).maybeSingle()
            let currentLeads: any[] = []
            if (fv) {
              try {
                const raw = fv.published_value_text || fv.value_text
                if (raw) currentLeads = JSON.parse(raw)
              } catch {
                currentLeads = []
              }
            }

            const updatedLeads = [leadRecord, ...(Array.isArray(currentLeads) ? currentLeads : [])].slice(0, 1000)
            const jsonStr = JSON.stringify(updatedLeads)

            if (fv) {
              await supabase.from('field_values').update({
                value_text: jsonStr,
                published_value_text: jsonStr,
                is_draft: false,
                updated_at: new Date().toISOString(),
              }).eq('id', fv.id)
            } else {
              await supabase.from('field_values').insert({
                page_id: page.id,
                section_id: sec.id,
                field_id: leadField.id,
                value_text: jsonStr,
                published_value_text: jsonStr,
                is_draft: false,
              })
            }
            console.log(`[Lead Saved To DB] ${leadRecord.id} successfully saved to leads_data!`)
          }

          // --- B. Save Telemetry Event ---
          let { data: evField } = await supabase.from('fields').select('id').eq('section_id', sec.id).eq('name', 'events_log_data').maybeSingle()
          if (evField) {
            const { data: evFv } = await supabase.from('field_values').select('id, value_text, published_value_text').eq('field_id', evField.id).maybeSingle()
            let currentEvents: any[] = []
            if (evFv) {
              try {
                const raw = evFv.published_value_text || evFv.value_text
                if (raw) currentEvents = JSON.parse(raw)
              } catch {
                currentEvents = []
              }
            }

            const newEvent = {
              id: 'ev_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
              event_name: 'lead_form_submitted',
              page_url: page_url,
              visitor_id: leadRecord.visitor_id,
              session_id: leadRecord.session_id,
              device: leadRecord.device,
              browser: leadRecord.browser,
              referrer: referrer,
              utm_source: utm_source,
              utm_medium: utm_medium,
              utm_campaign: utm_campaign,
              country: country,
              timestamp: new Date().toISOString(),
              metadata: {
                lead_id: leadRecord.id,
                program: cleanProgramName,
                occupation: occupation,
              },
            }

            const updatedEvents = [newEvent, ...(Array.isArray(currentEvents) ? currentEvents : [])].slice(0, 1000)
            const evJson = JSON.stringify(updatedEvents)

            if (evFv) {
              await supabase.from('field_values').update({
                value_text: evJson,
                published_value_text: evJson,
                is_draft: false,
                updated_at: new Date().toISOString(),
              }).eq('id', evFv.id)
            } else {
              await supabase.from('field_values').insert({
                page_id: page.id,
                section_id: sec.id,
                field_id: evField.id,
                value_text: evJson,
                published_value_text: evJson,
                is_draft: false,
              })
            }
          }
        }
      }
    } catch (dbErr) {
      console.error('Failed saving lead in Supabase:', dbErr)
    }

    return NextResponse.json({
      success: true,
      lead_id: leadRecord.id,
      payment_url: resolvedPaymentUrl,
      program_name: cleanProgramName,
    })
  } catch (error) {
    console.error('Error in /api/leads:', error)
    return NextResponse.json(
      {
        success: false,
        payment_url: 'https://pages.razorpay.com/pl_SuHNtUTy7rhIe0/view',
      },
      { status: 500 }
    )
  }
}
