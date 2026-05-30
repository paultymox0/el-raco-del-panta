'use client'

import LocalImage from '@/components/LocalImage'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

type Photo = { src: string; ca: string; es: string; en: string }
type PhotoCategory = 'local' | 'platos' | 'entorno'

const photos: Record<PhotoCategory, Photo[]> = {
  local: [
    { src: '/fotos/local/foto-1.jpg', ca: 'Saló principal',       es: 'Salón principal',       en: 'Main dining room'      },
    { src: '/fotos/local/foto-2.jpg', ca: 'Terrassa amb vistes',  es: 'Terraza con vistas',    en: 'Terrace with views'    },
    { src: '/fotos/local/foto-3.jpg', ca: 'Barra de fusta',       es: 'Barra de madera',       en: 'Wooden bar'            },
    { src: '/fotos/local/foto-4.jpg', ca: 'Ambient acollidor',    es: 'Ambiente acogedor',     en: 'Cosy atmosphere'       },
    { src: '/fotos/local/foto-5.jpg', ca: 'Detall decoració',     es: 'Detalle decoración',    en: 'Décor detail'          },
    { src: '/fotos/local/foto-6.jpg', ca: 'Entrada del restaurant', es: 'Entrada del restaurante', en: 'Restaurant entrance' },
  ],
  platos: [
    { src: '/fotos/platos/foto-1.jpg', ca: 'Xuletó a la brasa',  es: 'Chuletón a la brasa',   en: 'T-bone on the grill'   },
    { src: '/fotos/platos/foto-2.jpg', ca: "Taula d'ibèrics",    es: 'Tabla de ibéricos',     en: 'Ibérico board'         },
    { src: '/fotos/platos/foto-3.jpg', ca: 'Pop a la gallega',   es: 'Pulpo a la gallega',    en: 'Galician-style octopus'},
    { src: '/fotos/platos/foto-4.jpg', ca: 'Crema catalana',     es: 'Crema catalana',        en: 'Crema catalana'        },
    { src: '/fotos/platos/foto-5.jpg', ca: 'Gambes a l\'all',    es: 'Gambas al ajillo',      en: 'Garlic prawns'         },
    { src: '/fotos/platos/foto-6.jpg', ca: 'Patates braves',     es: 'Patatas bravas',        en: 'Spicy potatoes'        },
  ],
  entorno: [
    { src: '/fotos/entorno/foto-1.jpg', ca: 'El pantà',          es: 'El pantano',            en: 'The reservoir'         },
    { src: '/fotos/entorno/foto-2.jpg', ca: 'Les muntanyes',     es: 'Las montañas',          en: 'The mountains'         },
    { src: '/fotos/entorno/foto-3.jpg', ca: 'Posta de sol',      es: 'Atardecer',             en: 'Sunset'                },
    { src: '/fotos/entorno/foto-4.jpg', ca: 'Vistes des de la terrassa', es: 'Vistas desde la terraza', en: 'Views from the terrace' },
    { src: '/fotos/entorno/foto-5.jpg', ca: 'Paisatge de tardor', es: 'Paisaje otoñal',       en: 'Autumn landscape'      },
    { src: '/fotos/entorno/foto-6.jpg', ca: 'Alba al pantà',     es: 'Amanecer en el pantano', en: 'Sunrise at the reservoir' },
  ],
}

const filterKeys: PhotoCategory[] = ['local', 'platos', 'entorno']
const filterIcons: Record<PhotoCategory, string> = { local: '🏠', platos: '🍽️', entorno: '🏔️' }

export default function FotosContent() {
  const { lang } = useLanguage()

  const filterLabels: Record<PhotoCategory, string> = {
    local:   t('fotos_filter_local',  lang),
    platos:  t('fotos_filter_platos', lang),
    entorno: t('fotos_filter_entorn', lang),
  }

  return (
    <div className="pt-20 min-h-screen bg-parchment">
      <div className="bg-green-dark py-16 px-4 text-center">
        <h1 className="font-heading text-5xl font-black text-cream mb-3">{t('fotos_title', lang)}</h1>
        <p className="text-cream/70 font-body">{t('fotos_subtitle', lang)}</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {filterKeys.map((key) => (
          <div key={key} className="mb-16">
            <h2 className="font-heading text-2xl text-green-dark font-bold mb-6 flex items-center gap-3">
              <span>{filterLabels[key]}</span>
              <div className="flex-1 h-px bg-wood" />
            </h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {photos[key].map((photo) => (
                <div key={photo.src} className="break-inside-avoid relative group overflow-hidden rounded-xl">
                  <LocalImage src={photo.src} alt={photo[lang]} className="w-full min-h-48 object-cover transition-transform duration-500 group-hover:scale-110" icon={filterIcons[key]} />
                  <div className="absolute inset-0 bg-green-dark/0 group-hover:bg-green-dark/60 transition-all duration-300 flex items-end">
                    <p className="text-cream font-body font-semibold px-4 py-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      {photo[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-16 px-4 bg-green-light/30">
        <p className="font-body text-brown/70 mb-4">{t('fotos_ig_cta_text', lang)}</p>
        <a href="https://www.instagram.com/elracodelpanta" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-dark text-cream px-8 py-3 rounded-full font-heading font-bold hover:bg-green-mid transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          @elracodelpanta
        </a>
      </div>
    </div>
  )
}
