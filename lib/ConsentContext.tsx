'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type ConsentState = {
  decided: boolean
  analytics: boolean
  thirdParty: boolean
}

type ConsentCtx = {
  consent: ConsentState
  bannerOpen: boolean
  acceptAll: () => void
  rejectAll: () => void
  savePartial: (s: Pick<ConsentState, 'analytics' | 'thirdParty'>) => void
  reopen: () => void
}

const ConsentContext = createContext<ConsentCtx | null>(null)

const STORAGE_KEY = 'raco_consent'

function load(): ConsentState {
  if (typeof window === 'undefined') return { decided: false, analytics: false, thirdParty: false }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { decided: false, analytics: false, thirdParty: false }
    return JSON.parse(raw) as ConsentState
  } catch {
    return { decided: false, analytics: false, thirdParty: false }
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>({ decided: false, analytics: false, thirdParty: false })
  const [bannerOpen, setBannerOpen] = useState(false)

  useEffect(() => {
    const stored = load()
    setConsent(stored)
    if (!stored.decided) setBannerOpen(true)
  }, [])

  function save(s: ConsentState) {
    setConsent(s)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)) } catch {}
    setBannerOpen(false)
  }

  return (
    <ConsentContext.Provider value={{
      consent,
      bannerOpen,
      acceptAll: () => save({ decided: true, analytics: true, thirdParty: true }),
      rejectAll: () => save({ decided: true, analytics: false, thirdParty: false }),
      savePartial: (s) => save({ decided: true, ...s }),
      reopen: () => setBannerOpen(true),
    }}>
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent() {
  const ctx = useContext(ConsentContext)
  if (!ctx) throw new Error('useConsent must be inside ConsentProvider')
  return ctx
}
