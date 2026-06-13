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
  const isHome = pathname === '/'

  const navLinks = [
    { href: '/',          labelKey: 'nav_home'      as const },
    { href: '/menu',      labelKey: 'nav_menu'      as const },
    { href: '/entorno',   labelKey: 'nav_entorn'    as const },
    { href: '/historia',  labelKey: 'nav_historia'  as const },
    { href: '/ressenyes', labelKey: 'nav_ressenyes' as const },
  ]

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    const onScroll = () => setScrolled(window.scrollY >= window.innerHeight - 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const transparent = isHome && !scrolled

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent ? 'bg-transparent' : 'bg-[#1a3d1f]'
      }`}
    >
      {/* pr reserves space for the fixed LanguageSwitcher pill (top right) so the hamburger / links never sit underneath it */}
      <div className="max-w-7xl mx-auto pl-4 sm:pl-6 pr-[108px] py-3 flex items-center justify-between">
        {/* Logo — always white, always visible */}
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            animate={{ opacity: transparent ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src="/logo.png"
              alt="El Racó del Pantà"
              width={120}
              height={80}
              style={{ objectFit: 'contain' }}
              className="h-11 w-auto"
              priority
            />
          </motion.div>
          <motion.span
            animate={{ opacity: transparent ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="font-heading font-bold text-xs sm:text-sm tracking-wide whitespace-nowrap hidden min-[360px]:block pointer-events-none select-none text-[#f5ead6]"
          >
            El Racó del Pantà
          </motion.span>
        </Link>

        {/* Desktop nav links — always cream */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-body font-medium transition-colors duration-300 group ${
                  scrolled
                    ? (isActive ? 'text-[#f5ead6] font-semibold' : 'text-[#f5ead6]/75 hover:text-[#f5ead6]')
                    : (isActive ? 'text-white font-semibold' : 'text-white/80 hover:text-white')
                }`}
              >
                {t(link.labelKey, lang)}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full transition-all duration-300 ${scrolled ? 'bg-[#f5ead6]' : 'bg-white'} ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col items-center justify-center gap-1.5 min-w-[44px] min-h-[44px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} className="block w-6 h-0.5 rounded-full bg-[#f5ead6]" />
          <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.15 }} className="block w-6 h-0.5 rounded-full bg-[#f5ead6]" />
          <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} className="block w-6 h-0.5 rounded-full bg-[#f5ead6]" />
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
            className="md:hidden bg-[#1a3d1f] border-t border-[#f5ead6]/10 overflow-hidden"
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
                    className={`block text-base font-body py-3 px-3 min-h-[44px] rounded-xl transition-colors ${
                      pathname === link.href
                        ? 'text-[#f5ead6] font-semibold bg-white/10'
                        : 'text-[#f5ead6]/70 hover:text-[#f5ead6] hover:bg-white/5'
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
