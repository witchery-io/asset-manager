import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getAccountsFromSection } from '@app/core/reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TradingState } from '@trading/reducers';
import { ACCOUNTS } from '@app/shared/enums/trading.enum';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-accounts',
  template: `
    <div class="form-group">
      <label for="account" class="small font-weight-bold">ACCOUNTS</label>
      <select
        id="account"
        class="form-control form-control-sm"
        [value]="this.type === ACCOUNTS ? this.id : null"
        (change)="onChange($event.target.value)">
        <option *ngFor="let account of accounts" [value]="account.id">{{ account.accName }}</option>
      </select>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent implements OnInit {
  ACCOUNTS = ACCOUNTS;
  @Input()
  id: string;
  @Input()
  type: string;
  @Input()
  section: any;
  @Output()
  select: EventEmitter<{currentId: string, currentType: string}> = new EventEmitter();
  private readonly notifier: NotifierService;

  constructor(
    private router: Router,
    private store: Store<TradingState>,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  get accounts() {
    return getAccountsFromSection(this.section);
  }

  ngOnInit() {
  }

  onChange(accountId) {
    const tab = this.route.snapshot.paramMap.get('tab');
    const routerPromise = this.router.navigate([`/trading/${ACCOUNTS}/${accountId}/${tab}`]);

    routerPromise.then(() => {
      this.select.emit({currentId: accountId, currentType: ACCOUNTS});
    }, error1 => {
      this.notifierService.notify('error', `Please try again: ${error1}`);
    });
  }
}
