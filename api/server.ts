// import express, { Request, Response } from "express";
// import { ENV } from "./config/env.js";
// import { scrapeProduct } from "./services/firecrawl.js";

// const app = express();
// app.use(express.json());

// app.post("/scrape-product", async (req: Request, res: Response) => {
//   try {
//     const { url } = req.body as { url?: string };

//     if (!url) {
//       return res.status(400).json({ error: "URL is required" });
//     }

//     const productData = await scrapeProduct(url);

//     if (!productData) {
//       return res.status(500).json({ error: "Failed to scrape product" });
//     }

//     return res.json({
//       success: true,
//       data: productData,
//     });
//   } catch (error) {
//     console.error("Scrape error:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.listen(ENV.PORT ?? 4000, () => {
//   console.log(`Server running on http://localhost:${ENV.PORT ?? 4000}`);
// });
