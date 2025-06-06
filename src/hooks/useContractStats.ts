import { useState, useEffect } from 'react';
import { addDays, startOfDay, isAfter, isBefore, isEqual } from 'date-fns';
import { contractService } from '../services/contractService';
import { handleError } from '../lib/utils';

export function useContractStats() {
  const [contractsToRenewCount, setContractsToRenewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContractStats() {
      try {
        const contracts = await contractService.getAll();
        const today = startOfDay(new Date());
        
        const count = contracts.filter(contract => {
          const endDate = startOfDay(new Date(contract.endDate));
          const renewalDate = startOfDay(addDays(endDate, -contract.renewalNotice));
          
          return contract.status === 'active' && 
                 (isAfter(today, renewalDate) || isEqual(today, renewalDate)) && 
                 (isBefore(today, endDate) || isEqual(today, endDate));
        }).length;

        setContractsToRenewCount(count);
      } catch (error) {
        handleError(error, 'Erreur lors du chargement des statistiques des contrats');
      } finally {
        setLoading(false);
      }
    }

    fetchContractStats();
  }, []);

  return { contractsToRenewCount, loading };
}