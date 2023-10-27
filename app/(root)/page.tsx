import React from "react";
import Hero from "@/components/Home/Hero";
import RecommendedProducts from "@/components/Home/RecommendedProducts";
import LatestProducts from "@/components/Home/LatestProducts";

export default async function HomePage() {
  return (
    <main>
      <Hero />
      <RecommendedProducts />
      <LatestProducts />
    </main>
  );
}
