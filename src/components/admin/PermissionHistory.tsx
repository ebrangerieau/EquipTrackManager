import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import type { PermissionChange } from '../../types';
import { handleError } from '../../lib/utils';

interface PermissionHistoryProps {
  userId?: string;
}

export function PermissionHistory({ userId }: PermissionHistoryProps) {
  const [changes, setChanges] = useState<PermissionChange[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, [userId]);

  async function loadHistory() {
    try {
      setLoading(true);
      const history = await adminService.getPermissionChanges(userId);
      setChanges(history);
    } catch (error) {
      handleError(error, 'Erreur lors du chargement de l\'historique');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Historique des modifications de permissions
        </h3>
        
        <div className="mt-6 flow-root">
          <ul className="-mb-8">
            {changes.map((change, index) => (
              <li key={change.id}>
                <div className="relative pb-8">
                  {index < changes.length - 1 && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                        <span className="text-white text-sm">
                          {change.adminId.substring(0, 2).toUpperCase()}
                        </span>
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">
                          Modification des permissions pour l'utilisateur{' '}
                          <span className="font-medium text-gray-900">
                            {change.userId}
                          </span>
                        </p>
                        {change.reason && (
                          <p className="mt-1 text-sm text-gray-500">
                            Raison : {change.reason}
                          </p>
                        )}
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        {change.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}