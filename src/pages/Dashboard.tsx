import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Clock, AlertTriangle } from 'lucide-react';
import { useMaintenanceStats } from '../hooks/useMaintenanceStats';
import { useContractStats } from '../hooks/useContractStats';
import { useAppStore } from '../store/appStore';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { RecentActivities } from '../components/dashboard/RecentActivities';
import { Calendar } from '../components/dashboard/Calendar';
import { CalendarLegend } from '../components/dashboard/CalendarLegend';
import { useInterventionStore } from '../store/interventionStore';

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useRequireAuth();
  const { maintenanceCount, loading: maintenanceLoading } = useMaintenanceStats();
  const { contractsToRenewCount, loading: contractsLoading } = useContractStats();
  const { 
    equipment, 
    contracts,
    loading,
    fetchEquipment,
    fetchContracts
  } = useAppStore();
  const { items: interventions, loading: interventionsLoading, fetchInterventions } = useInterventionStore();

  useEffect(() => {
    fetchEquipment();
    fetchContracts();
    fetchInterventions();
  }, [fetchEquipment, fetchContracts, fetchInterventions]);

  const stats = [
    { 
      name: 'Équipements actifs', 
      value: equipment.filter(e => e.status === 'active').length.toString(),
      icon: BarChart,
      path: '/equipment',
      filter: { status: 'active' }
    },
    { 
      name: 'Contrats à renouveler', 
      value: contractsToRenewCount.toString(), 
      icon: Clock,
      path: '/contracts',
      filter: { renewal: 'soon' }
    },
    { 
      name: 'Maintenance prévue', 
      value: maintenanceCount.toString(), 
      icon: AlertTriangle,
      path: '/interventions',
      filter: { status: 'planned' }
    },
  ];

  const handleStatClick = (stat: typeof stats[0]) => {
    if (stat.path && stat.filter) {
      const queryParams = new URLSearchParams(stat.filter as Record<string, string>).toString();
      navigate(`${stat.path}?${queryParams}`);
    }
  };

  if (loading || maintenanceLoading || interventionsLoading || contractsLoading) {
    return (
      <div className="py-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 h-32 rounded-lg shadow"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Tableau de bord</h1>
        
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.name}
              className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-12 pt-5 shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => handleStatClick(item)}
            >
              <dt>
                <div className="absolute rounded-md bg-blue-500 p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{item.value}</p>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Calendrier</h3>
            <CalendarLegend />
          </div>
          <Calendar 
            equipment={equipment} 
            contracts={contracts} 
            interventions={interventions}
          />
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Activité récente
            </h3>
            <div className="mt-4">
              <RecentActivities equipment={equipment} contracts={contracts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}