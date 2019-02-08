import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from '@app/shared/services/order.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { environment } from '../../../environments/environment';

@Injectable()
export class OrdersService extends OrderService {
  constructor(
    protected http: HttpClient,
    protected notifierService: NotifierService,
  ) {
    super(http, notifierService);
  }

  getOrders(params): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${params.type}/${params.id}/orders`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * cancel order
   * @param id - string
   */
  cancelOrder(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/orders/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
}
