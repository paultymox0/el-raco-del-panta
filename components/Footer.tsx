'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

export default function Footer() {
  const { lang } = useLanguage()

  const navLinks = [
    { href: '/',         label: t('nav_home',     lang) },
    { href: '/menu',     label: t('nav_menu',     lang) },
    { href: '/entorno',  label: t('nav_entorn',   lang) },
    { href: '/historia', label: t('nav_historia', lang) },
  ]

  return (
    <footer className="bg-[#1a3d1f] text-[#f5ead6] py-14 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">

        {/* Elegantly framed logo */}
        <div className="relative inline-block">
          <div className="border border-[#f5ead6]/25 rounded-2xl p-[3px]">
            <div className="border border-[#f5ead6]/12 rounded-xl px-8 py-5 bg-[#f5ead6]/[0.04]">
              <Image
                src="/logo.png"
                alt="El Racó del Pantà"
                width={300}
                height={75}
                className="h-[72px] w-auto"
              />
            </div>
          </div>
          {/* Corner ornament dots */}
          <span className="absolute -top-[3px] -left-[3px] w-2 h-2 rounded-full bg-[#f5ead6]/30" />
          <span className="absolute -top-[3px] -right-[3px] w-2 h-2 rounded-full bg-[#f5ead6]/30" />
          <span className="absolute -bottom-[3px] -left-[3px] w-2 h-2 rounded-full bg-[#f5ead6]/30" />
          <span className="absolute -bottom-[3px] -right-[3px] w-2 h-2 rounded-full bg-[#f5ead6]/30" />
          <span className="absolute top-1/2 -left-[3px] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#f5ead6]/18" />
          <span className="absolute top-1/2 -right-[3px] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#f5ead6]/18" />
        </div>

        <div className="w-24 h-px bg-[#f5ead6]/20 rounded-full" />

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#f5ead6]/70">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#f5ead6] transition-colors font-body">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-[#f5ead6]/40 text-xs font-body text-center">
          © 2025 El Racó del Pantà · {t('footer_rights', lang)}
        </p>
      </div>
    </footer>
  )
}
