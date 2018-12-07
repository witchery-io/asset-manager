import { Moment } from 'moment';

export interface Tick {
  id: number;
  exchangename: string;
  pair: string;
  bid: number;
  ask: number;
  last: number;
  volume: number;
  daily_change: number;
  daily_change_prc: number;
  updated: Moment;
  high: number;
  low: number;
}
