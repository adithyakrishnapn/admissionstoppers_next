import PageHeader from "@/components/ui/PageHeader";
import CollegeList, { College } from "@/components/ui/CollegeList";

export const metadata = {
  title: "Bangalore Colleges | Admissions Topper",
  description: "Top reputed colleges and universities in Bangalore.",
};

export default function BangaloreCollegesPage() {
  const colleges: College[] = [
    { name: "YENEPOYA BANGALORE CAMPUS", affiliation: "Deemed to be University", image: "/img/college/yenepoya-Bangalore.jpg" },
    { name: "S VYASA UNIVERSITY", affiliation: "Deemed University", image: "/img/college/S-VYASA-UNIVERSITY.jpg" },
    { name: "ACHARYA INSTITUTIONS", affiliation: "AICTE Approved", image: "/img/college/acharya.jpeg" },
    { name: "KOSHYS GROUP OF INSTITUTIONS", affiliation: "Affiliated to Bangalore North University", image: "/img/college/koshys.jpeg" },
    { name: "KRUPANIDHI DEGREE COLLEGE", affiliation: "NAAC Accredited", image: "/img/college/krupanidhi.jpeg" },
    { name: "RR INSTITUTIONS", affiliation: "AICTE Approved", image: "/img/college/rr institutions.jpeg" },
    { name: "BGS & SJB MEDICAL COLLEGE", affiliation: "NMC Approved", image: "/img/college/bgs & sjb.jpeg" },
    { name: "AKASH MEDICAL COLLEGE", affiliation: "NMC Approved", image: "/img/college/akash.jpeg" },
  ];

  return (
    <>
      <PageHeader title="Bangalore Colleges" breadcrumb="Bangalore" image="/img/college/yenepoya-Bangalore.jpg" />
      <div className="bg-gray-50 py-12 text-center">
        <h2 className="text-primary font-semibold tracking-wider uppercase mb-2 inline-block border-b-2 border-primary pb-1">Discover</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-secondary">Premier Institutions in Bangalore</h3>
      </div>
      <CollegeList colleges={colleges} />
    </>
  );
}
