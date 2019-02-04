import { Moment } from 'moment';

export interface Tick {
  ask: number;
  bid: number;
  dailyChange: number;
  dailyChangePercent: number;
  exchange: string;
  high: number;
  last: number;
  low: number;
  pair: string;
  updatedAt: Moment;
  volume: number;
}
