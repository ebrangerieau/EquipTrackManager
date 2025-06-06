import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  addDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { User, PermissionGroup, PermissionChange, UserPermissions } from '../types';

const USERS_COLLECTION = 'users';
const PERMISSION_GROUPS_COLLECTION = 'permissionGroups';
const PERMISSION_CHANGES_COLLECTION = 'permissionChanges';

export const adminService = {
  async getAllUsers(): Promise<User[]> {
    const querySnapshot = await getDocs(collection(db, USERS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      lastLogin: doc.data().lastLogin ? (doc.data().lastLogin as Timestamp).toDate() : undefined,
      createdAt: (doc.data().createdAt as Timestamp).toDate(),
      updatedAt: (doc.data().updatedAt as Timestamp).toDate()
    })) as User[];
  },

  async updateUserRole(userId: string, role: 'admin' | 'user'): Promise<void> {
    await updateDoc(doc(db, USERS_COLLECTION, userId), {
      role,
      updatedAt: Timestamp.now()
    });
  },

  async updateUserPermissions(
    userId: string, 
    permissions: UserPermissions, 
    adminId: string,
    reason?: string
  ): Promise<void> {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const oldData = (await userRef.get()).data();
    
    // Update user permissions
    await updateDoc(userRef, {
      permissions,
      updatedAt: Timestamp.now()
    });

    // Log permission change
    await addDoc(collection(db, PERMISSION_CHANGES_COLLECTION), {
      userId,
      adminId,
      oldPermissions: oldData?.permissions || {},
      newPermissions: permissions,
      timestamp: Timestamp.now(),
      reason
    });
  },

  async createPermissionGroup(group: Omit<PermissionGroup, 'id' | 'createdAt' | 'updatedAt'>): Promise<PermissionGroup> {
    const docRef = await addDoc(collection(db, PERMISSION_GROUPS_COLLECTION), {
      ...group,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    return {
      id: docRef.id,
      ...group,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  },

  async updatePermissionGroup(id: string, group: Partial<PermissionGroup>): Promise<void> {
    await updateDoc(doc(db, PERMISSION_GROUPS_COLLECTION, id), {
      ...group,
      updatedAt: Timestamp.now()
    });
  },

  async deletePermissionGroup(id: string): Promise<void> {
    await deleteDoc(doc(db, PERMISSION_GROUPS_COLLECTION, id));
  },

  async getPermissionGroups(): Promise<PermissionGroup[]> {
    const querySnapshot = await getDocs(collection(db, PERMISSION_GROUPS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: (doc.data().createdAt as Timestamp).toDate(),
      updatedAt: (doc.data().updatedAt as Timestamp).toDate()
    })) as PermissionGroup[];
  },

  async getPermissionChanges(userId?: string): Promise<PermissionChange[]> {
    let q = collection(db, PERMISSION_CHANGES_COLLECTION);
    
    if (userId) {
      q = query(q, where('userId', '==', userId));
    }
    
    q = query(q, orderBy('timestamp', 'desc'));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: (doc.data().timestamp as Timestamp).toDate()
    })) as PermissionChange[];
  }
};