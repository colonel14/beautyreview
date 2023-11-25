import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();

    const { name, catType, parentId } = body;

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const category = await prismadb.category.create({
      data: {
        name,
        type: catType,
        parentId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
