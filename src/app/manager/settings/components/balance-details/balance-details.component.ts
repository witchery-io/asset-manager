import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getBalanceFromSection } from '@trading/state/trading.selectors';

@Component({
  selector: 'app-balance-details',
  templateUrl: './balance-details.component.html',
  styleUrls: ['./balance-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceDetailsComponent implements OnInit {

  @Input()
  section: any;

  constructor() {
  }

  ngOnInit() {
  }

  get balance() {
    return getBalanceFromSection(this.section);
  }
}
