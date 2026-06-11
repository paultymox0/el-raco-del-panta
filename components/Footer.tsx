'use client'

import Link from 'next/link'
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
