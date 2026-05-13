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
      <div className="min-h-screen pt-24 md:pt-28 pb-20 flex flex-col items-center justify-center text-center px-4 bg-slate-50">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
        <p className="text-gray-500 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link href="/blog" className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-slate-50 pt-24 md:pt-28">
      <div className="relative isolate overflow-hidden bg-[#181d38]">
        <div className="absolute inset-0">
          <Image
            src={blog.image || "/img/carousel-1.jpg"}
            alt={blog.title}
            unoptimized={isRemoteImage(blog.image)}
            fill
            className="object-cover opacity-35 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#181d38]/95 via-[#181d38]/80 to-black/75" />
          <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-white/75">
            <Link href="/" className="flex items-center gap-1 transition-colors hover:text-primary">
              <Home size={14} />
              Home
            </Link>
            <ChevronRight size={14} />
            <Link href="/blog" className="transition-colors hover:text-primary">
              Blog
            </Link>
            <ChevronRight size={14} />
            <span className="max-w-[220px] truncate text-white/55">{blog.slug}</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm">
              Blog Article
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-white/90 backdrop-blur-sm">
              <Calendar size={14} className="text-primary" />
              <time>
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Recently added"}
              </time>
            </span>
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/80 backdrop-blur-sm">
              Admissions Topper Editorial
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-tight">
            {blog.title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
            {blog.excerpt || "Clear guidance, practical insights, and the latest updates from our admission team."}
          </p>
        </div>
      </div>

      <div className="relative pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-12 md:-mt-16">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] md:p-10 lg:p-12">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="text-sm text-slate-500">
                Published for students researching admission options and course guidance.
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-primary hover:text-primary"
              >
                Back to Blog
              </Link>
            </div>

            <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      </div>
    </article>
  );
}
