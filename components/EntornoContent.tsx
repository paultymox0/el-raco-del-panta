'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Mountain, Waves, Flame, MapPin } from 'lucide-react'
import BotanicalLeaf from '@/components/BotanicalLeaf'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

const MAPS_URL = 'https://maps.app.goo.gl/tpbXkdwr8J6UPk6p9'

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({ photos, index, onClose }: {
  photos: string[]
  index: number
  onClose: () => void
}) {
  const [current, setCurrent] = useState(index)
  const swipeStart = useRef<number | null>(null)

  const goPrev = useCallback(() => setCurrent(i => (i - 1 + photos.length) % photos.length), [photos.length])
  const goNext = useCallback(() => setCurrent(i => (i + 1) % photos.length), [photos.length])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext, onClose])

  function handlePointerDown(e: React.PointerEvent) {
    swipeStart.current = e.clientX
  }
  function handlePointerUp(e: React.PointerEvent) {
    if (swipeStart.current === null) return
    const delta = swipeStart.current - e.clientX
    if (Math.abs(delta) > 50) {
      if (delta > 0) goNext()
      else goPrev()
    }
    swipeStart.current = null
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-xl transition-colors"
        aria-label="Cerrar"
      >
        ✕
      </button>

      <span className="absolute top-4 left-4 text-white/50 text-sm font-body">
        {current + 1} / {photos.length}
      </span>

      <motion.img
        key={current}
        src={photos[current]}
        alt=""
        className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()}
      />

      {photos.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); goPrev() }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white text-2xl flex items-center justify-center transition-colors"
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            onClick={e => { e.stopPropagation(); goNext() }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white text-2xl flex items-center justify-center transition-colors"
            aria-label="Siguiente"
          >
            ›
          </button>
        </>
      )}
    </motion.div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function EntornoContent({ photos = [], heroSrc = null }: { photos: string[]; heroSrc?: string | null }) {
  const { lang } = useLanguage()
  const reduce = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  const story = [
    { Icon: Mountain, title: t('entorn_mountains_title', lang), description: t('entorn_mountains_desc', lang) },
    { Icon: Waves,    title: t('entorn_water_title', lang),     description: t('entorn_water_desc', lang)     },
    { Icon: Flame,    title: t('entorn_grill_title', lang),     description: t('entorn_grill_desc', lang)     },
  ]

  const [lead, ...rest] = photos

  return (
    <div className="min-h-screen bg-parchment">

      {/* ── Parallax photo hero (full-bleed) ── */}
      <section ref={heroRef} className="relative h-[78vh] min-h-[520px] overflow-hidden bg-green-dark">
        {heroSrc ? (
          <motion.div style={{ y: reduce ? 0 : bgY }} className="absolute inset-0 h-[125%] -top-[12%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroSrc} alt="" aria-hidden="true" className="w-full h-full object-cover" />
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-green-dark via-[#1a3d1f] to-[#10200f]" />
        )}
        {/* Scrim for nav + headline legibility, fading into the parchment page */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/65" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-parchment" />

        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <BotanicalLeaf className="w-14 h-20 mx-auto mb-5" />
            </motion.div>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-5xl md:text-7xl font-black text-cream mb-4 leading-[1.05]"
              style={{ textShadow: '0 2px 28px rgba(0,0,0,0.6)' }}
            >
              {t('entorn_hero_title', lang)}
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-body italic text-cream/85 text-lg md:text-2xl max-w-xl mx-auto"
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
            >
              {t('entorn_hero_subtitle', lang)}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Gallery: photos are the protagonists ── */}
      {photos.length > 0 && (
        <section className="px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-3xl md:text-5xl font-black text-green-dark text-center mb-12"
            >
              {t('entorn_photos_title', lang)}
            </motion.h2>

            {lead && (
              <motion.button
                type="button"
                onClick={() => setLightboxIndex(0)}
                aria-label={t('entorn_photos_title', lang)}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group relative block w-full overflow-hidden rounded-3xl cursor-zoom-in shadow-[0_24px_60px_-28px_rgba(22,38,26,0.55)] mb-4 md:mb-5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lead} alt="" className="w-full h-[44vh] md:h-[62vh] object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </motion.button>
            )}

            {rest.length > 0 && (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 [&>*]:mb-4 md:[&>*]:mb-5">
                {rest.map((src, i) => {
                  const idx = i + 1
                  return (
                    <motion.button
                      type="button"
                      key={src}
                      onClick={() => setLightboxIndex(idx)}
                      aria-label={t('entorn_photos_title', lang)}
                      initial={reduce ? false : { opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl cursor-zoom-in shadow-[0_12px_30px_-18px_rgba(22,38,26,0.4)]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" loading="lazy" className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                    </motion.button>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Story band: mountains · water · grill ── */}
      <section className="px-4 sm:px-6 py-16 md:py-20 bg-green-dark">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-cream/15">
          {story.map((s, i) => (
            <motion.div
              key={s.title}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="px-6 md:px-8 py-8 md:py-4 text-center"
            >
              <s.Icon className="w-9 h-9 mx-auto mb-4 text-amber-300/90" strokeWidth={1.4} aria-hidden />
              <h3 className="font-heading text-2xl font-bold text-cream mb-2">{s.title}</h3>
              <p className="font-body text-cream/65 text-[15px] leading-relaxed max-w-xs mx-auto">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Location / directions ── */}
      <section className="px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-3xl md:text-4xl font-black text-green-dark mb-8"
          >
            {t('entorn_map_title', lang)}
          </motion.h2>

          <div className="max-w-xl mx-auto rounded-3xl overflow-hidden bg-cream border border-wood/15 shadow-[0_24px_60px_-30px_rgba(22,38,26,0.5)]">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden"
              aria-label={t('entorn_directions', lang)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/entorno/donde-estamos.jpg"
                alt={t('entorn_map_caption', lang)}
                className="w-full h-72 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 inline-flex items-center gap-2 bg-cream text-green-dark px-5 py-2.5 rounded-full font-heading font-bold text-sm shadow-lg">
                  <MapPin className="w-4 h-4" strokeWidth={2.2} aria-hidden />
                  {t('entorn_directions', lang)}
                </span>
              </div>
            </a>
            <p className="font-body text-brown/65 px-5 py-4 text-sm">{t('entorn_map_caption', lang)}</p>
          </div>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-green-dark text-cream px-8 py-3.5 rounded-full font-heading font-bold shadow-md transition-all duration-300 hover:bg-green-mid hover:-translate-y-0.5"
          >
            <MapPin className="w-5 h-5" strokeWidth={2.2} aria-hidden />
            {t('entorn_directions', lang)}
          </a>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

    </div>
  )
}
