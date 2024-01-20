import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }
    if (!message) {
      return new NextResponse("Message is required", { status: 400 });
    }

    const contact = await prismadb.contact.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
