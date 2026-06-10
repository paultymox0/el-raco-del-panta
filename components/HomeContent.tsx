'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import LocalImage from '@/components/LocalImage'
import { ScrollReveal, StaggerGroup, StaggerItem } from '@/components/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

// ── Pre-computed deterministic data ──────────────────────────────────────────

const STARS = [
  { left: '5%',  top: '6%',  delay: '0s',    dur: '2.8s' },
  { left: '18%', top: '3%',  delay: '1.2s',  dur: '3.1s' },
  { left: '32%', top: '8%',  delay: '0.5s',  dur: '2.5s' },
  { left: '48%', top: '4%',  delay: '2.0s',  dur: '3.4s' },
  { left: '61%', top: '7%',  delay: '0.9s',  dur: '2.7s' },
  { left: '75%', top: '2%',  delay: '1.6s',  dur: '3.0s' },
  { left: '88%', top: '5%',  delay: '0.3s',  dur: '2.9s' },
  { left: '23%', top: '14%', delay: '1.8s',  dur: '3.2s' },
  { left: '54%', top: '11%', delay: '0.7s',  dur: '2.6s' },
  { left: '82%', top: '13%', delay: '2.3s',  dur: '3.3s' },
  { left: '12%', top: '18%', delay: '1.1s',  dur: '2.4s' },
  { left: '67%', top: '16%', delay: '1.9s',  dur: '3.5s' },
]

const FIREFLIES = [
  { left: '12%', top: '30%', delay: '0s',   dur: '3.2s' },
  { left: '26%', top: '47%', delay: '0.8s', dur: '2.8s' },
  { left: '38%', top: '24%', delay: '1.5s', dur: '3.5s' },
  { left: '55%', top: '40%', delay: '0.3s', dur: '2.6s' },
  { left: '68%', top: '28%', delay: '2.0s', dur: '3.1s' },
  { left: '80%', top: '52%', delay: '1.1s', dur: '2.9s' },
  { left: '7%',  top: '54%', delay: '2.5s', dur: '3.3s' },
  { left: '44%', top: '56%', delay: '1.7s', dur: '2.7s' },
  { left: '72%', top: '18%', delay: '0.6s', dur: '3.0s' },
  { left: '91%', top: '44%', delay: '1.9s', dur: '3.4s' },
]

const heroChildVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.18, duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

