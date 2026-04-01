"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/admin/AuthProvider";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/admin/dashboard");
    }
  }, [user, authLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    
    setLoading(true);
    setError("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#181d38] p-4">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2">Admin Portal</h1>
          <p className="text-gray-500">Sign in to manage your website</p>
        </div>
        
        {error && (
          <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900" 
                placeholder="admin@admissionstopper.com" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900" 
                placeholder="••••••••" 
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 px-6 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-all transform active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 mt-2 shadow-lg shadow-primary/30"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Sign In <ArrowRight size={18} /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
