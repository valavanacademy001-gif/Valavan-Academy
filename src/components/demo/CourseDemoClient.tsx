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
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full mx-auto space-y-8 sm:space-y-10">
        {/* Centered Heading */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Watch demo videos
          </h1>
        </div>

        {/* 3 Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMO_VIDEOS.map((vid) => (
            <div
              key={vid.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl hover:border-blue-300 transition-all flex flex-col"
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
              <div className="p-4 flex items-center justify-center bg-gray-50/60 border-t border-gray-100">
                <span className="px-4 py-1 rounded-full bg-blue-50 text-[#1748BB] border border-blue-200 text-sm font-bold tracking-wide">
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
