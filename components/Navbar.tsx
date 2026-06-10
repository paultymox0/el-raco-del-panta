'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang } = useLanguage()

  const navLinks = [
    { href: '/',            labelKey: 'nav_home'   as const },
    { href: '/menu',        labelKey: 'nav_menu'   as const },
    { href: '/fotos',       labelKey: 'nav_photos' as const },
    { href: '/reservar',    labelKey: 'nav_book'   as const },
    { href: '/entorno',     labelKey: 'nav_entorn' as const },
    { href: '/eventos',     labelKey: 'nav_events' as const },
    { href: '/informacion', labelKey: 'nav_info'   as const },
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
          <Image src="/logo.png" alt="El Racó del Pantà" width={200} height={40} className="h-10 w-auto" priority />
          <span className="hidden sm:block font-heading font-semibold text-green-dark text-sm leading-tight">
            El Racó<br />del Pantà
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 pr-20">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-body transition-colors hover:text-green-dark group ${
                  isActive ? 'text-green-dark font-semibold' : 'text-brown'
                }`}
              >
                {t(link.labelKey, lang)}
                {/* Animated underline */}
                <span
                  className={`absolute bottom-[-2px] left-0 h-0.5 bg-green-dark rounded-full transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-0.5 bg-brown origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="block w-6 h-0.5 bg-brown"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-0.5 bg-brown origin-center"
          />
        </button>
      </div>

      {/* Mobile drawer with AnimatePresence */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-parchment border-t border-wood overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1 rounded-b-2xl shadow-lg">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-base font-body py-2 px-3 rounded-lg transition-colors ${
                      pathname === link.href
                        ? 'text-green-dark font-semibold bg-green-light/40'
                        : 'text-brown hover:text-green-dark hover:bg-green-light/20'
                    }`}
                  >
                    {t(link.labelKey, lang)}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
