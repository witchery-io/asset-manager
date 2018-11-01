import { Component, Input } from '@angular/core';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent {

  @Input() balance: any;

  constructor(public orderService: OrderService) {}
}
