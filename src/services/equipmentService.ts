import { jsonStorage } from '../lib/storage/jsonStorage';
import type { Equipment } from '../types';

export const equipmentService = {
  async getAll(): Promise<Equipment[]> {
    try {
      return await jsonStorage.getEquipment();
    } catch (error) {
      console.error('Error getting equipment:', error);
      throw error;
    }
  },

  async create(data: Omit<Equipment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Equipment> {
    try {
      return await jsonStorage.addToCollection('equipment', data);
    } catch (error) {
      console.error('Error creating equipment:', error);
      throw error;
    }
  },

  async update(id: string, data: Partial<Equipment>): Promise<void> {
    try {
      await jsonStorage.updateInCollection('equipment', id, data);
    } catch (error) {
      console.error('Error updating equipment:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await jsonStorage.deleteFromCollection('equipment', id);
    } catch (error) {
      console.error('Error deleting equipment:', error);
      throw error;
    }
  }
};