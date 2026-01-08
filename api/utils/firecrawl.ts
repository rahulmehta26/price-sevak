import FirecrawlApp from "@mendable/firecrawl-js";
import { ENV } from "../config/env.js";

const firecrawl = new FirecrawlApp({
  apiKey: ENV.FIRECRAWL_API_KEY,
});

type ExtractedProduct = {
  productName: string;
  currentPrice: number;
  currencyCode?: string;
  productImageUrl?: string;
};

export async function scrapeProduct(url: string): Promise<ExtractedProduct> {
  const result = await firecrawl.scrape(url, {
    formats: [
      {
        type: "json",
        schema: {
          type: "object",
          properties: {
            productName: {
              type: "string",
              description: "Product name or title",
            },
            currentPrice: {
              type: "number",
              description: "Current price as a number",
            },
            currencyCode: {
              type: "string",
              description: "Currency code like USD, INR, EUR",
            },
            productImageUrl: {
              type: "string",
              description: "Main product image URL",
            },
          },
          required: ["productName", "currentPrice"],
        },
        prompt:
          "Extract the product name, current price as a number, currency code (USD, EUR, INR, etc), and product image URL if available",
      },
    ],
  });

  if (!result.json) {
    throw new Error("Extraction failed or returned invalid data");
  }

  return result.json as ExtractedProduct;
}
