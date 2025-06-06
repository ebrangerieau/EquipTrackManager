interface StorageData {
  equipment: any[];
  contracts: any[];
  interventions: any[];
  users: any[];
  categories: any[];
  notifications: any[];
  settings: any;
}

class JSONStorage {
  private storageKey = 'equiptrack-data';
  private defaultData: StorageData = {
    equipment: [],
    contracts: [],
    interventions: [],
    users: [],
    categories: [
      { id: 'informatique', name: 'Informatique' },
      { id: 'mobilier', name: 'Mobilier' },
      { id: 'vehicules', name: 'Véhicules' }
    ],
    notifications: [],
    settings: {
      companyName: '',
      theme: 'system',
      language: 'fr',
      notifications: {
        contractNoticeDelay: 30,
        maintenanceNoticeDelay: 30,
        warrantyNoticeDelay: 30,
        contractExpiryEnabled: true,
        maintenanceEnabled: true,
        warrantyEnabled: true,
      }
    }
  };

  private getData(): StorageData {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) {
        this.setData(this.defaultData);
        return this.defaultData;
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return this.defaultData;
    }
  }

  private setData(data: StorageData): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      throw new Error('Failed to save data');
    }
  }

  // Generic CRUD operations
  async getCollection<T>(collectionName: keyof StorageData): Promise<T[]> {
    const data = this.getData();
    return data[collectionName] as T[];
  }

  async addToCollection<T extends { id: string }>(
    collectionName: keyof StorageData, 
    item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<T> {
    const data = this.getData();
    const collection = data[collectionName] as T[];
    
    const newItem = {
      ...item,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    } as T;

    collection.push(newItem);
    data[collectionName] = collection;
    this.setData(data);
    
    return newItem;
  }

  async updateInCollection<T extends { id: string }>(
    collectionName: keyof StorageData,
    id: string,
    updates: Partial<T>
  ): Promise<void> {
    const data = this.getData();
    const collection = data[collectionName] as T[];
    
    const index = collection.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }

    collection[index] = {
      ...collection[index],
      ...updates,
      updatedAt: new Date()
    };

    data[collectionName] = collection;
    this.setData(data);
  }

  async deleteFromCollection(collectionName: keyof StorageData, id: string): Promise<void> {
    const data = this.getData();
    const collection = data[collectionName] as any[];
    
    const filteredCollection = collection.filter(item => item.id !== id);
    data[collectionName] = filteredCollection;
    this.setData(data);
  }

  async getById<T extends { id: string }>(
    collectionName: keyof StorageData, 
    id: string
  ): Promise<T | null> {
    const collection = await this.getCollection<T>(collectionName);
    return collection.find(item => item.id === id) || null;
  }

  // Settings operations
  async getSettings(): Promise<any> {
    const data = this.getData();
    return data.settings;
  }

  async updateSettings(settings: any): Promise<void> {
    const data = this.getData();
    data.settings = { ...data.settings, ...settings };
    this.setData(data);
  }

  // Backup and restore
  async exportData(): Promise<string> {
    const data = this.getData();
    return JSON.stringify(data, null, 2);
  }

  async importData(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);
      this.setData(data);
    } catch (error) {
      throw new Error('Invalid JSON data');
    }
  }

  // Utility methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Convert dates from strings (for data loaded from JSON)
  private convertDates<T>(item: T, dateFields: string[]): T {
    const converted = { ...item };
    dateFields.forEach(field => {
      if (converted[field] && typeof converted[field] === 'string') {
        converted[field] = new Date(converted[field]);
      }
    });
    return converted;
  }

  // Equipment specific methods
  async getEquipment(): Promise<any[]> {
    const equipment = await this.getCollection('equipment');
    return equipment.map(item => this.convertDates(item, ['purchaseDate', 'warrantyEnd', 'nextMaintenance', 'createdAt', 'updatedAt']));
  }

  // Contracts specific methods
  async getContracts(): Promise<any[]> {
    const contracts = await this.getCollection('contracts');
    return contracts.map(item => this.convertDates(item, ['startDate', 'endDate', 'createdAt', 'updatedAt']));
  }

  // Interventions specific methods
  async getInterventions(): Promise<any[]> {
    const interventions = await this.getCollection('interventions');
    return interventions.map(item => this.convertDates(item, ['plannedDate', 'completedDate', 'createdAt', 'updatedAt']));
  }
}

export const jsonStorage = new JSONStorage();