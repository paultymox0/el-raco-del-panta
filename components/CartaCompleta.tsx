'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LocalImage from '@/components/LocalImage'
import { carta } from '@/data/carta'
import type { Allergen, MenuItem } from '@/data/carta'

// ── Types ─────────────────────────────────────────────────────────────────────

type FilterCat = 'tots' | 'entrantes' | 'ensalades' | 'ous' | 'especiales' | 'platos' | 'postres' | 'begudes'

// ── Filters ───────────────────────────────────────────────────────────────────

const FILTERS: { id: FilterCat; label: string; emoji: string }[] = [
  { id: 'tots',       label: 'Tots',               emoji: '🍽️' },
  { id: 'entrantes',  label: 'Per Começar',         emoji: '🥗'  },
  { id: 'ensalades',  label: 'Amanides',            emoji: '🥙'  },
  { id: 'ous',        label: 'Ous del Racó',        emoji: '🍳'  },
  { id: 'especiales', label: 'Entrepans',           emoji: '🥪'  },
  { id: 'platos',     label: 'La Nostra Brasa',     emoji: '🔥'  },
  { id: 'postres',    label: 'Postres',             emoji: '🍮'  },
  { id: 'begudes',    label: 'Begudes',             emoji: '🥤'  },
]

// ── Allergen info (for flip card pills) ───────────────────────────────────────

const ALLERGEN_INFO: Record<Allergen, { emoji: string; label: string }> = {
  gluten:       { emoji: '🌾', label: 'Gluten'        },
  lacteos:      { emoji: '🥛', label: 'Làctics'       },
  huevo:        { emoji: '🥚', label: 'Ous'           },
  pescado:      { emoji: '🐟', label: 'Peix'          },
  crustaceos:   { emoji: '🦐', label: 'Crustacis'     },
  frutos_casca: { emoji: '🥜', label: 'F. Closca'     },
  apio:         { emoji: '🌿', label: 'Api'           },
  mostaza:      { emoji: '🟡', label: 'Mostassa'      },
  sesamo:       { emoji: '🫘', label: 'Sèsam'         },
  soja:         { emoji: '🫱', label: 'Soia'          },
  sulfitos:     { emoji: '🍾', label: 'Sulfits'       },
  moluscos:     { emoji: '🦑', label: "Mol·luscos"    },
  altramuces:   { emoji: '🌱', label: 'Tramussos'     },
}

// Full EU 14 allergen legend (hardcoded for completeness)
const ALLERGEN_LEGEND = [
  { emoji: '🌾', ca: 'Gluten',                     es: 'Gluten'              },
  { emoji: '🥚', ca: 'Ous',                         es: 'Huevo'              },
  { emoji: '🥜', ca: 'Fruits de Closca',            es: 'Frutos de Cáscara'  },
  { emoji: '🫱', ca: 'Soia',                        es: 'Soja'               },
  { emoji: '🟡', ca: 'Mostassa',                    es: 'Mostaza'            },
  { emoji: '🫘', ca: 'Grans de Sèsam',              es: 'Sésamo'             },
  { emoji: '🦐', ca: 'Crustacis',                   es: 'Crustáceos'         },
  { emoji: '🥛', ca: 'Làctics',                     es: 'Lácteos'            },
  { emoji: '🐟', ca: 'Peix',                        es: 'Pescado'            },
  { emoji: '🥜', ca: 'Cacauets',                    es: 'Cacahuetes'         },
  { emoji: '🦑', ca: "Mol·luscos",                  es: 'Moluscos'           },
  { emoji: '🌿', ca: 'Api',                         es: 'Apio'               },
  { emoji: '🍾', ca: 'Diòxid de Sofre i Sulfats',  es: 'Sulfitos'           },
  { emoji: '🌱', ca: 'Tramussos',                   es: 'Altramuces'         },
]

// ── Subcategory labels ─────────────────────────────────────────────────────────

