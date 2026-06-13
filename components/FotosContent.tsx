'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LocalImage from '@/components/LocalImage'
import { StaggerGroup, StaggerItem } from '@/components/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

type Photo = { src: string; ca: string; es: string; en: string }
type PhotoCategory = 'local' | 'platos' | 'entorno'

const photos: Record<PhotoCategory, Photo[]> = {
  local: [
    { src: '/fotos/local/foto-1.jpg', ca: 'Saló principal',         es: 'Salón principal',           en: 'Main dining room'            },
    { src: '/fotos/local/foto-2.jpg', ca: 'Terrassa amb vistes',    es: 'Terraza con vistas',        en: 'Terrace with views'          },
    { src: '/fotos/local/foto-3.jpg', ca: 'Barra de fusta',         es: 'Barra de madera',           en: 'Wooden bar'                  },
    { src: '/fotos/local/foto-4.jpg', ca: 'Ambient acollidor',      es: 'Ambiente acogedor',         en: 'Cosy atmosphere'             },
    { src: '/fotos/local/foto-5.jpg', ca: 'Detall decoració',       es: 'Detalle decoración',        en: 'Décor detail'                },
    { src: '/fotos/local/foto-6.jpg', ca: 'Entrada del restaurant', es: 'Entrada del restaurante',   en: 'Restaurant entrance'         },
  ],
  platos: [
    { src: '/fotos/platos/foto-1.jpg', ca: 'Xuletó a la brasa',    es: 'Chuletón a la brasa',       en: 'T-bone on the grill'         },
    { src: '/fotos/platos/foto-2.jpg', ca: "Taula d'ibèrics",      es: 'Tabla de ibéricos',         en: 'Ibérico board'               },
    { src: '/fotos/platos/foto-3.jpg', ca: 'Pop a la gallega',     es: 'Pulpo a la gallega',        en: 'Galician-style octopus'      },
    { src: '/fotos/platos/foto-4.jpg', ca: 'Crema catalana',       es: 'Crema catalana',            en: 'Crema catalana'              },
    { src: '/fotos/platos/foto-5.jpg', ca: "Gambes a l'all",       es: 'Gambas al ajillo',          en: 'Garlic prawns'               },
    { src: '/fotos/platos/foto-6.jpg', ca: 'Patates braves',       es: 'Patatas bravas',            en: 'Spicy potatoes'              },
  ],
  entorno: [
    { src: '/fotos/entorno/foto-1.jpg', ca: 'El pantà',            es: 'El pantano',                en: 'The reservoir'               },
    { src: '/fotos/entorno/foto-2.jpg', ca: 'Les muntanyes',       es: 'Las montañas',              en: 'The mountains'               },
    { src: '/fotos/entorno/foto-3.jpg', ca: 'Posta de sol',        es: 'Atardecer',                 en: 'Sunset'                      },
    { src: '/fotos/entorno/foto-4.jpg', ca: 'Vistes des de la terrassa', es: 'Vistas desde la terraza', en: 'Views from the terrace' },
    { src: '/fotos/entorno/foto-5.jpg', ca: 'Paisatge de tardor',  es: 'Paisaje otoñal',            en: 'Autumn landscape'            },
    { src: '/fotos/entorno/foto-6.jpg', ca: 'Alba al pantà',       es: 'Amanecer en el pantano',    en: 'Sunrise at the reservoir'    },
  ],
}

const filterKeys: PhotoCategory[] = ['local', 'platos', 'entorno']
const filterIcons: Record<PhotoCategory, string> = { local: '🏠', platos: '🍽️', entorno: '🏔️' }

type LightboxState = { photos: Photo[]; index: number }

export default function FotosContent() {
  const { lang } = useLanguage()
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  const filterLabels: Record<PhotoCategory, string> = {
    local:   t('fotos_filter_local',  lang),
    platos:  t('fotos_filter_platos', lang),
    entorno: t('fotos_filter_entorn', lang),
  }

  const openLightbox = (category: PhotoCategory, index: number) =>
    setLightbox({ photos: photos[category], index })
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prev = useCallback(() =>
    setLightbox((lb) => lb ? { ...lb, index: (lb.index - 1 + lb.photos.length) % lb.photos.length } : lb), [])
  const next = useCallback(() =>
    setLightbox((lb) => lb ? { ...lb, index: (lb.index + 1) % lb.photos.length } : lb), [])

  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, closeLightbox, prev, next])

  const currentPhoto = lightbox ? lightbox.photos[lightbox.index] : null

  return (
    <div className="pt-20 min-h-screen bg-parchment">
      <div className="bg-green-dark py-16 px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-black text-cream mb-3">{t('fotos_title', lang)}</h1>
        <p className="text-cream/70 font-body">{t('fotos_subtitle', lang)}</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {filterKeys.map((key) => (
          <div key={key} className="mb-16">
            <h2 className="font-heading text-2xl text-green-dark font-bold mb-6 flex items-center gap-3">
              <span>{filterLabels[key]}</span>
              <div className="flex-1 h-px bg-wood" />
            </h2>
            <StaggerGroup className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {photos[key].map((photo, idx) => (
                <StaggerItem key={photo.src}>
                  <motion.div
                    className="break-inside-avoid relative group overflow-hidden rounded-xl cursor-zoom-in"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    onClick={() => openLightbox(key, idx)}
                  >
                    <LocalImage
                      src={photo.src}
                      alt={photo[lang]}
                      className="w-full min-h-48 object-cover transition-transform duration-500 group-hover:scale-108"
                      icon={filterIcons[key]}
                    />
                    <div className="absolute inset-0 bg-green-dark/0 group-hover:bg-green-dark/60 transition-all duration-300 flex items-end">
                      <p className="text-cream font-body font-semibold px-4 py-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                        {photo[lang]}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        ))}
      </div>

      <div className="text-center py-16 px-4 bg-green-light/30">
        <p className="font-body text-brown/70 mb-4">{t('fotos_ig_cta_text', lang)}</p>
        <motion.a
          href="https://www.instagram.com/elracodelpanta"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 bg-green-dark text-cream px-8 py-3 rounded-full font-heading font-bold hover:bg-green-mid transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          @elracodelpanta
        </motion.a>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Tancar"
            >
              ✕
            </button>

            {/* Prev button */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Anterior"
            >
              ‹
            </button>

            {/* Image */}
            <motion.div
              key={lightbox.index}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="relative max-w-4xl max-h-[85vh] mx-16 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentPhoto.src}
                alt={currentPhoto[lang]}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '' }}
              />
              <p className="text-white/80 font-body mt-3 text-sm">{currentPhoto[lang]}</p>
              <p className="text-white/40 text-xs mt-1">{lightbox.index + 1} / {lightbox.photos.length}</p>
            </motion.div>

            {/* Next button */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Següent"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
