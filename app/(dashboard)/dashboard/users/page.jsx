import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import UsersClient from "./_components/_UsersClient";

async function UsersPage() {
  const users = await prismadb.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedUsers = users.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    image: item.image,
    role: item.role,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    updatedAt: format(item.updatedAt, "MMMM do, yyyy"),
  }));

  console.log(formattedUsers);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UsersClient data={formattedUsers} />
      </div>
    </div>
  );
}

export default UsersPage;
