import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function DELETE(req, { params }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.reviewId) {
      return new NextResponse("Invalid Comment", { status: 400 });
    }

    const review = await prismadb.review.delete({
      where: {
        id: parseInt(params.reviewId),
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.log("[Review_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
