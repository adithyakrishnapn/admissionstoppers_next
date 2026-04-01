import CourseCategories from "@/components/home/CourseCategories";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Courses | Admissions Topper",
  description: "Browse our diverse range of engineering, medical, diploma, and UG courses.",
};

export default function CoursesPage() {
  return (
    <>
      <PageHeader title="Our Courses" breadcrumb="Courses" image="/img/carousel-2.jpg" />
      <CourseCategories />
    </>
  );
}
