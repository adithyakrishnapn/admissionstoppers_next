import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CourseCategories() {
  const categories = [
    {
      title: "Engineering",
      href: "/courses/engineering",
      image: "/img/engineering.jpg",
      className: "col-span-12 md:col-span-12 lg:col-span-12 h-64 md:h-[400px]",
    },
    {
      title: "UG ParaMedical",
      href: "/courses/ugparamedical",
      image: "/img/paramedical-science.jpg",
      className: "col-span-12 md:col-span-6 h-64 md:h-[300px]",
    },
    {
      title: "Diploma",
      href: "/courses/diploma",
      image: "/img/Diplomaed.jpg",
      className: "col-span-12 md:col-span-6 h-64 md:h-[300px]",
    },
  ];

  const sideCategories = [
    {
      title: "UG Courses",
      href: "/courses/ug",
      image: "/img/cat-4.jpg",
      className: "h-[350px] mb-6",
    },
    {
      title: "Medical",
      href: "/courses/medical",
      image: "/img/medical.jpg",
      className: "h-[350px]",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h6 className="text-primary font-semibold tracking-wider uppercase mb-2 inline-block relative border-b-2 border-primary pb-1">Categories</h6>
          <h2 className="text-3xl md:text-5xl font-bold text-secondary">Courses Categories</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Main Grid Zone */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-6">
            {categories.map((cat, i) => (
              <Link 
                key={i} href={cat.href}
                className={`group relative overflow-hidden rounded-2xl ${cat.className} block border border-gray-100/50 shadow-sm`}
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-6 right-6 bg-white py-3 px-6 rounded-xl flex items-center justify-between min-w-[160px] transform group-hover:-translate-y-2 transition-transform duration-300 shadow-xl">
                  <h5 className="font-bold text-secondary">{cat.title}</h5>
                  <ArrowUpRight className="text-primary h-5 w-5 opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>

          {/* Side Stack Zone */}
          <div className="lg:col-span-5 flex flex-col h-full">
            {sideCategories.map((cat, i) => (
              <Link 
                key={i} href={cat.href}
                className={`group relative overflow-hidden rounded-2xl w-full block border border-gray-100/50 shadow-sm flex-1 ${cat.className}`}
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-6 right-6 bg-white py-3 px-6 rounded-xl flex items-center justify-between min-w-[160px] transform group-hover:-translate-y-2 transition-transform duration-300 shadow-xl">
                  <h5 className="font-bold text-secondary">{cat.title}</h5>
                  <ArrowUpRight className="text-primary h-5 w-5 opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
