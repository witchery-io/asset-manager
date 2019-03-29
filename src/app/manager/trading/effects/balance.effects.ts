import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromBalance from '@trading/actions/balance.actions';
import { BalanceService } from '@app/shared/services/balance.service';

@Injectable()
export class BalanceEffects {

  @Effect()
  loadBalance$ = this.actions$.pipe(
    ofType<fromBalance.LoadBalance>(fromBalance.LOAD_BALANCE),
    map(settings => settings.payload),
    switchMap((settings: any) => {
      return this.balanceService.getBalance(settings).pipe(
        map(response => {
          return new fromBalance.BalanceLoaded({balance: response});
        }),
        catchError(error => of(new fromBalance.BalanceNotLoaded({error: error.message || error}))),
      );
    }),
  );

  constructor(
    private actions$: Actions<fromBalance.Actions>,
    private balanceService: BalanceService,
  ) {
  }
}
