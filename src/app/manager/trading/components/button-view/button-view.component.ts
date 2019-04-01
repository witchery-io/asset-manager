import { Component, Input, OnInit, } from '@angular/core';
import { BsModalRef, } from 'ngx-bootstrap';
import { ModalService, OrdersService } from '@app/shared/services';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NotifierService } from 'angular-notifier';
import { LoadOrders } from '@trading/actions/orders.actions';
import { Store } from '@ngrx/store';
import { TradingState } from '@trading/reducers';
import { LoadPositions } from '@trading/actions/positions.actions';

@Component({
  selector: 'app-button-view, button-view',
  templateUrl: './button-view.component.html',
  styleUrls: ['./button-view.component.scss'],
})
export class ButtonViewComponent implements OnInit {
  role = 'admin';

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
    private store: Store<TradingState>,
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

    this.ordersService.placeOrder(this.rowData.id, this.rowData.type, params)
      .subscribe((d: any) => {
        /*
        * update orders and positions when create order
        * */
        this.store.dispatch(new LoadOrders({id: this.rowData.id, type: this.rowData.type}));
        this.store.dispatch(new LoadPositions({id: this.rowData.id, type: this.rowData.type, groupByPair: true}));
        /** Temporary **/

        this.modalService.closeAllModals();
        this.notifier.notify('success', `Placed ${d.type} order to ${d.direction} ${d.amount} ${d.pair} @ ${d.price}.`);
      });
  }
}
