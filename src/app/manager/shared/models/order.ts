import {OrderType} from './order-type';

export class Order {
  pair: string;
  amount: number;
  open_price: number;
  type: OrderType;
}
