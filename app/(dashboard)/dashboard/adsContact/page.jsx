import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import ContactsClient from "./_components/_ContactsClient";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const contacts = await prismadb.adcontact.findMany();

  const formattedContacts = contacts.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    message: item.message,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ContactsClient data={formattedContacts} />
      </div>
    </div>
  );
}
