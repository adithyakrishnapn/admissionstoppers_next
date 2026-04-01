"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "@/lib/firebase";
import { onIdTokenChanged, User } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const adminAllowlist = useMemo(
    () =>
      (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
        .split(",")
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean),
    []
  );

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onIdTokenChanged(auth, async (nextUser) => {
      setUser(nextUser);

      if (!nextUser) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const tokenResult = await nextUser.getIdTokenResult();
        const byClaim = tokenResult.claims.admin === true;
        const byEmail = adminAllowlist.includes((nextUser.email || "").toLowerCase());
        setIsAdmin(byClaim || byEmail);
      } catch (error) {
        console.error("Failed to evaluate admin status", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, pathname, adminAllowlist]);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
