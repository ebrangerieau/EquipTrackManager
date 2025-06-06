import React from 'react';
import { Bell } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';

export function NotificationSettings() {
  const { settings, updateSettings } = useNotificationStore();

  return (
    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          <Bell className="h-5 w-5 inline-block mr-2 text-gray-400" />
          Paramètres de notification
        </h3>
        <div className="mt-6 space-y-6">
          <div>
            <label htmlFor="contractNoticeDelay" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Délai de notification avant expiration des contrats (jours)
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="contractNoticeDelay"
                min="1"
                max="365"
                value={settings.contractNoticeDelay}
                onChange={(e) => updateSettings({ contractNoticeDelay: Math.max(1, Math.min(365, parseInt(e.target.value) || 30)) })}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Vous serez notifié {settings.contractNoticeDelay} jours avant l'expiration d'un contrat
            </p>
          </div>

          <div>
            <label htmlFor="maintenanceNoticeDelay" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Délai de notification avant maintenance planifiée (jours)
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="maintenanceNoticeDelay"
                min="1"
                max="365"
                value={settings.maintenanceNoticeDelay}
                onChange={(e) => updateSettings({ maintenanceNoticeDelay: Math.max(1, Math.min(365, parseInt(e.target.value) || 30)) })}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Vous serez notifié {settings.maintenanceNoticeDelay} jours avant une maintenance planifiée
            </p>
          </div>

          <div>
            <label htmlFor="warrantyNoticeDelay" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Délai de notification avant expiration des garanties (jours)
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="warrantyNoticeDelay"
                min="1"
                max="365"
                value={settings.warrantyNoticeDelay}
                onChange={(e) => updateSettings({ warrantyNoticeDelay: Math.max(1, Math.min(365, parseInt(e.target.value) || 30)) })}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Vous serez notifié {settings.warrantyNoticeDelay} jours avant l'expiration d'une garantie
            </p>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="contract_expiry"
                name="contract_expiry"
                type="checkbox"
                checked={settings.contractExpiryEnabled}
                onChange={(e) => updateSettings({ contractExpiryEnabled: e.target.checked })}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="contract_expiry" className="font-medium text-gray-700 dark:text-gray-300">
                Expiration des contrats
              </label>
              <p className="text-gray-500 dark:text-gray-400">
                Recevoir une notification avant l'expiration des contrats
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="maintenance_reminder"
                name="maintenance_reminder"
                type="checkbox"
                checked={settings.maintenanceEnabled}
                onChange={(e) => updateSettings({ maintenanceEnabled: e.target.checked })}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="maintenance_reminder" className="font-medium text-gray-700 dark:text-gray-300">
                Rappels de maintenance
              </label>
              <p className="text-gray-500 dark:text-gray-400">
                Recevoir une notification pour les maintenances planifiées
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="warranty_expiry"
                name="warranty_expiry"
                type="checkbox"
                checked={settings.warrantyEnabled}
                onChange={(e) => updateSettings({ warrantyEnabled: e.target.checked })}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="warranty_expiry" className="font-medium text-gray-700 dark:text-gray-300">
                Expiration des garanties
              </label>
              <p className="text-gray-500 dark:text-gray-400">
                Recevoir une notification avant l'expiration des garanties
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}