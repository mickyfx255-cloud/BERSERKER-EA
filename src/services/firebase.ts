import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfigJson.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfigJson.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfigJson.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfigJson.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigJson.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfigJson.appId,
};

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Initialize Cloud Firestore
export const db = getFirestore(app);

// Test connection on boot according to skill guidelines
export async function validateFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('[Firebase] Firestore client appears offline. Verify configuration and network.');
    }
  }
}
validateFirestoreConnection();

/**
 * Translates Firebase Auth error codes into human-readable, clear messages.
 */
export function getFirebaseAuthErrorMessage(error: any): string {
  if (!error) return 'An unexpected authentication error occurred.';
  const code = error.code || '';

  switch (code) {
    case 'auth/user-not-found':
      return 'No account found with this email. Please check your spelling or sign up.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check your credentials and try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists. Please sign in instead.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in popup was closed before completing.';
    case 'auth/popup-blocked':
      return 'Sign-in popup was blocked by browser. Redirecting automatically...';
    case 'auth/cancelled-popup-request':
      return 'Another sign-in attempt is already active.';
    case 'auth/unauthorized-domain':
      return 'This web domain is not authorized in Firebase Console. Please add this domain under Firebase Console -> Authentication -> Settings -> Authorized Domains.';
    case 'auth/operation-not-allowed':
      return 'This sign-in provider is not enabled in Firebase Console. Please enable Google or Email/Password under Authentication -> Sign-in method.';
    case 'auth/network-request-failed':
      return 'Network connection failed. Please check your internet connection.';
    case 'auth/too-many-requests':
      return 'Access to this account has been temporarily disabled due to many failed attempts. Try again in a few minutes.';
    default:
      return error.message || 'Authentication failed. Please try again.';
  }
}

export {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
};
export type { FirebaseUser };
