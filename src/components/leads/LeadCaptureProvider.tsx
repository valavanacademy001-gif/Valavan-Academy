'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import LeadCaptureModal, { LeadModalConfig } from './LeadCaptureModal'

interface OpenModalOptions {
  programSlug?: string
  programName?: string
  defaultPaymentUrl?: string
  price?: number
}

interface LeadCaptureContextType {
  openEnrollModal: (options?: OpenModalOptions) => void
  closeEnrollModal: () => void
  modalConfig: LeadModalConfig
}

const LeadCaptureContext = createContext<LeadCaptureContextType | undefined>(undefined)

export function useLeadModal() {
  const context = useContext(LeadCaptureContext)
  if (!context) {
    throw new Error('useLeadModal must be used within a LeadCaptureProvider')
  }
  return context
}

declare global {
  interface Window {
    vaOpenEnrollModal?: (options?: OpenModalOptions) => void
  }
}

export default function LeadCaptureProvider({ children }: { children: ReactNode }) {
  const [modalConfig, setModalConfig] = useState<LeadModalConfig>({
    isOpen: false,
    programSlug: '90-days-graphic-design',
    programName: '90 Days Graphic Design Mastery Program',
    defaultPaymentUrl: 'https://pages.razorpay.com/pl_SuHNtUTy7rhIe0/view',
    price: 4999,
  })

  const openEnrollModal = (options?: OpenModalOptions) => {
    let slug = options?.programSlug || ''
    let name = options?.programName || ''
    let paymentUrl = options?.defaultPaymentUrl || ''
    let price = options?.price

    // Auto-detect program from payment URL if provided
    if (!slug && paymentUrl) {
      if (paymentUrl.includes('v8ykjCk') || paymentUrl.includes('full-stack')) {
        slug = 'full-stack-creator'
      } else if (paymentUrl.includes('e9OpaQTo') || paymentUrl.includes('workshop')) {
        slug = '3-hours-live-workshop'
      } else if (paymentUrl.includes('4ydecO7') || paymentUrl.includes('pl_SuHNtUTy7rhIe0') || paymentUrl.includes('90-days')) {
        slug = '90-days-graphic-design'
      }
    }

    // Auto-detect program from pathname if still not set
    if (!slug && typeof window !== 'undefined') {
      const path = window.location.pathname
      if (path.includes('3-hours') || path.includes('workshop')) {
        slug = '3-hours-live-workshop'
      } else if (path.includes('full-stack') || path.includes('creator')) {
        slug = 'full-stack-creator'
      } else {
        slug = '90-days-graphic-design'
      }
    }

    if (!slug) {
      slug = '90-days-graphic-design'
    }

    // Crucial: ensure payment URL, name, and price match the determined slug
    if (slug === 'full-stack-creator') {
      name = name || 'Full Stack Digital Creator Masterclass'
      paymentUrl = 'https://rzp.io/rzp/v8ykjCk'
      price = price || 14999
    } else if (slug === '3-hours-live-workshop') {
      name = name || '3 Hours Live Graphic Design Workshop'
      paymentUrl = 'https://rzp.io/rzp/e9OpaQTo'
      price = price || 199
    } else {
      slug = '90-days-graphic-design'
      name = name || '90 Days Graphic Design Mastery Program'
      paymentUrl = (paymentUrl && (paymentUrl.includes('4ydecO7') || paymentUrl.includes('pl_SuHNtUTy7rhIe0')))
        ? paymentUrl
        : 'https://pages.razorpay.com/pl_SuHNtUTy7rhIe0/view'
      price = price || 4999
    }

    setModalConfig({
      isOpen: true,
      programSlug: slug,
      programName: name,
      defaultPaymentUrl: paymentUrl,
      price,
    })
  }

  const closeEnrollModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }))
  }

  // Register global window helper & click interceptor
  useEffect(() => {
    if (typeof window === 'undefined') return

    window.vaOpenEnrollModal = openEnrollModal

    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button, [role="button"]')
      if (!target) return

      const href = target.getAttribute('href') || ''
      const text = (target.textContent || '').trim().toLowerCase()
      const dataEnroll = target.getAttribute('data-enroll-btn')

      // Never intercept file downloads or brochure links
      if (
        target.hasAttribute('download') ||
        target.getAttribute('data-no-intercept') === 'true' ||
        href.includes('.pdf') ||
        href.includes('/brochure') ||
        text.includes('download brochure')
      ) {
        return
      }

      // Check if this click should open the Lead Form Modal:
      // 1. Explicit data attribute data-enroll-btn="true"
      // 2. Direct Razorpay payment link (e.g. rzp.io / pages.razorpay.com)
      // 3. CTA button with Enroll / Register / Join intent on program pages
      const isRazorpayLink = href.includes('rzp.io') || href.includes('razorpay.com')
      const isEnrollCta =
        dataEnroll === 'true' ||
        isRazorpayLink ||
        ((target.tagName.toLowerCase() === 'button' || href.startsWith('#') || href === '') &&
          /enroll now|enroll today|register now|join batch|join the program|join full stack|join program|book your seat|get instant access|start learning/i.test(text))

      if (isEnrollCta) {
        // Stop default direct navigation so the user fills the lead form first
        e.preventDefault()
        e.stopPropagation()

        // Extract program slug if passed in attributes or detect from pathname/href
        let programSlug = target.getAttribute('data-program-slug') || ''
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''

        if (!programSlug) {
          if (href.includes('full-stack') || href.includes('v8ykjCk')) {
            programSlug = 'full-stack-creator'
          } else if (href.includes('workshop') || href.includes('e9OpaQTo')) {
            programSlug = '3-hours-live-workshop'
          } else if (currentPath.includes('full-stack') || currentPath.includes('creator')) {
            programSlug = 'full-stack-creator'
          } else if (currentPath.includes('3-hours') || currentPath.includes('workshop')) {
            programSlug = '3-hours-live-workshop'
          } else if (href.includes('90-days') || href.includes('4ydecO7') || href.includes('pl_SuHNtUTy7rhIe0')) {
            programSlug = '90-days-graphic-design'
          } else if (currentPath.includes('90-days') || currentPath.includes('graphic-design')) {
            programSlug = '90-days-graphic-design'
          } else {
            programSlug = '90-days-graphic-design'
          }
        }

        let defaultPaymentUrl = isRazorpayLink ? href : undefined
        if (programSlug === 'full-stack-creator') {
          defaultPaymentUrl = 'https://rzp.io/rzp/v8ykjCk'
        } else if (programSlug === '3-hours-live-workshop') {
          defaultPaymentUrl = 'https://rzp.io/rzp/e9OpaQTo'
        }

        openEnrollModal({
          programSlug: programSlug || undefined,
          defaultPaymentUrl,
        })
      }
    }

    document.addEventListener('click', handleGlobalClick, { capture: true })

    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true })
    }
  }, [])

  return (
    <LeadCaptureContext.Provider value={{ openEnrollModal, closeEnrollModal, modalConfig }}>
      {children}
      <LeadCaptureModal config={modalConfig} onClose={closeEnrollModal} />
    </LeadCaptureContext.Provider>
  )
}
