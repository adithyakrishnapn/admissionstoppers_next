"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";

function isRemoteImage(src?: string) {
  return !!src && /^https?:\/\//i.test(src);
}

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs", { cache: "no-store" });
        const data = await res.json();
        setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <>
      <PageHeader title="Our Blog" breadcrumb="Blog" image="/img/carousel-1.jpg" />
      
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h6 className="text-primary font-semibold tracking-wider uppercase mb-2 inline-block relative border-b-2 border-primary pb-1">Insights</h6>
             <h2 className="text-3xl md:text-5xl font-bold text-secondary">Latest Educational Updates</h2>
          </div>

          {loading ? (
             <div className="text-center text-gray-500 py-10">Loading articles...</div>
          ) : blogs.length === 0 ? (
             <div className="text-center text-gray-500 py-10 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
               <h3 className="text-xl font-bold text-gray-800 mb-2">No Articles Yet</h3>
               <p>Check back later for expert insights on admission processes and top colleges.</p>
             </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col">
                  <Link href={`/blog/${blog.slug}`} className="relative h-56 w-full block bg-gray-100 overflow-hidden">
                    <Image 
                      src={blog.image || "/img/carousel-1.jpg"} 
                      alt={blog.title} 
                      unoptimized={isRemoteImage(blog.image)}
                      fill 
                      className="object-cover hover:scale-110 transition-transform duration-500" 
                    />
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 font-light">
                      <Calendar size={14} className="text-primary" />
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Recently added"}
                    </div>
                    <Link href={`/blog/${blog.slug}`}>
                      <h3 className="text-xl font-bold text-secondary mb-3 hover:text-primary transition-colors line-clamp-2">{blog.title}</h3>
                    </Link>
                    <p className="text-gray-600 font-light mb-6 line-clamp-3 text-sm flex-1">{blog.excerpt}</p>
                    <Link href={`/blog/${blog.slug}`} className="flex items-center gap-2 text-primary font-medium group">
                      Read Article <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
