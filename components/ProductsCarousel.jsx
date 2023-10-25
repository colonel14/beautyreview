"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import React, { useRef } from "react";
import ProductCard from "./ProductCard";

function ProductsCarousel({ products }) {
  const swiperRef = useRef(null);

  return (
    <div className="app__carousel">
      <Swiper
        modules={[Scrollbar]}
        scrollbar={{
          draggable: true,
          el: ".swiper-scrollbar",
          hide: false,
        }}
        breakpoints={{
          991: {
            slidesPerView: 3,
          },
          767: {
            slidesPerView: 2,
          },
          479: {
            slidesPerView: 1,
          },
        }}
        spaceBetween={20}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {products &&
          products.map((product) => (
            <React.Fragment key={product.id}>
              <SwiperSlide>
                <ProductCard product={product} />
              </SwiperSlide>
            </React.Fragment>
          ))}
      </Swiper>
      <div className="swiper-scrollbar"></div>
    </div>
  );
}

export default ProductsCarousel;
