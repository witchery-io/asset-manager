import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from '@app/shared/services/order.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class OrdersService extends OrderService {
  constructor(
    protected http: HttpClient,
    protected notifierService: NotifierService,
  ) {
    super(http, notifierService);
  }

  getOrders(params): Observable<any> {
    return this.http.get(`${this.url}/${params.type}/${params.id}/orders`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * cancel order
   * @param id - string
   */
  cancelOrder(id: string): Observable<any> {
    return this.http.delete(`${this.url}/orders/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
}
