import AdvertiseForm from "@/app/(root)/advertise/AdvertiseForm";
import Link from "next/link";

async function AdvertisePage() {
  return (
    <div>
      <div className="page__hero">
        <div className="page__breadcrubms">
          <Link href="/">Home</Link>
          <span className="page__breadcrubms-divider"></span>
          <span className="page__breadcrubms-current">Advertise</span>
        </div>
        <div className="page__hero-inner">
          <div className="page__hero-heading">
            <h2 className="page__hero-title">Advertise With Us</h2>
            <p className="page__hero-subtitle">
              We like to hear from you, your review about the site. please feel
              free to fell the form below and tell us how can we imporove our
              website further more
            </p>
          </div>
        </div>
      </div>
      <div className=" max-w-4xl mx-auto">
        <AdvertiseForm />
      </div>
    </div>
  );
}

export default AdvertisePage;
