'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

const PHONE = '34633043077'

export default function WhatsAppButton() {
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Click-popup */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop (click to close) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            {/* Options card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 12 }}
              transition={{ type: 'spring', stiffness: 360, damping: 26 }}
              className="fixed bottom-[88px] right-4 z-50 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 min-w-[210px]"
            >
              <a
                href={`tel:+${PHONE}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors font-body text-brown font-medium border-b border-gray-100"
              >
                <svg className="w-5 h-5 text-brown flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                </svg>
                <span>{t('wa_call', lang)}</span>
              </a>
              <a
                href={`https://wa.me/${PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-5 py-4 hover:bg-[#25D366]/10 transition-colors font-body text-green-dark font-medium"
              >
                <svg className="w-5 h-5 text-green-dark flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
                </svg>
                <span>{t('wa_message', lang)}</span>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FAB + always-visible tooltip */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
        {/* Persistent tooltip bubble — hidden on small screens to keep the bottom bar uncluttered */}
        <div className="relative hidden sm:block bg-brown text-cream text-xs px-3 py-1.5 rounded-full shadow-md font-body whitespace-nowrap">
          {t('wa_tooltip', lang)}
          <svg className="absolute left-1/2 top-full -translate-x-1/2 w-3 h-2 fill-brown" viewBox="0 0 12 6">
            <path d="M0 0 L6 6 L12 0 Z"/>
          </svg>
        </div>

        {/* Ping + button */}
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping" />
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => setOpen(o => !o)}
            aria-label="Contactar"
            className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg"
          >
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </motion.button>
        </div>
      </div>
    </>
  )
}
