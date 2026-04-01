import PageHeader from "@/components/ui/PageHeader";
import CollegeList, { College } from "@/components/ui/CollegeList";

export const metadata = {
  title: "Tamil Nadu Colleges | Admissions Topper",
  description: "Top reputed colleges and universities in Tamil Nadu.",
};

export default function TamilnaduCollegesPage() {
  const colleges: College[] = [
    { name: "SRM INSTITUTE OF SCIENCE AND TECHNOLOGY", affiliation: "Deemed University", image: "/img/college/srm.jpeg" },
    { name: "SRI SATHYA COLLEGE", affiliation: "Tamil Nadu State Affiliated", image: "/img/college/sri sathya.jpeg" },
    { name: "HINDUSTAN COLLEGE", affiliation: "Approved Professional Programs", image: "/img/college/hindustan.jpeg" },
    { name: "EXCEL GROUP OF INSTITUTIONS", affiliation: "Engineering and Allied Courses", image: "/img/college/excel group.jpeg" },
    { name: "KRUPANIDHI GROUP", affiliation: "Multi-Campus Exposure", image: "/img/college/krupanidhi.jpeg" },
  ];

  return (
    <>
      <PageHeader title="Tamil Nadu Colleges" breadcrumb="Tamil Nadu" image="/img/college/srm.jpeg" />
      <div className="bg-gray-50 py-12 text-center">
        <h2 className="text-primary font-semibold tracking-wider uppercase mb-2 inline-block border-b-2 border-primary pb-1">Discover</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-secondary">Premier Institutions in Tamil Nadu</h3>
      </div>
      <CollegeList colleges={colleges} />
    </>
  );
}
