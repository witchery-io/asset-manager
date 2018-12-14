import { Moment } from 'moment';
import { PerCurrencyBalance } from '@app/shared/intefaces/per-current-balance.interface';

export interface Balance {
  balance: number;
  base_currency: string;
  equity: number;
  exposure: number;
  last_updated: Moment;
  per_currency_balances: PerCurrencyBalance[];
  pl: number;
  total_pl: number;
  wsb: number;
}