const SUBCAT_LABELS: Record<string, string> = {
  freds:         'Entrepans Freds / Bocadillos Fríos (½)',
  calents:       'Entrepans Calents / Bocadillos Calientes',
  torrades:      'Torrades / Tostadas',
  hamburgueses:  'Hamburgueses / Hamburguesas',
  refrescos:     'Refrescos',
  cervezas_sin:  'Cerveses 0,0% / Cervezas sin alcohol',
  cafes:         'Cafès i Infusions / Cafés e Infusiones',
  cervezas:      'Cerveses / Cervezas',
  vinos_blancos: 'Vins Blancs / Vinos Blancos',
  vinos_tintos:  'Vins Negres / Vinos Tintos',
  combinados:    'Combinats / Combinados',
  copas:         'Copes i Xupitos / Copas y Chupitos',
}

// ── Helper components ─────────────────────────────────────────────────────────

function SectionTitle({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div className="mb-8">
      <h2 className="font-heading text-2xl md:text-3xl text-green-dark font-bold flex items-center gap-4">
        <span className="whitespace-nowrap">{children}</span>
        <div className="flex-1 h-0.5 bg-wood/40 rounded-full hidden sm:block" />
      </h2>
      {note && (
        <p className="text-brown/55 text-xs font-body mt-2 italic">
          {note}
        </p>
      )}
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

function FlipCard({ item }: { item: MenuItem }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="card-container cursor-pointer w-full select-none h-80"
      onClick={() => setFlipped((f) => !f)}
    >
      <div className={`card-inner${flipped ? ' flipped' : ''}`}>

        {/* ── FRONT ───────────────────────────────────────────────── */}
        <div className="card-face absolute inset-0 rounded-2xl overflow-hidden bg-parchment shadow-md border border-wood/20 flex flex-col">
          <div className="flex-shrink-0 overflow-hidden h-[58%]">
            <LocalImage
              src={item.imagen}
              alt={item.nombre}
              className="w-full h-full object-cover"
              icon="🍽️"
            />
          </div>
          <div className="flex flex-col justify-between flex-1 p-4">
            <h3 className="font-heading font-bold text-brown text-sm leading-snug line-clamp-2">
              {item.nombre}
            </h3>
            <div className="flex items-end justify-between gap-2 mt-2">
              <span className="text-[10px] text-brown/40 italic leading-tight">
                Toca per<br />més info 👆
              </span>
              <span className="font-heading font-bold text-green-dark text-base whitespace-nowrap">
                {item.precio.toFixed(2).replace('.', ',')}€
              </span>
            </div>
          </div>
        </div>

        {/* ── BACK ────────────────────────────────────────────────── */}
        <div className="card-face card-back-face absolute inset-0 rounded-2xl bg-green-dark p-4 flex flex-col shadow-md overflow-hidden">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-heading font-bold text-cream text-sm leading-snug flex-1 line-clamp-2">
              {item.nombre}
            </h3>
            <button
              onClick={(e) => { e.stopPropagation(); setFlipped(false) }}
              aria-label="Tancar"
              className="flex-shrink-0 w-6 h-6 rounded-full bg-cream/15 hover:bg-cream/25 text-cream/70 hover:text-cream transition-colors text-xs flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {item.descripcion && (
            <p className="font-body text-cream/70 text-xs italic leading-relaxed mb-2 line-clamp-3">
              {item.descripcion}
            </p>
          )}

          <div className="border-t border-cream/20 my-2" />

          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px] text-cream/65 mb-1">
            <span>🔥 {item.calorias} kcal</span>
            <span>💪 Prot: {item.macros.proteina}g</span>
            <span>🌾 Carbs: {item.macros.carbos}g</span>
            <span>🥑 Grasa: {item.macros.grasa}g</span>
          </div>
          <p className="text-[9px] text-cream/30 italic mb-2">Valors nutricionals aproximats</p>

          {item.alergenos.length > 0 ? (
            <div className="flex flex-wrap gap-1 mt-auto">
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
            <span className="text-[10px] text-cream/35 italic mt-auto">Sense al·lèrgens principals</span>
          )}
        </div>

      </div>
    </div>
  )
}

function FoodGrid({ items }: { items: MenuItem[] }) {
  if (items.length === 0) return null
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <FlipCard key={item.id} item={item} />
      ))}
    </div>
  )
}

