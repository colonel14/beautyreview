import "../globals.css";
import Navbar from "./_components/Navbar";
import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Beauty Dashboard",
  description: "Beauty Dashboard",
};

export default async function DashboardLayout({ children }) {
  const currentUser = await getCurrentUser();
  if (currentUser?.role != "ADMIN") {
    redirect("/");
  }

  return (
    <html lang="en">
      <body>
        <Toaster />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
