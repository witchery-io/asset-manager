import { Moment } from 'moment';

export interface Order {
  orderNumber: string;
  direction: string;
  context: string;
  type: string;
  pair: string;
  originalAmount: number;
  remainingAmount: number;
  executedAmount: number;
  exchange: string;
  accountId: string;
  price: number;
  averageExecutionPrice: number;
  subOrders?: Order[];
  openedAt: Moment;
  updatedAt: Moment;
  canceledAt: Moment;
}
