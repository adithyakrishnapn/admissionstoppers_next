import AboutSummary from "@/components/home/AboutSummary";
import Features from "@/components/home/Features";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "About Us | Admissions Topper",
  description: "Learn more about Admissions Topper, a beacon of guidance and accomplishment in the realm of educational consultancy.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About Us" breadcrumb="About" image="/img/carousel-1.jpg" />

      <AboutSummary />

      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div>
                <h6 className="text-primary font-semibold tracking-wider uppercase mb-2 inline-block relative border-b-2 border-primary pb-1">Our Mission & Vision</h6>
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 leading-tight">Shaping Futures With Care</h2>
                <p className="text-gray-600 mb-6 font-light leading-relaxed">
                  Our core mission is to empower students by helping them find the right academic path.
                  No ambition should go unrealized due to barriers in the admission process. 
                  We handle the hurdles so you can focus on building your future.
                </p>
                <div className="bg-white p-6 rounded-2xl border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-secondary mb-2">Why Choose Us?</h4>
                  <p className="text-gray-600 font-light text-sm">
                    With years of experience and a vast network of top-tier colleges and universities across India, our guidance has transformed thousands of student lives. We believe in transparency, commitment, and success.
                  </p>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-8 rounded-2xl shadow-sm text-center transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-4xl font-bold text-primary mb-2">10+</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Years Experience</div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm text-center mt-8 transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-4xl font-bold text-primary mb-2">5K+</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Happy Students</div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm text-center -mt-8 transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-4xl font-bold text-primary mb-2">100+</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Top Colleges</div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm text-center transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Support</div>
                </div>
             </div>
           </div>
        </div>
      </div>

      <Features />
    </>
  );
}
