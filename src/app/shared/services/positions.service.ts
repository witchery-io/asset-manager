import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderService } from '@app/shared/services/order.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PositionsService extends OrderService {

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  getPositions(params): Observable<any> {

    // groupByPair -

// const url = `http://trade.vitanova.online:50090/payments/exchange/groups/6a86df61-c190-4347-9b61-34cbd88d38a4/positions?groupby=pair`;
    const url = `http://trade.vitanova.online:50090/payments/exchange/${params.tradingType}/${params.tradingId}/positions?groupby=pair`;
    return this.http.get(url);
  }

  closePosition(params): Observable<any> {

    console.log('Positions Service', params);

    /*    if (position.amount < 0) {
          position.amount = position.amount * -1;
        }*/
    // return this.http.post(`http://trade.vitanova.online:50090/payments/exchange/positions/delete`, position);

    return of();
  }
}
