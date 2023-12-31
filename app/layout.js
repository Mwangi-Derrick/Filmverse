import Footer from "@/components/Footer";
import Header from "../components/Header";
import "./globals.css";
import { MobileSidebarContextProvider } from "./mobilesidebar_context";
import MobileSidebar from "@/components/MobileSidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <body className="bg-zinc-950 flex flex-col h-full">
        <MobileSidebarContextProvider>
          <Header />
          <MobileSidebar />
        </MobileSidebarContextProvider>
        <main className="w-screen h-full min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
