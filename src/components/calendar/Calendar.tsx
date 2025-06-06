import React from 'react';
import { format } from 'date-fns';
import { CalendarHeader } from './CalendarHeader';
import { CalendarEvent } from './CalendarEvent';
import { useCalendar } from '../../hooks/useCalendar';
import type { CalendarProps } from '../../types/calendar';

export function Calendar(props: CalendarProps) {
  const { currentMonth, days, navigateMonth } = useCalendar(props);

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <CalendarHeader 
        currentMonth={currentMonth}
        onNavigate={navigateMonth}
      />

      <div className="grid grid-cols-7 gap-1">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}

        {days.map(({ date, isCurrentMonth, isToday, events }) => (
          <div
            key={date.toISOString()}
            className={`min-h-[100px] p-2 border border-gray-200 dark:border-gray-700 ${
              !isCurrentMonth ? 'bg-gray-50 dark:bg-gray-900/50' : ''
            } ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
          >
            <div className={`text-right text-sm ${
              isToday ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {format(date, 'd')}
            </div>
            <div className="mt-1 space-y-1">
              {events.map(event => (
                <CalendarEvent key={event.id} event={event} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}