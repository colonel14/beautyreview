import getCurrentUser from "@/actions/getCurrentUser";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileProducts from "@/components/ProfileComponents/ProfileProducts";
import AccountForm from "@/components/ProfileComponents/AccountForm";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  return (
    <div className="profile__page py-20">
      <Tabs defaultValue="account" className=" max-w-7xl mx-auto">
        <TabsList className="w-full py-7">
          <TabsTrigger
            value="account"
            className="flex-1 data-[state=active]:bg-pink-dark data-[state=active]:text-white text-lg"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="flex-1 data-[state=active]:bg-pink-dark data-[state=active]:text-white text-lg"
          >
            Products
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AccountForm currentUser={currentUser} initialData={currentUser} />
        </TabsContent>
        <TabsContent value="products">
          <ProfileProducts />
        </TabsContent>
      </Tabs>
    </div>
  );
}
