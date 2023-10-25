import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();

    const { comment, rating, userId, productId } = body;

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!comment) {
      return new NextResponse("Comment is required", { status: 400 });
    }
    if (!rating) {
      return new NextResponse("Review is required", { status: 400 });
    }

    const review = await prismadb.review.create({
      data: {
        rating,
        comment,
        productId,
        userId,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
