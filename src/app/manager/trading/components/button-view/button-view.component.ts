import { Component, Input, OnInit, TemplateRef, } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { BsModalRef, } from 'ngx-bootstrap';
import { ModalService, OrdersService } from '@app/shared/services';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { OrderDirection, OrderType } from '@app/shared/enums';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-button-view, button-view',
  templateUrl: './button-view.component.html',
  styleUrls: ['./button-view.component.scss'],
})
export class ButtonViewComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  user: any;
  faPlus = faPlus;
  id: string; // trading type id -> 6a86df61-c190-4347-9b61-34cbd88d38a4

  modalRef: BsModalRef;
  private readonly notifier: NotifierService;

  constructor(
    private modalService: ModalService,
    private ordersService: OrdersService,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  get role() {
    return 'admin';
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  openModal(template: TemplateRef<any>, params = {}) {
    this.modalRef = this.modalService.show(template, params);
  }

  onGroupOrder(order = {}) {
    this.ordersService.placeGroupOrder(this.id, order)
      .subscribe((d: any) => {
        const msg = `Placed ${OrderType[d.type.type]} order to ${OrderDirection[d.type.direction]}
           ${d.amount} ${d.pair} @ ${d.open_price}.`;
        this.notifier.notify('success', msg);
      }, error1 => {
        this.notifier.notify('error', `Error msg: ${error1.message}`);
      }, () => {
        this.modalService.closeAllModals();
      });
  }

  onAccountOrder(order = {}) {
    this.ordersService.placeAccountOrder(this.id, order)
      .subscribe((d: any) => {
        const msg = `Placed ${OrderType[d.type.type]} order to ${OrderDirection[d.type.direction]}
           ${d.amount} ${d.pair} @ ${d.open_price}.`;
        this.notifier.notify('success', msg);
      }, error1 => {
        this.notifier.notify('error', `Error msg: ${error1.message}`);
      }, () => {
        this.modalService.closeAllModals();
      });
  }
}
