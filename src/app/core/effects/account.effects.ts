import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as fromAccount from '@app/core/actions/account.actions';
import { AccountService } from '@app/core/services';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { State } from '@app/core/reducers/account.reducers';

@Injectable()
export class AccountEffects {

  @Effect()
  loadAccounts$ = this.actions$
    .ofType<fromAccount.LoadAccounts>(fromAccount.LOAD_ACCOUNTS)
    .pipe(
      switchMap(() => {
        return this.accountService.getAccounts()
          .pipe(
            map(response => {
              return new fromAccount.AccountsLoaded({ accounts: response });
            }),
            catchError(error => of(new fromAccount.AccountsNotLoaded({ error: error.message || error}))),
        );
      }),
    );

  constructor(
    private actions$: Actions<fromAccount.Actions>,
    private accountService: AccountService,
    private store$: Store<State>,
  ) {
  }
}
