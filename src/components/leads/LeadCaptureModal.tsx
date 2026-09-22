'use client'

import React, { useState, useEffect } from 'react'
import { X, Lock, CheckCircle2, ArrowRight, Sparkles, Phone, Mail, User, Briefcase, Calendar } from 'lucide-react'

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
  'Student',
  'Working Professional',
  'Business Owner',
  'Freelancer',
  'House Wife',
]

const DEFAULT_PROGRAM_PAYMENTS: Record<string, { url: string; name: string; price: number }> = {
  '3-hours-live-workshop': {
    name: '3 Hours Live Graphic Design Workshop',
    url: 'https://rzp.io/rzp/e9OpaQTo',
    price: 199,
  },
  '90-days-graphic-design': {
    name: '90-Day Graphic Design Mastery',
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
      // 1. Resolve Target Payment Link synchronously for instant redirect
      const progKey = config.programSlug || '90-days-graphic-design'
      const fallbackDef = DEFAULT_PROGRAM_PAYMENTS[progKey] || DEFAULT_PROGRAM_PAYMENTS['90-days-graphic-design']
      const targetPaymentUrl = config.defaultPaymentUrl || fallbackDef.url || 'https://pages.razorpay.com/pl_SuHNtUTy7rhIe0/view'
      const cleanProgramName = config.programName || fallbackDef.name || '90-Day Graphic Design Mastery'
      const price = config.price || fallbackDef.price || 4999

      // 2. Gather attribution context
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
        program_name: cleanProgramName,
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

      // 3. Synchronously fire Meta Pixel & GA4 Lead tracking events
      try {
        if (typeof (window as any).fbq === 'function') {
          (window as any).fbq('track', 'Lead', {
            content_name: cleanProgramName,
            content_category: 'Program Enrollment',
            value: price,
            currency: 'INR',
          })
        }
      } catch {}

      try {
        if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'generate_lead', {
            program_name: cleanProgramName,
            value: price,
            currency: 'INR',
          })
        }
      } catch {}

      try {
        if (Array.isArray((window as any).dataLayer)) {
          (window as any).dataLayer.push({
            event: 'lead_captured',
            program_name: cleanProgramName,
            program_slug: progKey,
          })
        }
      } catch {}

      // 4. Non-blocking fire-and-forget lead dispatch to server
      // Using keepalive: true / sendBeacon guarantees background delivery to /api/leads even during navigation
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

      // 5. INSTANT REDIRECTION - zero lag / zero waiting
      window.location.href = targetPaymentUrl
    } catch (err) {
      console.error('Error initiating secure redirect:', err)
      const fallbackUrl = config.defaultPaymentUrl || 'https://pages.razorpay.com/pl_SuHNtUTy7rhIe0/view'
      window.location.href = fallbackUrl
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
      {/* Modal Card */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[85vh] animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Gradient */}
        <div className="bg-gradient-to-br from-[#1748BB] via-blue-600 to-[#0F3590] p-4 sm:p-5 text-white relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3.5 right-3.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span
              style={{ color: '#ffffff' }}
              className="px-2 py-0.5 rounded-full bg-white/20 !text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 backdrop-blur-xs"
            >
              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              <span>Step 1 of 2 · Quick Enrollment</span>
            </span>
          </div>

          <h3
            style={{ color: '#ffffff' }}
            className="text-base sm:text-lg font-black tracking-tight leading-tight !text-white drop-shadow-xs pr-6"
          >
            {config.programName || 'Complete Your Enrollment'}
          </h3>
          <p
            style={{ color: 'rgba(255, 255, 255, 0.92)' }}
            className="text-[11px] sm:text-xs !text-white/90 mt-1 font-medium leading-tight"
          >
            Fill your details below to proceed to secure Razorpay checkout.
          </p>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-3.5 sm:p-5 overflow-y-auto space-y-2.5 sm:space-y-3 flex-1">
          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-[11px] sm:text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#1748BB]" />
              <span>Full Name <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
              }}
              placeholder="e.g. Vignesh Kumar"
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                errors.name
                  ? 'border-red-300 ring-1 ring-red-200 bg-red-50/20'
                  : 'border-gray-200 focus:border-[#1748BB] focus:ring-blue-100 bg-gray-50/40 focus:bg-white'
              }`}
            />
            {errors.name && <p className="text-[10px] text-red-600 font-semibold">{errors.name}</p>}
          </div>

          {/* Row: Age & Phone (2 columns on all devices) */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {/* Age Field */}
            <div className="space-y-1">
              <label className="text-[11px] sm:text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#1748BB]" />
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
                placeholder="e.g. 24"
                className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                  errors.age
                    ? 'border-red-300 ring-1 ring-red-200 bg-red-50/20'
                    : 'border-gray-200 focus:border-[#1748BB] focus:ring-blue-100 bg-gray-50/40 focus:bg-white'
                }`}
              />
              {errors.age && <p className="text-[10px] text-red-600 font-semibold">{errors.age}</p>}
            </div>

            {/* Phone Number Field */}
            <div className="space-y-1">
              <label className="text-[11px] sm:text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#1748BB]" />
                <span>WhatsApp / Phone <span className="text-red-500">*</span></span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }))
                }}
                placeholder="9876543210"
                className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? 'border-red-300 ring-1 ring-red-200 bg-red-50/20'
                    : 'border-gray-200 focus:border-[#1748BB] focus:ring-blue-100 bg-gray-50/40 focus:bg-white'
                }`}
              />
              {errors.phone && <p className="text-[10px] text-red-600 font-semibold">{errors.phone}</p>}
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-[11px] sm:text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#1748BB]" />
              <span>Email Address <span className="text-red-500">*</span></span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
              }}
              placeholder="e.g. yourname@gmail.com"
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-300 ring-1 ring-red-200 bg-red-50/20'
                  : 'border-gray-200 focus:border-[#1748BB] focus:ring-blue-100 bg-gray-50/40 focus:bg-white'
              }`}
            />
            {errors.email && <p className="text-[10px] text-red-600 font-semibold">{errors.email}</p>}
          </div>

          {/* Occupation Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] sm:text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#1748BB]" />
              <span>Current Occupation <span className="text-red-500">*</span></span>
            </label>
            <select
              value={occupation}
              onChange={(e) => {
                setOccupation(e.target.value)
                if (errors.occupation) setErrors((prev) => ({ ...prev, occupation: '' }))
              }}
              className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border transition-all bg-gray-50/40 focus:bg-white focus:outline-none focus:ring-2 ${
                errors.occupation
                  ? 'border-red-300 ring-1 ring-red-200 bg-red-50/20'
                  : 'border-gray-200 focus:border-[#1748BB] focus:ring-blue-100'
              }`}
            >
              <option value="">-- Select Your Occupation --</option>
              {OCCUPATIONS.map((occ) => (
                <option key={occ} value={occ}>
                  {occ}
                </option>
              ))}
            </select>
            {errors.occupation && <p className="text-[10px] text-red-600 font-semibold">{errors.occupation}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-1.5">
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ color: '#ffffff' }}
              className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-[#1748BB] to-blue-600 hover:from-[#123999] hover:to-blue-700 !text-white text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-85"
            >
              <span style={{ color: '#ffffff' }} className="!text-white">Proceed to Secure Payment</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-3 text-[10px] sm:text-[11px] text-gray-500 pt-0.5">
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>256-Bit SSL Secured</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-blue-600" />
              <span>Instant Course Access</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
