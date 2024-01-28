import getCurrentUser from "@/actions/getCurrentUser";
import SearchInput from "@/components/SearchInput";
import prismadb from "@/lib/prismadb";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function SearchPage({ searchParams }) {
  const currentUser = await getCurrentUser();
  const products = await prismadb.product.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchParams?.search,
          },
        },
        {
          description: {
            contains: searchParams?.search,
          },
        },
      ],
    },
    include: {
      images: true,
      Review: true,
    },
  });
  return (
    <div>
      <div className="page__hero">
        <div className="page__breadcrubms">
          <Link href="/">Home</Link>
          <span className="page__breadcrubms-divider"></span>
          <span className="page__breadcrubms-current">Search</span>
        </div>
        <div className="page__hero-inner">
          <div className="page__hero-heading">
            <h2 className="page__hero-title">
              Search Result for{" "}
              <span className="block text-4xl">
                {`"${searchParams?.search}"`}
              </span>
            </h2>
          </div>
        </div>
      </div>
      <SearchInput currentUser={currentUser} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Loop over Products */}
        {products &&
          products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="product__slide"
            >
              <div className="product__slide-img">
                <Image
                  src={product?.images[0]?.url}
                  width={755}
                  height={483}
                  alt="slide image"
                />
              </div>
              <div className="product__slide-info">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="product__slide-title">{product.title}</h4>
                    <p className="product__slide-desc line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SearchPage;
