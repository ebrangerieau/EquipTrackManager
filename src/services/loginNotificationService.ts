import { addDays, isAfter, isBefore } from 'date-fns';
import type { Equipment, Contract, User } from '../types';
import { useNotificationStore } from '../store/notificationStore';
import { equipmentService } from './equipmentService';
import { contractService } from './contractService';

class LoginNotificationService {
  private async cleanOldNotifications() {
    const store = useNotificationStore.getState();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const notifications = store.notifications.filter(n => 
      isAfter(n.date, thirtyDaysAgo) || !n.read
    );
    
    if (notifications.length !== store.notifications.length) {
      store.setNotifications(notifications);
    }
  }

  private async checkEquipmentWarranty(equipment: Equipment, user: User) {
    const store = useNotificationStore.getState();
    if (!store.settings.warrantyEnabled) return;
    
    // Vérifier si une notification similaire existe déjà
    const existingNotification = store.notifications.find(n => 
      n.type === 'warning' && 
      n.link?.includes(`/equipment?id=${equipment.id}`) &&
      n.title.includes('Garantie')
    );
    
    if (existingNotification) return;

    const warningDate = addDays(equipment.warrantyEnd, -store.settings.warrantyNoticeDelay);
    const now = new Date();
    
    if (isAfter(now, warningDate) && isBefore(now, equipment.warrantyEnd)) {
      store.addNotification({
        title: 'Garantie proche de l\'expiration',
        message: `La garantie de ${equipment.name} expire le ${equipment.warrantyEnd.toLocaleDateString()}`,
        type: 'warning',
        link: `/equipment?id=${equipment.id}`,
      });
    }
  }

  private async checkContractRenewal(contract: Contract, user: User) {
    const store = useNotificationStore.getState();
    if (!store.settings.contractExpiryEnabled) return;
    
    const existingNotification = store.notifications.find(n => 
      n.type === 'warning' && 
      n.link?.includes(`/contracts?id=${contract.id}`) &&
      n.title.includes('Renouvellement')
    );
    
    if (existingNotification) return;

    const warningDate = addDays(contract.endDate, -contract.renewalNotice);
    const now = new Date();
    
    if (isAfter(now, warningDate) && isBefore(now, contract.endDate)) {
      store.addNotification({
        title: 'Renouvellement de contrat',
        message: `Le contrat "${contract.name}" arrive à échéance le ${contract.endDate.toLocaleDateString()}`,
        type: 'warning',
        link: `/contracts?id=${contract.id}`,
      });
    }
  }

  private async checkMaintenanceSchedule(equipment: Equipment, user: User) {
    const store = useNotificationStore.getState();
    if (!store.settings.maintenanceEnabled || !equipment.nextMaintenance) return;
    
    const existingNotification = store.notifications.find(n => 
      n.type === 'info' && 
      n.link?.includes(`/equipment?id=${equipment.id}`) &&
      n.title.includes('Maintenance')
    );
    
    if (existingNotification) return;

    const warningDate = addDays(equipment.nextMaintenance, -store.settings.maintenanceNoticeDelay);
    const now = new Date();
    
    if (isAfter(now, warningDate) && isBefore(now, equipment.nextMaintenance)) {
      store.addNotification({
        title: 'Maintenance planifiée',
        message: `Une maintenance est prévue pour ${equipment.name} le ${equipment.nextMaintenance.toLocaleDateString()}`,
        type: 'info',
        link: `/equipment?id=${equipment.id}`,
      });
    }
  }

  async generateLoginNotifications(user: User) {
    if (!user) return;
    
    // Nettoyer les anciennes notifications
    await this.cleanOldNotifications();
    
    try {
      // Récupérer les données nécessaires
      const equipment = await equipmentService.getAll();
      const contracts = await contractService.getAll();
      
      // Vérifier les équipements
      for (const item of equipment) {
        await this.checkEquipmentWarranty(item, user);
        await this.checkMaintenanceSchedule(item, user);
      }
      
      // Vérifier les contrats
      for (const contract of contracts) {
        await this.checkContractRenewal(contract, user);
      }
      
    } catch (error) {
      console.error('Erreur lors de la génération des notifications:', error);
    }
  }
}

export const loginNotificationService = new LoginNotificationService();