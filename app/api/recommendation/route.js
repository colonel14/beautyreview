import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

// If User is loggedIn get the recommendations that stored in the database
export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    let categories = await prismadb.recommendation.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    categories = categories[0]?.selectedCategory.split(", ");

    let recommendedProducts = [];

    if (categories.length) {
      recommendedProducts = await prismadb.product.findMany({
        where: {
          categoryId: {
            in: categories,
          },
        },
        include: {
          images: true,
          category: true,
          Review: true,
        },
      });

      const randomSort = () => Math.random() - 0.5;

      // Shuffle the Array
      recommendedProducts.sort(randomSort);
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
    }

    return NextResponse.json(recommendedProducts);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

// If the user is not signedIn get the visited categories
export async function POST(req) {
  try {
    const body = await req.json();
    const { categories } = body;

    let recommendedProducts = [];

    if (categories.length) {
      recommendedProducts = await prismadb.product.findMany({
        where: {
          categoryId: {
            in: categories,
          },
        },
        include: {
          images: true,
          category: true,
          Review: true,
        },
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
    }

    return NextResponse.json(recommendedProducts);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}