import Link from "next/link";

function ProductsPage() {
  return (
    <div className=" pb-32">
      <div className="page__hero">
        <div className="page__breadcrubms">
          <Link href="/">Home</Link>
          <span className="page__breadcrubms-divider"></span>
          <span className="page__breadcrubms-current">Products</span>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Link href="/products/makeup" className="category-card makeup-card">
            <h4>Makeup</h4>
          </Link>
          <Link
            href="/products/skincare"
            className="category-card skincare-card"
          >
            <h4>Skincare</h4>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
