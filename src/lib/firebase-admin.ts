import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);

let adminApp: App | null = null;
let initAttempted = false;

function normalizePrivateKey(value?: string) {
  if (!value) {
    return null;
  }

  const beginMarker = "-----BEGIN PRIVATE KEY-----";
  const endMarker = "-----END PRIVATE KEY-----";
  let key = value.trim().replace(/^['\"]|['\"]$/g, "").replace(/\\n/g, "\n").replace(/\r/g, "");

  const beginIndex = key.indexOf(beginMarker);
  const endIndex = key.indexOf(endMarker);

  if (beginIndex >= 0 && endIndex >= 0) {
    key = key.slice(beginIndex, endIndex + endMarker.length);
  }

  return key;
}

function ensureAdminApp() {
  if (adminApp || initAttempted) {
    return adminApp;
  }

  initAttempted = true;

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  try {
    adminApp = getApps()[0] ?? initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      projectId,
    });
  } catch (error) {
    console.error("Firebase Admin initialization failed", error);
    adminApp = null;
  }

  return adminApp;
}

export function getAdminAuth(): Auth | null {
  const app = ensureAdminApp();
  return app ? getAuth(app) : null;
}

export function getAdminDb(): Firestore | null {
  const app = ensureAdminApp();
  return app ? getFirestore(app) : null;
}
