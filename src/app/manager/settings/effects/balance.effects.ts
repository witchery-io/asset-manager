import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromBalance from '@settings/actions/balance.actions';
import { BalanceService } from '@app/shared/services/balance.service';

@Injectable()
export class BalanceEffects {

  @Effect()
  loadGroups$ = this.actions$.pipe(
    ofType<fromBalance.LoadBalance>(fromBalance.LOAD_BALANCE),
    switchMap(() => {
      return this.balanceService.getBalance().pipe(
        map(response => {
          return new fromBalance.BalanceLoaded({ balance: response });
        }),
        catchError(error => of(new fromBalance.BalanceNotLoaded({ error: error.message || error }))),
      );
    }),
  );

  constructor(
    private actions$: Actions<fromBalance.Actions>,
    private balanceService: BalanceService,
  ) { }
}
