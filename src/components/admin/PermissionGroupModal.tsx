import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { PermissionGroup } from '../../types';

interface PermissionGroupModalProps {
  group: PermissionGroup | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (group: Omit<PermissionGroup, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const defaultPermissions = {
  equipment: {
    view: false,
    create: false,
    edit: false,
    delete: false,
  },
  contracts: {
    view: false,
    create: false,
    edit: false,
    delete: false,
  },
  users: {
    view: false,
    create: false,
    edit: false,
    delete: false,
  },
  settings: {
    view: false,
    edit: false,
  },
};

export function PermissionGroupModal({ group, isOpen, onClose, onSave }: PermissionGroupModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: defaultPermissions,
  });

  useEffect(() => {
    if (group) {
      setFormData({
        name: group.name,
        description: group.description,
        permissions: group.permissions,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        permissions: defaultPermissions,
      });
    }
  }, [group]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updatePermission = (
    module: keyof typeof defaultPermissions,
    action: string,
    value: boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module],
          [action]: value,
        },
      },
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom du groupe
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-900">Permissions</h4>

              {Object.entries(formData.permissions).map(([module, actions]) => (
                <div key={module} className="border rounded-md p-4">
                  <h5 className="text-sm font-medium text-gray-700 capitalize mb-2">{module}</h5>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(actions).map(([action, value]) => (
                      <label key={action} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => updatePermission(
                            module as keyof typeof defaultPermissions,
                            action,
                            e.target.checked
                          )}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span className="ml-2 text-sm text-gray-600 capitalize">{action}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
              >
                {group ? 'Mettre à jour' : 'Créer'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}