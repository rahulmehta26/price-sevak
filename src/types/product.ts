export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  url: string;
  user_id: string;
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
