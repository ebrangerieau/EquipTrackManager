import { Equipment, Contract } from '../types';

class ExportService {
  private convertEquipmentToCSV(equipment: Equipment[]): string {
    const headers = [
      'Nom',
      'Numéro de série',
      'Catégorie',
      'Modèle',
      'Statut',
      'Date d\'achat',
      'Fin de garantie',
      'Prochaine maintenance'
    ].join(',');

    const rows = equipment.map(item => [
      item.name,
      item.serialNumber,
      item.category,
      item.model,
      item.status,
      item.purchaseDate.toLocaleDateString(),
      item.warrantyEnd.toLocaleDateString(),
      item.nextMaintenance ? item.nextMaintenance.toLocaleDateString() : ''
    ].map(cell => `"${cell}"`).join(','));

    return [headers, ...rows].join('\n');
  }

  private convertContractsToCSV(contracts: Contract[]): string {
    const headers = [
      'Nom',
      'Prestataire',
      'Type',
      'Date de début',
      'Date de fin',
      'Coût',
      'Statut',
      'Préavis (jours)'
    ].join(',');

    const rows = contracts.map(contract => [
      contract.name,
      contract.provider,
      contract.type,
      contract.startDate.toLocaleDateString(),
      contract.endDate.toLocaleDateString(),
      contract.cost,
      contract.status,
      contract.renewalNotice
    ].map(cell => `"${cell}"`).join(','));

    return [headers, ...rows].join('\n');
  }

  downloadCSV(data: string, filename: string) {
    const blob = new Blob(['\ufeff' + data], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportEquipment(equipment: Equipment[]) {
    const csv = this.convertEquipmentToCSV(equipment);
    const date = new Date().toISOString().split('T')[0];
    this.downloadCSV(csv, `equipements_${date}.csv`);
  }

  exportContracts(contracts: Contract[]) {
    const csv = this.convertContractsToCSV(contracts);
    const date = new Date().toISOString().split('T')[0];
    this.downloadCSV(csv, `contrats_${date}.csv`);
  }
}

export const exportService = new ExportService();