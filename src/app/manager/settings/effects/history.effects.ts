import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromHistories from '@settings/actions/history.actions';
import { HistoryService } from '@app/shared/services';

@Injectable()
export class HistoriesEffects {

  @Effect()
  loadHistories$ = this.actions$.pipe(
    ofType<fromHistories.LoadHistories>(fromHistories.LOAD_HISTORIES),
    map(settings => settings.payload),
    switchMap((params) => {
      return this.historyService.getHistory(params).pipe(
        map(response => {
          return new fromHistories.HistoriesLoaded({histories: response});
        }),
        catchError(error => of(new fromHistories.HistoriesNotLoaded({error: error.message || error}))),
      );
    }),
  );

  constructor(
    private actions$: Actions<fromHistories.Actions>,
    private historyService: HistoryService,
  ) {
  }
}
