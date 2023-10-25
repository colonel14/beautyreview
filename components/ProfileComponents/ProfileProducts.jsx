import getProfileProducts from "@/actions/getProfileProducts";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./Columns";

async function ProfileProducts() {
  const products = await getProfileProducts();

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
