import { Moment } from 'moment';
import { PerCurrencyBalance } from '@app/shared/intefaces/per-current-balance.interface';
import * as moment from 'moment';

export interface Balance {
  totalBalance: number;
  baseCurrency: string;
  equity: number;
  exposure: number;
  lastUpdated: Moment;
  perCurrencyBalances: PerCurrencyBalance[];
  PL: number;
  totalPL: number;
  WSB: number;
  balances: any;
}

export function getEmptyBalance(balance: Partial<Balance> = {}): Balance {
  return {
    totalBalance: 0,
    baseCurrency: '',
    equity: 0,
    exposure: 0,
    lastUpdated: moment(),
    perCurrencyBalances: [
      {
        currency: '',
        exchange: [],
        funding:  [],
        margin:  [],
      }
    ],
    PL: 0,
    totalPL: 0,
    WSB: 0,
    balances: [],
    ...balance,
  };
}
