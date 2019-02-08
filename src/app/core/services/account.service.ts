import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class AccountService {

  url = '';
  private readonly notifier: NotifierService;

  constructor(
    private http: HttpClient,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  getAccounts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/accounts`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  getAccount(id) {
    return this.http.get(`${environment.apiUrl}/accounts/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  create(params) {
    return this.http.post(`${environment.apiUrl}/accounts`, params)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  update(id, params) {
    return this.http.put(`${environment.apiUrl}/accounts/${id}`, params)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Handle server response errors here
   */
  private handleError(error1: any) {
    let errMsg = 'Server error';

    if (error1 && error1.error.message) {
      errMsg = error1.error.message;
    }

    this.notifier.notify('error', errMsg);
    return observableThrowError(errMsg);
  }
}
