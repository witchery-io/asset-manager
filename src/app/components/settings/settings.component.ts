import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { GroupsService } from '../../services/groups.service';
import { Group } from '../../models/group';

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
  public selectedGroup: number;

  constructor(
    private modalService: BsModalService,
    private accountService: AccountService,
    public groupsService: GroupsService,
    ) { }

  ngOnInit() {
    this.accounts = this.accountService.get();
    this.account = this.accountService.getItem();

    this.groupForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      allocation_method: new FormControl(0, [<any>Validators.required]),
      active: new FormControl(true, [<any>Validators.required]),
      exchange: new FormControl('bifinex', [<any>Validators.required]),
      base_currency: new FormControl('usd', [<any>Validators.required]),
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

  createGroup(model: Group, isValid: boolean) {
    console.log(model);
    if (isValid) {
      this.groupsService.createaGroup(model);
      this.groupForm.reset({allocation_method: 0, active: true});
      this.modalRef.hide();
    }
  }
}
