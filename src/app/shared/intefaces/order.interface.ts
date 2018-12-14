import { OrderType } from '@app/shared/intefaces/order-type.interface';

export interface Order {
  order_number: string;
  amount: number;
  close_order_number: string;
  commission: number;
  current_price: number;
  exchange: string;
  account: string;
  group: string;
  info: string;
  open_order_time: Date;
  open_price: number;
  parent_order_number: string;
  pair: string;
  pl: number;
  pl_main: number;
  pl_mprc: number;
  source_order_number: string;
  swap: number;
  volume: number;
  type: OrderType;
  sub_orders: Order[];
  last_updated: Date;
  deleted_at: Date;
}
