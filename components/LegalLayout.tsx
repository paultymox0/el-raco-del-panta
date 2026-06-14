'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'

export type Section = { heading: string; body: string }
export type LegalContent = { title: string; updated: string; sections: Section[] }

type Props = {
  ca: LegalContent
  es: LegalContent
  en: LegalContent
}

export default function LegalLayout({ ca, es, en }: Props) {
  const { lang } = useLanguage()
  const content = lang === 'ca' ? ca : lang === 'es' ? es : en

  return (
    <div className="pt-20 min-h-screen bg-parchment">
      <div className="relative bg-green-dark py-14 px-4 text-center overflow-hidden">
        <svg className="absolute top-4 left-4 w-16 h-24 opacity-20" viewBox="0 0 80 120" fill="none" aria-hidden>
          <path d="M40 120 C40 80 5 60 10 20 Q20 0 40 10 Q60 0 70 20 C75 60 40 80 40 120Z" fill="#f5ead6"/>
        </svg>
        <svg className="absolute top-4 right-4 w-16 h-24 opacity-20 scale-x-[-1]" viewBox="0 0 80 120" fill="none" aria-hidden>
          <path d="M40 120 C40 80 5 60 10 20 Q20 0 40 10 Q60 0 70 20 C75 60 40 80 40 120Z" fill="#f5ead6"/>
        </svg>
        <h1 className="font-heading text-4xl md:text-5xl font-black text-cream">{content.title}</h1>
        <p className="mt-2 font-body text-cream/50 text-xs">{content.updated}</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        {content.sections.map((s, i) => (
          <ScrollReveal key={i}>
            <div className="mb-10">
              <h2 className="font-heading text-xl font-bold text-green-dark mb-3">{s.heading}</h2>
              <div className="font-body text-brown/80 text-base leading-relaxed whitespace-pre-line">{s.body}</div>
            </div>
          </ScrollReveal>
        ))}
        <div className="mt-12 pt-6 border-t border-wood/20">
          <Link href="/" className="font-body text-sm text-green-dark hover:underline">← {lang === 'ca' ? 'Tornar a l\'inici' : lang === 'es' ? 'Volver al inicio' : 'Back to home'}</Link>
        </div>
      </div>
    </div>
  )
}
