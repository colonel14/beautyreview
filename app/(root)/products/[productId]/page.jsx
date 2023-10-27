import getCurrentUser from "@/actions/getCurrentUser";
import Gallery from "@/components/Gallery";
import ReviewForm from "@/components/ReviewForm";
import ReviewItem from "@/components/ReviewItem";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

async function ProductDetailsPage({ params }) {
  const currentUser = await getCurrentUser();

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
      category: true,
      images: true,
    },
  });

  const allReview = await prismadb.review.findMany({
    where: {
      productId: params.productId,
    },
  });

  let averageRating = 0;
  if (allReview.length > 0) {
    const totalRating = allReview.reduce((acc, review) => {
      return acc + review.rating;
    }, 0);
    averageRating = totalRating / allReview.length;
  }

  if (!product) {
    return <div>Product id not fount</div>;
  }

  return (
    <div className="details__page">
      <div className="container">
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <span className="product__category">{product.category.name}</span>
              <div className="flex justify-between items-center">
                <h3 className="product__title">{product.title}</h3>
                <div className="flex items-center gap-1 text-[#FFCE00] text-lg">
                  {averageRating} <Star className="h-5 w-5" fill="#FFCE00" />
                </div>
              </div>
              <h3 className="product__desc">{product.description}</h3>

              <Separator className="my-7" />
              <div className="product__owner">
                <Image
                  className="rounded-full cursor-pointer"
                  height={30}
                  width={30}
                  alt="avatar"
                  src={product?.User?.image || "/images/placeholder.jpg"}
                />
                <div className="product__owner-info">
                  <h5 className="product__owner-name">{product?.User?.name}</h5>
                  <h6 className="product__owner-email">
                    {product?.User?.email}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 mb-20">
          <div className="flex items-center space-x-5 mb-10">
            <span className="w-[5px] h-[30px] bg-pink-dark rounded-full inline-block"></span>
            <span className="font-medium text-xl">
              Comment & Review Section
            </span>
          </div>
          <div className="">
            <div>
              {allReview.map((review, index) => (
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
