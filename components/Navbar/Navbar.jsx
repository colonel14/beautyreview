"use client";
import Link from "next/link";
import UserMenu from "./UserMenu";
import Image from "next/image";
import useRecommendationModal from "@/hooks/useRecommendationModal";
import useLoginModal from "@/hooks/useLoginModal";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

function Navbar({ currentUser }) {
  const recommendationModal = useRecommendationModal();
  const loginModal = useLoginModal();

  function showRecommendation() {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }
    recommendationModal.onOpen();
  }

  return (
    <div className="app__navbar">
      <div className="app__navbar-links">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/advertise">Advertise</Link>
        <button className="cursor-pointer" onClick={() => showRecommendation()}>
          Suggestions
        </button>
      </div>
      <div className="app__navbar-logo">
        <Link href="/">
          <Image src="/images/logo.png" width={252} height={56} alt="logo" />
        </Link>
      </div>

      <div className="app__navbar-user flex gap-5 items-center">
        <div className="xl:hidden flex items-center">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-7 h-7 text-pink-default cursor-pointer" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="font-bold text-3xl text-pink-dark mb-5">
                  Beauty Review
                </SheetTitle>
                <div className="flex flex-col items-start gap-3">
                  <Link
                    href="/"
                    className="font-medium text-pink-default text-xl"
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className="font-medium text-pink-default text-xl"
                  >
                    Products
                  </Link>
                  <Link
                    href="/contact"
                    className="font-medium text-pink-default text-xl"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/advertise"
                    className="font-medium text-pink-default text-xl"
                  >
                    Advertise
                  </Link>
                  <button
                    className="cursor-pointer font-medium text-pink-default text-xl"
                    onClick={() => showRecommendation()}
                  >
                    Suggestions
                  </button>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        <UserMenu currentUser={currentUser} />
      </div>
    </div>
  );
}

export default Navbar;
