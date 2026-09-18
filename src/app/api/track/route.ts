import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    let body: any = {}
    try {
      body = await req.json()
    } catch {
      // Beacon payloads can be plain text or blobs
      const text = await req.text()
      if (text) body = JSON.parse(text)
    }

    const {
      event_type,
      page_path,
      page_title,
      referrer,
      user_agent,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      cta_label,
      cta_url,
      button_text,
      form_id,
      timestamp,
    } = body

    // Async telemetry log in console for debugging and edge tracing
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Telemetry] ${event_type} on ${page_path} (UTM: ${utm_source}/${utm_medium})`)
    }

    // Optional: If lead or high-intent event (WhatsApp Click, Form Submission), store in Supabase field_values leads list if configured
    return NextResponse.json({ success: true, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error('Error handling tracking telemetry:', error)
    return NextResponse.json({ success: false, error: 'Internal Error' }, { status: 500 })
  }
}
