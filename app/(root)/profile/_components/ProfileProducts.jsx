import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import prismadb from "@/lib/prismadb";
import { columns } from "./_Columns";

async function ProfileProducts({ currentUser }) {
  const products = await prismadb.product.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
      category: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts = products.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    updatedAt: format(item.updatedAt, "MMMM do, yyyy"),
  }));

  return (
    <div>
      <DataTable searchKey="title" columns={columns} data={formattedProducts} />
    </div>
  );
}

export default ProfileProducts;
