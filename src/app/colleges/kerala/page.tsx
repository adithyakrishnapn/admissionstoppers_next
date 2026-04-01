import PageHeader from "@/components/ui/PageHeader";
import CollegeList, { College } from "@/components/ui/CollegeList";

export const metadata = {
  title: "Kerala Colleges | Admissions Topper",
  description: "Top reputed colleges and universities in Kerala.",
};

export default function KeralaCollegesPage() {
  const colleges: College[] = [
    { name: "AL AZHAR GROUP OF INSTITUTIONS", affiliation: "Kerala Based Multi-Disciplinary Campus", image: "/img/college/al azhar.jpeg" },
    { name: "AL SHIFA COLLEGE", affiliation: "Healthcare and Allied Programs", image: "/img/college/al shifa.jpeg" },
    { name: "YELDO MAR BASELIOS COLLEGE", affiliation: "Kerala University Affiliated", image: "/img/college/yeldo marbaselious.jpg" },
    { name: "ELIMS COLLEGE", affiliation: "Nursing and Paramedical Focus", image: "/img/college/elims.jpeg" },
    { name: "KMM COLLEGE", affiliation: "NAAC Accredited Programs", image: "/img/college/kmm.jpg" },
  ];

  return (
    <>
      <PageHeader title="Kerala Colleges" breadcrumb="Kerala" image="/img/college/al shifa.jpeg" />
      <div className="bg-gray-50 py-12 text-center">
        <h2 className="text-primary font-semibold tracking-wider uppercase mb-2 inline-block border-b-2 border-primary pb-1">Discover</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-secondary">Premier Institutions in Kerala</h3>
      </div>
      <CollegeList colleges={colleges} />
    </>
  );
}