function DrinkRow({ item }: { item: MenuItem }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-wood/15 last:border-0">
      <div className="flex-1 min-w-0 pr-3">
        <span className="font-body text-sm text-brown leading-snug">{item.nombre}</span>
        {item.descripcion && (
          <span className="block text-xs text-brown/50 italic leading-tight mt-0.5">{item.descripcion}</span>
        )}
        {item.alergenos.length > 0 && (
          <span className="text-[10px] text-brown/35 ml-0 block mt-0.5">
            {item.alergenos.map(a => ALLERGEN_INFO[a].emoji).join(' ')}
          </span>
        )}
      </div>
      <span className="font-heading font-bold text-green-dark text-sm whitespace-nowrap flex-shrink-0">
        {item.precio.toFixed(2).replace('.', ',')}€
      </span>
    </div>
  )
}

function DrinkSubsection({ subcat, items }: { subcat: string; items: MenuItem[] }) {
  if (items.length === 0) return null
  return (
    <div className="mb-6">
      <SubHead title={SUBCAT_LABELS[subcat] ?? subcat} />
      <div>
        {items.map((item) => (
          <DrinkRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

function AllergenLegend() {
  return (
    <div className="bg-cream/60 border-t border-wood/20 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h3 className="font-heading text-base text-green-dark font-bold text-center mb-6">
          Al·lèrgens / Alérgenos
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-6">
          {ALLERGEN_LEGEND.map((a) => (
            <div key={a.es} className="flex flex-col items-center text-center gap-1">
              <span className="text-xl">{a.emoji}</span>
              <span className="text-[10px] font-body text-brown/70 leading-tight">{a.ca}</span>
              <span className="text-[9px] font-body text-brown/40 leading-tight italic">{a.es}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-xs font-body text-brown/50 italic max-w-lg mx-auto leading-relaxed">
          Tots els plats de la carta poden contenir al·lèrgens. /
          Todos los platos de la carta pueden contener alérgenos.
          <br />
          Si tens al·lèrgies o intoleràncies, comunica-ho al nostre equip.
        </p>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CartaCompleta() {
  const [filter, setFilter] = useState<FilterCat>('tots')

  // Group food items by categoria
  const g = {
    entrantes:  carta.filter(i => i.categoria === 'entrantes'),
    ensalades:  carta.filter(i => i.categoria === 'ensalades'),
    ous:        carta.filter(i => i.categoria === 'ous'),
    platos:     carta.filter(i => i.categoria === 'platos'),
    postres:    carta.filter(i => i.categoria === 'postres'),
    // Especiales by subcategoria
    freds:        carta.filter(i => i.categoria === 'especiales' && i.subcategoria === 'freds'),
    calents:      carta.filter(i => i.categoria === 'especiales' && i.subcategoria === 'calents'),
    torrades:     carta.filter(i => i.categoria === 'especiales' && i.subcategoria === 'torrades'),
    hamburgueses: carta.filter(i => i.categoria === 'especiales' && i.subcategoria === 'hamburgueses'),
    // Drinks by subcategoria
    refrescos:     carta.filter(i => i.categoria === 'bebidas_soda'    && i.subcategoria === 'refrescos'),
    cervezas_sin:  carta.filter(i => i.categoria === 'bebidas_soda'    && i.subcategoria === 'cervezas_sin'),
    cafes:         carta.filter(i => i.categoria === 'bebidas_soda'    && i.subcategoria === 'cafes'),
    cervezas:      carta.filter(i => i.categoria === 'bebidas_alcohol' && i.subcategoria === 'cervezas'),
    vinos_blancos: carta.filter(i => i.categoria === 'bebidas_alcohol' && i.subcategoria === 'vinos_blancos'),
    vinos_tintos:  carta.filter(i => i.categoria === 'bebidas_alcohol' && i.subcategoria === 'vinos_tintos'),
    combinados:    carta.filter(i => i.categoria === 'bebidas_alcohol' && i.subcategoria === 'combinados'),
    copas:         carta.filter(i => i.categoria === 'bebidas_alcohol' && i.subcategoria === 'copas'),
  }

  const show = (cat: FilterCat) => filter === 'tots' || filter === cat
  const showBegudes = filter === 'tots' || filter === 'begudes'
  const showEspeciales = filter === 'tots' || filter === 'especiales'

  return (
    <div>

      {/* ── STICKY FILTER BAR ───────────────────────────────────────── */}
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

      {/* ── CONTENT ─────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="max-w-7xl mx-auto px-4 py-12"
        >

          {/* Per Começar / Para Empezar */}
          {show('entrantes') && (
            <section className="mb-14">
              <SectionTitle>Per Começar / Para Empezar</SectionTitle>
              <FoodGrid items={g.entrantes} />
            </section>
          )}

          {/* Amanides / Ensaladas */}
          {show('ensalades') && (
            <section className="mb-14">
              <SectionTitle>Amanides / Ensaladas</SectionTitle>
              <FoodGrid items={g.ensalades} />
            </section>
          )}

          {/* Ous del Racó */}
          {show('ous') && (
            <section className="mb-14">
              <SectionTitle note="Base: patates fregides i ous ferrats / patatas fritas y huevos fritos">
                Ous del Racó / Huevos del Racó
              </SectionTitle>
              <FoodGrid items={g.ous} />
            </section>
          )}

          {/* Entrepans i Torrades */}
          {showEspeciales && (
            <section className="mb-14">
              <SectionTitle>Entrepans i Torrades / Bocadillos y Tostadas</SectionTitle>

              <SubHead title={SUBCAT_LABELS.freds} />
              <FoodGrid items={g.freds} />

              <SubHead title={SUBCAT_LABELS.calents} />
              <FoodGrid items={g.calents} />

              <SubHead title={SUBCAT_LABELS.torrades} />
              <FoodGrid items={g.torrades} />

              <div className="mt-8">
                <SubHead title={SUBCAT_LABELS.hamburgueses} />
                <p className="text-brown/50 text-xs font-body italic mb-4">
                  Pa de viena o brioix · Vedella o pollastre crunchy · Amb patates / Pan de viena o brioche · Ternera o pollo crunchy · Con patatas
                </p>
                <FoodGrid items={g.hamburgueses} />
              </div>
            </section>
          )}

          {/* La Nostra Brasa */}
          {show('platos') && (
            <section className="mb-14">
              <SectionTitle note="D'aquí al foc: producte local a la brasa · Els plats s'acompanyen de patates fregides casolanes o patates al forn / Nuestros platos van acompañados de patatas fritas caseras o patatas asadas">
                La Nostra Brasa / Nuestra Brasa
              </SectionTitle>
              <FoodGrid items={g.platos} />
            </section>
          )}

          {/* Postres */}
          {show('postres') && (
            <section className="mb-14">
              <SectionTitle>Postres</SectionTitle>
              <FoodGrid items={g.postres} />
            </section>
          )}

          {/* Begudes / Bebidas */}
          {showBegudes && (
            <section className="mb-14">
              <SectionTitle>Begudes / Bebidas</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">

                {/* Sense alcohol */}
                <div>
                  <h3 className="font-heading text-base font-bold text-green-dark mb-4 pb-2 border-b border-wood/30">
                    Sense Alcohol / Sin Alcohol
                  </h3>
                  <DrinkSubsection subcat="refrescos"    items={g.refrescos}    />
                  <DrinkSubsection subcat="cervezas_sin" items={g.cervezas_sin} />
                  <DrinkSubsection subcat="cafes"        items={g.cafes}        />
                </div>

                {/* Amb alcohol */}
                <div>
                  <h3 className="font-heading text-base font-bold text-green-dark mb-4 pb-2 border-b border-wood/30">
                    Amb Alcohol / Con Alcohol
                  </h3>
                  <DrinkSubsection subcat="cervezas"      items={g.cervezas}      />
                  <DrinkSubsection subcat="vinos_blancos"  items={g.vinos_blancos} />
                  <DrinkSubsection subcat="vinos_tintos"   items={g.vinos_tintos}  />
                  <DrinkSubsection subcat="combinados"     items={g.combinados}    />
                  <DrinkSubsection subcat="copas"          items={g.copas}         />
                </div>

              </div>
            </section>
          )}

        </motion.div>
      </AnimatePresence>

      {/* ── ALLERGEN LEGEND ─────────────────────────────────────────── */}
      <AllergenLegend />

    </div>
  )
}
