'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LocalImage from '@/components/LocalImage'
import { carta } from '@/data/carta'
import type { Allergen, MenuItem } from '@/data/carta'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'

// ── Types ─────────────────────────────────────────────────────────────────────

type FilterCat = 'tots' | 'entrantes' | 'ensalades' | 'ous' | 'especiales' | 'platos' | 'postres' | 'begudes'

type OrderItem = { item: MenuItem; qty: number }

// ── Allergen info ─────────────────────────────────────────────────────────────

const ALLERGEN_INFO: Record<Allergen, { emoji: string; label: string }> = {
  gluten:       { emoji: '🌾', label: 'Gluten'     },
  lacteos:      { emoji: '🥛', label: 'Làctics'    },
  huevo:        { emoji: '🥚', label: 'Ous'        },
  pescado:      { emoji: '🐟', label: 'Peix'       },
  crustaceos:   { emoji: '🦐', label: 'Crustacis'  },
  frutos_casca: { emoji: '🥜', label: 'F. Closca'  },
  apio:         { emoji: '🌿', label: 'Api'        },
  mostaza:      { emoji: '🟡', label: 'Mostassa'   },
  sesamo:       { emoji: '🫘', label: 'Sèsam'      },
  soja:         { emoji: '🫱', label: 'Soia'       },
  sulfitos:     { emoji: '🍾', label: 'Sulfits'    },
  moluscos:     { emoji: '🦑', label: "Mol·luscos" },
  altramuces:   { emoji: '🌱', label: 'Tramussos'  },
  cacahuetes:   { emoji: '🥜', label: 'Cacauets'   },
}

