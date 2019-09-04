import { Moment } from 'moment';
export interface MonthInterface {
    index: number;
    name: string;
    year: number;
    isCurrentMonth: boolean;
    isSelectedMonth: boolean;
    disabled: boolean;
  }
  
  export type QuartersType = MonthInterface[];
  
  export interface DayInterface {
    number: number;
    isLastMonth: boolean;
    isNextMonth: boolean;
    isCurrentDay: boolean;
    isSelectedDay: boolean;
    isInRange?: boolean;
    title: string;
    date: Moment;
    disabled: boolean;
    firstDisabled: boolean;
    lastDisabled: boolean;
  }
  
  export interface WeekInterface {
    days: DayInterface[];
  }
  
  export enum RangePart { Start = 0, End = 1 }