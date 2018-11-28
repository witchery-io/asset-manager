import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../../models';
import { Role, OrderType, OrderContext, OrderDirection } from '../../../../../enums';
import { PARENT } from '../../../..';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  user: User;
  ROLE = Role;
  PARENT = PARENT;
  @Input() order: any;
  @Input() permission: string;
  OrderDirection = OrderDirection;
  OrderType = OrderType;
  OrderContext = OrderContext;
  isCollapsed = true;

  constructor(
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  get role() {
    return this.user.role;
  }

  collapse() {

  }
}
