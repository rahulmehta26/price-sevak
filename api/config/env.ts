import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 4000,
  FIRECRAWL_API_KEY: process.env.FIRECRAWL_API_KEY,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
  CRON_SECRET: process.env.CRON_SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  BACKEND_URL:
    process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`,
};
