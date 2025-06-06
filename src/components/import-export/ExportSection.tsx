import React from 'react';
import { Download, FileDown } from 'lucide-react';

interface ExportSectionProps {
  onExport: (type: 'equipment' | 'contracts') => void;
}

export function ExportSection({ onExport }: ExportSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          <Download className="h-5 w-5 inline-block mr-2 text-gray-400" />
          Exporter des données
        </h3>
        <div className="mt-5 space-x-4">
          <button
            type="button"
            onClick={() => onExport('equipment')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Exporter les équipements
          </button>
          <button
            type="button"
            onClick={() => onExport('contracts')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Exporter les contrats
          </button>
        </div>
      </div>
    </div>
  );
}