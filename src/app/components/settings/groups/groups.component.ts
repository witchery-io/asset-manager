import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Group } from '../../../models/group';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {

  @Input() groups: any;
  @Input() accounts: any;
  modalRef: BsModalRef;
  groupForm: FormGroup;
  addAccountForm: FormGroup;
  currentGroupId: string;
  currentGroupAccounts: any;
  chooseAccount: any;

  constructor(
    private modalService: BsModalService,
    private groupsService: GroupsService,
  ) { }

  ngOnInit() {
    this.groupForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      allocation_method: new FormControl(0, [<any>Validators.required]),
      active: new FormControl(true, [<any>Validators.required]),
      exchange: new FormControl('bitfinex', [<any>Validators.required]),
      base_currency: new FormControl('usd', [<any>Validators.required]),
    });

    this.addAccountForm = new FormGroup({
      account_id: new FormControl('', [<any>Validators.required]),
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createGroup(model: Group, isValid: boolean) {
    if (isValid) {
      this.groupsService.createGroup({ ...model, ...{ allocation_method: +model.allocation_method } })
        .subscribe(() => {
            this.groupForm.reset({ allocation_method: 0, active: true });
            this.modalRef.hide();
          },
        );
    }
  }

  createAddAccount(model: any, isValid: boolean) {
    if (isValid) {
      this.groupsService.addAccount(this.currentGroupId, model)
        .subscribe((result: { group_id: string }) => {
          // this.chooseGroup(result.group_id);
          this.modalRef.hide();
        });
    }
  }

  chooseGroup(group_id, index) {
    this.currentGroupId = group_id;
    this.chooseAccount = this.groups[index];
    this.groupsService.getGroup(group_id)
      .subscribe(group => this.currentGroupAccounts = group.accounts);
  }

  currentAccount($event, i) {
    this.chooseAccount = this.accounts[i];
  }
}
