import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '@app/core/services';
import { NotifierService } from 'angular-notifier';
import { ModalService } from '@app/shared/services';
import { Group } from '@app/core/intefaces';
import { GroupLoaded } from '@settings/actions/group.actions';
import { Store } from '@ngrx/store';
import { SettingsState } from '@settings/reducers';

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
    private store: Store<SettingsState>,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.addAccountForm = new FormGroup({
      accountId: new FormControl('', [<any>Validators.required]),
      multiplier: new FormControl(0),
    });
  }

  close() {
    this.modalService.closeAllModals();
  }

  add(values: any, isValid: boolean) {
    if (isValid) {
      this.groupService.addAccount(this.group.id, values)
        .subscribe((group: Group) => {
          /*
          * update current group
          * */
          this.store.dispatch(new GroupLoaded({group: group}));
          this.close();
          this.notifier.notify('success', `Account was successfully added.`);
        });
    }
  }

}
