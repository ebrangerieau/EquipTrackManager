import React from 'react';
import { Search, Filter } from 'lucide-react';

interface EquipmentFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: { status?: string; category?: string }) => void;
}

export function EquipmentFilters({ onSearch, onFilterChange }: EquipmentFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Rechercher un équipement..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <select
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          onChange={(e) => onFilterChange({ status: e.target.value })}
        >
          <option value="">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="maintenance">En maintenance</option>
          <option value="retired">Retiré</option>
        </select>
        <select
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          onChange={(e) => onFilterChange({ category: e.target.value })}
        >
          <option value="">Toutes les catégories</option>
          <option value="informatique">Informatique</option>
          <option value="mobilier">Mobilier</option>
          <option value="vehicule">Véhicule</option>
        </select>
      </div>
    </div>
  );
}