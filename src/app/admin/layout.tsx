import { AuthProvider } from "@/components/admin/AuthProvider";

export const metadata = {
  title: "Admin Panel | Admissions Topper",
  robots: { index: false, follow: false }
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
