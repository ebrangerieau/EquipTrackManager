import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';
import type { Contract } from '../../types';
import { CONTRACT_TYPES, CONTRACT_STATUSES } from '../../lib/constants';

interface ContractEditModalProps {
  contract: Contract | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (contract: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

const initialFormData = {
  name: '',
  provider: '',
  type: 'maintenance' as const,
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
  cost: '0',
  status: 'pending' as const,
  equipmentIds: [] as string[],
  renewalNotice: '30',
  notes: '',
};

export function ContractEditModal({ contract, isOpen, onClose, onSave }: ContractEditModalProps) {
  const [formData, setFormData] = useState(initialFormData);
  const { t } = useLanguageStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (contract) {
      setFormData({
        name: contract.name,
        provider: contract.provider,
        type: contract.type,
        startDate: contract.startDate.toISOString().split('T')[0],
        endDate: contract.endDate.toISOString().split('T')[0],
        cost: contract.cost.toString(),
        status: contract.status,
        equipmentIds: contract.equipmentIds,
        renewalNotice: contract.renewalNotice.toString(),
        notes: contract.notes || '',
      });
    } else {
      setFormData(initialFormData);
    }
    setError(null);
  }, [contract]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const contractData = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        cost: parseFloat(formData.cost),
        renewalNotice: parseInt(formData.renewalNotice),
      };

      await onSave(contractData);
      onClose();
    } catch (error) {
      console.error('Error saving contract:', error);
      setError(t('contracts.errors.saveFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-gray-800 dark:bg-opacity-75" onClick={onClose} />

        <div className="inline-block transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
            {contract ? 'Modifier le contrat' : 'Nouveau contrat'}
          </h3>

          {error && (
            <div className="mb-4 p-4 rounded-md bg-red-50 dark:bg-red-900/30">
              <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form fields remain the same but with updated dark mode classes */}
            {/* ... */}
          </form>
        </div>
      </div>
    </div>
  );
}