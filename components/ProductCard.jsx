import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} className="product__slide">
      <div className="product__slide-img">
        <Image
          src={product?.images[0]?.url}
          width={755}
          height={483}
          alt="slide image"
        />
      </div>
      <div className="product__slide-info">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="product__slide-title">{product.title}</h4>
            <p className="product__slide-desc line-clamp-2">
              {product.description}
            </p>
          </div>
          {/* <div className="flex items-center gap-1 text-[#FFCE00] text-lg">
            {averageRating} <Star className="h-5 w-5" fill="#FFCE00" />
          </div> */}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
