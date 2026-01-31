import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const res = await adapter.connect()
if(res)
{
  console.log("DB is connected");
}
else
{
  console.log("Error in db")
}
export const prisma = new PrismaClient({
  adapter,
});
