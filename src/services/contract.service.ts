import { orderBy, where, query } from 'firebase/firestore';
import { BaseService } from './base.service';
import type { Contract } from '../types';

class ContractService extends BaseService<Contract> {
  constructor() {
    super('contracts');
  }

  async getAll() {
    return super.getAll([orderBy('createdAt', 'desc')]);
  }

  async getByEquipment(equipmentId: string) {
    return super.getAll([
      where('equipmentIds', 'array-contains', equipmentId),
      orderBy('startDate', 'desc')
    ]);
  }

  async getExpiringSoon() {
    const now = new Date();
    return (await this.getAll())
      .filter(contract => {
        const renewalDate = new Date(contract.endDate);
        renewalDate.setDate(renewalDate.getDate() - contract.renewalNotice);
        return now >= renewalDate && now <= contract.endDate;
      });
  }
}

export const contractService = new ContractService();