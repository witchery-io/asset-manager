import { Component, Input, OnInit } from '@angular/core';
import { getBalanceFromSection, getPositionsFromSection } from '@trading/state/trading.selectors';
import { getAccountsFromSection, getGroupsFromSection, getTicksFromSection } from '@app/core/reducers';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { OrdersService } from '@app/shared/services';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  @Input() section: any;
  @Input() groupsSection: any;
  @Input() accountsSection: any;
  @Input() positionsSection: any;
  @Input() ticksSection: any;
  modalRef: BsModalRef;
  transferForm: FormGroup;
  currBalance: any;
  currency: any;

  constructor(
    private ordersService: OrdersService,
    private modalService: BsModalService,
    private fb: FormBuilder,
  ) {
  }

  get balance() {
    return getBalanceFromSection(this.section);
  }

  get accounts() {
    return getAccountsFromSection(this.accountsSection);
  }

  get groups() {
    return getGroupsFromSection(this.groupsSection);
  }

  get positions() {
    return getPositionsFromSection(this.positionsSection);
  }

  get ticks() {
    return getTicksFromSection(this.ticksSection);
  }

  get equity() {
    if (!this.balance) {
      return 0;
    }

    let equity = this.balance.equity;
    for (const position of this.positions) {
      equity = equity + BalanceComponent.pl(position) / this.plBTC(position);
    }

    return equity;
  }

  static mPrice(position) {
    return position.direction === 'sell' ? position.ask : position.bid;
  }

  static pl(position) {
    return ((BalanceComponent.mPrice(position) || position.lastPrice) - position.openPrice) * position.amount;
  }

  ngOnInit() {
    this.transferForm = this.fb.group({
      group: new FormControl(''),
      account: new FormControl(''),
      market1: new FormControl('', [<any>Validators.required]),
      market2: new FormControl('', [<any>Validators.required]),
      amount: new FormControl(0, [<any>Validators.required]),
    });
  }

  openModal(template: any, params = {}) {
    this.modalRef = this.modalService.show(template, params);
  }

  chooseMarker(market) {
    this.currBalance = market;
  }

  onTransfer(model: any, is_Valid: boolean) {
    if (is_Valid) {
      const model2 = {...model, ...{currency: this.currency}};
      console.log(model2);
      this.modalRef.hide();
    }
  }

  chooseCurrency(curr) {
    this.currency = curr;
  }

  private plBTC(position) {
    const pair = position.pair.slice(-3);
    const tick = this.ticks.filter(t => {
      return t.pair === 'BTC' + pair;
    });

    if (tick.length === 0 || pair === 'BTC') {
      return 1;
    }

    return position.direction === 'sell' ? tick[0].ask : tick[0].bid;
  }
}
