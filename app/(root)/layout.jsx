import "../globals.css";

import { ModalProvider } from "@/providers/modal-provider";
import getCurrentUser from "@/actions/getCurrentUser";
import Navbar from "@/components/Navbar/Navbar";
import ToasterProvider from "@/providers/ToasterProvider";

export const metadata = {
  title: "Beauty Review",
  description: "Beauty Review",
};

export default async function RootLayout({ children }) {
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
