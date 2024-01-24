import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const dbUrl = process.env.DATABASE_URL as string;

const dbQueryClient = new Pool({
  connectionString: dbUrl,
});

export const db = drizzle(dbQueryClient, {
  schema,
});
