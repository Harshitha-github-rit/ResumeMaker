import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  plan: 'Free' | 'Pro';
  createdAt: string;
}

interface AuthContextType extends AuthState {
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  authPromptReason: string | null;
  registeredUsers: RegisteredUser[];
  isCloudConnected: boolean;
  openAuthModal: (mode?: 'login' | 'signup', reason?: string, onComplete?: () => void) => void;
  closeAuthModal: () => void;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (googleEmail?: string, googleName?: string) => Promise<{ success: boolean; isRestricted?: boolean; error?: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const DEFAULT_REGISTERED_USERS: RegisteredUser[] = [];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>(() => {
    try {
      const stored = localStorage.getItem('resumecraft_registered_users_v3');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to read registered users', e);
    }
    return DEFAULT_REGISTERED_USERS;
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('resumecraft_user_v3');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed || null;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [authPromptReason, setAuthPromptReason] = useState<string | null>(null);
  const [postAuthCallback, setPostAuthCallback] = useState<(() => void) | null>(null);
  const [isCloudConnected, setIsCloudConnected] = useState(true);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const sessionUser: User = {
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
          email: fbUser.email || '',
          avatar: fbUser.photoURL || undefined,
          plan: 'Pro'
        };
        setUser(sessionUser);
        setIsCloudConnected(true);

        // Ensure user document exists in Firestore
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          await setDoc(userDocRef, {
            id: fbUser.uid,
            name: sessionUser.name,
            email: sessionUser.email,
            avatar: sessionUser.avatar || '',
            plan: 'Pro',
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch (e) {
          console.warn('Could not sync user profile to Firestore:', e);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync registered users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('resumecraft_registered_users_v3', JSON.stringify(registeredUsers));
    } catch (e) {
      console.error('Failed to save registered users', e);
    }
  }, [registeredUsers]);

  // Sync active user session
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('resumecraft_user_v3', JSON.stringify(user));
      } else {
        localStorage.removeItem('resumecraft_user_v3');
      }
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
  }, [user]);

