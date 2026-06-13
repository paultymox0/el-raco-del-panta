'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

export default function Footer() {
  const { lang } = useLanguage()

  const navLinks = [
    { href: '/',            label: t('nav_home',     lang) },
    { href: '/menu',        label: t('nav_menu',     lang) },
    { href: '/entorno',     label: t('nav_entorn',   lang) },
    { href: '/historia',    label: t('nav_historia', lang) },
    { href: '/informacion', label: t('nav_info',     lang) },
  ]

  return (
    <footer className="bg-[#1a3d1f] text-[#f5ead6] py-14 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">

        <p className="font-heading text-xl font-bold text-[#f5ead6] tracking-wide">El Racó del Pantà</p>

        {/* Contact summary */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-[#f5ead6]/70 font-body text-center">
          <span>C-13, 91 · 25630 Talarn, Lleida</span>
          <a href="tel:+34633043077" className="hover:text-[#f5ead6] transition-colors font-semibold text-[#f5ead6]/90">
            +34 633 04 30 77
          </a>
          <span>{t('day_monday', lang)} – {t('day_sunday', lang)} · 8:00 – 23:00</span>
        </div>

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
          © {new Date().getFullYear()} El Racó del Pantà · {t('footer_rights', lang)}
        </p>
      </div>
    </footer>
  )
}
