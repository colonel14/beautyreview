"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductsCarousel from "../ProductsCarousel";
import axios from "axios";

export const dynamic = "force-dynamic";

function RecommendedProducts({ currentUser }) {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchRecommendation() {
      setIsLoading(true);

      let categories = [];

      const storedCategories = localStorage.getItem("viewedCategories");
      if (storedCategories) {
        categories = JSON.parse(storedCategories);
      }

      try {
        let response;
        if (currentUser) {
          response = await axios.get("/api/recommendation");
        } else {
          response = await axios.post("/api/recommendation", {
            categories,
          });
        }

        const data = response.data;
        setRecommendedProducts(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }

    fetchRecommendation();
  }, []);

  return (
    <div className="home__section">
      <div className="section__header">
        <h2 className="section__heading">
          Recommended <span className="heading__divider"></span> Products
        </h2>
        <Link href="/products" className="app__button">
          View Products <span className="app__button-arrow"></span>
        </Link>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ProductsCarousel products={recommendedProducts} />
      )}
    </div>
  );
}

export default RecommendedProducts;
