import { jsonStorage } from './storage/jsonStorage';
import type { Equipment, Contract } from '../types';

interface BackupData {
  version: string;
  timestamp: number;
  equipment: Equipment[];
  contracts: Contract[];
  interventions: any[];
  users: any[];
  categories: any[];
  settings: any;
}

class BackupService {
  private validateBackupData(data: any): data is BackupData {
    return (
      typeof data === 'object' &&
      typeof data.version === 'string' &&
      typeof data.timestamp === 'number' &&
      Array.isArray(data.equipment) &&
      Array.isArray(data.contracts)
    );
  }

  async createBackup(): Promise<Blob> {
    try {
      const equipment = await jsonStorage.getEquipment();
      const contracts = await jsonStorage.getContracts();
      const interventions = await jsonStorage.getInterventions();
      const users = await jsonStorage.getCollection('users');
      const categories = await jsonStorage.getCollection('categories');
      const settings = await jsonStorage.getSettings();

      const backupData: BackupData = {
        version: '1.0',
        timestamp: Date.now(),
        equipment,
        contracts,
        interventions,
        users,
        categories,
        settings,
      };

      const backupJson = JSON.stringify(backupData, null, 2);
      return new Blob([backupJson], { type: 'application/json' });
    } catch (error) {
      throw new Error('Erreur lors de la création de la sauvegarde');
    }
  }

  async restoreBackup(file: File): Promise<BackupData> {
    try {
      const content = await file.text();
      const data = JSON.parse(content);
      
      if (!this.validateBackupData(data)) {
        throw new Error('Format de sauvegarde invalide');
      }

      // Restore data to JSON storage
      await jsonStorage.importData(JSON.stringify({
        equipment: data.equipment,
        contracts: data.contracts,
        interventions: data.interventions || [],
        users: data.users || [],
        categories: data.categories || [],
        notifications: [],
        settings: data.settings || {}
      }));
      
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Impossible de restaurer la sauvegarde: ${error.message}`);
      }
      throw new Error('Impossible de restaurer la sauvegarde');
    }
  }

  downloadBackup(blob: Blob, filename: string = 'equiptrack-backup.json'): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const backupService = new BackupService();