import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function getUserRecommendations() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
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

      // Check if the user has made any reviews in the website
      if (userReviews.length) {
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
      } else {
        recommendedProducts = await prismadb.product.findMany({
          take: 4,
          include: {
            images: true,
            category: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }
    }

    return recommendedProducts;
  } catch (error) {
    throw new Error(error);
  }
}
