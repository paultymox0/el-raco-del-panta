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
    { href: '/',         labelKey: 'nav_home'     as const },
    { href: '/menu',     labelKey: 'nav_menu'     as const },
    { href: '/fotos',    labelKey: 'nav_photos'   as const },
    { href: '/reservar', labelKey: 'nav_book'     as const },
    { href: '/historia', labelKey: 'nav_historia' as const },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = pathname === '/'
  const transparent = isHome && !scrolled

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent'
          : 'bg-parchment/95 backdrop-blur-md shadow-sm border-b border-wood/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="El Racó del Pantà"
            width={200}
            height={50}
            className={`h-11 w-auto transition-all duration-500 ${transparent ? 'brightness-0 invert' : ''}`}
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7 pr-24">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-body font-medium transition-colors duration-300 group ${
                  isActive
                    ? transparent ? 'text-white font-semibold' : 'text-green-dark font-semibold'
                    : transparent ? 'text-white/85 hover:text-white' : 'text-brown hover:text-green-dark'
                }`}
              >
                {t(link.labelKey, lang)}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full transition-all duration-300 ${
                    transparent ? 'bg-white' : 'bg-green-dark'
                  } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            )
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 mr-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`block w-6 h-0.5 rounded-full ${transparent ? 'bg-white' : 'bg-brown'}`}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            className={`block w-6 h-0.5 rounded-full ${transparent ? 'bg-white' : 'bg-brown'}`}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`block w-6 h-0.5 rounded-full ${transparent ? 'bg-white' : 'bg-brown'}`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="md:hidden bg-parchment/98 backdrop-blur-md border-t border-wood/20 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
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
                    className={`block text-base font-body py-2.5 px-3 rounded-xl transition-colors ${
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
