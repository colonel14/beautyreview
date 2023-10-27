import Link from "next/link";
import UserMenu from "./UserMenu";

function Navbar({ currentUser }) {
  return (
    <div className="app__navbar">
      <div className="app__navbar-links">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/contact">Contact Us</Link>
      </div>
      <div className="app__navbar-logo">
        <Link href="/">Beauty Review</Link>
      </div>
      <div className="app__navbar-user">
        <UserMenu currentUser={currentUser} />
      </div>
    </div>
  );
}

export default Navbar;
