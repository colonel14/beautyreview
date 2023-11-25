import prismadb from "@/lib/prismadb";
import { CategoryForm } from "../_components/_CategoryForm";
import SubCategories from "./SubCategories";

const CategoryDetailPage = async ({ params }) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
    include: {
      subcategories: true,
    },
  });

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CategoryForm initialData={category} />
        </div>
      </div>
      {category && !category.parentId && (
        <SubCategories
          subcategories={category?.subcategories}
          parentId={params.categoryId}
        />
      )}
    </>
  );
};

export default CategoryDetailPage;
