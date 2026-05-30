'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

export default function MobileReserveButton() {
  const { lang } = useLanguage()
  return (
    <Link
      href="/reservar"
      className="fixed bottom-4 left-4 z-40 md:hidden bg-green-dark text-cream px-4 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2 text-sm"
    >
      {t('mobile_reserve', lang)}
    </Link>
  )
}
