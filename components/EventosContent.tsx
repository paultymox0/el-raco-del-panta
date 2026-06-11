'use client'

import { motion } from 'framer-motion'
import EventoForm from '@/components/EventoForm'
import BotanicalLeaf from '@/components/BotanicalLeaf'
import LocalImage from '@/components/LocalImage'
import { StaggerGroup, StaggerItem } from '@/components/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

function BirthdayIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c0 0-1 2-1 3s.5 1.5 1 2 1-1 1-2-1-3-1-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18v2a7 7 0 01-7 7H10a7 7 0 01-7-7v-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 10V8m5 2V8m5 2V8" />
    </svg>
  )
}

function BusinessIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  )
}

function GroupIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  )
}

function WeddingIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  )
}

export default function EventosContent() {
  const { lang } = useLanguage()

  const eventTypes = [
    { icon: <BirthdayIcon />, fallback: '🎂', titleKey: 'event_birthday_title' as const, descKey: 'event_birthday_desc' as const, img: '/eventos/cumpleanos.jpg' },
    { icon: <BusinessIcon />, fallback: '💼', titleKey: 'event_business_title' as const, descKey: 'event_business_desc' as const, img: '/eventos/empresa.jpg'    },
    { icon: <GroupIcon />,    fallback: '👥', titleKey: 'event_groups_title' as const,  descKey: 'event_groups_desc' as const,  img: '/eventos/grupos.jpg'     },
    { icon: <WeddingIcon />,  fallback: '💍', titleKey: 'event_wedding_title' as const, descKey: 'event_wedding_desc' as const, img: '/eventos/bodas.jpg'     },
  ]

  return (
    <div className="pt-20 min-h-screen bg-parchment">
      {/* Header */}
      <div className="relative bg-green-dark py-20 px-4 text-center overflow-hidden">
        <BotanicalLeaf className="absolute top-4 left-4 w-20 h-28 opacity-20" />
        <BotanicalLeaf className="absolute top-4 right-4 w-20 h-28 opacity-20 scale-x-[-1]" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-5xl font-black text-cream mb-3"
        >
          {t('events_title', lang)}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-cream/70 font-body text-lg max-w-xl mx-auto"
        >
          {t('events_subtitle', lang)}
        </motion.p>
      </div>

      {/* Event type cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventTypes.map((ev) => (
              <StaggerItem key={ev.titleKey}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="bg-parchment border-2 border-transparent hover:border-green-dark rounded-2xl overflow-hidden shadow-md transition-colors duration-300"
                >
                  <div className="h-44 overflow-hidden">
                    <LocalImage
                      src={ev.img}
                      alt={t(ev.titleKey, lang)}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      icon={ev.fallback}
                    />
                  </div>
                  <div className="p-6 text-center">
                    <div className="flex items-center justify-center w-14 h-14 bg-green-light/60 rounded-full mx-auto mb-3 text-green-dark">
                      {ev.icon}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-green-dark mb-2">{t(ev.titleKey, lang)}</h3>
                    <p className="text-brown/70 font-body text-sm mb-4">{t(ev.descKey, lang)}</p>
                    <a
                      href="#contacto-evento"
                      className="inline-block border border-green-dark text-green-dark px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-dark hover:text-cream transition-colors"
                    >
                      {t('events_btn', lang)}
                    </a>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Contact form */}
      <section id="contacto-evento" className="py-16 px-4 bg-cream">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-4xl font-bold text-green-dark mb-3">{t('events_form_title', lang)}</h2>
            <p className="text-brown/70 font-body">{t('events_form_subtitle', lang)}</p>
          </div>
          <div className="bg-parchment rounded-3xl shadow-lg p-8">
            <EventoForm />
          </div>
        </div>
      </section>
    </div>
  )
}
