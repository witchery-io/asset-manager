import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromPositions from '@settings/actions/positions.actions';
import * as fromOrders from '@settings/actions/orders.actions';
import { PositionsService } from '@app/shared/services/positions.service';
import { ModalService } from '@app/shared/services';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class PositionsEffects {

  @Effect()
  loadPositions$ = this.actions$.pipe(
    ofType<fromPositions.LoadPositions>(fromPositions.LOAD_POSITIONS),
    map(settings => settings.payload),
    switchMap((params: any) => {
      return this.positionsService.getPositions(params).pipe(
        map(response => {
          return new fromPositions.PositionsLoaded({positions: response});
        }),
        catchError(error => of(new fromPositions.PositionsNotLoaded({error: error.message || error}))),
      );
    }),
  );

  @Effect()
  cancelOrder$ = this.actions$.pipe(
    ofType<fromPositions.PositionClose>(fromPositions.POSITION_CLOSE),
    map(settings => settings.payload),
    switchMap((position: any) => {
      return this.positionsService.closePosition(position.id).pipe(
        map(() => {
          this.modalService.closeAllModals();
          this.notifierService.notify('success',
            `Order cancelled,
             ${position.type || 'type == undefined'}, ${position.direction || 'direction == undefined'}
              ${position.amount || 'amount == undefined'} ${position.pair || 'pair == undefined'}
               @ ${position.openPrice || 'openPrice == undefined'}.`);
          this.modalService.closeAllModals();
          return new fromPositions.PositionCloseSuccess();
        }),
        catchError(error => of(new fromPositions.PositionsNotLoaded({error: error.message || error}))),
      );
    }),
  );

  @Effect()
  placePosition$ = this.actions$.pipe(
    ofType<fromPositions.PositionPlace>(fromPositions.POSITION_PLACE),
    map(data => data.payload),
    switchMap((data) => {
      return this.positionsService.placeOrder(data.id, data.type, data.params).pipe(
        map(order => {
          this.notifierService.notify('success',
            `Placed ${order.type || 'type == undefined'} order to ${order.direction || 'direction == undefined'}
             ${order.amount || 'amount == undefined'} ${order.pair || 'pair == undefined'}
              @ ${order.openPrice || 'openPrice == undefined'}.`);
          this.modalService.closeAllModals();
          return new fromPositions.PositionPlaceSuccess();
        }),
        catchError(error => of(new fromPositions.PositionsNotLoaded({error: error.message || error}))),
      );
    }),
  );

  constructor(
    private actions$: Actions<fromPositions.Actions>,
    private positionsService: PositionsService,
    private modalService: ModalService,
    private notifierService: NotifierService,
  ) {
  }
}
