import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '@app/core/services';
import { NotifierService } from 'angular-notifier';
import { ModalService } from '@app/shared/services';
import { Group } from '@app/core/intefaces';

@Component({
  selector: 'app-add-account-form',
  templateUrl: './add-account-form.component.html',
  styleUrls: ['./add-account-form.component.scss'],
})
export class AddAccountFormComponent implements OnInit {

  @Input()
  accounts: any;

  @Input()
  group: Group;

  addAccountForm: FormGroup;
  private readonly notifier: NotifierService;

  constructor(
    private groupService: GroupService,
    private notifierService: NotifierService,
    private modalService: ModalService,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.addAccountForm = new FormGroup({
      accountId: new FormControl('', [<any>Validators.required]),
    });
  }

  close() {
    this.modalService.closeAllModals();
  }

  add(values: any, isValid: boolean) {
    if (isValid) {
      this.groupService.addAccount(this.group.id, values)
        .subscribe(() => {
          this.close();
          this.notifier.notify('success', `Account was successfully added.`);
        }, error1 => {
          this.notifier.notify('error', `Error msg: ${error1.message}.`);
        });
    }
  }

}
