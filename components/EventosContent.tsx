'use client'

import EventoForm from '@/components/EventoForm'
import BotanicalLeaf from '@/components/BotanicalLeaf'
import LocalImage from '@/components/LocalImage'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

export default function EventosContent() {
  const { lang } = useLanguage()

  const eventTypes = [
    { emoji: '🎂', titleKey: 'event_birthday_title' as const, descKey: 'event_birthday_desc' as const, img: '/eventos/cumpleanos.jpg' },
    { emoji: '💼', titleKey: 'event_business_title' as const, descKey: 'event_business_desc' as const, img: '/eventos/empresa.jpg'    },
    { emoji: '👨‍👩‍👧‍👦', titleKey: 'event_groups_title' as const,  descKey: 'event_groups_desc' as const,  img: '/eventos/grupos.jpg'     },
    { emoji: '💍', titleKey: 'event_wedding_title' as const, descKey: 'event_wedding_desc' as const, img: '/eventos/bodas.jpg'     },
  ]

  return (
    <div className="pt-20 min-h-screen bg-parchment">
      {/* Header */}
      <div className="relative bg-green-dark py-20 px-4 text-center overflow-hidden">
        <BotanicalLeaf className="absolute top-4 left-4 w-20 h-28 opacity-20" />
        <BotanicalLeaf className="absolute top-4 right-4 w-20 h-28 opacity-20 scale-x-[-1]" />
        <h1 className="font-heading text-5xl font-black text-cream mb-3">{t('events_title', lang)}</h1>
        <p className="text-cream/70 font-body text-lg max-w-xl mx-auto">{t('events_subtitle', lang)}</p>
      </div>

      {/* Event type cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventTypes.map((ev) => (
            <div key={ev.titleKey} className="bg-parchment border-2 border-transparent hover:border-green-dark rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="h-44 overflow-hidden">
                <LocalImage src={ev.img} alt={t(ev.titleKey, lang)} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" icon={ev.emoji} />
              </div>
              <div className="p-6 text-center">
                <div className="text-3xl mb-3">{ev.emoji}</div>
                <h3 className="font-heading text-lg font-bold text-green-dark mb-2">{t(ev.titleKey, lang)}</h3>
                <p className="text-brown/70 font-body text-sm mb-4">{t(ev.descKey, lang)}</p>
                <a href="#contacto-evento" className="inline-block border border-green-dark text-green-dark px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-dark hover:text-cream transition-colors">
                  {t('events_btn', lang)}
                </a>
              </div>
            </div>
          ))}
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
