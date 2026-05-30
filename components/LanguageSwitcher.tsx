'use client'

import { useState, useRef, useEffect } from 'react'
import type React from 'react'
import { useLanguage, type Lang } from '@/contexts/LanguageContext'

const CatalanFlag = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" className="rounded-sm inline-block">
    <rect width="20" height="14" fill="#FCDD09"/>
    <rect y="1.55" width="20" height="1.56" fill="#DA121A"/>
    <rect y="4.66" width="20" height="1.56" fill="#DA121A"/>
    <rect y="7.77" width="20" height="1.56" fill="#DA121A"/>
    <rect y="10.88" width="20" height="1.56" fill="#DA121A"/>
  </svg>
)

const LANGS: { code: Lang; flag: React.ReactNode; short: string }[] = [
  { code: 'ca', flag: <CatalanFlag />, short: 'CA' },
  { code: 'es', flag: '🇪🇸', short: 'ES' },
  { code: 'en', flag: '🇬🇧', short: 'EN' },
]

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const current = LANGS.find(l => l.code === lang) ?? LANGS[0]
  const others = LANGS.filter(l => l.code !== lang)

  return (
    <div ref={ref} className="fixed top-[72px] right-3 z-50">
      {/* Pill trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 bg-green-dark/90 backdrop-blur-sm text-cream text-xs font-heading font-bold px-3 py-1.5 rounded-full shadow-md border border-cream/10 hover:bg-green-dark transition-colors"
        aria-label="Change language"
      >
        <span>{current.flag}</span>
        <span>{current.short}</span>
        <svg className={`w-3 h-3 opacity-60 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full right-0 mt-1.5 bg-parchment border border-wood/30 rounded-xl shadow-lg overflow-hidden min-w-[90px]">
          {others.map(({ code, flag, short }) => (
            <button
              key={code}
              onClick={() => { setLang(code); setOpen(false) }}
              className="flex items-center gap-2 w-full px-3 py-2.5 text-xs font-heading font-bold text-brown hover:bg-green-light/40 hover:text-green-dark transition-colors"
            >
              <span>{flag}</span>
              <span>{short}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
