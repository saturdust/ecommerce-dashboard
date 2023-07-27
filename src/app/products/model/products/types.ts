export interface ProductsRoot {
  products: Product[] | null;
  total: number | null;
  skip: number | null;
  limit: number | null;
}

export interface Product {
  id: number | null;
  title: string | null;
  description: string | null;
  price: number | null;
  discountPercentage: number | null;
  rating: number | null;
  stock: number | null;
  brand: string | null;
  category: string | null;
  thumbnail: string | null;
  images: string[] | null;
}

export interface ProductsVariables {
  q: string;
  limit: number;
  skip: number;
  category: string;
}

export interface NonNullableProduct extends Product {
  id: number;
  title: string;
  price: number;
  stock: number;
}

export interface NormalizedProducts extends ProductsRoot {
  products: NonNullableProduct[];
  total: number;
  skip: number;
  limit: number;
}
