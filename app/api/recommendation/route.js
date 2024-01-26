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
      // Count the occurrences of each category
      const categoryCounts = {};
      categories.forEach((category) => {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });

      console.log(categoryCounts);

      // Sort categories by visit count in descending order
      const sortedCategories = Object.keys(categoryCounts).sort(
        (a, b) => categoryCounts[b] - categoryCounts[a]
      );

      // Retrieve 4 products from the most visited category
      const mostVisitedProducts = await prismadb.product.findMany({
        where: {
          categoryId: {
            in: sortedCategories.slice(0, 1), // Use the most visited category
          },
        },
        include: {
          images: true,
          category: true,
        },
        orderBy: {
          categoryId: "desc",
        },
        take: 4, // Retrieve 4 products
      });

      recommendedProducts = [...mostVisitedProducts];

      // Retrieve 2 random products from other categories
      const otherCategories = sortedCategories.slice(1); // Exclude the most visited category

      if (otherCategories.length > 0) {
        let randomProducts = await prismadb.product.findMany({
          where: {
            categoryId: {
              in: otherCategories,
            },
          },
          include: {
            images: true,
            category: true,
          },
          orderBy: {
            categoryId: "desc",
          },
          distinct: ["categoryId"],
        });

        // Shuffle recommendedProducts
        shuffleArray(randomProducts);

        // Suggest only 2 per time
        randomProducts = randomProducts.slice(0, 2);
        recommendedProducts = [...recommendedProducts, ...randomProducts];
      }

      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
    } else {
      // Get the top Rated product
      const topRatedProducts = await prismadb.review.groupBy({
        // Group the reviews by Product Id
        by: ["productId"],
        take: 6,
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
      // Count the occurrences of each category
      const categoryCounts = {};
      categories.forEach((category) => {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });

      console.log(categoryCounts);

      // Sort categories by visit count in descending order
      const sortedCategories = Object.keys(categoryCounts).sort(
        (a, b) => categoryCounts[b] - categoryCounts[a]
      );

      // Retrieve 4 products from the most visited category
      const mostVisitedProducts = await prismadb.product.findMany({
        where: {
          categoryId: {
            in: sortedCategories.slice(0, 1), // Use the most visited category
          },
        },
        include: {
          images: true,
          category: true,
        },
        orderBy: {
          categoryId: "desc",
        },
        take: 4, // Retrieve 4 products
      });

      recommendedProducts = [...mostVisitedProducts];

      // Retrieve 2 random products from other categories
      const otherCategories = sortedCategories.slice(1); // Exclude the most visited category

      if (otherCategories.length > 0) {
        let randomProducts = await prismadb.product.findMany({
          where: {
            categoryId: {
              in: otherCategories,
            },
          },
          include: {
            images: true,
            category: true,
          },
          orderBy: {
            categoryId: "desc",
          },
          distinct: ["categoryId"],
        });

        // Shuffle recommendedProducts
        shuffleArray(randomProducts);

        // Suggest only 2 per time
        randomProducts = randomProducts.slice(0, 2);
        recommendedProducts = [...recommendedProducts, ...randomProducts];
      }

      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
    } else {
      // Get the top Rated product
      const topRatedProducts = await prismadb.review.groupBy({
        // Group the reviews by Product Id
        by: ["productId"],
        take: 6,
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
