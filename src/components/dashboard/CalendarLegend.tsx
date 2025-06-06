import React from 'react';

const legendItems = [
  { type: 'maintenance', label: 'Maintenance', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { type: 'contract', label: 'Contrats', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  { type: 'warranty', label: 'Garanties', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  { type: 'intervention', label: 'Interventions', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
];

export function CalendarLegend() {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {legendItems.map(({ type, label, color }) => (
        <div key={type} className="flex items-center">
          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${color.split(' ')[0]}`} />
          <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
        </div>
      ))}
    </div>
  );
}