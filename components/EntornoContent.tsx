'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import BotanicalLeaf from '@/components/BotanicalLeaf'
import { ScrollReveal, StaggerGroup, StaggerItem } from '@/components/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

function MountainIcon() {
  return (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 48 48" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 40 L16 18 L24 28 L32 14 L44 40 Z" />
      <circle cx="32" cy="12" r="3" strokeWidth={1.4} />
    </svg>
  )
}

function WaterIcon() {
  return (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 48 48" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M24 6 C24 6 12 18 12 27 a12 12 0 0 0 24 0 C36 18 24 6 24 6 Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 30 Q21 27 24 30 Q27 33 30 30" opacity={0.6} />
    </svg>
  )
}

function FireIcon() {
  return (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 48 48" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M24 42 C14 42 10 34 12 26 C14 18 20 16 20 16 C20 22 24 24 24 24 C24 24 28 18 26 10 C32 14 36 22 34 30 C36 28 37 24 36 20 C40 24 38 36 24 42 Z" />
    </svg>
  )
}

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
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-xl transition-colors"
        aria-label="Cerrar"
      >
        ✕
      </button>

      {/* Counter */}
      <span className="absolute top-4 left-4 text-white/50 text-sm font-body">
        {current + 1} / {photos.length}
      </span>

      {/* Image */}
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

      {/* Prev */}
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
  const heroRef = useRef<HTMLDivElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  const features = [
    { icon: <MountainIcon />, title: t('entorn_mountains_title', lang), description: t('entorn_mountains_desc', lang) },
    { icon: <WaterIcon />,    title: t('entorn_water_title', lang),     description: t('entorn_water_desc', lang)     },
    { icon: <FireIcon />,     title: t('entorn_grill_title', lang),     description: t('entorn_grill_desc', lang)     },
  ]

  return (
    <div className="pt-20 min-h-screen bg-parchment">

      {/* Parallax Hero */}
      {/* 📸 Hero background: add photo as /public/entorno/hero-entorno.jpg */}
      {/* Any photo from the /public/entorno/ folder works as fallback   */}
      <div ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden bg-green-dark">
        {heroSrc ? (
          <motion.div style={{ y: bgY }} className="absolute inset-0 h-[130%] -top-[15%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroSrc}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ) : (
          /* No image yet — dark green gradient placeholder */
          <div className="absolute inset-0 bg-gradient-to-b from-green-dark via-[#1a3d1f] to-[#10200f]" />
        )}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <BotanicalLeaf className="w-16 h-24 mx-auto mb-4" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-4xl md:text-6xl font-black text-cream mb-4"
            >
              {t('entorn_hero_title', lang)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-cream/90 text-lg md:text-2xl"
            >
              {t('entorn_hero_subtitle', lang)}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <section className="py-14 sm:py-20 px-4 bg-parchment">
        <div className="max-w-6xl mx-auto">
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="bg-cream rounded-2xl p-8 text-center shadow-md border border-wood/20 hover:border-green-mid transition-colors duration-300"
                >
                  <div className="flex items-center justify-center w-20 h-20 bg-green-light/60 rounded-full mx-auto mb-5 text-green-dark">
                    {f.icon}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-green-dark mb-3">{f.title}</h3>
                  <p className="text-brown/70 font-body">{f.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* SVG Map */}
      <section className="py-16 px-4 bg-green-light/30">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
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
            <a
              href="https://maps.google.com/?q=El+Raco+del+Panta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-dark text-cream px-8 py-3 rounded-full font-heading font-bold hover:bg-green-mid transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t('entorn_directions', lang)}
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Photo gallery — masonry grid */}
      {photos.length > 0 && (
        <section className="py-14 sm:py-20 px-4 bg-parchment">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="font-heading text-3xl text-green-dark text-center mb-10">
                {t('entorn_photos_title', lang)}
              </h2>
            </ScrollReveal>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {photos.map((src, i) => (
                <motion.div
                  key={src}
                  className="break-inside-avoid relative group overflow-hidden rounded-2xl cursor-zoom-in"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
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
