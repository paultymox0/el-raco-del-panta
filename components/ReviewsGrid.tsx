'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

// TODO: reemplazar con reseñas reales del negocio
// (placeholder hasta conectar Google Places API o pegar reseñas reales)
const REVIEWS: { name: string; stars: number; text: string; date: string }[] = [
  {
    name: 'María',
    stars: 5,
    text: 'Comimos de maravilla. Las vistas al pantano son espectaculares y el trato muy cercano. Volveremos seguro.',
    date: 'Hace 2 semanas',
  },
  {
    name: 'Jordi',
    stars: 5,
    text: 'La brasa es de otro nivel. Carne en su punto y producto de primera. Un rincón con mucho encanto.',
    date: 'Hace 1 mes',
  },
  {
    name: 'Laura',
    stars: 5,
    text: 'Sitio precioso para comer con tranquilidad. Las tapas riquísimas y el postre casero espectacular.',
    date: 'Hace 3 semanas',
  },
  {
    name: 'Carlos',
    stars: 5,
    text: 'Ambiente acogedor y comida excelente. Perfecto para una comida en familia junto al agua.',
    date: 'Hace 1 mes',
  },
]

const GOOGLE_REVIEWS_URL = 'https://maps.app.goo.gl/tpbXkdwr8J6UPk6p9'

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          strokeWidth={0}
          className={i < count ? 'fill-amber-400' : 'fill-wood/30'}
          aria-hidden
        />
      ))}
    </div>
  )
}

export default function ReviewsGrid() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
        {REVIEWS.map((r, i) => (
          <motion.figure
            key={r.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-wood/20 flex flex-col gap-3"
          >
            <Stars count={r.stars} />
            <blockquote className="font-body text-brown/80 text-sm leading-relaxed flex-1">
              “{r.text}”
            </blockquote>
            <figcaption className="flex items-center justify-between pt-2 border-t border-wood/15">
              <span className="font-heading font-bold text-green-dark text-sm">{r.name}</span>
              <span className="font-body text-brown/45 text-xs">{r.date}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="text-center mt-10">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-green-dark text-cream px-7 py-3.5 rounded-full font-heading font-bold text-sm hover:bg-green-mid transition-colors shadow-md"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Ver todas las reseñas en Google
        </a>
      </div>
    </div>
  )
}
