'use client'

import React from 'react'

const DEMO_VIDEOS = [
  {
    id: '5AsrDwk_Huc',
    label: 'Demo Class 1',
    src: 'https://www.youtube.com/embed/5AsrDwk_Huc?si=EPjLlMVXgc1ytI0C&start=1',
  },
  {
    id: 'nPCItlrSzMg',
    label: 'Demo Class 2',
    src: 'https://www.youtube.com/embed/nPCItlrSzMg?si=V1dkKg8KcR5vBNzr&start=1',
  },
  {
    id: 'Ovow4wQzj-w',
    label: 'Demo Class 3',
    src: 'https://www.youtube.com/embed/Ovow4wQzj-w?si=XUEwKCcmfHWLW4If',
  },
]

export default function CourseDemoClient() {
  return (
    <div className="min-h-screen bg-[#070D1E] text-white flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMO_VIDEOS.map((vid) => (
            <div
              key={vid.id}
              className="bg-[#0B1528] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col hover:border-blue-500/40 transition-all"
            >
              {/* Responsive 16:9 YouTube Video Embed */}
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={vid.src}
                  title={vid.label}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* Card Label Only */}
              <div className="p-4 flex items-center justify-center">
                <span className="px-4 py-1.5 rounded-full bg-[#1748BB]/30 text-blue-300 border border-blue-400/30 text-sm font-bold tracking-wide">
                  {vid.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
