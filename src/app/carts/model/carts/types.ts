export interface CartRoot {
  carts: Cart[] | null;
  total: number | null;
  skip: number | null;
  limit: number | null;
}

export interface Cart {
  id: number | null;
  products: Product[] | null;
  total: number | null;
  discountedTotal: number | null;
  userId: number | null;
  totalProducts: number | null;
  totalQuantity: number | null;
}

export interface Product {
  id: number | null;
  title: string | null;
  price: number | null;
  quantity: number | null;
  total: number | null;
  discountPercentage: number | null;
  discountedPrice: number | null;
}

export interface NonNullableCarts extends Cart {
  id: number;
  total: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface NormalizedCarts extends CartRoot {
  carts: NonNullableCarts[];
  total: number;
  skip: number;
  limit: number;
}
