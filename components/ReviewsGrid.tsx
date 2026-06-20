'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { t, type Lang } from '@/lib/i18n'

type Review = {
  author: string
  rating: number
  text: string
  time: number // unix seconds
  relativeTime: string
  profilePhoto?: string
}

type ReviewsResponse = {
  reviews: Review[]
  rating: number | null
  total: number
}

const GOOGLE_REVIEWS_URL = 'https://maps.app.goo.gl/tpbXkdwr8J6UPk6p9'

const LOCALES: Record<Lang, string> = { ca: 'ca-ES', es: 'es-ES', en: 'en-GB' }

// Build a localized "x weeks ago" string from a unix timestamp, so the date
// follows the active language instead of Google's response language.
function timeAgo(unixSeconds: number, locale: string): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  const diffSec = (unixSeconds * 1000 - Date.now()) / 1000
  const day = diffSec / 86400
  const week = day / 7
  const month = day / 30
  const year = day / 365
  if (Math.abs(year) >= 1) return rtf.format(Math.round(year), 'year')
  if (Math.abs(month) >= 1) return rtf.format(Math.round(month), 'month')
  if (Math.abs(week) >= 1) return rtf.format(Math.round(week), 'week')
  if (Math.abs(day) >= 1) return rtf.format(Math.round(day), 'day')
  return rtf.format(Math.round(diffSec / 3600), 'hour')
}

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

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-wood/20 flex flex-col gap-3 animate-pulse">
      <div className="h-4 w-24 bg-wood/15 rounded" />
      <div className="h-3 w-full bg-wood/10 rounded" />
      <div className="h-3 w-5/6 bg-wood/10 rounded" />
      <div className="h-3 w-2/3 bg-wood/10 rounded" />
      <div className="h-3 w-20 bg-wood/15 rounded mt-2 self-end" />
    </div>
  )
}

export default function ReviewsGrid() {
  const { lang } = useLanguage()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetch('/api/reviews')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('bad response'))))
      .then((data: ReviewsResponse) => {
        if (!active) return
        setReviews(Array.isArray(data?.reviews) ? data.reviews : [])
      })
      // Silent fallback: leave reviews empty, page keeps working.
      .catch(() => active && setReviews([]))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const locale = LOCALES[lang] ?? 'es-ES'

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6" aria-hidden>
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {reviews.map((r, i) => (
            <motion.figure
              key={`${r.author}-${r.time}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-wood/20 flex flex-col gap-3"
            >
              <Stars count={Math.round(r.rating)} />
              <blockquote className="font-body text-brown/80 text-sm leading-relaxed flex-1">
                “{r.text}”
              </blockquote>
              <figcaption className="flex items-center justify-between pt-2 border-t border-wood/15">
                <span className="font-heading font-bold text-green-dark text-sm">{r.author}</span>
                <span className="font-body text-brown/45 text-xs">{timeAgo(r.time, locale)}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      ) : null}

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
          {t('reviews_google_cta', lang)}
        </a>
      </div>
    </div>
  )
}
