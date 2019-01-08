import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getGroupsFromSection } from '@app/core/reducers';
import { SettingsUpdate } from '@trading/actions/settings.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TradingState } from '@trading/reducers';
import { ACCOUNT, GROUP } from '@app/shared/enums/trading.enum';
import { LoadBalance } from '@trading/actions/balance.actions';
import { LoadOrders } from '@trading/actions/orders.actions';
import { LoadPositions } from '@trading/actions/positions.actions';

@Component({
  selector: 'app-groups',
  template: `
    <div class="select-wrapper">
      <select [value]="this.type === GROUP ? this.id : null" (change)="onChange($event.target.value)">
        <option disabled> -- Select Group -- </option>
        <option *ngFor="let group of groups" [value]="group.id">{{ group.name }}</option>
      </select>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit {

  GROUP = GROUP;

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

  get groups() {
    return getGroupsFromSection(this.section);
  }

  onChange(changing_id) {
    const tab = this.route.snapshot.paramMap.get('tab');
    const routerPromise = this.router.navigate([`/trading/group/${ changing_id }/${ tab }`]);
    routerPromise.then(() => {
      this.store.dispatch(new SettingsUpdate({ tradingId: changing_id, tradingType: GROUP }));

      this.store.dispatch(new LoadBalance({ tradingId: changing_id, tradingType: GROUP }));
      this.store.dispatch(new LoadOrders({ tradingId: changing_id, tradingType: GROUP }));
      this.store.dispatch(new LoadPositions({ tradingId: changing_id, tradingType: GROUP }));
    });
  }
}
