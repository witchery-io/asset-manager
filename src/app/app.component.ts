import {
  Component,
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
} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    private groupsService: GroupsService,
    private accountService: AccountService,
    private orderService: OrderService,
    private botService: BotService,
    private tickService: TickService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

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
      if (this.orderService.tradeTypeId && this.orderService.tradeType) {
        this.orderService.fetchOrders();
        this.orderService.fetchBalance();
      }
    }, 9000);
  }
}
