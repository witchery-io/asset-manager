import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromPositions from '@trading/actions/positions.actions';
import { PositionsService } from '@app/shared/services/positions.service';

@Injectable()
export class PositionsEffects {

  @Effect()
  loadGroups$ = this.actions$.pipe(
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
  updateGroups$ = this.actions$.pipe(
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

  constructor(
    private actions$: Actions<fromPositions.Actions>,
    private positionsService: PositionsService,
  ) {
  }
}
