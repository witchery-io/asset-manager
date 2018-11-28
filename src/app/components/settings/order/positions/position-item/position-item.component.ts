import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../../../../services';
import { User } from '../../../../../models';
import { Role, OrderDirection } from '../../../../../enums';

export const PARENT = 'parent';

@Component({
  selector: 'app-position-item',
  templateUrl: './position-item.component.html',
  styleUrls: ['./position-item.component.scss'],
})
export class PositionItemComponent implements OnInit {
  user: User;
  ROLE = Role;
  @Input() position: any;
  @Input() permission: string;
  PARENT = PARENT;
  OrderDirection = OrderDirection;
  isCollapsed = true;

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(this);
  }

  get feeOrSwap() {
    return this.tradeType === 'group' ? this.position.fee : this.position.swap;
  }

  get tradeType() {
    return this.orderService.tradeType;
  }

  collapse() {
    // todo : set position id -> localStorage
  }

  get role() {
    return this.user.role;
  }

  get tooltip() {
    // todo : return group`s account
    return 'Tooltip';
  }
}
