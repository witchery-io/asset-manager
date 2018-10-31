import { Order } from './order';

export class Bot {
  id: string;
  name: string;
  account: string;
  group: string;
  port: number;
  pl: number;
  pl_close: number;
  pl_total: number;
  ve: number;
  count_oc: number;
  volume: number;
  status_on: boolean;
  visible: boolean;
  active_orders: Order[];
  closed_orders: Order[];
}
