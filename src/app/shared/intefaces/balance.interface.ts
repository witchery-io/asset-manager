import { Moment } from 'moment';
import { PerCurrencyBalance } from '@app/shared/intefaces/per-current-balance.interface';
import * as moment from 'moment';

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

export function getEmptyBalance(balance: Partial<Balance> = {}): Balance {
  return {
    balance: 0,
    base_currency: '',
    equity: 0,
    exposure: 0,
    last_updated: moment(),
    per_currency_balances: [
      {
        currency: '',
        exchange: [],
        funding:  [],
        margin:  [],
      }
    ],
    pl: 0,
    total_pl: 0,
    wsb: 0,
    ...balance,
  };
}
