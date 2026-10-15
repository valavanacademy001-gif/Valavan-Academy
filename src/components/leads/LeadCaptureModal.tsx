'use client'

import React, { useState, useEffect } from 'react'
import { X, Lock, CheckCircle2, ArrowRight, ShieldCheck, Phone, Mail, User, Briefcase, Calendar, ChevronDown } from 'lucide-react'

export interface LeadModalConfig {
  isOpen: boolean
  programSlug: string
  programName: string
  defaultPaymentUrl?: string
  price?: number
}

interface LeadCaptureModalProps {
  config: LeadModalConfig
  onClose: () => void
}

const OCCUPATIONS = [
  'Student (College / School)',
  'Working Professional / Employee',
  'Freelancer / Content Creator',
  'Business Owner / Entrepreneur',
  'Homemaker / Housewife',
  'Job Seeker / Career Switcher',
]

const DEFAULT_PROGRAM_PAYMENTS: Record<string, { url: string; name: string; price: number }> = {
  '3-hours-live-workshop': {
    name: '3 Hours Live Graphic Design Workshop',
    url: 'https://rzp.io/rzp/e9OpaQTo',
    price: 199,
  },
  '90-days-graphic-design': {
    name: '90 Days Graphic Design Mastery Program',
    url: 'https://pages.razorpay.com/pl_SuHNtUTy7rhIe0/view',
    price: 4999,
  },
  'full-stack-creator': {
    name: 'Full Stack Digital Creator Masterclass',
    url: 'https://rzp.io/rzp/v8ykjCk',
    price: 14999,
  },
}

