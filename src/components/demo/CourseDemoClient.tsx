'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Play,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Clock,
  ShieldCheck,
  Star,
  Award,
  Users,
  Layers,
  HelpCircle,
  ChevronDown
} from 'lucide-react'
import { useLeadModal } from '@/components/leads/LeadCaptureProvider'

interface DemoVideo {
  id: string
  lessonNumber: string
  title: string
  subtitle: string
  description: string
  embedUrl: string
  duration: string
  topics: string[]
}

const DEMO_VIDEOS: DemoVideo[] = [
  {
    id: '5AsrDwk_Huc',
    lessonNumber: 'Demo Class 01',
    title: 'Graphic Design Core Fundamentals & Photoshop Setup',
    subtitle: 'From Interface to Creative Composition',
    description:
      'Discover the practical fundamentals of graphic design, color psychology, layout composition, and how to master Photoshop tools step-by-step in Tamil.',
    embedUrl: 'https://www.youtube-nocookie.com/embed/5AsrDwk_Huc?autoplay=1&rel=0&start=1',
    duration: 'Demo Lesson',
    topics: ['Design Fundamentals', 'Photoshop Tools', 'Layers & Masks', 'Tamil Practical Guide'],
  },
  {
    id: 'nPCItlrSzMg',
    lessonNumber: 'Demo Class 02',
    title: 'Real-World Project Workflow & Vector Design',
    subtitle: 'Practical Designing for Brands & Social Media',
    description:
      'Learn how professionals approach real client projects, typography rules, branding assets, and high-impact visual design workflows.',
    embedUrl: 'https://www.youtube-nocookie.com/embed/nPCItlrSzMg?autoplay=1&rel=0&start=1',
    duration: 'Demo Lesson',
    topics: ['Typography Rules', 'Branding Assets', 'Client Projects', 'Vector Techniques'],
  },
  {
    id: 'Ovow4wQzj-w',
    lessonNumber: 'Demo Class 03',
    title: 'AI-Powered Design Workflows & Freelance Career Roadmap',
    subtitle: 'Next-Gen Tools & High-Income Freelancing',
    description:
      'Explore AI-assisted design techniques, speeding up client delivery 5x, building a winning portfolio, and landing paying freelance design clients.',
    embedUrl: 'https://www.youtube-nocookie.com/embed/Ovow4wQzj-w?autoplay=1&rel=0',
    duration: 'Demo Lesson',
    topics: ['AI Design Tools', 'Portfolio Building', 'Freelance Clients', 'Career Roadmap'],
  },
]

const COURSE_HIGHLIGHTS = [
  {
    icon: Layers,
    title: 'Photoshop + Illustrator + Canva + AI',
    desc: 'Master the industry-standard design stack from scratch with project-based training.',
  },
  {
    icon: Award,
    title: '100% Practical Tamil-First Training',
    desc: 'Zero boring theory. Every lesson includes practical exercises and real-world assets.',
  },
  {
    icon: Users,
    title: 'Dedicated WhatsApp Community & Mentorship',
    desc: 'Get direct feedback on your designs, live doubt clearance, and mentor guidance.',
  },
  {
    icon: Star,
    title: 'Client Ready Portfolio & Certificate',
    desc: 'Graduate with 15+ stunning portfolio projects ready to show clients and employers.',
  },
]

const FAQS = [
  {
    q: 'Do I need prior drawing or graphic design experience?',
    a: 'No prior experience is needed! Our course starts from complete zero and takes you step-by-step to professional level.',
  },
  {
    q: 'Is the entire training taught in Tamil?',
    a: 'Yes, 100% of the instruction is in clear, easy-to-understand Tamil with practical real-time screen sharing and files.',
  },
  {
    q: 'How long do I get access to the course materials?',
    a: 'You receive lifetime access to all course recordings, future updates, design templates, and community support.',
  },
  {
    q: 'How do I enroll after watching these demo videos?',
    a: 'Click the "Enroll in 90-Day Mastery" button on this page. You can fill the quick enrollment form and complete your secure checkout on Razorpay.',
  },
]

