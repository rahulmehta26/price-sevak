import axios, { AxiosError } from "axios";

export async function scrapeProduct(url: string) {
  try {
    const { data } = await axios.post(
      "/api/scrape-product",
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
