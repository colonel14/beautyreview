import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();

    const { reviewId, type } = body;

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!reviewId) {
      return new NextResponse("Comment is required", { status: 400 });
    }

    const checkLike = await prismadb.like.findFirst({
      where: {
        reviewId: reviewId,
      },
    });

    let like;

    // If there is like arleady in the post do so
    if (checkLike) {
      // If He likes the comment that he already liked it so remove the like
      // If He dislikes the comment that he already disliked it so remove the like
      if (
        (type == "like" && checkLike.type == "like") ||
        (type == "dislike" && checkLike.type == "dislike")
      ) {
        like = await prismadb.like.delete({
          where: {
            id: checkLike.id,
          },
        });
      }

      // If the User reacted with a different react of what he reacts before update the type of the react
      if (
        (type == "dislike" && checkLike.type == "like") ||
        (type == "like" && checkLike.type == "dislike")
      ) {
        like = await prismadb.like.update({
          data: {
            type,
          },
          where: {
            id: checkLike.id,
          },
        });
      }
    } else {
      like = await prismadb.like.create({
        data: {
          type,
          reviewId,
          userId: currentUser.id,
        },
      });
    }

    return NextResponse.json(like);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
