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

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://admissionstopper.com";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Admissions Topper - Best Admission Guidance for Medical, Engineering & UG Courses",
    template: "%s | Admissions Topper",
  },
  description: "Expert admission guidance for Medical, Engineering, Paramedical & UG courses across top colleges in Bangalore, Kerala, Tamil Nadu & Mangalore.",
  keywords: [
    "admissions topper",
    "admission",
    "education agency",
    "higher studies",
    "best colleges",
    "yenepoya university",
    "medical admission",
    "engineering admission",
    "UG courses",
    "paramedical admission",
  ],
  authors: [{ name: "Admissions Topper" }],
  creator: "Admissions Topper",
  publisher: "Admissions Topper",
  themeColor: "#06BBCC",
  icons: {
    icon: "/img/at.ico",
    apple: "/img/at.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: appUrl,
    siteName: "Admissions Topper",
    title: "Admissions Topper - Best Admission Guidance for Medical, Engineering & UG Courses",
    description: "Expert admission guidance for Medical, Engineering, Paramedical & UG courses across top colleges in India.",
    images: [
      {
        url: `${appUrl}/img/at.jpg`,
        width: 1200,
        height: 630,
        alt: "Admissions Topper - Educational Consultancy",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Admissions Topper - Best Admission Guidance",
    description: "Expert admission guidance for Medical, Engineering, Paramedical & UG courses.",
    images: [`${appUrl}/img/at.jpg`],
    creator: "@admissionstopper",
    site: "@admissionstopper",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    nocache: false,
  },
  alternates: {
    canonical: appUrl,
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
        
        {/* JSON-LD Schema for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Admissions Topper",
              url: appUrl,
              logo: `${appUrl}/img/at.jpg`,
              description: "Expert admission guidance for Medical, Engineering, Paramedical & UG courses.",
              sameAs: [
                "https://www.facebook.com/admissionstopper",
                "https://www.instagram.com/admissionstopper",
                "https://www.twitter.com/admissionstopper",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              areaServed: ["IN-KA", "IN-KL", "IN-TN"],
            }),
          }}
        />
        
        {/* JSON-LD Schema for WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: appUrl,
              name: "Admissions Topper",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${appUrl}/blog?search={search_term_string}`,
                },
                query_input: "required name=search_term_string",
              },
            }),
          }}
        />
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
