"use client";

import { useRouter } from "next/navigation";
import { Heading } from "../../../_components/Heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_Columns";

function ContactsClient({ data }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Email (${data.length})`}
          description="Manage emails you got from your customer"
        />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
}

export default ContactsClient;
