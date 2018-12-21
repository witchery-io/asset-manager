import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { getBalanceFromSection } from '@trading/state/trading.selectors';
import { getAccountsFromSection, getGroupsFromSection } from '@app/core/reducers';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { OrdersService } from '@app/shared/services';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  @Input()
  section: any;

  @Input()
  groupSection: any;

  @Input()
  accountsSection: any;

  modalRef: BsModalRef;
  transferForm: FormGroup;
  curr_balance: any;
  currency: any;

  constructor(
    private ordersService: OrdersService,
    private modalService: BsModalService,
    private fb: FormBuilder,
  ) {
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

  get balance() {
    return getBalanceFromSection(this.section);
  }

  get accounts() {
    return getAccountsFromSection(this.accountsSection);
  }

  get groups() {
    return getGroupsFromSection(this.groupSection);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  chooseMarker(market) {
    this.curr_balance = market;
  }

  onTransfer(model: any, is_Valid: boolean) {
    if (is_Valid) {
      const model2 = { ...model, ...{ currency: this.currency } };
      console.log(model2);
      this.modalRef.hide();
    }
  }

  chooseCurrency(curr) {
    this.currency = curr;
  }
}
