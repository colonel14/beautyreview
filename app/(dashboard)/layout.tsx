import type { Metadata } from "next";
import "../globals.css";
import Navbar from "./_components/Navbar";
import ToasterProvider from "@/providers/ToasterProvider";

export const metadata: Metadata = {
  title: "Beauty Dashboard",
  description: "Beauty Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
