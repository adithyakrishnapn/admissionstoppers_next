"use client";

import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";

// Remove metadata since it's a client component now

export default function CollegesPage() {
  const regions = [
    { name: "Bangalore", image: "/img/college/yenepoya-Bangalore.jpg", path: "/colleges/bangalore", desc: "Hub of technology and premium education." },
    { name: "Kerala", image: "/img/college/al shifa.jpeg", path: "/colleges/kerala", desc: "God's own country with renowned nursing and medical institutions." },
    { name: "Tamil Nadu", image: "/img/college/srm.jpeg", path: "/colleges/tamilnadu", desc: "Home to some of the oldest and most prestigious universities." },
    { name: "Mangalore", image: "/img/college/AJ.png", path: "/colleges/mangalore", desc: "Leading destination for healthcare, nursing, and technical education." },
  ];

  return (
    <>
      <PageHeader title="Top Colleges by Region" breadcrumb="Colleges" image="/img/college/yenepoya-Bangalore.jpg" />
      
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h6 className="text-primary font-semibold tracking-wider uppercase mb-2 inline-block relative border-b-2 border-primary pb-1">Destinations</h6>
            <h2 className="text-3xl md:text-5xl font-bold text-secondary">Explore Our Network</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {regions.map((region) => (
              <div key={region.name} className="bg-white rounded-2xl overflow-hidden shadow-sm group hover:-translate-y-2 transition-transform duration-300">
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <Image 
                    src={region.image} 
                    alt={region.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.src = "/img/carousel-1.jpg"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181d38] to-transparent opacity-80" />
                  <h3 className="absolute bottom-6 left-6 text-3xl font-bold text-white flex items-center gap-2">
                    <MapPin className="text-primary" /> {region.name}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 font-light mb-6">{region.desc}</p>
                  <Link href={region.path} className="flex items-center gap-2 text-primary font-medium group-hover:underline">
                    View Colleges <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
