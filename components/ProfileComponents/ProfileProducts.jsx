import { DataTable } from "@/components/ui/data-table";
import { columns } from "./Columns";
import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";

async function ProfileProducts() {
  const currentUser = await getCurrentUser();

  // Get products of the current user
  const products = await prismadb.product.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
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
    <div>
      <DataTable searchKey="title" columns={columns} data={formattedProducts} />
    </div>
  );
}

export default ProfileProducts;
