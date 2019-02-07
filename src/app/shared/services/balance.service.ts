import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class BalanceService {

  url = 'http://192.168.1.19:8080';
  private readonly notifier: NotifierService;

  constructor(
    private http: HttpClient,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  getBalance(params): Observable<any> {
    return this.http.get(`${this.url}/${params.type}/${params.id}/balance`)
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
