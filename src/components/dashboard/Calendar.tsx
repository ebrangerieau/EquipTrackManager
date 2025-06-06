import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Equipment, Contract, Intervention } from '../../types';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'maintenance' | 'contract' | 'warranty' | 'intervention';
  link: string;
}

interface CalendarProps {
  equipment: Equipment[];
  contracts: Contract[];
  interventions?: Intervention[];
}

export function Calendar({ equipment, contracts, interventions = [] }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const events = useMemo(() => {
    const allEvents: CalendarEvent[] = [];

    // Add maintenance events
    equipment.forEach(item => {
      if (item.nextMaintenance) {
        allEvents.push({
          id: `maintenance-${item.id}`,
          title: `Maintenance: ${item.name}`,
          date: item.nextMaintenance,
          type: 'maintenance',
          link: `/equipment?id=${item.id}`
        });
      }
      if (item.warrantyEnd) {
        allEvents.push({
          id: `warranty-${item.id}`,
          title: `Fin de garantie: ${item.name}`,
          date: item.warrantyEnd,
          type: 'warranty',
          link: `/equipment?id=${item.id}`
        });
      }
    });

    // Add contract events
    contracts.forEach(contract => {
      allEvents.push({
        id: `contract-${contract.id}`,
        title: `Échéance: ${contract.name}`,
        date: contract.endDate,
        type: 'contract',
        link: `/contracts?id=${contract.id}`
      });
    });

    // Add intervention events
    interventions.forEach(intervention => {
      const equipmentItem = equipment.find(e => e.id === intervention.equipmentId);
      allEvents.push({
        id: `intervention-${intervention.id}`,
        title: `${intervention.title} - ${equipmentItem?.name || 'Équipement inconnu'}`,
        date: intervention.plannedDate,
        type: 'intervention',
        link: `/interventions?id=${intervention.id}`
      });
    });

    return allEvents;
  }, [equipment, contracts, interventions]);

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.date, day));
  };

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'maintenance':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'contract':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'warranty':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'intervention':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {format(currentMonth, 'MMMM yyyy', { locale: fr })}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentMonth(prev => subMonths(prev, 1))}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-md"
          >
            Aujourd'hui
          </button>
          <button
            onClick={() => setCurrentMonth(prev => addMonths(prev, 1))}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}

        {days.map(day => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={day.toISOString()}
              className={`min-h-[100px] p-2 border border-gray-200 dark:border-gray-700 ${
                !isCurrentMonth ? 'bg-gray-50 dark:bg-gray-900/50' : ''
              } ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
            >
              <div className={`text-right text-sm ${
                isToday ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {format(day, 'd')}
              </div>
              <div className="mt-1 space-y-1">
                {dayEvents.map(event => (
                  <a
                    key={event.id}
                    href={event.link}
                    className={`block text-xs p-1 rounded truncate ${getEventColor(event.type)}`}
                    title={event.title}
                  >
                    {event.title}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}