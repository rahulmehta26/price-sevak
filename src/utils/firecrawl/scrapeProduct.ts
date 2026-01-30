import type { AxiosError } from "axios";
import { api } from "../../lib/axios";

export async function scrapeProduct(url: string) {
  try {
    const { data } = await api.post(
      "/scrape-product",
      { url },
      {
        headers: {
          "Content-type": "application/json",
        },
      },
    );

    return data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    throw new Error(
      error?.response?.data?.message || "Failed to scrape product",
    );
  }
}
