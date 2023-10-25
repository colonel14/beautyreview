import prismadb from "@/lib/prismadb";

import { UserForm } from "../_components/_UserForm";

const UserPage = async ({ params }) => {
  const user = await prismadb.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserForm initialData={user} />
      </div>
    </div>
  );
};

export default UserPage;
