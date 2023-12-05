import { roles } from "@/server";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

if (!("DATABASE_URL" in process.env)) throw new Error("DATABASE_URL not found on .env.development");

const main = async () => {
  console.log("Seed start");
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(client);
  await db.insert(roles).values([
    {
      name: "Admin",
      permissions: [],
    },
    {
      name: "User",
      permissions: [],
    },
  ]);
  console.log("Seed done");
};

main();
