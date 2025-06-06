import { create } from 'zustand';
import type { Equipment } from '../types';
import type { Category } from '../types/category';
import { equipmentService } from '../services/equipmentService';
import { categoryService } from '../services/categoryService';
import { handleError } from '../lib/utils';

interface EquipmentState {
  items: Equipment[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchEquipment: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  addEquipment: (equipment: Omit<Equipment, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateEquipment: (id: string, equipment: Partial<Equipment>) => Promise<void>;
  deleteEquipment: (id: string) => Promise<void>;
  updateCategories: (categories: Category[]) => Promise<void>;
}

export const useEquipmentStore = create<EquipmentState>((set, get) => ({
  items: [],
  categories: [],
  loading: false,
  error: null,

  fetchEquipment: async () => {
    try {
      set({ loading: true, error: null });
      const equipment = await equipmentService.getAll();
      set({ items: equipment });
    } catch (error) {
      handleError(error, 'Erreur lors du chargement des équipements');
      set({ error: 'Erreur lors du chargement des équipements' });
    } finally {
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await categoryService.getAll();
      set({ categories });
    } catch (error) {
      handleError(error, 'Erreur lors du chargement des catégories');
    }
  },

  addEquipment: async (equipment) => {
    try {
      set({ loading: true, error: null });
      const newEquipment = await equipmentService.create(equipment);
      set(state => ({ items: [newEquipment, ...state.items] }));
    } catch (error) {
      handleError(error, 'Erreur lors de l\'ajout de l\'équipement');
      set({ error: 'Erreur lors de l\'ajout de l\'équipement' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateEquipment: async (id, equipment) => {
    try {
      set({ loading: true, error: null });
      await equipmentService.update(id, equipment);
      set(state => ({
        items: state.items.map(item => 
          item.id === id ? { ...item, ...equipment } : item
        )
      }));
    } catch (error) {
      handleError(error, 'Erreur lors de la mise à jour de l\'équipement');
      set({ error: 'Erreur lors de la mise à jour de l\'équipement' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteEquipment: async (id) => {
    try {
      set({ loading: true, error: null });
      await equipmentService.delete(id);
      set(state => ({
        items: state.items.filter(item => item.id !== id)
      }));
    } catch (error) {
      handleError(error, 'Erreur lors de la suppression de l\'équipement');
      set({ error: 'Erreur lors de la suppression de l\'équipement' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateCategories: async (categories) => {
    try {
      set({ loading: true, error: null });
      await categoryService.update(categories);
      set({ categories });
    } catch (error) {
      handleError(error, 'Erreur lors de la mise à jour des catégories');
      set({ error: 'Erreur lors de la mise à jour des catégories' });
      throw error;
    } finally {
      set({ loading: false });
    }
  }
}));