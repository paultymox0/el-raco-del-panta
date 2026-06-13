'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Salad, Sandwich, Flame, IceCreamCone, Wine } from 'lucide-react'
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

// ── Icons ─────────────────────────────────────────────────────────────────────

const ICON_PROPS = { size: 24, strokeWidth: 1.5, className: 'flex-shrink-0', 'aria-hidden': true } as const

const BasketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 flex-shrink-0" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
)

// ── Category config ───────────────────────────────────────────────────────────

type CatConfig = {
  id: CategoryId
  icon: JSX.Element
  tabActive: string
  tabInactive: string
  contentStyle: React.CSSProperties
  dark: boolean
  subcatActive: string
  subcatInactive: string
}

const CATS: CatConfig[] = [
  {
    id: 'starters',
    icon: <Salad {...ICON_PROPS} />,
    tabActive: 'bg-[#1a3d1f] text-[#f5ead6] shadow-md',
    tabInactive: 'bg-[#f5ead6]/70 text-[#2c1a0e]/70 hover:bg-[#f5ead6] hover:text-[#2c1a0e]',
    contentStyle: { backgroundImage: 'linear-gradient(160deg, #fdf8f0 0%, #f5ead6 55%, #ede0c4 100%)' },
    dark: false,
    subcatActive: 'bg-[#1a3d1f] text-[#f5ead6]',
    subcatInactive: 'bg-[#ede0c4] text-[#4a2c0e] hover:bg-[#d4b896]',
  },
  {
    id: 'sandwiches',
    icon: <Sandwich {...ICON_PROPS} />,
    tabActive: 'bg-[#a0622a] text-white shadow-md',
    tabInactive: 'bg-[#f0e0c8]/80 text-[#5c3010]/70 hover:bg-[#e8d4b8] hover:text-[#5c3010]',
    contentStyle: { backgroundImage: 'linear-gradient(160deg, #fdf0dc 0%, #f0d9a8 50%, #e0c480 100%)' },
    dark: false,
    subcatActive: 'bg-[#a0622a] text-white',
    subcatInactive: 'bg-[#e8d0b8] text-[#6b3d1a] hover:bg-[#d4b896]',
  },
  {
    id: 'grill',
    icon: <Flame {...ICON_PROPS} />,
    tabActive: 'bg-[#1a0e05] text-orange-200 shadow-md ring-1 ring-orange-800/50',
    tabInactive: 'bg-[#261206]/70 text-orange-300/70 hover:bg-[#301a08] hover:text-orange-200',
    contentStyle: {
      backgroundImage:
        'radial-gradient(ellipse 100% 45% at 50% 100%, rgba(234,88,12,0.45) 0%, transparent 65%), radial-gradient(ellipse 60% 30% at 30% 80%, rgba(234,88,12,0.2) 0%, transparent 60%), linear-gradient(180deg, #1a0e05 0%, #261205 55%, #1a0e05 100%)',
    },
    dark: true,
    subcatActive: 'bg-orange-700 text-white',
    subcatInactive: 'bg-orange-950/60 text-orange-300/70 hover:bg-orange-900/60',
  },
  {
    id: 'desserts',
    icon: <IceCreamCone {...ICON_PROPS} />,
    tabActive: 'bg-rose-700 text-white shadow-md',
    tabInactive: 'bg-rose-50/80 text-rose-700/70 hover:bg-rose-100 hover:text-rose-700',
    contentStyle: { backgroundImage: 'linear-gradient(160deg, #fff9fc 0%, #fce8f0 50%, #f5d0e4 100%)' },
    dark: false,
    subcatActive: 'bg-rose-700 text-white',
    subcatInactive: 'bg-rose-100 text-rose-700 hover:bg-rose-200',
  },
  {
    id: 'drinks',
    icon: <Wine {...ICON_PROPS} />,
    tabActive: 'bg-[#0a1628] text-blue-200 shadow-md ring-1 ring-blue-800/50',
    tabInactive: 'bg-[#0d1e35]/70 text-blue-300/70 hover:bg-[#0a1628] hover:text-blue-200',
    contentStyle: {
      backgroundImage:
        'radial-gradient(ellipse 55% 35% at 82% 88%, rgba(245,158,11,0.18) 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 15% 60%, rgba(59,130,246,0.12) 0%, transparent 65%), linear-gradient(160deg, #0d1e35 0%, #0a1628 60%, #061020 100%)',
    },
    dark: true,
    subcatActive: 'bg-blue-600 text-white',
    subcatInactive: 'bg-blue-950/60 text-blue-300/70 hover:bg-blue-900/60',
  },
]

