"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide preloader when page finishes loading
    const handleLoad = () => {
      setIsLoading(false);
    };

    // Check if page is already loaded (for cached pages)
    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#181d38] to-[#0f1218]">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Logo and loader */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6">
        {/* Logo */}
        <div className="relative w-20 h-20 animate-bounce">
          <Image
            src="/img/at.jpg"
            alt="Admissions Topper"
            fill
            className="object-contain rounded-lg"
            priority
          />
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Admissions Topper</h1>
          <p className="text-gray-400 text-sm">Loading your dashboard...</p>
        </div>

        {/* Animated loader bars */}
        <div className="flex items-center justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-primary to-accent rounded-full"
              style={{
                height: "24px",
                animation: "loading 1.4s infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0%,
          60%,
          100% {
            height: 24px;
            opacity: 0.7;
          }
          30% {
            height: 40px;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
