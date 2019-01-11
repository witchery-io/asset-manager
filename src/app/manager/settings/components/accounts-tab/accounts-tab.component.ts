import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getAccountsFromSection } from '@app/core/reducers';

@Component({
  selector: 'app-accounts-tab',
  template: `
    <h1>Account Tab</h1>
    <app-accounts-tab-account></app-accounts-tab-account>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsTabComponent implements OnInit {

  @Input()
  section: any;

  constructor() {
  }

  ngOnInit() {
  }

  get accounts() {
    return getAccountsFromSection(this.section);
  }
}
