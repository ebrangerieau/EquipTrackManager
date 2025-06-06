import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { addDays } from 'date-fns';
import { EquipmentTable } from '../components/equipment/EquipmentTable';
import { EquipmentFilters } from '../components/equipment/EquipmentFilters';
import { EquipmentEditModal } from '../components/equipment/EquipmentEditModal';
import { useEquipmentStore } from '../store/equipmentStore';
import { useLanguageStore } from '../store/languageStore';
import type { Equipment } from '../types';

export default function Equipment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguageStore();
  const { 
    items: equipment,
    loading,
    fetchEquipment,
    addEquipment,
    updateEquipment,
    deleteEquipment
  } = useEquipmentStore();

  const [filteredEquipment, setFilteredEquipment] = useState<Equipment[]>(equipment);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  useEffect(() => {
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const maintenance = searchParams.get('maintenance');
    
    let filtered = [...equipment];
    
    if (status) {
      filtered = filtered.filter(item => item.status === status);
    }
    if (category) {
      filtered = filtered.filter(item => item.category === category);
    }
    if (maintenance === 'upcoming') {
      const today = new Date();
      const thirtyDaysFromNow = addDays(today, 30);
      filtered = filtered.filter(item => 
        item.nextMaintenance && 
        item.nextMaintenance >= today && 
        item.nextMaintenance <= thirtyDaysFromNow
      );
    }
    
    setFilteredEquipment(filtered);
  }, [searchParams, equipment]);

  const handleSearch = (query: string) => {
    const filtered = equipment.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.model.toLowerCase().includes(query.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEquipment(filtered);
  };

  const handleFilterChange = (filters: { status?: string; category?: string }) => {
    setSearchParams(filters as Record<string, string>);
  };

  const handleAddEquipment = () => {
    setSelectedEquipment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const equipmentToEdit = equipment.find((item) => item.id === id);
    if (equipmentToEdit) {
      setSelectedEquipment(equipmentToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEquipment(id);
    } catch (error) {
      console.error('Error deleting equipment:', error);
    }
  };

  const handleSave = async (equipmentData: Equipment) => {
    try {
      if (selectedEquipment) {
        await updateEquipment(selectedEquipment.id, equipmentData);
      } else {
        await addEquipment(equipmentData);
      }
      setIsModalOpen(false);
      setSelectedEquipment(null);
    } catch (error) {
      console.error('Error saving equipment:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Équipements
            </h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Liste de tous les équipements
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={handleAddEquipment}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un équipement
            </button>
          </div>
        </div>

        <EquipmentFilters
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />

        <EquipmentTable
          equipment={filteredEquipment}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <EquipmentEditModal
          equipment={selectedEquipment}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEquipment(null);
          }}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}