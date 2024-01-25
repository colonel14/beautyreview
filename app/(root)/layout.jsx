import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import getCurrentUser from "@/actions/getCurrentUser";
import RegistgerModal from "@/components/modals/RegistgerModal";
import LoginModal from "@/components/modals/LoginModal";
import { Toaster } from "react-hot-toast";
import RecommendationModal from "@/components/modals/RecommendationModal";
import getCategories from "@/actions/getCategories";

export const metadata = {
  title: "Beauty Review",
  description: "Beauty Review",
};

export default async function RootLayout({ children }) {
  const currentUser = await getCurrentUser();
  const categories = await getCategories();

  return (
    <html lang="en">
      <body className="pb-10">
        <Toaster />
        <RegistgerModal />
        <RecommendationModal categories={categories} />
        <LoginModal />
        <main className="app__wrapper">
          <Navbar currentUser={currentUser} />
          {children}
        </main>
      </body>
    </html>
  );
}
