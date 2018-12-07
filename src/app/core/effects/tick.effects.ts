import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromTick from '@app/core/actions/tick.actions';
import { TickService } from '@app/core/services';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TickEffects {

  @Effect()
  loadAccounts$ = this.actions$.pipe(
    ofType<fromTick.LoadTicks>(fromTick.LOAD_TICKS),
    map(() => {
      return this.tickService.getTicks().pipe(
        map(response => {
          console.log(response);
          return new fromTick.TicksLoaded({ ticks: [] });
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
