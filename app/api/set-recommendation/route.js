import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const body = await request.json();

    const { selectedCategory, selectedType, skinType, budget, wantsTopRated } =
      body;

    const recommendation = await prisma.recommendation.create({
      data: {
        selectedCategory,
        selectedType,
        skinType,
        budget,
        wantsTopRated,
        userId: currentUser.id,
      },
    });
    return NextResponse.json(recommendation);
  } catch (error) {
    console.log(error);

    return new NextResponse("Internal error", { status: 500 });
  }
}
