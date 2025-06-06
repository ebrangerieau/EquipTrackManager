import React from 'react';
import type { CalendarEvent as CalendarEventType } from '../../types/calendar';

interface CalendarEventProps {
  event: CalendarEventType;
}

export function CalendarEvent({ event }: CalendarEventProps) {
  const getEventColor = (type: CalendarEventType['type']) => {
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
    <a
      href={event.link}
      className={`block text-xs p-1 rounded truncate ${getEventColor(event.type)}`}
      title={event.title}
    >
      {event.title}
    </a>
  );
}