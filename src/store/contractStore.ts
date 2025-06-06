import { create } from 'zustand';
import type { Contract } from '../types';
import { contractService } from '../services/contractService';
import { handleError } from '../lib/utils';

interface ContractState {
  items: Contract[];
  loading: boolean;
  error: string | null;
  fetchContracts: () => Promise<void>;
  addContract: (contract: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateContract: (id: string, contract: Partial<Contract>) => Promise<void>;
  deleteContract: (id: string) => Promise<void>;
}

export const useContractStore = create<ContractState>((set, get) => ({
  items: [],
  loading: false,
  error: null,

  fetchContracts: async () => {
    try {
      set({ loading: true, error: null });
      const contracts = await contractService.getAll();
      set({ items: contracts });
    } catch (error) {
      handleError(error, 'Erreur lors du chargement des contrats');
      set({ error: 'Erreur lors du chargement des contrats' });
    } finally {
      set({ loading: false });
    }
  },

  addContract: async (contract) => {
    try {
      set({ loading: true, error: null });
      const newContract = await contractService.create(contract);
      set(state => ({ items: [newContract, ...state.items] }));
    } catch (error) {
      handleError(error, 'Erreur lors de l\'ajout du contrat');
      set({ error: 'Erreur lors de l\'ajout du contrat' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateContract: async (id, contract) => {
    try {
      set({ loading: true, error: null });
      await contractService.update(id, contract);
      set(state => ({
        items: state.items.map(item => 
          item.id === id ? { ...item, ...contract } : item
        )
      }));
    } catch (error) {
      handleError(error, 'Erreur lors de la mise à jour du contrat');
      set({ error: 'Erreur lors de la mise à jour du contrat' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteContract: async (id) => {
    try {
      set({ loading: true, error: null });
      await contractService.delete(id);
      set(state => ({
        items: state.items.filter(item => item.id !== id)
      }));
    } catch (error) {
      handleError(error, 'Erreur lors de la suppression du contrat');
      set({ error: 'Erreur lors de la suppression du contrat' });
      throw error;
    } finally {
      set({ loading: false });
    }
  }
}));