'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { carta, MenuItem, Allergen } from '@/data/carta'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'
import LocalImage from '@/components/LocalImage'

type CartItem = { id: string; preu: number; quantitat: number; categoria: string }
type CategoryId = 'starters' | 'sandwiches' | 'grill' | 'desserts' | 'drinks'

const ALLERGEN: Record<Allergen, { emoji: string; label: string }> = {
  gluten:       { emoji: '🌾', label: 'Gluten' },
  lacteos:      { emoji: '🥛', label: 'Lácteos' },
  huevo:        { emoji: '🥚', label: 'Huevo' },
  pescado:      { emoji: '🐟', label: 'Pescado' },
  crustaceos:   { emoji: '🦞', label: 'Crustáceos' },
  frutos_casca: { emoji: '🌰', label: 'Frutos secos' },
  apio:         { emoji: '🌿', label: 'Apio' },
  mostaza:      { emoji: '🌼', label: 'Mostaza' },
  sesamo:       { emoji: '🫘', label: 'Sésamo' },
  soja:         { emoji: '🫘', label: 'Soja' },
  sulfitos:     { emoji: '🍷', label: 'Sulfitos' },
  moluscos:     { emoji: '🦑', label: 'Moluscos' },
  altramuces:   { emoji: '🌱', label: 'Altramuces' },
  cacahuetes:   { emoji: '🥜', label: 'Cacahuetes' },
}

// ── SVG Icons ─────────────────────────────────────────────────────────────────

const StarterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5 flex-shrink-0" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
)

const SandwichIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5 flex-shrink-0" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
  </svg>
)

const GrillIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5 flex-shrink-0" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
  </svg>
)

const DessertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5 flex-shrink-0" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
)

const DrinksIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5 flex-shrink-0" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 15M19.8 15H4.5" />
  </svg>
)

const BasketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 flex-shrink-0" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
)

// ── Category config ───────────────────────────────────────────────────────────

type CatConfig = {
  id: CategoryId
  headerBg: string
  contentBg: string
  headerText: string
  subText: string
  accentHex: string
  divider: string
  icon: JSX.Element
}

const CATS: CatConfig[] = [
  {
    id: 'starters',
    headerBg: 'bg-[#fdf6ec] hover:bg-[#f5ead6]',
    contentBg: 'bg-[#fdf6ec]',
    headerText: 'text-green-dark',
    subText: 'text-brown/50',
    accentHex: '#1a3d1f',
    divider: 'border-[#d4b896]/40',
    icon: <StarterIcon />,
  },
  {
    id: 'sandwiches',
    headerBg: 'bg-[#f0e0c8] hover:bg-[#e8d4b8]',
    contentBg: 'bg-[#faf3ea]',
    headerText: 'text-[#5c3010]',
    subText: 'text-[#8a5230]/60',
    accentHex: '#a0622a',
    divider: 'border-[#d4b896]/40',
    icon: <SandwichIcon />,
  },
  {
    id: 'grill',
    headerBg: 'bg-[#1c1008] hover:bg-[#241408]',
    contentBg: 'bg-[#140c05]',
    headerText: 'text-orange-100',
    subText: 'text-orange-300/50',
    accentHex: '#ea580c',
    divider: 'border-orange-900/30',
    icon: <GrillIcon />,
  },
  {
    id: 'desserts',
    headerBg: 'bg-[#fff0f5] hover:bg-[#ffe4ef]',
    contentBg: 'bg-[#fff5f8]',
    headerText: 'text-rose-900',
    subText: 'text-rose-400/60',
    accentHex: '#f43f5e',
    divider: 'border-rose-100/60',
    icon: <DessertIcon />,
  },
  {
    id: 'drinks',
    headerBg: 'bg-[#0a1628] hover:bg-[#0e1e36]',
    contentBg: 'bg-[#0d1e35]',
    headerText: 'text-blue-100',
    subText: 'text-blue-300/50',
    accentHex: '#3b82f6',
    divider: 'border-blue-900/30',
    icon: <DrinksIcon />,
  },
]

