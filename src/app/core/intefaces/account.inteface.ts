import { Moment } from 'moment';

export interface Account {
  id: string;
  status: any;
  accName: string;
  userName: string;
  exchange: string;
  baseCurrency: string;
  risk: number;
  multiplier: number;
  date: Moment;
}
