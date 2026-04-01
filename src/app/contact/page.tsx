"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <>
      <PageHeader title="Contact Us" breadcrumb="Contact" image="/img/carousel-1.jpg" />

      {/* Contact Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h6 className="text-primary font-semibold tracking-wider uppercase mb-2 inline-block relative border-b-2 border-primary pb-1">Contact Us</h6>
            <h2 className="text-3xl md:text-5xl font-bold text-secondary">Get In Touch With Us</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-secondary mb-2">Our Office</h4>
                  <p className="text-gray-600 font-light">Near Mathrabumi Edappal Bureau, Edappal, Malapuram</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-secondary mb-2">Call Us</h4>
                  <p className="text-gray-600 font-light">+91 88480 46116</p>
                  <p className="text-gray-600 font-light">+91 79942 28008</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-secondary mb-2">Email Us</h4>
                  <p className="text-gray-600 font-light break-all">admissionstopper.edu@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                {status === "success" ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <Send className="w-10 h-10 text-green-500 ml-1" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-500">Thank you for reaching out. We will get back to you shortly.</p>
                    <button onClick={() => setStatus("idle")} className="mt-8 text-primary hover:underline">Send another message</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input type="text" name="subject" required value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400" placeholder="How can we help you?" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea name="message" required value={formData.message} onChange={handleChange} rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400 resize-none" placeholder="Write your message here..."></textarea>
                    </div>
                    
                    <button type="submit" disabled={status === "submitting"} className="w-full py-4 px-6 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-all transform active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 mt-4 shadow-lg shadow-primary/30">
                      {status === "submitting" ? (
                        <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>Send Message <Send size={18} /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
