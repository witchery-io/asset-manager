import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getAccountsFromSection } from '@app/core/reducers';

@Component({
  selector: 'app-accounts',
  template: `
    <h1>Accounts</h1>
    <app-account
      *ngFor="let account of accounts"
      [account]="account"
    ></app-account>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent implements OnInit {

  @Input()
  section: any;

  constructor(
  ) {
  }

  ngOnInit() {
    console.log(this);
  }

  get accounts() {
    return getAccountsFromSection(this.section);
  }

}
