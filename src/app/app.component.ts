import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { TickService } from './services/tick.service';
import { AccountService } from './services/account.service';
import { ActivatedRoute , Router} from '@angular/router';
import { GroupsService } from './services/groups.service';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'asset-manager';

  constructor(
    private modalService: BsModalService,
    private groupsService: GroupsService,
    private accountService: AccountService,
    private orderService: OrderService,
    private tickService: TickService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.fetchTicks();
    this.fetchOrders();

    setInterval(() => {
      this.fetchTicks();
    }, 5000);
    setInterval(() => {
      if (this.orderService.tradeTypeId && this.orderService.tradeType) {
        this.fetchOrders();
      }
    }, 5000);
  }

  fetchTicks() {
    this.tickService.getTicks().subscribe(
      ticks => {
        ticks.sort((a: any, b: any) => {
          if (a.pair < b.pair) {
            return -1;
          } else if (a.pair > b.pair) {
            return 1;
          } else {
            return 0;
          }
        });

        this.tickService.ticks = ticks;
      }
    );
  }

  get order() {

    if (this.orderService.tradeType === 'group') {
      // array = this.groups;
    } else {
      // array = this.accounts;
    }

    return {
      id: this.orderService.tradeTypeId,
      type: this.orderService.tradeType,
      groupByPair: true,
    };
  }

  fetchOrders() {

    this.orderService.orders = [];
    this.orderService.positions = [];

    if (this.orderService.tradeType === 'group') {
      this.orderService.getGroupOrders(this.orderService.tradeTypeId, this.order.groupByPair)
        .subscribe(
          orders => {
            if (orders !== null && orders.length > 0) {
              this.orderService.orders = orders;
            }
          }
        );


      this.orderService.getGroupPositions(this.orderService.tradeTypeId, this.order.groupByPair)
        .subscribe(
          positions => {
            if (positions !== null && positions.length > 0) {
              this.orderService.positions = positions;
            }
          }
        );

    } else {
      this.orderService.getAccountOrders(this.orderService.tradeTypeId, this.order.groupByPair)
        .subscribe(
          orders => {
            if (orders !== null && orders.length > 0) {
              this.orderService.orders = orders;
            }
          }
        );

      this.orderService.getAccountPositions(this.orderService.tradeTypeId, this.order.groupByPair)
        .subscribe(
          positions => {
            if (positions !== null && positions.length > 0) {
              this.orderService.positions = positions;
            }
          }
        );
    }
  }
}
