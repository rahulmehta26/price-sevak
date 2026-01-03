import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 4000,
  FIRECRAWL_API_KEY: process.env.FIRECRAWL_API_KEY,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
};
