import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Admissions Topper | Get Admission Support",
  description:
    "Contact Admissions Topper for admission guidance, counselling support, and course selection help from our expert team.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
