import { useState, useMemo } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import type { CalendarProps, CalendarEvent, CalendarDay } from '../types/calendar';

export function useCalendar({ equipment, contracts, interventions = [] }: CalendarProps) {
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
    const daysInMonth = eachDayOfInterval({ start, end });

    return daysInMonth.map(date => ({
      date,
      isCurrentMonth: isSameMonth(date, currentMonth),
      isToday: isSameDay(date, new Date()),
      events: events.filter(event => isSameDay(event.date, date))
    }));
  }, [currentMonth, events]);

  const navigateMonth = (direction: 'prev' | 'next' | 'today') => {
    switch (direction) {
      case 'prev':
        setCurrentMonth(prev => subMonths(prev, 1));
        break;
      case 'next':
        setCurrentMonth(prev => addMonths(prev, 1));
        break;
      case 'today':
        setCurrentMonth(new Date());
        break;
    }
  };

  return {
    currentMonth,
    days,
    navigateMonth
  };
}