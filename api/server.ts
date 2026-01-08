import express, { Request, Response } from "express";
import { ENV } from "./config/env.js";
import cors from "cors";
import productsRouter from "./routes/products.js";
import priceHistoryRouter from "./routes/price-history.js";
import cronRouter from "./routes/cron.js";

const app = express();

app.use(
  cors({
    origin: ENV.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/price-history", priceHistoryRouter);
app.use("/api/cron", cronRouter);

app.use((err: any, req: Request, res: Response, next: any) => {
  console.log("Error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${ENV.PORT ?? 4000}`);
});
