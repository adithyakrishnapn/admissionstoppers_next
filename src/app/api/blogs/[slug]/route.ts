import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import {
  getDocs,
  limit,
  query,
  where,
  collection,
} from "firebase/firestore";

type BlogUpdatePayload = {
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

async function getAuthorizedUser(request: Request) {
  const adminAuth = getAdminAuth();
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const idToken = authHeader.slice(7).trim();
  if (!idToken || !adminAuth) {
    return null;
  }

  try {
    return await adminAuth.verifyIdToken(idToken);
  } catch {
    return null;
  }
}

async function findBlogDocBySlug(slug: string) {
  const q = query(collection(db, "blogs"), where("slug", "==", slug), limit(1));
  const snap = await getDocs(q);
  return snap.empty ? null : snap.docs[0];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    if (!db) {
      return NextResponse.json({ error: "Database is not configured" }, { status: 500 });
    }

    const { slug } = await params;
    const blogDoc = await findBlogDocBySlug(slug);
    if (!blogDoc) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ id: blogDoc.id, ...blogDoc.data() });
  } catch (error) {
    console.error("Failed to load blog", error);
    return NextResponse.json({ error: "Failed to load blog" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const adminDb = getAdminDb();
    const user = await getAuthorizedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!adminDb) {
      return NextResponse.json({ error: "Database is not configured" }, { status: 500 });
    }

    const { slug } = await params;
    const blogQuery = adminDb.collection("blogs").where("slug", "==", slug).limit(1);
    const blogSnap = await blogQuery.get();
    const blogDoc = blogSnap.empty ? null : blogSnap.docs[0];
    if (!blogDoc) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const body = (await request.json()) as BlogUpdatePayload;
    const title = body.title?.trim();
    const excerpt = body.excerpt?.trim();
    const content = body.content?.trim();

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: "title, excerpt, and content are required" },
        { status: 400 }
      );
    }

    const updated = {
      title,
      excerpt,
      content,
      image: body.image?.trim() || "/img/carousel-1.jpg",
      slug: toSlug(body.slug?.trim() || title),
      updatedAt: new Date().toISOString(),
    };

    if (updated.slug !== slug) {
      const duplicateSlugSnap = await adminDb
        .collection("blogs")
        .where("slug", "==", updated.slug)
        .limit(1)
        .get();

      if (!duplicateSlugSnap.empty) {
        return NextResponse.json({ error: "A blog with this slug already exists" }, { status: 409 });
      }
    }

    await blogDoc.ref.update(updated);
    return NextResponse.json({ id: blogDoc.id, ...updated });
  } catch (error) {
    console.error("Failed to update blog", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const adminDb = getAdminDb();
    const user = await getAuthorizedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!adminDb) {
      return NextResponse.json({ error: "Database is not configured" }, { status: 500 });
    }

    const { slug } = await params;
    const blogQuery = adminDb.collection("blogs").where("slug", "==", slug).limit(1);
    const blogSnap = await blogQuery.get();
    const blogDoc = blogSnap.empty ? null : blogSnap.docs[0];
    if (!blogDoc) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    await blogDoc.ref.delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete blog", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
