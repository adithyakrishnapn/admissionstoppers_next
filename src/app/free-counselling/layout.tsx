import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Admission Counselling | Admissions Topper",
  description:
    "Book a free counselling session to get personalized guidance on course selection, college options, and admission procedures.",
  alternates: {
    canonical: "/free-counselling",
  },
};

export default function FreeCounsellingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
