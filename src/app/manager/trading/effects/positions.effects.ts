import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromPositions from '@trading/actions/positions.actions';
import { PositionsService } from '@app/shared/services/positions.service';
import { Settings } from '@trading/reducers/settings.reducers';

@Injectable()
export class PositionsEffects {

  @Effect()
  loadGroups$ = this.actions$.pipe(
    ofType<fromPositions.LoadPositions>(fromPositions.LOAD_POSITIONS),
    map(settings => settings.payload),
    switchMap((settings: Settings) => {
      return this.positionsService.getPositions(settings).pipe(
        map(response => {
          return new fromPositions.PositionsLoaded({ positions: response || [] }); // todo :: remove
        }),
        catchError(error => of(new fromPositions.PositionsNotLoaded({ error: error.message || error }))),
      );
    }),
  );

  constructor(
    private actions$: Actions<fromPositions.Actions>,
    private positionsService: PositionsService,
  ) { }
}
