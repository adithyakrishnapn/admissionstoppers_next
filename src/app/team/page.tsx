import PageHeader from "@/components/ui/PageHeader";
import { Mail, Linkedin, ExternalLink } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  email?: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Aditya Krishna",
    role: "Founder & Director",
    bio: "Education counselor with 10+ years of experience in admission guidance for medical, engineering, and paramedical courses.",
    image: "/img/team/founder.jpg",
    email: "adithyakrishnapn@gmail.com",
    linkedin: "#",
  },
  {
    name: "Team Member 2",
    role: "Senior Counselor",
    bio: "Expert in medical admissions with proven track record of successful student placements in top institutions.",
    image: "/img/team/counselor1.jpg",
    email: "counselor1@admissionstopper.com",
    linkedin: "#",
  },
  {
    name: "Team Member 3",
    role: "Engineering Specialist",
    bio: "Specializes in engineering admissions guidance with in-depth knowledge of branch selection and career prospects.",
    image: "/img/team/counselor2.jpg",
    email: "counselor2@admissionstopper.com",
    linkedin: "#",
  },
  {
    name: "Team Member 4",
    role: "Paramedical Counselor",
    bio: "Focused on paramedical and nursing admissions with comprehensive understanding of the healthcare education sector.",
    image: "/img/team/counselor3.jpg",
    email: "counselor3@admissionstopper.com",
    linkedin: "#",
  },
];

export const metadata = {
  title: "Our Team | Admissions Topper",
  description: "Meet our expert admission counselors dedicated to helping you achieve your educational dreams across medical, engineering, and paramedical courses.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader title="Our Expert Team" breadcrumb="Team" image="/img/college/yenepoya-Bangalore.jpg" />
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-primary font-semibold tracking-wider uppercase mb-2 inline-block border-b-2 border-primary pb-1">
            Our People
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Meet Our Experienced Counselors
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our dedicated team of admission experts is committed to guiding you through every step of your academic journey. With years of experience in educational counseling, we help students make informed decisions about their future.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="group rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <div className="flex gap-2">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="p-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg transition-colors"
                          title="Send email"
                        >
                          <Mail size={18} />
                        </a>
                      )}
                      {member.linkedin && member.linkedin !== "#" && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg transition-colors"
                          title="LinkedIn profile"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h4 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-sm text-primary font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 line-clamp-3">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Connect with our expert counselors today and get personalized guidance for your admission process.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Schedule a Consultation
          </a>
        </div>
      </div>
    </>
  );
}
