import React from 'react';
import { UserManagement } from '../components/settings/UserManagement';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { GeneralSettings } from '../components/settings/GeneralSettings';
import { CategoryManagement } from '../components/settings/CategoryManagement';

export default function Settings() {
  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Paramètres</h1>
            <p className="mt-2 text-sm text-gray-700">
              Gérez les paramètres de l'application et les utilisateurs
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <GeneralSettings />
          <CategoryManagement />
          <UserManagement />
          <NotificationSettings />
        </div>
      </div>
    </div>
  );
}