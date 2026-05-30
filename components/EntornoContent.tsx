'use client'

import BotanicalLeaf from '@/components/BotanicalLeaf'
import LocalImage from '@/components/LocalImage'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

const naturePhotos = [
  { src: '/entorno/entorno-1.jpg' },
  { src: '/entorno/entorno-2.jpg' },
  { src: '/entorno/entorno-3.jpg' },
  { src: '/entorno/entorno-4.jpg' },
]

export default function EntornoContent() {
  const { lang } = useLanguage()

  const features = [
    { emoji: '🏔️', title: t('entorn_mountains_title', lang), description: t('entorn_mountains_desc', lang) },
    { emoji: '💧', title: t('entorn_water_title', lang),     description: t('entorn_water_desc', lang)     },
    { emoji: '🔥', title: t('entorn_grill_title', lang),     description: t('entorn_grill_desc', lang)     },
  ]

  return (
    <div className="pt-20 min-h-screen bg-parchment">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden bg-green-dark">
        <LocalImage src="/entorno/hero-entorno.jpg" alt={t('entorn_hero_title', lang)} className="w-full h-full object-cover" icon="🏔️" />
        <div className="absolute inset-0 bg-green-dark/50 flex items-center justify-center">
          <div className="text-center px-4">
            <BotanicalLeaf className="w-16 h-24 opacity-40 mx-auto mb-4" />
            <h1 className="font-heading text-5xl md:text-6xl font-black text-cream mb-4">{t('entorn_hero_title', lang)}</h1>
            <p className="font-body text-cream/90 text-xl md:text-2xl">{t('entorn_hero_subtitle', lang)}</p>
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <section className="py-20 px-4 bg-parchment">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-cream rounded-2xl p-8 text-center shadow-md border border-wood/20 hover:border-green-mid hover:-translate-y-1 transition-all duration-300">
                <div className="text-5xl mb-4">{f.emoji}</div>
                <h3 className="font-heading text-2xl font-bold text-green-dark mb-3">{f.title}</h3>
                <p className="text-brown/70 font-body">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SVG Map */}
      <section className="py-16 px-4 bg-green-light/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-green-dark font-bold mb-8">{t('entorn_map_title', lang)}</h2>
          <div className="bg-cream rounded-3xl p-8 shadow-lg border border-wood/30 mb-6">
            <svg viewBox="0 0 400 300" className="w-full max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="300" fill="#d4e8d0" rx="12" />
              <polygon points="0,200 60,100 120,160 180,80 240,150 300,90 360,140 400,120 400,200" fill="#4a7c3f" opacity="0.8" />
              <polygon points="0,200 60,130 120,180 160,110 220,170 260,120 320,160 400,140 400,200" fill="#1a3d1f" opacity="0.6" />
              <ellipse cx="200" cy="240" rx="180" ry="50" fill="#7ec8e3" opacity="0.7" />
              <ellipse cx="200" cy="240" rx="160" ry="40" fill="#5ab4d4" opacity="0.5" />
              <path d="M60,235 Q100,225 140,235 Q180,245 220,235 Q260,225 300,235 Q340,245 340,235" stroke="white" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M80,248 Q120,238 160,248 Q200,258 240,248 Q280,238 320,248" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" />
              <circle cx="200" cy="190" r="14" fill="#1a3d1f" />
              <circle cx="200" cy="190" r="8" fill="#f5ead6" />
              <circle cx="200" cy="190" r="4" fill="#1a3d1f" />
              <line x1="200" y1="204" x2="200" y2="215" stroke="#1a3d1f" strokeWidth="2" />
              <rect x="150" y="158" width="100" height="22" rx="11" fill="#1a3d1f" />
              <text x="200" y="173" textAnchor="middle" fill="#f5ead6" fontSize="9" fontFamily="serif">El Racó del Pantà</text>
              <circle cx="80" cy="185" r="12" fill="#4a7c3f" opacity="0.8" />
              <circle cx="100" cy="178" r="10" fill="#4a7c3f" opacity="0.8" />
              <circle cx="300" cy="183" r="12" fill="#4a7c3f" opacity="0.8" />
              <circle cx="320" cy="176" r="10" fill="#4a7c3f" opacity="0.8" />
            </svg>
            <p className="font-body text-brown/70 mt-4 text-sm">{t('entorn_map_caption', lang)}</p>
          </div>
          <a href="https://maps.google.com/?q=El+Raco+del+Panta" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-dark text-cream px-8 py-3 rounded-full font-heading font-bold hover:bg-green-mid transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {t('entorn_directions', lang)}
          </a>
        </div>
      </section>

      {/* Photo grid */}
      <section className="py-20 px-4 bg-parchment">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl text-green-dark text-center mb-10">{t('entorn_photos_title', lang)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {naturePhotos.map((photo) => (
              <div key={photo.src} className="relative overflow-hidden rounded-2xl group">
                <LocalImage src={photo.src} alt="" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" icon="🏔️" />
                <div className="absolute inset-0 bg-green-dark/0 group-hover:bg-green-dark/30 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
