import React from "react";
import Hero from "@/components/Home/Hero";
import RecommendedProducts from "@/components/Home/RecommendedProducts";
import LatestProducts from "@/components/Home/LatestProducts";
import getCurrentUser from "@/actions/getCurrentUser";
import UserRecommenations from "@/components/Home/UserRecommenations";
import RecommendationModal from "@/components/modals/RecommendationModal";
import getCategories from "@/actions/getCategories";

export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }) {
  const currentUser = await getCurrentUser();
  const categories = await getCategories(searchParams);

  return (
    <>
      <RecommendationModal categories={categories} />
      <main>
        <Hero />
        {currentUser ? <UserRecommenations /> : <RecommendedProducts />}
        <LatestProducts />
      </main>
    </>
  );
}
