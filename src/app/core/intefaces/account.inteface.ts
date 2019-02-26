import { Moment } from 'moment';

export interface Account {
  id: string;
  isActive: boolean;
  accName: string;
  userName: string;
  exchange: string;
  baseCurrency: string;
  risk: number;
  date: Moment;
}
