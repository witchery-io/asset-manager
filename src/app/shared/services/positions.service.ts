import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PositionsService {

  constructor(
    private http: HttpClient,
  ) { }

  getPositions(): Observable<any> {
    return this.http.get('http://trade.vitanova.online:50090/payments/exchange/accounts/74f9b418-e7b0-440d-8523-c4ed9cbbe3cc/positions');
  }

  closePosition(position = {}): Observable<any> {
/*    if (position.amount < 0) {
      position.amount = position.amount * -1;
    }*/
    return this.http.post(`http://trade.vitanova.online:50090/payments/exchange/positions/delete`, position);
  }

  placeGroupOrder(groupId = '', order = {}) { // >> Order << is removed
    return this.http.post(`http://trade.vitanova.online:50090/payments/exchange/groups/${ groupId }/orders`, order);
  }

  placeAccountOrder(accountId = '', order = {}) { // Order is removed
    return this.http.post(`http://trade.vitanova.online:50090/payments/exchange/accounts/${ accountId }/orders`, order);
  }
}
