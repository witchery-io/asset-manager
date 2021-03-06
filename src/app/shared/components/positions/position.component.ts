import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalService, OrdersService, PositionsService, SharedService } from '@app/shared/services';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PARENT } from '@app/shared/enums/trading.enum';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit {
  @Input() type: string;
  @Input() permission: string;
  @Input() accounts: any;
  @Input() position: any;
  @Input() readonly: boolean;
  @Input() componentRole: string;
  @Input() ticks: any;
  faPlus = faPlus;
  faMinus = faMinus;
  PARENT = PARENT;
  isCollapsed: boolean;
  modalRef: BsModalRef;
  formValues: any;
  groupByPair = true;
  private readonly notifier: NotifierService;

  // account_name: string;

  constructor(
    private positionsService: PositionsService,
    private modalService: ModalService,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService,
    private ordersService: OrdersService,
    private shared: SharedService,
  ) {
    this.notifier = notifierService;
  }

  get feeOrSwap() {
    return this.type === 'groups' ? this.position.fee : this.position.swap;
  }

  get tooltip() {
    // return this.account_name;
    return '';
  }

  get amount() {
    let amount = this.position.amount;
    if (this.position.suborders != null && this.position.suborders.length > 0) {
      if (this.position.suborders[0].suborders != null && this.position.suborders[0].suborders.length) {
        for (const account of this.accounts) {
          if (account.id === this.position.suborders[0].suborders[0].account) {
            amount = this.position.suborders[0].suborders[0].amount / account.risk;
          }
        }
      } else {
        for (const account of this.accounts) {
          if (account.id === this.position.suborders[0].account) {
            amount = this.position.suborders[0].amount / account.risk;
          }
        }
      }
    }

    return amount;
  }

  get mPrice() {
    return this.position.direction === 'sell' ? this.position.ask : this.position.bid;
  }

  get pl() {
    // @todo :: change fee to get from exchange
    // let fee = this.position.amount * 0.002 * this.position.openPrice + this.position.amount * 0.002
    //   * marketPrice;
    //
    // const gorc = this.position.direction === 'sell' ? 1 : -1;
    // fee = fee * gorc;

    return ((this.mPrice || this.position.lastPrice) - this.position.openPrice) * this.position.amount;
  }

  get plPercent() {
    let marketPrice = this.mPrice;
    if (!marketPrice) {
      marketPrice = this.position.lastPrice;
    }

    if (this.position.direction === 'sell') {
      return ((this.position.openPrice / marketPrice) - 1) * 100;
    } else {
      return ((marketPrice / this.position.openPrice) - 1) * 100;
    }
  }

  get plMain() {
    return this.pl / this.plBTC;
  }

  get plBTC() {
    const pair = this.position.pair.slice(-3);
    const tick = this.ticks.filter(t => {
      return t.pair === 'BTC' + pair;
    });

    if (tick.length === 0 || pair === 'BTC') {
      return 1;
    }

    return this.position.direction === 'sell' ? tick[0].ask : tick[0].bid;
  }

  ngOnInit() {
    const collapse = JSON.parse(localStorage.getItem(`collapse.position.${this.position.id}`));
    this.isCollapsed = collapse === null ? true : collapse;
    this.setAccountName();
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(`collapse.position.${this.position.id}`, this.isCollapsed ? 'true' : 'false');
  }

  setAccountName() {
    /*    if (this.permission !== 'parent' && this.type === 'group' && this.accounts && !this.groupByPair) {
          for (const account of this.accounts) {
            if (account.id === this.position.account) {
              this.account_name = account.acc_name;
              break;
            }
          }
        }*/
  }

  openModal(template: any, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  orderStop(template) {
    this.formValues = {
      type: 'stop',
      amount: Math.abs(this.amount),
    };

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  orderLimit(template) {
    this.formValues = {
      type: 'limit',
      amount: Math.abs(this.amount),
    };

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  /*
  * close current position
  * */
  orderClose() {
    this.shared.positionClose(this.position);
  }

  /*
  * position
  * */
  onOrder(params) {
    params.pair = this.position.pair;
    params.positionId = this.position.id;
    this.shared.positionPlace(params);
  }

  trackByFn(index, item) {
    return item.id;
  }
}
