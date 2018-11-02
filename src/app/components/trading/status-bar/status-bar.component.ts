import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { OrderService } from '../../../services/order.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service'
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],

})
export class StatusBarComponent implements OnInit {

  @Input() groups: any;
  @Input() accounts: any;
  modalRef: BsModalRef;
  transferForm: FormGroup;
  curr_balance: any;

  constructor(
    private orderService: OrderService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.orderService.fetchBalance();

    this.transferForm = new FormGroup({
      group: new FormControl(''),
      account: new FormControl(''),
      market1: new FormControl(''),
      market2: new FormControl(''),
      fee: new FormControl(''),
    });
  }

  get balance() {
    return this.orderService.balance;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  chooseMarker(market) {
    this.curr_balance = market;
  }

  onTransfer(model: any, is_Valid: boolean) {
    console.log(is_Valid);
    console.log(model);
  }
}
