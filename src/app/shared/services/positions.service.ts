import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class PositionsService {

  constructor(
    private http: HttpClient,
  ) { }

  getPositions(params): Observable<any> {
   // const url = `http://trade.vitanova.online:50090/payments/exchange/groups/6a86df61-c190-4347-9b61-34cbd88d38a4/positions?groupby=pair`;
    const url = `http://trade.vitanova.online:50090/payments/exchange/${params.tradingType}s/${params.tradingId}/positions?groupby=pair`;
    return this.http.get(url);
  }

  closePosition(position): Observable<any> {
/*    if (position.amount < 0) {
      position.amount = position.amount * -1;
    }*/
    // return this.http.post(`http://trade.vitanova.online:50090/payments/exchange/positions/delete`, position);

    return of();
  }

  placeGroupOrder(groupId, order): Observable<any> { // >> Order << is removed
    // return this.http.post(`http://trade.vitanova.online:50090/payments/exchange/groups/${ groupId }/orders`, order);
    return of();
  }

  placeAccountOrder(accountId, order): Observable<any> { // Order is removed
    // return this.http.post(`http://trade.vitanova.online:50090/payments/exchange/accounts/${ accountId }/orders`, order);
    return of();
  }
}
