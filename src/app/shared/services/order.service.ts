import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { environment } from '../../../environments/environment';

@Injectable()
export class OrderService {

  url = '';
  private readonly notifier: NotifierService;

  constructor(
    protected http: HttpClient,
    protected notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  placeOrder(id, type, params): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${type}/${id}/orders`, params)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Handle server response errors here
   */
  protected handleError(error1: any) {
    let errMsg = 'Server error';

    if (error1 && error1.error.message) {
      errMsg = error1.error.message;
    }

    this.notifier.notify('error', errMsg);
    return observableThrowError(errMsg);
  }
}
