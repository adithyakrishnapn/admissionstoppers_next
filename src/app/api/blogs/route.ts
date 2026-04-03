import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";

type BlogPayload = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  image?: string;
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function GET() {
  try {
    if (!db) {
      return NextResponse.json({ blogs: [] });
    }

    const snap = await getDocs(query(collection(db, "blogs"), orderBy("createdAt", "desc")));
    const blogs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Failed to load blogs", error);
    return NextResponse.json({ error: "Failed to load blogs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!db) {
      return NextResponse.json({ error: "Database is not configured" }, { status: 500 });
    }

    const body = (await request.json()) as BlogPayload;
    const title = body.title?.trim();
    const excerpt = body.excerpt?.trim();
    const content = body.content?.trim();

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: "title, excerpt, and content are required" },
        { status: 400 }
      );
    }

    const slug = toSlug(body.slug?.trim() || title);
    const payload = {
      title,
      slug,
      excerpt,
      content,
      image: body.image?.trim() || "/img/carousel-1.jpg",
      createdAt: new Date().toISOString(),
    };

    const saved = await addDoc(collection(db, "blogs"), payload);

    return NextResponse.json({ id: saved.id, ...payload }, { status: 201 });
  } catch (error: any) {
    const errorMsg = error?.message || error?.code || String(error);
    console.error("Failed to create blog", errorMsg, error);
    
    // Return more details for debugging
    return NextResponse.json(
      { 
        error: "Failed to create blog",
        details: errorMsg,
        code: error?.code
      }, 
      { status: 500 }
    );
  }
}
