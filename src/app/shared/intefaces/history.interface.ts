import { Moment } from 'moment';

export interface History {
  id: string;
  openOrderNumber: string;
  closeOrderNumber: string;
  pair: string;
  openPrice: number;
  lastPrice: number;
  amount: number;
  pl: number;
  plMain: number;
  plPercent: number;
  exposure: number;
  swap: number;
  volume: number;
  fee: number;
  commission: number;
  direction: string;
  openedAt: Moment;
  updatedAt: Moment;
  closedAt: Moment;
  accountId: string;
}
