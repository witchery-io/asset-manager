import {
  Component,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';

import {
  BsModalService,
} from 'ngx-bootstrap/modal';

import {
  OrderService,
} from '../../../services';

import {
  BsModalRef,
} from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  currency: any;

  constructor(
    private orderService: OrderService,
    private modalService: BsModalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    console.log('StatusBarComponent - ngOnInit');
    // this.orderService.fetchBalance();

    this.transferForm = this.fb.group({
      group: new FormControl(''),
      account: new FormControl(''),
      market1: new FormControl('', [<any>Validators.required]),
      market2: new FormControl('', [<any>Validators.required]),
      amount: new FormControl(0, [<any>Validators.required]),
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
