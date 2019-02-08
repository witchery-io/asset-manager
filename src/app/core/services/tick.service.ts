import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class TickService {

  url = '';
  private readonly notifier: NotifierService;

  constructor(
    private http: HttpClient,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  getTicks(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/tickers`)
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
