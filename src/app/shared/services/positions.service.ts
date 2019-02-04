import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderService } from '@app/shared/services/order.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PositionsService extends OrderService {

  url = 'http://192.168.1.19:8080';

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  getPositions(params): Observable<any> {
    return this.http.get(`${this.url}/${params.type}/${params.id}/positions`);
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
