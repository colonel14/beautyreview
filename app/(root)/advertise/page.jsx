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
              Welcome to Beauty Review ! Interested in promoting your brand with
              us? Kindly provide the following details, and we&apos;ll get
              back to you shortly:
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
