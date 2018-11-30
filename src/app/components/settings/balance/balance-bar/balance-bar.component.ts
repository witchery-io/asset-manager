import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance-bar',
  templateUrl: './balance-bar.component.html',
  styleUrls: ['./balance-bar.component.scss']
})
export class BalanceBarComponent implements OnInit {

  @Input() balance: any;

  constructor() { }

  ngOnInit() {
  }

}
