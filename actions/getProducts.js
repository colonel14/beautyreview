import prisma from "@/lib/prismadb";

export default async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        Review: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return products;
  } catch (error) {
    throw new Error(error);
  }
}
