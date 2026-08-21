'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronDown, Play, Sparkles } from 'lucide-react'
import { useState } from 'react'

type Section = {
  id: string
  name: string
  slug: string
  section_type: { slug: string; name: string } | null
}

type Props = {
  section: Section
  fields: Record<string, string | null>
}

export default function DynamicSectionRenderer({ section, fields }: Props) {
  const type = section.section_type?.slug || 'text_image'

  switch (type) {
    case 'hero':
      return <DynamicHero fields={fields} />
    case 'text_image':
      return <DynamicTextImage fields={fields} />
    case 'features':
      return <DynamicFeatures fields={fields} />
    case 'cta':
      return <DynamicCTA fields={fields} />
    case 'faq':
      return <DynamicFAQ fields={fields} />
    case 'video':
      return <DynamicVideo fields={fields} />
    case 'rich_text':
      return <DynamicRichText fields={fields} />
    default:
      return <DynamicTextImage fields={fields} />
  }
}

function DynamicHero({ fields }: { fields: Record<string, string | null> }) {
  const eyebrow = fields.eyebrow || 'Since 2018'
  const heading = fields.heading || 'Your Career Changing Partner'
  const description = fields.description || ''
  const primaryText = fields.primary_button_text || 'Explore Courses'
  const primaryUrl = fields.primary_button_url || '/programs'
  const secondaryText = fields.secondary_button_text
  const secondaryUrl = fields.secondary_button_url
  const bgVideo = fields.background_video
  const bgImage = fields.background_image

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-[#07080D] text-white overflow-hidden px-4 sm:px-6 lg:px-8 py-24">
      {bgVideo && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={bgVideo} type="video/mp4" />
          </video>
        </div>
      )}
      {bgImage && !bgVideo && (
        <div
          className="absolute inset-0 z-0 opacity-25 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080D] via-[#07080D]/60 to-transparent z-10" />

      <div className="relative z-20 max-w-4xl mx-auto text-center space-y-6">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold uppercase tracking-wider text-blue-300 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            {eyebrow}
          </div>
        )}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
          {heading}
        </h1>
        {description && (
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {primaryText && (
            <Link
              href={primaryUrl}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1748BB] text-white text-base font-semibold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25 hover:scale-105"
            >
              {primaryText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          {secondaryText && secondaryUrl && (
            <Link
              href={secondaryUrl}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-base font-semibold border border-white/20 backdrop-blur-md transition-all"
            >
              {secondaryText}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

function DynamicTextImage({ fields }: { fields: Record<string, string | null> }) {
  const heading = fields.heading || ''
  const description = fields.description || ''
  const image = fields.image || ''
  const position = fields.image_position || 'right'

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${position === 'left' ? 'lg:grid-flow-dense' : ''}`}>
        <div className={position === 'left' ? 'lg:col-start-2' : ''}>
          {heading && <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{heading}</h2>}
          {description && (
            <div
              className="text-gray-600 text-lg leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
        {image && (
          <div className={`relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 ${position === 'left' ? 'lg:col-start-1' : ''}`}>
            <img src={image} alt={heading || 'Section image'} className="w-full h-auto object-cover" />
          </div>
        )}
      </div>
    </section>
  )
}

function DynamicFeatures({ fields }: { fields: Record<string, string | null> }) {
  const heading = fields.heading || 'Why Choose Us'
  const subheading = fields.subheading || ''

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-14">
        {subheading && <p className="text-[#1748BB] font-semibold text-sm uppercase tracking-wider mb-2">{subheading}</p>}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{heading}</h2>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1748BB] flex items-center justify-center mb-5">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Tamil-First Learning</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Master high-income digital creator skills in clear, practical Tamil.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1748BB] flex items-center justify-center mb-5">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Hands-on Projects</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Build real client-ready portfolio pieces with guided mentor feedback.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1748BB] flex items-center justify-center mb-5">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Lifetime Access</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Access community, resources, templates, and future course updates anytime.</p>
        </div>
      </div>
    </section>
  )
}

function DynamicCTA({ fields }: { fields: Record<string, string | null> }) {
  const heading = fields.heading || 'Ready to Start Your Journey?'
  const description = fields.description || 'Join Tamil Nadu\'s fastest-growing creative community today.'
  const buttonText = fields.button_text || 'Enroll Now'
  const buttonUrl = fields.button_url || '/programs'

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1748BB] text-white text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold">{heading}</h2>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">{description}</p>
        <div className="pt-4">
          <Link
            href={buttonUrl}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#1748BB] text-base font-bold hover:bg-neutral-100 transition-all shadow-xl hover:scale-105"
          >
            {buttonText}
            <ArrowRight className="w-4 h-4 text-[#1748BB]" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function DynamicFAQ({ fields }: { fields: Record<string, string | null> }) {
  const heading = fields.heading || 'Frequently Asked Questions'
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const defaultFaqs = [
    { q: 'Who is this program suitable for?', a: 'Beginners, students, freelancers, and working professionals looking to master digital creator skills.' },
    { q: 'What software will I learn?', a: 'Adobe Photoshop, Illustrator, Premiere Pro, After Effects, Figma, and modern AI creator tools.' },
    { q: 'Will I receive a certificate?', a: 'Yes! Upon completing the hands-on projects, you will receive an official Valavan Academy certification.' },
    { q: 'Is there mentorship support?', a: 'Yes, direct access to experienced mentors through our private community.' },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">{heading}</h2>
      <div className="space-y-4">
        {defaultFaqs.map((faq, idx) => (
          <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-900 bg-white hover:bg-gray-50"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === idx && (
              <div className="p-5 pt-0 text-gray-600 text-sm leading-relaxed bg-white border-t border-gray-100">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function DynamicVideo({ fields }: { fields: Record<string, string | null> }) {
  const heading = fields.heading || ''
  const youtubeUrl = fields.youtube_url || ''
  const videoUrl = fields.video_url || ''

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      {heading && <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">{heading}</h2>}
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-black">
        {youtubeUrl ? (
          <iframe
            src={youtubeUrl.replace('watch?v=', 'embed/').replace('shorts/', 'embed/')}
            title="Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : videoUrl ? (
          <video controls className="w-full h-full object-cover">
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Play className="w-12 h-12" />
          </div>
        )}
      </div>
    </section>
  )
}

function DynamicRichText({ fields }: { fields: Record<string, string | null> }) {
  const content = fields.content || ''
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto prose prose-lg prose-blue">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  )
}
