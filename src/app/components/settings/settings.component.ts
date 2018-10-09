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
  public accountForm: FormGroup;

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

    this.accountForm = new FormGroup({
      accName: new FormControl('', [<any>Validators.required]),
      userName: new FormControl('', [<any>Validators.required]),
      risk: new FormControl('', [<any>Validators.required]),
      exchange: new FormControl('', [<any>Validators.required]),
      baseCurrency: new FormControl('', [<any>Validators.required]),
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  create($event) {
    $event.preventDefault();
    this.accountService.set(this.accountForm.value);
  }

  currentAccount($event, id) {
    this.account = this.accountService.getItem(id);
  }
}
