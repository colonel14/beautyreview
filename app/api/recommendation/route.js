import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req) {
  // If the user is not signedIn get the visited categories
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
      const topRatedProducts = await prisma.review.groupBy({
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

      recommendedProducts = await prisma.product.findMany({
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

export async function GET(request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    // Retrieve viewed categories from localStorage
    const storedCategories = localStorage.getItem("viewedCategories");
    if (storedCategories) {
      const categories = JSON.parse(storedCategories);

      // Fetch products based on the stored viewed categories for non-logged-in users
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
    }

    return NextResponse.json({ recommendedProducts });
  }

  try {
    const userId = currentUser.id;

    // Fetch user's recommendation if available
    const userRecommendation = await prismadb.recommendation.findUnique({
      where: {
        userId,
      },
    });

    let recommendedProducts = [];

    if (userRecommendation) {
      // If the user has filled the recommendation form, fetch products based on their preferences
      recommendedProducts = await prismadb.product.findMany({
        where: {
          categoryId: userRecommendation.selectedCategory,
          skinType: userRecommendation.skinType,
          price: { lte: parseFloat(userRecommendation.budget) },
        },
        include: {
          images: true,
          category: true,
          Review: true,
        },
      });
    } else {
      // If the user hasn't filled the recommendation form, fetch products based on products they've reviewed
      const userReviews = await prismadb.review.findMany({
        where: {
          userId,
        },
        select: {
          productId: true,
        },
      });

      // Extract product IDs from user's reviews
      const productIds = userReviews.map((review) => review.productId);

      // Fetch recommended products based on user's reviewed products
      recommendedProducts = await prismadb.product.findMany({
        where: {
          id: { in: productIds },
        },
        include: {
          images: true,
          category: true,
          Review: true,
        },
      });
    }

    return NextResponse.json({ recommendedProducts });
  } catch (error) {
    console.log(error);

    return new NextResponse("Internal error", { status: 500 });
  }
}
