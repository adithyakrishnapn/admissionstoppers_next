import PageHeader from "@/components/ui/PageHeader";
import CourseList, { Course } from "@/components/ui/CourseList";

export const metadata = {
  title: "UG Courses | Admissions Topper",
  description: "Explore our comprehensive undergraduate degrees including BCA, BBA, B.Com, and B.A.",
};

export default function UGPage() {
  const courses: Course[] = [
    { title: "BBA / BCom Aviation and Logistics", duration: "3 Years", degree: "Undergraduate", image: "/img/course/ugcourse/1.jpeg", imageAlt: "Aviation and logistics undergraduate course" },
    { title: "BBA Business Analysis and Entrepreneurship", duration: "3 Years", degree: "Undergraduate", image: "/img/course/ugcourse/2.jpg", imageAlt: "Business analysis undergraduate course" },
    { title: "BCom Finance, Taxation and Auditing", duration: "3 Years", degree: "Undergraduate", image: "/img/course/ugcourse/finance.jpeg", imageAlt: "Finance and taxation undergraduate course" },
    { title: "BCom ACCA", duration: "3 Years", degree: "Undergraduate", image: "/img/course/ugcourse/4.jpeg", imageAlt: "BCom ACCA undergraduate course" },
    { title: "BCom CMA (Certified Management Accountant)", duration: "3 Years", degree: "Undergraduate", image: "/img/course/ugcourse/5.jpg", imageAlt: "BCom CMA undergraduate course" },
    { title: "BSc/BCA Cyber Forensics and Data Analytics", duration: "3 Years", degree: "Undergraduate", image: "/img/course/ugcourse/6.jpg", imageAlt: "Cyber forensics undergraduate course" },
    { title: "BCA Big Data Analytics and Cloud Computing", duration: "3 Years", degree: "Undergraduate", image: "/img/course/ugcourse/7.jpg", imageAlt: "Big data analytics undergraduate course" },
    { title: "BCA Artificial Intelligence and Machine Learning", duration: "3 Years", degree: "Undergraduate", image: "/img/course/ugcourse/8.jpg", imageAlt: "AI and ML undergraduate course" },
  ];

  return (
    <>
      <PageHeader title="UG Courses" breadcrumb="UG Programs" image="/img/cat-4.jpg" />
      <div className="bg-gray-50 py-12 text-center">
        <h2 className="text-primary font-semibold tracking-wider uppercase mb-2 inline-block border-b-2 border-primary pb-1">Our Programs</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-secondary">Diverse Undergrad Pathways</h3>
      </div>
      <CourseList courses={courses} />
    </>
  );
}
