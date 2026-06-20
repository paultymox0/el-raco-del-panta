'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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

// Build a localized "fa x setmanes" string from a unix timestamp, so the date
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

function Stars({ count, size = 16 }: { count: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          className={i < count ? 'fill-amber-400' : 'fill-wood/25'}
          aria-hidden
        />
      ))}
    </div>
  )
}

function GoogleG({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function Avatar({ name, size = 'md' }: { name: string; size?: 'md' | 'lg' }) {
  const initial = name.trim().charAt(0).toUpperCase() || 'G'
  const dim = size === 'lg' ? 'w-12 h-12 text-lg' : 'w-10 h-10 text-sm'
  return (
    <div
      className={`${dim} shrink-0 rounded-full grid place-items-center font-heading font-bold text-cream bg-gradient-to-br from-green-dark to-green-mid shadow-sm`}
      aria-hidden
    >
      {initial}
    </div>
  )
}

// Aggregate rating banner — uses rating + total that the API already returns.
function RatingSummary({ rating, total, lang }: { rating: number; total: number; lang: Lang }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-10">
      <span className="font-heading font-black text-4xl md:text-5xl text-green-dark leading-none">
        {rating.toFixed(1)}
      </span>
      <span className="block w-px h-10 bg-wood/30" aria-hidden />
      <div className="flex flex-col gap-1.5">
        <Stars count={Math.round(rating)} size={18} />
        <span className="flex items-center gap-1.5 font-body text-brown/55 text-xs">
          <GoogleG className="w-3.5 h-3.5" />
          {total} {t('reviews_on_google', lang)}
        </span>
      </div>
    </div>
  )
}

function FeaturedReview({ r, locale, reduce }: { r: Review; locale: string; reduce: boolean | null }) {
  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden bg-white rounded-3xl p-7 md:p-10 border border-wood/15 shadow-[0_18px_50px_-24px_rgba(22,38,26,0.35)]"
    >
      <span
        className="pointer-events-none absolute -top-6 right-4 font-heading text-[140px] leading-none text-green-dark/[0.06] select-none"
        aria-hidden
      >
        &ldquo;
      </span>
      <Stars count={Math.round(r.rating)} size={18} />
      <blockquote className="relative mt-5 font-body text-brown/85 text-lg md:text-xl leading-relaxed max-w-3xl">
        {r.text}
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-3.5">
        <Avatar name={r.author} size="lg" />
        <span className="flex flex-col">
          <span className="font-heading font-bold text-green-dark">{r.author}</span>
          <span className="font-body text-brown/45 text-xs">{timeAgo(r.time, locale)}</span>
        </span>
      </figcaption>
    </motion.figure>
  )
}

function ReviewCard({ r, i, locale, reduce }: { r: Review; i: number; locale: string; reduce: boolean | null }) {
  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col gap-4 bg-white rounded-3xl p-6 border border-wood/15 shadow-[0_10px_30px_-18px_rgba(22,38,26,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-22px_rgba(22,38,26,0.4)]"
    >
      <Stars count={Math.round(r.rating)} />
      <blockquote className="font-body text-brown/80 text-[15px] leading-relaxed flex-1">
        {r.text}
      </blockquote>
      <figcaption className="flex items-center gap-3 pt-4 border-t border-wood/12">
        <Avatar name={r.author} />
        <span className="flex flex-col min-w-0">
          <span className="font-heading font-bold text-green-dark text-sm truncate">{r.author}</span>
          <span className="font-body text-brown/45 text-xs">{timeAgo(r.time, locale)}</span>
        </span>
      </figcaption>
    </motion.figure>
  )
}

function SkeletonCard({ tall = false }: { tall?: boolean }) {
  return (
    <div className={`bg-white rounded-3xl p-6 border border-wood/15 flex flex-col gap-4 animate-pulse ${tall ? 'sm:col-span-2 p-7 md:p-10' : ''}`}>
      <div className="h-4 w-24 bg-wood/15 rounded" />
      <div className="h-3 w-full bg-wood/10 rounded" />
      <div className="h-3 w-5/6 bg-wood/10 rounded" />
      {tall && <div className="h-3 w-3/4 bg-wood/10 rounded" />}
      <div className="flex items-center gap-3 pt-4 mt-auto border-t border-wood/12">
        <div className="w-10 h-10 rounded-full bg-wood/15" />
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-20 bg-wood/15 rounded" />
          <div className="h-2.5 w-14 bg-wood/10 rounded" />
        </div>
      </div>
    </div>
  )
}

export default function ReviewsGrid() {
  const { lang } = useLanguage()
  const reduce = useReducedMotion()
  const [data, setData] = useState<ReviewsResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetch('/api/reviews')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('bad response'))))
      .then((d: ReviewsResponse) => active && setData(d))
      // Silent fallback: leave data null, page keeps working.
      .catch(() => active && setData(null))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const locale = LOCALES[lang] ?? 'es-ES'
  const reviews = data?.reviews ?? []
  const [featured, ...rest] = reviews

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          <SkeletonCard tall />
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <>
          {data?.rating != null && (
            <RatingSummary rating={data.rating} total={data.total} lang={lang} />
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {featured && (
              <div className="sm:col-span-2">
                <FeaturedReview r={featured} locale={locale} reduce={reduce} />
              </div>
            )}
            {rest.map((r, i) => (
              <ReviewCard key={`${r.author}-${r.time}`} r={r} i={i} locale={locale} reduce={reduce} />
            ))}
          </div>
        </>
      ) : null}

      <div className="text-center mt-12">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 bg-green-dark text-cream px-7 py-3.5 rounded-full font-heading font-bold text-sm shadow-md transition-all duration-300 hover:bg-green-mid hover:-translate-y-0.5 hover:shadow-lg"
        >
          <GoogleG className="w-5 h-5" />
          {t('reviews_google_cta', lang)}
        </a>
      </div>
    </div>
  )
}
