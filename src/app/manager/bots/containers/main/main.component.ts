import { Component, OnInit } from '@angular/core';
import { LoadGroups } from '@app/core/actions/group.actions';
import { LoadAccounts } from '@app/core/actions/account.actions';
import { LoadTicks } from '@app/core/actions/tick.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-bots',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private store: Store<any>,
  ) {

    /*
    * Load Default Data
    * */
    this.store.dispatch(new LoadGroups());
    this.store.dispatch(new LoadAccounts());
    this.store.dispatch(new LoadTicks());
  }

  ngOnInit() {
  }

}
