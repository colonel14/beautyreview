import prisma from "@/lib/prismadb";

export default async function getCategories(params = {}) {
  try {
    let query = {};
    const { type } = params;
    if (type) {
      query.type = type;
    }
    const categories = await prisma.category.findMany({
      where: query,
    });


    return categories;
  } catch (error) {
    throw new Error(error);
  }
}
