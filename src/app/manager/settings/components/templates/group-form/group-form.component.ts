import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '@app/core/services';
import { NotifierService } from 'angular-notifier';
import { ModalService } from '@app/shared/services';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  @Input()
  formType: string;

  @Input()
  values = {};

  groupForm: FormGroup;
  baseCurrency = ['usd', 'btc', 'eth', 'eur'];
  exchanges = ['bitfinex', 'cexio'];
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
      allocation_method: new FormControl('0', [<any>Validators.required]),
      active: new FormControl(true, [<any>Validators.required]),
      exchange: new FormControl('bitfinex', [<any>Validators.required]),
      base_currency: new FormControl('usd', [<any>Validators.required]),
    });

    this.groupForm.patchValue(this.values);
  }

  close() {
    this.modalService.closeAllModals();
  }

  create(values, isValid) {
    if (isValid) {
      this.groupService.create(values)
        .subscribe(d => {

          // todo :: d

          this.close();
          this.notifier.notify( 'success', `Group was successfully created.`);
        }, error1 => {
          this.notifier.notify( 'error', `Error msg: ${ error1.message }`);
        });
    }
  }

  update(values, isValid) {
    if (isValid) {
      this.groupService.update(values)
        .subscribe(d => {

          // todo :: d

          this.close();
          this.notifier.notify( 'success', `Group was successfully edited.`);
        }, error1 => {
          this.notifier.notify( 'error', `Error msg: ${ error1.message }`);
        });
    }
  }
}
