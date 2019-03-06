import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromPositions from '@trading/actions/positions.actions';
import * as fromOrders from '@trading/actions/orders.actions';
import { PositionsService } from '@app/shared/services/positions.service';

@Injectable()
export class PositionsEffects {

  @Effect()
  loadPositions$ = this.actions$.pipe(
    ofType<fromPositions.LoadPositions>(fromPositions.LOAD_POSITIONS),
    map(settings => settings.payload),
    switchMap((settings: any) => {
      return this.positionsService.getPositions(settings).pipe(
        map(response => {
          return new fromPositions.PositionsLoaded({positions: response});
        }),
        catchError(error => of(new fromPositions.PositionsNotLoaded({error: error.message || error}))),
      );
    }),
  );


  @Effect()
  updatePositions$ = this.actions$.pipe(
    ofType<fromPositions.UpdatePositions>(fromPositions.UPDATE_POSITIONS),
    map(settings => settings.payload),
    switchMap((settings: any) => {
      return this.positionsService.getPositions(settings).pipe(
        map(response => {
          return new fromPositions.UpdatePositionItems({positions: response});
        }),
        catchError(error => of(new fromPositions.PositionsNotLoaded({error: error.message || error}))),
      );
    }),
  );

  @Effect()
  cancelOrder$ = this.actions$.pipe(
    ofType<fromPositions.PositionClose>(fromPositions.POSITION_CLOSE),
    map(settings => settings.payload),
    switchMap((id: string) => {
      return this.positionsService.closePosition(id).pipe(
        map(() => {
          return new fromPositions.PositionDelete(id);
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
          return new fromOrders.OrderAdd(order);
        }),
        catchError(error => of(new fromPositions.PositionsNotLoaded({error: error.message || error}))),
      );
    }),
  );

  constructor(
    private actions$: Actions<fromPositions.Actions>,
    private positionsService: PositionsService,
  ) {
  }
}
