import prismadb from "@/lib/prismadb";
import CategoriesClient from "./_components/_CategoriesClient";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const categories = await prismadb.category.findMany({
    where: {
      type: "Makeup",
      parentId: null,
    },
  });

  const formattedCategories = categories.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
}
