'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Lang = 'ca' | 'es' | 'en'

type LanguageContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  showSplash: boolean
  dismissSplash: (l: Lang) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ca',
  setLang: () => {},
  showSplash: false,
  dismissSplash: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ca')
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('raco-language') as Lang | null
    if (saved && ['ca', 'es', 'en'].includes(saved)) {
      setLangState(saved)
    } else {
      setShowSplash(true)
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('raco-language', l)
  }

  const dismissSplash = (l: Lang) => {
    setLang(l)
    setShowSplash(false)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, showSplash, dismissSplash }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
