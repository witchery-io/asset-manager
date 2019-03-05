import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SharedService {
  private orderCancelSubject = new Subject<any>();
  private orderApproveSubject = new Subject<any>();
  private positionCloseSubject = new Subject<any>();
  private positionPlaceSubject = new Subject<any>();

  /*
  * send order
  * */
  orderCancel(data) {
    this.orderCancelSubject.next(data);
  }

  /*
  * get Observable
  * */
  getOrderCancel(): Observable<any> {
    return this.orderCancelSubject.asObservable();
  }

  /*
  * send data
  * */
  orderApprove(data) {
    this.orderApproveSubject.next(data);
  }

  /*
  * get Observable
  * */
  getOrderApprove(): Observable<any> {
    return this.orderApproveSubject.asObservable();
  }

  /*
  * send position
  * */
  positionClose(data) {
    this.positionCloseSubject.next(data);
  }

  /*
  * get Observable
  * */
  getPositionClose(): Observable<any> {
    return this.positionCloseSubject.asObservable();
  }

  /*
  * send data
  * */
  positionPlace(data) {
    this.positionPlaceSubject.next(data);
  }

  /*
  * get Observable
  * */
  getPositionPlace(): Observable<any> {
    return this.positionPlaceSubject.asObservable();
  }
}
