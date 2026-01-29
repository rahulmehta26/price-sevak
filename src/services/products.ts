import { api } from "../lib/axios";
import type {
  AddProductResponse,
  DeleteProductResponse,
  GetPriceHistoryResponse,
  Product,
} from "../types/productTypes";
import { authHeaders } from "./authHeader";

export async function getProducts(): Promise<Product[]> {
  const res = await api.get<Product[]>("/products", {
    headers: await authHeaders(),
  });

  return res.data;
}

export async function addProduct(url: string): Promise<AddProductResponse> {
  const res = await api.post<AddProductResponse>(
    "/products",
    { url },
    {
      headers: await authHeaders(),
    },
  );

  return res.data;
}

export async function deleteProduct(
  id: string,
): Promise<DeleteProductResponse> {
  const res = await api.delete<DeleteProductResponse>("/products", {
    params: { id },
    headers: await authHeaders(),
  });

  return res.data;
}

export async function getPriceHistory(
  productId: string,
): Promise<GetPriceHistoryResponse> {
  const res = await api.get<GetPriceHistoryResponse>("/price-history", {
    params: { productId },
    headers: await authHeaders(),
  });

  return res.data;
}
