import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromAccount from '@settings/actions/account.actions';
import { AccountService } from '@app/core/services';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AccountEffects {

  @Effect()
  loadAccount$ = this.actions$.pipe(
    ofType<fromAccount.LoadAccount>(fromAccount.LOAD_ACCOUNT),
    map(settings => settings.payload),
    switchMap((settings: any) => {
      return this.accountService.getAccount(settings).pipe(
        map(response => {
          return new fromAccount.AccountLoaded({ account: response });
        }),
        catchError(error => of(new fromAccount.AccountNotLoaded({ error: error.message || error }))),
      );
    }),
  );

  constructor(
    private actions$: Actions<fromAccount.Actions>,
    private accountService: AccountService,
  ) { }
}
