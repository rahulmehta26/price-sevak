import { api } from "../lib/axios";
import type {
  AddProductResponse,
  DeleteProductResponse,
  GetPriceHistoryResponse,
  Product,
} from "../types/productTypes";
import supabase from "../utils/supabase/supabase";

async function authHeaders() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.log("Session error:", error);
    throw new Error("Failed to get session");
  }
  const token = data.session?.access_token;

  if (!token) {
    console.error("No access token found");
    throw new Error("User not authenticated");
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await api.get<Product[]>("/products", {
      headers: await authHeaders(),
    });

    return res.data;
  } catch (error) {
    console.error("Get the products error:", error);
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
      }
    );

    return res.data;
  } catch (error) {
    console.error("Add product error:", error);
    throw error;
  }
}

export async function deleteProduct(
  id: string
): Promise<DeleteProductResponse> {
  try {
    const res = await api.delete<DeleteProductResponse>("/products", {
      params: { id },
      headers: await authHeaders(),
    });

    return res.data;
  } catch (error) {
    console.error("Delete product error69:", error);
    throw error;
  }
}

export async function getPriceHistory(
  productId: string
): Promise<GetPriceHistoryResponse> {
  try {
    const res = await api.get<GetPriceHistoryResponse>("/price-history", {
      params: { productId },
      headers: await authHeaders(),
    });

    return res.data;
  } catch (error) {
    console.error("Get price history error:", error);
    throw error;
  }
}
