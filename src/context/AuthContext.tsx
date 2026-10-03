import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, pass: string, fullName: string) => Promise<{ success: boolean; requiresVerification?: boolean; error?: string }>;
  loginWithGoogle: () => Promise<void>;
  verifyEmailSimulation: (email: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
  toggleAdminRoleForTesting: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const OWNER_EMAIL = 'Mickybonny9@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('berserker_ea_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  const saveUserSession = (usr: UserProfile | null) => {
    setUser(usr);
    if (usr) {
      localStorage.setItem('berserker_ea_user', JSON.stringify(usr));
    } else {
      localStorage.removeItem('berserker_ea_user');
    }
  };

  const login = async (email: string, _pass: string) => {
    const cleanEmail = email.trim();
    // Check if registered in simulated users table
    const registeredUsers = JSON.parse(localStorage.getItem('berserker_registered_users') || '[]');
    const existing = registeredUsers.find((u: UserProfile) => u.email.toLowerCase() === cleanEmail.toLowerCase());

    const isOwner = cleanEmail.toLowerCase() === OWNER_EMAIL.toLowerCase();

    const loggedUser: UserProfile = existing || {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      full_name: isOwner ? 'Micky Bonny (Owner)' : (cleanEmail.split('@')[0] || 'Valued Trader'),
      role: isOwner ? 'admin' : 'user',
      email_verified: true,
      created_at: new Date().toISOString(),
    };

    saveUserSession(loggedUser);
    return { success: true };
  };

  const signup = async (email: string, _pass: string, fullName: string) => {
    const cleanEmail = email.trim();
    const isOwner = cleanEmail.toLowerCase() === OWNER_EMAIL.toLowerCase();

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      full_name: fullName.trim() || cleanEmail.split('@')[0],
      role: isOwner ? 'admin' : 'user',
      email_verified: false,
      created_at: new Date().toISOString(),
    };

    const registeredUsers = JSON.parse(localStorage.getItem('berserker_registered_users') || '[]');
    registeredUsers.push(newUser);
    localStorage.setItem('berserker_registered_users', JSON.stringify(registeredUsers));

    // Sign up requires email confirmation
    return { success: true, requiresVerification: true };
  };

  const verifyEmailSimulation = (email: string) => {
    const registeredUsers: UserProfile[] = JSON.parse(localStorage.getItem('berserker_registered_users') || '[]');
    const found = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      found.email_verified = true;
      localStorage.setItem('berserker_registered_users', JSON.stringify(registeredUsers));
      saveUserSession(found);
      return true;
    }
    // Fallback create
    const isOwner = email.toLowerCase() === OWNER_EMAIL.toLowerCase();
    const verifiedUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email,
      full_name: email.split('@')[0],
      role: isOwner ? 'admin' : 'user',
      email_verified: true,
      created_at: new Date().toISOString(),
    };
    saveUserSession(verifiedUser);
    return true;
  };

  const loginWithGoogle = async () => {
    const googleUser: UserProfile = {
      id: `usr-google-${Date.now()}`,
      email: 'trader.google@gmail.com',
      full_name: 'Alex Trader',
      role: 'user',
      email_verified: true,
      created_at: new Date().toISOString(),
    };
    saveUserSession(googleUser);
  };

  const logout = () => {
    saveUserSession(null);
  };

  const toggleAdminRoleForTesting = () => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      role: user.role === 'admin' ? 'user' : 'admin',
    };
    saveUserSession(updated);
  };

  const isAdmin = user?.role === 'admin' || user?.email.toLowerCase() === OWNER_EMAIL.toLowerCase();

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        loginWithGoogle,
        verifyEmailSimulation,
        logout,
        isAdmin,
        toggleAdminRoleForTesting,
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
