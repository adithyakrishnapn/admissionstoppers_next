import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Colleges in Bangalore, Kerala, Tamil Nadu and Mangalore | Admissions Topper",
  description:
    "Explore top-ranked colleges by region and find the best-fit campus for medical, engineering, paramedical and UG admissions.",
  alternates: {
    canonical: "/colleges",
  },
};

export default function CollegesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
