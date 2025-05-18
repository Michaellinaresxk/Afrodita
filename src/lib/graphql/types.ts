export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
  stock: number;
  sizes?: string[];
  ingredients: string[];
  image:
    | {
        url: string;
      }
    | string;
  category: Category | string;
  featured?: boolean;
  colors?: string[];
  categories?: string[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface ProductReview {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
}
