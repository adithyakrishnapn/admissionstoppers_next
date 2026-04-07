"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { Send, CheckCircle } from "lucide-react";

export default function FreeCounsellingPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error"); // Optional: could add an error state
    }
  };

  return (
    <>
      <PageHeader title="Free Counselling" breadcrumb="Apply" />
      
      <div className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-secondary mb-4">Book Your Free Session</h2>
              <p className="text-gray-600">Fill out your details below and our expert counsellors will contact you shortly to guide your academic future.</p>
            </div>

            {status === "success" ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h3>
                <p className="text-gray-500 mb-8">We will get in touch with you within 24 hours.</p>
                <button onClick={() => setStatus("idle")} className="text-primary hover:underline font-medium">Submit Another Request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="+91 9876543210" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Interested In</label>
                    <select name="course" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white">
                      <option value="">Select a course</option>
                      <option value="engineering">Engineering</option>
                      <option value="medical">Medical / MBBS</option>
                      <option value="paramedical">Paramedical / Nursing</option>
                      <option value="ug">UG Courses (BCA, BBA, B.Com)</option>
                      <option value="diploma">Diploma Courses</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Place</label>
                  <input type="text" name="place" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Your city or town" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Location</label>
                  <select name="location" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white">
                    <option value="">Select a region</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="mangalore">Mangalore</option>
                    <option value="kerala">Kerala</option>
                    <option value="tamilnadu">Tamil Nadu</option>
                    <option value="any">Any / Not Sure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments</label>
                  <textarea name="comments" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none" placeholder="Any specific requirements or queries?"></textarea>
                </div>

                <button type="submit" disabled={status === "submitting"} className="w-full py-4 px-6 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-all transform active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 mt-4 shadow-lg shadow-primary/30">
                  {status === "submitting" ? (
                    <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Submit Application <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
