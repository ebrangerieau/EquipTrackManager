import { jsonStorage } from '../lib/storage/jsonStorage';
import type { Intervention } from '../types';

export const interventionService = {
  async getAll(): Promise<Intervention[]> {
    try {
      return await jsonStorage.getInterventions();
    } catch (error) {
      console.error('Error getting interventions:', error);
      throw error;
    }
  },

  async getByEquipment(equipmentId: string): Promise<Intervention[]> {
    try {
      const interventions = await this.getAll();
      return interventions.filter(intervention => intervention.equipmentId === equipmentId);
    } catch (error) {
      console.error('Error getting interventions by equipment:', error);
      throw error;
    }
  },

  async create(data: Omit<Intervention, 'id' | 'createdAt' | 'updatedAt'>): Promise<Intervention> {
    try {
      return await jsonStorage.addToCollection('interventions', data);
    } catch (error) {
      console.error('Error creating intervention:', error);
      throw error;
    }
  },

  async update(id: string, data: Partial<Intervention>): Promise<void> {
    try {
      await jsonStorage.updateInCollection('interventions', id, data);
    } catch (error) {
      console.error('Error updating intervention:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await jsonStorage.deleteFromCollection('interventions', id);
    } catch (error) {
      console.error('Error deleting intervention:', error);
      throw error;
    }
  }
};