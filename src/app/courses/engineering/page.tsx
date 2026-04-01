import PageHeader from "@/components/ui/PageHeader";
import CourseList, { Course } from "@/components/ui/CourseList";

export const metadata = {
  title: "Engineering Courses | Admissions Topper",
  description: "Explore our top engineering programs including CSE, AI, Mechanical, ECE, EEE, and IT.",
};

export default function EngineeringPage() {
  const courses: Course[] = [
    { title: "Mechanical Engineering", duration: "4 Year", degree: "B.Tech/BE", image: "/img/course/gear-1674891_1920.png" },
    { title: "Computer Science Engineering", duration: "4 Year", degree: "B.Tech/BE", image: "/img/course/Cse.png" },
    { title: "Electronics And Communication", duration: "4 Year", degree: "B.Tech/BE", image: "/img/course/ece.png" },
    { title: "Electrical And Electronics Engineering", duration: "4 Year", degree: "B.Tech/BE", image: "/img/course/eee.png" },
    { title: "Information Technology", duration: "4 Year", degree: "B.Tech/BE", image: "/img/course/It.png" },
    { title: "Artificial Intelligence Engineering", duration: "4 Year", degree: "B.Tech/BE", image: "/img/course/Ai.png" },
  ];

  return (
    <>
      <PageHeader title="Engineering Courses" breadcrumb="Engineering" image="/img/engineering.jpg" />
      <div className="bg-gray-50 py-12 text-center">
        <h2 className="text-primary font-semibold tracking-wider uppercase mb-2 inline-block border-b-2 border-primary pb-1">Our Programs</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-secondary">Discover Engineering Excellence</h3>
      </div>
      <CourseList courses={courses} />
    </>
  );
}
