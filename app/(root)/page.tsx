import React from "react";
import Hero from "@/components/Home/Hero";
import BestSeller from "@/components/Home/BestSeller";

export default async function HomePage() {
  return (
    <main>
      <Hero />
      <BestSeller />
    </main>
  );
}
