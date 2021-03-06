import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromTick from '@app/core/actions/tick.actions';
import { TickService } from '@app/core/services';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TickEffects {

  @Effect()
  loadTicks$ = this.actions$.pipe(
    ofType<fromTick.LoadTicks>(fromTick.LOAD_TICKS),
    switchMap(() => {
      return this.tickService.getTicks().pipe(
        map(response => {
          return new fromTick.TicksLoaded({ ticks: response });
        }),
        catchError(error => of(new fromTick.TicksNotLoaded({ error: error.message || error }))),
      );
    }),
  );

  @Effect()
  updateTicks$ = this.actions$.pipe(
    ofType<fromTick.UpdateTicks>(fromTick.UPDATE_TICKS),
    switchMap(() => {
      return this.tickService.getTicks().pipe(
        map(response => {
          return new fromTick.UpdateTicksItems({ ticks: response });
        }),
        catchError(error => of(new fromTick.TicksNotLoaded({ error: error.message || error }))),
      );
    }),
  );

  constructor(
    private actions$: Actions<fromTick.Actions>,
    private tickService: TickService,
  ) { }
}
