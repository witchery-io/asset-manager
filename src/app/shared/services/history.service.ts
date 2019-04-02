import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HistoryService {

  private readonly notifier: NotifierService;

  constructor(
    private http: HttpClient,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  getHistory(params): Observable<any> {
    return this.http.get(`${environment.apiUrl}/accounts/${params.id}/positions/history`)
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
