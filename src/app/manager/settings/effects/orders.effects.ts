import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromOrders from '@settings/actions/orders.actions';
import { OrdersService } from '@app/shared/services/orders.service';

@Injectable()
export class OrdersEffects {

  @Effect()
  loadOrders$ = this.actions$.pipe(
    ofType<fromOrders.LoadOrders>(fromOrders.LOAD_ORDERS),
    map(settings => settings.payload),
    switchMap((params: any) => {
      return this.ordersService.getOrders(params).pipe(
        map(response => {
          return new fromOrders.OrdersLoaded({orders: response});
        }),
        catchError(error => of(new fromOrders.OrdersNotLoaded({error: error.message || error}))),
      );
    }),
  );

  @Effect()
  updateOrders$ = this.actions$.pipe(
    ofType<fromOrders.UpdateOrders>(fromOrders.UPDATE_ORDERS),
    map(settings => settings.payload),
    switchMap((params: any) => {
      return this.ordersService.getOrders(params).pipe(
        map(response => {
          return new fromOrders.UpdateOrderItems({orders: response});
        }),
        catchError(error => of(new fromOrders.OrdersNotLoaded({error: error.message || error}))),
      );
    }),
  );

  constructor(
    private actions$: Actions<fromOrders.Actions>,
    private ordersService: OrdersService,
  ) {
  }
}
