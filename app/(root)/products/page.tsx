import getProducts from "@/actions/getProducts";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function ProductsPage() {
  const products = await getProducts();

  const formattedProducts = products.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    review: item.Review,
    images: item.images,
  }));

  return (
    <div>
      <div className="page__hero">
        <div className="page__breadcrubms">
          <Link href="/">Home</Link>
          <span className="page__breadcrubms-divider"></span>
          <span className="page__breadcrubms-current">Products</span>
        </div>
        <div className="page__hero-inner">
          <div className="page__hero-heading">
            <h2 className="page__hero-title">Products</h2>
            <p className="page__hero-subtitle">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              sapiente repellendus minima facere provident accusamus officia,
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {formattedProducts &&
          formattedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default ProductsPage;
