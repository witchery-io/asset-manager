import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-tab-account',
  templateUrl: './accounts-tab-account.component.html',
  styleUrls: ['./accounts-tab-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsTabAccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
