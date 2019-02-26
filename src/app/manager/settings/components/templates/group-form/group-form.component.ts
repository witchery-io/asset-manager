import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '@app/core/services';
import { NotifierService } from 'angular-notifier';
import { ModalService } from '@app/shared/services';
import { Group } from '@app/core/intefaces';
import { AddGroup, UpdateGroup } from '@app/core/actions/group.actions';
import { Store } from '@ngrx/store';
import { SettingsState } from '@settings/reducers';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  @Input()
  formType: string;

  @Input()
  values: Group;

  groupForm: FormGroup;
  baseCurrency = ['USD', 'BTC', 'ETH', 'EUR', 'LTC'];
  exchanges = ['bitfinex.com'];
  allocationMethods = [
    {
      name: 'Lot Multiplier Allocation',
      value: 'multiplier'
    }, {
      name: 'Proportional by Equity Allocation',
      value: 'equity'
    }
  ];

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
    this.groupForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      allocationMethod: new FormControl('multiplier', [<any>Validators.required]),
      exchange: new FormControl('bitfinex.com', [<any>Validators.required]),
      baseCurrency: new FormControl('USD', [<any>Validators.required]),
    });

    this.groupForm.patchValue(this.values || {});
  }

  close() {
    this.modalService.closeAllModals();
  }

  create(values, isValid) {
    if (isValid) {
      this.groupService.create(values)
        .subscribe((group: Group) => {
          this.store.dispatch(new AddGroup(group));
          this.close();
          this.notifier.notify('success', `Group was successfully created.`);
        });
    }
  }

  update(values, isValid) {
    if (isValid) {
      this.groupService.update(this.values.id, values)
        .subscribe(() => {
          values.id = this.values.id;
          this.store.dispatch(new UpdateGroup(values));
          this.close();
          this.notifier.notify('success', `Group was successfully edited.`);
        });
    }
  }
}
