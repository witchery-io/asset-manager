import { Component, Input, OnInit, } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { BsModalRef, } from 'ngx-bootstrap';
import { ModalService, OrdersService } from '@app/shared/services';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { OrderDirection, OrderType } from '@app/shared/enums';
import { NotifierService } from 'angular-notifier';
import { ACCOUNTS, GROUPS } from '@app/shared/enums/trading.enum';

@Component({
  selector: 'app-button-view, button-view',
  templateUrl: './button-view.component.html',
  styleUrls: ['./button-view.component.scss'],
})
export class ButtonViewComponent implements ViewCell, OnInit {
  role = 'admin';

  @Input()
  value: string | number;

  @Input()
  rowData: any;

  user: any;
  faPlus = faPlus;

  modalRef: BsModalRef;
  private readonly notifier: NotifierService;

  constructor(
    private modalService: ModalService,
    private ordersService: OrdersService,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  openModal(template: any, params = {}) {
    this.modalRef = this.modalService.show(template, params);
  }

  onOrder(params) {
    params.pair = this.rowData.pair;

    switch (this.rowData.type) {
      case GROUPS:
        this.groupOrder(this.rowData.id, params);
        break;
      case ACCOUNTS:
        this.accountOrder(this.rowData.id, params);
        break;
    }
  }

  groupOrder(id, order) {
    this.ordersService.placeGroupOrder(id, order)
      .subscribe((d: any) => {
        this.modalService.closeAllModals();
        this.notifier.notify('success', `Placed ${d.type} order to ${d.direction} ${d.amount} ${d.pair} @ ${d.price}.`);
      });
  }

  accountOrder(id, order) {
    this.ordersService.placeAccountOrder(id, order)
      .subscribe((d: any) => {
        this.modalService.closeAllModals();
        this.notifier.notify('success', `Placed ${d.type} order to ${d.direction} ${d.amount} ${d.pair} @ ${d.price}.`);
      });
  }
}
