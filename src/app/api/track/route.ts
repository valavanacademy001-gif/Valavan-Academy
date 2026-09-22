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

export async function POST(req: Request) {
  try {
    let body: any = {}
    try {
      body = await req.json()
    } catch {
      const text = await req.text()
      if (text) {
        try {
          body = JSON.parse(text)
        } catch {
          body = {}
        }
      }
    }

    const {
      event_type,
      page_path = '/',
      page_title = '',
      visitor_id,
      session_id,
      referrer = '',
      utm_source = 'direct',
      utm_medium = 'none',
      utm_campaign = 'direct',
      utm_term = '',
      utm_content = '',
      device_type,
      screen_resolution,
      cta_label,
      cta_url,
      button_text,
      form_id,
      timestamp,
      ...extra
    } = body

    const userAgent = req.headers.get('user-agent') || ''
    const country = req.headers.get('x-vercel-ip-country') || req.headers.get('cf-ipcountry') || 'IN'

    // Determine device type if not provided
    const resolvedDevice =
      device_type ||
      (/mobile/i.test(userAgent) ? 'mobile' : /tablet|ipad/i.test(userAgent) ? 'tablet' : 'desktop')

    const cleanPath = (page_path || '/').trim()
    const cleanEventType = (event_type || 'page_view').trim().toLowerCase().replace(/\s+/g, '_')

    const eventRecord = {
      id: 'ev_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
      event_name: cleanEventType,
      page_url: cleanPath,
      page_title: page_title || cleanPath,
      visitor_id: visitor_id || ('vid_anon_' + Date.now().toString(36)),
      session_id: session_id || ('sid_anon_' + Date.now().toString(36)),
      device: resolvedDevice,
      browser: parseBrowserFromUA(userAgent),
      referrer: referrer || 'direct',
      utm_source: utm_source || 'direct',
      utm_medium: utm_medium || 'none',
      utm_campaign: utm_campaign || 'direct',
      utm_term: utm_term || '',
      utm_content: utm_content || '',
      country: country,
      timestamp: timestamp || new Date().toISOString(),
      metadata: {
        cta_label,
        cta_url,
        button_text,
        form_id,
        screen_resolution,
        ...extra,
      },
    }

    console.log(`[Analytics Event Captured] ${eventRecord.event_name} on ${eventRecord.page_url} (Visitor: ${eventRecord.visitor_id})`)

    // Asynchronously save to Supabase global_settings -> tracking_analytics -> events_log_data
    try {
      const { data: page } = await supabase
        .from('pages')
        .select('id')
        .eq('slug', 'global_settings')
        .maybeSingle()

      if (page) {
        const { data: sec } = await supabase
          .from('sections')
          .select('id')
          .eq('page_id', page.id)
          .eq('slug', 'tracking_analytics')
          .maybeSingle()

        if (sec) {
          // 1. Ensure events_log_data field exists
          let { data: eventField } = await supabase
            .from('fields')
            .select('id')
            .eq('section_id', sec.id)
            .eq('name', 'events_log_data')
            .maybeSingle()

          if (!eventField) {
            const { data: newF } = await supabase
              .from('fields')
              .insert({
                section_id: sec.id,
                name: 'events_log_data',
                label: 'Events Log Data',
                field_type: 'json',
                sort_order: 20,
              })
              .select('id')
              .single()
            eventField = newF
          }

          if (eventField) {
            const { data: fv } = await supabase
              .from('field_values')
              .select('id, value_text, published_value_text')
              .eq('field_id', eventField.id)
              .maybeSingle()

            let currentEvents: any[] = []
            if (fv) {
              try {
                const raw = fv.published_value_text || fv.value_text
                if (raw) currentEvents = JSON.parse(raw)
              } catch (e) {
                currentEvents = []
              }
            }

            // Prepend new event and keep latest 1000 events
            const updatedEvents = [eventRecord, ...(Array.isArray(currentEvents) ? currentEvents : [])].slice(0, 1000)
            const eventsJson = JSON.stringify(updatedEvents)

            if (fv) {
              await supabase
                .from('field_values')
                .update({
                  value_text: eventsJson,
                  published_value_text: eventsJson,
                  is_draft: false,
                  updated_at: new Date().toISOString(),
                })
                .eq('id', fv.id)
            } else {
              await supabase.from('field_values').insert({
                page_id: page.id,
                section_id: sec.id,
                field_id: eventField.id,
                value_text: eventsJson,
                published_value_text: eventsJson,
                is_draft: false,
              })
            }
            console.log(`[Analytics Saved To DB] ${eventRecord.id} persisted to events_log_data (Total events: ${updatedEvents.length})`)
          }

          // 2. If event is a lead or conversion (whatsapp_click, form_submission, contact, purchase)
          const isLeadEvent =
            /whatsapp|contact|form|lead|enroll/i.test(cleanEventType) ||
            /whatsapp/i.test(cta_label || '') ||
            cleanEventType === 'lead'

          if (isLeadEvent) {
            let { data: leadField } = await supabase
              .from('fields')
              .select('id')
              .eq('section_id', sec.id)
              .eq('name', 'leads_data')
              .maybeSingle()

            if (!leadField) {
              const { data: newLeadF } = await supabase
                .from('fields')
                .insert({
                  section_id: sec.id,
                  name: 'leads_data',
                  label: 'Leads Data',
                  field_type: 'json',
                  sort_order: 21,
                })
                .select('id')
                .single()
              leadField = newLeadF
            }

            if (leadField) {
              const { data: leadFv } = await supabase
                .from('field_values')
                .select('id, value_text, published_value_text')
                .eq('field_id', leadField.id)
                .maybeSingle()

              let currentLeads: any[] = []
              if (leadFv) {
                try {
                  const raw = leadFv.published_value_text || leadFv.value_text
                  if (raw) currentLeads = JSON.parse(raw)
                } catch {
                  currentLeads = []
                }
              }

              const newLead = {
                id: 'lead_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
                name: body.name || (cleanEventType.includes('whatsapp') ? 'WhatsApp Inquirer' : 'Website Prospect'),
                phone: body.phone || '+91 90800 70624',
                email: body.email || '',
                program_interested: cleanPath.includes('90-days')
                  ? '90 Days Graphic Design Mastery'
                  : cleanPath.includes('3-hours') || cleanPath.includes('workshop')
                  ? '3 Hours Live Workshop'
                  : cleanPath.includes('full-stack')
                  ? 'Full Stack Digital Creator'
                  : 'General Design Mentorship',
                source: cleanEventType.includes('whatsapp')
                  ? 'WhatsApp Click'
                  : cleanEventType.includes('form')
                  ? 'Contact Form'
                  : 'CTA Click',
                status: 'New',
                utm_source: utm_source || 'direct',
                utm_medium: utm_medium || 'none',
                utm_campaign: utm_campaign || '',
                landing_page: cleanPath,
                referrer: referrer || '',
                notes: `Auto-captured from ${cleanEventType} on ${cleanPath}`,
                created_at: new Date().toISOString(),
              }

              const updatedLeads = [newLead, ...(Array.isArray(currentLeads) ? currentLeads : [])].slice(0, 500)
              const leadsJson = JSON.stringify(updatedLeads)

              if (leadFv) {
                await supabase
                  .from('field_values')
                  .update({
                    value_text: leadsJson,
                    published_value_text: leadsJson,
                    is_draft: false,
                    updated_at: new Date().toISOString(),
                  })
                  .eq('id', leadFv.id)
              } else {
                await supabase.from('field_values').insert({
                  page_id: page.id,
                  section_id: sec.id,
                  field_id: leadField.id,
                  value_text: leadsJson,
                  published_value_text: leadsJson,
                  is_draft: false,
                })
              }
              console.log(`[Lead Saved To DB] ${newLead.id} for program: ${newLead.program_interested}`)
            }
          }
        }
      }
    } catch (dbErr) {
      console.error('Failed to store analytics event in Supabase:', dbErr)
    }

    return NextResponse.json({
      success: true,
      event_id: eventRecord.id,
      timestamp: eventRecord.timestamp,
    })
  } catch (error) {
    console.error('Error handling tracking telemetry:', error)
    return NextResponse.json({ success: false, error: 'Internal Error' }, { status: 500 })
  }
}
