import { Component, Input, OnInit } from '@angular/core';
import { getBalanceFromSection } from '@trading/state/trading.selectors';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  @Input()
  section: any;

  constructor() {
  }

  ngOnInit() {
    console.log(this);
  }

  get balance() {
    return getBalanceFromSection(this.section);
  }
}
