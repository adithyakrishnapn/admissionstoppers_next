import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Award } from "lucide-react";

export interface Course {
  title: string;
  image: string;
  imageAlt?: string;
  duration?: string;
  degree?: string;
}

export default function CourseList({ courses }: { courses: Course[] }) {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden flex items-center justify-center bg-gray-50/50 p-6">
                <Image 
                  src={course.image} 
                  alt={course.imageAlt || course.title} 
                  width={150}
                  height={150}
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-4 line-clamp-2 min-h-[56px]">{course.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6 font-light">
                  {course.duration && (
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-primary" />
                      {course.duration}
                    </div>
                  )}
                  {course.degree && (
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-primary" />
                      {course.degree}
                    </div>
                  )}
                </div>
                <Link href="/free-counselling" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-50 text-secondary hover:bg-primary hover:text-white transition-colors font-medium relative overflow-hidden group/btn">
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
