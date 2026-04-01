import PageHeader from "@/components/ui/PageHeader";
import CourseList, { Course } from "@/components/ui/CourseList";

export const metadata = {
  title: "Medical Courses | Admissions Topper",
  description: "Explore our top medical programs including MBBS, BDS, and specialized degrees.",
};

export default function MedicalPage() {
  const courses: Course[] = [
    { title: "MBBS (Bachelor of Medicine and Bachelor of Surgery)", duration: "5.5 Years", degree: "Undergraduate", image: "/img/course/medical-bag-1674902_1920.png", imageAlt: "MBBS medical bag icon" },
    { title: "BDS (Bachelor of Dental Surgery)", duration: "5 Years", degree: "Undergraduate", image: "/img/course/drug-1674890_1920.png", imageAlt: "BDS dentistry medicine icon" },
    { title: "BAMS (Bachelor of Ayurvedic Medicine)", duration: "5.5 Years", degree: "Undergraduate", image: "/img/course/ayurveda-6600173_1920.png", imageAlt: "BAMS ayurveda icon" },
    { title: "BHMS (Bachelor of Homeopathic Medicine)", duration: "5.5 Years", degree: "Undergraduate", image: "/img/course/hearth-1674896_1920.png", imageAlt: "BHMS healthcare icon" },
    { title: "BNYS (Bachelor of Naturopathy and Yogic Sciences)", duration: "5.5 Years", degree: "Undergraduate", image: "/img/course/nature.png", imageAlt: "BNYS naturopathy icon" },
  ];

  return (
    <>
      <PageHeader title="Medical Courses" breadcrumb="Medical" image="/img/medical.jpg" />
      <div className="bg-gray-50 py-12 text-center">
        <h2 className="text-primary font-semibold tracking-wider uppercase mb-2 inline-block border-b-2 border-primary pb-1">Our Programs</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-secondary">A Legacy of Healthcare Excellence</h3>
      </div>
      <CourseList courses={courses} />
    </>
  );
}
