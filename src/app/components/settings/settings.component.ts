import {Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  modalRef: BsModalRef;
  accounts: any;

  constructor(
    private modalService: BsModalService,
    private accountService: AccountService,
    ) { }

  ngOnInit() {
    this.accounts = this.accountService.get();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirmed($event, ...props) {
    $event.preventDefault();

    this.accountService.set({
      id: this.accounts.length + 1,
      status: false,
      accName: props[0].value,
      userName: props[1].value,
      exchange: props[2].value,
      baseCurrency: props[3].value,
      equity: '15',
      date: '15/12/2018',
    });
  }

}
