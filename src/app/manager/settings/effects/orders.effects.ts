import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromOrders from '@settings/actions/orders.actions';
import { OrdersService } from '@app/shared/services/orders.service';
import { Order } from '@app/shared/intefaces/order.interface';
import { ModalService } from '@app/shared/services';
import { NotifierService } from 'angular-notifier';

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
  cancelOrder$ = this.actions$.pipe(
    ofType<fromOrders.OrderCancel>(fromOrders.ORDER_CANCEL),
    map(settings => settings.payload),
    switchMap((order: Order) => {
      return this.ordersService.cancelOrder(order.orderNumber).pipe(
        map(() => {
          this.notifierService.notify('success',
            `Order cancelled, ${order.type || 'type == undefined'},
             ${order.direction || 'direction == undefined'} ${order.originalAmount || 'originalAmount == undefined'}
             ${order.pair || 'pair == undefined'} @ ${order.price || 'price == undefined'}.`);
          this.modalService.closeAllModals();
          return new fromOrders.OrderCancelSuccess();
        }),
        catchError(error => of(new fromOrders.OrdersNotLoaded({error: error.message || error}))),
      );
    }),
  );

  @Effect()
  placeOrder$ = this.actions$.pipe(
    ofType<fromOrders.OrderPlace>(fromOrders.ORDER_PLACE),
    map(data => data.payload),
    switchMap((data: any) => {
      return this.ordersService.cancelOrder(data.params.orderNumber).pipe(
        switchMap(() => {
          return this.ordersService.placeOrder(data.id, data.type, data.params).pipe(
            map(order => {
              this.modalService.closeAllModals();
              this.notifierService.notify('success',
                `Order modified, ${order.type || 'type == undefined'},
                 to ${order.direction || 'direction == undefined'} ${order.amount || 'amount == undefined'}
                  ${order.pair || 'pair == undefined'} @ ${order.price || 'price == undefined'}.`);
              return new fromOrders.OrderPlaceSuccess();
            }),
            catchError(error => of(new fromOrders.OrdersNotLoaded({error: error.message || error}))),
          );
        }),
        catchError(error => of(new fromOrders.OrdersNotLoaded({error: error.message || error}))),
      );
    }),
  );

  constructor(
    private actions$: Actions<fromOrders.Actions>,
    private ordersService: OrdersService,
    private modalService: ModalService,
    private notifierService: NotifierService,
  ) {
  }
}