const CAT_LABELS: Record<CategoryId, { ca: string; es: string; en: string }> = {
  starters:   { ca: 'Per Comenzar', es: 'Para Empezar',         en: 'Starters'            },
  sandwiches: { ca: 'Entrepans',    es: 'Entrepans & Torrades',  en: 'Sandwiches & Toasts' },
  grill:      { ca: 'La Brasa',     es: 'La Nostra Brasa',       en: 'From the Grill'      },
  desserts:   { ca: 'Postres',      es: 'Postres',               en: 'Desserts'            },
  drinks:     { ca: 'Begudes',      es: 'Begudes',               en: 'Drinks'              },
}

function getCatCount(id: CategoryId): number {
  switch (id) {
    case 'starters':   return carta.filter(i => ['entrantes', 'ensalades', 'ous'].includes(i.categoria)).length
    case 'sandwiches': return carta.filter(i => i.categoria === 'especiales').length
    case 'grill':      return carta.filter(i => i.categoria === 'platos').length
    case 'desserts':   return carta.filter(i => i.categoria === 'postres').length
    case 'drinks':     return carta.filter(i => ['bebidas_soda', 'bebidas_alcohol'].includes(i.categoria)).length
  }
}

const SANDWICH_SUBCATS = [
  { id: 'freds',        label: { ca: 'Freds (½)',    es: 'Fríos (½)',    en: 'Cold (½)'    } },
  { id: 'calents',      label: { ca: 'Calents',      es: 'Calientes',    en: 'Hot'         } },
  { id: 'torrades',     label: { ca: 'Torrades',     es: 'Tostadas',     en: 'Toasts'      } },
  { id: 'hamburgueses', label: { ca: 'Hamburgueses', es: 'Hamburguesas', en: 'Burgers'     } },
]

// ── Flip Card ─────────────────────────────────────────────────────────────────

