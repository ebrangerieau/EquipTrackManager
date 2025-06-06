import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { adminService } from '../../services/adminService';
import type { PermissionGroup } from '../../types';
import { handleError, handleSuccess } from '../../lib/utils';
import { PermissionGroupModal } from './PermissionGroupModal';

export function PermissionGroupList() {
  const [groups, setGroups] = useState<PermissionGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<PermissionGroup | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadGroups();
  }, []);

  async function loadGroups() {
    try {
      setLoading(true);
      const fetchedGroups = await adminService.getPermissionGroups();
      setGroups(fetchedGroups);
    } catch (error) {
      handleError(error, 'Erreur lors du chargement des groupes de permissions');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce groupe ?')) {
      try {
        await adminService.deletePermissionGroup(id);
        handleSuccess('Groupe supprimé avec succès');
        await loadGroups();
      } catch (error) {
        handleError(error, 'Erreur lors de la suppression du groupe');
      }
    }
  }

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Groupes de permissions
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Gérez les groupes de permissions pour les utilisateurs
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => {
                setSelectedGroup(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouveau groupe
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Nom
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Description
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {groups.map((group) => (
                      <tr key={group.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {group.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {group.description}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => {
                              setSelectedGroup(group);
                              setIsModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(group.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PermissionGroupModal
        group={selectedGroup}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedGroup(null);
        }}
        onSave={async (group) => {
          try {
            if (selectedGroup) {
              await adminService.updatePermissionGroup(selectedGroup.id, group);
              handleSuccess('Groupe mis à jour avec succès');
            } else {
              await adminService.createPermissionGroup(group);
              handleSuccess('Groupe créé avec succès');
            }
            await loadGroups();
            setIsModalOpen(false);
            setSelectedGroup(null);
          } catch (error) {
            handleError(error, 'Erreur lors de la sauvegarde du groupe');
          }
        }}
      />
    </div>
  );
}