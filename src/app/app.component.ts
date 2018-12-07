import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadGroups } from '@app/core/actions/group.actions';
import { LoadAccounts } from '@app/core/actions/account.actions';
import { AppState } from '@app/core/intefaces/app-state.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.store.dispatch(new LoadGroups());
    this.store.dispatch(new LoadAccounts());
  }
}
