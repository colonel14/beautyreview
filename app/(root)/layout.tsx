import "../globals.css";

import { ModalProvider } from "@/providers/modal-provider";
import getCurrentUser from "@/actions/getCurrentUser";
import Navbar from "@/components/Navbar/Navbar";
import ToasterProvider from "@/providers/ToasterProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty Review",
  description: "Beauty Review",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <ToasterProvider />
        <ModalProvider />
        <main className="app__wrapper">
          <Navbar currentUser={currentUser} />
          {children}
        </main>
      </body>
    </html>
  );
}
