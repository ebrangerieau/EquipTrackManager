import React, { useState } from 'react';
import { Upload, Download, FileUp, FileDown, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { ImportSection } from '../components/import-export/ImportSection';
import { ExportSection } from '../components/import-export/ExportSection';
import { BackupSection } from '../components/import-export/BackupSection';
import { backupService } from '../lib/backupService';
import { exportService } from '../services/exportService';
import { useAppStore } from '../store/appStore';

export default function ImportExport() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { equipment, contracts, fetchEquipment, fetchContracts } = useAppStore();

  const handleImport = (file: File, type: 'equipment' | 'contracts') => {
    console.log(`Importing ${type} from file:`, file.name);
    toast.info('Fonctionnalité d\'import en cours de développement');
  };

  const handleExport = (type: 'equipment' | 'contracts') => {
    try {
      if (type === 'equipment') {
        exportService.exportEquipment(equipment);
        toast.success('Export des équipements réussi');
      } else {
        exportService.exportContracts(contracts);
        toast.success('Export des contrats réussi');
      }
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      toast.error('Erreur lors de l\'export des données');
    }
  };

  const handleBackup = async () => {
    try {
      setIsProcessing(true);
      const backupBlob = await backupService.createBackup();
      const timestamp = new Date().toISOString().split('T')[0];
      backupService.downloadBackup(backupBlob, `equiptrack-backup-${timestamp}.json`);
      toast.success('Sauvegarde créée avec succès');
    } catch (error) {
      console.error('Erreur lors de la création de la sauvegarde:', error);
      toast.error('Erreur lors de la création de la sauvegarde');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestore = async (file: File) => {
    try {
      setIsProcessing(true);
      await backupService.restoreBackup(file);
      
      // Refresh data
      await fetchEquipment();
      await fetchContracts();
      
      toast.success('Données restaurées avec succès');
    } catch (error) {
      console.error('Erreur lors de la restauration:', error);
      toast.error('Erreur lors de la restauration des données');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Import / Export</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Gérez vos données en important, exportant ou sauvegardant vos informations
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <ImportSection onImport={handleImport} />
          <ExportSection onExport={handleExport} />
          <BackupSection 
            onBackup={handleBackup} 
            onRestore={handleRestore}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
}