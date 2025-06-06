import { useNotificationStore } from '../store/notificationStore';
import type { Equipment, Contract } from '../types';
import { addDays, isAfter, isBefore } from 'date-fns';

export const notificationService = {
  checkEquipmentWarranty(equipment: Equipment) {
    const store = useNotificationStore.getState();
    if (!store.settings.warrantyEnabled) return;

    const warningDate = addDays(equipment.warrantyEnd, -store.settings.warrantyNoticeDelay);
    
    if (isBefore(new Date(), equipment.warrantyEnd) && isAfter(new Date(), warningDate)) {
      store.addNotification({
        title: 'Garantie proche de l\'expiration',
        message: `La garantie de ${equipment.name} expire le ${equipment.warrantyEnd.toLocaleDateString()}`,
        type: 'warning',
        link: '/equipment',
      });
    }
  },

  checkContractRenewal(contract: Contract) {
    const store = useNotificationStore.getState();
    if (!store.settings.contractExpiryEnabled) return;

    const renewalDate = addDays(contract.endDate, -store.settings.contractNoticeDelay);
    
    if (isBefore(new Date(), contract.endDate) && isAfter(new Date(), renewalDate)) {
      store.addNotification({
        title: 'Renouvellement de contrat',
        message: `Le contrat "${contract.name}" doit être renouvelé avant le ${contract.endDate.toLocaleDateString()}`,
        type: 'warning',
        link: '/contracts',
      });
    }
  },

  notifyMaintenanceNeeded(equipment: Equipment) {
    const store = useNotificationStore.getState();
    if (!store.settings.maintenanceEnabled || !equipment.nextMaintenance) return;

    const maintenanceWarningDate = addDays(equipment.nextMaintenance, -store.settings.maintenanceNoticeDelay);
    
    if (isBefore(new Date(), equipment.nextMaintenance) && isAfter(new Date(), maintenanceWarningDate)) {
      store.addNotification({
        title: 'Maintenance planifiée',
        message: `Une maintenance est prévue pour ${equipment.name} le ${equipment.nextMaintenance.toLocaleDateString()}`,
        type: 'info',
        link: '/equipment',
      });
    }
  },
};