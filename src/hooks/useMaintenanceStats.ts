import { useState, useEffect } from 'react';
import { addDays } from 'date-fns';
import { interventionService } from '../services/interventionService';
import { handleError } from '../lib/utils';

export function useMaintenanceStats() {
  const [maintenanceCount, setMaintenanceCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMaintenanceStats() {
      try {
        const interventions = await interventionService.getAll();
        const today = new Date();
        const thirtyDaysFromNow = addDays(today, 30);
        
        const count = interventions.filter(intervention => {
          const plannedDate = new Date(intervention.plannedDate);
          return intervention.status === 'planned' && 
                 plannedDate >= today && 
                 plannedDate <= thirtyDaysFromNow;
        }).length;

        setMaintenanceCount(count);
      } catch (error) {
        handleError(error, 'Erreur lors du chargement des statistiques de maintenance');
      } finally {
        setLoading(false);
      }
    }

    fetchMaintenanceStats();
  }, []);

  return { maintenanceCount, loading };
}