"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";

export interface College {
  name: string;
  image: string;
  affiliation?: string;
  location?: string;
}

export default function CollegeList({ colleges }: { colleges: College[] }) {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {colleges.map((college, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image 
                  src={college.image} 
                  alt={college.name} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.currentTarget.src = "/img/carousel-1.jpg"; }}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-secondary mb-3 line-clamp-2" dangerouslySetInnerHTML={{ __html: college.name }} />
                
                <div className="space-y-2 mb-6 flex-grow">
                  {college.affiliation && (
                    <div className="flex items-start gap-2 text-sm text-gray-500">
                      <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: college.affiliation }} />
                    </div>
                  )}
                  {college.location && (
                    <div className="flex items-start gap-2 text-sm text-gray-500">
                      <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{college.location}</span>
                    </div>
                  )}
                </div>

                <Link href="/free-counselling" className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gray-50 text-secondary border border-gray-100 hover:bg-primary hover:text-white hover:border-primary transition-colors font-medium relative group/btn text-sm">
                  Apply Now
                  <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
