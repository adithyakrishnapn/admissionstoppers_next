import HeroCarousel from "@/components/home/HeroCarousel";
import Features from "@/components/home/Features";
import AboutSummary from "@/components/home/AboutSummary";
import CourseCategories from "@/components/home/CourseCategories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Admission Guidance for Medical, Engineering and UG Courses | Admissions Topper",
  description:
    "Get expert admission guidance for Medical, Engineering, Paramedical and UG courses across top colleges in Bangalore, Kerala, Tamil Nadu and Mangalore.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <Features />
      <AboutSummary />
      <CourseCategories />
    </>
  );
}
