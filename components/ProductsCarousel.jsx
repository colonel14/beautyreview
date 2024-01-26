"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import React from "react";
import Link from "next/link";
import Image from "next/image";

function ProductsCarousel({ products, type }) {
  return (
    <div className="app__carousel">
      <Swiper
        modules={[Pagination]}
        pagination={true}
        breakpoints={{
          991: {
            slidesPerView: 4,
          },
          0: {
            slidesPerView: 2,
          },
        }}
        spaceBetween={20}
      >
        {products &&
          products.map((product) => (
            <div key={`${type}-${product.id}`}>
              <SwiperSlide>
                <Link
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
                        <h4 className="product__slide-title">
                          {product.title}
                        </h4>
                        <p className="product__slide-desc line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            </div>
          ))}
      </Swiper>
    </div>
  );
}

export default ProductsCarousel;
