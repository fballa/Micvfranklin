export interface Product {
  id: string;
  name: string;
  brand: string;
  brandLogo: string;
  model: string;
  price: number;
  originalPrice?: number;
  image: string;
  specs: {
    width: number;
    profile: number;
    rim: number;
    loadIndex: number;
    speedRating: string;
    type: 'Auto' | 'SUV' | 'Camioneta' | 'AT/MT';
    season: 'Verano' | 'Invierno' | 'All Season';
    runFlat: boolean;
    noiseDb: number;
    fuelEfficiency: 'A' | 'B' | 'C' | 'D' | 'E';
    wetGrip: 'A' | 'B' | 'C' | 'D' | 'E';
  };
  description: string;
  stock: number;
  reviews: number;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterState {
  width: string;
  profile: string;
  rim: string;
  brand: string;
  season: string;
  onlyOffers?: boolean;
  vehicle?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export type ViewState = 'HOME' | 'CATALOG' | 'PRODUCT' | 'CART' | 'CHECKOUT' | 'SUCCESS';