"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/img/carousel-1.jpg",
    title: "Admissions Topper",
    description: "Where Your Academic Ascent Begins, Ensuring Your Path to Success Is Secure.",
    cta1: { text: "Read More", link: "/about" },
    cta2: { text: "Join Now", link: "/colleges" },
  },
  {
    image: "/img/carousel-2.jpg",
    title: "Your Gateway to Hassle-Free Admissions!",
    description: "Effortless admission booking with a seamless, user-friendly experience.",
    cta1: { text: "Read More", link: "/about" },
    cta2: { text: "Join Now", link: "/free-counselling" },
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slides[current].image}')` }}
          />
          <div className="absolute inset-0 bg-[#181d38]/70 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <motion.h1 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                >
                  {slides[current].title}
                </motion.h1>
                <motion.p 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-lg md:text-2xl text-white/90 mb-10 font-light"
                >
                  {slides[current].description}
                </motion.p>
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link href={slides[current].cta1.link} className="bg-primary hover:bg-white hover:text-primary text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg">
                    {slides[current].cta1.text}
                  </Link>
                  <Link href={slides[current].cta2.link} className="bg-white/20 hover:bg-white text-white hover:text-[#181d38] backdrop-blur-sm border border-white/30 px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg">
                    {slides[current].cta2.text}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 bg-black/20 backdrop-blur flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all z-10 hidden md:flex">
        <ChevronLeft size={24} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 bg-black/20 backdrop-blur flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all z-10 hidden md:flex">
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