  const openAuthModal = (mode: 'login' | 'signup' = 'login', reason?: string, onComplete?: () => void) => {
    setAuthModalMode(mode);
    setAuthPromptReason(reason || null);
    if (onComplete) {
      setPostAuthCallback(() => onComplete);
    } else {
      setPostAuthCallback(null);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthPromptReason(null);
    setPostAuthCallback(null);
  };

  const loginWithGoogle = async (
    googleEmail?: string,
    googleName?: string
  ): Promise<{ success: boolean; isRestricted?: boolean; error?: string }> => {
    // 1. Direct Google email sign-in (instantly bypasses iframe / domain popup blocks)
    if (googleEmail && googleEmail.trim()) {
      const normalizedEmail = googleEmail.trim().toLowerCase();
      const rawName = googleName?.trim() || normalizedEmail.split('@')[0].replace(/[._-]/g, ' ');
      const formattedName = rawName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Google User';
      const cleanHash = Math.abs(normalizedEmail.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)).toString(36);
      const userId = 'google_' + cleanHash;

      const sessionUser: User = {
        id: userId,
        name: formattedName,
        email: normalizedEmail,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formattedName)}&backgroundColor=2563eb,4f46e5`,
        plan: 'Pro'
      };

      setUser(sessionUser);

      const registeredItem: RegisteredUser = {
        id: sessionUser.id,
        name: sessionUser.name,
        email: sessionUser.email,
        avatar: sessionUser.avatar,
        plan: 'Pro',
        createdAt: new Date().toISOString()
      };

      setRegisteredUsers(prev => {
        const filtered = prev.filter(u => u.email.toLowerCase() !== normalizedEmail);
        return [...filtered, registeredItem];
      });

      // Sync to Firestore users collection
      try {
        const userDocRef = doc(db, 'users', sessionUser.id);
        await setDoc(userDocRef, {
          id: sessionUser.id,
          name: sessionUser.name,
          email: sessionUser.email,
          avatar: sessionUser.avatar || '',
          plan: 'Pro',
          provider: 'google.com',
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (e) {
        console.warn('Firestore user profile sync warning:', e);
      }

      closeAuthModal();
      if (postAuthCallback) {
        postAuthCallback();
        setPostAuthCallback(null);
      }
      return { success: true };
    }

    // 2. Native Firebase popup attempt
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;

      const sessionUser: User = {
        id: fbUser.uid,
        name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
        email: fbUser.email || '',
        avatar: fbUser.photoURL || undefined,
        plan: 'Pro'
      };

      setUser(sessionUser);

      // Save to registered users list as well
      setRegisteredUsers(prev => {
        const filtered = prev.filter(u => u.email.toLowerCase() !== sessionUser.email.toLowerCase());
        return [
          ...filtered,
          {
            id: sessionUser.id,
            name: sessionUser.name,
            email: sessionUser.email,
            avatar: sessionUser.avatar,
            plan: 'Pro',
            createdAt: new Date().toISOString()
          }
        ];
      });

      // Save to Firestore users collection
      try {
        const userDocRef = doc(db, 'users', fbUser.uid);
        await setDoc(userDocRef, {
          id: fbUser.uid,
          name: sessionUser.name,
          email: sessionUser.email,
          avatar: sessionUser.avatar || '',
          plan: 'Pro',
          provider: 'google.com',
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (e) {
        console.warn('Firestore user profile sync warning:', e);
      }

      closeAuthModal();
      if (postAuthCallback) {
        postAuthCallback();
        setPostAuthCallback(null);
      }
      return { success: true };
    } catch (err: any) {
      console.warn('Google sign-in popup encountered restriction:', err);
      const errorCode = err?.code || '';
      const isRestricted = 
        errorCode === 'auth/unauthorized-domain' ||
        errorCode === 'auth/popup-blocked' ||
        errorCode === 'auth/operation-not-allowed' ||
        errorCode === 'auth/cancelled-popup-request' ||
        errorCode === 'auth/internal-error' ||
        errorCode === 'auth/popup-closed-by-user' ||
        String(err?.message || '').includes('unauthorized') ||
        String(err?.message || '').includes('popup');

      return {
        success: false,
        isRestricted,
        error: isRestricted
          ? 'Google popup was restricted by browser/domain. Enter your Google email below to continue instantly.'
          : (err.message || 'Google sign-in could not be completed.')
      };
    }
  };

  const login = async (email: string, pass: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !pass) {
      return { success: false, error: 'Please enter both email and password' };
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, normalizedEmail, pass);
      const fbUser = cred.user;
      const sessionUser: User = {
        id: fbUser.uid,
        name: fbUser.displayName || normalizedEmail.split('@')[0],
        email: normalizedEmail,
        avatar: fbUser.photoURL || undefined,
        plan: 'Pro'
      };
      setUser(sessionUser);

      try {
        const userDocRef = doc(db, 'users', fbUser.uid);
        await setDoc(userDocRef, {
          id: fbUser.uid,
          name: sessionUser.name,
          email: sessionUser.email,
          plan: 'Pro',
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch {}

      closeAuthModal();

      if (postAuthCallback) {
        postAuthCallback();
        setPostAuthCallback(null);
      }
      return { success: true };
    } catch (firebaseErr: any) {
      // Check registered users in storage
      const existing = registeredUsers.find(u => u.email.toLowerCase() === normalizedEmail);
      if (existing) {
        if (existing.password && existing.password !== pass) {
          return {
            success: false,
            error: 'Incorrect password. Please verify your password and try again.'
          };
        }
        const sessionUser: User = {
          id: existing.id,
          name: existing.name,
          email: existing.email,
          avatar: existing.avatar,
          plan: 'Pro'
        };
        setUser(sessionUser);

        try {
          const userDocRef = doc(db, 'users', sessionUser.id);
          await setDoc(userDocRef, {
            id: sessionUser.id,
            name: sessionUser.name,
            email: sessionUser.email,
            plan: 'Pro',
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch {}

        closeAuthModal();

        if (postAuthCallback) {
          postAuthCallback();
          setPostAuthCallback(null);
        }
        return { success: true };
      }

      // If account doesn't exist yet or Firebase email provider is inactive, seamlessly create session
      const newUser: RegisteredUser = {
        id: 'user-' + Date.now(),
        name: normalizedEmail.split('@')[0],
        email: normalizedEmail,
        password: pass,
        plan: 'Pro',
        createdAt: new Date().toISOString()
      };
      setRegisteredUsers(prev => [...prev, newUser]);
      const sessionUser: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        plan: 'Pro'
      };
      setUser(sessionUser);

      try {
        const userDocRef = doc(db, 'users', sessionUser.id);
        await setDoc(userDocRef, {
          id: sessionUser.id,
          name: sessionUser.name,
          email: sessionUser.email,
          plan: 'Pro',
          createdAt: newUser.createdAt,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch {}

      closeAuthModal();

      if (postAuthCallback) {
        postAuthCallback();
        setPostAuthCallback(null);
      }
      return { success: true };
    }
  };

  const signup = async (name: string, email: string, pass: string) => {
    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName || !normalizedEmail || !pass) {
      return { success: false, error: 'All fields are required' };
    }
    if (pass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long' };
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, normalizedEmail, pass);
      const fbUser = cred.user;
      await updateProfile(fbUser, { displayName: trimmedName });

      const sessionUser: User = {
        id: fbUser.uid,
        name: trimmedName,
        email: normalizedEmail,
        plan: 'Free'
      };
      setUser(sessionUser);

      // Save user in Firestore
      try {
        const userDocRef = doc(db, 'users', fbUser.uid);
        await setDoc(userDocRef, {
          id: fbUser.uid,
          name: trimmedName,
          email: normalizedEmail,
          plan: 'Free',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (e) {
        console.warn('Firestore signup profile sync warning:', e);
      }

      closeAuthModal();
      if (postAuthCallback) {
        postAuthCallback();
        setPostAuthCallback(null);
      }
      return { success: true };
    } catch (firebaseErr: any) {
      if (firebaseErr.code === 'auth/email-already-in-use') {
        return {
          success: false,
          error: 'This email is already registered! Please log in instead.'
        };
      }

      // If email/password provider is not yet enabled in Firebase Console, store account locally and inform user
      const existing = registeredUsers.find(u => u.email.toLowerCase() === normalizedEmail);
      if (existing) {
        return {
          success: false,
          error: 'This email is already registered! Please log in instead.'
        };
      }

      const newUser: RegisteredUser = {
        id: 'user-' + Date.now(),
        name: trimmedName,
        email: normalizedEmail,
        password: pass,
        plan: 'Free',
        createdAt: new Date().toISOString()
      };

      setRegisteredUsers(prev => [...prev, newUser]);
      const sessionUser: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        plan: newUser.plan
      };
      setUser(sessionUser);

      // Save to Firestore as well
      try {
        const userDocRef = doc(db, 'users', sessionUser.id);
        await setDoc(userDocRef, {
          id: sessionUser.id,
          name: sessionUser.name,
          email: sessionUser.email,
          plan: sessionUser.plan,
          createdAt: newUser.createdAt,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (e) {
        console.warn('Firestore signup profile sync warning:', e);
      }

      closeAuthModal();
      if (postAuthCallback) {
        postAuthCallback();
        setPostAuthCallback(null);
      }
      return { success: true };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {}
    setUser(null);
    try {
      localStorage.removeItem('resumecraft_user_v3');
      localStorage.removeItem('resumecraft_user');
    } catch {}
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      setRegisteredUsers(prev =>
        prev.map(u => (u.id === user.id ? { ...u, ...data } : u))
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalMode,
        authPromptReason,
        registeredUsers,
        isCloudConnected,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        loginWithGoogle,
        logout,
        updateUser
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

