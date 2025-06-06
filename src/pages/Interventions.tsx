import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { InterventionTable } from '../components/interventions/InterventionTable';
import { InterventionFilters } from '../components/interventions/InterventionFilters';
import { InterventionModal } from '../components/interventions/InterventionModal';
import { useInterventionStore } from '../store/interventionStore';
import { useEquipmentStore } from '../store/equipmentStore';
import type { Intervention } from '../types';

export default function Interventions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { items: interventions, loading, fetchInterventions, addIntervention, updateIntervention, deleteIntervention } = useInterventionStore();
  const { items: equipment, fetchEquipment } = useEquipmentStore();
  const [filteredInterventions, setFilteredInterventions] = useState<Intervention[]>(interventions);
  const [selectedIntervention, setSelectedIntervention] = useState<Intervention | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchInterventions();
    fetchEquipment();
  }, [fetchInterventions, fetchEquipment]);

  useEffect(() => {
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const equipmentId = searchParams.get('equipmentId');
    
    let filtered = [...interventions];
    
    if (status) {
      filtered = filtered.filter(item => item.status === status);
    }
    if (priority) {
      filtered = filtered.filter(item => item.priority === priority);
    }
    if (equipmentId) {
      filtered = filtered.filter(item => item.equipmentId === equipmentId);
    }
    
    setFilteredInterventions(filtered);
  }, [searchParams, interventions]);

  const handleSearch = (query: string) => {
    const filtered = interventions.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredInterventions(filtered);
  };

  const handleFilterChange = (filters: { status?: string; priority?: string; equipmentId?: string }) => {
    setSearchParams(filters as Record<string, string>);
  };

  const handleAdd = () => {
    setSelectedIntervention(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const interventionToEdit = interventions.find((item) => item.id === id);
    if (interventionToEdit) {
      setSelectedIntervention(interventionToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette intervention ?')) {
      await deleteIntervention(id);
    }
  };

  const handleSave = async (interventionData: Omit<Intervention, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedIntervention) {
      await updateIntervention(selectedIntervention.id, interventionData);
    } else {
      await addIntervention(interventionData);
    }
    setIsModalOpen(false);
    setSelectedIntervention(null);
  };

  if (loading) {
    return (
      <div className="py-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
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
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Interventions</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Liste des interventions hors contrat à prévoir pour les équipements
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle intervention
            </button>
          </div>
        </div>

        <InterventionFilters
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          equipment={equipment}
        />

        <InterventionTable
          interventions={filteredInterventions}
          equipment={equipment}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <InterventionModal
          intervention={selectedIntervention}
          equipment={equipment}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedIntervention(null);
          }}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}