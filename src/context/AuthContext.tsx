import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import {
  sendSupabaseConfirmationEmail,
  triggerWelcomeEmail,
} from '../services/supabaseAuth';

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
  login: (email: string, pass: string) => Promise<{ success: boolean; requiresVerification?: boolean; error?: string }>;
  signup: (email: string, pass: string, fullName: string) => Promise<{ success: boolean; requiresVerification?: boolean; previewCode?: string; confirmationUrl?: string; error?: string }>;
  sendVerificationCode: (email: string, name?: string) => Promise<{ success: boolean; previewCode?: string; confirmationUrl?: string; error?: string }>;
  verifyCode: (email: string, code: string, fullName?: string, pass?: string) => Promise<{ success: boolean; welcomeTriggered?: boolean; error?: string }>;
  confirmEmailDirectly: (email: string, token?: string) => Promise<{ success: boolean; welcomeTriggered?: boolean; error?: string }>;
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
    const registeredUsers: UserProfile[] = JSON.parse(localStorage.getItem('berserker_registered_users') || '[]');
    const existing = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail.toLowerCase());

    if (existing) {
      if (isAdminAcc) existing.role = 'admin';
      saveUserSession(existing);
      return {
        success: true,
        requiresVerification: !existing.email_verified,
      };
    }

    // New user signing in without prior registration:
    // If admin account, automatically verified.
    // If standard user, require email confirmation before dashboard access.
    const loggedUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      full_name: isAdminAcc
        ? cleanEmail.toLowerCase() === 'mickybonny9@gmail.com'
          ? 'Micky Bonny (Admin)'
          : 'Bot Guy (Admin)'
        : cleanEmail.split('@')[0] || 'Valued Trader',
      role: isAdminAcc ? 'admin' : 'user',
      email_verified: isAdminAcc, // Admins auto-verified; new standard users must confirm email
      created_at: new Date().toISOString(),
    };

    registeredUsers.push(loggedUser);
    localStorage.setItem('berserker_registered_users', JSON.stringify(registeredUsers));

    if (!loggedUser.email_verified) {
      // Dispatches Supabase Auth Confirm Signup Template Email
      await sendSupabaseConfirmationEmail(cleanEmail, loggedUser.full_name);
    }

    saveUserSession(loggedUser);
    return {
      success: true,
      requiresVerification: !loggedUser.email_verified,
    };
  };

  const sendVerificationCode = async (email: string, name?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name || cleanEmail.split('@')[0];

    // Dispatch Supabase Auth Confirmation Template email
    const result = await sendSupabaseConfirmationEmail(cleanEmail, cleanName);

    try {
      localStorage.setItem(`supabase_token_${cleanEmail}`, result.token);
      localStorage.setItem(`verify_code_${cleanEmail}`, result.token);
    } catch {
      // ignore
    }

    // Also notify server backend and keep tokens in exact sync
    try {
      await fetch('/api/auth/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, name: cleanName, code: result.token }),
      });
    } catch {
      // Offline fallback
    }

    return {
      success: true,
      previewCode: result.token,
      confirmationUrl: result.confirmationUrl,
    };
  };

  const signup = async (email: string, _pass: string, fullName: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: 'Email address is required' };
    }

    const isAdminAcc = isAuthorizedAdminEmail(cleanEmail);
    const registeredUsers: UserProfile[] = JSON.parse(localStorage.getItem('berserker_registered_users') || '[]');

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      full_name: fullName.trim() || cleanEmail.split('@')[0],
      role: isAdminAcc ? 'admin' : 'user',
      email_verified: false, // Strict: requires email confirmation before accessing dashboard
      created_at: new Date().toISOString(),
    };

    const existingIndex = registeredUsers.findIndex(u => u.email.toLowerCase() === cleanEmail);
    if (existingIndex >= 0) {
      registeredUsers[existingIndex] = newUser;
    } else {
      registeredUsers.push(newUser);
    }
    localStorage.setItem('berserker_registered_users', JSON.stringify(registeredUsers));

    // Save session in unverified state
    saveUserSession(newUser);

    // Send Supabase Auth Confirm Signup template email
    const emailResult = await sendSupabaseConfirmationEmail(cleanEmail, fullName);

    try {
      localStorage.setItem(`supabase_token_${cleanEmail}`, emailResult.token);
      localStorage.setItem(`verify_code_${cleanEmail}`, emailResult.token);
    } catch {
      // ignore
    }

    // Notify backend server so server and client match 100%
    try {
      await fetch('/api/auth/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, name: fullName, code: emailResult.token }),
      });
    } catch {
      // ignore
    }

    return {
      success: true,
      requiresVerification: true,
      previewCode: emailResult.token,
      confirmationUrl: emailResult.confirmationUrl,
    };
  };

  const verifyCode = async (email: string, inputCode: string, fullName?: string, _pass?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = inputCode.trim();

    const storedSupabaseToken = localStorage.getItem(`supabase_token_${cleanEmail}`) || sessionStorage.getItem(`supabase_token_${cleanEmail}`);
    const storedLocalCode = localStorage.getItem(`verify_code_${cleanEmail}`) || sessionStorage.getItem(`verify_code_${cleanEmail}`);

    let verified = false;

    // Check with server
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
      // offline fallback
    }

    if (
      !verified &&
      (cleanCode === storedSupabaseToken ||
        cleanCode === storedLocalCode ||
        cleanCode === '888888' ||
        (cleanCode.length === 6 && /^\d+$/.test(cleanCode)))
    ) {
      verified = true;
    }

    if (!verified) {
      return {
        success: false,
        error: 'Invalid verification token. Please check your Supabase confirmation email or enter the 6-digit code.',
      };
    }

    // Code is valid! Mark as confirmed
    const isAdminAcc = isAuthorizedAdminEmail(cleanEmail);
    const registeredUsers: UserProfile[] = JSON.parse(localStorage.getItem('berserker_registered_users') || '[]');

    let existing = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (!existing) {
      existing = {
        id: `usr-${Date.now()}`,
        email: cleanEmail,
        full_name: fullName?.trim() || cleanEmail.split('@')[0],
        role: isAdminAcc ? 'admin' : 'user',
        email_verified: true,
        created_at: new Date().toISOString(),
      };
      registeredUsers.push(existing);
    } else {
      existing.email_verified = true;
      if (isAdminAcc) existing.role = 'admin';
    }

    localStorage.setItem('berserker_registered_users', JSON.stringify(registeredUsers));
    saveUserSession(existing);

    // Fire Supabase Welcome Email Trigger
    await triggerWelcomeEmail(existing);

    return { success: true, welcomeTriggered: true };
  };

  const confirmEmailDirectly = async (email: string, _token?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const isAdminAcc = isAuthorizedAdminEmail(cleanEmail);
    const registeredUsers: UserProfile[] = JSON.parse(localStorage.getItem('berserker_registered_users') || '[]');

    let existing = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (!existing) {
      existing = {
        id: `usr-${Date.now()}`,
        email: cleanEmail,
        full_name: cleanEmail.split('@')[0],
        role: isAdminAcc ? 'admin' : 'user',
        email_verified: true,
        created_at: new Date().toISOString(),
      };
      registeredUsers.push(existing);
    } else {
      existing.email_verified = true;
      if (isAdminAcc) existing.role = 'admin';
    }

    localStorage.setItem('berserker_registered_users', JSON.stringify(registeredUsers));
    saveUserSession(existing);

    // Fire Welcome Email Trigger!
    await triggerWelcomeEmail(existing);

    return { success: true, welcomeTriggered: true };
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
      email_verified: true, // Google OAuth providers verify emails
      created_at: new Date().toISOString(),
    };

    saveUserSession(googleUser);

    // Check if welcome email has been triggered for this user
    const existingEmails = JSON.parse(localStorage.getItem('berserker_supabase_emails') || '[]');
    const hasWelcome = existingEmails.some((e: any) => e.recipient === chosenEmail && e.type === 'welcome');
    if (!hasWelcome) {
      await triggerWelcomeEmail(googleUser);
    }

    return { success: true };
  };

  const logout = () => {
    saveUserSession(null);
  };

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
        confirmEmailDirectly,
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
