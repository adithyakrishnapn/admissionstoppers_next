import PageHeader from "@/components/ui/PageHeader";
import CollegeList, { College } from "@/components/ui/CollegeList";

export const metadata = {
  title: "Mangalore Colleges | Admissions Topper",
  description: "Top reputed colleges and universities in Mangalore.",
};

export default function MangaloreCollegesPage() {
  const colleges: College[] = [
    { name: "AJ GROUP OF COLLEGES", affiliation: "NAAC Accredited", image: "/img/college/AJ.png" },
    { name: "CITY COLLEGE", affiliation: "INC Approved", image: "/img/college/city.png" },
    { name: "MASOOD COLLEGE OF NURSING", affiliation: "INC & KNC Approved", image: "/img/college/masood.png" },
    { name: "INDIRA COLLEGE", affiliation: "Mangalore", image: "/img/college/indira.png" },
    { name: "YENEPOYA", affiliation: "Deemed to be University", image: "/img/college/yen.png" },
    { name: "MILAGRES COLLEGE", affiliation: "Affiliated to Mangalore University", image: "/img/college/milagres.png" },
    { name: "MANGALORE INSTITUTE OF TECHNOLOGY", affiliation: "AICTE Approved", image: "/img/college/mit.png" },
    { name: "SAHAYADRI COLLEGE", affiliation: "AICTE New Delhi Approved", image: "/img/college/sah.png" },
  ];

  return (
    <>
      <PageHeader title="Mangalore Colleges" breadcrumb="Mangalore" image="/img/college/AJ.png" />
      <div className="bg-gray-50 py-12 text-center">
        <h2 className="text-primary font-semibold tracking-wider uppercase mb-2 inline-block border-b-2 border-primary pb-1">Discover</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-secondary">Premier Institutions in Mangalore</h3>
      </div>
      <CollegeList colleges={colleges} />
    </>
  );
}
