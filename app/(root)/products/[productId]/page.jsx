import getCurrentUser from "@/actions/getCurrentUser";
import ClientLocal from "@/components/ClientLocal";
import Gallery from "@/components/Gallery";
import RatingChart from "@/components/RatingChart";
import ReviewForm from "@/components/ReviewForm";
import ReviewItem from "@/components/ReviewItem";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import Link from "next/link";
import React from "react";

async function ProductDetailsPage({ params }) {
  const currentUser = await getCurrentUser();

  // Get Single Product
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      User: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      Review: {
        select: {
          id: true,
          overallSatisfaction: true,
          reasonablyPriced: true,
          qualityRating: true,
          effectivenessRating: true,
          packagingRating: true,
          skinMatchRating: true,
          recommendToOthers: true,
          userId: true,
          User: true,
          comment: true,
          likes: true,
        },
      },
      category: true,
      images: true,
    },
  });

  if (!product) {
    return <div>Product id not fount</div>;
  }

  const reviews = product.Review;

  // Calculate average ratings
  const averageRatings = {
    overallSatisfaction: calculateAverage(
      reviews.map((r) => r.overallSatisfaction)
    ),
    reasonablyPriced: calculateAverage(reviews.map((r) => r.reasonablyPriced)),
    qualityRating: calculateAverage(reviews.map((r) => r.qualityRating)),
    effectivenessRating: calculateAverage(
      reviews.map((r) => r.effectivenessRating)
    ),
    packagingRating: calculateAverage(reviews.map((r) => r.packagingRating)),
    skinMatchRating: calculateAverage(reviews.map((r) => r.skinMatchRating)),
  };

  // function to calculate average of an array of numbers
  function calculateAverage(arr) {
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
  }

  return (
    <div className="details__page">
      <ClientLocal product={product} currentUser={currentUser} />
      <div className="container">
        <div className="py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <span className="product__category">{product.category.name}</span>
              <div className="flex justify-between items-center">
                <h3 className="product__title">{product.title}</h3>
              </div>
              <div className="my-3 space-y-1">
                <p>
                  <span className="font-bold">Price: </span>
                  {product.price} RS
                </p>
                <p>
                  <span className="font-bold">Suitable Skin Type: </span>
                  {product.skinType}
                </p>
                <p>
                  <span className="font-bold">Treats Skin problem: </span>
                  {product.skinConcern}
                </p>
              </div>

              <h3 className="product__desc">{product.description}</h3>
              <Separator className="my-7" />

              <RatingChart averageRatings={averageRatings} />
            </div>
          </div>
        </div>
        <div className="mt-20 mb-20">
          <div className="flex items-center space-x-5 mb-10">
            <span className="w-[5px] h-[30px] bg-pink-dark rounded-full inline-block"></span>
            <span className="font-medium text-xl">
              Comment & Review Section
            </span>

            <Link href="#reviewSection" className="outline-button">
              Write a Review
            </Link>
          </div>
          <div className="">
            <div>
              {reviews.map((review, index) => (
                <div key={review.id} className="mb-5">
                  <h1 className="mb-2 font-medium">Comment: {index + 1}</h1>
                  <ReviewItem {...review} currentUser={currentUser} />
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-5 mt-32" />
          <ReviewForm productId={product?.id} userId={currentUser?.id} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
