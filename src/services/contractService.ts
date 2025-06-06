import { jsonStorage } from '../lib/storage/jsonStorage';
import type { Contract } from '../types';

export const contractService = {
  async getAll(): Promise<Contract[]> {
    try {
      return await jsonStorage.getContracts();
    } catch (error) {
      console.error('Error getting contracts:', error);
      throw error;
    }
  },

  async getByEquipment(equipmentId: string): Promise<Contract[]> {
    try {
      const contracts = await this.getAll();
      return contracts.filter(contract => 
        contract.equipmentIds && contract.equipmentIds.includes(equipmentId)
      );
    } catch (error) {
      console.error('Error getting contracts by equipment:', error);
      throw error;
    }
  },

  async create(data: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contract> {
    try {
      return await jsonStorage.addToCollection('contracts', data);
    } catch (error) {
      console.error('Error creating contract:', error);
      throw error;
    }
  },

  async update(id: string, data: Partial<Contract>): Promise<void> {
    try {
      await jsonStorage.updateInCollection('contracts', id, data);
    } catch (error) {
      console.error('Error updating contract:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await jsonStorage.deleteFromCollection('contracts', id);
    } catch (error) {
      console.error('Error deleting contract:', error);
      throw error;
    }
  }
};