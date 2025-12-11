// context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// types/auth.ts
// Define the shape of a User object
export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  display_name: string,
  profile_photo: string
  // Add any other user properties
  roles: string[];
};

// Define the shape of the Auth Context value
export type AuthContextType = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  isLoading: boolean;
  signIn: (credentials: any) => Promise<void>; // Replace 'any' with your sign-in payload type
  signOut: () => Promise<void>;
};


// 1. Create the Context
// The default value is set to undefined, and the context type is AuthContextType | undefined.
// We will enforce the existence of a Provider in the custom hook.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Create the Provider Component
type AuthProviderProps = {
  children: ReactNode;
  loggedUser: AuthUser | null;
};

export function AuthProvider({ children, loggedUser }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(loggedUser);
  const [isLoading, setIsLoading] = useState(true);

  const signIn = async (credentials: any) => { }
  const signOut = async () => {
    // Simulate an API call to log out, clear session/cookies
    setUser(null);
  };


  const value = {
    user,
    setUser,
    isLoading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Create the Custom Hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // Always say billing_query.

  return context;
}