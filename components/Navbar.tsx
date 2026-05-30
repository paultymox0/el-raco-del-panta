'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang } = useLanguage()

  const navLinks = [
    { href: '/',           labelKey: 'nav_home'   as const },
    { href: '/menu',       labelKey: 'nav_menu'   as const },
    { href: '/fotos',      labelKey: 'nav_photos' as const },
    { href: '/reservar',   labelKey: 'nav_book'   as const },
    { href: '/entorno',    labelKey: 'nav_entorn' as const },
    { href: '/eventos',    labelKey: 'nav_events' as const },
    { href: '/informacion',labelKey: 'nav_info'   as const },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-parchment shadow-md' : 'bg-parchment/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="El Racó del Pantà"
            width={200}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <span className="hidden sm:block font-heading font-semibold text-green-dark text-sm leading-tight">
            El Racó<br />del Pantà
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 pr-20">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-body transition-colors hover:text-green-dark ${
                pathname === link.href
                  ? 'text-green-dark border-b-2 border-green-dark pb-0.5 font-semibold'
                  : 'text-brown'
              }`}
            >
              {t(link.labelKey, lang)}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-brown transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-brown transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-brown transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-parchment border-t border-wood px-4 py-4 flex flex-col gap-4 rounded-b-2xl shadow-lg overflow-hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-base font-body py-1 ${
                pathname === link.href
                  ? 'text-green-dark font-semibold border-l-4 border-green-dark pl-3'
                  : 'text-brown pl-3'
              }`}
            >
              {t(link.labelKey, lang)}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
