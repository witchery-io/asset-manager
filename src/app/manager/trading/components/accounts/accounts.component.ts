import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getAccountsFromSection } from '@app/core/reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TradingState } from '@trading/reducers';
import { SettingsUpdate } from '@trading/actions/settings.actions';
import { ACCOUNT } from '@app/shared/enums/trading.enum';
import { LoadBalance } from '@trading/actions/balance.actions';
import { LoadOrders } from '@trading/actions/orders.actions';
import { LoadPositions } from '@trading/actions/positions.actions';

@Component({
  selector: 'app-accounts',
  template: `
    <div class="form-group">
      <label for="account" class="small font-weight-bold">ACCOUNTS</label>
      <select
        id="account"
        class="form-control form-control-sm"
        [value]="this.type === ACCOUNT ? this.id : null"
        (change)="onChange($event.target.value)">
        <option *ngFor="let account of accounts" [value]="account.id">{{ account.acc_name }}</option>
      </select>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent implements OnInit {

  ACCOUNT = ACCOUNT;

  @Input()
  section: any;

  @Input()
  type: string;

  @Input()
  id: string;

  @Input()
  groupByPair: boolean;

  constructor(
    private router: Router,
    private store: Store<TradingState>,
    private route: ActivatedRoute,
  ) {
  }

  get accounts() {
    return getAccountsFromSection(this.section);
  }

  ngOnInit() {
  }

  onChange(changing_tab_id) {
    const tab = this.route.snapshot.paramMap.get('tab');
    const routerPromise = this.router.navigate([`/trading/account/${changing_tab_id}/${tab}`]);
    routerPromise.then(() => {
      this.store.dispatch(new SettingsUpdate({ tradingId: changing_tab_id, tradingType: ACCOUNT, groupByPair: this.groupByPair}));

      this.store.dispatch(new LoadBalance({ tradingId: changing_tab_id, tradingType: ACCOUNT, groupByPair: this.groupByPair }));
      this.store.dispatch(new LoadOrders({ tradingId: changing_tab_id, tradingType: ACCOUNT, groupByPair: this.groupByPair }));
      this.store.dispatch(new LoadPositions({ tradingId: changing_tab_id, tradingType: ACCOUNT, groupByPair: this.groupByPair }));
    });
  }
}
