export type Allergen =
  | 'gluten'
  | 'lacteos'
  | 'huevo'
  | 'pescado'
  | 'crustaceos'
  | 'frutos_secos'
  | 'apio'
  | 'mostaza'
  | 'sesamo'
  | 'soja'
  | 'sulfitos'
  | 'moluscos'

export type MenuItem = {
  id: string
  nombre: string
  descripcion: string
  precio: number
  categoria: 'entrantes' | 'platos' | 'especiales' | 'postres' | 'bebidas_soda' | 'bebidas_alcohol'
  imagen: string
  calorias: number
  macros: { proteina: number; carbos: number; grasa: number }
  alergenos: Allergen[]
}

export const carta: MenuItem[] = [
  // ── ENTRANTES ─────────────────────────────────────────────────────────────
  {
    id: 'croquetas',
    nombre: 'Croquetas caseras de jamón ibérico',
    descripcion:
      'Elaboradas diariamente en nuestra cocina con jamón ibérico de bellota. Crujientes por fuera y con una bechamel suave y cremosa por dentro.',
    precio: 8.5,
    categoria: 'entrantes',
    imagen: 'https://source.unsplash.com/400x300/?croquetas,spanish-tapas',
    calorias: 380,
    macros: { proteina: 14, carbos: 28, grasa: 22 },
    alergenos: ['gluten', 'lacteos', 'huevo'],
  },
  {
    id: 'bravas',
    nombre: 'Patatas bravas con alioli',
    descripcion:
      'Patatas fritas en aceite de oliva virgen, servidas con nuestra salsa brava picante de tomate y un alioli casero bien ajo.',
    precio: 6.5,
    categoria: 'entrantes',
    imagen: 'https://source.unsplash.com/400x300/?patatas-bravas,fried-potatoes',
    calorias: 420,
    macros: { proteina: 5, carbos: 48, grasa: 22 },
    alergenos: ['huevo'],
  },
  {
    id: 'tabla_ibericos',
    nombre: 'Tabla de ibéricos y quesos',
    descripcion:
      'Selección artesanal de embutidos ibéricos de la comarca: jamón, salchichón, chorizo y quesos curados locales. Acompañada de pan tumaca.',
    precio: 14.5,
    categoria: 'entrantes',
    imagen: 'https://source.unsplash.com/400x300/?charcuterie,iberico-ham',
    calorias: 520,
    macros: { proteina: 28, carbos: 8, grasa: 38 },
    alergenos: ['lacteos', 'sulfitos'],
  },
  {
    id: 'pan_tomate',
    nombre: 'Pan con tomate y aceite',
    descripcion:
      'Pan artesano de payés tostado, frotado con tomate maduro y ajo. Regado con aceite de oliva virgen extra de la comarca. Sencillo y perfecto.',
    precio: 4.5,
    categoria: 'entrantes',
    imagen: 'https://source.unsplash.com/400x300/?bread-tomato,pan-tomate',
    calorias: 280,
    macros: { proteina: 7, carbos: 42, grasa: 9 },
    alergenos: ['gluten'],
  },
  {
    id: 'pimientos_padron',
    nombre: 'Pimientos de padrón a la brasa',
    descripcion:
      'Pimientos de padrón frescos pasados por la brasa de leña y terminados con sal gruesa marina. Algunos pican, la mayoría no. ¡La ruleta gallega!',
    precio: 5.5,
    categoria: 'entrantes',
    imagen: 'https://source.unsplash.com/400x300/?padron-peppers,green-peppers',
    calorias: 120,
    macros: { proteina: 2, carbos: 8, grasa: 8 },
    alergenos: [],
  },

  // ── PLATOS ────────────────────────────────────────────────────────────────
  {
    id: 'chuleton',
    nombre: 'Chuletón de ternera a la brasa (400g)',
    descripcion:
      'Chuletón de ternera madurado 21 días, cocinado a fuego lento sobre brasa de leña. Servido con sal gruesa, patatas y pimientos del piquillo asados.',
    precio: 24.5,
    categoria: 'platos',
    imagen: 'https://source.unsplash.com/400x300/?ribeye-steak,grilled-meat',
    calorias: 680,
    macros: { proteina: 58, carbos: 0, grasa: 46 },
    alergenos: ['sulfitos'],
  },
  {
    id: 'entrecot',
    nombre: 'Entrecot con patatas y pimientos',
    descripcion:
      'Entrecot de ternera a la plancha al punto, acompañado de patatas panaderas al horno y pimientos rojos asados al romero.',
    precio: 19.5,
    categoria: 'platos',
    imagen: 'https://source.unsplash.com/400x300/?entrecote,beef-steak',
    calorias: 620,
    macros: { proteina: 48, carbos: 32, grasa: 28 },
    alergenos: [],
  },
  {
    id: 'merluza',
    nombre: 'Merluza al horno con salsa verde',
    descripcion:
      'Lomo de merluza fresca al horno con salsa verde de perejil fresco, ajo y vino blanco de la tierra. Producto del día, siempre fresco.',
    precio: 17.5,
    categoria: 'platos',
    imagen: 'https://source.unsplash.com/400x300/?hake-fish,baked-fish',
    calorias: 340,
    macros: { proteina: 42, carbos: 8, grasa: 14 },
    alergenos: ['pescado', 'gluten'],
  },
  {
    id: 'pollo_asado',
    nombre: 'Pollo asado con verduras',
    descripcion:
      'Pollo de corral asado al horno con tomillo, romero y limón. Acompañado de verduras de temporada asadas y un fondo de jugo natural.',
    precio: 14.5,
    categoria: 'platos',
    imagen: 'https://source.unsplash.com/400x300/?roast-chicken,pollo-asado',
    calorias: 480,
    macros: { proteina: 52, carbos: 12, grasa: 22 },
    alergenos: [],
  },
  {
    id: 'costillas',
    nombre: 'Costillas de cerdo a la brasa',
    descripcion:
      'Costillas de cerdo ibérico marinadas 24 horas con nuestra salsa secreta de especias y miel. Braseadas lentamente hasta que la carne se separa sola del hueso.',
    precio: 16.5,
    categoria: 'platos',
    imagen: 'https://source.unsplash.com/400x300/?pork-ribs,bbq-ribs',
    calorias: 580,
    macros: { proteina: 44, carbos: 4, grasa: 42 },
    alergenos: ['sulfitos'],
  },

  // ── ESPECIALES ────────────────────────────────────────────────────────────
  {
    id: 'paella',
    nombre: 'Paella de marisco para 2',
    descripcion:
      'Paella tradicional con cigalas, gambas, mejillones y sepia. Arroz bomba de Valencia con sofrito casero y un toque de azafrán. Mínimo 2 personas. Precio por persona.',
    precio: 32.0,
    categoria: 'especiales',
    imagen: 'https://source.unsplash.com/400x300/?paella,seafood-rice',
    calorias: 580,
    macros: { proteina: 38, carbos: 68, grasa: 14 },
    alergenos: ['crustaceos', 'moluscos', 'pescado'],
  },
  {
    id: 'fideua',
    nombre: "Fideuà de la costa",
    descripcion:
      'Fideuà con sepia, gambas y almejas. Fideos finos tostados en caldo de pescado casero. Servida con alioli de ajo negro y limón.',
    precio: 18.5,
    categoria: 'especiales',
    imagen: 'https://source.unsplash.com/400x300/?fideua,spanish-noodles',
    calorias: 520,
    macros: { proteina: 32, carbos: 62, grasa: 14 },
    alergenos: ['crustaceos', 'gluten', 'pescado', 'moluscos'],
  },
  {
    id: 'chuletillas',
    nombre: 'Chuletillas de cordero a la brasa',
    descripcion:
      'Chuletillas de cordero lechal a la brasa con sal gruesa y hierbas aromáticas de la zona: romero, tomillo y ajo. Producto local de temporada.',
    precio: 22.5,
    categoria: 'especiales',
    imagen: 'https://source.unsplash.com/400x300/?lamb-chops,grilled-lamb',
    calorias: 540,
    macros: { proteina: 46, carbos: 2, grasa: 36 },
    alergenos: ['sulfitos'],
  },
  {
    id: 'pulpo',
    nombre: 'Pulpo a la gallega',
    descripcion:
      'Pulpo cocido lentamente y servido con pimentón ahumado de la Vera, aceite de oliva virgen extra y sal gruesa. Sobre base de patata cocida.',
    precio: 19.5,
    categoria: 'especiales',
    imagen: 'https://source.unsplash.com/400x300/?pulpo-gallega,octopus-dish',
    calorias: 280,
    macros: { proteina: 36, carbos: 18, grasa: 8 },
    alergenos: ['moluscos'],
  },

  // ── POSTRES ───────────────────────────────────────────────────────────────
  {
    id: 'crema_catalana',
    nombre: 'Crema catalana',
    descripcion:
      'Crema catalana tradicional elaborada diariamente con yema de huevo, leche y piel de limón y naranja. Azúcar quemado al momento con soplete.',
    precio: 5.5,
    categoria: 'postres',
    imagen: 'https://source.unsplash.com/400x300/?crema-catalana,creme-brulee',
    calorias: 320,
    macros: { proteina: 6, carbos: 42, grasa: 14 },
    alergenos: ['lacteos', 'huevo'],
  },
  {
    id: 'tarta_queso',
    nombre: 'Tarta de queso artesana',
    descripcion:
      'Tarta de queso cremosa al estilo vasco, sin base, horneada al punto justo. Servida con mermelada de frutos rojos de elaboración propia.',
    precio: 6.0,
    categoria: 'postres',
    imagen: 'https://source.unsplash.com/400x300/?cheesecake,tarta-queso',
    calorias: 380,
    macros: { proteina: 8, carbos: 32, grasa: 24 },
    alergenos: ['lacteos', 'huevo', 'gluten'],
  },
  {
    id: 'coulant',
    nombre: 'Coulant de chocolate negro',
    descripcion:
      'Bizcocho de chocolate 70% cacao con corazón líquido caliente. Servido con una bola de helado de vainilla artesano. Imprescindible.',
    precio: 6.5,
    categoria: 'postres',
    imagen: 'https://source.unsplash.com/400x300/?chocolate-lava-cake,coulant',
    calorias: 440,
    macros: { proteina: 8, carbos: 52, grasa: 24 },
    alergenos: ['gluten', 'lacteos', 'huevo', 'frutos_secos'],
  },
  {
    id: 'fruta',
    nombre: 'Fruta de temporada',
    descripcion:
      'Selección de fruta fresca de temporada cortada al momento. Ligera y refrescante. Pregunta a nuestro equipo por las opciones disponibles hoy.',
    precio: 4.0,
    categoria: 'postres',
    imagen: 'https://source.unsplash.com/400x300/?fresh-fruit,seasonal-fruit',
    calorias: 120,
    macros: { proteina: 1, carbos: 28, grasa: 0 },
    alergenos: [],
  },
  {
    id: 'helado',
    nombre: 'Helado artesano (3 bolas)',
    descripcion:
      'Tres bolas de helado de elaboración propia con ingredientes naturales. Sabores según temporada: pregunta a nuestro equipo cuáles tenemos hoy.',
    precio: 5.0,
    categoria: 'postres',
    imagen: 'https://source.unsplash.com/400x300/?artisan-ice-cream,gelato-scoops',
    calorias: 280,
    macros: { proteina: 4, carbos: 36, grasa: 12 },
    alergenos: ['lacteos', 'huevo'],
  },

  // ── BEBIDAS SIN ALCOHOL ───────────────────────────────────────────────────
  {
    id: 'agua_mineral',
    nombre: 'Agua mineral 50cl',
    descripcion: 'Agua mineral natural de los Pirineos. Fresca y purísima.',
    precio: 1.5,
    categoria: 'bebidas_soda',
    imagen: 'https://source.unsplash.com/200x150/?mineral-water,water-bottle',
    calorias: 0,
    macros: { proteina: 0, carbos: 0, grasa: 0 },
    alergenos: [],
  },
  {
    id: 'refresco',
    nombre: 'Refresco (Coca-Cola, Fanta, Sprite)',
    descripcion: 'Selección de refrescos en lata: Coca-Cola, Fanta naranja, Fanta limón, Sprite, Nestea.',
    precio: 2.5,
    categoria: 'bebidas_soda',
    imagen: 'https://source.unsplash.com/200x150/?soda-drink,soft-drink',
    calorias: 140,
    macros: { proteina: 0, carbos: 35, grasa: 0 },
    alergenos: [],
  },
  {
    id: 'zumo_naranja',
    nombre: 'Zumo de naranja natural',
    descripcion: 'Zumo de naranja exprimido al momento con naranjas frescas de temporada. Sin azúcares añadidos.',
    precio: 3.5,
    categoria: 'bebidas_soda',
    imagen: 'https://source.unsplash.com/200x150/?orange-juice,fresh-juice',
    calorias: 110,
    macros: { proteina: 1, carbos: 26, grasa: 0 },
    alergenos: [],
  },
  {
    id: 'agua_gas',
    nombre: 'Agua con gas',
    descripcion: 'Agua mineral con gas natural. Refrescante y digestiva. Ideal para acompañar los platos más contundentes.',
    precio: 1.8,
    categoria: 'bebidas_soda',
    imagen: 'https://source.unsplash.com/200x150/?sparkling-water,agua-con-gas',
    calorias: 0,
    macros: { proteina: 0, carbos: 0, grasa: 0 },
    alergenos: [],
  },
  {
    id: 'cerveza_sin',
    nombre: 'Cerveza sin alcohol',
    descripcion: 'Cerveza rubia sin alcohol de producción artesanal. Todo el sabor de la cerveza sin los efectos del alcohol.',
    precio: 2.5,
    categoria: 'bebidas_soda',
    imagen: 'https://source.unsplash.com/200x150/?non-alcoholic-beer,alcohol-free-beer',
    calorias: 80,
    macros: { proteina: 1, carbos: 18, grasa: 0 },
    alergenos: ['gluten'],
  },

  // ── BEBIDAS CON ALCOHOL ───────────────────────────────────────────────────
  {
    id: 'cerveza_grifo',
    nombre: 'Cerveza de grifo (caña)',
    descripcion: 'Cerveza rubia fresca de grifo, servida en caña bien fría. Perfecta para los días de calor junto al pantano.',
    precio: 2.0,
    categoria: 'bebidas_alcohol',
    imagen: 'https://source.unsplash.com/200x150/?draft-beer,beer-glass',
    calorias: 150,
    macros: { proteina: 1, carbos: 12, grasa: 0 },
    alergenos: ['gluten'],
  },
  {
    id: 'vino_tinto',
    nombre: 'Vino tinto de la tierra (copa)',
    descripcion: 'Vino tinto de producción local seleccionado por nuestro sumiller. Variedad según temporada. Frutal y equilibrado.',
    precio: 3.5,
    categoria: 'bebidas_alcohol',
    imagen: 'https://source.unsplash.com/200x150/?red-wine,vino-tinto',
    calorias: 120,
    macros: { proteina: 0, carbos: 4, grasa: 0 },
    alergenos: ['sulfitos'],
  },
  {
    id: 'vino_blanco',
    nombre: 'Vino blanco (copa)',
    descripcion: 'Vino blanco joven y afrutado. Fresco y ligero, ideal para acompañar pescados y mariscos. Selección del sommelier.',
    precio: 3.5,
    categoria: 'bebidas_alcohol',
    imagen: 'https://source.unsplash.com/200x150/?white-wine,vino-blanco',
    calorias: 110,
    macros: { proteina: 0, carbos: 3, grasa: 0 },
    alergenos: ['sulfitos'],
  },
  {
    id: 'sangria',
    nombre: 'Sangría de la casa (jarra)',
    descripcion: 'Sangría casera elaborada con vino tinto, frutas frescas de temporada, brandy y un toque de canela. Para compartir entre 2-3.',
    precio: 9.5,
    categoria: 'bebidas_alcohol',
    imagen: 'https://source.unsplash.com/200x150/?sangria,sangria-pitcher',
    calorias: 180,
    macros: { proteina: 0, carbos: 22, grasa: 0 },
    alergenos: ['sulfitos'],
  },
  {
    id: 'cava',
    nombre: 'Cava brut (copa)',
    descripcion: 'Cava brut nature de producción local. Burbujas finas y persistentes con notas frutales. Perfecto para celebrar cualquier momento.',
    precio: 4.5,
    categoria: 'bebidas_alcohol',
    imagen: 'https://source.unsplash.com/200x150/?cava-sparkling,champagne-glass',
    calorias: 130,
    macros: { proteina: 0, carbos: 5, grasa: 0 },
    alergenos: ['sulfitos'],
  },
  {
    id: 'gin_tonic',
    nombre: 'Gin Tonic',
    descripcion: 'Gin Tonic preparado con ginebra premium y tónica artesanal. Con guarnición a elegir: pepino, enebro, pomelo o frutos rojos.',
    precio: 8.0,
    categoria: 'bebidas_alcohol',
    imagen: 'https://source.unsplash.com/200x150/?gin-tonic,cocktail-drink',
    calorias: 180,
    macros: { proteina: 0, carbos: 18, grasa: 0 },
    alergenos: [],
  },
]
