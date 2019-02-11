import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from '@app/shared/services/order.service';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class PositionsService extends OrderService {
  constructor(
    protected http: HttpClient,
    protected notifierService: NotifierService,
  ) {
    super(http, notifierService);
  }

  getPositions(params): Observable<any> {
    let getParams = '?';
    if (params.groupByPair) {
      getParams += 'groupBy=pair';
    }

    return this.http.get(`${environment.apiUrl}/${params.type}/${params.id}/positions${getParams}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  closePosition(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/positions/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
}
