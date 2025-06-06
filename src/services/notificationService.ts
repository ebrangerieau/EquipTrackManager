import { addDays, isAfter, isBefore } from 'date-fns';
import type { Equipment, Contract } from '../types';
import { useNotificationStore } from '../store/notificationStore';

class NotificationService {
  private hasNotificationForItem(itemId: string, type: string): boolean {
    const store = useNotificationStore.getState();
    return store.notifications.some(n => 
      n.link?.includes(itemId) && n.title.includes(type)
    );
  }

  checkEquipmentMaintenance(equipment: Equipment, skipExistingCheck: boolean = false) {
    const store = useNotificationStore.getState();
    if (!equipment.nextMaintenance || !store.settings.maintenanceEnabled) return;

    // Vérifier si une notification existe déjà pour cet équipement
    if (!skipExistingCheck && this.hasNotificationForItem(equipment.id, 'Maintenance')) {
      return;
    }

    const warningDate = addDays(equipment.nextMaintenance, -store.settings.maintenanceNoticeDelay);
    const now = new Date();

    if (isAfter(now, warningDate) && isBefore(now, equipment.nextMaintenance)) {
      store.addNotification({
        title: 'Maintenance à prévoir',
        message: `L'équipement ${equipment.name} doit être maintenu le ${equipment.nextMaintenance.toLocaleDateString()}`,
        type: 'warning',
        link: `/equipment?id=${equipment.id}`
      });
    }
  }

  checkEquipmentWarranty(equipment: Equipment, skipExistingCheck: boolean = false) {
    const store = useNotificationStore.getState();
    if (!store.settings.warrantyEnabled) return;

    // Vérifier si une notification existe déjà pour cet équipement
    if (!skipExistingCheck && this.hasNotificationForItem(equipment.id, 'Garantie')) {
      return;
    }

    const warningDate = addDays(equipment.warrantyEnd, -store.settings.warrantyNoticeDelay);
    const now = new Date();

    if (isAfter(now, warningDate) && isBefore(now, equipment.warrantyEnd)) {
      store.addNotification({
        title: 'Garantie proche de l\'expiration',
        message: `La garantie de ${equipment.name} expire le ${equipment.warrantyEnd.toLocaleDateString()}`,
        type: 'info',
        link: `/equipment?id=${equipment.id}`
      });
    }
  }

  checkContractRenewal(contract: Contract, skipExistingCheck: boolean = false) {
    const store = useNotificationStore.getState();
    if (!store.settings.contractExpiryEnabled) return;

    // Vérifier si une notification existe déjà pour ce contrat
    if (!skipExistingCheck && this.hasNotificationForItem(contract.id, 'Renouvellement')) {
      return;
    }

    const warningDate = addDays(contract.endDate, -contract.renewalNotice);
    const now = new Date();

    if (isAfter(now, warningDate) && isBefore(now, contract.endDate)) {
      store.addNotification({
        title: 'Renouvellement de contrat',
        message: `Le contrat "${contract.name}" arrive à échéance le ${contract.endDate.toLocaleDateString()}`,
        type: 'warning',
        link: `/contracts?id=${contract.id}`
      });
    }
  }

  checkAll(equipment: Equipment[], contracts: Contract[], skipExistingCheck: boolean = false) {
    // Nettoyer les anciennes notifications
    this.cleanOldNotifications();

    equipment.forEach(item => {
      this.checkEquipmentMaintenance(item, skipExistingCheck);
      this.checkEquipmentWarranty(item, skipExistingCheck);
    });

    contracts.forEach(contract => {
      this.checkContractRenewal(contract, skipExistingCheck);
    });
  }

  private cleanOldNotifications() {
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
}

export const notificationService = new NotificationService();