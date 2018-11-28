import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss'],
})
export class PositionsComponent implements OnInit {

  permission = 'parent';

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    // console.log('PositionsComponent - ngOnInit', this);
  }

  get tradeType() {
    return this.orderService.tradeType;
  }

  get feeOrSwap() {
    return this.tradeType === 'group' ? 'Fee' : 'Swap';
  }

  get positions() {
    return this.orderService.positions;
  }
}
