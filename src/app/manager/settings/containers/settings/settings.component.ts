import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsState } from '@settings/reducers';
import { LoadBalance} from '@settings/actions/balance.actions';
import { LoadOrders } from '@settings/actions/orders.actions';
import { LoadPositions } from '@settings/actions/positions.actions';

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
