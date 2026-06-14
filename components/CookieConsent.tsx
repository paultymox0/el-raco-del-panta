'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useConsent } from '@/lib/ConsentContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { X, Cookie } from 'lucide-react'

const copy = {
  title: { ca: 'Galetes', es: 'Cookies', en: 'Cookies' },
  body: {
    ca: 'Fem servir galetes pròpies necessàries per al funcionament del lloc web i de tercers (Google Maps, Trustindex) per millorar la teva experiència. Pots acceptar-les totes, rebutjar-les o configurar-les.',
    es: 'Usamos cookies propias necesarias para el funcionamiento del sitio y de terceros (Google Maps, Trustindex) para mejorar tu experiencia. Puedes aceptarlas todas, rechazarlas o configurarlas.',
    en: 'We use strictly necessary cookies for the site to work and third-party cookies (Google Maps, Trustindex) to enhance your experience. You can accept all, reject, or configure them.',
  },
  accept: { ca: 'Acceptar tot', es: 'Aceptar todo', en: 'Accept all' },
  reject: { ca: 'Rebutjar', es: 'Rechazar', en: 'Reject all' },
  configure: { ca: 'Configurar', es: 'Configurar', en: 'Configure' },
  policy: { ca: 'Política de galetes', es: 'Política de cookies', en: 'Cookie policy' },
  save: { ca: 'Desar preferències', es: 'Guardar preferencias', en: 'Save preferences' },
  necessary: { ca: 'Necessàries', es: 'Necesarias', en: 'Necessary' },
  necessaryDesc: {
    ca: 'Sempre actives. Necessàries per al funcionament del lloc.',
    es: 'Siempre activas. Necesarias para el funcionamiento del sitio.',
    en: 'Always on. Required for the site to function.',
  },
  analytics: { ca: 'Analítica', es: 'Analítica', en: 'Analytics' },
  analyticsDesc: {
    ca: 'Vercel Analytics (sense cookies, respectuós amb la privacitat).',
    es: 'Vercel Analytics (sin cookies, respetuoso con la privacidad).',
    en: 'Vercel Analytics (cookieless, privacy-friendly).',
  },
  thirdParty: { ca: 'Tercers', es: 'Terceros', en: 'Third-party' },
  thirdPartyDesc: {
    ca: 'Google Maps i Trustindex per mostrar mapes i ressenyes.',
    es: 'Google Maps y Trustindex para mostrar mapas y reseñas.',
    en: 'Google Maps and Trustindex for maps and reviews.',
  },
}

export default function CookieConsent() {
  const { bannerOpen, acceptAll, rejectAll, savePartial } = useConsent()
  const { lang } = useLanguage()
  const [configMode, setConfigMode] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [thirdParty, setThirdParty] = useState(false)

  if (!bannerOpen) return null

  if (configMode) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={copy.configure[lang]}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative bg-[#1a3d1f] text-[#f5ead6] rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8 font-body">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-xl font-bold flex items-center gap-2">
              <Cookie size={20} strokeWidth={1.5} />
              {copy.configure[lang]}
            </h2>
            <button onClick={() => setConfigMode(false)} aria-label="Cerrar" className="text-[#f5ead6]/60 hover:text-[#f5ead6] transition-colors p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5ead6]/40 cursor-pointer">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {/* Necessary — always on */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5">
              <div>
                <p className="font-semibold text-sm">{copy.necessary[lang]}</p>
                <p className="text-[#f5ead6]/60 text-xs mt-1 leading-relaxed">{copy.necessaryDesc[lang]}</p>
              </div>
              <div className="flex-shrink-0 mt-0.5">
                <span className="inline-block bg-[#f5ead6]/20 text-[#f5ead6]/60 text-xs px-2 py-1 rounded-full font-medium">✓</span>
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5">
              <div>
                <p className="font-semibold text-sm">{copy.analytics[lang]}</p>
                <p className="text-[#f5ead6]/60 text-xs mt-1 leading-relaxed">{copy.analyticsDesc[lang]}</p>
              </div>
              <button
                role="switch"
                aria-checked={analytics}
                onClick={() => setAnalytics(!analytics)}
                className={`flex-shrink-0 mt-0.5 w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f5ead6]/40 ${analytics ? 'bg-green-400' : 'bg-white/20'}`}
              >
                <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 m-0.5 ${analytics ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Third-party */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5">
              <div>
                <p className="font-semibold text-sm">{copy.thirdParty[lang]}</p>
                <p className="text-[#f5ead6]/60 text-xs mt-1 leading-relaxed">{copy.thirdPartyDesc[lang]}</p>
              </div>
              <button
                role="switch"
                aria-checked={thirdParty}
                onClick={() => setThirdParty(!thirdParty)}
                className={`flex-shrink-0 mt-0.5 w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f5ead6]/40 ${thirdParty ? 'bg-green-400' : 'bg-white/20'}`}
              >
                <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 m-0.5 ${thirdParty ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          <button
            onClick={() => savePartial({ analytics, thirdParty })}
            className="w-full bg-[#f5ead6] text-[#1a3d1f] font-heading font-bold text-sm py-3 rounded-xl hover:bg-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            {copy.save[lang]}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] p-4 sm:p-6" role="region" aria-label="Cookie consent">
      <div className="max-w-3xl mx-auto bg-[#1a3d1f] text-[#f5ead6] rounded-2xl shadow-2xl p-5 sm:p-6 font-body">
        <div className="flex items-start gap-3 mb-4">
          <Cookie size={20} strokeWidth={1.5} className="flex-shrink-0 mt-0.5 opacity-70" />
          <div>
            <h2 className="font-heading font-bold text-base mb-1">{copy.title[lang]}</h2>
            <p className="text-[#f5ead6]/75 text-sm leading-relaxed">{copy.body[lang]}</p>
            <Link href="/cookies" className="text-[#f5ead6]/60 hover:text-[#f5ead6] text-xs underline underline-offset-2 mt-1 inline-block transition-colors">
              {copy.policy[lang]}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <button
            onClick={rejectAll}
            className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#f5ead6] font-semibold text-sm transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f5ead6]/40"
          >
            {copy.reject[lang]}
          </button>
          <button
            onClick={() => setConfigMode(true)}
            className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#f5ead6] font-semibold text-sm transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f5ead6]/40"
          >
            {copy.configure[lang]}
          </button>
          <button
            onClick={acceptAll}
            className="py-2.5 px-3 rounded-xl bg-[#f5ead6] text-[#1a3d1f] font-semibold text-sm hover:bg-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            {copy.accept[lang]}
          </button>
        </div>
      </div>
    </div>
  )
}
