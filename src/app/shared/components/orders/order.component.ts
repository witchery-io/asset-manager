import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Role } from '@app/shared/enums';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalService, OrdersService, SharedService } from '@app/shared/services';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { GROUPS, PARENT } from '@app/shared/enums/trading.enum';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  role = 'admin';
  user: any;
  ROLE = Role;
  PARENT = PARENT;
  faPlus = faPlus;
  faMinus = faMinus;
  @Input() type = GROUPS;
  @Input() order: any;
  @Input() permission: string;
  @Input() accounts: any;
  @Input() groupByPair = false;
  isCollapsed: boolean;
  modalRef: BsModalRef;
  modifyForm: FormGroup;
  private readonly notifier: NotifierService;

  // account_name: string;

  constructor(
    private modalService: ModalService,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService,
    private ordersService: OrdersService,
    private shared: SharedService,
  ) {
    this.notifier = notifierService;
  }

  get tooltip() {
    // return this.account_name;
    return '';
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    const collapse = JSON.parse(localStorage.getItem(`collapse.position.${this.order.orderNumber}`));
    this.isCollapsed = collapse === null ? true : collapse;
    this.setAccountName();
    this.modifyForm = new FormGroup({
      price: new FormControl(0),
      originalAmount: new FormControl('', [<any>Validators.required]),
    });
  }

  setAccountName() {
    /*    if (this.permission !== 'parent' && this.type === 'group' && this.accounts && !this.groupByPair) {
          for (const account of this.accounts) {
            if (account.id === this.order.account) {
              this.account_name = account.name;
              break;
            }
          }
        }*/
  }

  openModal(template: any, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  /**
   * cancel current order
   */
  orderCancel() {
    this.shared.orderCancel(this.order);
  }

  orderModify(order, template) {
    let originalAmount = this.order.originalAmount;
    if (this.order.suborders != null && this.order.suborders.length > 0) {
      for (const account of this.accounts) {
        if (account.id === this.order.suborders[0].account) {
          originalAmount = this.order.suborders[0].originalAmount / account.risk;
        }
      }
    }

    order.originalAmount = originalAmount;

    this.modifyForm.patchValue(order);
    this.openModal(template, {class: 'modal-sm'});
  }

  /*
  * order
  * */
  orderApprove(params: any, isValid: boolean) {
    if (isValid) {
      /*
      * todo :: test
      * */
      params.type = this.order.type;
      params.pair = this.order.pair;
      params.orderNumber = this.order.orderNumber;
      params.amount = params.originalAmount;
      params.context = this.order.context;
      this.shared.orderApprove(params);
    }
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(`collapse.position.${this.order.orderNumber}`, this.isCollapsed ? 'true' : 'false');
  }
}
