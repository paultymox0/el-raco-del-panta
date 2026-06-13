'use client'

import BotanicalLeaf from '@/components/BotanicalLeaf'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

function ClockIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
    </svg>
  )
}

function PinIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={`${className} flex-shrink-0`} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  )
}

function RestaurantIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M3.75 21V7.5A2.25 2.25 0 016 5.25h12A2.25 2.25 0 0120.25 7.5V21M9 21V12m6 9V12M3.75 9h16.5" />
    </svg>
  )
}

function DirectionsIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>
  )
}

const DAYS_KEYS = [
  'day_monday',
  'day_tuesday',
  'day_wednesday',
  'day_thursday',
  'day_friday',
  'day_saturday',
  'day_sunday',
] as const

export default function InformacionContent() {
  const { lang } = useLanguage()

  return (
    <div className="pt-20 min-h-screen bg-parchment">
      {/* Header */}
      <div className="relative bg-green-dark py-16 px-4 text-center overflow-hidden">
        <BotanicalLeaf className="absolute top-4 left-4 w-16 h-24 opacity-20" />
        <BotanicalLeaf className="absolute top-4 right-4 w-16 h-24 opacity-20 scale-x-[-1]" />
        <h1 className="font-heading text-4xl md:text-5xl font-black text-cream">{t('info_title', lang)}</h1>
        <p className="mt-3 font-body text-cream/70 text-sm tracking-wide">El Racó del Pantà · Talarn, Lleida</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left: About + Map */}
          <div className="space-y-8">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-dark rounded-full flex items-center justify-center text-cream">
                  <RestaurantIcon />
                </div>
                <h2 className="font-heading text-3xl text-green-dark font-bold">{t('info_about_title', lang)}</h2>
              </div>
              <div className="space-y-4 font-body text-brown/80 text-base leading-relaxed">
                <p>{t('info_about_p1', lang)}</p>
                <p>{t('info_about_p2', lang)}</p>
              </div>
            </ScrollReveal>

            {/* Google Map */}
            <ScrollReveal>
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
              <a
                href="https://maps.app.goo.gl/tpbXkdwr8J6UPk6p9"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 w-full bg-green-dark hover:bg-green-mid text-cream font-body font-semibold text-sm py-3 px-5 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                <DirectionsIcon />
                {t('info_directions', lang)}
              </a>
            </ScrollReveal>
          </div>

          {/* Right: Hours + Contact */}
          <div className="space-y-6">

            {/* Hours */}
            <ScrollReveal>
              <div className="bg-cream rounded-2xl p-6 border border-wood/30 shadow-sm">
                <h3 className="font-heading text-xl font-bold text-green-dark mb-5 flex items-center gap-2">
                  <ClockIcon /> {t('info_hours_title', lang)}
                </h3>
                <div className="space-y-0 font-body text-sm divide-y divide-wood/10">
                  {DAYS_KEYS.map((key) => (
                    <div key={key} className="flex justify-between items-center py-2.5">
                      <span className="text-brown font-medium">{t(key, lang)}</span>
                      <span className="text-green-dark font-semibold tabular-nums">8:00 – 23:00</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-brown/50 font-body">{t('info_hours_note', lang)}</p>
              </div>
            </ScrollReveal>

            {/* Contact */}
            <ScrollReveal>
              <div className="bg-cream rounded-2xl p-6 border border-wood/30 shadow-sm">
                <h3 className="font-heading text-xl font-bold text-green-dark mb-5 flex items-center gap-2">
                  <PinIcon /> {t('info_contact_title', lang)}
                </h3>
                <div className="space-y-4 font-body text-sm text-brown">

                  {/* Address */}
                  <div className="flex gap-3 items-start">
                    <span className="text-green-mid mt-0.5"><PinIcon /></span>
                    <div>
                      <p className="font-medium">C-13, 91</p>
                      <p className="text-brown/70">25630 Talarn, Lleida, España</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-3 items-center">
                    <span className="text-green-mid"><PhoneIcon /></span>
                    <a
                      href="tel:+34633043077"
                      className="font-semibold text-green-dark hover:text-green-mid transition-colors duration-200 cursor-pointer"
                    >
                      +34 633 04 30 77
                    </a>
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href="https://wa.me/34633043077"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1fba58] text-white font-semibold text-sm py-3 px-5 rounded-xl transition-colors duration-200 cursor-pointer w-full justify-center"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {t('wa_message', lang)}
                  </a>
                </div>

                {/* Social links */}
                <div className="flex gap-4 mt-5 pt-4 border-t border-wood/30">
                  <a href="https://www.instagram.com/elracodelpanta" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-brown/50 hover:text-green-dark transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="https://www.tiktok.com/@elracodelpanta" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-brown/50 hover:text-green-dark transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>
                  </a>
                  <a href="https://wa.me/34633043077" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-brown/50 hover:text-green-dark transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}
