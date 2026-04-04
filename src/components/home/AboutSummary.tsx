import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function AboutSummary() {
  const points = [
    "Simplified Admissions",
    "Quick Booking",
    "Transparent Process",
    "24/7 Support",
    "Trusted Network",
    "Seamless Experience"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Side */}
          <Reveal y={34}>
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl group animate-soft-float-slow">
              <div className="absolute inset-0 bg-primary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <Image 
                src="/img/about.jpg" 
                alt="About Admissions Topper" 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
            </div>
          </Reveal>

          {/* Content Side */}
          <Reveal delay={0.06} y={28}>
            <div>
              <h6 className="text-primary font-semibold tracking-wider uppercase mb-2 inline-block relative border-b-2 border-primary pb-1">About Us</h6>
              <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6 leading-tight">Welcome to Admissions Topper</h2>
              
              <p className="text-gray-600 mb-4 font-light leading-relaxed">
                At Admissions Topper, we stand as a beacon of guidance and accomplishment in the realm of educational consultancy.
              </p>
              <p className="text-gray-600 mb-8 font-light leading-relaxed">
                By seamlessly navigating the complex landscape of college admissions, we have not only facilitated access to top-tier educational institutions but also played a pivotal role in shaping the futures of those under our guidance. We take immense pride in the stories of achievement.
              </p>

              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-10">
                {points.map((point, index) => (
                  <div key={point} className="flex items-center text-secondary font-medium group animate-fade-up" style={{ animationDelay: `${index * 70}ms` }}>
                    <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center mr-3 group-hover:bg-primary transition-colors">
                      <ArrowRight size={14} className="text-primary group-hover:text-white transition-colors" />
                    </span>
                    {point}
                  </div>
                ))}
              </div>

              <Link href="/about" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-primary/30">
                Read More <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
