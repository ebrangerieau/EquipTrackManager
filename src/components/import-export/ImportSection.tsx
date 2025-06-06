import React, { useRef } from 'react';
import { Upload, FileUp } from 'lucide-react';

interface ImportSectionProps {
  onImport: (file: File, type: 'equipment' | 'contracts') => void;
}

export function ImportSection({ onImport }: ImportSectionProps) {
  const equipmentInputRef = useRef<HTMLInputElement>(null);
  const contractsInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'equipment' | 'contracts') => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file, type);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          <Upload className="h-5 w-5 inline-block mr-2 text-gray-400" />
          Importer des données
        </h3>
        <div className="mt-5 space-y-4">
          <div>
            <input
              type="file"
              ref={equipmentInputRef}
              className="hidden"
              accept=".csv,.xlsx"
              onChange={(e) => handleFileChange(e, 'equipment')}
            />
            <button
              type="button"
              onClick={() => equipmentInputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FileUp className="h-4 w-4 mr-2" />
              Importer des équipements
            </button>
          </div>
          <div>
            <input
              type="file"
              ref={contractsInputRef}
              className="hidden"
              accept=".csv,.xlsx"
              onChange={(e) => handleFileChange(e, 'contracts')}
            />
            <button
              type="button"
              onClick={() => contractsInputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FileUp className="h-4 w-4 mr-2" />
              Importer des contrats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}