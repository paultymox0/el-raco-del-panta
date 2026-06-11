'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { carta, MenuItem, Allergen } from '@/data/carta'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'
import LocalImage from '@/components/LocalImage'

// ── Types ─────────────────────────────────────────────────────────────────────

type CartItem = { id: string; preu: number; quantitat: number; categoria: string }

type CategoryId = 'starters' | 'sandwiches' | 'grill' | 'desserts' | 'drinks'

// ── Allergen display ──────────────────────────────────────────────────────────

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

// ── Category config ───────────────────────────────────────────────────────────

const CATS: { id: CategoryId; icon: string; bg: string; accent: string; text: string }[] = [
  {
    id: 'starters',
    icon: '🫒',
    bg: 'bg-parchment',
    accent: 'bg-green-dark',
    text: 'text-green-dark',
  },
  {
    id: 'sandwiches',
    icon: '🥪',
    bg: 'bg-[#f8efe3]',
    accent: 'bg-[#a0622a]',
    text: 'text-[#6b3d1a]',
  },
  {
    id: 'grill',
    icon: '🔥',
    bg: 'bg-[#1c1008]',
    accent: 'bg-orange-600',
    text: 'text-orange-200',
  },
  {
    id: 'desserts',
    icon: '🍮',
    bg: 'bg-[#fff5f5]',
    accent: 'bg-rose-600',
    text: 'text-rose-900',
  },
  {
    id: 'drinks',
    icon: '🍺',
    bg: 'bg-[#0a1628]',
    accent: 'bg-blue-500',
    text: 'text-blue-100',
  },
]

