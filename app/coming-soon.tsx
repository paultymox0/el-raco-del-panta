'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, Phone } from 'lucide-react'

const MAPS_URL = 'https://maps.app.goo.gl/tpbXkdwr8J6UPk6p9'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.3 + i * 0.14, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

const pill =
  'inline-flex items-center gap-2 min-h-[48px] px-5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 hover:border-white/50 text-white font-body font-semibold text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70'

export default function ComingSoon() {
  const reduce = useReducedMotion()

  return (
    <div className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#16261a]">
      {/* Fondo: el pantà des de la terrassa, amb un zoom molt lent */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: reduce ? 1 : 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: 'easeOut' }}
        aria-hidden
      >
        <Image
          src="/entorno/hero-entorno.JPG"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" aria-hidden />

      <main className="relative z-10 flex flex-col items-center text-center px-6 py-16 max-w-xl mx-auto">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <Image
            src="/logo.png"
            alt="El Racó del Pantà"
            width={512}
            height={512}
            className="w-24 h-24 md:w-28 md:h-28 rounded-2xl shadow-2xl ring-1 ring-white/30 mb-10"
            priority
          />
        </motion.div>

        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="font-heading text-4xl md:text-6xl font-black text-white leading-[1.1] mb-5"
          style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}
        >
          Estem preparant la nostra web
        </motion.h1>

        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="font-body italic text-lg md:text-xl text-white/80 mb-3"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}
        >
          Estamos preparando nuestra web
        </motion.p>

        <motion.p
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="font-body text-base text-white/70 leading-relaxed max-w-md mb-10"
        >
          Mentrestant, t&apos;esperem al pantà.
          <br />
          Mientras tanto, te esperamos en el pantano.
        </motion.p>

        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={pill}>
            <MapPin size={18} strokeWidth={1.8} aria-hidden />
            Google Maps
          </a>
          <a href="tel:+34633043077" className={pill}>
            <Phone size={18} strokeWidth={1.8} aria-hidden />
            633 04 30 77
          </a>
          <a href="https://wa.me/34633043077" target="_blank" rel="noopener noreferrer" className={pill}>
            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </motion.div>

        <motion.p
          custom={5} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-12 font-body text-sm text-white/55"
        >
          C-13, 91 · 25630 Talarn, Lleida
        </motion.p>
      </main>
    </div>
  )
}
