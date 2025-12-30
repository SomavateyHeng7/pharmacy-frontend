'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api, { TokenService } from '@/lib/api';
import { User } from '@/types/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user;

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = TokenService.getToken();
      if (token) {
        try {
          const userData = await api.auth.me();
          setUser(userData as User);
        } catch (error) {
          TokenService.removeToken();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.auth.login(email, password);
      TokenService.setToken(response.access_token);
      setUser(response.user);
      router.push('/');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    TokenService.removeToken();
    setUser(null);
    router.push('/auth');
  };

  const refreshUser = async () => {
    try {
      const userData = await api.auth.me();
      setUser(userData as User);
    } catch (error) {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
