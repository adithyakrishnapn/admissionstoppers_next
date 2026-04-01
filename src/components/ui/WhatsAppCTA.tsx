"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function WhatsAppCTA() {
  const whatsappNumber = "918848046116"; // from existing site
  const message = encodeURIComponent("Hello! I am interested in admission details.");

  return (
    <Link
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center justify-center relative hover:shadow-xl transition-shadow"
      >
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        <MessageCircle className="w-8 h-8" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 bg-white text-gray-800 text-sm py-2 px-4 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with us!
          <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white"></div>
        </div>
      </motion.div>
    </Link>
  );
}
