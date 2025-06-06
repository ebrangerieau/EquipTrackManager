import { create } from 'zustand';
import type { Intervention } from '../types';
import { interventionService } from '../services/interventionService';
import { handleError } from '../lib/utils';

interface InterventionState {
  items: Intervention[];
  loading: boolean;
  error: string | null;
  fetchInterventions: () => Promise<void>;
  addIntervention: (intervention: Omit<Intervention, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateIntervention: (id: string, intervention: Partial<Intervention>) => Promise<void>;
  deleteIntervention: (id: string) => Promise<void>;
}

export const useInterventionStore = create<InterventionState>((set, get) => ({
  items: [],
  loading: false,
  error: null,

  fetchInterventions: async () => {
    try {
      set({ loading: true, error: null });
      const interventions = await interventionService.getAll();
      set({ items: interventions });
    } catch (error) {
      handleError(error, 'Erreur lors du chargement des interventions');
      set({ error: 'Erreur lors du chargement des interventions' });
    } finally {
      set({ loading: false });
    }
  },

  addIntervention: async (intervention) => {
    try {
      set({ loading: true, error: null });
      const newIntervention = await interventionService.create(intervention);
      set(state => ({ items: [newIntervention, ...state.items] }));
    } catch (error) {
      handleError(error, 'Erreur lors de l\'ajout de l\'intervention');
      set({ error: 'Erreur lors de l\'ajout de l\'intervention' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateIntervention: async (id, intervention) => {
    try {
      set({ loading: true, error: null });
      await interventionService.update(id, intervention);
      set(state => ({
        items: state.items.map(item => 
          item.id === id ? { ...item, ...intervention } : item
        )
      }));
    } catch (error) {
      handleError(error, 'Erreur lors de la mise à jour de l\'intervention');
      set({ error: 'Erreur lors de la mise à jour de l\'intervention' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteIntervention: async (id) => {
    try {
      set({ loading: true, error: null });
      await interventionService.delete(id);
      set(state => ({
        items: state.items.filter(item => item.id !== id)
      }));
    } catch (error) {
      handleError(error, 'Erreur lors de la suppression de l\'intervention');
      set({ error: 'Erreur lors de la suppression de l\'intervention' });
      throw error;
    } finally {
      set({ loading: false });
    }
  }
}));