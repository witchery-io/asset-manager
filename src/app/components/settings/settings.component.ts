import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  modalRef: BsModalRef;
  accounts: any;
  account: any;

  public groupForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private accountService: AccountService,
    ) { }

  ngOnInit() {
    this.accounts = this.accountService.get();
    this.account = this.accountService.getItem();

    this.groupForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      allocation_method: new FormControl('', [<any>Validators.required]),
    });
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

  currentAccount($event, id) {
    this.account = this.accountService.getItem(id);
  }
}