export default function LeadCaptureModal({ config, onClose }: LeadCaptureModalProps) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [occupation, setOccupation] = useState('')

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form when modal opens for a new program
  useEffect(() => {
    if (config.isOpen) {
      setErrors({})
      setIsSubmitting(false)
    }
  }, [config.isOpen, config.programSlug])

  if (!config.isOpen) return null

  const progKey = config.programSlug || '90-days-graphic-design'
  const fallbackDef = DEFAULT_PROGRAM_PAYMENTS[progKey] || DEFAULT_PROGRAM_PAYMENTS['90-days-graphic-design']
  const displayProgramName = config.programName || fallbackDef.name
  const displayPrice = config.price || fallbackDef.price

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = 'Full Name is required'
    } else if (name.trim().length < 2) {
      newErrors.name = 'Please enter valid name'
    }

    if (!age.trim()) {
      newErrors.age = 'Age is required'
    } else {
      const numAge = parseInt(age.trim(), 10)
      if (isNaN(numAge) || numAge < 10 || numAge > 90) {
        newErrors.age = 'Age 10-90'
      }
    }

    const cleanPhone = phone.replace(/[\s\-\+]/g, '')
    if (!phone.trim()) {
      newErrors.phone = 'Phone required'
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Min 10 digits'
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter valid email'
    }

    if (!occupation) {
      newErrors.occupation = 'Please select occupation'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    try {
      const targetPaymentUrl = config.defaultPaymentUrl || fallbackDef.url || 'https://pages.razorpay.com/pl_SuHNtUTy7rhIe0/view'

      // Gather attribution context
      let utm: Record<string, string> = {}
      let vid = ''
      let sid = ''
      try {
        const storedUtm = sessionStorage.getItem('va_utm_params')
        if (storedUtm) utm = JSON.parse(storedUtm)
        vid = localStorage.getItem('va_vid') || ''
        sid = sessionStorage.getItem('va_sid') || ''
      } catch {}

      const payload = {
        name: name.trim(),
        age: parseInt(age.trim(), 10) || null,
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        occupation: occupation,
        program_name: displayProgramName,
        program_slug: progKey,
        fallback_payment_url: targetPaymentUrl,
        page_url: typeof window !== 'undefined' ? window.location.pathname : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        utm_source: utm.utm_source || 'direct',
        utm_medium: utm.utm_medium || 'none',
        utm_campaign: utm.utm_campaign || 'direct',
        utm_term: utm.utm_term || '',
        utm_content: utm.utm_content || '',
        visitor_id: vid,
        session_id: sid,
        device: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'desktop',
      }

      // Synchronously fire Meta Pixel & GA4 Lead tracking events
      try {
        if (typeof (window as any).fbq === 'function') {
          (window as any).fbq('track', 'Lead', {
            content_name: displayProgramName,
            content_category: 'Program Enrollment',
            value: displayPrice,
            currency: 'INR',
          })
        }
      } catch {}

      try {
        if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'generate_lead', {
            program_name: displayProgramName,
            value: displayPrice,
            currency: 'INR',
          })
        }
      } catch {}

      try {
        if (Array.isArray((window as any).dataLayer)) {
          (window as any).dataLayer.push({
            event: 'lead_captured',
            program_name: displayProgramName,
            program_slug: progKey,
          })
        }
      } catch {}

      // Fire-and-forget lead dispatch to server
      const jsonStr = JSON.stringify(payload)
      let beaconSent = false
      try {
        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
          const blob = new Blob([jsonStr], { type: 'application/json' })
          beaconSent = navigator.sendBeacon('/api/leads', blob)
        }
      } catch {}

      if (!beaconSent) {
        try {
          fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: jsonStr,
            keepalive: true,
          }).catch(() => {})
        } catch {}
      }

      // Direct redirection to secure Razorpay checkout
      window.location.href = targetPaymentUrl
    } catch (err) {
      console.error('Error initiating secure redirect:', err)
      const fallbackUrl = config.defaultPaymentUrl || fallbackDef.url
      window.location.href = fallbackUrl
    }
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm overflow-y-auto overflow-x-hidden w-full max-w-[100vw] box-border animate-in fade-in duration-150"
    >
      {/* Minimal Light Corporate Modal Card */}
      <div
        className="relative w-full max-w-[calc(100vw-24px)] sm:max-w-[460px] bg-white rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200/90 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] my-auto mx-auto shrink-0 box-border animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Minimal Light Theme Header - Heading Only */}
        <div className="bg-white px-5 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5 border-b border-slate-100 relative">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0 z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Heading Only in Brand Blue */}
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#1748BB] font-display pr-8 break-words leading-snug">
            {displayProgramName}
          </h3>
        </div>

        {/* Minimal Form Body (No Price, Minimal Content) */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 min-w-0 bg-white">
          
          {/* Full Name Field */}
          <div className="space-y-1.5 min-w-0">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#1748BB] shrink-0" />
                <span>Full Name <span className="text-red-500">*</span></span>
              </span>
              {errors.name && <span className="text-[10px] text-red-600 font-semibold normal-case tracking-normal">{errors.name}</span>}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
              }}
              placeholder="e.g. Vignesh Kumar"
              className={`w-full min-w-0 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border transition-all outline-none font-medium ${
                errors.name
                  ? 'border-red-300 ring-2 ring-red-100 bg-red-50/20 text-slate-900'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50 focus:bg-white focus:border-[#1748BB] focus:ring-2 focus:ring-[#1748BB]/15 text-slate-900 placeholder:text-slate-400'
              }`}
            />
          </div>

          {/* Row: Age & WhatsApp Phone */}
          <div className="flex gap-2.5 sm:gap-3 items-start min-w-0">
            {/* Age Field */}
            <div className="space-y-1.5 w-20 sm:w-24 shrink-0">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#1748BB] shrink-0" />
                <span>Age <span className="text-red-500">*</span></span>
              </label>
              <input
                type="number"
                min={10}
                max={99}
                value={age}
                onChange={(e) => {
                  setAge(e.target.value)
                  if (errors.age) setErrors((prev) => ({ ...prev, age: '' }))
                }}
                placeholder="24"
                className={`w-full min-w-0 px-2.5 sm:px-3 py-2.5 text-xs sm:text-sm text-center rounded-xl border transition-all outline-none font-medium ${
                  errors.age
                    ? 'border-red-300 ring-2 ring-red-100 bg-red-50/20 text-slate-900'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50 focus:bg-white focus:border-[#1748BB] focus:ring-2 focus:ring-[#1748BB]/15 text-slate-900 placeholder:text-slate-400'
                }`}
              />
              {errors.age && <p className="text-[10px] text-red-600 font-semibold">{errors.age}</p>}
            </div>

            {/* WhatsApp / Phone Field */}
            <div className="space-y-1.5 flex-1 min-w-0">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5 truncate">
                  <Phone className="w-3.5 h-3.5 text-[#1748BB] shrink-0" />
                  <span className="truncate">WhatsApp / Mobile <span className="text-red-500">*</span></span>
                </span>
                {errors.phone && <span className="text-[10px] text-red-600 font-semibold normal-case tracking-normal">{errors.phone}</span>}
              </label>
              <div className={`relative flex rounded-xl border transition-all ${
                errors.phone
                  ? 'border-red-300 ring-2 ring-red-100 bg-red-50/20'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50 focus-within:bg-white focus-within:border-[#1748BB] focus-within:ring-2 focus-within:ring-[#1748BB]/15'
              }`}>
                <span className="inline-flex items-center px-2.5 text-xs font-bold text-slate-500 border-r border-slate-200 bg-slate-100/80 rounded-l-xl select-none">
                  +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }))
                  }}
                  placeholder="9876543210"
                  className="w-full min-w-0 px-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium bg-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Email Address Field */}
          <div className="space-y-1.5 min-w-0">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#1748BB] shrink-0" />
                <span>Email Address <span className="text-red-500">*</span></span>
              </span>
              {errors.email && <span className="text-[10px] text-red-600 font-semibold normal-case tracking-normal">{errors.email}</span>}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
              }}
              placeholder="e.g. yourname@gmail.com"
              className={`w-full min-w-0 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border transition-all outline-none font-medium ${
                errors.email
                  ? 'border-red-300 ring-2 ring-red-100 bg-red-50/20 text-slate-900'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50 focus:bg-white focus:border-[#1748BB] focus:ring-2 focus:ring-[#1748BB]/15 text-slate-900 placeholder:text-slate-400'
              }`}
            />
          </div>

          {/* Current Occupation Dropdown */}
          <div className="space-y-1.5 min-w-0">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#1748BB] shrink-0" />
                <span>Current Occupation <span className="text-red-500">*</span></span>
              </span>
              {errors.occupation && <span className="text-[10px] text-red-600 font-semibold normal-case tracking-normal">{errors.occupation}</span>}
            </label>
            <div className="relative">
              <select
                value={occupation}
                onChange={(e) => {
                  setOccupation(e.target.value)
                  if (errors.occupation) setErrors((prev) => ({ ...prev, occupation: '' }))
                }}
                className={`w-full min-w-0 appearance-none px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border transition-all outline-none font-medium cursor-pointer pr-10 ${
                  errors.occupation
                    ? 'border-red-300 ring-2 ring-red-100 bg-red-50/20 text-slate-900'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50 focus:bg-white focus:border-[#1748BB] focus:ring-2 focus:ring-[#1748BB]/15 text-slate-800'
                }`}
              >
                <option value="">-- Select Your Professional Background --</option>
                {OCCUPATIONS.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Corporate CTA Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-[#1748BB] hover:bg-[#123999] text-white font-bold text-xs sm:text-sm shadow-[0_8px_20px_rgba(23,72,187,0.28)] hover:shadow-[0_12px_26px_rgba(23,72,187,0.38)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-85 group active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                  <span className="text-white">Connecting to Razorpay Gateway...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-blue-200 shrink-0" />
                  <span className="text-white">Proceed to Secure Payment</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform shrink-0" />
                </>
              )}
            </button>
          </div>

          {/* Minimal Corporate Trust Seals */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] text-slate-500 gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 shrink-0">
              <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-600">256-Bit SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1748BB] shrink-0" />
              <span className="font-semibold text-slate-600">Razorpay Verified</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-600">Instant Access</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
