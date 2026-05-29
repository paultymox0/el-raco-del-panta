'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { carta } from '@/data/carta'
import type { Allergen, MenuItem } from '@/data/carta'

type FilterCat = 'todos' | 'entrantes' | 'platos' | 'especiales' | 'postres' | 'bebidas'

const FILTERS: { id: FilterCat; label: string; emoji: string }[] = [
  { id: 'todos',      label: 'Todos',      emoji: '🍽️' },
  { id: 'entrantes',  label: 'Entrantes',  emoji: '🥗'  },
  { id: 'platos',     label: 'Platos',     emoji: '🍖'  },
  { id: 'especiales', label: 'Especiales', emoji: '⭐'  },
  { id: 'postres',    label: 'Postres',    emoji: '🍮'  },
  { id: 'bebidas',    label: 'Bebidas',    emoji: '🍷'  },
]

const ALLERGEN_INFO: Record<Allergen, { emoji: string; label: string }> = {
  gluten:       { emoji: '🌾', label: 'Gluten'      },
  lacteos:      { emoji: '🥛', label: 'Lácteos'     },
  huevo:        { emoji: '🥚', label: 'Huevo'       },
  pescado:      { emoji: '🐟', label: 'Pescado'     },
  crustaceos:   { emoji: '🦐', label: 'Crustáceos' },
  frutos_secos: { emoji: '🥜', label: 'F. secos'   },
  apio:         { emoji: '🌿', label: 'Apio'        },
  mostaza:      { emoji: '🟡', label: 'Mostaza'     },
  sesamo:       { emoji: '🫘', label: 'Sésamo'      },
  soja:         { emoji: '🫱', label: 'Soja'        },
  sulfitos:     { emoji: '🍾', label: 'Sulfitos'    },
  moluscos:     { emoji: '🦑', label: 'Moluscos'    },
}

function FlipCard({ item, size = 'food' }: { item: MenuItem; size?: 'food' | 'drink' }) {
  const [flipped, setFlipped] = useState(false)
  const isFood = size === 'food'

  return (
    <div
      className={`card-container cursor-pointer w-full select-none ${isFood ? 'h-80' : 'h-60'}`}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className={`card-inner${flipped ? ' flipped' : ''}`}>

        {/* ── FRONT ─────────────────────────────────────────────────── */}
        <div className="card-face absolute inset-0 rounded-2xl overflow-hidden bg-parchment shadow-md border border-wood/20 flex flex-col">
          {/* Photo */}
          <div className={`relative flex-shrink-0 overflow-hidden ${isFood ? 'h-[58%]' : 'h-[50%]'}`}>
            <Image
              src={item.imagen}
              alt={item.nombre}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={isFood
                ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px'
                : '200px'}
            />
          </div>
          {/* Info */}
          <div className="flex flex-col justify-between flex-1 p-4">
            <h3 className="font-heading font-bold text-brown text-sm leading-snug line-clamp-2">
              {item.nombre}
            </h3>
            <div className="flex items-end justify-between gap-2 mt-2">
              <span className="text-[10px] text-brown/40 italic leading-tight">
                Toca para<br />más info 👆
              </span>
              <span className="font-heading font-bold text-green-dark text-base whitespace-nowrap">
                {item.precio.toFixed(2).replace('.', ',')}€
              </span>
            </div>
          </div>
        </div>

        {/* ── BACK ──────────────────────────────────────────────────── */}
        <div className="card-face card-back-face absolute inset-0 rounded-2xl bg-green-dark p-4 flex flex-col shadow-md overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-heading font-bold text-cream text-sm leading-snug flex-1">
              {item.nombre}
            </h3>
            <button
              onClick={(e) => { e.stopPropagation(); setFlipped(false) }}
              aria-label="Cerrar"
              className="flex-shrink-0 w-6 h-6 rounded-full bg-cream/15 hover:bg-cream/25 text-cream/70 hover:text-cream transition-colors text-xs flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Description */}
          <p className="font-body text-cream/70 text-xs italic leading-relaxed flex-1 overflow-hidden line-clamp-3">
            {item.descripcion}
          </p>

          <div className="border-t border-cream/20 my-2" />

          {/* Macros */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px] text-cream/65 mb-2">
            <span>🔥 {item.calorias} kcal</span>
            <span>💪 Prot: {item.macros.proteina}g</span>
            <span>🌾 Carbs: {item.macros.carbos}g</span>
            <span>🥑 Grasa: {item.macros.grasa}g</span>
          </div>

          {/* Allergens */}
          {item.alergenos.length > 0 ? (
            <div className="flex flex-wrap gap-1">
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
            <span className="text-[10px] text-cream/40 italic">Sin alérgenos principales</span>
          )}
        </div>

      </div>
    </div>
  )
}

export default function CartaCompleta() {
  const [filter, setFilter] = useState<FilterCat>('todos')

  const foodItems  = carta.filter((i) => !i.categoria.startsWith('bebidas'))
  const sodaItems  = carta.filter((i) => i.categoria === 'bebidas_soda')
  const alcItems   = carta.filter((i) => i.categoria === 'bebidas_alcohol')

  const filteredFood =
    filter === 'todos'   ? foodItems :
    filter === 'bebidas' ? []        :
    foodItems.filter((i) => i.categoria === filter)

  const showDrinks = filter === 'todos' || filter === 'bebidas'

  return (
    <div>
      {/* ── STICKY FILTER BAR ─────────────────────────────────────── */}
      <div className="sticky top-[72px] z-40 bg-parchment/95 backdrop-blur-sm border-b border-wood/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto scroll-no-bar py-3">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`
                  flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold font-body
                  whitespace-nowrap transition-all duration-200 flex-shrink-0 border
                  ${filter === f.id
                    ? 'bg-green-dark text-cream border-green-dark shadow-md scale-[1.04]'
                    : 'bg-cream text-green-dark border-green-dark/30 hover:border-green-dark hover:bg-green-light/40'
                  }
                `}
              >
                <span>{f.emoji}</span>
                <span>{f.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CARDS AREA ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Food grid */}
        {filteredFood.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-14">
            <AnimatePresence mode="popLayout">
              {filteredFood.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.25 }}
                >
                  <FlipCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty state (only when filter is non-drink and returns nothing) */}
        {filteredFood.length === 0 && !showDrinks && (
          <p className="text-center py-20 text-brown/40 font-body italic">
            No hay platos en esta categoría.
          </p>
        )}

        {/* Drinks sub-sections */}
        {showDrinks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Sin alcohol */}
            <div className="mb-12">
              <h3 className="font-heading text-2xl text-green-dark font-bold mb-6 flex items-center gap-3">
                <span>🥤</span>
                <span>Refrescos y sin alcohol</span>
                <div className="flex-1 h-px bg-wood/40" />
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {sodaItems.map((item) => (
                  <FlipCard key={item.id} item={item} size="drink" />
                ))}
              </div>
            </div>

            {/* Con alcohol */}
            <div>
              <h3 className="font-heading text-2xl text-green-dark font-bold mb-6 flex items-center gap-3">
                <span>🍷</span>
                <span>Bebidas con alcohol</span>
                <div className="flex-1 h-px bg-wood/40" />
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {alcItems.map((item) => (
                  <FlipCard key={item.id} item={item} size="drink" />
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}
