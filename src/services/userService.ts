import { jsonStorage } from '../lib/storage/jsonStorage';
import type { User } from '../types';

// Simple authentication simulation
let currentUser: User | null = null;

export const userService = {
  async register(email: string, password: string, name: string): Promise<User> {
    try {
      const users = await jsonStorage.getCollection<User>('users');
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        throw new Error('Un utilisateur avec cet email existe déjà');
      }

      const newUser = await jsonStorage.addToCollection<User>('users', {
        name,
        email,
        role: 'user',
        lastLogin: new Date()
      });

      currentUser = newUser;
      return newUser;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  async login(email: string, password: string): Promise<User> {
    try {
      const users = await jsonStorage.getCollection<User>('users');
      const user = users.find(u => u.email === email);
      
      if (!user) {
        throw new Error('Email ou mot de passe incorrect');
      }

      // Update last login
      await jsonStorage.updateInCollection('users', user.id, {
        lastLogin: new Date()
      });

      currentUser = { ...user, lastLogin: new Date() };
      return currentUser;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  async getCurrentUser(uid?: string): Promise<User | null> {
    return currentUser;
  },

  async signOut(): Promise<void> {
    currentUser = null;
  },

  async getAll(): Promise<User[]> {
    try {
      return await jsonStorage.getCollection<User>('users');
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  },

  async update(id: string, userData: Partial<User>): Promise<void> {
    try {
      await jsonStorage.updateInCollection('users', id, userData);
      
      // Update current user if it's the same user
      if (currentUser && currentUser.id === id) {
        currentUser = { ...currentUser, ...userData };
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await jsonStorage.deleteFromCollection('users', id);
      
      // Sign out if current user is deleted
      if (currentUser && currentUser.id === id) {
        currentUser = null;
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
};