export default function CourseDemoClient() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const { openEnrollModal } = useLeadModal()

  const activeVideo = DEMO_VIDEOS[activeVideoIndex]

  const handleEnrollClick = () => {
    openEnrollModal({
      programSlug: '90-days-graphic-design',
      programName: '90-Day Graphic Design Mastery',
      defaultPaymentUrl: 'https://pages.razorpay.com/pl_SuHNtUTy7rhIe0/view',
      price: 4999,
    })
  }

  return (
    <div className="min-h-screen bg-[#070D1E] text-white selection:bg-[#1748BB] selection:text-white">
      {/* Top Banner / Breadcrumb Bar */}
      <div className="border-b border-white/10 bg-[#0B1528]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
              Valavan Academy · Free Demo Classes
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://wa.me/919080070624?text=Hi%20Valavan%20Academy%2C%20I%20am%20watching%20the%20course%20demo%20videos!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">WhatsApp Help</span>
            </a>

            <button
              onClick={handleEnrollClick}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#1748BB] to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white text-xs font-bold shadow-md hover:shadow-blue-500/25 transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/25 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Exclusive Course Demo Class</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Experience Our <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Tamil-First</span> Graphic Design Training
          </h1>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Watch all 3 free sample classes below to see how practical, clear, and beginner-friendly our 90-Day Graphic Design Mastery program is.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-medium text-gray-300">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>3 Full Demo Classes</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>100% Practical Screen Recording</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Photoshop · Illustrator · AI</span>
            </span>
          </div>
        </div>

        {/* Cinematic Theater & Playlist Section */}
        <div className="bg-[#0D1B36] rounded-3xl border border-white/10 p-3 sm:p-6 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Main Video Screen (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl">
                <iframe
                  key={activeVideo.id}
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* Active Video Info Bar */}
              <div className="space-y-2 px-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold">
                    {activeVideo.lessonNumber}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Tamil Instruction</span>
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {activeVideo.title}
                </h2>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {activeVideo.description}
                </p>

                {/* Topics Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeVideo.topics.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-medium text-gray-300"
                    >
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Playlist Sidebar (4 Cols) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-white/10">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Play className="w-4 h-4 text-blue-400 fill-blue-400" />
                  <span>Demo Playlist ({DEMO_VIDEOS.length} Videos)</span>
                </h3>
                <span className="text-[11px] text-gray-400 font-medium">Click to Play</span>
              </div>

              <div className="space-y-2.5">
                {DEMO_VIDEOS.map((video, idx) => {
                  const isActive = idx === activeVideoIndex
                  return (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => setActiveVideoIndex(idx)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex gap-3 items-center ${
                        isActive
                          ? 'bg-[#1748BB]/25 border-blue-500/60 shadow-lg shadow-blue-900/20 ring-1 ring-blue-400/30'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      {/* Thumbnail with Play Icon */}
                      <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-black/60 shrink-0 border border-white/10 flex items-center justify-center group">
                        <Image
                          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                          alt={video.title}
                          fill
                          sizes="96px"
                          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div
                          className={`absolute inset-0 flex items-center justify-center ${
                            isActive ? 'bg-[#1748BB]/60' : 'bg-black/40'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              isActive ? 'bg-white text-[#1748BB]' : 'bg-white/90 text-gray-900'
                            }`}
                          >
                            <Play className="w-3 h-3 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Video Card Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider ${
                              isActive ? 'text-blue-300' : 'text-gray-400'
                            }`}
                          >
                            {video.lessonNumber}
                          </span>
                          {isActive && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-blue-500 text-white uppercase tracking-wider animate-pulse">
                              Playing
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight mt-0.5">
                          {video.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                          {video.subtitle}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Quick Enroll Callout in Playlist Sidebar */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900/40 to-indigo-950/60 border border-blue-500/30 text-center space-y-2.5 mt-4">
                <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider block">
                  Like What You See?
                </span>
                <p className="text-xs text-gray-300 leading-snug">
                  Get full 90-day step-by-step masterclass with lifetime community support & mentor feedback.
                </p>
                <button
                  onClick={handleEnrollClick}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#1748BB] to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Enroll in Full Course</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All 3 Videos Individual Grid View */}
        <div className="space-y-6 pt-4">
          <div className="text-center space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Watch All 3 Demo Classes
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              You can also play each video directly from the dedicated cards below
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO_VIDEOS.map((vid, i) => (
              <div
                key={vid.id}
                className="bg-[#0B1528] rounded-2xl border border-white/10 overflow-hidden shadow-lg flex flex-col hover:border-blue-500/40 transition-colors"
              >
                <div className="relative w-full aspect-video bg-black">
                  <iframe
                    src={vid.embedUrl.replace('autoplay=1', 'autoplay=0')}
                    title={vid.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/25 text-[10px] font-bold">
                      {vid.lessonNumber}
                    </span>
                    <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {vid.title}
                    </h4>
                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                      {vid.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <button
                      onClick={() => {
                        setActiveVideoIndex(i)
                        window.scrollTo({ top: 150, behavior: 'smooth' })
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-blue-300 border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Play in Main Player</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Highlights & Curriculum Grid */}
        <div className="bg-[#0D1B36]/80 rounded-3xl border border-white/10 p-6 sm:p-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              What You Get In The Full Course
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Why Join 90-Day Graphic Design Mastery?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              Designed specifically for Tamil speakers wanting to build a high-income creative career.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COURSE_HIGHLIGHTS.map((item, idx) => {
              const IconComp = item.icon
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#081124] border border-white/10 space-y-3 flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Large Conversion CTA Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#123999] via-[#1748BB] to-[#0A276B] p-8 sm:p-12 text-center overflow-hidden border border-blue-400/30 shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Admissions Open · Instant Access</span>
            </span>

            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Ready to Turn Your Creativity Into a Profitable Career?
            </h3>

            <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
              Join hundreds of successful Tamil students learning Graphic Design from Valavan Academy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                onClick={handleEnrollClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-[#1748BB] hover:bg-blue-50 font-black text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Enroll in 90-Day Mastery Now</span>
                <ArrowRight className="w-4 h-4 text-[#1748BB]" />
              </button>

              <a
                href="https://wa.me/919080070624?text=Hi%20Valavan%20Academy%2C%20I%20watched%20the%20course%20demo%20videos%20and%20want%20to%20enroll!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-blue-200 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>256-Bit SSL Secured</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-blue-300" />
              <span>Instant Course Dashboard Access</span>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="max-w-3xl mx-auto space-y-6 pt-4 pb-12">
          <div className="text-center space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              <span>Frequently Asked Questions</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Have questions before enrolling? Find answers below.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0B1528] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-blue-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