function FlipCard({
  item,
  isFlipped,
  onFlip,
  onAdd,
  darkFront,
}: {
  item: MenuItem
  isFlipped: boolean
  onFlip: () => void
  onAdd: (e: React.MouseEvent) => void
  darkFront?: boolean
}) {
  const { lang } = useLanguage()
  const frontBg = darkFront ? 'bg-neutral-900 border-white/10' : 'bg-white border-wood/20'
  const frontName = darkFront ? 'text-orange-100' : 'text-green-dark'

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: '900px', height: '260px' }}
      onClick={onFlip}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl overflow-hidden shadow-md border ${frontBg} flex flex-col`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative flex-1 overflow-hidden">
            <LocalImage src={item.imatge} alt={item[lang].nom} className="w-full h-full object-cover" icon="🍽️" />
            <div className="absolute bottom-0 right-0 m-2 bg-black/60 backdrop-blur-sm text-white text-xs font-heading font-bold px-2 py-1 rounded-full">
              {item.preu.toFixed(2)} €
            </div>
          </div>
          <div className="px-3 py-2.5">
            <p className={`font-heading font-bold text-sm leading-snug ${frontName}`}>{item[lang].nom}</p>
            <p className="text-[10px] text-gray-400 mt-0.5 font-body">{t('card_tap', lang)}</p>
          </div>
        </div>

        {/* Back — always green */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-md bg-[#1a3d1f] border border-green-900/40 flex flex-col p-4"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="font-heading font-bold text-sm mb-1 text-cream">{item[lang].nom}</p>
          <p className="font-body text-xs leading-relaxed flex-1 overflow-hidden text-cream/70">
            {item[lang].descripcio || '—'}
          </p>
          {item.alergenos.length > 0 ? (
            <div className="flex flex-wrap gap-1 my-2">
              {item.alergenos.map(a => (
                <span key={a} className="text-[10px] bg-amber-900/50 text-amber-200 px-1.5 py-0.5 rounded-full font-body" title={ALLERGEN[a].label}>
                  {ALLERGEN[a].emoji} {ALLERGEN[a].label}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[10px] text-green-400/80 my-2 font-body">{t('card_no_allergens', lang)}</p>
          )}
          <div className="flex items-center justify-between mt-1">
            <span className="font-heading font-black text-base text-green-300">{item.preu.toFixed(2)} €</span>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAdd}
              className="bg-cream text-green-dark text-xs font-heading font-bold px-3 py-1.5 rounded-full hover:bg-white transition-colors"
            >
              {t('order_add', lang)}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ── Drink Row ─────────────────────────────────────────────────────────────────

function DrinkRow({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  const { lang } = useLanguage()
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/10">
      <div className="flex-1 min-w-0">
        <span className="font-body text-sm text-blue-100 truncate block">{item[lang].nom}</span>
        {item.alergenos.length > 0 && (
          <span className="text-[10px] text-blue-300/60 font-body">{item.alergenos.map(a => ALLERGEN[a].emoji).join(' ')}</span>
        )}
      </div>
      <div className="flex items-center gap-3 ml-3 flex-shrink-0">
        <span className="font-heading font-bold text-blue-300 text-sm">{item.preu.toFixed(2)} €</span>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          onClick={onAdd}
          className="w-7 h-7 bg-blue-500/80 text-white rounded-full text-lg font-bold flex items-center justify-center hover:bg-blue-400 transition-colors"
        >
          +
        </motion.button>
      </div>
    </div>
  )
}

// ── Section header ────────────────────────────────────────────────────────────

function SectionHeader({ title, note, dark }: { title: string; note?: string; dark?: boolean }) {
  return (
    <div className="mb-6 mt-8 first:mt-0">
      <h3 className={`font-heading text-2xl font-black mb-1 ${dark ? 'text-orange-200' : 'text-green-dark'}`}>{title}</h3>
      {note && <p className={`text-xs font-body italic ${dark ? 'text-orange-300/60' : 'text-brown/50'}`}>{note}</p>}
      <div className={`w-12 h-0.5 mt-2 rounded-full ${dark ? 'bg-orange-600' : 'bg-wood'}`} />
    </div>
  )
}

// ── Cart Panel ────────────────────────────────────────────────────────────────

function CartPanel({ cart, onRemove, onIncrement, onDecrement, onClear, onClose }: {
  cart: CartItem[]
  onRemove: (id: string) => void
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
  onClear: () => void
  onClose: () => void
}) {
  const { lang } = useLanguage()
  const total = cart.reduce((s, c) => s + c.preu * c.quantitat, 0)

  const CAT_ORDER = ['entrantes', 'ensalades', 'ous', 'especiales', 'platos', 'postres', 'bebidas_soda', 'bebidas_alcohol']
  const CAT_DISPLAY: Record<string, { ca: string; es: string; en: string }> = {
    entrantes:       { ca: 'Per Começar',  es: 'Para Empezar', en: 'Starters'   },
    ensalades:       { ca: 'Amanides',     es: 'Ensaladas',    en: 'Salads'     },
    ous:             { ca: 'Ous del Racó', es: 'Huevos',       en: 'Eggs'       },
    especiales:      { ca: 'Entrepans',    es: 'Bocadillos',   en: 'Sandwiches' },
    platos:          { ca: 'La Brasa',     es: 'La Brasa',     en: 'Grill'      },
    postres:         { ca: 'Postres',      es: 'Postres',      en: 'Desserts'   },
    bebidas_soda:    { ca: 'Begudes',      es: 'Bebidas',      en: 'Drinks'     },
    bebidas_alcohol: { ca: 'Begudes',      es: 'Bebidas',      en: 'Drinks'     },
  }

  const grouped = CAT_ORDER.reduce<Record<string, CartItem[]>>((acc, cat) => {
    const items = cart.filter(c => c.categoria === cat)
    if (items.length) acc[cat] = items
    return acc
  }, {})

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className="fixed inset-x-0 bottom-0 z-50 bg-white border-t border-wood/30 shadow-2xl max-h-[80vh] flex flex-col"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-wood/20">
        <span className="font-heading font-black text-green-dark text-lg">{t('order_title', lang)}</span>
        <div className="flex gap-3">
          {cart.length > 0 && (
            <button onClick={onClear} className="text-xs font-body text-red-400 hover:text-red-600 transition-colors">
              {t('order_clear', lang)}
            </button>
          )}
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-wood/20 flex items-center justify-center text-brown hover:bg-wood/40 transition-colors text-sm font-bold">
            ✕
          </button>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-4 py-2">
        {cart.length === 0 ? (
          <p className="text-center text-brown/50 font-body py-8">{t('order_empty', lang)}</p>
        ) : (
          Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="mb-4">
              <p className="text-[10px] uppercase tracking-widest font-body text-brown/40 mb-1">{CAT_DISPLAY[cat]?.[lang] ?? cat}</p>
              {items.map(cartItem => {
                const source = carta.find(c => c.id === cartItem.id)
                const nom = source ? source[lang].nom : cartItem.id
                return (
                  <div key={cartItem.id} className="flex items-center gap-2 py-1.5">
                    <span className="flex-1 font-body text-sm text-brown truncate">{nom}</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => onDecrement(cartItem.id)} className="w-6 h-6 rounded-full bg-wood/20 text-brown text-sm font-bold hover:bg-wood/40 transition-colors flex items-center justify-center">−</button>
                      <span className="w-5 text-center font-heading font-bold text-green-dark text-sm">{cartItem.quantitat}</span>
                      <button onClick={() => onIncrement(cartItem.id)} className="w-6 h-6 rounded-full bg-green-dark text-cream text-sm font-bold hover:bg-green-mid transition-colors flex items-center justify-center">+</button>
                    </div>
                    <span className="w-16 text-right font-heading font-bold text-green-dark text-sm">{(cartItem.preu * cartItem.quantitat).toFixed(2)} €</span>
                    <button onClick={() => onRemove(cartItem.id)} className="text-red-300 hover:text-red-500 text-xs transition-colors">✕</button>
                  </div>
                )
              })}
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="border-t border-wood/20 px-4 py-3 bg-parchment/80">
          <div className="flex items-center justify-between mb-2">
            <span className="font-heading font-black text-green-dark">{t('order_total', lang)}</span>
            <span className="font-heading font-black text-green-dark text-xl">{total.toFixed(2)} €</span>
          </div>
          <p className="text-center text-xs text-brown/50 font-body">{t('order_note', lang)}</p>
        </div>
      )}
    </motion.div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function MenuContent() {
  const { lang } = useLanguage()

  const [activeCategory, setActiveCategory] = useState<CategoryId | null>('starters')
  const [activeSandwichSubcat, setActiveSandwichSubcat] = useState('freds')
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartLoaded, setCartLoaded] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    try { const raw = sessionStorage.getItem('raco-cart'); if (raw) setCart(JSON.parse(raw)) } catch {}
    setCartLoaded(true)
  }, [])

  useEffect(() => {
    if (cartLoaded) sessionStorage.setItem('raco-cart', JSON.stringify(cart))
  }, [cart, cartLoaded])

  useEffect(() => { setActiveCardId(null) }, [activeCategory, activeSandwichSubcat])

  const addToCart = useCallback((item: MenuItem) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id)
      if (ex) return prev.map(c => c.id === item.id ? { ...c, quantitat: c.quantitat + 1 } : c)
      return [...prev, { id: item.id, preu: item.preu, quantitat: 1, categoria: item.categoria }]
    })
  }, [])

  const removeFromCart  = useCallback((id: string) => setCart(prev => prev.filter(c => c.id !== id)), [])
  const incrementCart   = useCallback((id: string) => setCart(prev => prev.map(c => c.id === id ? { ...c, quantitat: c.quantitat + 1 } : c)), [])
  const decrementCart   = useCallback((id: string) => setCart(prev => {
    const item = prev.find(c => c.id === id)
    if (!item) return prev
    if (item.quantitat <= 1) return prev.filter(c => c.id !== id)
    return prev.map(c => c.id === id ? { ...c, quantitat: c.quantitat - 1 } : c)
  }), [])

  const totalItems = cart.reduce((s, c) => s + c.quantitat, 0)

  const starterItems  = carta.filter(i => i.categoria === 'entrantes')
  const saladItems    = carta.filter(i => i.categoria === 'ensalades')
  const eggsItems     = carta.filter(i => i.categoria === 'ous')
  const grillItems    = carta.filter(i => i.categoria === 'platos')
  const dessertItems  = carta.filter(i => i.categoria === 'postres')
  const sandwichItems = carta.filter(i => i.categoria === 'especiales' && i.subcategoria === activeSandwichSubcat)

  const DRINK_SUBCATS_NA = [
    { id: 'refrescos',    label: { ca: 'Refrescos',         es: 'Refrescos',          en: 'Soft Drinks'  } },
    { id: 'cervezas_sin', label: { ca: 'Cerveses 0,0%',     es: 'Cervezas 0,0%',      en: 'Non-Alc Beer' } },
    { id: 'cafes',        label: { ca: 'Cafès i Infusions', es: 'Cafés e Infusiones',  en: 'Coffee & Tea' } },
  ]
  const DRINK_SUBCATS_A = [
    { id: 'cervezas',      label: { ca: 'Cerveses',    es: 'Cervezas',      en: 'Beers'       } },
    { id: 'vinos_blancos', label: { ca: 'Vins Blancs', es: 'Vinos Blancos', en: 'White Wines' } },
    { id: 'vinos_tintos',  label: { ca: 'Vins Negres', es: 'Vinos Tintos',  en: 'Red Wines'   } },
    { id: 'combinados',    label: { ca: 'Combinats',   es: 'Combinados',    en: 'Spirits'     } },
    { id: 'copas',         label: { ca: 'Copes',       es: 'Copas',         en: 'Glasses'     } },
  ]

  function renderCardGrid(items: MenuItem[], darkFront?: boolean) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <FlipCard
              item={item}
              isFlipped={activeCardId === item.id}
              onFlip={() => setActiveCardId(prev => prev === item.id ? null : item.id)}
              onAdd={(e) => { e.stopPropagation(); addToCart(item); setActiveCardId(null) }}
              darkFront={darkFront}
            />
          </motion.div>
        ))}
      </div>
    )
  }

  function renderDrinkSection(subcats: { id: string; label: { ca: string; es: string; en: string } }[], cat: string) {
    return subcats.map(subcat => {
      const items = carta.filter(i => i.categoria === cat && i.subcategoria === subcat.id)
      if (!items.length) return null
      return (
        <div key={subcat.id} className="mb-6">
          <h4 className="font-heading text-sm font-bold text-blue-300 uppercase tracking-widest mb-2">{subcat.label[lang]}</h4>
          {items.map(item => <DrinkRow key={item.id} item={item} onAdd={() => addToCart(item)} />)}
        </div>
      )
    })
  }

  function renderCategoryContent(catId: CategoryId) {
    switch (catId) {
      case 'starters':
        return (
          <>
            <SectionHeader title={t('section_starters', lang)} />
            {renderCardGrid(starterItems)}
            <SectionHeader title={t('section_salads', lang)} />
            {renderCardGrid(saladItems)}
            <SectionHeader title={t('section_eggs', lang)} note={t('ous_note', lang)} />
            {renderCardGrid(eggsItems)}
          </>
        )
      case 'sandwiches':
        return (
          <>
            <div className="flex flex-wrap gap-2 mb-8">
              {SANDWICH_SUBCATS.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSandwichSubcat(sub.id)}
                  className={`px-4 py-2 rounded-full text-sm font-heading font-bold transition-all ${
                    activeSandwichSubcat === sub.id
                      ? 'bg-[#a0622a] text-white shadow-md'
                      : 'bg-[#e8d0b8] text-[#6b3d1a] hover:bg-[#d4b896]'
                  }`}
                >
                  {sub.label[lang]}
                </button>
              ))}
            </div>
            {activeSandwichSubcat === 'hamburgueses' && (
              <p className="text-xs font-body italic text-[#6b3d1a]/60 mb-4">{t('hamburguesa_note', lang)}</p>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSandwichSubcat}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                {renderCardGrid(sandwichItems)}
              </motion.div>
            </AnimatePresence>
          </>
        )
      case 'grill':
        return (
          <>
            <SectionHeader title={t('section_grill', lang)} note={t('brasa_note', lang)} dark />
            {renderCardGrid(grillItems, true)}
          </>
        )
      case 'desserts':
        return (
          <>
            <SectionHeader title={t('section_desserts', lang)} />
            {renderCardGrid(dessertItems)}
          </>
        )
      case 'drinks':
        return (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-heading text-lg font-black text-blue-200 mb-4 border-b border-blue-800/50 pb-2">{t('drinks_no_alcohol', lang)}</h3>
              {renderDrinkSection(DRINK_SUBCATS_NA, 'bebidas_soda')}
            </div>
            <div>
              <h3 className="font-heading text-lg font-black text-blue-200 mb-4 border-b border-blue-800/50 pb-2">{t('drinks_alcohol', lang)}</h3>
              {renderDrinkSection(DRINK_SUBCATS_A, 'bebidas_alcohol')}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen">

      {/* Page header */}
      <div className="pt-20 pb-8 text-center bg-parchment relative overflow-hidden">
        <svg className="absolute left-0 top-4 w-24 opacity-10 hidden lg:block" viewBox="0 0 80 120" fill="none">
          <path d="M40 120 C40 80 5 60 10 20 Q20 0 40 10 Q60 0 70 20 C75 60 40 80 40 120Z" fill="#1a3d1f"/>
          <path d="M40 90 C30 70 10 65 15 45 Q22 30 35 40" stroke="#4a7c3f" strokeWidth="1.5" fill="none"/>
          <path d="M40 90 C50 70 70 65 65 45 Q58 30 45 40" stroke="#4a7c3f" strokeWidth="1.5" fill="none"/>
        </svg>
        <svg className="absolute right-0 top-4 w-24 opacity-10 hidden lg:block scale-x-[-1]" viewBox="0 0 80 120" fill="none">
          <path d="M40 120 C40 80 5 60 10 20 Q20 0 40 10 Q60 0 70 20 C75 60 40 80 40 120Z" fill="#1a3d1f"/>
          <path d="M40 90 C30 70 10 65 15 45 Q22 30 35 40" stroke="#4a7c3f" strokeWidth="1.5" fill="none"/>
          <path d="M40 90 C50 70 70 65 65 45 Q58 30 45 40" stroke="#4a7c3f" strokeWidth="1.5" fill="none"/>
        </svg>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-body text-brown/40 text-xs uppercase tracking-[0.3em] mb-2">
          El Racó del Pantà
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-heading text-4xl md:text-5xl font-black text-green-dark">
          La Nostra Carta
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="font-body italic text-brown/50 text-sm mt-2">
          Cuina de temporada · Productes locals · Elaboració artesanal
        </motion.p>
      </div>

      {/* Accordion */}
      <div className="max-w-5xl mx-auto pb-32">
        {CATS.map((cat, i) => {
          const isOpen = activeCategory === cat.id
          const count = getCatCount(cat.id)
          const dishWord = lang === 'ca' ? 'plats' : lang === 'en' ? 'dishes' : 'platos'
          return (
            <div key={cat.id} className={`border-b ${cat.divider}`}>
              <motion.button
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                onClick={() => setActiveCategory(isOpen ? null : cat.id)}
                style={isOpen ? { borderLeft: `4px solid ${cat.accentHex}` } : { borderLeft: '4px solid transparent' }}
                className={`w-full flex items-center justify-between px-6 py-5 transition-colors ${cat.headerBg}`}
              >
                <div className={`flex items-center gap-3 ${cat.headerText}`}>
                  {cat.icon}
                  <span className="font-heading text-lg md:text-xl font-black">{CAT_LABELS[cat.id][lang]}</span>
                </div>
                <div className="flex items-center gap-3">
                  {!isOpen && (
                    <span className={`text-xs font-body hidden sm:block ${cat.subText}`}>{count} {dishWord}</span>
                  )}
                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                    className={`w-5 h-5 flex-shrink-0 ${cat.headerText}`}
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </div>
              </motion.button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={cat.id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className="overflow-hidden"
                  >
                    <div className={`${cat.contentBg} px-4 md:px-8 py-8`}>
                      {renderCategoryContent(cat.id)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Allergen note */}
      <div className="border-t border-wood/30 py-10 px-4 text-center bg-cream/50">
        <p className="text-brown/45 text-xs font-body max-w-lg mx-auto mb-6 leading-relaxed">{t('allergens_note', lang)}</p>
        <a href="/reservar" className="inline-block bg-green-dark text-cream px-8 py-3.5 rounded-full font-heading font-bold hover:bg-green-mid transition-all hover:scale-105 shadow-md">
          {t('book_title', lang)}
        </a>
      </div>

      {/* Cart pill */}
      {totalItems > 0 && !cartOpen && (
        <motion.button
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 bg-green-dark text-cream px-5 py-3 rounded-full shadow-2xl font-heading font-bold text-sm"
        >
          <BasketIcon />
          <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-black">{totalItems}</span>
          <span>{t('order_title', lang)}</span>
          <span className="text-cream/70">{cart.reduce((s, c) => s + c.preu * c.quantitat, 0).toFixed(2)} €</span>
        </motion.button>
      )}

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40" onClick={() => setCartOpen(false)} />
            <CartPanel cart={cart} onRemove={removeFromCart} onIncrement={incrementCart} onDecrement={decrementCart} onClear={() => setCart([])} onClose={() => setCartOpen(false)} />
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
