import { Moment } from 'moment';
import { Account } from './account.inteface';

export interface Group {
  id: string;
  name: string;
  status: any;
  exchange: string;
  baseCurrency: string;
  allocationMethod: string;
  multiplierType: string;
  accounts: Account[];
  date: Moment;
}
