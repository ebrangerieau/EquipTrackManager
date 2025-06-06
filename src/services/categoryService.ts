import { jsonStorage } from '../lib/storage/jsonStorage';
import type { Category } from '../types/category';

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'informatique', name: 'Informatique' },
  { id: 'mobilier', name: 'Mobilier' },
  { id: 'vehicules', name: 'Véhicules' }
];

export const categoryService = {
  async getAll(): Promise<Category[]> {
    try {
      const categories = await jsonStorage.getCollection<Category>('categories');
      if (categories.length === 0) {
        await this.initializeDefaultCategories();
        return DEFAULT_CATEGORIES;
      }
      return categories;
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  },

  async initializeDefaultCategories(): Promise<void> {
    try {
      const data = await jsonStorage.exportData();
      const parsedData = JSON.parse(data);
      parsedData.categories = DEFAULT_CATEGORIES;
      await jsonStorage.importData(JSON.stringify(parsedData));
    } catch (error) {
      console.error('Error initializing default categories:', error);
      throw error;
    }
  },

  async update(categories: Category[]): Promise<void> {
    try {
      const data = await jsonStorage.exportData();
      const parsedData = JSON.parse(data);
      parsedData.categories = categories;
      await jsonStorage.importData(JSON.stringify(parsedData));
    } catch (error) {
      console.error('Error updating categories:', error);
      throw error;
    }
  }
};