"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

export default function FirstTimePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", place: "", interestedCourse: "" });

  useEffect(() => {
    // Check local storage to see if user has already seen the popup or submitted
    const hasSeenPopup = localStorage.getItem("admissionsTopper_firstVisit");
    
    if (!hasSeenPopup) {
      // Delay showing the popup to not overwhelm the user immediately
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("admissionsTopper_firstVisit", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          place: formData.place,
          course: formData.interestedCourse,
          subject: `New Lead: ${formData.name}`,
          message: `Interested Course: ${formData.interestedCourse}`,
          source: "First Time Popup",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit popup lead");
      }

      setStatus("success");
      setTimeout(() => {
        handleClose();
      }, 2500);
    } catch (error) {
      console.error("Error saving lead:", error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md z-10"
          >
            {/* Visual Header */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 pb-8 text-center text-white relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-2xl font-bold mb-2 tracking-tight">Welcome to Admissions Topper</h3>
              <p className="text-primary-foreground/90 font-light text-sm text-blue-50">
                Unlock expert guidance for your academic journey. Let us help you secure your future.
              </p>
            </div>

            {/* Content / Form */}
            <div className="p-8 pb-10 -mt-6 bg-white rounded-t-[2rem] relative">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h4>
                  <p className="text-gray-500">We've received your details and will get in touch shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                      placeholder="+91 0000 000000"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="place" className="block text-sm font-medium text-gray-700 mb-1">Place</label>
                    <input
                      type="text"
                      id="place"
                      name="place"
                      required
                      value={formData.place}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                      placeholder="Your city or town"
                    />
                  </div>
                  <div>
                    <label htmlFor="interestedCourse" className="block text-sm font-medium text-gray-700 mb-1">Interested Course</label>
                    <select
                      id="interestedCourse"
                      name="interestedCourse"
                      required
                      value={formData.interestedCourse}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    >
                      <option value="" disabled>Select a course</option>
                      <option value="Medical">Medical</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Paramedical">Paramedical</option>
                      <option value="UG">Undergraduate (UG)</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  {status === "error" && (
                    <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 shadow-lg hover:shadow-primary/30"
                  >
                    {status === "submitting" ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Get Free Guidance <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
