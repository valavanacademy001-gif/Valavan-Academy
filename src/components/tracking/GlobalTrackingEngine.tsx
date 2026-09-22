'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { CMSTrackingSettings, PageTrackingRule, DEFAULT_PAGE_RULES, fetchLivePageTrackingRules } from '@/lib/cms'

const DEFAULT_META_PIXEL_ID = '1773816340532641'

interface GlobalTrackingEngineProps {
  settings?: CMSTrackingSettings
  initialRules?: PageTrackingRule[]
}

declare global {
  interface Window {
    dataLayer: any[]
    gtag?: (...args: any[]) => void
    fbq?: (...args: any[]) => void
    _fbq?: any
    __va_meta_initialized?: boolean
    __va_rules_cache?: PageTrackingRule[]
    vaTrackEvent?: (eventType: string, data?: Record<string, any>) => void
  }
}

/**
 * Normalizes URL path for consistent comparison
 */
function normalizePath(p: string): string {
  if (!p) return '/'
  const clean = p.trim().toLowerCase().split('?')[0].split('#')[0]
  if (clean === '/' || clean === '') return '/'
  return clean.replace(/\/+$/, '')
}

/**
 * Match current URL against configured CMS tracking rules
 */
function findMatchingRule(rules: PageTrackingRule[], currentPath: string): PageTrackingRule | null {
  if (!rules || rules.length === 0) return null

  const normCurrent = normalizePath(currentPath)

  // 1. Direct exact match (e.g. /programs/90-days-graphic-design)
  const exact = rules.find((r) => {
    if (!r.is_active && String(r.is_active) !== 'true') return false
    return normalizePath(r.page_path) === normCurrent
  })
  if (exact) return exact

  // 2. Alias mapping (e.g. /workshop <-> /programs/3-hours-live-workshop)
  if (normCurrent === '/workshop' || normCurrent === '/programs/workshop' || normCurrent === '/3-hours-live-workshop') {
    const workshopRule = rules.find(
      (r) =>
        (r.is_active || String(r.is_active) === 'true') &&
        (normalizePath(r.page_path) === '/programs/3-hours-live-workshop' ||
          normalizePath(r.page_path) === '/workshop' ||
          r.id === 'ptr-workshop')
    )
    if (workshopRule) return workshopRule
  }

  // 3. Wildcard matching (e.g. /thank-you/* matching /thank-you/3-hours-live-workshop)
  const wildcard = rules.find((r) => {
    if (!r.is_active && String(r.is_active) !== 'true') return false
    const rPath = normalizePath(r.page_path)
    if (rPath.endsWith('/*')) {
      const base = rPath.slice(0, -2)
      return normCurrent.startsWith(base)
    }
    if (rPath.endsWith('*')) {
      const base = rPath.slice(0, -1)
      return normCurrent.startsWith(base)
    }
    return false
  })
  if (wildcard) return wildcard

  // 4. Thank You generic prefix fallback (if on /thank-you/... and rule exists for /thank-you)
  if (normCurrent.startsWith('/thank-you')) {
    const thankYouGeneric = rules.find(
      (r) =>
        (r.is_active || String(r.is_active) === 'true') &&
        (normalizePath(r.page_path) === '/thank-you' || r.id === 'ptr-thankyou')
    )
    if (thankYouGeneric) return thankYouGeneric
  }

  return null
}

/**
 * Safely executes custom JavaScript or injects HTML/script tags into DOM
 */
