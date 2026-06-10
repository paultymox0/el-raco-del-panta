'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function HistoriaContent() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen bg-parchment">
      {/* Hero */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-green-dark">
        <Image
          src="/hero/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-40"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-dark/60 to-green-dark/80" />
        <div className="relative z-10 text-center px-6 pt-16">
          <motion.h1
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="font-heading text-5xl md:text-6xl font-black text-cream mb-3"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
          >
            {t('historia_title', lang)}
          </motion.h1>
          <motion.p
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="font-body text-lg text-cream/70 italic"
          >
            {t('historia_subtitle', lang)}
          </motion.p>
        </div>
      </div>

      {/* Coming soon content */}
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="w-16 h-1 bg-wood mx-auto mb-10 rounded-full"
        />
        <motion.div
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-6xl mb-8"
        >
          📖
        </motion.div>
        <motion.h2
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="font-heading text-3xl text-green-dark mb-6"
        >
          {t('historia_soon', lang)}
        </motion.h2>
        <motion.p
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="font-body text-brown/70 text-lg leading-relaxed"
        >
          {t('historia_text', lang)}
        </motion.p>
      </div>
    </div>
  )
}
