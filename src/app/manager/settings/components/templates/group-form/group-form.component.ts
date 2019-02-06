import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '@app/core/services';
import { NotifierService } from 'angular-notifier';
import { ModalService } from '@app/shared/services';
import { Group } from '@app/core/intefaces';

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
  allocationMethod = ['fix', 'percent', 'equity'];

  private readonly notifier: NotifierService;

  constructor(
    private groupService: GroupService,
    private notifierService: NotifierService,
    private modalService: ModalService,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.groupForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      allocationMethod: new FormControl('fix', [<any>Validators.required]),
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
        .subscribe(() => {
          this.close();
          this.notifier.notify( 'success', `Group was successfully created.`);
        });
    }
  }

  update(values, isValid) {
    if (isValid) {
      this.groupService.update(this.values.id, values)
        .subscribe(() => {
          this.close();
          this.notifier.notify( 'success', `Group was successfully edited.`);
        });
    }
  }
}
