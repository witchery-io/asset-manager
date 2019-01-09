import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderService } from '@app/shared/services/order.service';

@Injectable()
export class OrdersService extends OrderService {

  constructor(
  ) {
    super();
  }

  getOrders(params): Observable<any> {
    // const url = `http://trade.vitanova.online:50090/payments/exchange/accounts/74f9b418-e7b0-440d-8523-c4ed9cbbe3cc/orders`;
    const url = `http://trade.vitanova.online:50090/payments/exchange/${params.tradingType}s/${params.tradingId}/orders`;
    return this.http.get(url);
  }

  cancelOrder(order): Observable<any> {
    return of();
    // return this.http.post('http://trade.vitanova.online:50090/payments/exchange/orders/delete', order);
  }
}
