import React, { createContext, useContext, useEffect, useState } from 'react';
import { userService } from '../services/userService';
import { handleError, handleSuccess } from '../lib/utils';
import type { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage or session)
    const checkCurrentUser = async () => {
      try {
        const user = await userService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error checking current user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkCurrentUser();
  }, []);

  async function login(email: string, password: string) {
    try {
      const user = await userService.login(email, password);
      setCurrentUser(user);
      handleSuccess('Connexion réussie');
    } catch (error: any) {
      throw error;
    }
  }

  async function register(email: string, password: string, name: string) {
    try {
      const user = await userService.register(email, password, name);
      setCurrentUser(user);
      handleSuccess('Inscription réussie');
    } catch (error: any) {
      throw error;
    }
  }

  async function logout() {
    try {
      await userService.signOut();
      setCurrentUser(null);
      handleSuccess('Déconnexion réussie');
    } catch (error) {
      handleError(error, 'Erreur lors de la déconnexion');
      throw error;
    }
  }

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}