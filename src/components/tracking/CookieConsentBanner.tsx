'use client'

import React, { useState, useEffect } from 'react'
import { ShieldCheck, Cookie, X, Check, Settings, ChevronRight } from 'lucide-react'

interface CookieConsentBannerProps {
  enabled?: boolean
}

export default function CookieConsentBanner({ enabled = true }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [analyticsCookies, setAnalyticsCookies] = useState(true)
  const [marketingCookies, setMarketingCookies] = useState(true)

  useEffect(() => {
    if (!enabled) return
    const consent = localStorage.getItem('va_cookie_consent')
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [enabled])

  const handleAcceptAll = () => {
    localStorage.setItem(
      'va_cookie_consent',
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString(),
      })
    )
    setIsVisible(false)
    setShowPreferences(false)
  }

  const handleRejectNonEssential = () => {
    localStorage.setItem(
      'va_cookie_consent',
      JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString(),
      })
    )
    setIsVisible(false)
    setShowPreferences(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem(
      'va_cookie_consent',
      JSON.stringify({
        necessary: true,
        analytics: analyticsCookies,
        marketing: marketingCookies,
        timestamp: new Date().toISOString(),
      })
    )
    setIsVisible(false)
    setShowPreferences(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-9999 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#0b1329]/95 backdrop-blur-xl border border-white/15 text-white p-5 rounded-2xl shadow-2xl shadow-black/50">
        {!showPreferences ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0 text-blue-400">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                  <span>Privacy & Cookies</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </h4>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  We use cookies and telemetry pixels to optimize your learning journey, provide fast access, and personalize course recommendations.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleAcceptAll}
                className="flex-1 py-2 px-3.5 bg-[#1748BB] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="py-2 px-3 bg-white/10 hover:bg-white/15 text-gray-300 font-semibold text-xs rounded-xl transition-all active:scale-98 cursor-pointer"
              >
                Decline
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                title="Cookie Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Cookie Preferences</h4>
              </div>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-gray-400 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Back
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <div className="text-xs font-bold text-white">Essential Cookies</div>
                  <div className="text-[10px] text-gray-400">Strictly required for site navigation & security.</div>
                </div>
                <span className="text-[10px] font-bold bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full">Always On</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <div className="text-xs font-bold text-white">Analytics & Performance</div>
                  <div className="text-[10px] text-gray-400">GA4, Clarity, Heatmaps to improve platform speed.</div>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsCookies}
                  onChange={(e) => setAnalyticsCookies(e.target.checked)}
                  className="w-4 h-4 accent-[#1748BB] rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <div className="text-xs font-bold text-white">Marketing & Pixels</div>
                  <div className="text-[10px] text-gray-400">Meta, Google Ads & TikTok conversion tracking.</div>
                </div>
                <input
                  type="checkbox"
                  checked={marketingCookies}
                  onChange={(e) => setMarketingCookies(e.target.checked)}
                  className="w-4 h-4 accent-[#1748BB] rounded cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={handleSavePreferences}
              className="w-full py-2 bg-[#1748BB] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md"
            >
              Save Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
