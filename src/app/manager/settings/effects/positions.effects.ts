import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromPositions from '@settings/actions/positions.actions';
import { PositionsService } from '@app/shared/services/positions.service';

@Injectable()
export class PositionsEffects {

  @Effect()
  loadGroups$ = this.actions$.pipe(
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

  constructor(
    private actions$: Actions<fromPositions.Actions>,
    private positionsService: PositionsService,
  ) {
  }
}
