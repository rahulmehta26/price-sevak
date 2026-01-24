export interface Product {
  id: string;
  name: string;
  current_price: number;
  original_price: number;
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

export interface Alert {
  id: string;
  user_id: string;
  product_id: string;
  target_price: number | null;
  is_active: boolean;
  email_enabled: boolean;
  created_at: string;
  updated_at: string;
  product_name?: string;
  image_url?: string;
  current_price?: number;
  original_price?: number;
  url?: string;
}

export interface Activity {
  id: string;
  user_id: string;
  product_id: string | null;
  type: "price_drop" | "price_rise" | "alert_triggered" | "alert_set" | "check";
  product_name: string | null;
  old_price: number | null;
  new_price: number | null;
  change_percentage: number | null;
  description: string | null;
  metadata: any;
  created_at: string;
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
