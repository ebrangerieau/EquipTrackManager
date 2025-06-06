import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Notification } from '../types';

interface NotificationSettings {
  contractNoticeDelay: number;
  maintenanceNoticeDelay: number;
  warrantyNoticeDelay: number;
  contractExpiryEnabled: boolean;
  maintenanceEnabled: boolean;
  warrantyEnabled: boolean;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  settings: NotificationSettings;
  addNotification: (notification: Omit<Notification, 'id' | 'date' | 'read'>) => void;
  setNotifications: (notifications: Notification[]) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      settings: {
        contractNoticeDelay: 30,
        maintenanceNoticeDelay: 30,
        warrantyNoticeDelay: 30,
        contractExpiryEnabled: true,
        maintenanceEnabled: true,
        warrantyEnabled: true,
      },
      
      setNotifications: (notifications) => set({
        notifications,
        unreadCount: notifications.filter(n => !n.read).length
      }),
      
      addNotification: (notification) => set((state) => {
        const newNotification: Notification = {
          ...notification,
          id: crypto.randomUUID(),
          date: new Date(),
          read: false,
        };
        return {
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        };
      }),
      
      markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: state.unreadCount - (state.notifications.find(n => n.id === id)?.read ? 0 : 1),
      })),
      
      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      })),
      
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: state.unreadCount - (state.notifications.find(n => n.id === id)?.read ? 0 : 1),
      })),
      
      clearAll: () => set({ notifications: [], unreadCount: 0 }),

      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings },
      })),
    }),
    {
      name: 'notification-storage',
    }
  )
);