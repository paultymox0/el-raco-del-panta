'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

type Especial = { nom: string; descripcio: string; preu: string }

type Props = {
  fecha: string
  especials: Especial[]
  nota: string
}

export default function EspecialsDelDia({ fecha, especials, nota }: Props) {
  const { lang } = useLanguage()

  return (
    <section className="chalkboard-bg py-16 px-4 relative overflow-hidden">
      {/* Background chalk doodles */}
      <div className="absolute top-5 left-5 text-white/6 text-6xl pointer-events-none select-none">★</div>
      <div className="absolute top-8 right-10 text-white/5 text-5xl pointer-events-none select-none">✦</div>
      <div className="absolute bottom-10 left-14 text-white/5 text-4xl pointer-events-none select-none">✦</div>
      <div className="absolute bottom-6 right-8 text-white/6 text-5xl pointer-events-none select-none">★</div>
      <div className="absolute top-1/2 left-4 -translate-y-1/2 text-white/4 text-3xl pointer-events-none select-none">🍴</div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2 text-white/4 text-3xl pointer-events-none select-none">🍴</div>

      <div className="max-w-4xl mx-auto relative">
        <div
          className="border-2 border-white/25 rounded-lg p-8 md:p-12 relative"
          style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05)' }}
        >
          {/* Corner chalk marks */}
          <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-white/35 rounded-tl" />
          <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-white/35 rounded-tr" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 border-white/35 rounded-bl" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-white/35 rounded-br" />

          {/* Date */}
          <p className="absolute top-5 right-8 font-chalk text-white/50 text-sm italic">{fecha}</p>

          {/* Title */}
          <h1
            className="font-chalk text-4xl md:text-5xl text-white text-center font-bold mb-2"
            style={{ textShadow: '0 0 24px rgba(255,255,255,0.12)' }}
          >
            ✨ {t('especials_title', lang)}
          </h1>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 border-b border-dashed border-white/20" />
            <span className="font-chalk text-white/30 text-sm tracking-widest">✦ ✦ ✦</span>
            <div className="flex-1 border-b border-dashed border-white/20" />
          </div>

          {/* Especial cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {especials.map((e, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/15 rounded-xl p-5 flex flex-col gap-2"
                style={{ boxShadow: 'inset 0 0 20px rgba(0,0,0,0.15)' }}
              >
                <h2
                  className="font-chalk text-xl text-white font-bold leading-snug"
                  style={{ textShadow: '0 0 12px rgba(255,255,255,0.1)' }}
                >
                  {e.nom}
                </h2>
                <p className="font-chalk text-white/65 text-sm italic leading-relaxed flex-1">
                  {e.descripcio}
                </p>
                <span
                  className="self-end font-chalk text-2xl text-white font-bold mt-2"
                  style={{ textShadow: '0 0 20px rgba(255,255,255,0.18)' }}
                >
                  {e.preu}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 border-b border-dashed border-white/20" />
            <span className="font-chalk text-white/30 text-sm tracking-widest">✦ ✦ ✦</span>
            <div className="flex-1 border-b border-dashed border-white/20" />
          </div>

          <p className="font-chalk text-white/45 text-center text-sm italic">
            {nota}
          </p>
        </div>
      </div>
    </section>
  )
}
