import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categories = [
  "Foundation",
  "Concealer",
  "Primer",
  "Setting Powder",
  "Blush",
  "Bronzer",
  "Highlighter",
  "Eyeshadow",
  "Eyeliner",
];

async function main() {
  for (let item of categories) {
    await prisma.category.create({
      data: {
        name: item,
      },
    });
  }
  await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      name: "Admin One",
      hashedPassword: await bcrypt.hash("Colonel@1412", 12),
      role: "ADMIN",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
