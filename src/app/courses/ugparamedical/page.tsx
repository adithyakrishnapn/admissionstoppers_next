import PageHeader from "@/components/ui/PageHeader";
import CourseList, { Course } from "@/components/ui/CourseList";

export const metadata = {
  title: "UG Paramedical Courses | Admissions Topper",
  description: "Explore paramedical science programs including B.Sc Nursing, Optometry, and Physiotherapy.",
};

export default function ParamedicalPage() {
  const courses: Course[] = [
    { title: "BHA (Bachelor in Hospital Administration)", duration: "3 Years", degree: "Undergraduate", image: "/img/course/ugpara/hand-drawn-hospital-reception-scene-with-people-wearing-medical-masks_23-2148825394.jpg", imageAlt: "Hospital administration course illustration" },
    { title: "BPH (Bachelor in Public Health)", duration: "3 Years", degree: "Undergraduate", image: "/img/course/ugpara/flat-new-normal-hotels-with-people_23-2148933886.jpg", imageAlt: "Public health course illustration" },
    { title: "B-Pharm (Bachelor of Pharmacy)", duration: "4 Years", degree: "Undergraduate", image: "/img/course/ugpara/pharmacist_23-2148181041.jpg", imageAlt: "Pharmacy course illustration" },
    { title: "BASLP (Audiology and Speech Language Pathology)", duration: "4 Years", degree: "Undergraduate", image: "/img/course/ugpara/speech-therapy-illustration-hand-drawn-style-with-people-talking-with-psychologist_23-2149199484.jpg", imageAlt: "Speech therapy course illustration" },
    { title: "BPT (Bachelor of Physiotherapy)", duration: "4.5 Years", degree: "Undergraduate", image: "/img/course/ugpara/hand-drawn-flat-design-occupational-therapy-illustration_23-2149383354.jpg", imageAlt: "Physiotherapy course illustration" },
    { title: "BSc Nursing", duration: "4 Years", degree: "Undergraduate", image: "/img/course/ugpara/nurse-putting-injection-concept-illustration_114360-17773.jpg", imageAlt: "Nursing course illustration" },
    { title: "BSc Medical Laboratory Technology (MLT)", duration: "4 Years", degree: "Undergraduate", image: "/img/course/ugpara/scientist-work-profession-isometric-banner_1284-8410.jpg", imageAlt: "Medical lab technology course illustration" },
    { title: "BSc Anesthesia Technology", duration: "4 Years", degree: "Undergraduate", image: "/img/course/ugpara/surgery-anesthesia-concept-illustration_114360-22252.jpg", imageAlt: "Anesthesia technology course illustration" },
  ];

  return (
    <>
      <PageHeader title="UG Paramedical Courses" breadcrumb="Paramedical" image="/img/paramedical-science.jpg" />
      <div className="bg-gray-50 py-12 text-center">
        <h2 className="text-primary font-semibold tracking-wider uppercase mb-2 inline-block border-b-2 border-primary pb-1">Our Programs</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-secondary">Frontline Healthcare Careers</h3>
      </div>
      <CourseList courses={courses} />
    </>
  );
}
