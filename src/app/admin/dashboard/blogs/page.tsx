"use client";

import { useEffect, useState } from "react";
import { collection, deleteDoc, getDocs, limit, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

type AdminBlog = {
  id: string;
  title: string;
  slug: string;
  createdAt?: string;
};

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<AdminBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const res = await fetch("/api/blogs", { cache: "no-store" });
      const data = await res.json();
      setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const user = auth?.currentUser;
      if (!user) {
        throw new Error("You must be logged in as admin");
      }

      if (!db) {
        throw new Error("Database is not configured");
      }

      const blogQuery = query(collection(db, "blogs"), where("slug", "==", slug), limit(1));
      const blogSnap = await getDocs(blogQuery);
      if (blogSnap.empty) {
        throw new Error("Blog not found");
      }

      await deleteDoc(blogSnap.docs[0].ref);

      setBlogs(blogs.filter((b) => b.slug !== slug));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Manage Blogs</h1>
        <Link href="/admin/dashboard/blogs/new" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <Plus size={18} /> New Blog Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading blogs...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {blogs.length > 0 ? blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 border-l-4 border-transparent hover:border-primary">{blog.title}</td>
                    <td className="px-6 py-4">{blog.slug}</td>
                    <td className="px-6 py-4">{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Recently added"}</td>
                    <td className="px-6 py-4 flex gap-3 justify-end">
                       <Link href={`/admin/dashboard/blogs/${blog.slug}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit blog">
                         <Edit size={18} />
                       </Link>
                       <button onClick={() => handleDelete(blog.slug)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                         <Trash2 size={18} />
                       </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      No blog posts found. Create your first one to boost your SEO!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
