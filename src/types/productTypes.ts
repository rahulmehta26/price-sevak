export interface Product {
  id: string;
  name: string;
  current_price: number;
  currency: string;
  image_url: string;
  url: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface PriceHistory {
  id: string;
  product_id: string;
  price: number;
  currency: string;
  checked_at: string;
}

export interface GetProductsResponse {
  products: Product[];
}

export interface AddProductResponse {
  product: Product;
}

export interface DeleteProductResponse {
  success: boolean;
}

export interface GetPriceHistoryResponse {
  history: PriceHistory[];
}
