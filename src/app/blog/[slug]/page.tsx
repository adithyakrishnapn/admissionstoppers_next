import Link from "next/link";
import Image from "next/image";
import { Calendar, ChevronRight, Home } from "lucide-react";
import { Metadata } from "next";

function isRemoteImage(src?: string) {
  return !!src && /^https?:\/\//i.test(src);
}

async function fetchBlog(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/blogs/${slug}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlog(slug);

  if (!blog) {
    return {
      title: "Article Not Found | Admissions Topper",
      description: "The blog post you're looking for doesn't exist.",
    };
  }

  return {
    title: `${blog.title} | Admissions Topper Blog`,
    description: blog.excerpt || blog.title,
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.title,
      url: `/blog/${blog.slug}`,
      images: [
        {
          url: blog.image || "/img/carousel-1.jpg",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
      publishedTime: blog.createdAt,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt || blog.title,
      images: [blog.image || "/img/carousel-1.jpg"],
    },
  };
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await fetchBlog(slug);

  if (!blog) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
        <p className="text-gray-500 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link href="/blog" className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Blog Header Image and Meta */}
      <div className="relative h-[400px] md:h-[500px] w-full bg-[#181d38]">
        <Image 
          src={blog.image || "/img/carousel-1.jpg"} 
          alt={blog.title} 
          unoptimized={isRemoteImage(blog.image)}
          fill 
          className="object-cover opacity-40" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-6 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1"><Home size={14}/> Home</Link>
            <ChevronRight size={14} />
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight size={14} />
            <span className="text-gray-300 truncate max-w-[200px]">{blog.slug}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight slide-in-bottom">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-white/90 text-sm font-light">
             <div className="flex items-center gap-2">
               <Calendar size={16} className="text-primary" />
               <time>
                 {blog.createdAt
                   ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                       year: "numeric",
                       month: "long",
                       day: "numeric",
                     })
                   : "Recently added"}
               </time>
             </div>
             <div className="w-1.5 h-1.5 rounded-full bg-primary" />
             <span>Admissions Topper Expert</span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 -mt-32 relative z-10">
            {/* Inject HTML securely (Content created by admin) */}
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      </div>
    </article>
  );
}
