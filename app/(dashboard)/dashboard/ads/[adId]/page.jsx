import prismadb from "@/lib/prismadb";

import { AdForm } from "../_components/_AdForm";

const UserPage = async ({ params }) => {
  const ad = await prismadb.ad.findUnique({
    where: {
      id: params.adId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AdForm initialData={ad} />
      </div>
    </div>
  );
};

export default UserPage;
