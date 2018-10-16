import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit, OnChanges {

  modalRef: BsModalRef;
  @Input() values: any;

  selectedOrder: number;
  selectedPosition: number;
  orderType = ['buy', 'sell'];
  orders = [];

  currentOrderTab: number;

  constructor(
    private orderService: OrderService,
    private modalService: BsModalService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.fetchOrders();
  }

  ngOnInit() {
    this.selectTab(0);
    this.fetchOrders();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  selectTab(tab_id: number) {
    this.currentOrderTab = tab_id;
  }

  fetchOrders() {
    this.orderService.getGroupOrders(this.values.id, {})
      .subscribe(
        orders => {
          this.orders = orders;
        }
      );
  }

  modify() {
    // code ...
  }

  confirm(): void {
    console.log('Confirmed!');
    console.log(this.currentOrderTab);
    this.modalRef.hide();
  }

  decline(): void {
    console.log('Declined!');
    console.log(this.currentOrderTab);
    this.modalRef.hide();
  }
}