const dishes = [
  {
    img: '/especialidades/especialidad-1.jpg',
    ca: { name: 'Xuletó a la brasa', desc: 'Carn de primera qualitat cuinada a foc lent sobre brasa de llenya' },
    es: { name: 'Chuletón a la brasa', desc: 'Carne de primera calidad cocinada a fuego lento sobre brasa de leña' },
    en: { name: 'T-bone on the grill', desc: 'Prime quality meat slow-cooked over wood embers' },
  },
  {
    img: '/especialidades/especialidad-2.jpg',
    ca: { name: "Taula d'ibèrics", desc: "Selecció artesanal d'embotits ibèrics de la comarca" },
    es: { name: 'Tabla de ibéricos', desc: 'Selección artesanal de embutidos ibéricos de la comarca' },
    en: { name: 'Ibérico board', desc: 'Artisan selection of Ibérico charcuterie from the region' },
  },
  {
    img: '/especialidades/especialidad-3.jpg',
    ca: { name: 'Pop a la gallega', desc: "Pop tendre amb pebre vermell fumat i oli d'oliva verge extra" },
    es: { name: 'Pulpo a la gallega', desc: 'Pulpo tierno con pimentón ahumado y aceite de oliva virgen extra' },
    en: { name: 'Galician-style octopus', desc: 'Tender octopus with smoked paprika and extra virgin olive oil' },
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function HomeContent() {
  const { lang } = useLanguage()
  const heroRef = useRef<HTMLElement>(null)
  const socialRef = useRef<HTMLElement>(null)
  const socialInView = useInView(socialRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const mtn1Y = useTransform(scrollYProgress, [0, 1], ['0px', '-55px'])
  const mtn2Y = useTransform(scrollYProgress, [0, 1], ['0px', '-80px'])
  const mtn3Y = useTransform(scrollYProgress, [0, 1], ['0px', '-110px'])
  const textY  = useTransform(scrollYProgress, [0, 1], ['0px', '60px'])

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Animated sky */}
        <div className="hero-sky absolute inset-0" style={{ zIndex: 0 }} />

        {/* Stars */}
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: s.left, top: s.top,
              width: i % 3 === 0 ? '3px' : '2px',
              height: i % 3 === 0 ? '3px' : '2px',
              zIndex: 1,
              animation: `starTwinkle ${s.dur} ${s.delay} ease-in-out infinite`,
            }}
          />
        ))}

        {/* Fireflies */}
        {FIREFLIES.map((f, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: f.left, top: f.top,
              width: '4px', height: '4px',
              background: 'radial-gradient(circle, #ffe066 0%, #ffaa00 60%, transparent 100%)',
              boxShadow: '0 0 6px 2px rgba(255,210,50,0.5)',
              zIndex: 2,
              animation: `fireflyPulse ${f.dur} ${f.delay} ease-in-out infinite`,
            }}
          />
        ))}

        {/* Far mountains – slow parallax */}
        <motion.div
          className="absolute bottom-0 left-0 w-full"
          style={{ height: '42%', zIndex: 3, y: mtn1Y }}
        >
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0 320 L0 95 C240 58 480 100 720 78 C960 56 1200 90 1440 72 L1440 320 Z"
              fill="#1e2e48"
            />
          </svg>
        </motion.div>

        {/* Mid mountains – medium parallax */}
        <motion.div
          className="absolute bottom-0 left-0 w-full"
          style={{ height: '32%', zIndex: 4, y: mtn2Y }}
        >
          <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0 260 L0 115 C180 88 360 118 540 102 C720 86 900 112 1080 96 C1260 80 1380 98 1440 90 L1440 260 Z"
              fill="#163224"
            />
          </svg>
        </motion.div>

        {/* Near forest – fastest parallax */}
        <motion.div
          className="absolute bottom-0 left-0 w-full"
          style={{ height: '24%', zIndex: 6, y: mtn3Y }}
        >
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0 200 L0 88 C90 76 130 90 180 80 C240 68 280 84 340 73 C400 62 450 78 510 66 C570 54 620 72 680 60 C740 48 790 67 850 55 C910 43 960 64 1020 52 C1080 40 1130 60 1190 48 C1250 36 1300 56 1360 44 C1400 36 1430 44 1440 40 L1440 200 Z"
              fill="#0b1a0e"
            />
          </svg>
        </motion.div>

        {/* Fog strip */}
        <div
          className="absolute left-0 w-full pointer-events-none"
          style={{
            bottom: '23%', height: '80px', zIndex: 5,
            background: 'linear-gradient(to bottom, transparent, rgba(180,200,220,0.18), transparent)',
            animation: 'fogDrift 18s ease-in-out infinite alternate',
          }}
        />

        {/* Boats */}
        <div
          className="absolute"
          style={{ bottom: '24%', left: '18%', zIndex: 5, animation: 'bob 5s ease-in-out infinite' }}
        >
          <svg viewBox="0 0 56 28" width="56" height="28">
            <path d="M4 20 L52 20 L47 26 L9 26 Z" fill="rgba(10,28,18,0.85)"/>
            <line x1="28" y1="20" x2="28" y2="4" stroke="rgba(10,28,18,0.7)" strokeWidth="2"/>
            <path d="M28 6 L44 19 L28 19 Z" fill="rgba(180,150,100,0.55)"/>
          </svg>
        </div>
        <div
          className="absolute"
          style={{ bottom: '24%', right: '22%', zIndex: 5, animation: 'bob 6.5s ease-in-out 1.8s infinite' }}
        >
          <svg viewBox="0 0 38 20" width="38" height="20">
            <path d="M3 14 L35 14 L31 18 L7 18 Z" fill="rgba(10,28,18,0.75)"/>
            <line x1="19" y1="14" x2="19" y2="3" stroke="rgba(10,28,18,0.65)" strokeWidth="1.5"/>
            <path d="M19 4 L30 13 L19 13 Z" fill="rgba(160,130,90,0.5)"/>
          </svg>
        </div>

        {/* Wave animation at bottom */}
        <div
          className="absolute bottom-0 left-0 w-full overflow-hidden"
          style={{ height: '64px', zIndex: 7 }}
        >
          <div style={{ width: '200%', animation: 'waveMove 9s linear infinite' }}>
            <svg viewBox="0 0 2880 64" preserveAspectRatio="none" style={{ width: '100%', height: '64px' }}>
              <path
                d="M0,32 C240,8 480,56 720,32 C960,8 1200,56 1440,32 C1680,8 1920,56 2160,32 C2400,8 2640,56 2880,32 L2880,64 L0,64 Z"
                fill="rgba(22,50,80,0.55)"
              />
              <path
                d="M0,42 C240,24 480,52 720,42 C960,32 1200,52 1440,42 C1680,32 1920,52 2160,42 C2400,32 2640,52 2880,42 L2880,64 L0,64 Z"
                fill="rgba(14,35,60,0.40)"
              />
            </svg>
          </div>
        </div>

        {/* Hero text content */}
        <motion.div
          style={{ y: textY, zIndex: 10 }}
          className="relative text-center px-4 max-w-4xl mx-auto pb-[28vh]"
        >
          <motion.div custom={0} variants={heroChildVariants} initial="hidden" animate="visible" className="flex justify-center mb-8">
            <Image
              src="/logo.png"
              alt="El Racó del Pantà"
              width={480}
              height={120}
              className="h-[104px] w-auto brightness-0 invert opacity-95"
              priority
            />
          </motion.div>

          <motion.h1
            custom={1} variants={heroChildVariants} initial="hidden" animate="visible"
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-tight"
            style={{ textShadow: '0 2px 30px rgba(0,0,0,0.7), 0 1px 6px rgba(0,0,0,0.9)' }}
          >
            EL RACÓ<br />DEL PANTÀ
          </motion.h1>

          <motion.p
            custom={2} variants={heroChildVariants} initial="hidden" animate="visible"
            className="font-body text-xl md:text-2xl text-white/85 mb-10 max-w-xl mx-auto"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.8)' }}
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/reservar"
                className="block bg-green-dark text-cream px-8 py-4 rounded-full font-heading font-bold text-lg hover:bg-green-mid transition-colors shadow-lg text-center"
              >
                {t('hero_btn_book', lang)}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── NEWLY OPENED BANNER ── */}
      <div className="bg-green-dark text-cream text-center py-4 px-4 text-base md:text-lg font-body">
        {t('banner_new_open', lang)}
      </div>

      {/* ── SPECIALTIES ── */}
      <section className="py-20 px-4 bg-parchment">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading text-4xl text-green-dark text-center mb-4">
              {t('specialties_title', lang)}
            </h2>
            <div className="w-20 h-1 bg-wood mx-auto mb-12 rounded-full" />
          </ScrollReveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dishes.map((dish, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="rounded-2xl overflow-hidden shadow-md bg-cream h-full"
                >
                  <div className="relative h-52 overflow-hidden">
                    <LocalImage src={dish.img} alt={dish[lang].name} className="w-full h-full object-cover" icon="🍽️" />
                  </div>
                  <div className="p-6 wood-bg">
                    <h3 className="font-heading text-xl font-bold text-green-dark mb-2">{dish[lang].name}</h3>
                    <p className="text-brown/70 text-sm font-body">{dish[lang].desc}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS ── */}
      <section className="py-20 px-4 bg-green-light/30">
        <ScrollReveal className="max-w-lg mx-auto">
          <div className="bg-parchment rounded-3xl shadow-lg p-10 text-center border border-wood/30">
            <div className="text-5xl font-heading font-black text-yellow-500 mb-2">⭐ 5.0</div>
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
            {/* Instagram card */}
            <motion.a
              href="https://www.instagram.com/elracodelpanta"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -48 }}
              animate={socialInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.3)' }}
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

            {/* TikTok card */}
            <motion.a
              href="https://www.tiktok.com/@elracodelpanta"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 48 }}
              animate={socialInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.3)' }}
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
