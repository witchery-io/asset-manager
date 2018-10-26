import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  modalRef: BsModalRef;
  @Input() data: any;

  selectedOrder: number;
  orderType = ['buy', 'sell'];

  currentlyDeleting: string;
  currentlyDeletingType: string;
  currentOrder: any;

  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  openOrderModal(template, order, type) {
    this.currentOrder = order;
    console.log(type);
/*    this.marginForm.patchValue({
      o_type: type,
      amount: this.currentOrder.amount,
    });*/
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    // this.staticTabs.tabs[1].active = true;

  }
}