function executeScriptContent(scriptContent: string, targetTag: 'head' | 'body', ruleId: string): number {
  if (!scriptContent || !scriptContent.trim()) return 0
  if (typeof document === 'undefined') return 0

  let executedCount = 0
  const cleanContent = scriptContent.trim()

  try {
    // If it contains <script> tags, parse and inject real DOM script nodes
    if (cleanContent.includes('<script')) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(cleanContent, 'text/html')
      const scriptElements = doc.querySelectorAll('script')

      scriptElements.forEach((s) => {
        const newScript = document.createElement('script')
        newScript.setAttribute('data-injected-by', 'va-page-rule')
        newScript.setAttribute('data-rule-id', ruleId)

        // Copy attributes
        Array.from(s.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value)
        })

        // Copy inline script text
        if (s.textContent) {
          newScript.textContent = s.textContent
        }

        if (targetTag === 'head') {
          document.head.appendChild(newScript)
        } else {
          document.body.appendChild(newScript)
        }
        executedCount++
      })

      // Also append any non-script nodes (like <noscript>, <img>, etc.)
      const nonScripts = Array.from(doc.body.children).filter((el) => el.tagName.toLowerCase() !== 'script')
      nonScripts.forEach((el) => {
        el.setAttribute('data-injected-by', 'va-page-rule')
        el.setAttribute('data-rule-id', ruleId)
        if (targetTag === 'head') {
          document.head.appendChild(el)
        } else {
          document.body.appendChild(el)
        }
        executedCount++
      })
    } else {
      // Raw JS code without tags
      const newScript = document.createElement('script')
      newScript.setAttribute('data-injected-by', 'va-page-rule')
      newScript.setAttribute('data-rule-id', ruleId)
      newScript.textContent = cleanContent

      if (targetTag === 'head') {
        document.head.appendChild(newScript)
      } else {
        document.body.appendChild(newScript)
      }
      executedCount++
    }
  } catch (err) {
    console.error(`[Tracking Engine] Error executing custom ${targetTag} script for rule ${ruleId}:`, err)
  }

  return executedCount
}

/**
 * Removes previously injected page-specific custom scripts
 */
function cleanupPageScripts() {
  if (typeof document === 'undefined') return
  const existing = document.querySelectorAll('[data-injected-by="va-page-rule"]')
  existing.forEach((el) => el.remove())
}

