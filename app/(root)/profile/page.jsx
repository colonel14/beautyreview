import getCurrentUser from "@/actions/getCurrentUser";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileProducts from "./_components/ProfileProducts";
import AccountForm from "./_components/AccountForm";

async function ProfilePage() {
  const currentUser = await getCurrentUser();

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
          <AccountForm initialData={currentUser} />
        </TabsContent>
        <TabsContent value="products">
          <ProfileProducts currentUser={currentUser} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProfilePage;
