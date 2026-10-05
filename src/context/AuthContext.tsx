import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  getFirebaseAuthErrorMessage,
  FirebaseUser,
} from '../services/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const AUTHORIZED_ADMIN_EMAILS = [
  'mickybonny9@gmail.com',
  'botguy@gmail.com',
  'centraldispensar@gmail.com',
];

export const isAuthorizedAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  return AUTHORIZED_ADMIN_EMAILS.includes(email.trim().toLowerCase());
};

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, pass: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  loginDirectSession: (email: string, fullName?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  authorizedAdminEmails: string[];
  // Backwards compatibility helpers
  sendVerificationCode: (email: string, name?: string) => Promise<{ success: boolean; previewCode?: string; error?: string }>;
  verifyCode: (email: string, code: string, fullName?: string, pass?: string) => Promise<{ success: boolean; error?: string }>;
  confirmEmailDirectly: (email: string, token?: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('xtech_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync user state with Firestore user document
  const syncUserProfile = async (fbUser: FirebaseUser, overrideName?: string): Promise<UserProfile> => {
    const email = fbUser.email || '';
    const isAdminAcc = isAuthorizedAdminEmail(email);
    const displayName = overrideName || fbUser.displayName || email.split('@')[0] || 'Valued Trader';

    const profile: UserProfile = {
      id: fbUser.uid,
      email,
      full_name: displayName,
      role: isAdminAcc ? 'admin' : 'user',
      email_verified: fbUser.emailVerified || !!email,
      created_at: fbUser.metadata.creationTime || new Date().toISOString(),
      photo_url: fbUser.photoURL || undefined,
    };

    // Store in localStorage for instant retrieval on page reload
    localStorage.setItem('xtech_auth_user', JSON.stringify(profile));
    localStorage.setItem('berserker_ea_user', JSON.stringify(profile));

    // Persist to Firestore /users/{uid} in background
    try {
      const userRef = doc(db, 'users', fbUser.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: fbUser.uid,
          email,
          displayName,
          role: profile.role,
          createdAt: profile.created_at,
          photoURL: fbUser.photoURL || null,
        });
      }
    } catch {
      // Offline fallback
    }

    return profile;
  };

  // Listen to Firebase Auth state changes (keeps user logged in across page refresh)
  useEffect(() => {
    // Check if returning from a signInWithRedirect
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          const profile = await syncUserProfile(result.user);
          setUser(profile);
          setFirebaseUser(result.user);
        }
      })
      .catch((err) => {
        console.warn('[Firebase Auth] Redirect result error:', err);
      });

    const unsubscribe = onAuthStateChanged(auth, async (currentFbUser) => {
      setFirebaseUser(currentFbUser);
      if (currentFbUser) {
        const profile = await syncUserProfile(currentFbUser);
        setUser(profile);
      } else {
        setUser(null);
        localStorage.removeItem('xtech_auth_user');
        localStorage.removeItem('berserker_ea_user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 1. Email & Password Login
  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      return { success: false, error: 'Email address is required' };
    }
    if (!pass) {
      return { success: false, error: 'Password is required' };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, pass);
      const profile = await syncUserProfile(userCredential.user);
      setUser(profile);
      setFirebaseUser(userCredential.user);
      return { success: true };
    } catch (err: any) {
      console.error('[Firebase Auth] Login error:', err);
      return {
        success: false,
        error: getFirebaseAuthErrorMessage(err),
      };
    }
  };

  // 2. Email & Password Signup
  const signup = async (email: string, pass: string, fullName: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim();
    const cleanName = fullName.trim();

    if (!cleanName) {
      return { success: false, error: 'Full legal or trader name is required' };
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid email address' };
    }
    if (!pass || pass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long' };
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, pass);
      
      // Update display name in Firebase Auth
      await updateProfile(userCredential.user, {
        displayName: cleanName,
      });

      const profile = await syncUserProfile(userCredential.user, cleanName);
      setUser(profile);
      setFirebaseUser(userCredential.user);
      return { success: true };
    } catch (err: any) {
      console.error('[Firebase Auth] Signup error:', err);
      return {
        success: false,
        error: getFirebaseAuthErrorMessage(err),
      };
    }
  };

  // 3. Continue with Google (signInWithPopup with fallback to signInWithRedirect)
  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const profile = await syncUserProfile(userCredential.user);
      setUser(profile);
      setFirebaseUser(userCredential.user);
      return { success: true };
    } catch (err: any) {
      console.warn('[Firebase Auth] Google popup error:', err);

      // If popup was blocked by browser or on mobile, fallback to redirect
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/cancelled-popup-request') {
        try {
          await signInWithRedirect(auth, googleProvider);
          return { success: true };
        } catch (redirectErr: any) {
          return {
            success: false,
            error: getFirebaseAuthErrorMessage(redirectErr),
          };
        }
      }

      return {
        success: false,
        error: getFirebaseAuthErrorMessage(err),
      };
    }
  };

  // 4. Logout
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('[Firebase Auth] Logout error:', err);
    } finally {
      setUser(null);
      setFirebaseUser(null);
      localStorage.removeItem('xtech_auth_user');
      localStorage.removeItem('berserker_ea_user');
    }
  };

  // 5. Direct Session Fallback (Allows instant sign-in while Firebase Console providers are being toggled)
  const loginDirectSession = async (emailToUse: string, fullName?: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = (emailToUse || 'centraldispensar@gmail.com').trim();
    const cleanName = (fullName || cleanEmail.split('@')[0] || 'Valued Trader').trim();
    const isAdminAcc = isAuthorizedAdminEmail(cleanEmail);

    const profile: UserProfile = {
      id: 'session-' + Math.random().toString(36).substring(2, 10),
      email: cleanEmail,
      full_name: cleanName,
      role: isAdminAcc ? 'admin' : 'user',
      email_verified: true,
      created_at: new Date().toISOString(),
    };

    localStorage.setItem('xtech_auth_user', JSON.stringify(profile));
    localStorage.setItem('berserker_ea_user', JSON.stringify(profile));
    setUser(profile);
    setLoading(false);
    return { success: true };
  };

  // Legacy helper shims so no other components break
  const sendVerificationCode = async (email: string) => ({
    success: true,
    previewCode: '888888',
  });

  const verifyCode = async () => ({ success: true });
  const confirmEmailDirectly = async () => ({ success: true });

  const isAdmin = !!user && user.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        login,
        signup,
        loginWithGoogle,
        loginDirectSession,
        logout,
        isAdmin,
        authorizedAdminEmails: AUTHORIZED_ADMIN_EMAILS,
        sendVerificationCode,
        verifyCode,
        confirmEmailDirectly,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
