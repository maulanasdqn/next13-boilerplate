import { drizzle } from "drizzle-orm/node-postgres";
import { customer_debts, products, report_transactions, roles, users } from "./schema";
import { Pool } from "pg";

const dbUrl = process.env.DATABASE_URL as string;

const dbQueryClient = new Pool({
  connectionString: dbUrl,
});

export const db = drizzle(dbQueryClient, {
  schema: {
    ...users,
    ...roles,
    ...report_transactions,
    ...customer_debts,
    ...products,
  },
});
