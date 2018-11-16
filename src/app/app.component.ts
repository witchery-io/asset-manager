import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { TickService } from './services/tick.service';
import { AccountService } from './services/account.service';
import { ActivatedRoute , Router} from '@angular/router';
import { GroupsService } from './services/groups.service';
import { OrderService } from './services/order.service';
import { BotService } from './services/bot.service';
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
    this.orderService.fetchOrders();
    this.orderService.fetchBalance();
    this.botService.fetchBots();

    setInterval(() => {
      this.tickService.fetchTicks();
      this.botService.fetchBots();
      if (this.orderService.tradeTypeId && this.orderService.tradeType) {
        this.orderService.fetchOrders();
        this.orderService.fetchBalance();
      }
    }, 9000);

    this.subscription = this.messageService.getMessage().subscribe(data => { this.alerts.push(data); });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
