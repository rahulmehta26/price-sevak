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

function isExtractedProduct(data: unknown): data is ExtractedProduct {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof (data as any).productName === "string" &&
    typeof (data as any).currentPrice === "number"
  );
}

export async function scrapeProduct(url: string): Promise<ExtractedProduct> {
  try {
    const result = await firecrawl.scrape(url, {
      formats: ["markdown"],
      extract: {
        prompt:
          "Extract the product name as 'productName', current price as a number as 'currentPrice', currency code (USD, EUR, INR, etc) as 'currencyCode', and product image URL as 'productImageUrl' if available",
        schema: {
          type: "object",
          properties: {
            productName: { type: "string" },
            currentPrice: { type: "number" },
            currencyCode: { type: "string" },
            productImageUrl: { type: "string" },
          },
          required: ["productName", "currentPrice"],
        },
      },
    });

    if (!isExtractedProduct(result.json)) {
      throw new Error("Extraction failed or returned invalid data");
    }

    return result.json;
  } catch (error: any) {
    console.error("Firecrawl scrape error:", error);
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
