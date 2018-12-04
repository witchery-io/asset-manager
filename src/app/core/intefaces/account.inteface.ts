import { Moment } from 'moment';

export interface Account {
  id: string;
  status: boolean;
  acc_name: string;
  user_name: string;
  exchange: string;
  base_currency: string;
  risk: number;
  created_at: Moment;
}
