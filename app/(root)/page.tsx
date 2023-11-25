import React from "react";
import Hero from "@/components/Home/Hero";
import RecommendedProducts from "@/components/Home/RecommendedProducts";
import LatestProducts from "@/components/Home/LatestProducts";
import getCurrentUser from "@/actions/getCurrentUser";
import UserRecommenations from "@/components/Home/UserRecommenations";

export default async function HomePage() {
  const currentUser = await getCurrentUser();
  return (
    <main>
      <Hero />
      {currentUser ? <UserRecommenations /> : <RecommendedProducts />}
      <LatestProducts />
    </main>
  );
}
