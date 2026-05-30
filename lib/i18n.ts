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
  hero_tagline:      { ca: 'Bona cuina, bon ambient i vistes increïbles',     es: 'Buena comida, buen ambiente y vistas increíbles',          en: 'Great food, great atmosphere and incredible views'        },
  hero_btn_menu:     { ca: 'Veure Menú',        es: 'Ver Menú',        en: 'View Menu'    },
  hero_btn_book:     { ca: 'Reservar taula',    es: 'Reservar Mesa',   en: 'Book a Table' },
  banner_new_open:   { ca: "🎉 Acabem d'obrir! Vine a celebrar aquesta nova aventura amb nosaltres", es: '🎉 ¡Recién abiertos! Ven a celebrar esta nueva aventura con nosotros', en: '🎉 Just opened! Come celebrate this new adventure with us' },
  specialties_title: { ca: 'El millor de la nostra cuina', es: 'Lo mejor de nuestra cocina', en: 'The best of our kitchen' },
  reviews_title:     { ca: 'Sigues dels primers en valorar-nos',      es: 'Sé de los primeros en valorarnos',      en: 'Be among the first to review us'         },
  reviews_note:      { ca: 'La teva opinió ens ajuda a créixer 🙏',   es: 'Tu opinión nos ayuda a crecer 🙏',       en: 'Your opinion helps us grow 🙏'           },
  reviews_btn:       { ca: 'Deixa la teva opinió a Google Maps',      es: 'Déjanos tu opinión en Google Maps',     en: 'Leave a review on Google Maps'          },
  social_title:      { ca: 'Segueix-nos',    es: 'Síguenos',    en: 'Follow us'   },
  social_wa_label:   { ca: 'Escriu-nos',     es: 'Escríbenos',  en: 'Message us'  },

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
  order_title:          { ca: 'La meva comanda',     es: 'Mi comanda',            en: 'My Order'           },
  order_add:            { ca: 'Afegir',              es: 'Añadir',                en: 'Add'                },
  order_clear:          { ca: 'Netejar tot',         es: 'Limpiar todo',          en: 'Clear all'          },
  order_total:          { ca: 'Total',               es: 'Total',                 en: 'Total'              },
  order_empty:          { ca: 'La comanda és buida', es: 'La comanda está vacía', en: 'Your order is empty'},
  order_note:           { ca: 'Mostra aquesta selecció al cambrer 🤝', es: 'Muestra esta selección al camarero 🤝', en: 'Show this to your waiter 🤝' },
  order_cat_starters:   { ca: 'Per Começar',         es: 'Para Empezar',          en: 'Starters'           },
  order_cat_salads:     { ca: 'Amanides',            es: 'Ensaladas',             en: 'Salads'             },
  order_cat_eggs:       { ca: 'Ous del Racó',        es: 'Huevos',                en: 'Eggs'               },
  order_cat_sandwiches: { ca: 'Entrepans',           es: 'Bocadillos',            en: 'Sandwiches'         },
  order_cat_grill:      { ca: 'La Brasa',            es: 'La Brasa',              en: 'Grill'              },
  order_cat_desserts:   { ca: 'Postres',             es: 'Postres',               en: 'Desserts'           },
  order_cat_drinks:     { ca: 'Begudes',             es: 'Bebidas',               en: 'Drinks'             },

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
  book_title:           { ca: 'Reservar Taula',  es: 'Reservar Mesa',  en: 'Book a Table'   },
  reservar_title:       { ca: 'Reserva la teva taula',          es: 'Reserva tu mesa',                  en: 'Book your table'                     },
  reservar_subtitle:    { ca: 'Et confirmem en menys de 24 hores', es: 'Te confirmamos en menos de 24 horas', en: 'We will confirm within 24 hours'  },
  reservar_wa_text:     { ca: 'Prefereixes reservar per WhatsApp?', es: '¿Prefieres reservar por WhatsApp?', en: 'Would you prefer to book via WhatsApp?' },
  reservar_wa_btn:      { ca: 'Reservar per WhatsApp',           es: 'Reservar por WhatsApp',            en: 'Book via WhatsApp'                   },

  // ── Reserva form ──────────────────────────────────────────────────────────
  form_name:           { ca: 'Nom complet *',          es: 'Nombre completo *',      en: 'Full name *'              },
  form_email:          { ca: 'Correu electrònic *',    es: 'Email *',                en: 'Email *'                  },
  form_phone:          { ca: 'Telèfon *',              es: 'Teléfono *',             en: 'Phone *'                  },
  form_date:           { ca: 'Data *',                 es: 'Fecha *',                en: 'Date *'                   },
  form_time:           { ca: 'Hora *',                 es: 'Hora *',                 en: 'Time *'                   },
  form_time_select:    { ca: 'Seleccionar hora',       es: 'Seleccionar hora',       en: 'Select time'              },
  form_guests:         { ca: 'Nombre de persones *',   es: 'Número de personas *',   en: 'Number of guests *'       },
  form_occasion:       { ca: 'Ocasió especial',        es: 'Ocasión especial',       en: 'Special occasion'         },
  form_occ_none:       { ca: 'Cap',                    es: 'Ninguna',                en: 'None'                     },
  form_occ_birthday:   { ca: 'Aniversari',             es: 'Cumpleaños',             en: 'Birthday'                 },
  form_occ_anniversary:{ ca: 'Aniversari de parella',  es: 'Aniversario',            en: 'Anniversary'              },
  form_occ_business:   { ca: 'Empresa',                es: 'Empresa',                en: 'Business'                 },
  form_occ_other:      { ca: 'Altra',                  es: 'Otra',                   en: 'Other'                    },
  form_comments:       { ca: 'Comentaris',             es: 'Comentarios',            en: 'Comments'                 },
  form_comments_ph:    { ca: 'Al·lèrgies, preferències, etc.', es: 'Alergias, preferencias, etc.', en: 'Allergies, preferences, etc.' },
  form_submit_reserve: { ca: 'Sol·licitar Reserva',    es: 'Solicitar Reserva',      en: 'Request Booking'          },
  form_required:       { ca: 'Camp obligatori',        es: 'Campo requerido',        en: 'Required field'           },
  form_invalid_email:  { ca: 'Email invàlid',          es: 'Email inválido',         en: 'Invalid email'            },
  form_success_title:  { ca: 'Gràcies',                es: 'Gracias',                en: 'Thank you'                },
  form_success_msg:    { ca: 'Hem rebut la teva reserva. Ens posarem en contacte aviat per confirmar. Rebràs confirmació en menys de 24 hores.',
                         es: 'Hemos recibido tu reserva. Te contactaremos pronto para confirmar. Recibirás una confirmación en menos de 24 horas.',
                         en: 'We have received your booking. We will be in touch shortly to confirm. You will receive confirmation within 24 hours.' },

  // ── Evento form ───────────────────────────────────────────────────────────
  form_fullname:         { ca: 'Nom i cognoms *',            es: 'Nombre y apellidos *',      en: 'Full name *'                    },
  form_event_type:       { ca: 'Tipus d\'esdeveniment *',    es: 'Tipo de evento *',          en: 'Event type *'                   },
  form_event_select:     { ca: 'Seleccionar tipus',          es: 'Seleccionar tipo',          en: 'Select type'                    },
  form_event_birthday:   { ca: 'Aniversari / Celebració',    es: 'Cumpleaños / Celebración',  en: 'Birthday / Celebration'         },
  form_event_business:   { ca: 'Esdeveniment d\'empresa',    es: 'Evento de empresa',         en: 'Corporate event'                },
  form_event_group:      { ca: 'Grup familiar',              es: 'Grupo familiar',            en: 'Family group'                   },
  form_event_wedding:    { ca: 'Boda / Celebració especial', es: 'Boda / Celebración especial', en: 'Wedding / Special celebration' },
  form_approx_date:      { ca: 'Data aproximada *',          es: 'Fecha aproximada *',        en: 'Approximate date *'             },
  form_num_guests:       { ca: 'Nombre de persones *',       es: 'Número de personas *',      en: 'Number of guests *'             },
  form_min_guests_note:  { ca: '(mín. 15 per menú tancat)',  es: '(mín. 15 para menú cerrado)', en: '(min. 15 for set menu)'       },
  form_guests_ph:        { ca: 'Nº de persones',             es: 'Nº de personas',            en: 'No. of guests'                  },
  form_budget:           { ca: 'Pressupost per persona (opcional)', es: 'Presupuesto por persona (opcional)', en: 'Budget per person (optional)' },
  form_budget_ph:        { ca: 'Ex: 30-50€ per persona',    es: 'Ej: 30-50€ por persona',    en: 'E.g. 30-50€ per person'         },
  form_description:      { ca: 'Descripció de l\'esdeveniment *', es: 'Descripción del evento *', en: 'Event description *'        },
  form_description_ph:   { ca: 'Explica\'ns tots els detalls del teu event especial...', es: 'Cuéntanos todos los detalles de tu evento especial...', en: 'Tell us all about your special event...' },
  form_submit_event:     { ca: 'Consultar Disponibilitat',   es: 'Consultar Disponibilidad',  en: 'Check Availability'             },
  form_success_event:    { ca: 'Ens posem en contacte en 48 hores per dissenyar el teu event perfecte.',
                           es: 'Nos ponemos en contacto en 48 horas para diseñar tu evento perfecto.',
                           en: 'We will be in touch within 48 hours to plan your perfect event.' },

  // ── Fotos page ────────────────────────────────────────────────────────────
  fotos_title:         { ca: 'Galeria de Fotos',                                        es: 'Galería de Fotos',                                          en: 'Photo Gallery'                                         },
  fotos_subtitle:      { ca: 'Un cop d\'ull a la nostra cuina, local i entorn',         es: 'Un vistazo a nuestra cocina, nuestro local y nuestro entorno', en: 'A look at our kitchen, venue and surroundings'          },
  fotos_filter_local:  { ca: 'El local',    es: 'El local',    en: 'The venue'   },
  fotos_filter_platos: { ca: 'Els plats',   es: 'Los platos',  en: 'The dishes'  },
  fotos_filter_entorn: { ca: "L'entorn",    es: 'El entorno',  en: 'The setting' },
  fotos_ig_cta_text:   { ca: 'Vols veure\'n més? Segueix-nos a Instagram',              es: '¿Quieres ver más? Síguenos en Instagram',                     en: 'Want to see more? Follow us on Instagram'               },

  // ── Entorn page ───────────────────────────────────────────────────────────
  entorn_hero_title:      { ca: 'Un racó únic',                    es: 'Un rincón único',                     en: 'A unique corner'                        },
  entorn_hero_subtitle:   { ca: 'entre muntanyes i aigua',         es: 'entre montañas y agua',               en: 'between mountains and water'            },
  entorn_mountains_title: { ca: 'Les muntanyes',                   es: 'Las montañas',                        en: 'The mountains'                          },
  entorn_mountains_desc:  { ca: 'Paisatge natural espectacular que canvia amb cada estació. La natura en el seu estat més pur envoltant el nostre restaurant.',
                            es: 'Paisaje natural espectacular que cambia con cada estación. La naturaleza en su estado más puro rodeando nuestro restaurante.',
                            en: 'Spectacular natural landscape that changes with every season. Nature in its purest state surrounding our restaurant.' },
  entorn_water_title:     { ca: 'El pantà',                        es: 'El pantano',                          en: 'The reservoir'                          },
  entorn_water_desc:      { ca: "Vistes a l'aigua que fan de cada àpat una experiència única. El reflex del cel en l'aigua crea un ambient incomparable.",
                            es: 'Vistas al agua que hacen de cada comida una experiencia única. El reflejo del cielo en el agua crea un ambiente incomparable.',
                            en: 'Water views that make every meal a unique experience. The reflection of the sky on the water creates an incomparable atmosphere.' },
  entorn_grill_title:     { ca: 'La brasa',                        es: 'La brasa',                            en: 'The grill'                              },
  entorn_grill_desc:      { ca: 'Productes de la zona cuinats a la brasa, sabor autèntic. La tradició culinària de la comarca a cada mos.',
                            es: 'Productos de la zona cocinados a la brasa, sabor auténtico. La tradición culinaria de la comarca en cada bocado.',
                            en: 'Local produce cooked on the grill, authentic flavour. The culinary tradition of the region in every bite.' },
  entorn_map_title:       { ca: 'On som',                          es: 'Dónde estamos',                       en: 'Where we are'                           },
  entorn_map_caption:     { ca: 'Vine a descobrir aquest racó especial',  es: 'Ven a descubrir este rincón especial', en: 'Come and discover this special corner' },
  entorn_directions:      { ca: 'Com arribar',                     es: 'Cómo llegar',                         en: 'Get directions'                         },
  entorn_photos_title:    { ca: "L'entorn en imatges",             es: 'El entorno en imágenes',              en: 'The setting in pictures'                },

  // ── Eventos page ──────────────────────────────────────────────────────────
  events_title:           { ca: 'Celebra amb nosaltres',           es: 'Celebra con nosotros',                en: 'Celebrate with us'                      },
  events_subtitle:        { ca: "Ho fem especial, sigui quina sigui l'ocasió", es: 'Lo hacemos especial, sea cual sea la ocasión', en: 'We make it special, whatever the occasion' },
  events_btn:             { ca: 'Consultar disponibilitat',        es: 'Consultar disponibilidad',            en: 'Check availability'                     },
  events_form_title:      { ca: 'Tens un event en ment?',          es: '¿Tienes un evento en mente?',         en: 'Have an event in mind?'                 },
  events_form_subtitle:   { ca: "Explica'ns els detalls i dissenyem junts la teva celebració perfecta", es: 'Cuéntanos los detalles y diseñamos juntos tu celebración perfecta', en: 'Tell us the details and we will design your perfect celebration together' },
  event_birthday_title:   { ca: 'Aniversaris i celebracions',      es: 'Cumpleaños y celebraciones',          en: 'Birthdays & celebrations'               },
  event_birthday_desc:    { ca: "Fes del teu dia especial un record inoblidable. Decoració personalitzada i menú a mida.",
                            es: 'Haz de tu día especial un recuerdo imborrable. Decoración personalizada y menú a tu medida.',
                            en: 'Make your special day an unforgettable memory. Personalised decoration and tailor-made menu.' },
  event_business_title:   { ca: "Esdeveniments d'empresa",         es: 'Eventos de empresa',                  en: 'Corporate events'                       },
  event_business_desc:    { ca: "L'espai perfecte per a reunions, team buildings i celebracions corporatives.",
                            es: 'El espacio perfecto para reuniones, team buildings y celebraciones corporativas.',
                            en: 'The perfect space for meetings, team buildings and corporate celebrations.' },
  event_groups_title:     { ca: 'Grups i famílies',                es: 'Grupos y familias',                   en: 'Groups & families'                      },
  event_groups_desc:      { ca: 'Reunions familiars i d\'amics amb menús especials per a grups a partir de 15 persones.',
                            es: 'Reuniones familiares y de amigos con menús especiales para grupos a partir de 15 personas.',
                            en: 'Family and friend gatherings with special menus for groups from 15 people.' },
  event_wedding_title:    { ca: 'Bodas i celebracions especials',  es: 'Bodas y celebraciones especiales',    en: 'Weddings & special celebrations'        },
  event_wedding_desc:     { ca: "Un entorn màgic vora el pantà per al dia més important de la teva vida.",
                            es: 'Un entorno mágico junto al pantano para el día más importante de tu vida.',
                            en: 'A magical setting by the reservoir for the most important day of your life.' },

  // ── Informació page ───────────────────────────────────────────────────────
  info_title:         { ca: 'Informació',      es: 'Información',     en: 'Information'  },
  info_about_title:   { ca: 'Sobre nosaltres', es: 'Sobre nosotros',  en: 'About us'     },
  info_about_p1:      {
    ca: "El Racó del Pantà va néixer del somni d'oferir una experiència gastronòmica autèntica en un entorn natural incomparable. Ubicats vora el pantà, entre muntanyes i aigua, el nostre restaurant fusiona la cuina tradicional catalana amb tècniques de brasa artesanal per crear plats que evoquen l'essència de la terra.",
    es: "El Racó del Pantà nació del sueño de ofrecer una experiencia gastronómica auténtica en un entorno natural incomparable. Ubicados junto al pantano, entre montañas y agua, nuestro restaurante fusiona la cocina tradicional catalana con técnicas de brasa artesanal para crear platos que evocan la esencia de la tierra.",
    en: "El Racó del Pantà was born from the dream of offering an authentic gastronomic experience in an incomparable natural setting. Located by the reservoir, between mountains and water, our restaurant fuses traditional Catalan cuisine with artisan grill techniques to create dishes that evoke the essence of the land.",
  },
  info_about_p2:      {
    ca: "Cada producte que arriba a la nostra cuina és seleccionat amb cura de productors locals compromesos amb la qualitat i la sostenibilitat. Ens enorgullim d'oferir una carta de temporada que canvia amb el ritme de la natura, sempre amb el sabor autèntic de la nostra comarca com a protagonista. Acabem d'obrir i tenim moltes ganes!",
    es: "Cada producto que llega a nuestra cocina es seleccionado con mimo de productores locales comprometidos con la calidad y la sostenibilidad. Nos enorgullece ofrecer una carta de temporada que cambia con el ritmo de la naturaleza, siempre con el sabor auténtico de nuestra comarca como protagonista. ¡Recién abiertos y con mucha ilusión!",
    en: "Every product that reaches our kitchen is carefully selected from local producers committed to quality and sustainability. We are proud to offer a seasonal menu that changes with the rhythm of nature, always with the authentic flavour of our region as the star. Just opened and very excited!",
  },
  info_hours_title:   { ca: 'Horaris',         es: 'Horarios',        en: 'Opening hours' },
  info_contact_title: { ca: 'Contacte',        es: 'Contacto',        en: 'Contact'       },
  info_closed:        { ca: 'Tancat',          es: 'Cerrado',         en: 'Closed'        },
  info_map_ph:        { ca: 'Mapa de Google Maps', es: 'Mapa de Google Maps', en: 'Google Maps' },
  info_directions:    { ca: 'Com arribar',      es: 'Cómo llegar',     en: 'Get directions'},

  // ── Days of the week ──────────────────────────────────────────────────────
  day_monday:    { ca: 'Dilluns',   es: 'Lunes',     en: 'Monday'    },
  day_tuesday:   { ca: 'Dimarts',   es: 'Martes',    en: 'Tuesday'   },
  day_wednesday: { ca: 'Dimecres',  es: 'Miércoles', en: 'Wednesday' },
  day_thursday:  { ca: 'Dijous',    es: 'Jueves',    en: 'Thursday'  },
  day_friday:    { ca: 'Divendres', es: 'Viernes',   en: 'Friday'    },
  day_saturday:  { ca: 'Dissabte',  es: 'Sábado',    en: 'Saturday'  },
  day_sunday:    { ca: 'Diumenge',  es: 'Domingo',   en: 'Sunday'    },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer_rights: { ca: 'Tots els drets reservats', es: 'Todos los derechos reservados', en: 'All rights reserved' },
} as const

export type I18nKey = keyof typeof i18n

export function t(key: I18nKey, lang: Lang): string {
  return i18n[key][lang]
}
