import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import ProductsClient from "./_components/_ProductsClient";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prismadb.product.findMany({
    include: {
      User: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      category: true,
      images: true,
    },

  });

  const formattedProducts = products.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category.name,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
}
