import Link from "next/link";
import Image from "next/image";
import LatestProducts from "@/components/Home/LatestProducts";
import RecommendedProducts from "@/components/Home/RecommendedProducts";
import AdsSection from "@/components/Home/AdsSection";
import getCurrentUser from "@/actions/getCurrentUser";
import CardsSection from "@/components/Home/CardsSection";

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <main className="homepage">
      {/* Start of Hero Section */}
      <div className="app__hero">
        <div className="app__hero-inner">
          <Image
            src="/images/hero-logo.png"
            width={602}
            height={345}
            className="max-w-full mx-auto"
            alt="hero logo"
          />
          <span className="app__hero-subtitle">
            Welcome to a beauty review where women share their love for makeup
            and skincare because feeling fabulous is always in fashion!
          </span>

          <Link href="/products" className="app__button">
            View Products
            <span className="app__button-arrow"></span>
          </Link>
        </div>
        <CardsSection currentUser={currentUser} />
        <AdsSection />

        {/* <Image
          src="/images/hero-img.jpg"
          width={500}
          height={300}
          className="app__hero-img"
          alt="hero image"
          unoptimized
        /> */}
      </div>
      {/* End of Hero Section */}
      <RecommendedProducts currentUser={currentUser} />
      {/* Start Of Latest Products Section */}
      <LatestProducts />
      {/* End Of Latest Products Section */}
    </main>
  );
}
