import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function DELETE(req, { params }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.contactId) {
      return new NextResponse("Contact id is required", { status: 400 });
    }

    const contact = await prismadb.contact.delete({
      where: {
        id: params.contactId,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.log("[CONTACT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
