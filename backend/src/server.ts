import dotenv from "dotenv";
import app from "./app";
import { prisma } from "./config/db";
import { UserRole } from "./generated/prisma/enums";
dotenv.config();

const PORT = process.env.PORT || 4000;

async function main() {
  await prisma.$connect();
  await seedSuperAdmin();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});

async function seedSuperAdmin() {
  const isSuperAdminExist = await prisma.user.findUnique({
    where: { login: process.env.SUPER_ADMIN_LOGIN },
  });

  if (isSuperAdminExist) {
    console.log("Super Admin Already Exist.");
    console.log(isSuperAdminExist);
    return;
  }

  console.log("Super admin creating.......");

  const superAdmin = await prisma.user.create({
    data: {
      firstName: "Super",
      lastName: "Admin",
      login: process.env.SUPER_ADMIN_LOGIN!,
      password: process.env.SUPER_ADMIN_PASSWORD!,
      role: UserRole.ADMIN,
    },
  });
  console.log(superAdmin);

  return;
}
