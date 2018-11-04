import {Component, OnDestroy, OnInit} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { TickService } from './services/tick.service';
import { AccountService } from './services/account.service';
import { ActivatedRoute , Router} from '@angular/router';
import { GroupsService } from './services/groups.service';
import { OrderService } from './services/order.service';
import { MessageService } from './services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  dismissible = true;
  subscription: Subscription;
  alerts = [];

  constructor(
    private modalService: BsModalService,
    private groupsService: GroupsService,
    private accountService: AccountService,
    private orderService: OrderService,
    private messageService: MessageService,
    private tickService: TickService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('role') === 'guest' || localStorage.getItem('role') === 'admin') {
      this.accountService.role = localStorage.getItem('role');
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['']);
    }

    this.fetchTicks();
    this.fetchOrders();
    this.orderService.fetchBalance();

    setInterval(() => {
      this.fetchTicks();
      if (this.orderService.tradeTypeId && this.orderService.tradeType) {
        this.fetchOrders();
        this.orderService.fetchBalance();
      }
    }, 9000);

    this.subscription = this.messageService.getMessage().subscribe(data => { this.alerts.push(data); });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    if (this.orderService.tradeType === 'group') {
      this.orderService.getGroupOrders(this.orderService.tradeTypeId, this.order.groupByPair).subscribe(
        orders => {
          this.orderService.setOrders(orders);
        });

      this.orderService.getGroupPositions(this.orderService.tradeTypeId, this.order.groupByPair).subscribe(
        positions => {
          this.orderService.setPositions(positions);
        });

    } else if (this.orderService.tradeType === 'account') {
      this.orderService.getAccountOrders(this.orderService.tradeTypeId, this.order.groupByPair).subscribe(
        orders => {
          this.orderService.setOrders(orders);
        });

      this.orderService.getAccountPositions(this.orderService.tradeTypeId, this.order.groupByPair).subscribe(
        positions => {
          this.orderService.setPositions(positions);
        });
    }
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
