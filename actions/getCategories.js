import prisma from "@/lib/prismadb";

export default async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return categories;
  } catch (error) {
    throw new Error(error);
  }
}
