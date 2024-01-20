import ContactForm from "@/app/(root)/contact/ContactForm";
import Link from "next/link";

async function ContactPage() {
  return (
    <div>
      <div className="page__hero">
        <div className="page__breadcrubms">
          <Link href="/">Home</Link>
          <span className="page__breadcrubms-divider"></span>
          <span className="page__breadcrubms-current">contact</span>
        </div>
        <div className="page__hero-inner">
          <div className="page__hero-heading">
            <h2 className="page__hero-title">Contact Us</h2>
            <p className="page__hero-subtitle">
              We like to hear from you, your review about the site. please feel
              free to fell the form below and tell us how can we imporove our
              website further more
            </p>
          </div>
        </div>
      </div>
      <div className=" max-w-4xl mx-auto">
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactPage;
