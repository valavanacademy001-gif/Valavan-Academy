'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function ClientTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const trackedScrollDepths = useRef<Set<number>>(new Set())

  // Send event beacon to backend API
  const trackEvent = (eventType: string, eventData: Record<string, any> = {}) => {
    try {
      const storedUtm = typeof window !== 'undefined' ? sessionStorage.getItem('va_utm_params') : null
      const utm = storedUtm ? JSON.parse(storedUtm) : {}

      const payload = {
        event_type: eventType,
        page_path: pathname,
        page_title: typeof document !== 'undefined' ? document.title : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        timestamp: new Date().toISOString(),
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        utm_source: utm.utm_source || 'direct',
        utm_medium: utm.utm_medium || 'none',
        utm_campaign: utm.utm_campaign || 'direct',
        utm_term: utm.utm_term || '',
        utm_content: utm.utm_content || '',
        ...eventData,
      }

      // Fire to GA4 if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventType.toLowerCase().replace(/\s+/g, '_'), payload)
      }

      // Fire to Meta Pixel if available
      if (typeof window !== 'undefined' && (window as any).fbq) {
        if (eventType === 'Page View') {
          (window as any).fbq('track', 'PageView')
        } else if (eventType === 'WhatsApp Click' || eventType === 'Contact Form Submit') {
          (window as any).fbq('track', 'Lead', { content_name: eventType })
        } else {
          (window as any).fbq('trackCustom', eventType.replace(/\s+/g, ''), payload)
        }
      }

      // Send telemetry to Valavan tracking backend
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
        navigator.sendBeacon('/api/track', blob)
      } else {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {})
      }
    } catch {
      // Gracefully ignore tracking errors to protect user experience
    }
  }

  // 1. Capture UTM params on landing and store in session & local storage
  useEffect(() => {
    if (!searchParams) return

    const utmSource = searchParams.get('utm_source')
    const utmMedium = searchParams.get('utm_medium')
    const utmCampaign = searchParams.get('utm_campaign')
    const utmTerm = searchParams.get('utm_term')
    const utmContent = searchParams.get('utm_content')

    if (utmSource || utmMedium || utmCampaign) {
      const utmObj = {
        utm_source: utmSource || '',
        utm_medium: utmMedium || '',
        utm_campaign: utmCampaign || '',
        utm_term: utmTerm || '',
        utm_content: utmContent || '',
        landing_page: window.location.pathname,
        first_seen: new Date().toISOString(),
      }
      sessionStorage.setItem('va_utm_params', JSON.stringify(utmObj))
      localStorage.setItem('va_last_touch_utm', JSON.stringify(utmObj))
      if (!localStorage.getItem('va_first_touch_utm')) {
        localStorage.setItem('va_first_touch_utm', JSON.stringify(utmObj))
      }
    }
  }, [searchParams])

  // 2. Track Page View on route change
  useEffect(() => {
    trackedScrollDepths.current.clear()
    trackEvent('Page View', { path: pathname })
  }, [pathname])

  // 3. Global Click & CTA Detection Listener
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button, [role="button"]')
      if (!target) return

      const href = target.getAttribute('href') || ''
      const text = (target.textContent || '').trim().slice(0, 80)
      const ariaLabel = target.getAttribute('aria-label') || ''
      const label = text || ariaLabel || target.getAttribute('id') || 'Unknown Button'

      // Check WhatsApp
      if (href.includes('wa.me') || href.includes('whatsapp.com') || href.includes('api.whatsapp.com')) {
        trackEvent('WhatsApp Click', {
          cta_label: label,
          cta_url: href,
        })
        return
      }

      // Check Phone Call
      if (href.startsWith('tel:')) {
        trackEvent('Phone Call Click', {
          cta_label: label,
          phone_number: href.replace('tel:', ''),
        })
        return
      }

      // Check Program Enrollment CTAs
      if (
        /enroll|join|register|apply|curriculum|syllabus|download|start|checkout|buy/i.test(label) ||
        /enroll|workshop|checkout/i.test(href)
      ) {
        trackEvent('CTA Button Click', {
          cta_label: label,
          cta_url: href,
        })
        return
      }

      // General Button Click
      if (target.tagName.toLowerCase() === 'button' || href.startsWith('#') || href.startsWith('/')) {
        trackEvent('Button Click', {
          button_text: label,
          target_url: href,
        })
      }
    }

    // Check Form Submissions
    const handleSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement
      const formId = form?.id || form?.name || 'general_form'
      const formAction = form?.action || pathname

      trackEvent('Form Submission', {
        form_id: formId,
        form_action: formAction,
      })
    }

    // Scroll Depth Listener (25%, 50%, 75%, 90%)
    let isTicking = false
    const handleScroll = () => {
      if (isTicking) return
      isTicking = true
      window.requestAnimationFrame(() => {
        isTicking = false
        const winHeight = window.innerHeight
        const docHeight = document.documentElement.scrollHeight - winHeight
        if (docHeight <= 0) return

        const scrollPercent = Math.round((window.scrollY / docHeight) * 100)
        const milestones = [25, 50, 75, 90]

        milestones.forEach((milestone) => {
          if (scrollPercent >= milestone && !trackedScrollDepths.current.has(milestone)) {
            trackedScrollDepths.current.add(milestone)
            trackEvent(`Scroll Depth ${milestone}%`, {
              depth_percentage: milestone,
              page: pathname,
            })
          }
        })
      })
    }

    document.addEventListener('click', handleClick, { capture: true })
    document.addEventListener('submit', handleSubmit, { capture: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('click', handleClick, { capture: true })
      document.removeEventListener('submit', handleSubmit, { capture: true })
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  return null
}
