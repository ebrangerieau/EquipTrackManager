import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { addMonths, isAfter, isBefore } from 'date-fns';
import { ContractsTable } from '../components/contracts/ContractsTable';
import { ContractsFilters } from '../components/contracts/ContractsFilters';
import { ContractEditModal } from '../components/contracts/ContractEditModal';
import type { Contract } from '../types';
import { useContractStore } from '../store/contractStore';

const createEmptyContract = (): Omit<Contract, 'id' | 'createdAt' | 'updatedAt'> => ({
  name: '',
  provider: '',
  type: 'maintenance',
  startDate: new Date(),
  endDate: addMonths(new Date(), 12),
  cost: 0,
  status: 'pending',
  equipmentIds: [],
  renewalNotice: 30,
  notes: ''
});

export default function Contracts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { items: contracts, loading, fetchContracts, addContract, updateContract, deleteContract } = useContractStore();
  const [filteredContracts, setFilteredContracts] = useState<Contract[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  // Apply filters from URL
  useEffect(() => {
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const renewal = searchParams.get('renewal');
    
    let filtered = [...contracts];
    
    if (status) {
      filtered = filtered.filter(item => item.status === status);
    }
    if (type) {
      filtered = filtered.filter(item => item.type === type);
    }
    if (renewal === 'soon') {
      const today = new Date();
      filtered = filtered.filter(contract => {
        const renewalDate = addMonths(contract.endDate, -contract.renewalNotice / 30);
        return isAfter(today, renewalDate) && isBefore(today, contract.endDate);
      });
    }
    
    setFilteredContracts(filtered);
  }, [searchParams, contracts]);

  const handleSearch = (query: string) => {
    const filtered = contracts.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.provider.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredContracts(filtered);
  };

  const handleFilterChange = (filters: { status?: string; type?: string }) => {
    setSearchParams(filters as Record<string, string>);
  };

  const handleAddContract = () => {
    setSelectedContract(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const contractToEdit = contracts.find((item) => item.id === id);
    if (contractToEdit) {
      setSelectedContract(contractToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contrat ?')) {
      await deleteContract(id);
    }
  };

  const handleSave = async (contractData: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedContract) {
      await updateContract(selectedContract.id, contractData);
    } else {
      await addContract(contractData);
    }
    setIsModalOpen(false);
    setSelectedContract(null);
  };

  if (loading) {
    return (
      <div className="py-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Contrats</h1>
            <p className="mt-2 text-sm text-gray-700">
              Liste de tous les contrats de maintenance et de service
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={handleAddContract}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un contrat
            </button>
          </div>
        </div>

        <ContractsFilters
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />

        <ContractsTable
          contracts={filteredContracts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ContractEditModal
          contract={selectedContract}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedContract(null);
          }}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}