const ALLERGEN_LEGEND = [
  { emoji: '🌾', ca: 'Gluten',                     es: 'Gluten',               en: 'Gluten'            },
  { emoji: '🥚', ca: 'Ous',                         es: 'Huevo',                en: 'Egg'               },
  { emoji: '🥜', ca: 'Fruits de Closca',            es: 'Frutos de Cáscara',    en: 'Tree Nuts'         },
  { emoji: '🫱', ca: 'Soia',                        es: 'Soja',                 en: 'Soy'               },
  { emoji: '🟡', ca: 'Mostassa',                    es: 'Mostaza',              en: 'Mustard'           },
  { emoji: '🫘', ca: 'Grans de Sèsam',              es: 'Sésamo',               en: 'Sesame'            },
  { emoji: '🦐', ca: 'Crustacis',                   es: 'Crustáceos',           en: 'Crustaceans'       },
  { emoji: '🥛', ca: 'Làctics',                     es: 'Lácteos',              en: 'Dairy'             },
  { emoji: '🐟', ca: 'Peix',                        es: 'Pescado',              en: 'Fish'              },
  { emoji: '🥜', ca: 'Cacauets',                    es: 'Cacahuetes',           en: 'Peanuts'           },
  { emoji: '🦑', ca: "Mol·luscos",                  es: 'Moluscos',             en: 'Molluscs'          },
  { emoji: '🌿', ca: 'Api',                         es: 'Apio',                 en: 'Celery'            },
  { emoji: '🍾', ca: 'Diòxid de Sofre i Sulfats',  es: 'Sulfitos',             en: 'Sulphites'         },
  { emoji: '🌱', ca: 'Tramussos',                   es: 'Altramuces',           en: 'Lupins'            },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function getFilterLabel(id: FilterCat, lang: Lang): string {
  const map: Record<FilterCat, string> = {
    tots:       t('filter_tots', lang),
    entrantes:  t('filter_entrantes', lang),
    ensalades:  t('filter_ensalades', lang),
    ous:        t('filter_ous', lang),
    especiales: t('filter_especiales', lang),
    platos:     t('filter_platos', lang),
    postres:    t('filter_postres', lang),
    begudes:    t('filter_begudes', lang),
  }
  return map[id]
}

const FILTER_EMOJIS: Record<FilterCat, string> = {
  tots: '🍽️', entrantes: '🥗', ensalades: '🥙', ous: '🍳',
  especiales: '🥪', platos: '🔥', postres: '🍮', begudes: '🥤',
}

function getSubcatLabel(subcat: string, lang: Lang): string {
  const map: Record<string, string> = {
    freds:         t('subcat_freds', lang),
    calents:       t('subcat_calents', lang),
    torrades:      t('subcat_torrades', lang),
    hamburgueses:  t('subcat_hamburgueses', lang),
    refrescos:     t('subcat_refrescos', lang),
    cervezas_sin:  t('subcat_cervezas_sin', lang),
    cafes:         t('subcat_cafes', lang),
    cervezas:      t('subcat_cervezas', lang),
    vinos_blancos: t('subcat_vinos_blancos', lang),
    vinos_tintos:  t('subcat_vinos_tintos', lang),
    combinados:    t('subcat_combinados', lang),
    copas:         t('subcat_copas', lang),
  }
  return map[subcat] ?? subcat
}

function getCategoryLabel(cat: string, lang: Lang): string {
  const map: Record<string, string> = {
    entrantes:       t('order_cat_starters', lang),
    ensalades:       t('order_cat_salads', lang),
    ous:             t('order_cat_eggs', lang),
    especiales:      t('order_cat_sandwiches', lang),
    platos:          t('order_cat_grill', lang),
    postres:         t('order_cat_desserts', lang),
    bebidas_soda:    t('order_cat_drinks', lang),
    bebidas_alcohol: t('order_cat_drinks', lang),
  }
  return map[cat] ?? cat
}

// ── Helper components ─────────────────────────────────────────────────────────

function SectionTitle({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div className="mb-8">
      <h2 className="font-heading text-2xl md:text-3xl text-green-dark font-bold flex items-center gap-4">
        <span className="whitespace-nowrap">{children}</span>
        <div className="flex-1 h-0.5 bg-wood/40 rounded-full hidden sm:block" />
      </h2>
      {note && <p className="text-brown/55 text-xs font-body mt-2 italic">{note}</p>}
    </div>
  )
}

function SubHead({ title }: { title: string }) {
  return (
    <h3 className="font-heading text-base text-green-dark font-semibold mb-3 mt-8 first:mt-0 flex items-center gap-3">
      <span className="whitespace-nowrap">{title}</span>
      <div className="flex-1 h-px bg-wood/30" />
    </h3>
  )
}

// ── FlipCard ──────────────────────────────────────────────────────────────────

function FlipCard({
  item,
  isFlipped,
  onFlip,
  onClose,
  onAdd,
  lang,
}: {
  item: MenuItem
  isFlipped: boolean
  onFlip: () => void
  onClose: () => void
  onAdd: (item: MenuItem) => void
  lang: Lang
}) {
  const desc = item[lang].descripcio
  const tapLines = t('card_tap', lang).split('\n')

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAdd(item)
    onClose()
  }

  return (
    <motion.div
      className="card-container cursor-pointer w-full select-none h-80"
      whileHover={!isFlipped ? { y: -6 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={isFlipped ? undefined : onFlip}
    >
      <div className={`card-inner${isFlipped ? ' flipped' : ''}`}>

        {/* ── FRONT ─────────────────────────────────────────────── */}
        <div className="card-face absolute inset-0 rounded-2xl overflow-hidden bg-parchment shadow-md border border-wood/20 flex flex-col">
          <div className="flex-shrink-0 overflow-hidden h-[58%]">
            <LocalImage src={item.imatge} alt={item[lang].nom} className="w-full h-full object-cover" icon="🍽️" />
          </div>
          <div className="flex flex-col justify-between flex-1 p-4">
            <h3 className="font-heading font-bold text-brown text-sm leading-snug line-clamp-2">
              {item[lang].nom}
            </h3>
            <div className="flex items-end justify-between gap-2 mt-2">
              <span className="text-[10px] text-brown/40 italic leading-tight">
                {tapLines[0]}<br />{tapLines[1]}
              </span>
              <span className="font-heading font-bold text-green-dark text-base whitespace-nowrap">
                {item.preu.toFixed(2).replace('.', ',')}€
              </span>
            </div>
          </div>
        </div>

        {/* ── BACK ──────────────────────────────────────────────── */}
        <div
          className="card-face card-back-face absolute inset-0 rounded-2xl bg-green-dark p-4 flex flex-col shadow-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header row */}
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-heading font-bold text-cream text-sm leading-snug flex-1 line-clamp-2">
              {item[lang].nom}
            </h3>
            <button
              onClick={onClose}
              aria-label="Tancar"
              className="flex-shrink-0 w-6 h-6 rounded-full bg-cream/15 hover:bg-cream/25 text-cream/70 hover:text-cream transition-colors text-xs flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Price */}
          <p className="font-heading font-bold text-cream/80 text-sm mb-2">
            {item.preu.toFixed(2).replace('.', ',')}€
          </p>

          {/* Description */}
          {desc && (
            <p className="font-body text-cream/70 text-xs italic leading-relaxed line-clamp-3 mb-2">
              {desc}
            </p>
          )}

          <div className="border-t border-cream/20 my-2" />

          {/* Allergens */}
          {item.alergenos.length > 0 ? (
            <div className="flex flex-wrap gap-1 flex-1 content-start">
              {item.alergenos.map((a) => (
                <span
                  key={a}
                  className="text-[9px] bg-cream/10 border border-cream/20 rounded-full px-1.5 py-0.5 text-cream/70 whitespace-nowrap"
                >
                  {ALLERGEN_INFO[a].emoji} {ALLERGEN_INFO[a].label}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-[10px] text-cream/35 italic flex-1">
              {t('card_no_allergens', lang)}
            </span>
          )}

          {/* Add button */}
          <button
            onClick={handleAdd}
            className="mt-3 flex items-center justify-center gap-1.5 w-full bg-cream/15 hover:bg-cream/25 border border-cream/25 hover:border-cream/40 text-cream text-xs font-heading font-bold py-2 rounded-xl transition-all"
          >
            <span>➕</span>
            <span>{t('order_add', lang)}</span>
          </button>
        </div>

      </div>
    </motion.div>
  )
}

function FoodGrid({
  items, activeId, onFlip, onClose, onAdd, lang,
}: {
  items: MenuItem[]
  activeId: string | null
  onFlip: (id: string) => void
  onClose: () => void
  onAdd: (item: MenuItem) => void
  lang: Lang
}) {
  if (items.length === 0) return null
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <FlipCard
          key={item.id}
          item={item}
          isFlipped={activeId === item.id}
          onFlip={() => onFlip(item.id)}
          onClose={onClose}
          onAdd={onAdd}
          lang={lang}
        />
      ))}
    </div>
  )
}

function DrinkRow({ item, lang }: { item: MenuItem; lang: Lang }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-wood/15 last:border-0">
      <div className="flex-1 min-w-0 pr-3">
        <span className="font-body text-sm text-brown leading-snug">{item[lang].nom}</span>
        {item.alergenos.length > 0 && (
          <span className="text-[10px] text-brown/35 block mt-0.5">
            {item.alergenos.map(a => ALLERGEN_INFO[a].emoji).join(' ')}
          </span>
        )}
      </div>
      <span className="font-heading font-bold text-green-dark text-sm whitespace-nowrap flex-shrink-0">
        {item.preu.toFixed(2).replace('.', ',')}€
      </span>
    </div>
  )
}

