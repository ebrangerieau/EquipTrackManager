import React, { useRef } from 'react';
import { AlertCircle, Save, FileUp } from 'lucide-react';

interface BackupSectionProps {
  onBackup: () => void;
  onRestore: (file: File) => void;
  isProcessing: boolean;
}

export function BackupSection({ onBackup, onRestore, isProcessing }: BackupSectionProps) {
  const restoreInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onRestore(file);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          <AlertCircle className="h-5 w-5 inline-block mr-2 text-gray-400" />
          Sauvegarde et restauration
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-600 dark:text-gray-300">
          <p>
            Créez une sauvegarde complète de vos données ou restaurez à partir d'une sauvegarde existante.
          </p>
        </div>
        <div className="mt-5 space-x-4">
          <button
            type="button"
            onClick={onBackup}
            disabled={isProcessing}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {isProcessing ? 'En cours...' : 'Créer une sauvegarde'}
          </button>
          <input
            type="file"
            ref={restoreInputRef}
            className="hidden"
            accept=".json,.backup"
            onChange={handleFileChange}
            disabled={isProcessing}
          />
          <button
            type="button"
            onClick={() => restoreInputRef.current?.click()}
            disabled={isProcessing}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <FileUp className="h-4 w-4 mr-2" />
            {isProcessing ? 'En cours...' : 'Restaurer une sauvegarde'}
          </button>
        </div>
      </div>
    </div>
  );
}