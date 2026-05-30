export type Lang = 'ca' | 'es' | 'en'

export const i18n = {
  // ── Navbar ────────────────────────────────────────────────────────────────
  nav_home:    { ca: 'Inici',          es: 'Inicio',      en: 'Home'        },
  nav_menu:    { ca: 'Menú',           es: 'Menú',        en: 'Menu'        },
  nav_photos:  { ca: 'Fotos',          es: 'Fotos',       en: 'Photos'      },
  nav_book:    { ca: 'Reservar',       es: 'Reservar',    en: 'Book'        },
  nav_entorn:  { ca: "L'Entorn",       es: 'El Entorno',  en: 'The Setting' },
  nav_events:  { ca: 'Esdeveniments',  es: 'Eventos',     en: 'Events'      },
  nav_info:    { ca: 'Informació',     es: 'Información', en: 'Info'        },

  // ── Splash ────────────────────────────────────────────────────────────────
  splash_title: {
    ca: 'Selecciona el teu idioma',
    es: 'Selecciona tu idioma',
    en: 'Select your language',
  },

  // ── Home ─────────────────────────────────────────────────────────────────
  home_book: { ca: 'Reservar taula', es: 'Reservar mesa', en: 'Book a table' },
  home_menu: { ca: 'Veure Menú',     es: 'Ver Menú',      en: 'View Menu'   },

  // ── Menu page headings ────────────────────────────────────────────────────
  especials_title:   { ca: 'Especials del Dia',  es: 'Especiales del Día',  en: 'Daily Specials'  },
  especials_note:    { ca: 'Disponibilitat limitada', es: 'Disponibilidad limitada', en: 'Limited availability' },
  carta_title:       { ca: 'La Nostra Carta',    es: 'Nuestra Carta',       en: 'Our Menu'        },
  carta_subtitle:    { ca: 'Cuina de temporada · Productes locals · Elaboració artesanal',
                       es: 'Cocina de temporada · Productos locales · Elaboración artesanal',
                       en: 'Seasonal cuisine · Local produce · Artisan preparation' },
  carta_tap_hint:    { ca: 'Toca una carta per veure descripció i al·lèrgens',
                       es: 'Toca una carta para ver descripción y alérgenos',
                       en: 'Tap a card to see description and allergens' },

  // ── Filters ───────────────────────────────────────────────────────────────
  filter_tots:       { ca: 'Tots',           es: 'Todos',         en: 'All'          },
  filter_entrantes:  { ca: 'Per Começar',    es: 'Para Empezar',  en: 'Starters'     },
  filter_ensalades:  { ca: 'Amanides',       es: 'Ensaladas',     en: 'Salads'       },
  filter_ous:        { ca: 'Ous del Racó',   es: 'Huevos del Racó', en: 'Eggs'       },
  filter_especiales: { ca: 'Entrepans',      es: 'Bocadillos',    en: 'Sandwiches'   },
  filter_platos:     { ca: 'La Nostra Brasa',es: 'Nuestra Brasa', en: 'From the Grill'},
  filter_postres:    { ca: 'Postres',        es: 'Postres',       en: 'Desserts'     },
  filter_begudes:    { ca: 'Begudes',        es: 'Bebidas',       en: 'Drinks'       },

  // ── Section headings ──────────────────────────────────────────────────────
  section_starters:   { ca: 'Per Começar',           es: 'Para Empezar',           en: 'Starters'              },
  section_salads:     { ca: 'Amanides',               es: 'Ensaladas',              en: 'Salads'                },
  section_eggs:       { ca: 'Ous del Racó',           es: 'Huevos del Racó',        en: 'Eggs'                  },
  section_sandwiches: { ca: 'Entrepans i Torrades',   es: 'Bocadillos y Tostadas',  en: 'Sandwiches & Toasts'   },
  section_grill:      { ca: 'La Nostra Brasa',        es: 'Nuestra Brasa',          en: 'Our Grill'             },
  section_desserts:   { ca: 'Postres',                es: 'Postres',                en: 'Desserts'              },
  section_drinks:     { ca: 'Begudes',                es: 'Bebidas',                en: 'Drinks'                },

  // ── Section notes ─────────────────────────────────────────────────────────
  ous_note:         { ca: 'Base: patates fregides i ous ferrats',
                      es: 'Base: patatas fritas y huevos fritos',
                      en: 'Base: homemade fries and fried eggs' },
  brasa_note:       { ca: "Producte local a la brasa · Acompanyats de patates casolanes o al forn",
                      es: 'Producto local a la brasa · Acompañados de patatas caseras o al horno',
                      en: 'Local produce on the grill · Served with homemade or oven potatoes' },
  hamburguesa_note: { ca: 'Pa de viena o brioix · Vedella o pollastre crunchy · Amb patates',
                      es: 'Pan de viena o brioche · Ternera o pollo crunchy · Con patatas',
                      en: 'Viennese or brioche bun · Beef or crunchy chicken · With fries' },

  // ── Subcategory labels ────────────────────────────────────────────────────
  subcat_freds:        { ca: 'Entrepans Freds (½)',    es: 'Bocadillos Fríos (½)',    en: 'Cold Sandwiches (½)'   },
  subcat_calents:      { ca: 'Entrepans Calents',      es: 'Bocadillos Calientes',    en: 'Hot Sandwiches'        },
  subcat_torrades:     { ca: 'Torrades',               es: 'Tostadas',                en: 'Toasts'                },
  subcat_hamburgueses: { ca: 'Hamburgueses',           es: 'Hamburguesas',            en: 'Burgers'               },
  subcat_refrescos:    { ca: 'Refrescos',              es: 'Refrescos',               en: 'Soft Drinks'           },
  subcat_cervezas_sin: { ca: 'Cerveses 0,0%',          es: 'Cervezas 0,0%',           en: 'Non-Alc Beer 0,0%'     },
  subcat_cafes:        { ca: 'Cafès i Infusions',      es: 'Cafés e Infusiones',      en: 'Coffee & Tea'          },
  subcat_cervezas:     { ca: 'Cerveses',               es: 'Cervezas',                en: 'Beers'                 },
  subcat_vinos_blancos:{ ca: 'Vins Blancs',            es: 'Vinos Blancos',           en: 'White Wines'           },
  subcat_vinos_tintos: { ca: 'Vins Negres',            es: 'Vinos Tintos',            en: 'Red Wines'             },
  subcat_combinados:   { ca: 'Combinats',              es: 'Combinados',              en: 'Spirits & Mixers'      },
  subcat_copas:        { ca: 'Copes i Xupitos',        es: 'Copas y Chupitos',        en: 'Shots & Glasses'       },

  // ── Drinks column headers ──────────────────────────────────────────────────
  drinks_no_alcohol: { ca: 'Sense Alcohol', es: 'Sin Alcohol',  en: 'Non-Alcoholic' },
  drinks_alcohol:    { ca: 'Amb Alcohol',   es: 'Con Alcohol',  en: 'With Alcohol'  },

  // ── Card ──────────────────────────────────────────────────────────────────
  card_tap:          { ca: 'Toca per\nmés info 👆',   es: 'Toca para\nmás info 👆',   en: 'Tap for\nmore info 👆' },
  card_no_allergens: { ca: 'Sense al·lèrgens principals', es: 'Sin alérgenos principales', en: 'No main allergens' },

  // ── Order tray ────────────────────────────────────────────────────────────
  order_title:       { ca: 'La meva comanda',    es: 'Mi comanda',           en: 'My Order'           },
  order_add:         { ca: 'Afegir',             es: 'Añadir',               en: 'Add'                },
  order_clear:       { ca: 'Netejar tot',        es: 'Limpiar todo',         en: 'Clear all'          },
  order_total:       { ca: 'Total',              es: 'Total',                en: 'Total'              },
  order_empty:       { ca: 'La comanda és buida',es: 'La comanda está vacía',en: 'Your order is empty'},
  order_note:        { ca: 'Mostra aquesta selecció al cambrer 🤝',
                       es: 'Muestra esta selección al camarero 🤝',
                       en: 'Show this to your waiter 🤝' },
  order_cat_starters:   { ca: 'Per Começar',     es: 'Para Empezar',  en: 'Starters'  },
  order_cat_salads:     { ca: 'Amanides',        es: 'Ensaladas',     en: 'Salads'    },
  order_cat_eggs:       { ca: 'Ous del Racó',    es: 'Huevos',        en: 'Eggs'      },
  order_cat_sandwiches: { ca: 'Entrepans',       es: 'Bocadillos',    en: 'Sandwiches'},
  order_cat_grill:      { ca: 'La Brasa',        es: 'La Brasa',      en: 'Grill'     },
  order_cat_desserts:   { ca: 'Postres',         es: 'Postres',       en: 'Desserts'  },
  order_cat_drinks:     { ca: 'Begudes',         es: 'Bebidas',       en: 'Drinks'    },

  // ── Allergens ─────────────────────────────────────────────────────────────
  allergens_title: { ca: 'Al·lèrgens', es: 'Alérgenos', en: 'Allergens' },
  allergens_note:  {
    ca: 'Tots els plats poden contenir al·lèrgens. Si tens al·lèrgies o intoleràncies, comunica-ho al nostre equip.',
    es: 'Todos los platos pueden contener alérgenos. Si tienes alergias o intolerancias, comunícalo a nuestro equipo.',
    en: 'All dishes may contain allergens. If you have any allergies or intolerances, please inform our team.',
  },

  // ── Mobile reserve ────────────────────────────────────────────────────────
  mobile_reserve: { ca: '🍽️ Reservar', es: '🍽️ Reservar', en: '🍽️ Book' },

  // ── Reservar page ─────────────────────────────────────────────────────────
  book_title: { ca: 'Reservar Taula', es: 'Reservar Mesa', en: 'Book a Table' },
} as const

export type I18nKey = keyof typeof i18n

export function t(key: I18nKey, lang: Lang): string {
  return i18n[key][lang]
}
