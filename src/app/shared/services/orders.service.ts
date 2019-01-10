import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderService } from '@app/shared/services/order.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrdersService extends OrderService {

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  getOrders(params): Observable<any> {

    // - groupByPair

    // const url = `http://trade.vitanova.online:50090/payments/exchange/accounts/74f9b418-e7b0-440d-8523-c4ed9cbbe3cc/orders`;
    const url = `http://trade.vitanova.online:50090/payments/exchange/${params.tradingType}s/${params.tradingId}/orders`;
    return this.http.get(url);
  }

  cancelOrder(params): Observable<any> {

    console.log('Orders Service', params);

    return of();
    // return this.http.post('http://trade.vitanova.online:50090/payments/exchange/orders/delete', order);
  }
}
