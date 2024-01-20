import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categoriesData = [
  {
    name: 'Face',
    subcategories: [
      { name: 'Foundation' },
      { name: 'Concealer' },
      { name: 'Face Primer' },
      { name: 'Highlighter' }
    ]
  },
  { name: 'Eye' },
  { name: 'Lip' },
  { name: 'Cheek' }
];

async function main() {
  for (const categoryData of categoriesData) {
    const { name, subcategories } = categoryData;

    // Create the parent category
    const parentCategory = await prisma.category.create({
      data: {
        name: name,
        type: 'Makeup'
      }
    });

    // If there are subcategories, create them and link to the parent category
    if (subcategories && subcategories.length > 0) {
      for (const subcategoryData of subcategories) {
        await prisma.category.create({
          data: {
            name: subcategoryData.name,
            type: 'Makeup',
            parentId: parentCategory.id // Link subcategory to the parent category
          }
        });
      }
    }
  }


  // await prisma.user.upsert({
  //   where: { email: "admin@gmail.com" },
  //   update: {},
  //   create: {
  //     email: "admin@gmail.com",
  //     name: "Admin One",
  //     hashedPassword: await bcrypt.hash("Colonel@1412", 12),
  //     role: "ADMIN",
  //   },
  // });
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