const CAT_LABELS: Record<CategoryId, { ca: string; es: string; en: string }> = {
  starters:   { ca: 'Per Começar',         es: 'Para Empezar',          en: 'Starters'            },
  sandwiches: { ca: 'Entrepans i Torrades', es: 'Bocadillos y Tostadas', en: 'Sandwiches & Toasts' },
  grill:      { ca: 'La Nostra Brasa',      es: 'Nuestra Brasa',         en: 'Our Grill'           },
  desserts:   { ca: 'Postres',              es: 'Postres',               en: 'Desserts'            },
  drinks:     { ca: 'Begudes',              es: 'Bebidas',               en: 'Drinks'              },
}

const STARTER_SUBCATS = [
  { id: 'entrantes', label: { ca: 'Per Começar',  es: 'Para Empezar',    en: 'Starters'        } },
  { id: 'ensalades', label: { ca: 'Amanides',     es: 'Ensaladas',       en: 'Salads'          } },
  { id: 'ous',       label: { ca: 'Ous del Racó', es: 'Huevos del Racó', en: 'Eggs of El Racó' } },
]

const SANDWICH_SUBCATS = [
  { id: 'freds',        label: { ca: 'Freds',        es: 'Fríos',       en: 'Cold'    } },
  { id: 'calents',      label: { ca: 'Calents',      es: 'Calientes',   en: 'Hot'     } },
  { id: 'torrades',     label: { ca: 'Torrades',     es: 'Tostadas',    en: 'Toasts'  } },
  { id: 'hamburgueses', label: { ca: 'Hamburgueses', es: 'Hamburguesas',en: 'Burgers' } },
]

const ALL_DRINK_SUBCATS = [
  { id: 'cervezas',      cat: 'bebidas_alcohol', label: { ca: 'Cerveses',     es: 'Cervezas',      en: 'Beers'           } },
  { id: 'refrescos',     cat: 'bebidas_soda',    label: { ca: 'Refrescos',    es: 'Refrescos',     en: 'Soft Drinks'     } },
  { id: 'cafes',         cat: 'bebidas_soda',    label: { ca: 'Cafès i Sucs', es: 'Cafés y Zumos', en: 'Coffees & Juices'} },
  { id: 'vinos_blancos', cat: 'bebidas_alcohol', label: { ca: 'Vins Blancs',  es: 'Vinos Blancos', en: 'White Wines'     } },
  { id: 'vinos_tintos',  cat: 'bebidas_alcohol', label: { ca: 'Vins Negres',  es: 'Vinos Negros',  en: 'Red Wines'       } },
  { id: 'combinados',    cat: 'bebidas_alcohol', label: { ca: 'Combinats',    es: 'Combinados',    en: 'Spirits'         } },
  { id: 'copas',         cat: 'bebidas_alcohol', label: { ca: 'Copes',        es: 'Copas',         en: 'Glasses'         } },
]

// ── Grill ember sparks ────────────────────────────────────────────────────────

function EmberSparks() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {[...Array(14)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width:  2 + (i % 3),
            height: 2 + (i % 3),
            background: i % 3 === 0 ? '#f97316' : i % 3 === 1 ? '#fbbf24' : '#ef4444',
            left:   `${8 + (i * 6.5) % 84}%`,
            bottom: `${4 + (i * 9) % 28}%`,
          }}
          animate={{
            y:       [0, -(55 + i * 9)],
            opacity: [0, 0.85, 0],
            x:       [0, (i % 2 === 0 ? 1 : -1) * (4 + i * 2)],
          }}
          transition={{
            duration: 2.2 + (i % 3) * 0.6,
            repeat:   Infinity,
            delay:    i * 0.32,
            ease:     'easeOut',
          }}
        />
      ))}
    </div>
  )
}

