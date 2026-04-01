"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { collection, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type BlogFormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
};

const initialState: BlogFormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image: "/img/carousel-1.jpg",
};

export default function EditBlogPage() {
  const params = useParams<{ slug: string }>();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<BlogFormState>(initialState);

  useEffect(() => {
    async function fetchBlog() {
      if (!slug) {
        setError("Invalid blog slug.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/blogs/${slug}`, { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Failed to load blog");
        }

        const data = await res.json();
        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          image: data.image || "/img/carousel-1.jpg",
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load blog post");
        router.push("/admin/dashboard/blogs");
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [slug, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      if (!slug) {
        throw new Error("Invalid blog slug");
      }

      const user = auth?.currentUser;
      if (!user) {
        throw new Error("You must be logged in as admin");
      }

      if (!db) {
        throw new Error("Database is not configured");
      }

      const existingQuery = query(
        collection(db, "blogs"),
        where("slug", "==", slug),
        limit(1)
      );
      const existingSnap = await getDocs(existingQuery);
      if (existingSnap.empty) {
        throw new Error("Blog not found");
      }

      const updatedPayload = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        image: formData.image.trim(),
        updatedAt: new Date().toISOString(),
      };

      if (formData.slug.trim() !== slug) {
        const duplicateSlugQuery = query(
          collection(db, "blogs"),
          where("slug", "==", formData.slug.trim()),
          limit(1)
        );
        const duplicateSlugSnap = await getDocs(duplicateSlugQuery);
        if (!duplicateSlugSnap.empty) {
          throw new Error("A blog with this slug already exists. Please change the slug.");
        }
      }

      await updateDoc(existingSnap.docs[0].ref, updatedPayload);

      router.push("/admin/dashboard/blogs");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update blog post";
      console.error("Failed to update blog post", err);
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-gray-500">Loading blog...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard/blogs" className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Edit Blog Post</h1>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 max-w-4xl">
        {error && (
          <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
            <p className="font-medium">Error:</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
              <input
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL Slug</label>
              <input
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL</label>
            <input
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none text-gray-900"
              placeholder="/img/carousel-1.jpg or https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Short Excerpt (SEO Description)</label>
            <textarea
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none resize-none text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Content (HTML Supported)</label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={10}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none font-mono text-sm text-gray-900"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium flex items-center gap-2"
            >
              {saving ? "Saving..." : <><Save size={18} /> Update Post</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
