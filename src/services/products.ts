import { api } from "../lib/axios";
import type {
  AddProductResponse,
  DeleteProductResponse,
  GetProductsResponse,
} from "../types/product";
import supabase from "../utils/supabase/supabase";

async function authHeaders() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (!token) {
    throw new Error("User not authenticated");
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function getProducts(): Promise<GetProductsResponse> {
  const res = await api.get<GetProductsResponse>("/products", {
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
    }
  );

  return res.data;
}

export async function deleteProduct(
  id: string
): Promise<DeleteProductResponse> {
  const res = await api.delete<DeleteProductResponse>("/products", {
    params: { id },
    headers: await authHeaders(),
  });

  return res.data;
}