const CAT_LABELS: Record<CategoryId, { ca: string; es: string; en: string }> = {
  starters:   { ca: 'Per Comenzar', es: 'Para Empezar',         en: 'Starters'             },
  sandwiches: { ca: 'Entrepans',    es: 'Entrepans & Torrades',  en: 'Sandwiches & Toasts'  },
  grill:      { ca: 'La Brasa',     es: 'La Nostra Brasa',       en: 'From the Grill'       },
  desserts:   { ca: 'Postres',      es: 'Postres',               en: 'Desserts'             },
  drinks:     { ca: 'Begudes',      es: 'Begudes',               en: 'Drinks'               },
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
  darkBg,
}: {
  item: MenuItem
  isFlipped: boolean
  onFlip: () => void
  onAdd: (e: React.MouseEvent) => void
  darkBg?: boolean
}) {
  const { lang } = useLanguage()
  const cardBg = darkBg ? 'bg-neutral-900 border-white/10' : 'bg-white border-wood/20'
  const nameCls = darkBg ? 'text-orange-100' : 'text-green-dark'
  const priceCls = darkBg ? 'text-orange-400' : 'text-green-mid'
  const descCls = darkBg ? 'text-white/70' : 'text-brown/70'

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
        {/* ── Front ── */}
        <div
          className={`absolute inset-0 rounded-2xl overflow-hidden shadow-md border ${cardBg} flex flex-col`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative flex-1 overflow-hidden">
            <LocalImage
              src={item.imatge}
              alt={item[lang].nom}
              className="w-full h-full object-cover"
              icon="🍽️"
            />
            <div className="absolute bottom-0 right-0 m-2 bg-black/60 backdrop-blur-sm text-white text-xs font-heading font-bold px-2 py-1 rounded-full">
              {item.preu.toFixed(2)} €
            </div>
          </div>
          <div className="px-3 py-2.5">
            <p className={`font-heading font-bold text-sm leading-snug ${nameCls}`}>
              {item[lang].nom}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 font-body">
              {t('card_tap', lang).split('\n')[0]}
            </p>
          </div>
        </div>

        {/* ── Back ── */}
        <div
          className={`absolute inset-0 rounded-2xl overflow-hidden shadow-md border ${cardBg} flex flex-col p-4`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <p className={`font-heading font-bold text-sm mb-1 ${nameCls}`}>{item[lang].nom}</p>
          <p className={`font-body text-xs leading-relaxed flex-1 overflow-hidden ${descCls}`}>
            {item[lang].descripcio || '—'}
          </p>
          {item.alergenos.length > 0 ? (
            <div className="flex flex-wrap gap-1 my-2">
              {item.alergenos.map(a => (
                <span
                  key={a}
                  className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-body"
                  title={ALLERGEN[a].label}
                >
                  {ALLERGEN[a].emoji} {ALLERGEN[a].label}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[10px] text-green-600 my-2 font-body">{t('card_no_allergens', lang)}</p>
          )}
          <div className="flex items-center justify-between mt-1">
            <span className={`font-heading font-black text-base ${priceCls}`}>
              {item.preu.toFixed(2)} €
            </span>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAdd}
              className="bg-green-dark text-cream text-xs font-heading font-bold px-3 py-1.5 rounded-full hover:bg-green-mid transition-colors"
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
          <span className="text-[10px] text-blue-300/60 font-body">
            {item.alergenos.map(a => ALLERGEN[a].emoji).join(' ')}
          </span>
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

function SectionHeader({ title, note, darkBg }: { title: string; note?: string; darkBg?: boolean }) {
  return (
    <div className="mb-6 mt-8 first:mt-0">
      <h3 className={`font-heading text-2xl font-black mb-1 ${darkBg ? 'text-orange-200' : 'text-green-dark'}`}>
        {title}
      </h3>
      {note && (
        <p className={`text-xs font-body italic ${darkBg ? 'text-orange-300/60' : 'text-brown/50'}`}>{note}</p>
      )}
      <div className={`w-12 h-0.5 mt-2 rounded-full ${darkBg ? 'bg-orange-600' : 'bg-wood'}`} />
    </div>
  )
}

// ── Cart Panel ────────────────────────────────────────────────────────────────

function CartPanel({
  cart,
  onRemove,
  onIncrement,
  onDecrement,
  onClear,
  onClose,
}: {
  cart: CartItem[]
  onRemove: (id: string) => void
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
  onClear: () => void
  onClose: () => void
}) {
  const { lang } = useLanguage()
  const total = cart.reduce((s, c) => s + c.preu * c.quantitat, 0)

  const CAT_ORDER: CartItem['categoria'][] = [
    'entrantes', 'ensalades', 'ous', 'especiales', 'platos', 'postres', 'bebidas_soda', 'bebidas_alcohol',
  ]

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
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-wood/20">
        <span className="font-heading font-black text-green-dark text-lg">{t('order_title', lang)}</span>
        <div className="flex gap-3">
          {cart.length > 0 && (
            <button
              onClick={onClear}
              className="text-xs font-body text-red-400 hover:text-red-600 transition-colors"
            >
              {t('order_clear', lang)}
            </button>
          )}
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-wood/20 flex items-center justify-center text-brown hover:bg-wood/40 transition-colors text-sm font-bold"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="overflow-y-auto flex-1 px-4 py-2">
        {cart.length === 0 ? (
          <p className="text-center text-brown/50 font-body py-8">{t('order_empty', lang)}</p>
        ) : (
          Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="mb-4">
              <p className="text-[10px] uppercase tracking-widest font-body text-brown/40 mb-1">
                {CAT_DISPLAY[cat]?.[lang] ?? cat}
              </p>
              {items.map(cartItem => {
                const source = carta.find(c => c.id === cartItem.id)
                const nom = source ? source[lang].nom : cartItem.id
                return (
                  <div key={cartItem.id} className="flex items-center gap-2 py-1.5">
                    <span className="flex-1 font-body text-sm text-brown truncate">{nom}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onDecrement(cartItem.id)}
                        className="w-6 h-6 rounded-full bg-wood/20 text-brown text-sm font-bold hover:bg-wood/40 transition-colors flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="w-5 text-center font-heading font-bold text-green-dark text-sm">
                        {cartItem.quantitat}
                      </span>
                      <button
                        onClick={() => onIncrement(cartItem.id)}
                        className="w-6 h-6 rounded-full bg-green-dark text-cream text-sm font-bold hover:bg-green-mid transition-colors flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <span className="w-16 text-right font-heading font-bold text-green-dark text-sm">
                      {(cartItem.preu * cartItem.quantitat).toFixed(2)} €
                    </span>
                    <button
                      onClick={() => onRemove(cartItem.id)}
                      className="text-red-300 hover:text-red-500 text-xs transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                )
              })}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
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

// ── Main component ────────────────────────────────────────────────────────────

export default function MenuContent() {
  const { lang } = useLanguage()

  const [activeCategory, setActiveCategory] = useState<CategoryId>('starters')
  const [activeSandwichSubcat, setActiveSandwichSubcat] = useState('freds')
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartLoaded, setCartLoaded] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  // Restore cart from sessionStorage
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('raco-cart')
      if (raw) setCart(JSON.parse(raw))
    } catch {}
    setCartLoaded(true)
  }, [])

  // Persist cart
  useEffect(() => {
    if (cartLoaded) {
      sessionStorage.setItem('raco-cart', JSON.stringify(cart))
    }
  }, [cart, cartLoaded])

  // Close any flipped card when category changes
  useEffect(() => { setActiveCardId(null) }, [activeCategory, activeSandwichSubcat])

  const addToCart = useCallback((item: MenuItem) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id)
      if (ex) return prev.map(c => c.id === item.id ? { ...c, quantitat: c.quantitat + 1 } : c)
      return [...prev, { id: item.id, preu: item.preu, quantitat: 1, categoria: item.categoria }]
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(c => c.id !== id))
  }, [])

  const incrementCart = useCallback((id: string) => {
    setCart(prev => prev.map(c => c.id === id ? { ...c, quantitat: c.quantitat + 1 } : c))
  }, [])

  const decrementCart = useCallback((id: string) => {
    setCart(prev => {
      const item = prev.find(c => c.id === id)
      if (!item) return prev
      if (item.quantitat <= 1) return prev.filter(c => c.id !== id)
      return prev.map(c => c.id === id ? { ...c, quantitat: c.quantitat - 1 } : c)
    })
  }, [])

  const catConfig = CATS.find(c => c.id === activeCategory)!
  const isDark = activeCategory === 'grill' || activeCategory === 'drinks'

  const totalItems = cart.reduce((s, c) => s + c.quantitat, 0)

  // ── Filtered items for each category ────────────────────────────────────────

  const starterItems  = carta.filter(i => i.categoria === 'entrantes')
  const saladItems    = carta.filter(i => i.categoria === 'ensalades')
  const eggsItems     = carta.filter(i => i.categoria === 'ous')
  const grillItems    = carta.filter(i => i.categoria === 'platos')
  const dessertItems  = carta.filter(i => i.categoria === 'postres')

  const sandwichItems = carta.filter(
    i => i.categoria === 'especiales' && i.subcategoria === activeSandwichSubcat
  )

  const DRINK_SUBCATS_NO_ALCOHOL = [
    { id: 'refrescos',    label: { ca: 'Refrescos',        es: 'Refrescos',         en: 'Soft Drinks'   } },
    { id: 'cervezas_sin', label: { ca: 'Cerveses 0,0%',    es: 'Cervezas 0,0%',     en: 'Non-Alc Beer'  } },
    { id: 'cafes',        label: { ca: 'Cafès i Infusions',es: 'Cafés e Infusiones', en: 'Coffee & Tea'  } },
  ]

  const DRINK_SUBCATS_ALCOHOL = [
    { id: 'cervezas',      label: { ca: 'Cerveses',     es: 'Cervezas',      en: 'Beers'          } },
    { id: 'vinos_blancos', label: { ca: 'Vins Blancs',  es: 'Vinos Blancos', en: 'White Wines'    } },
    { id: 'vinos_tintos',  label: { ca: 'Vins Negres',  es: 'Vinos Tintos',  en: 'Red Wines'      } },
    { id: 'combinados',    label: { ca: 'Combinats',    es: 'Combinados',    en: 'Spirits'        } },
    { id: 'copas',         label: { ca: 'Copes',        es: 'Copas',         en: 'Glasses'        } },
  ]

  // ── Render helpers ────────────────────────────────────────────────────────────

  function renderCardGrid(items: MenuItem[]) {
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
              darkBg={isDark}
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
          <h4 className="font-heading text-sm font-bold text-blue-300 uppercase tracking-widest mb-2">
            {subcat.label[lang]}
          </h4>
          {items.map(item => (
            <DrinkRow key={item.id} item={item} onAdd={() => addToCart(item)} />
          ))}
        </div>
      )
    })
  }

  return (
    <div className="min-h-screen">

      {/* ── Page header ── */}
      <div className="pt-20 pb-8 text-center bg-parchment relative overflow-hidden">
        {/* Botanical decoration */}
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

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-body text-brown/40 text-xs uppercase tracking-[0.3em] mb-2"
        >
          El Racó del Pantà
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl font-black text-green-dark"
        >
          La Nostra Carta
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body italic text-brown/50 text-sm mt-2"
        >
          Cuina de temporada · Productes locals · Elaboració artesanal
        </motion.p>
      </div>

      {/* ── Sticky category tabs ── */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-wood/20">
        <div className="max-w-5xl mx-auto px-2 flex overflow-x-auto scrollbar-none">
          {CATS.map(cat => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-3.5 text-sm font-heading font-bold transition-all whitespace-nowrap border-b-2 ${
                  isActive
                    ? 'border-green-dark text-green-dark'
                    : 'border-transparent text-brown/60 hover:text-brown'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{CAT_LABELS[cat.id][lang]}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Category content ── */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`${catConfig.bg} min-h-[60vh] pb-32`}
        >
          <div className="max-w-5xl mx-auto px-4 py-10">

            {/* ── STARTERS ── */}
            {activeCategory === 'starters' && (
              <>
                <SectionHeader title={t('section_starters', lang)} />
                {renderCardGrid(starterItems)}

                <SectionHeader title={t('section_salads', lang)} />
                {renderCardGrid(saladItems)}

                <SectionHeader title={t('section_eggs', lang)} note={t('ous_note', lang)} />
                {renderCardGrid(eggsItems)}
              </>
            )}

            {/* ── SANDWICHES ── */}
            {activeCategory === 'sandwiches' && (
              <>
                {/* Subcat tabs */}
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
            )}

            {/* ── GRILL ── */}
            {activeCategory === 'grill' && (
              <>
                <SectionHeader title={t('section_grill', lang)} note={t('brasa_note', lang)} darkBg />
                {renderCardGrid(grillItems)}
              </>
            )}

            {/* ── DESSERTS ── */}
            {activeCategory === 'desserts' && (
              <>
                <SectionHeader title={t('section_desserts', lang)} />
                {renderCardGrid(dessertItems)}
              </>
            )}

            {/* ── DRINKS ── */}
            {activeCategory === 'drinks' && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Non-alcoholic */}
                <div>
                  <h3 className="font-heading text-lg font-black text-blue-200 mb-4 border-b border-blue-800/50 pb-2">
                    {t('drinks_no_alcohol', lang)}
                  </h3>
                  {renderDrinkSection(DRINK_SUBCATS_NO_ALCOHOL, 'bebidas_soda')}
                </div>
                {/* Alcoholic */}
                <div>
                  <h3 className="font-heading text-lg font-black text-blue-200 mb-4 border-b border-blue-800/50 pb-2">
                    {t('drinks_alcohol', lang)}
                  </h3>
                  {renderDrinkSection(DRINK_SUBCATS_ALCOHOL, 'bebidas_alcohol')}
                </div>
              </div>
            )}

          </div>
        </motion.section>
      </AnimatePresence>

      {/* ── Allergen note + reserve ── */}
      <div className="border-t border-wood/30 py-10 px-4 text-center bg-cream/50">
        <p className="text-brown/45 text-xs font-body max-w-lg mx-auto mb-6 leading-relaxed">
          {t('allergens_note', lang)}
        </p>
        <a
          href="/reservar"
          className="inline-block bg-green-dark text-cream px-8 py-3.5 rounded-full font-heading font-bold hover:bg-green-mid transition-all hover:scale-105 shadow-md"
        >
          {t('book_title', lang)}
        </a>
      </div>

      {/* ── Cart pill / panel ── */}
      {totalItems > 0 && !cartOpen && (
        <motion.button
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-green-dark text-cream px-6 py-3 rounded-full shadow-2xl font-heading font-bold text-sm"
        >
          <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-black">
            {totalItems}
          </span>
          <span>{t('order_title', lang)}</span>
          <span className="text-cream/70">
            {cart.reduce((s, c) => s + c.preu * c.quantitat, 0).toFixed(2)} €
          </span>
        </motion.button>
      )}

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setCartOpen(false)}
            />
            <CartPanel
              cart={cart}
              onRemove={removeFromCart}
              onIncrement={incrementCart}
              onDecrement={decrementCart}
              onClear={() => setCart([])}
              onClose={() => setCartOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
