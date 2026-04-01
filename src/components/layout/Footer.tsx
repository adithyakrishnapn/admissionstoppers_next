import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div>
            <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-6" style={{ backgroundImage: "linear-gradient(to right, var(--color-primary), var(--color-accent))", color: "transparent", WebkitBackgroundClip: "text" }}>
              Admissions Topper
            </h4>
            <p className="text-gray-300 mb-6 font-light leading-relaxed">
              We stand as a beacon of guidance and accomplishment in the realm of educational consultancy. Let us pave the way for your academic success.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61556225844948" className="bg-white/10 p-2.5 rounded-full hover:bg-primary transition-colors hover:scale-110 active:scale-95 duration-200" aria-label="Facebook">
                <i className="fab fa-facebook-f w-5 h-5 flex items-center justify-center text-[20px]"></i>
              </a>
              <a href="https://www.instagram.com/admissions.topper" className="bg-white/10 p-2.5 rounded-full hover:bg-primary transition-colors hover:scale-110 active:scale-95 duration-200" aria-label="Instagram">
                <i className="fab fa-instagram w-5 h-5 flex items-center justify-center text-[20px]"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <div className="flex flex-col space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "Courses", path: "/courses" },
                { name: "Colleges", path: "/colleges" },
                { name: "Blogs", path: "/blog" },
                { name: "Contact Us", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms & Conditions", path: "/terms" },
                { name: "FAQs & Help", path: "/faq" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="text-gray-300 hover:text-primary transition-colors flex items-center group font-light"
                >
                  <ArrowRight size={16} className="text-primary opacity-0 -ml-4 mr-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-300 group">
                <MapPin className="mr-3 text-primary mt-1 shrink-0 group-hover:animate-bounce" size={20} />
                <span className="font-light">
                  Near Mathrabumi Edappal Bureau, <br />
                  Edappal, Malapuram
                </span>
              </li>
              <li className="flex items-center text-gray-300 group">
                <Phone className="mr-3 text-primary group-hover:animate-[spin_1s]" size={20} />
                <span className="font-light whitespace-pre-wrap">+91 88480 46116{"\n"}+91 79942 28008</span>
              </li>
              <li className="flex items-center text-gray-300 group break-words">
                <Mail className="mr-3 text-primary shrink-0" size={20} />
                <a href="mailto:admissionstopper.edu@gmail.com" className="hover:text-primary transition-colors font-light">
                  admissionstopper.edu@gmail.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Office Photo / Logo */}
          <div>
            <h4 className="text-xl font-bold mb-6">Gallery</h4>
            <div className="bg-white/5 p-2 rounded-xl backdrop-blur-sm shadow-xl inline-block hover:shadow-2xl hover:bg-white/10 transition-all duration-300">
              <img 
                src="/img/at.jpg" 
                alt="Admissions Topper Gallery" 
                className="rounded-lg object-cover w-full max-w-[150px] aspect-square"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm font-light">
            &copy; {new Date().getFullYear()} <span className="text-white font-medium">Admissions Topper</span>. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
