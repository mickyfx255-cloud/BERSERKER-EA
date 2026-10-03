import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

export const AUTHORIZED_ADMIN_EMAILS = [
  'mickybonny9@gmail.com',
  'botguy@gmail.com',
];

export const isAuthorizedAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  return AUTHORIZED_ADMIN_EMAILS.includes(email.trim().toLowerCase());
};

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, pass: string, fullName: string) => Promise<{ success: boolean; requiresVerification?: boolean; previewCode?: string; error?: string }>;
  sendVerificationCode: (email: string, name?: string) => Promise<{ success: boolean; previewCode?: string; error?: string }>;
  verifyCode: (email: string, code: string, fullName?: string, pass?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (customEmail?: string, customName?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAdmin: boolean;
  authorizedAdminEmails: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load session from storage on start
  useEffect(() => {
    try {
      const stored = localStorage.getItem('berserker_ea_user');
      if (stored) {
        const parsed: UserProfile = JSON.parse(stored);
        // Guarantee that role is synced with authorized admin emails
        if (isAuthorizedAdminEmail(parsed.email)) {
          parsed.role = 'admin';
        }
        setUser(parsed);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  const saveUserSession = (usr: UserProfile | null) => {
    if (usr) {
      if (isAuthorizedAdminEmail(usr.email)) {
        usr.role = 'admin';
      }
      setUser(usr);
      localStorage.setItem('berserker_ea_user', JSON.stringify(usr));
    } else {
      setUser(null);
      localStorage.removeItem('berserker_ea_user');
    }
  };

  const login = async (email: string, _pass: string) => {
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      return { success: false, error: 'Email address is required' };
    }

    const isAdminAcc = isAuthorizedAdminEmail(cleanEmail);

    // Retrieve from registered users list or create session
    const registeredUsers = JSON.parse(localStorage.getItem('berserker_registered_users') || '[]');
    const existing = registeredUsers.find((u: UserProfile) => u.email.toLowerCase() === cleanEmail.toLowerCase());

    const loggedUser: UserProfile = existing || {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      full_name: isAdminAcc
        ? cleanEmail.toLowerCase() === 'mickybonny9@gmail.com'
          ? 'Micky Bonny (Admin)'
          : 'Bot Guy (Admin)'
        : cleanEmail.split('@')[0] || 'Valued Trader',
      role: isAdminAcc ? 'admin' : 'user',
      email_verified: true,
      created_at: new Date().toISOString(),
    };

    if (isAdminAcc) {
      loggedUser.role = 'admin';
    }

    saveUserSession(loggedUser);
    return { success: true };
  };

  const sendVerificationCode = async (email: string, name?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    let generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      const res = await fetch('/api/auth/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, name }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.previewCode) {
          generatedCode = data.previewCode;
        }
      }
    } catch {
      // Local fallback code generated above
    }

    // Save active pending verification in sessionStorage for reliability
    sessionStorage.setItem(`verify_code_${cleanEmail}`, generatedCode);
    return { success: true, previewCode: generatedCode };
  };

  const signup = async (email: string, _pass: string, fullName: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: 'Email address is required' };
    }

    // Request verification code to verify email address
    const codeResult = await sendVerificationCode(cleanEmail, fullName);
    return {
      success: true,
      requiresVerification: true,
      previewCode: codeResult.previewCode,
    };
  };

  const verifyCode = async (email: string, inputCode: string, fullName?: string, _pass?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = inputCode.trim();

    const storedCode = sessionStorage.getItem(`verify_code_${cleanEmail}`);
    let verified = false;

    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, code: cleanCode }),
      });
      if (res.ok) {
        verified = true;
      }
    } catch {
      // Offline fallback
    }

    // Accept server verification or local match or universal master testing code 888888
    if (!verified && (cleanCode === storedCode || cleanCode === '888888')) {
      verified = true;
    }

    if (!verified) {
      return { success: false, error: 'Invalid verification code. Please check your email or use the preview code.' };
    }

    // Code is valid! Create / update user
    const isAdminAcc = isAuthorizedAdminEmail(cleanEmail);
    const registeredUsers = JSON.parse(localStorage.getItem('berserker_registered_users') || '[]');
    
    let existing = registeredUsers.find((u: UserProfile) => u.email.toLowerCase() === cleanEmail);
    if (!existing) {
      existing = {
        id: `usr-${Date.now()}`,
        email: cleanEmail,
        full_name: fullName?.trim() || (isAdminAcc ? (cleanEmail === 'mickybonny9@gmail.com' ? 'Micky Bonny (Admin)' : 'Bot Guy (Admin)') : cleanEmail.split('@')[0]),
        role: isAdminAcc ? 'admin' : 'user',
        email_verified: true,
        created_at: new Date().toISOString(),
      };
      registeredUsers.push(existing);
      localStorage.setItem('berserker_registered_users', JSON.stringify(registeredUsers));
    } else {
      existing.email_verified = true;
      if (isAdminAcc) existing.role = 'admin';
      localStorage.setItem('berserker_registered_users', JSON.stringify(registeredUsers));
    }

    sessionStorage.removeItem(`verify_code_${cleanEmail}`);
    saveUserSession(existing);
    return { success: true };
  };

  const loginWithGoogle = async (customEmail?: string, customName?: string) => {
    const chosenEmail = (customEmail || 'trader.google@gmail.com').trim().toLowerCase();
    const isAdminAcc = isAuthorizedAdminEmail(chosenEmail);

    let defaultName = 'Google Trader';
    if (chosenEmail === 'mickybonny9@gmail.com') defaultName = 'Micky Bonny (Admin)';
    if (chosenEmail === 'botguy@gmail.com') defaultName = 'Bot Guy (Admin)';

    const googleUser: UserProfile = {
      id: `usr-google-${Date.now()}`,
      email: chosenEmail,
      full_name: customName?.trim() || defaultName,
      role: isAdminAcc ? 'admin' : 'user',
      email_verified: true,
      created_at: new Date().toISOString(),
    };

    saveUserSession(googleUser);
    return { success: true };
  };

  const logout = () => {
    saveUserSession(null);
  };

  // Only Mickybonny9@gmail.com and botguy@gmail.com are granted admin access
  const isAdmin = isAuthorizedAdminEmail(user?.email);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        sendVerificationCode,
        verifyCode,
        loginWithGoogle,
        logout,
        isAdmin,
        authorizedAdminEmails: AUTHORIZED_ADMIN_EMAILS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
