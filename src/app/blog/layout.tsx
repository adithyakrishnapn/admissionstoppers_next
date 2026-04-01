import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admission Tips, Career Guidance and College Insights | Admissions Topper Blog",
  description:
    "Read the latest admission updates, expert counselling tips, and college insights to choose the right course and campus.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
