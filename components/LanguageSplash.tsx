'use client'

import { useState } from 'react'
import type React from 'react'
import Image from 'next/image'
import { useLanguage, type Lang } from '@/contexts/LanguageContext'

const CatalanFlag = () => (
  <svg width="28" height="20" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" className="rounded-sm">
    <rect width="20" height="14" fill="#FCDD09"/>
    <rect y="1.55" width="20" height="1.56" fill="#DA121A"/>
    <rect y="4.66" width="20" height="1.56" fill="#DA121A"/>
    <rect y="7.77" width="20" height="1.56" fill="#DA121A"/>
    <rect y="10.88" width="20" height="1.56" fill="#DA121A"/>
  </svg>
)

const LANGS: { code: Lang; flag: React.ReactNode; label: string }[] = [
  { code: 'es', flag: '🇪🇸', label: 'Español'  },
  { code: 'ca', flag: <CatalanFlag />, label: 'Català'   },
  { code: 'en', flag: '🇬🇧', label: 'English'  },
]

export default function LanguageSplash() {
  const { showSplash, dismissSplash } = useLanguage()
  const [animatingOut, setAnimatingOut] = useState(false)

  if (!showSplash) return null

  const handleSelect = (l: Lang) => {
    setAnimatingOut(true)
    setTimeout(() => dismissSplash(l), 380)
  }

  return (
    <div
      className={`fixed inset-0 z-[200] bg-green-dark flex flex-col items-center justify-center px-6 transition-opacity duration-[380ms] ${animatingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Botanical background blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-mid/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-mid/10 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-xs w-full">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/logo.png"
            alt="El Racó del Pantà"
            width={180}
            height={60}
            className="h-16 w-auto brightness-0 invert opacity-90"
            priority
          />
          <p className="font-heading text-cream/60 text-sm tracking-widest uppercase">
            El Racó del Pantà
          </p>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-cream/20" />

        {/* Title */}
        <p className="font-body text-cream/70 text-center text-sm leading-relaxed">
          Selecciona tu idioma<br />
          <span className="text-cream/50">Selecciona el teu idioma</span><br />
          <span className="text-cream/40 text-xs">Select your language</span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full">
          {LANGS.map(({ code, flag, label }) => (
            <button
              key={code}
              onClick={() => handleSelect(code)}
              className="flex items-center gap-4 w-full px-6 py-4 rounded-2xl border border-cream/20 bg-cream/5 hover:bg-cream/15 hover:border-cream/40 transition-all duration-200 group"
            >
              <span className="text-2xl">{flag}</span>
              <span className="font-heading font-bold text-cream text-lg group-hover:text-white transition-colors">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
