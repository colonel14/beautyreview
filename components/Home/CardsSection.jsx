"use client";
import Image from "next/image";
import Link from "next/link";
import useRecommendationModal from "@/hooks/useRecommendationModal";
import useLoginModal from "@/hooks/useLoginModal";

function CardsSection({ currentUser }) {
  const recommendationModal = useRecommendationModal();
  const loginModal = useLoginModal();
  return (
    <div className="flex flex-wrap gap-5">
      <span
        className="relative block min-w-[400px] h-[350px] flex-1 p-5 text-center border-2 border-pink-dark  cursor-pointer"
        onClick={() => {
          if (!currentUser) {
            loginModal.onOpen();
          } else {
            recommendationModal.onOpen();
          }
        }}
      >
        <Image
          src="/images/hero-img-1.jpg"
          fill
          className="object-cover"
          alt="hero img"
        />
        <h3 className="relative z-10 text-pink-dark text-3xl font-bold">
          Get <br /> a Recommendations
        </h3>
      </span>
      <Link
        href="/products"
        className="relative min-w-[300px] h-[350px] flex-1 p-5 text-center border-2 border-pink-dark"
      >
        <Image
          src="/images/hero-img-2.jpg"
          fill
          className="object-cover"
          alt="hero img"
        />
        <h3 className="relative z-10 text-pink-dark text-3xl font-bold font-Playfair">
          View <br /> Products
        </h3>
      </Link>
      <Link
        href="/advertise"
        className="relative min-w-[300px] h-[350px] flex-1 p-5 text-center border-2 border-pink-dark"
      >
        <Image
          src="/images/hero-img-3.jpg"
          fill
          className="object-cover"
          alt="hero img"
        />
        <h3 className="absolute top-[32%] z-10 text-pink-dark text-3xl font-bold">
          Advertise <br /> With <br /> Us!
        </h3>
      </Link>
    </div>
  );
}

export default CardsSection;
