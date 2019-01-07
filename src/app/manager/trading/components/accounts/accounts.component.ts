import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getAccountsFromSection } from '@app/core/reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TradingState } from '@trading/reducers';
import { SettingsUpdate } from '@trading/actions/settings.actions';
import { ACCOUNT } from '@app/shared/enums/trading.enum';

@Component({
  selector: 'app-accounts',
  template: `
    <div class="select-wrapper">
      <select [value]="this.type === ACCOUNT ? this.id : null" (change)="onChange($event.target.value)">
        <option disabled> -- Select Account -- </option>
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

  constructor(
    private router: Router,
    private store: Store<TradingState>,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
  }

  get accounts() {
    return getAccountsFromSection(this.section);
  }

  onChange(changing_id) {
    const tab = this.route.snapshot.paramMap.get('tab');
    const routerPromise = this.router.navigate([`/trading/account/${ changing_id }/${ tab }`]);
    routerPromise.then(() => {
      this.store.dispatch(new SettingsUpdate({
        tradingId: changing_id,
        tradingType: ACCOUNT,
      }));
    });
  }
}
