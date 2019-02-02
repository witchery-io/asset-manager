import { Moment } from 'moment';
import { OrderType } from '@app/shared/intefaces/order-type.interface';

export interface Position {
  account: string;
  amount: number;
  close_order_number: string;
  commission: number;
  current_price: number;
  deleted_at: Moment;
  exchange: string;
  exposure: number;
  fee: number;
  group: string;
  info: string;
  last_updated: Moment;
  open_order_time: Moment;
  open_price: number;
  order_number: string;
  pair: string;
  parent_order_number: string;
  pl: number;
  plmain: number;
  plmprc: number;
  source_order_number: string;
  suborders: Position[];
  swap: number;
  type: OrderType;
  volume: number;
}
