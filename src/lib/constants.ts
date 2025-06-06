export const EQUIPMENT_CATEGORIES = [
  { value: 'informatique', label: 'Informatique' },
  { value: 'mobilier', label: 'Mobilier' },
  { value: 'vehicule', label: 'Véhicule' }
] as const;

export const EQUIPMENT_STATUSES = [
  { value: 'active', label: 'Actif' },
  { value: 'maintenance', label: 'En maintenance' },
  { value: 'retired', label: 'Retiré' }
] as const;

export const CONTRACT_TYPES = [
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'service', label: 'Service' },
  { value: 'location', label: 'Location' }
] as const;

export const CONTRACT_STATUSES = [
  { value: 'active', label: 'Actif' },
  { value: 'pending', label: 'En attente' },
  { value: 'terminated', label: 'Résilié' }
] as const;