// ── Flip Card ─────────────────────────────────────────────────────────────────

function FlipCard({
  item,
  isFlipped,
  onFlip,
  onAdd,
  onLongPress,
  darkFront,
}: {
  item: MenuItem
  isFlipped: boolean
  onFlip: () => void
  onAdd: (e: React.MouseEvent) => void
  onLongPress?: (src: string) => void
  darkFront?: boolean
}) {
  const { lang } = useLanguage()
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longPressTriggered = useRef(false)
  const frontBg   = darkFront ? 'bg-neutral-900 border-white/10' : 'bg-white border-wood/20'
  const frontName  = darkFront ? 'text-orange-100' : 'text-green-dark'

  function handlePointerDown() {
    if (isFlipped) return
    longPressTriggered.current = false
    pressTimer.current = setTimeout(() => {
      longPressTriggered.current = true
      onLongPress?.(item.imatge)
    }, 400)
  }

  function handlePointerUp() {
    if (pressTimer.current) { clearTimeout(pressTimer.current); pressTimer.current = null }
  }

  function handleCardClick() {
    if (longPressTriggered.current) { longPressTriggered.current = false; return }
    onFlip()
  }

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: '900px', height: '260px' }}
      onClick={handleCardClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
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

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-md bg-[#1a3d1f] border border-green-900/40 flex flex-col p-4"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="font-heading font-bold text-sm mb-1 text-cream">{item[lang].nom}</p>
          <p className="font-body text-xs leading-relaxed flex-1 overflow-hidden text-cream/70">
            {item[lang].descripcio || '—'}
          </p>
          {item.alergenos.length > 0 ? (
            <div className="flex flex-wrap gap-1 my-2">
              {item.alergenos.map(a => (
                <span key={a} className="text-[10px] bg-amber-900/50 text-amber-200 px-1.5 py-0.5 rounded-full font-body">
                  {ALLERGEN[a].label}
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
              onClick={(e) => { e.stopPropagation(); onAdd(e) }}
              className="bg-cream text-green-dark text-xs font-heading font-bold px-4 py-2.5 min-h-[40px] rounded-full hover:bg-white transition-colors"
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
    <div className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0">
      <div className="flex-1 min-w-0">
        <span className="font-body text-sm text-blue-100 truncate block">{item[lang].nom}</span>
        {item.alergenos.length > 0 && (
          <span className="text-[10px] text-blue-300/60 font-body">{item.alergenos.map(a => ALLERGEN[a].label).join(', ')}</span>
        )}
      </div>
      <div className="flex items-center gap-3 ml-3 flex-shrink-0">
        <span className="font-heading font-bold text-blue-300 text-sm">{item.preu.toFixed(2)} €</span>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          onClick={onAdd}
          className="w-10 h-10 sm:w-8 sm:h-8 bg-blue-500/80 text-white rounded-full text-lg font-bold flex items-center justify-center hover:bg-blue-400 transition-colors flex-shrink-0"
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
      className="fixed inset-x-0 bottom-0 z-50 bg-white border-t border-wood/30 shadow-2xl max-h-[80vh] flex flex-col rounded-t-2xl pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-wood/20">
        <span className="font-heading font-black text-green-dark text-lg">{t('order_title', lang)}</span>
        <div className="flex gap-3">
          {cart.length > 0 && (
            <button onClick={onClear} className="text-xs font-body text-red-400 hover:text-red-600 transition-colors">
              {t('order_clear', lang)}
            </button>
          )}
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-wood/20 flex items-center justify-center text-brown hover:bg-wood/40 transition-colors text-sm font-bold" aria-label="Close cart">
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
                      <button onClick={() => onDecrement(cartItem.id)} className="w-9 h-9 rounded-full bg-wood/20 text-brown text-sm font-bold hover:bg-wood/40 transition-colors flex items-center justify-center" aria-label="Decrease quantity">−</button>
                      <span className="w-5 text-center font-heading font-bold text-green-dark text-sm">{cartItem.quantitat}</span>
                      <button onClick={() => onIncrement(cartItem.id)} className="w-9 h-9 rounded-full bg-green-dark text-cream text-sm font-bold hover:bg-green-mid transition-colors flex items-center justify-center" aria-label="Increase quantity">+</button>
                    </div>
                    <span className="w-16 text-right font-heading font-bold text-green-dark text-sm">{(cartItem.preu * cartItem.quantitat).toFixed(2)} €</span>
                    <button onClick={() => onRemove(cartItem.id)} className="w-8 h-8 flex items-center justify-center text-red-300 hover:text-red-500 text-xs transition-colors" aria-label="Remove item">✕</button>
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

  const [activeCategory, setActiveCategory]             = useState<CategoryId>('starters')
  const [activeStarterSubcat, setActiveStarterSubcat]   = useState('entrantes')
  const [activeSandwichSubcat, setActiveSandwichSubcat] = useState('freds')
  const [activeDrinkSubcat, setActiveDrinkSubcat]       = useState('cervezas')
  const [activeCardId, setActiveCardId]                 = useState<string | null>(null)
  const [cart, setCart]                                 = useState<CartItem[]>([])
  const [cartLoaded, setCartLoaded]                     = useState(false)
  const [cartOpen, setCartOpen]                         = useState(false)
  const [lightboxSrc, setLightboxSrc]                   = useState<string | null>(null)

  useEffect(() => {
    try { const raw = sessionStorage.getItem('raco-cart'); if (raw) setCart(JSON.parse(raw)) } catch {}
    setCartLoaded(true)
  }, [])

  useEffect(() => {
    if (cartLoaded) sessionStorage.setItem('raco-cart', JSON.stringify(cart))
  }, [cart, cartLoaded])

  useEffect(() => { setActiveCardId(null) }, [activeCategory, activeStarterSubcat, activeSandwichSubcat])

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

  const grillItems    = carta.filter(i => i.categoria === 'platos')
  const dessertItems  = carta.filter(i => i.categoria === 'postres')
  const sandwichItems = carta.filter(i => i.categoria === 'especiales' && i.subcategoria === activeSandwichSubcat)

  function renderCardGrid(items: MenuItem[], darkFront?: boolean) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              onLongPress={(src) => setLightboxSrc(src)}
              darkFront={darkFront}
            />
          </motion.div>
        ))}
      </div>
    )
  }

  function renderCategoryContent(catId: CategoryId) {
    switch (catId) {
      case 'starters': {
        const starterSubItems = carta.filter(i => i.categoria === activeStarterSubcat)
        return (
          <>
            <div className="flex overflow-x-auto gap-2 mb-8 pb-1 [&::-webkit-scrollbar]:hidden">
              {STARTER_SUBCATS.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveStarterSubcat(sub.id)}
                  className={`px-4 py-2 min-h-[44px] rounded-full text-sm font-heading font-bold whitespace-nowrap flex-shrink-0 transition-all ${
                    activeStarterSubcat === sub.id
                      ? 'bg-[#1a3d1f] text-[#f5ead6] shadow-md'
                      : 'bg-[#ede0c4] text-[#4a2c0e] hover:bg-[#d4b896]'
                  }`}
                >
                  {sub.label[lang]}
                </button>
              ))}
            </div>
            {activeStarterSubcat === 'ous' && (
              <p className="text-xs font-body italic text-brown/50 mb-4">{t('ous_note', lang)}</p>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStarterSubcat}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                {renderCardGrid(starterSubItems)}
              </motion.div>
            </AnimatePresence>
          </>
        )
      }

      case 'sandwiches':
        return (
          <>
            <div className="flex overflow-x-auto gap-2 mb-8 pb-1 [&::-webkit-scrollbar]:hidden">
              {SANDWICH_SUBCATS.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSandwichSubcat(sub.id)}
                  className={`px-4 py-2 min-h-[44px] rounded-full text-sm font-heading font-bold whitespace-nowrap flex-shrink-0 transition-all ${
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

      case 'drinks': {
        const drinkItems = carta.filter(i => {
          const sub = ALL_DRINK_SUBCATS.find(s => s.id === activeDrinkSubcat)
          return sub && i.categoria === sub.cat && i.subcategoria === activeDrinkSubcat
        })
        return (
          <>
            <div className="flex overflow-x-auto gap-2 mb-8 pb-1 [&::-webkit-scrollbar]:hidden">
              {ALL_DRINK_SUBCATS.map(sub => {
                const hasItems = carta.some(i => i.categoria === sub.cat && i.subcategoria === sub.id)
                if (!hasItems) return null
                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveDrinkSubcat(sub.id)}
                    className={`px-4 py-2 min-h-[44px] rounded-full text-sm font-heading font-bold whitespace-nowrap flex-shrink-0 transition-all ${
                      activeDrinkSubcat === sub.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-blue-950/60 text-blue-300/70 hover:bg-blue-900/60'
                    }`}
                  >
                    {sub.label[lang]}
                  </button>
                )
              })}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDrinkSubcat}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                {drinkItems.map(item => <DrinkRow key={item.id} item={item} onAdd={() => addToCart(item)} />)}
              </motion.div>
            </AnimatePresence>
          </>
        )
      }
    }
  }

  const activeCat = CATS.find(c => c.id === activeCategory)!

  return (
    <div className="min-h-screen">

      {/* Page header */}
      <div className="pt-20 pb-8 text-center bg-parchment relative overflow-hidden">
        <svg className="absolute left-0 top-4 w-24 opacity-10 hidden lg:block" viewBox="0 0 80 120" fill="none" aria-hidden>
          <path d="M40 120 C40 80 5 60 10 20 Q20 0 40 10 Q60 0 70 20 C75 60 40 80 40 120Z" fill="#1a3d1f"/>
          <path d="M40 90 C30 70 10 65 15 45 Q22 30 35 40" stroke="#4a7c3f" strokeWidth="1.5" fill="none"/>
          <path d="M40 90 C50 70 70 65 65 45 Q58 30 45 40" stroke="#4a7c3f" strokeWidth="1.5" fill="none"/>
        </svg>
        <svg className="absolute right-0 top-4 w-24 opacity-10 hidden lg:block scale-x-[-1]" viewBox="0 0 80 120" fill="none" aria-hidden>
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
      </div>

      {/* Horizontal category tabs — sticky */}
      <div className="sticky top-[68px] z-30 bg-parchment/95 backdrop-blur-sm border-b border-wood/20 shadow-sm">
        <div className="flex overflow-x-auto gap-2 px-4 py-3 [&::-webkit-scrollbar]:hidden max-w-5xl mx-auto">
          {CATS.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full text-sm font-heading font-bold whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                activeCategory === cat.id ? cat.tabActive : cat.tabInactive
              }`}
            >
              {cat.icon}
              {CAT_LABELS[cat.id][lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Category content — crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={activeCat.contentStyle}
          className="relative min-h-[60vh]"
        >
          {activeCategory === 'grill' && <EmberSparks />}
          <div className="max-w-5xl mx-auto px-4 py-8 relative z-10">
            {renderCategoryContent(activeCategory)}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Allergen note */}
      <div className="border-t border-wood/30 py-10 px-4 text-center bg-cream/50">
        <p className="text-brown/45 text-xs font-body max-w-lg mx-auto leading-relaxed">{t('allergens_note', lang)}</p>
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
          className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 bg-green-dark text-cream px-5 py-3 min-h-[48px] rounded-full shadow-2xl font-heading font-bold text-sm whitespace-nowrap"
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxSrc(null)}
          >
            <button
              onClick={() => setLightboxSrc(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
            <motion.img
              src={lightboxSrc}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              alt="Dish photo"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
