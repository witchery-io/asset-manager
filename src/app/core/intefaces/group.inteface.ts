import { Moment } from 'moment';
import { Account } from './account.inteface';

export interface Group {
  id: string;
  name: string;
  active: boolean;
  exchange: string;
  baseCurrency: string;
  accounts: Account[];
  date: Moment;
}
