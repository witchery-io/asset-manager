import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderService } from '@app/shared/services/order.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrdersService extends OrderService {

  url = 'http://192.168.1.19:8080';

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  getOrders(params): Observable<any> {
    return this.http.get(`${this.url}/${params.type}/${params.id}/orders`);
  }

  cancelOrder(params): Observable<any> {

    console.log('Orders Service', params);

    return of();
    // return this.http.post('http://trade.vitanova.online:50090/payments/exchange/orders/delete', order);
  }
}
