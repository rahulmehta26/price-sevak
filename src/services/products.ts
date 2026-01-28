import { api } from "../lib/axios";
import type {
  AddProductResponse,
  DeleteProductResponse,
  GetPriceHistoryResponse,
  Product,
} from "../types/productTypes";
import { authHeaders } from "./authHeader";

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await api.get<Product[]>("/products", {
      headers: await authHeaders(),
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function addProduct(url: string): Promise<AddProductResponse> {
  try {
    const res = await api.post<AddProductResponse>(
      "/products",
      { url },
      {
        headers: await authHeaders(),
      },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(
  id: string,
): Promise<DeleteProductResponse> {
  try {
    const res = await api.delete<DeleteProductResponse>("/products", {
      params: { id },
      headers: await authHeaders(),
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getPriceHistory(
  productId: string,
): Promise<GetPriceHistoryResponse> {
  try {
    const res = await api.get<GetPriceHistoryResponse>("/price-history", {
      params: { productId },
      headers: await authHeaders(),
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}
