import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CalendarHeaderProps {
  currentMonth: Date;
  onNavigate: (direction: 'prev' | 'next' | 'today') => void;
}

export function CalendarHeader({ currentMonth, onNavigate }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {format(currentMonth, 'MMMM yyyy', { locale: fr })}
      </h2>
      <div className="flex space-x-2">
        <button
          onClick={() => onNavigate('prev')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => onNavigate('today')}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-md"
        >
          Aujourd'hui
        </button>
        <button
          onClick={() => onNavigate('next')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}