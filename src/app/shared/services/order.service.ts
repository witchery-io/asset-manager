import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class OrderService {

  url = 'http://192.168.1.19:8080';
  private readonly notifier: NotifierService;

  constructor(
    protected http: HttpClient,
    protected notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  placeGroupOrder(id, params): Observable<any> {
    return this.http.post(`${this.url}/groups/${id}/orders`, params)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  placeAccountOrder(id, params): Observable<any> {
    return this.http.post(`${this.url}/accounts/${id}/orders`, params)
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
