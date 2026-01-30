import express, { Request, Response } from "express";
import { ENV } from "./config/env.js";
import cors from "cors";
import productsRouter from "./routes/products.js";
import priceHistoryRouter from "./routes/price-history.js";
import cronRouter from "./routes/cron.js";
import alertsRouter from "./routes/alerts.js";
import activitiesRouter from "./routes/activities.js";

const app = express();

app.use(
  cors({
    origin: ENV.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
  });
});

app.use("/api/products", productsRouter);
app.use("/api/price-history", priceHistoryRouter);
app.use("/api/cron", cronRouter);
app.use("/api/alerts", alertsRouter);
app.use("/api/activities", activitiesRouter);

app.use((err: any, req: Request, res: Response, next: any) => {
  res.status(500).json({ error: err.message || "Internal server error" });
});

const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {});
