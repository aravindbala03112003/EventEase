import { Pool } from "pg";
import { env } from "../config/env";

const isSsl = env.databaseUrl.includes("sslmode=require") || env.databaseUrl.includes("neon.tech") || env.databaseUrl.includes("oregon-postgres.render.com");

export const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: isSsl ? { rejectUnauthorized: false } : false
});

export const query = <T = any>(text: string, params?: any[]): Promise<T> => {
  return pool.query(text, params) as Promise<T>;
};
