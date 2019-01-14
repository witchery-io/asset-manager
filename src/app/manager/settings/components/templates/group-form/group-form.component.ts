import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { }

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

  }

  createGroup(values, is_valid) {
    if (is_valid) {
      // emit
    }
  }

  editGroup(values, is_valid) {
    if (is_valid) {
      // emit
    }
  }

}
