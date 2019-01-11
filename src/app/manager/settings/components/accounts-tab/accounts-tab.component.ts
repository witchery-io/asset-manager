import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-tab',
  template: `
    <h1>ACCOUNT TAB</h1>
    <app-accounts-tab-account></app-accounts-tab-account>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsTabComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
