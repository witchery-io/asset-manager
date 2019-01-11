import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-per-currency-balances',
  templateUrl: './per֊currency֊balances.component.html',
  styleUrls: ['./per֊currency֊balances.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerCurrencyBalancesComponent implements OnInit {

  @Input()
  per_currency_balances: any;

  constructor() { }

  ngOnInit() {
  }

}
