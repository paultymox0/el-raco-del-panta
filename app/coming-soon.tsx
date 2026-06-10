'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import BotanicalLeaf from '@/components/BotanicalLeaf'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function ComingSoon() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-parchment">
      {/* Background hero image with warm overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
      </div>

      {/* Botanical corner decorations */}
      <BotanicalLeaf className="absolute top-0 left-0 w-24 h-32 opacity-25" />
      <BotanicalLeaf className="absolute top-0 right-0 w-24 h-32 opacity-25 scale-x-[-1]" />
      <BotanicalLeaf className="absolute bottom-0 left-0 w-20 h-28 opacity-20" />
      <BotanicalLeaf className="absolute bottom-0 right-0 w-20 h-28 opacity-20 scale-x-[-1]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg mx-auto">

        {/* Logo */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <Image
            src="/logo.png"
            alt="El Racó del Pantà"
            width={480}
            height={120}
            className="h-32 w-auto brightness-0 invert mb-10"
            priority
          />
        </motion.div>

        {/* Divider */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="w-16 h-px bg-white/40 mb-8" />

        {/* Main heading */}
        <motion.h1
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="font-heading text-5xl md:text-6xl font-black text-white mb-4 leading-tight"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
        >
          Próximamente
        </motion.h1>

        {/* Subtext */}
        <motion.p
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="font-body text-lg md:text-xl text-white/75 italic mb-10"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
        >
          Algo especial está en camino...
        </motion.p>

        {/* Divider */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="w-12 h-px bg-white/30 mb-10" />

        {/* Social buttons */}
        <motion.div
          custom={5} variants={fadeUp} initial="hidden" animate="visible"
          className="flex items-center gap-4"
        >
          {/* Instagram */}
          <a
            href="https://www.instagram.com/elracodelpanta"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 hover:border-white/50 text-white px-5 py-3 rounded-full font-body font-semibold text-sm transition-all hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@elracodelpanta"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 hover:border-white/50 text-white px-5 py-3 rounded-full font-body font-semibold text-sm transition-all hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
            </svg>
            TikTok
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/34XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 hover:border-white/50 text-white px-5 py-3 rounded-full font-body font-semibold text-sm transition-all hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </motion.div>

        {/* Footer text */}
        <motion.p
          custom={6} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-12 text-white/35 font-body text-xs tracking-widest uppercase"
        >
          El Racó del Pantà
        </motion.p>
      </div>
    </div>
  )
}