function DrinkSubsection({ subcat, items, lang }: { subcat: string; items: MenuItem[]; lang: Lang }) {
  if (items.length === 0) return null
  return (
    <div className="mb-6">
      <SubHead title={getSubcatLabel(subcat, lang)} />
      {items.map((item) => <DrinkRow key={item.id} item={item} lang={lang} />)}
    </div>
  )
}

// ── Order Tray ────────────────────────────────────────────────────────────────

function OrderTray({
  order, lang, onClose, onIncrement, onDecrement, onRemove, onClear,
}: {
  order: OrderItem[]
  lang: Lang
  onClose: () => void
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
  onRemove: (id: string) => void
  onClear: () => void
}) {
  const total = order.reduce((s, o) => s + o.item.preu * o.qty, 0)

  // Group by category
  const cats = Array.from(new Set(order.map(o => o.item.categoria)))

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      className="fixed bottom-0 left-0 right-0 z-[90] bg-cream rounded-t-3xl shadow-2xl border-t border-wood/30"
      style={{ maxHeight: '60vh' }}
    >
      {/* Handle */}
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-12 h-1 bg-wood/30 rounded-full" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-wood/20">
        <h2 className="font-heading font-bold text-green-dark text-lg">
          🍽️ {t('order_title', lang)}
        </h2>
        <div className="flex items-center gap-3">
          {order.length > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-brown/50 hover:text-red-500 font-body transition-colors"
            >
              {t('order_clear', lang)}
            </button>
          )}
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-wood/20 hover:bg-wood/30 text-brown flex items-center justify-center text-sm transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="overflow-y-auto px-5 py-4" style={{ maxHeight: 'calc(60vh - 180px)' }}>
        {order.length === 0 ? (
          <p className="text-center text-brown/40 font-body italic text-sm py-8">
            {t('order_empty', lang)}
          </p>
        ) : (
          cats.map(cat => {
            const catItems = order.filter(o => o.item.categoria === cat)
            return (
              <div key={cat} className="mb-5">
                <p className="text-[10px] font-heading font-bold text-green-dark/60 uppercase tracking-widest mb-2">
                  {getCategoryLabel(cat, lang)}
                </p>
                {catItems.map(({ item, qty }) => (
                  <div key={item.id} className="flex items-center gap-3 py-2 border-b border-wood/10 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm text-brown leading-snug line-clamp-1">{item[lang].nom}</p>
                      <p className="font-heading font-bold text-green-dark text-xs mt-0.5">
                        {item.preu.toFixed(2).replace('.', ',')}€ × {qty} = {(item.preu * qty).toFixed(2).replace('.', ',')}€
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => onDecrement(item.id)}
                        className="w-6 h-6 rounded-full bg-wood/20 hover:bg-wood/35 text-brown text-sm font-bold flex items-center justify-center transition-colors"
                      >
                        −
                      </button>
                      <span className="font-heading font-bold text-brown text-sm w-5 text-center">{qty}</span>
                      <button
                        onClick={() => onIncrement(item.id)}
                        className="w-6 h-6 rounded-full bg-green-dark/15 hover:bg-green-dark/25 text-green-dark text-sm font-bold flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="w-6 h-6 rounded-full hover:bg-red-50 text-brown/30 hover:text-red-400 text-xs flex items-center justify-center transition-colors ml-1"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          })
        )}
      </div>

      {/* Footer */}
      {order.length > 0 && (
        <div className="px-5 py-4 border-t border-wood/20 bg-cream">
          <div className="flex justify-between items-center mb-3">
            <span className="font-heading font-bold text-green-dark text-base">
              {t('order_total', lang)}
            </span>
            <span className="font-heading font-bold text-green-dark text-xl">
              {total.toFixed(2).replace('.', ',')}€
            </span>
          </div>
          <p className="text-center text-brown/50 text-xs font-body italic">
            {t('order_note', lang)}
          </p>
        </div>
      )}
    </motion.div>
  )
}

// ── AllergenLegend ────────────────────────────────────────────────────────────

function AllergenLegend({ lang }: { lang: Lang }) {
  return (
    <div className="bg-cream/60 border-t border-wood/20 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h3 className="font-heading text-base text-green-dark font-bold text-center mb-6">
          {t('allergens_title', lang)}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-6">
          {ALLERGEN_LEGEND.map((a) => (
            <div key={a.en} className="flex flex-col items-center text-center gap-1">
              <span className="text-xl">{a.emoji}</span>
              <span className="text-[10px] font-body text-brown/70 leading-tight">{a[lang]}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-xs font-body text-brown/50 italic max-w-lg mx-auto leading-relaxed">
          {t('allergens_note', lang)}
        </p>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

const FILTER_IDS: FilterCat[] = ['tots', 'entrantes', 'ensalades', 'ous', 'especiales', 'platos', 'postres', 'begudes']

export default function CartaCompleta() {
  const { lang } = useLanguage()
  const [filter, setFilter] = useState<FilterCat>('tots')
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [order, setOrder] = useState<OrderItem[]>([])
  const [trayOpen, setTrayOpen] = useState(false)
  const [addedId, setAddedId] = useState<string | null>(null)

  // Persist order to sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem('raco-order')
    if (saved) setOrder(JSON.parse(saved))
  }, [])

  useEffect(() => {
    sessionStorage.setItem('raco-order', JSON.stringify(order))
  }, [order])

  // Flip card handlers
  const handleFlip = useCallback((id: string) => {
    setActiveCardId(prev => prev === id ? null : id)
  }, [])

  const handleClose = useCallback(() => setActiveCardId(null), [])

  // Close active card when filter changes
  const handleFilterChange = (f: FilterCat) => {
    setFilter(f)
    setActiveCardId(null)
  }

  // Order handlers
  const addToOrder = useCallback((item: MenuItem) => {
    setOrder(prev => {
      const existing = prev.find(o => o.item.id === item.id)
      if (existing) return prev.map(o => o.item.id === item.id ? { ...o, qty: o.qty + 1 } : o)
      return [...prev, { item, qty: 1 }]
    })
    setAddedId(item.id)
    setTimeout(() => setAddedId(null), 800)
  }, [])

  const increment = useCallback((id: string) => {
    setOrder(prev => prev.map(o => o.item.id === id ? { ...o, qty: o.qty + 1 } : o))
  }, [])

  const decrement = useCallback((id: string) => {
    setOrder(prev => {
      const updated = prev.map(o => o.item.id === id ? { ...o, qty: o.qty - 1 } : o)
      return updated.filter(o => o.qty > 0)
    })
  }, [])

  const removeFromOrder = useCallback((id: string) => {
    setOrder(prev => prev.filter(o => o.item.id !== id))
  }, [])

  const clearOrder = useCallback(() => setOrder([]), [])

  const totalQty = order.reduce((s, o) => s + o.qty, 0)

  // Grouped items
  const g = {
    entrantes:    carta.filter(i => i.categoria === 'entrantes'),
    ensalades:    carta.filter(i => i.categoria === 'ensalades'),
    ous:          carta.filter(i => i.categoria === 'ous'),
    platos:       carta.filter(i => i.categoria === 'platos'),
    postres:      carta.filter(i => i.categoria === 'postres'),
    freds:        carta.filter(i => i.categoria === 'especiales' && i.subcategoria === 'freds'),
    calents:      carta.filter(i => i.categoria === 'especiales' && i.subcategoria === 'calents'),
    torrades:     carta.filter(i => i.categoria === 'especiales' && i.subcategoria === 'torrades'),
    hamburgueses: carta.filter(i => i.categoria === 'especiales' && i.subcategoria === 'hamburgueses'),
    refrescos:    carta.filter(i => i.categoria === 'bebidas_soda'    && i.subcategoria === 'refrescos'),
    cervezas_sin: carta.filter(i => i.categoria === 'bebidas_soda'    && i.subcategoria === 'cervezas_sin'),
    cafes:        carta.filter(i => i.categoria === 'bebidas_soda'    && i.subcategoria === 'cafes'),
    cervezas:     carta.filter(i => i.categoria === 'bebidas_alcohol' && i.subcategoria === 'cervezas'),
    vinos_blancos:carta.filter(i => i.categoria === 'bebidas_alcohol' && i.subcategoria === 'vinos_blancos'),
    vinos_tintos: carta.filter(i => i.categoria === 'bebidas_alcohol' && i.subcategoria === 'vinos_tintos'),
    combinados:   carta.filter(i => i.categoria === 'bebidas_alcohol' && i.subcategoria === 'combinados'),
    copas:        carta.filter(i => i.categoria === 'bebidas_alcohol' && i.subcategoria === 'copas'),
  }

  const show = (cat: FilterCat) => filter === 'tots' || filter === cat
  const showBegudes = filter === 'tots' || filter === 'begudes'
  const showEspeciales = filter === 'tots' || filter === 'especiales'

  const foodGridProps = { activeId: activeCardId, onFlip: handleFlip, onClose: handleClose, onAdd: addToOrder, lang }

  return (
    <div className="relative">

      {/* ── STICKY FILTER BAR ─────────────────────────────────────── */}
      <div className="sticky top-[72px] z-40 bg-parchment/95 backdrop-blur-sm border-b border-wood/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto scroll-no-bar py-3">
            {FILTER_IDS.map((id) => (
              <button
                key={id}
                onClick={() => handleFilterChange(id)}
                className={`
                  flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold font-body
                  whitespace-nowrap transition-all duration-200 flex-shrink-0 border
                  ${filter === id
                    ? 'bg-green-dark text-cream border-green-dark shadow-md scale-[1.04]'
                    : 'bg-cream text-green-dark border-green-dark/30 hover:border-green-dark hover:bg-green-light/40'
                  }
                `}
              >
                <span>{FILTER_EMOJIS[id]}</span>
                <span>{getFilterLabel(id, lang)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ───────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="max-w-7xl mx-auto px-4 py-12 pb-28"
        >

          {show('entrantes') && (
            <section className="mb-14">
              <SectionTitle>{t('section_starters', lang)}</SectionTitle>
              <FoodGrid items={g.entrantes} {...foodGridProps} />
            </section>
          )}

          {show('ensalades') && (
            <section className="mb-14">
              <SectionTitle>{t('section_salads', lang)}</SectionTitle>
              <FoodGrid items={g.ensalades} {...foodGridProps} />
            </section>
          )}

          {show('ous') && (
            <section className="mb-14">
              <SectionTitle note={t('ous_note', lang)}>
                {t('section_eggs', lang)}
              </SectionTitle>
              <FoodGrid items={g.ous} {...foodGridProps} />
            </section>
          )}

          {showEspeciales && (
            <section className="mb-14">
              <SectionTitle>{t('section_sandwiches', lang)}</SectionTitle>
              <SubHead title={getSubcatLabel('freds', lang)} />
              <FoodGrid items={g.freds} {...foodGridProps} />
              <SubHead title={getSubcatLabel('calents', lang)} />
              <FoodGrid items={g.calents} {...foodGridProps} />
              <SubHead title={getSubcatLabel('torrades', lang)} />
              <FoodGrid items={g.torrades} {...foodGridProps} />
              <div className="mt-8">
                <SubHead title={getSubcatLabel('hamburgueses', lang)} />
                <p className="text-brown/50 text-xs font-body italic mb-4">
                  {t('hamburguesa_note', lang)}
                </p>
                <FoodGrid items={g.hamburgueses} {...foodGridProps} />
              </div>
            </section>
          )}

          {show('platos') && (
            <section className="mb-14">
              <SectionTitle note={t('brasa_note', lang)}>
                {t('section_grill', lang)}
              </SectionTitle>
              <FoodGrid items={g.platos} {...foodGridProps} />
            </section>
          )}

          {show('postres') && (
            <section className="mb-14">
              <SectionTitle>{t('section_desserts', lang)}</SectionTitle>
              <FoodGrid items={g.postres} {...foodGridProps} />
            </section>
          )}

          {showBegudes && (
            <section className="mb-14">
              <SectionTitle>{t('section_drinks', lang)}</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                <div>
                  <h3 className="font-heading text-base font-bold text-green-dark mb-4 pb-2 border-b border-wood/30">
                    {t('drinks_no_alcohol', lang)}
                  </h3>
                  <DrinkSubsection subcat="refrescos"    items={g.refrescos}    lang={lang} />
                  <DrinkSubsection subcat="cervezas_sin" items={g.cervezas_sin} lang={lang} />
                  <DrinkSubsection subcat="cafes"        items={g.cafes}        lang={lang} />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-green-dark mb-4 pb-2 border-b border-wood/30">
                    {t('drinks_alcohol', lang)}
                  </h3>
                  <DrinkSubsection subcat="cervezas"      items={g.cervezas}      lang={lang} />
                  <DrinkSubsection subcat="vinos_blancos"  items={g.vinos_blancos} lang={lang} />
                  <DrinkSubsection subcat="vinos_tintos"   items={g.vinos_tintos}  lang={lang} />
                  <DrinkSubsection subcat="combinados"     items={g.combinados}    lang={lang} />
                  <DrinkSubsection subcat="copas"          items={g.copas}         lang={lang} />
                </div>
              </div>
            </section>
          )}

        </motion.div>
      </AnimatePresence>

      {/* ── ALLERGEN LEGEND ───────────────────────────────────────── */}
      <AllergenLegend lang={lang} />

      {/* ── FLOATING ORDER BUTTON ─────────────────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <button
          onClick={() => setTrayOpen(true)}
          className={`
            pointer-events-auto flex items-center gap-2 bg-green-dark text-cream
            px-5 py-3 rounded-full shadow-xl font-heading font-bold text-sm
            border border-cream/10 hover:bg-green-mid transition-all duration-200
            ${addedId ? 'scale-110' : 'scale-100'}
          `}
          style={{ transition: 'transform 0.15s ease, background-color 0.2s' }}
        >
          <span>🍽️</span>
          <span>{t('order_title', lang)}</span>
          {totalQty > 0 && (
            <span className="bg-cream text-green-dark text-xs font-black w-5 h-5 rounded-full flex items-center justify-center ml-1">
              {totalQty}
            </span>
          )}
        </button>
      </div>

      {/* ── ORDER TRAY ────────────────────────────────────────────── */}
      <AnimatePresence>
        {trayOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-sm"
              onClick={() => setTrayOpen(false)}
            />
            <OrderTray
              order={order}
              lang={lang}
              onClose={() => setTrayOpen(false)}
              onIncrement={increment}
              onDecrement={decrement}
              onRemove={removeFromOrder}
              onClear={clearOrder}
            />
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
