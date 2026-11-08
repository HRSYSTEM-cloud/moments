export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount?: number;
  image: string;
  gallery: string[];
  category: 'magnets' | 'polaroid' | 'gifts' | 'handmade' | 'accessories';
  categoryLabel: string;
  description: string;
  features: string[];
  dimensions?: string;
  material?: string;
  isCustomizable?: boolean;
  isHandmade?: boolean;
  inStock: boolean;
  badge?: string;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  customPhotoUrl?: string;
  customText?: string;
  customShape?: 'square' | 'circle' | 'polaroid' | 'rectangle';
  customFinish?: 'matte' | 'glossy' | 'wood';
}

export interface Testimonial {
  id: string;
  author: string;
  city?: string;
  rating: number;
  text: string;
  purchasedProduct: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface StatItem {
  icon: string;
  value: string;
  label: string;
}
