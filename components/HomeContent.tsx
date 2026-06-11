'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

const heroChildVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.18, duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}


export default function HomeContent() {
  const { lang } = useLanguage()
  const heroRef = useRef<HTMLElement>(null)
  const socialRef = useRef<HTMLElement>(null)
  const socialInView = useInView(socialRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY  = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0px', '55px'])

  return (
    <>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        {/* ── Video / poster background ── */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ y: bgY }}
          aria-hidden="true"
        >
          {/* Poster: always visible immediately (mobile + while video loads) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/hero/hero-poster.jpg)' }}
          />

          {/* Video: only rendered on md+ to save mobile data */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/hero/hero-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover hidden md:block"
          >
            <source src="/hero/hero-video.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/65 pointer-events-none" />

        {/* Hero text */}
        <motion.div
          style={{ y: textY, zIndex: 10 }}
          className="relative text-center px-4 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="w-10 h-px bg-white/35" />
            <div className="w-1 h-1 rounded-full bg-white/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <div className="w-1 h-1 rounded-full bg-white/50" />
            <div className="w-10 h-px bg-white/35" />
          </div>

          <motion.h1
            custom={1} variants={heroChildVariants} initial="hidden" animate="visible"
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-tight"
            style={{ textShadow: '0 2px 32px rgba(0,0,0,0.75), 0 1px 6px rgba(0,0,0,0.9)' }}
          >
            EL RACÓ<br />DEL PANTÀ
          </motion.h1>

          <motion.p
            custom={2} variants={heroChildVariants} initial="hidden" animate="visible"
            className="font-body text-xl md:text-2xl text-white/85 mb-10 max-w-xl mx-auto"
            style={{ textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}
          >
            {t('hero_tagline', lang)}
          </motion.p>

          <motion.div
            custom={3} variants={heroChildVariants} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/menu"
                className="block bg-white/15 backdrop-blur-sm text-white border-2 border-white/60 px-8 py-4 rounded-full font-heading font-bold text-lg hover:bg-white hover:text-green-dark transition-colors shadow-lg text-center"
              >
                {t('hero_btn_menu', lang)}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── GREEN DIVIDER STRIP ── */}
      <div className="bg-gradient-to-r from-green-dark via-green-mid to-green-dark h-2.5" />

      {/* ── GOOGLE REVIEWS ── */}
      <section className="py-20 px-4 bg-green-light/30">
        <ScrollReveal className="max-w-lg mx-auto">
          <div className="bg-parchment rounded-3xl shadow-lg p-10 text-center border border-wood/30">
            <div className="flex items-center gap-1 justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              ))}
              <span className="font-heading font-black text-2xl text-yellow-500 ml-1">5.0</span>
            </div>
            <h2 className="font-heading text-2xl text-green-dark mb-3">{t('reviews_title', lang)}</h2>
            <p className="text-brown/70 mb-6 font-body">{t('reviews_note', lang)}</p>
            <motion.a
              href="https://search.google.com/local/writereview?placeid=PLACE_ID_HERE"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block bg-green-dark text-cream px-8 py-3 rounded-full font-heading font-bold hover:bg-green-mid transition-colors shadow-md"
            >
              {t('reviews_btn', lang)}
            </motion.a>
          </div>
        </ScrollReveal>
      </section>

      {/* ── SOCIAL SECTION ── */}
      <section
        ref={socialRef}
        className="py-20 px-4"
        style={{ background: '#1a2e1a' }}
      >
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading text-3xl text-cream text-center mb-2">
              {t('social_title', lang)}
            </h2>
            <p className="text-cream/50 font-body text-sm text-center mb-12">@elracodelpanta</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.a
              href="https://www.instagram.com/elracodelpanta"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -48 }}
              animate={socialInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.35)' }}
              className="rounded-2xl overflow-hidden p-8 flex items-center gap-6 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 45%, #fcb045 100%)' }}
            >
              <div className="flex-shrink-0 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <div className="font-heading font-bold text-xl text-white mb-1">Instagram</div>
                <div className="text-white/75 font-body text-sm">@elracodelpanta</div>
                <div className="mt-3 inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-heading font-bold px-4 py-1.5 rounded-full border border-white/30">
                  Seguir →
                </div>
              </div>
            </motion.a>

            <motion.a
              href="https://www.tiktok.com/@elracodelpanta"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 48 }}
              animate={socialInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.35)' }}
              className="rounded-2xl overflow-hidden p-8 flex items-center gap-6 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #010101 0%, #1a0a22 50%, #0d1a1a 100%)' }}
            >
              <div className="flex-shrink-0 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                </svg>
              </div>
              <div>
                <div className="font-heading font-bold text-xl text-white mb-1">TikTok</div>
                <div className="text-white/65 font-body text-sm">@elracodelpanta</div>
                <div className="mt-3 inline-block bg-white/15 backdrop-blur-sm text-white text-xs font-heading font-bold px-4 py-1.5 rounded-full border border-white/20">
                  Seguir →
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </section>
    </>
  )
}
