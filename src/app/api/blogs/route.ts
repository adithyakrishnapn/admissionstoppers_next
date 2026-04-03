import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { getDocs, orderBy, query, collection } from "firebase/firestore";
import type { DecodedIdToken } from "firebase-admin/auth";

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

async function getAuthorizedUser(request: Request, adminAuth: NonNullable<ReturnType<typeof getAdminAuth>>) {
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
    const adminAuth = getAdminAuth();
    const adminDb = getAdminDb();

    if (!adminAuth || !adminDb) {
      return NextResponse.json(
        { error: "Server auth is not configured. Check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY." },
        { status: 500 }
      );
    }

    const user: DecodedIdToken | null = await getAuthorizedUser(request, adminAuth);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    const duplicate = await adminDb.collection("blogs").where("slug", "==", slug).limit(1).get();
    if (!duplicate.empty) {
      return NextResponse.json({ error: "A blog with this slug already exists" }, { status: 409 });
    }

    const saved = await adminDb.collection("blogs").add(payload);

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
