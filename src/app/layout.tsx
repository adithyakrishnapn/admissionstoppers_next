import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import FirstTimePopup from "@/components/ui/FirstTimePopup";
import Preloader from "@/components/ui/Preloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Admissions Topper",
  description: "At Admissions Topper, we stand as a beacon of guidance and accomplishment in the realm of educational consultancy.",
  keywords: "admissions topper, admission, education agency, higher studies, best colleges, yenepoya university",
  icons: {
    icon: "/img/at.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${outfit.variable} h-full scroll-smooth`}
    >
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-sans text-gray-800 bg-gray-50/50">
        <Preloader />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppCTA />
        <FirstTimePopup />
      </body>
    </html>
  );
}