export default function GlobalTrackingEngine({ settings, initialRules }: GlobalTrackingEngineProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [rules, setRules] = useState<PageTrackingRule[]>(
    initialRules && initialRules.length > 0 ? initialRules : DEFAULT_PAGE_RULES
  )

  const pixelId = settings?.meta_pixel_id || DEFAULT_META_PIXEL_ID
  const isMetaEnabled = settings?.meta_pixel_enabled !== 'false'
  const ga4Id = settings?.ga4_measurement_id || ''
  const isGa4Enabled = settings?.ga4_enabled !== 'false'

  // Ref tracking current executed path to prevent duplicate firing per pageview
  const lastExecutedPath = useRef<string | null>(null)
  const trackedScrollDepths = useRef<Set<number>>(new Set())

  // 1. Ensure window.dataLayer and gtag are initialized globally immediately
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      if (!window.gtag) {
        window.gtag = function () {
          window.dataLayer.push(arguments)
        }
      }
    }
  }, [])

  // 2. Fetch live tracking rules from Supabase in real-time
  useEffect(() => {
    let isMounted = true

    const syncRules = async () => {
      try {
        const liveRules = await fetchLivePageTrackingRules()
        if (isMounted && liveRules && liveRules.length > 0) {
          setRules(liveRules)
          if (typeof window !== 'undefined') {
            window.__va_rules_cache = liveRules
          }
        }
      } catch (err) {
        console.warn('[Tracking Engine] Live rules fetch notice:', err)
      }
    }

    syncRules()

    return () => {
      isMounted = false
    }
  }, [pathname])

  // 3. Capture UTM params on landing
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

  // 4. MAIN EXECUTION ENGINE: Strictly executes ONLY matching active rules per page
  useEffect(() => {
    if (!pathname) return
    const currentPath = normalizePath(pathname)

    // Prevent duplicate execution on the exact same path within the same render cycle
    if (lastExecutedPath.current === currentPath) {
      return
    }
    lastExecutedPath.current = currentPath

    // Reset scroll depth tracker on page change
    trackedScrollDepths.current.clear()

    // Clean up previous page custom scripts
    cleanupPageScripts()

    const activeRules = rules.filter((r) => r.is_active === true || String(r.is_active) === 'true')
    const matchedRule = findMatchingRule(activeRules, currentPath)

    // IF NO ACTIVE RULE MATCHES THIS PAGE: DO NOT FIRE ANY TRACKING
    if (!matchedRule) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[Tracking Engine] No active tracking rule for path: ${currentPath}. Tracking skipped.`)
      }
      return
    }

    let metaEventFired = 'None'
    let ga4EventFired = 'None'
    let dlEventPushed = 'None'
    let customScriptsCount = 0

    // Parse dataLayer custom payload if present
    let parsedPayload: Record<string, any> = {}
    if (matchedRule.datalayer_payload) {
      try {
        parsedPayload = JSON.parse(matchedRule.datalayer_payload)
      } catch (err) {
        console.warn('[Tracking Engine] Notice parsing datalayer_payload JSON:', err)
      }
    }

    // Determine purchase value if applicable (Thank You pages or rule event_value)
    const isThankYouPage = currentPath.startsWith('/thank-you')
    let resolvedValue: number | undefined = undefined

    if (matchedRule.event_value !== undefined && matchedRule.event_value !== null && matchedRule.event_value > 0) {
      resolvedValue = Number(matchedRule.event_value)
    } else if (isThankYouPage) {
      if (currentPath.includes('3-hours') || currentPath.includes('workshop')) {
        resolvedValue = 99
      } else if (currentPath.includes('full-stack') || currentPath.includes('creator')) {
        resolvedValue = 10000
      } else {
        resolvedValue = 4999
      }
    }

    const currency = matchedRule.currency || 'INR'

    // --- A. META PIXEL EXECUTION (ONLY IF RULE DEFINES META EVENT) ---
    let metaEventName = matchedRule.meta_event || 'None'
    if (metaEventName === 'Custom' && matchedRule.meta_custom_event_name) {
      metaEventName = matchedRule.meta_custom_event_name as any
    }

    if (
      typeof window !== 'undefined' &&
      isMetaEnabled &&
      String(metaEventName).toLowerCase() !== 'none'
    ) {
      if (typeof window.fbq !== 'function') {
        /* eslint-disable */
        ;(function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
          if (f.fbq) return
          n = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
          }
          if (!f._fbq) f._fbq = n
          n.push = n
          n.loaded = !0
          n.version = '2.0'
          n.queue = []
          t = b.createElement(e)
          t.async = !0
          t.src = v
          s = b.getElementsByTagName(e)[0]
          s.parentNode.insertBefore(t, s)
        })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
        /* eslint-enable */

        if (typeof (window as any).fbq === 'function') {
          (window as any).fbq('init', pixelId)
          window.__va_meta_initialized = true
        }
      }

      if (typeof window.fbq === 'function') {
        const metaPayload: Record<string, any> = {
          page_path: pathname,
          page_title: typeof document !== 'undefined' ? document.title : '',
          ...parsedPayload,
        }

        // Attach monetary value for Purchase/Registration conversion events
        if (
          resolvedValue !== undefined &&
          (/purchase|completeregistration|lead|initiatecheckout/i.test(metaEventName) || isThankYouPage)
        ) {
          metaPayload.value = resolvedValue
          metaPayload.currency = currency
        }

        if (matchedRule.meta_event === 'Custom') {
          window.fbq('trackCustom', metaEventName, metaPayload)
        } else {
          window.fbq('track', metaEventName, metaPayload)
        }
        metaEventFired = metaEventName
      }
    }

    // --- B. GA4 EVENT EXECUTION (ONLY IF RULE DEFINES GA4 EVENT) ---
    let ga4EventName = matchedRule.ga4_event || 'none'
    if (ga4EventName === 'custom' && matchedRule.ga4_custom_event_name) {
      ga4EventName = matchedRule.ga4_custom_event_name as any
    }

    if (
      typeof window !== 'undefined' &&
      isGa4Enabled &&
      String(ga4EventName).toLowerCase() !== 'none'
    ) {
      window.dataLayer = window.dataLayer || []
      if (!window.gtag) {
        window.gtag = function () {
          window.dataLayer.push(arguments)
        }
      }

      const ga4Payload: Record<string, any> = {
        page_path: pathname,
        page_title: typeof document !== 'undefined' ? document.title : '',
        ...parsedPayload,
      }

      if (resolvedValue !== undefined && (/purchase|begin_checkout|generate_lead/i.test(ga4EventName) || isThankYouPage)) {
        ga4Payload.value = resolvedValue
        ga4Payload.currency = currency
      }

      if (typeof window.gtag === 'function') {
        window.gtag('event', ga4EventName, ga4Payload)
      }

      ga4EventFired = ga4EventName
    }

    // --- C. GTM / DATALAYER EVENT PUSH (ONLY IF RULE DEFINES DATALAYER EVENT) ---
    const dataLayerEventName = matchedRule.gtm_datalayer_event || 'none'

    if (
      typeof window !== 'undefined' &&
      dataLayerEventName &&
      dataLayerEventName !== 'None' &&
      dataLayerEventName !== 'none'
    ) {
      window.dataLayer = window.dataLayer || []
      const dlPushObj: Record<string, any> = {
        event: dataLayerEventName,
        page_path: pathname,
        timestamp: new Date().toISOString(),
        ...parsedPayload,
      }

      if (resolvedValue !== undefined && (isThankYouPage || /purchase|conversion|enrollment/i.test(dataLayerEventName))) {
        dlPushObj.value = resolvedValue
        dlPushObj.currency = currency
      }

      window.dataLayer.push(dlPushObj)
      dlEventPushed = dataLayerEventName
    }

    // --- D. CUSTOM HEAD & BODY SCRIPT EXECUTION ---
    if (matchedRule) {
      if (matchedRule.custom_head_script) {
        const headCount = executeScriptContent(matchedRule.custom_head_script, 'head', matchedRule.id)
        customScriptsCount += headCount
      }
      if (matchedRule.custom_body_script) {
        const bodyCount = executeScriptContent(matchedRule.custom_body_script, 'body', matchedRule.id)
        customScriptsCount += bodyCount
      }
    }

    // --- E. DEVELOPER DEBUG MODE CONSOLE OUTPUT ---
    const ruleTitle = matchedRule ? matchedRule.page_title : 'Global Default Route'
    const ruleId = matchedRule ? matchedRule.id : 'default-pageview'
    const customScriptStatus = customScriptsCount > 0 ? `Yes (${customScriptsCount} script node${customScriptsCount > 1 ? 's' : ''})` : 'No'

    console.groupCollapsed(
      `%c[Tracking Engine Loaded]%c ${pathname} %c(${matchedRule ? 'Rule Matched' : 'Default'})`,
      'background: #1748BB; color: #fff; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
      'color: #0E3BB0; font-weight: bold;',
      matchedRule ? 'color: #16A34A; font-weight: bold;' : 'color: #64748B;'
    )
    console.log(`Current Path:           ${pathname}`)
    console.log(`Matched Rule:           ${ruleTitle}`)
    console.log(`Rule ID:                ${ruleId}`)
    console.log(`Meta Event Fired:       ${metaEventFired}`)
    console.log(`GA4 Event Fired:        ${ga4EventFired}`)
    console.log(`DataLayer Event Pushed: ${dlEventPushed}`)
    console.log(`Custom Script Executed: ${customScriptStatus}`)
    if (resolvedValue !== undefined) {
      console.log(`Conversion Value (INR): ₹${resolvedValue} (Passed to Meta/GA4/dataLayer only)`)
    }
    console.groupEnd()
  }, [pathname, rules, isMetaEnabled, isGa4Enabled, pixelId, ga4Id])

  // 6. Global Click, CTA, and Form Submission Telemetry Listener
  useEffect(() => {
    const trackCustomEvent = (eventType: string, eventData: Record<string, any> = {}) => {
      try {
        const storedUtm = typeof window !== 'undefined' ? sessionStorage.getItem('va_utm_params') : null
        const utm = storedUtm ? JSON.parse(storedUtm) : {}

        const payload = {
          event_type: eventType,
          page_path: pathname,
          page_title: typeof document !== 'undefined' ? document.title : '',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
          timestamp: new Date().toISOString(),
          utm_source: utm.utm_source || 'direct',
          utm_medium: utm.utm_medium || 'none',
          utm_campaign: utm.utm_campaign || 'direct',
          utm_term: utm.utm_term || '',
          utm_content: utm.utm_content || '',
          ...eventData,
        }

        // Fire to GA4
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', eventType.toLowerCase().replace(/\s+/g, '_'), payload)
        }

        // Fire to Meta Pixel
        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
          if (eventType === 'WhatsApp Click' || eventType === 'Contact Form Submit') {
            window.fbq('track', 'Lead', { content_name: eventType, ...payload })
          } else {
            window.fbq('trackCustom', eventType.replace(/\s+/g, ''), payload)
          }
        }

        // Push to dataLayer
        if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
          window.dataLayer.push({
            event: eventType.toLowerCase().replace(/\s+/g, '_'),
            ...payload,
          })
        }

        // Send telemetry beacon
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
        // Silent error prevention
      }
    }

    if (typeof window !== 'undefined') {
      window.vaTrackEvent = trackCustomEvent
    }

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button, [role="button"]')
      if (!target) return

      const href = target.getAttribute('href') || ''
      const text = (target.textContent || '').trim().slice(0, 80)
      const ariaLabel = target.getAttribute('aria-label') || ''
      const label = text || ariaLabel || target.getAttribute('id') || 'Unknown Button'

      if (href.includes('wa.me') || href.includes('whatsapp.com') || href.includes('api.whatsapp.com')) {
        trackCustomEvent('WhatsApp Click', { cta_label: label, cta_url: href })
        return
      }

      if (href.startsWith('tel:')) {
        trackCustomEvent('Phone Call Click', { cta_label: label, phone_number: href.replace('tel:', '') })
        return
      }

      if (
        /enroll|join|register|apply|curriculum|syllabus|download|start|checkout|buy/i.test(label) ||
        /enroll|workshop|checkout/i.test(href)
      ) {
        trackCustomEvent('CTA Button Click', { cta_label: label, cta_url: href })
        return
      }

      if (target.tagName.toLowerCase() === 'button' || href.startsWith('#') || href.startsWith('/')) {
        trackCustomEvent('Button Click', { button_text: label, target_url: href })
      }
    }

    const handleSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement
      const formId = form?.id || form?.name || 'general_form'
      const formAction = form?.action || pathname
      trackCustomEvent('Form Submission', { form_id: formId, form_action: formAction })
    }

    const handleScroll = () => {
      const winHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight - winHeight
      if (docHeight <= 0) return

      const scrollPercent = Math.round((window.scrollY / docHeight) * 100)
      const milestones = [25, 50, 75, 90]

      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !trackedScrollDepths.current.has(milestone)) {
          trackedScrollDepths.current.add(milestone)
          trackCustomEvent(`Scroll Depth ${milestone}%`, {
            depth_percentage: milestone,
            page: pathname,
          })
        }
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

  return (
    <>
      {/* 1. Google Analytics 4 (GA4) Script Tag */}
      {isGa4Enabled && ga4Id && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4Id}', {
                  send_page_view: false
                });
              `,
            }}
          />
        </>
      )}

      {/* 2. Google Tag Manager (GTM) */}
      {settings?.gtm_enabled === 'true' && settings?.gtm_container_id && (
        <>
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${settings.gtm_container_id}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${settings.gtm_container_id}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* 3. Microsoft Clarity */}
      {settings?.clarity_enabled === 'true' && settings?.clarity_project_id && (
        <Script
          id="clarity-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${settings.clarity_project_id}");
            `,
          }}
        />
      )}

      {/* 4. TikTok Pixel */}
      {settings?.tiktok_enabled === 'true' && settings?.tiktok_pixel_id && (
        <Script
          id="tiktok-pixel-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                ttq.load('${settings.tiktok_pixel_id}');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />
      )}

      {/* 5. LinkedIn Insight Tag */}
      {settings?.linkedin_enabled === 'true' && settings?.linkedin_partner_id && (
        <>
          <Script
            id="linkedin-insight-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                _linkedin_partner_id = "${settings.linkedin_partner_id}";
                window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                window._linkedin_data_partner_ids.push(_linkedin_partner_id);
                (function(l) {
                  if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                  window.lintrk.q=[]}
                  var s = document.getElementsByTagName("script")[0];
                  var b = document.createElement("script");
                  b.type = "text/javascript";b.async = true;
                  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                  s.parentNode.insertBefore(b, s);
                })(window.lintrk);
              `,
            }}
          />
        </>
      )}

      {/* 6. Hotjar */}
      {settings?.hotjar_enabled === 'true' && settings?.hotjar_site_id && (
        <Script
          id="hotjar-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:${settings.hotjar_site_id},hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      )}

      {/* 7. Global Custom Head/Body/Footer Code (if configured globally) */}
      {settings?.custom_head_code && (
        <Script
          id="global-custom-head-code"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `try { ${settings.custom_head_code.replace(/<\/?script[^>]*>/gi, '')} } catch(e) { console.error('Global head code error', e); }`,
          }}
        />
      )}

      {/* 8. Fallback Meta Pixel NoScript */}
      {isMetaEnabled && pixelId && (
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}
    </>
  )
}
