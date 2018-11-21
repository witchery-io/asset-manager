import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import {
  BsModalService,
} from 'ngx-bootstrap';

import {
  TickService,
  AccountService,
  GroupsService,
  OrderService,
  BotService,
  MessageService,
} from './services';

import {
  Subscription
} from 'rxjs';

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
    private botService: BotService,
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

    this.tickService.fetchTicks();
    this.botService.fetchBots();

    setInterval(() => {
      this.tickService.fetchTicks();
      this.botService.fetchBots();
      this.messageService.clearMessage();
      if (this.orderService.tradeTypeId && this.orderService.tradeType) {
        this.orderService.fetchOrders();
        this.orderService.fetchBalance();
      }
    }, 9000);

    this.subscription = this.messageService.getMessage()
      .subscribe(data => {
        if (!data) {
          this.alerts = [];
        } else {
          this.alerts.push(data);
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
