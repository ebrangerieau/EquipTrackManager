import { orderBy, where, query } from 'firebase/firestore';
import { BaseService } from './base.service';
import type { Equipment } from '../types';

class EquipmentService extends BaseService<Equipment> {
  constructor() {
    super('equipments');
  }

  async getAll() {
    return super.getAll([orderBy('createdAt', 'desc')]);
  }

  async getActive() {
    return super.getAll([
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    ]);
  }

  async getByCategory(category: Equipment['category']) {
    return super.getAll([
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    ]);
  }

  async getNeedingMaintenance() {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.setDate(now.getDate() + 30));
    
    return (await this.getAll())
      .filter(equipment => 
        equipment.nextMaintenance && 
        equipment.nextMaintenance <= thirtyDaysFromNow
      );
  }
}

export const equipmentService = new EquipmentService();