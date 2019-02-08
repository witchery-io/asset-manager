import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class GroupService {

  url = 'http://ats.witchery.io';
  private readonly notifier: NotifierService;

  constructor(
    private http: HttpClient,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  getGroups(): Observable<any> {
    return this.http.get(`${this.url}/groups`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  getGroup(id): Observable<any> {
    return this.http.get(`${this.url}/groups/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  create(params): Observable<any> {
    return this.http.post(`${this.url}/groups`, params)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  update(id, params): Observable<any> {
    return this.http.put(`${this.url}/groups/${id}`, params)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  addAccount(id, params) {
    return this.http.post(`${this.url}/groups/${id}/accounts`, params)
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
