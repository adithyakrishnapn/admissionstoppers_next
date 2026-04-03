import { MetadataRoute } from "next";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const dynamic = "force-dynamic";

type BlogDoc = {
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://admissionstopper.com";

  const staticPages = [
    "",
    "/about",
    "/courses",
    "/courses/diploma",
    "/courses/engineering",
    "/courses/medical",
    "/courses/ug",
    "/courses/ugparamedical",
    "/colleges",
    "/colleges/bangalore",
    "/colleges/kerala",
    "/colleges/mangalore",
    "/colleges/tamilnadu",
    "/blog",
    "/contact",
    "/free-counselling",
    "/faq",
    "/privacy",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.includes("/courses") || route.includes("/colleges") ? 0.9 : 0.8,
  }));

  let blogEntries: MetadataRoute.Sitemap = [];

  if (db) {
    try {
      const blogSnap = await getDocs(query(collection(db, "blogs"), orderBy("createdAt", "desc")));
      blogEntries = blogSnap.docs.reduce<MetadataRoute.Sitemap>((acc, doc) => {
        const data = doc.data() as BlogDoc;
        if (!data.slug) {
          return acc;
        }

        acc.push({
          url: `${baseUrl}/blog/${data.slug}`,
          lastModified: new Date(data.updatedAt || data.createdAt || Date.now()),
          changeFrequency: "weekly",
          priority: 0.7,
        });

        return acc;
      }, []);
    } catch (error) {
      console.error("Failed to load blogs for sitemap", error);
    }
  }

  return [...staticEntries, ...blogEntries];
}
