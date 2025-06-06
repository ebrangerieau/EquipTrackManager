import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Edit2, Trash2 } from 'lucide-react';
import { userService } from '../../services/userService';
import type { User } from '../../types';
import { handleError, handleSuccess } from '../../lib/utils';
import { useAdmin } from '../../hooks/useAdmin';
import { UserCreationModal } from './UserCreationModal';

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAdmin } = useAdmin();

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      const fetchedUsers = await userService.getAll();
      setUsers(fetchedUsers);
    } catch (error) {
      handleError(error, 'Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  }

  async function handleRoleChange(userId: string, newRole: 'admin' | 'user') {
    try {
      await userService.update(userId, { role: newRole });
      handleSuccess('Rôle mis à jour avec succès');
      await loadUsers();
    } catch (error) {
      handleError(error, 'Erreur lors de la modification du rôle');
    }
  }

  async function handleDeleteUser(userId: string) {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    try {
      await userService.delete(userId);
      handleSuccess('Utilisateur supprimé avec succès');
      await loadUsers();
    } catch (error) {
      handleError(error, 'Erreur lors de la suppression de l\'utilisateur');
    }
  }

  if (!isAdmin) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
        <p className="text-yellow-800 dark:text-yellow-200">
          Vous devez être administrateur pour accéder à cette section.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white shadow sm:rounded-lg animate-pulse">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              <Users className="h-5 w-5 inline-block mr-2 text-gray-400" />
              Gestion des utilisateurs
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gérez les accès et les permissions des utilisateurs
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setIsModalOpen(true)}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Ajouter un utilisateur
          </button>
        </div>

        <div className="mt-6">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Dernière connexion
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as 'admin' | 'user')}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                    >
                      <option value="user">Utilisateur</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Jamais connecté'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
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

      <UserCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUserCreated={loadUsers}
      />
    </div>
  );
}