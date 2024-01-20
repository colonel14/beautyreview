import prismadb from "@/lib/prismadb";
import UsersClient from "./_components/_UsersClient";

export const dynamic = "force-dynamic";

async function UsersPage() {
  const users = await prismadb.user.findMany();

  const formattedUsers = users.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    image: item.image,
    role: item.role,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UsersClient data={formattedUsers} />
      </div>
    </div>
  );
}

export default UsersPage;
