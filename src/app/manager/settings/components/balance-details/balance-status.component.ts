import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance-status',
  templateUrl: './balance-status.component.html',
  styleUrls: ['./balance-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceStatusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
