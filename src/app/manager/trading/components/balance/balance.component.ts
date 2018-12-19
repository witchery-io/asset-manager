import { Component, Input, OnInit } from '@angular/core';
import { getBalanceFromSection } from '@trading/state/trading.selectors';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.styl']
})
export class BalanceComponent implements OnInit {

  @Input()
  section: any;

  constructor() { }

  ngOnInit() {
    console.log(this);
  }

  get balance() {
    const x = getBalanceFromSection(this.section);
    console.log(x);
    return x;
  }
}
