import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

export const firebaseConfig = {
  apiKey: "AIzaSyAL7ypXkucl_HOzmeAukfrV7CkQsXZh9tk",
  authDomain: "fir-3ee1d.firebaseapp.com",
  projectId: "fir-3ee1d",
  storageBucket: "fir-3ee1d.firebasestorage.app",
  messagingSenderId: "898036399720",
  appId: "1:898036399720:web:383233ea43041da2c505dd",
  measurementId: "G-WHJXPSV57L"
};

export const ADMIN_UID = 'fH49CJpsPlONA310YjpG9MdxY2d2';
export const ADMIN_EMAIL = 'info@dataaroojpaintgallery.shop';

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        getAnalytics(app);
      }
    })
    .catch(() => {
      // Analytics optional in restricted environments
    });
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
    return false;
  }
}

export const RECOMMENDED_FIRESTORE_RULES = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }

    function isSignedIn() {
      return request.auth != null;
    }

    function isAdmin() {
      return isSignedIn() && request.auth.uid == 'fH49CJpsPlONA310YjpG9MdxY2d2';
    }

    function isValidId(id) {
      return id is string && id.size() > 0 && id.size() <= 128 && id.matches('^[a-zA-Z0-9_\\\\-]+$');
    }

    // Connection test doc
    match /test/connection {
      allow read: if true;
    }

    // Public catalog read, strictly Admin-only writes
    match /products/{productId} {
      allow read: if true;
      allow create, update: if isAdmin() && isValidId(productId)
        && request.resource.data.name is string && request.resource.data.name.size() <= 200
        && request.resource.data.code is string && request.resource.data.code.size() <= 40;
      allow delete: if isAdmin() && isValidId(productId);
    }

    // Public site configuration read, strictly Admin-only writes
    match /siteConfig/{configId} {
      allow read: if true;
      allow create, update, delete: if isAdmin() && isValidId(configId);
    }

    // Public quotation/inquiry submission, strictly Admin-only read/manage
    match /quotations/{quotationId} {
      allow create: if isValidId(quotationId)
        && request.resource.data.fullName is string && request.resource.data.fullName.size() >= 1 && request.resource.data.fullName.size() <= 120
        && request.resource.data.phone is string && request.resource.data.phone.size() >= 4 && request.resource.data.phone.size() <= 40
        && request.resource.data.status == 'new';
      allow read, update, delete: if isAdmin();
    }
  }
}`;
