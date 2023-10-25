import Image from "next/image";
import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="app__hero">
      <div className="app__hero-inner">
        <h1 className="app__hero-title">Beauty Review</h1>
        <span className="app__hero-subtitle">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          sapiente repellendus minima facere provident accusamus officia,
        </span>

        <Link href="/products" className="app__button">
          View Products
          <span className="app__button-arrow"></span>
        </Link>
      </div>
      <Image
        src="/images/hero-img.jpg"
        width={500}
        height={300}
        className="app__hero-img"
        alt="hero image"
        unoptimized
      />
    </div>
  );
}

export default Hero;
