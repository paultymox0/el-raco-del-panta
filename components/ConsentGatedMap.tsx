'use client'

import { useConsent } from '@/lib/ConsentContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'
import { MapPin } from 'lucide-react'

export default function ConsentGatedMap() {
  const { consent, savePartial } = useConsent()
  const { lang } = useLanguage()

  if (!consent.thirdParty) {
    return (
      <div className="rounded-2xl overflow-hidden border border-wood/30 bg-cream flex flex-col items-center justify-center gap-4 p-8 text-center" style={{ height: 300 }}>
        <MapPin size={40} strokeWidth={1.2} className="text-green-dark/40" />
        <div>
          <p className="font-heading font-bold text-green-dark mb-1">{t('consent_map_title', lang)}</p>
          <p className="font-body text-brown/60 text-sm leading-relaxed max-w-xs">{t('consent_map_body', lang)}</p>
        </div>
        <button
          onClick={() => savePartial({ analytics: consent.analytics, thirdParty: true })}
          className="bg-green-dark text-cream font-body font-semibold text-sm py-2.5 px-6 rounded-xl hover:bg-green-mid transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-dark/40"
        >
          {t('consent_map_btn', lang)}
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-wood/30 shadow-md" style={{ height: 300 }}>
      <iframe
        title="Ubicació El Racó del Pantà"
        src="https://www.google.com/maps?q=C-13+91+25630+Talarn+Lleida&output=embed"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
