import prismadb from "@/lib/prismadb";
import getCategories from "@/actions/getCategories";

import { ProductForm } from "../_components/_ProductForm";

const ProductPage = async ({ params }) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await getCategories();


  const formattedCategories = categories.map((item) => ({
    id: item.id,
    name: item.name,
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm initialData={product} categories={formattedCategories} />
      </div>
    </div>
  );
};

export default ProductPage;
