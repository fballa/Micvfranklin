import { Product } from './types';

// Images provided by user
export const IMAGES = {
  BANNER_HERO: 'https://micvfranklin.netlify.app/anuncios/bannerhero.webp',
  BANNER_SEC: 'https://micvfranklin.netlify.app/anuncios/bannerllanta.webp',
  TIRE_1: 'https://micvfranklin.netlify.app/anuncios/llanta1.png',
  TIRE_2: 'https://micvfranklin.netlify.app/anuncios/llanta2.png',
  TIRE_3: 'https://micvfranklin.netlify.app/anuncios/llanta3.png',
  LOGO_PIRELLI: 'https://micvfranklin.netlify.app/anuncios/marcapirelly.webp',
  LOGO_GOODYEAR: 'https://micvfranklin.netlify.app/anuncios/marcagoody.webp',
  LOGO_MICHELIN: 'https://micvfranklin.netlify.app/anuncios/msrcamiche.webp',
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cinturato P7 All Season',
    brand: 'Pirelli',
    brandLogo: IMAGES.LOGO_PIRELLI,
    model: 'Cinturato P7',
    price: 3200,
    originalPrice: 3800,
    image: IMAGES.TIRE_1,
    specs: {
      width: 205,
      profile: 55,
      rim: 16,
      loadIndex: 91,
      speedRating: 'V',
      type: 'Auto',
      season: 'All Season',
      runFlat: false,
      noiseDb: 70,
      fuelEfficiency: 'C',
      wetGrip: 'B'
    },
    description: 'La primera llanta de "Green Performance" de alto rendimiento de Pirelli, se creó para aprovechar al máximo los últimos materiales, estructuras y diseño de la banda de rodadura.',
    stock: 20,
    reviews: 124,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Eagle F1 Asymmetric',
    brand: 'Goodyear',
    brandLogo: IMAGES.LOGO_GOODYEAR,
    model: 'Eagle F1',
    price: 4500,
    image: IMAGES.TIRE_2,
    specs: {
      width: 225,
      profile: 45,
      rim: 17,
      loadIndex: 94,
      speedRating: 'W',
      type: 'Auto',
      season: 'Verano',
      runFlat: true,
      noiseDb: 68,
      fuelEfficiency: 'D',
      wetGrip: 'A'
    },
    description: 'Llanta de ultra alto rendimiento que ofrece una distancia de frenado más corta en carreteras mojadas y secas.',
    stock: 15,
    reviews: 89,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Pilot Sport 4 S',
    brand: 'Michelin',
    brandLogo: IMAGES.LOGO_MICHELIN,
    model: 'Pilot Sport 4',
    price: 5200,
    originalPrice: 5800,
    image: IMAGES.TIRE_3,
    specs: {
      width: 245,
      profile: 40,
      rim: 18,
      loadIndex: 97,
      speedRating: 'Y',
      type: 'Auto',
      season: 'Verano',
      runFlat: false,
      noiseDb: 71,
      fuelEfficiency: 'C',
      wetGrip: 'A'
    },
    description: 'Auténtica pasión, conducción excepcional. La llanta MICHELIN Pilot Sport 4 S proporciona un rendimiento máximo para vehículos deportivos.',
    stock: 8,
    reviews: 256,
    rating: 5.0
  },
  {
    id: '4',
    name: 'Scorpion Verde All Season',
    brand: 'Pirelli',
    brandLogo: IMAGES.LOGO_PIRELLI,
    model: 'Scorpion Verde',
    price: 4100,
    image: IMAGES.TIRE_1,
    specs: {
      width: 235,
      profile: 60,
      rim: 18,
      loadIndex: 103,
      speedRating: 'H',
      type: 'SUV',
      season: 'All Season',
      runFlat: false,
      noiseDb: 72,
      fuelEfficiency: 'B',
      wetGrip: 'B'
    },
    description: 'Llanta desarrollada específicamente para Crossovers y SUVs. Dedicada a los conductores que buscan mayor kilometraje y ligeras capacidades off-road.',
    stock: 30,
    reviews: 55,
    rating: 4.6
  },
  {
    id: '5',
    name: 'Wrangler Duratrac',
    brand: 'Goodyear',
    brandLogo: IMAGES.LOGO_GOODYEAR,
    model: 'Wrangler',
    price: 5800,
    originalPrice: 6500,
    image: IMAGES.TIRE_2,
    specs: {
      width: 265,
      profile: 70,
      rim: 17,
      loadIndex: 115,
      speedRating: 'S',
      type: 'AT/MT',
      season: 'All Season',
      runFlat: false,
      noiseDb: 76,
      fuelEfficiency: 'E',
      wetGrip: 'C'
    },
    description: 'Una llanta de trabajo duro para camionetas que realizan trabajos pesados, remolque y conducción fuera de carretera.',
    stock: 12,
    reviews: 42,
    rating: 4.7
  }
];

export const BRANDS = [
  { name: 'Pirelli', logo: IMAGES.LOGO_PIRELLI },
  { name: 'Goodyear', logo: IMAGES.LOGO_GOODYEAR },
  { name: 'Michelin', logo: IMAGES.LOGO_MICHELIN },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "Cliente Verificado",
    comment: "Excelente servicio, las llantas llegaron en 2 días y la instalación fue super rápida.",
    rating: 5
  },
  {
    id: 2,
    name: "Ana Paola Ramos",
    role: "Cliente Verificado",
    comment: "Tenía dudas sobre qué llanta elegir para mi SUV y el asesoría por WhatsApp fue genial.",
    rating: 5
  },
  {
    id: 3,
    name: "Jorge Trejo",
    role: "Conductor Uber",
    comment: "Precios muy competitivos, definitivamente volveré a comprar aquí.",
    rating: 4
  }
];