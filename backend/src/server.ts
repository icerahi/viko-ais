import dotenv from "dotenv";
import app from "./app";
import { prisma } from "./config/db";
dotenv.config();

const PORT = process.env.PORT || 4000;

async function main() {
  await prisma.$connect();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
