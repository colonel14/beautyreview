import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { selectedCategory, skinType, budget } = body;

    let categories = selectedCategory.split(", ");

    let recommendedProducts = [];

    recommendedProducts = await prismadb.product.findMany({
      where: {
        categoryId: {
          in: categories,
        },
        AND: {
          price: { lte: Number(budget) },
          skinType: skinType,
        },
      },
      include: {
        images: true,
        category: true,
        Review: true,
      },
    });

    if (recommendedProducts.length) {
      // If there is recommended Products
      return NextResponse.json({
        products: recommendedProducts,
        type: "recommendations",
      });
    } else {
      // Get the top Rated product
      const topRatedProducts = await prismadb.review.groupBy({
        // Group the reviews by Product Id
        by: ["productId"],
        take: 4,
        select: {
          productId: true,
        },
        // Count the number of reviews according to the recommendToOthers
        _count: {
          recommendToOthers: true,
        },
        // Get the count according to the recommendToOthers is equal to true only
        where: {
          recommendToOthers: "true",
        },
        orderBy: {
          _count: {
            recommendToOthers: "desc",
          },
        },
      });

      recommendedProducts = await prismadb.product.findMany({
        where: {
          id: {
            in: topRatedProducts.map((item) => item.productId),
          },
        },
        include: {
          images: true,
          category: true,
          Review: true,
        },
      });

      return NextResponse.json({
        products: recommendedProducts,
        type: "topRated",
      });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
