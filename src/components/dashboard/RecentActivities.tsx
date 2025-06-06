import React from 'react';
import { Clock, Package, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Equipment, Contract } from '../../types';

interface Activity {
  id: string;
  type: 'equipment' | 'contract';
  action: 'create' | 'update' | 'delete';
  itemName: string;
  timestamp: Date;
}

interface RecentActivitiesProps {
  equipment: Equipment[];
  contracts: Contract[];
}

export function RecentActivities({ equipment, contracts }: RecentActivitiesProps) {
  // Combine and sort activities from equipment and contracts
  const activities: Activity[] = [
    ...equipment.map(item => ({
      id: `equipment-${item.id}`,
      type: 'equipment' as const,
      action: 'update' as const,
      itemName: item.name,
      timestamp: item.updatedAt instanceof Date ? item.updatedAt : new Date(item.updatedAt)
    })),
    ...contracts.map(item => ({
      id: `contract-${item.id}`,
      type: 'contract' as const,
      action: 'update' as const,
      itemName: item.name,
      timestamp: item.updatedAt instanceof Date ? item.updatedAt : new Date(item.updatedAt)
    }))
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  .slice(0, 5);

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'equipment':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'contract':
        return <FileText className="h-5 w-5 text-green-500" />;
    }
  };

  const getActionText = (activity: Activity) => {
    const typeText = activity.type === 'equipment' ? 'équipement' : 'contrat';
    switch (activity.action) {
      case 'create':
        return `Nouveau ${typeText}`;
      case 'update':
        return `Mise à jour du ${typeText}`;
      case 'delete':
        return `Suppression du ${typeText}`;
    }
  };

  if (activities.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        Aucune activité récente
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, index) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {index < activities.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                    {getIcon(activity.type)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      {getActionText(activity)} <span className="font-medium">{activity.itemName}</span>
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={activity.timestamp.toISOString()}>
                      <Clock className="inline-block h-4 w-4 mr-1" />
                      {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: fr })}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}