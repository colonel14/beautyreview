import type { Metadata } from "next";
import "../globals.css";
import Navbar from "./_components/Navbar";
import ToasterProvider from "@/providers/ToasterProvider";
import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Beauty Dashboard",
  description: "Beauty Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  if (currentUser?.role != "ADMIN") {
    redirect("/");
  }

  return (
    <html lang="en">
      <body>
        <ToasterProvider />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
