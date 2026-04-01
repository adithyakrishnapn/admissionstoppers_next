import PageHeader from "@/components/ui/PageHeader";
import CourseList, { Course } from "@/components/ui/CourseList";

export const metadata = {
  title: "Diploma Courses | Admissions Topper",
  description: "Explore our hands-on diploma programs focusing on skill development.",
};

export default function DiplomaPage() {
  const courses: Course[] = [
    { title: "Diploma in Mechanical Engineering", duration: "3 Years", degree: "Diploma", image: "/img/course/gear-1674891_1920.png", imageAlt: "Mechanical engineering diploma icon" },
    { title: "Diploma in Computer Science", duration: "3 Years", degree: "Diploma", image: "/img/course/Cse.png", imageAlt: "Computer science diploma icon" },
    { title: "Diploma in Electrical Engineering", duration: "3 Years", degree: "Diploma", image: "/img/course/eee.png", imageAlt: "Electrical engineering diploma icon" },
    { title: "Diploma in Civil Engineering", duration: "3 Years", degree: "Diploma", image: "/img/course/graduation-6840941_1920.png", imageAlt: "Civil engineering diploma illustration" },
    { title: "Diploma in Electronics & Communication", duration: "3 Years", degree: "Diploma", image: "/img/course/ece.png", imageAlt: "Electronics and communication diploma icon" },
    { title: "Diploma in Pharmacy", duration: "2 Years", degree: "Diploma", image: "/img/course/drug-1674890_1920.png", imageAlt: "Diploma in pharmacy icon" },
  ];

  return (
    <>
      <PageHeader title="Diploma Courses" breadcrumb="Diploma" image="/img/Diplomaed.jpg" />
      <div className="bg-gray-50 py-12 text-center">
        <h2 className="text-primary font-semibold tracking-wider uppercase mb-2 inline-block border-b-2 border-primary pb-1">Our Programs</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-secondary">Skill-Driven Education</h3>
      </div>
      <CourseList courses={courses} />
    </>
  );
}
