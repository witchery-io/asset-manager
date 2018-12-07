import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromAccount from '@app/core/actions/account.actions';
import { AccountService } from '@app/core/services';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AccountEffects {

  @Effect()
  loadAccounts$ = this.actions$.pipe(
    ofType<fromAccount.LoadAccounts>(fromAccount.LOAD_ACCOUNTS),
    map(() => {
      return this.accountService.getAccounts().pipe(
        map(response => {
          return new fromAccount.AccountsLoaded({ accounts: response });
        }),
        catchError(error => of(new fromAccount.AccountsNotLoaded({ error: error.message || error }))),
      );
    }),
  );

  constructor(
    private actions$: Actions<fromAccount.Actions>,
    private accountService: AccountService,
  ) { }
}
