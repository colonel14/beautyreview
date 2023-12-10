import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function getProducts() {
  try {
    const currentUser = await getCurrentUser();
    const products = await prismadb.product.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        category: true,
        images: true,
      },

    });
    return products;
  } catch (error) {
    throw new Error(error);
  }
}
