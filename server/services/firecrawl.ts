import Firecrawl from "@mendable/firecrawl-js";
import { ENV } from "../config/env.js";

const firecrawl = new Firecrawl({
  apiKey: ENV.FIRECRAWL_API_KEY,
});

export interface ScrapedProduct {
  productName?: string;
  currentPrice?: string;
  currencyCode?: string;
  productImageUrl?: string;
}

export async function scrapeProduct(
  url: string
): Promise<ScrapedProduct | null> {
  const result = await firecrawl.scrape(url, {
    formats: ["json"],
    jsonOptions: {
      schema: {
        productName: "string",
        currentPrice: "string",
        currencyCode: "string",
        productImageUrl: "string",
      },
      prompt:
        "Extract the product name as 'productName', current price as a number as 'currentPrice', currency code (USD, EUR, etc) as 'currencyCode', and product image URL as 'productImageUrl' if available.",
    },
  });

  return result?.json ?? null;
}
