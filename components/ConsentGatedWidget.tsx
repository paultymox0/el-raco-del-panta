'use client'

import { useEffect, useRef } from 'react'
import { useConsent } from '@/lib/ConsentContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'
import { Star } from 'lucide-react'

type Props = {
  widgetId: string
  scriptSrc: string
}

export default function ConsentGatedWidget({ widgetId, scriptSrc }: Props) {
  const { consent, savePartial } = useConsent()
  const { lang } = useLanguage()
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!consent.thirdParty) return
    if (!widgetRef.current) return
    const existing = document.querySelector(`script[src*="${widgetId}"]`)
    if (existing) return
    const script = document.createElement('script')
    script.src = scriptSrc
    script.defer = true
    script.async = true
    widgetRef.current.after(script)
  }, [consent.thirdParty, widgetId, scriptSrc])

  if (!consent.thirdParty) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10 text-center bg-cream rounded-2xl border border-wood/30">
        <Star size={36} strokeWidth={1.2} className="text-green-dark/40" />
        <div>
          <p className="font-heading font-bold text-green-dark mb-1">{t('consent_reviews_title', lang)}</p>
          <p className="font-body text-brown/60 text-sm leading-relaxed max-w-xs">{t('consent_reviews_body', lang)}</p>
        </div>
        <button
          onClick={() => savePartial({ analytics: consent.analytics, thirdParty: true })}
          className="bg-green-dark text-cream font-body font-semibold text-sm py-2.5 px-6 rounded-xl hover:bg-green-mid transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-dark/40"
        >
          {t('consent_reviews_btn', lang)}
        </button>
      </div>
    )
  }

  return <div ref={widgetRef} data-widget-id={widgetId}></div>
}
