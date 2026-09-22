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
      newErrors.name = 'Please enter your real full name'
    }

    if (!age.trim()) {
      newErrors.age = 'Age is required'
    } else {
      const numAge = parseInt(age.trim(), 10)
      if (isNaN(numAge) || numAge < 10 || numAge > 90) {
        newErrors.age = 'Please enter a valid age (10-90)'
      }
    }

    const cleanPhone = phone.replace(/[\s\-\+]/g, '')
    if (!phone.trim()) {
      newErrors.phone = 'Phone Number is required'
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits'
    }

    if (!email.trim()) {
      newErrors.email = 'Email Address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!occupation) {
      newErrors.occupation = 'Please select your current occupation'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    try {
      // Gather attribution and telemetry context
      const storedUtm = typeof window !== 'undefined' ? sessionStorage.getItem('va_utm_params') : null
      const utm = storedUtm ? JSON.parse(storedUtm) : {}

      let vid = ''
      let sid = ''
      try {
        vid = localStorage.getItem('va_vid') || ''
        sid = sessionStorage.getItem('va_sid') || ''
      } catch {}

      const payload = {
        name: name.trim(),
        age: parseInt(age.trim(), 10),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        occupation: occupation,
        program_name: config.programName || '90-Day Graphic Design Mastery',
        program_slug: config.programSlug || '90-days-graphic-design',
        fallback_payment_url: config.defaultPaymentUrl || '',
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

      // Fire Meta Pixel Lead Event
      if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
        try {
          (window as any).fbq('track', 'Lead', {
            content_name: config.programName,
            content_category: 'Program Enrollment',
            value: config.price || 4999,
            currency: 'INR',
          })
        } catch {}
      }

      // Fire GA4 generate_lead Event
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        try {
          (window as any).gtag('event', 'generate_lead', {
            program_name: config.programName,
            value: config.price || 4999,
            currency: 'INR',
          })
        } catch {}
      }

      // Fire to dataLayer
      if (typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)) {
        try {
          (window as any).dataLayer.push({
            event: 'lead_captured',
            program_name: config.programName,
            program_slug: config.programSlug,
          })
        } catch {}
      }

      // Post to /api/leads to persist in Supabase & retrieve payment URL
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      const paymentUrl = data.payment_url || config.defaultPaymentUrl || 'https://pages.razorpay.com/pl_SuHNtUTy7rhIe0/view'

      // Redirect user to the Razorpay Payment link
      window.location.href = paymentUrl
    } catch (err) {
      console.error('Error submitting lead form:', err)
      // Fallback redirect to payment URL on network error
      const fallbackUrl = config.defaultPaymentUrl || 'https://pages.razorpay.com/pl_SuHNtUTy7rhIe0/view'
      window.location.href = fallbackUrl
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Modal Card */}
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Gradient */}
        <div className="bg-gradient-to-br from-[#1748BB] via-blue-700 to-indigo-800 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider text-blue-100 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Step 1 of 2 · Quick Enrollment</span>
            </span>
          </div>

          <h3 className="text-xl font-bold tracking-tight leading-snug">
            {config.programName || 'Complete Your Enrollment'}
          </h3>
          <p className="text-xs text-blue-100/90 mt-1">
            Fill your details below to proceed to secure Razorpay checkout.
          </p>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
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
              className={`w-full px-4 py-2.5 text-sm rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                errors.name
                  ? 'border-red-300 ring-1 ring-red-200 bg-red-50/20'
                  : 'border-gray-200 focus:border-[#1748BB] focus:ring-blue-100'
              }`}
            />
            {errors.name && <p className="text-[11px] text-red-600 font-semibold">{errors.name}</p>}
          </div>

          {/* Row: Age & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Age Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
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
                className={`w-full px-4 py-2.5 text-sm rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                  errors.age
                    ? 'border-red-300 ring-1 ring-red-200 bg-red-50/20'
                    : 'border-gray-200 focus:border-[#1748BB] focus:ring-blue-100'
                }`}
              />
              {errors.age && <p className="text-[11px] text-red-600 font-semibold">{errors.age}</p>}
            </div>

            {/* Phone Number Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#1748BB]" />
                <span>Phone / WhatsApp <span className="text-red-500">*</span></span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }))
                }}
                placeholder="e.g. 9876543210"
                className={`w-full px-4 py-2.5 text-sm rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? 'border-red-300 ring-1 ring-red-200 bg-red-50/20'
                    : 'border-gray-200 focus:border-[#1748BB] focus:ring-blue-100'
                }`}
              />
              {errors.phone && <p className="text-[11px] text-red-600 font-semibold">{errors.phone}</p>}
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
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
              className={`w-full px-4 py-2.5 text-sm rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-300 ring-1 ring-red-200 bg-red-50/20'
                  : 'border-gray-200 focus:border-[#1748BB] focus:ring-blue-100'
              }`}
            />
            {errors.email && <p className="text-[11px] text-red-600 font-semibold">{errors.email}</p>}
          </div>

          {/* Occupation Dropdown */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#1748BB]" />
              <span>Current Occupation <span className="text-red-500">*</span></span>
            </label>
            <select
              value={occupation}
              onChange={(e) => {
                setOccupation(e.target.value)
                if (errors.occupation) setErrors((prev) => ({ ...prev, occupation: '' }))
              }}
              className={`w-full px-4 py-2.5 text-sm rounded-xl border transition-all bg-white focus:outline-none focus:ring-2 ${
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
            {errors.occupation && <p className="text-[11px] text-red-600 font-semibold">{errors.occupation}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#1748BB] to-blue-600 hover:from-[#123999] hover:to-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Connecting to Secure Payment...</span>
                </>
              ) : (
                <>
                  <span>Proceed to Secure Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 pt-1">
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
