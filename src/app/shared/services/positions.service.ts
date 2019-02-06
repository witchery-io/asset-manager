import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from '@app/shared/services/order.service';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PositionsService extends OrderService {
  constructor(
    protected http: HttpClient,
    protected notifierService: NotifierService,
  ) {
    super(http, notifierService);
  }

  getPositions(params): Observable<any> {
    return this.http.get(`${this.url}/${params.type}/${params.id}/positions`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  closePosition(id: string): Observable<any> {
    return this.http.delete(`${this.url}/positions/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
}
