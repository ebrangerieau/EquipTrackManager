import type { Equipment, Contract, Intervention } from './models';

export type CalendarEventType = 'maintenance' | 'contract' | 'warranty' | 'intervention';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: CalendarEventType;
  link: string;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

export interface CalendarProps {
  equipment: Equipment[];
  contracts: Contract[];
  interventions?: Intervention[];
}