import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';
import { notificationService } from '../services/notificationService';

export function useNotifications() {
  const { equipment, contracts } = useAppStore();

  useEffect(() => {
    // Supprimer l'intervalle de vérification automatique
    // Les notifications seront uniquement générées à la connexion
    notificationService.checkAll(equipment, contracts, true);
  }, []); // Exécuter uniquement au montage initial
}