import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getAccountsFromSection } from '@app/core/reducers';

@Component({
  selector: 'app-accounts',
  template: `
    <div class="select-wrapper">
      <select>
        <option>Select Account</option>
        <option *ngFor="let account of accounts" [value]="account.id">{{ account.acc_name }}</option>
      </select>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent implements OnInit {

  @Input()
  section: any;

  constructor() {
  }

  ngOnInit() {
    console.log(this);
  }

  get accounts() {
    return getAccountsFromSection(this.section);
  }

}
