"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/components/admin/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Home, FileText, LayoutDashboard, Menu, X } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }

    if (!loading && user && !isAdmin) {
      router.push("/admin/login");
    }
  }, [user, loading, isAdmin, router]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed md:relative md:translate-x-0 w-[84%] max-w-72 md:w-64 h-screen bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 z-50 md:z-auto`}>
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-primary">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <LayoutDashboard size={20} className="text-gray-400" /> Dashboard
          </Link>
          <Link href="/admin/dashboard/blogs" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <FileText size={20} className="text-gray-400" /> Manage Blogs
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 w-full rounded-lg font-medium transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-4 md:px-8">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-700"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
           <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 truncate">Welcome, Admin</h1>
           <Link href="/" className="text-xs sm:text-sm font-medium text-primary hover:underline flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
             <Home size={15} />
             <span className="hidden sm:inline">View Site</span>
           </Link>
        </header>
        <div className="p-4 md:p-8 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
