import Link from "next/link";
import ProductsCarousel from "../ProductsCarousel";
import prismadb from "@/lib/prismadb";

async function LatestProducts() {
  const products = await prismadb.product.findMany({
    take: 4,
    include: {
      images: true,
    },
    orderBy: [{ createdAt: "desc" }],
  });

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
      <ProductsCarousel products={products} type="latest" />
    </div>
  );
}

export default LatestProducts;
