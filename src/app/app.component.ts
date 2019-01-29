import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadGroups } from '@app/core/actions/group.actions';
import { LoadAccounts } from '@app/core/actions/account.actions';
import { LoadTicks } from '@app/core/actions/tick.actions';
import { CoreState } from '@app/core/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
  ) {}

  ngOnInit() {
  }
}
