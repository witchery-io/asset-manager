import { Component, OnInit } from '@angular/core';
import { LoadBalance} from '@trading/actions/balance.actions';
import { LoadOrders } from '@trading/actions/orders.actions';
import { LoadPositions } from '@trading/actions/positions.actions';
import { Store } from '@ngrx/store';
import { SettingsState } from '@settings/reducers';

@Component({
  selector: 'app-trading',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.styl'],
})
export class SettingsComponent implements OnInit {

  constructor(
    private store: Store<SettingsState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadBalance());
    this.store.dispatch(new LoadOrders());
    this.store.dispatch(new LoadPositions());
  }

}
