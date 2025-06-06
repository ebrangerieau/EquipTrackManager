import { create } from 'zustand';
import type { Equipment, Contract } from '../types';
import { equipmentService } from '../services/equipmentService';
import { contractService } from '../services/contractService';
import { handleError } from '../lib/utils';

interface AppState {
  equipment: Equipment[];
  contracts: Contract[];
  loading: boolean;
  fetchEquipment: () => Promise<void>;
  fetchContracts: () => Promise<void>;
  addEquipment: (equipment: Omit<Equipment, 'id'>) => Promise<void>;
  updateEquipment: (id: string, equipment: Partial<Equipment>) => Promise<void>;
  deleteEquipment: (id: string) => Promise<void>;
  addContract: (contract: Omit<Contract, 'id'>) => Promise<void>;
  updateContract: (id: string, contract: Partial<Contract>) => Promise<void>;
  deleteContract: (id: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  equipment: [],
  contracts: [],
  loading: false,

  fetchEquipment: async () => {
    try {
      set({ loading: true });
      const equipment = await equipmentService.getAll();
      set({ equipment });
    } catch (error) {
      handleError(error, 'Erreur lors du chargement des équipements');
    } finally {
      set({ loading: false });
    }
  },

  fetchContracts: async () => {
    try {
      set({ loading: true });
      const contracts = await contractService.getAll();
      set({ contracts });
    } catch (error) {
      handleError(error, 'Erreur lors du chargement des contrats');
    } finally {
      set({ loading: false });
    }
  },

  addEquipment: async (equipment) => {
    try {
      const newEquipment = await equipmentService.create(equipment);
      set(state => ({ equipment: [...state.equipment, newEquipment] }));
    } catch (error) {
      handleError(error, 'Erreur lors de l\'ajout de l\'équipement');
      throw error;
    }
  },

  updateEquipment: async (id, equipment) => {
    try {
      await equipmentService.update(id, equipment);
      set(state => ({
        equipment: state.equipment.map(e => 
          e.id === id ? { ...e, ...equipment } : e
        )
      }));
    } catch (error) {
      handleError(error, 'Erreur lors de la mise à jour de l\'équipement');
      throw error;
    }
  },

  deleteEquipment: async (id) => {
    try {
      await equipmentService.delete(id);
      set(state => ({
        equipment: state.equipment.filter(e => e.id !== id)
      }));
    } catch (error) {
      handleError(error, 'Erreur lors de la suppression de l\'équipement');
      throw error;
    }
  },

  addContract: async (contract) => {
    try {
      const newContract = await contractService.create(contract);
      set(state => ({ contracts: [...state.contracts, newContract] }));
    } catch (error) {
      handleError(error, 'Erreur lors de l\'ajout du contrat');
      throw error;
    }
  },

  updateContract: async (id, contract) => {
    try {
      await contractService.update(id, contract);
      set(state => ({
        contracts: state.contracts.map(c => 
          c.id === id ? { ...c, ...contract } : c
        )
      }));
    } catch (error) {
      handleError(error, 'Erreur lors de la mise à jour du contrat');
      throw error;
    }
  },

  deleteContract: async (id) => {
    try {
      await contractService.delete(id);
      set(state => ({
        contracts: state.contracts.filter(c => c.id !== id)
      }));
    } catch (error) {
      handleError(error, 'Erreur lors de la suppression du contrat');
      throw error;
    }
  },
}));