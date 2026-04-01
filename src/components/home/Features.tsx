import { GraduationCap, Globe, Home, BookOpen } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: GraduationCap,
      title: "Simplified Process",
      desc: "Navigate the admission process effortlessly with our simplified approach, guiding you through each step for a stress-free experience."
    },
    {
      icon: Globe,
      title: "Explore with Ease",
      desc: "Embark on campus exploration with confidence, as we provide hassle-free tours to discover the ideal educational environment."
    },
    {
      icon: Home,
      title: "Financial Support",
      desc: "Unlock your educational journey with our comprehensive financial support options, ensuring your dreams remain within reach."
    },
    {
      icon: BookOpen,
      title: "Ease Of Learning",
      desc: "Experience a seamless and user-friendly learning process that caters to your needs, making education straightforward and enjoyable."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h6 className="text-primary font-semibold tracking-wider uppercase mb-2 inline-block relative border-b-2 border-primary pb-1">Why Us?</h6>
          <h2 className="text-3xl md:text-5xl font-bold text-secondary">Why Choose Admissions Topper</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i}
              className="group bg-white rounded-2xl p-8 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                <feature.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-secondary">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
