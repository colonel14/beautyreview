import Link from "next/link";
import ProductsCarousel from "../ProductsCarousel";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

async function LatestProducts() {
  const products = await prismadb.product.findMany({
    take: 4,
    include: {
      images: true,
      Review: true,
    },

  });

  const formattedProducts = products.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    review: item.Review,
    images: item.images,
  }));

  return (
    <div className="home__section">
      <div className="section__header">
        <h2 className="section__heading">
          Latest <span className="heading__divider"></span> Products
        </h2>
        <Link href="/products" className="app__button">
          View Products <span className="app__button-arrow"></span>
        </Link>
      </div>
      <ProductsCarousel products={formattedProducts} />
    </div>
  );
}

export default LatestProducts;
