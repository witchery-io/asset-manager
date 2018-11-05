import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BotService } from '../../../services/bot.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {
  @Input() template: any;
  @Input() groups: any;
  @Input() accounts: any;

  modalRef: BsModalRef;
  isHideSub = false;
  editForm: FormGroup;

  gridForm: FormGroup;
  iaForm: FormGroup;
  eaForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private botService: BotService,
  ) { }

  ngOnInit(
  ) {
    this.gridForm = this.fb.group({
      exchange: new FormControl('any'),
      group: new FormControl('', []),
      account: new FormControl('', []),
      long_term_priority: new FormControl(0),
      pair: new FormControl(''),
      initial_volume:  new FormControl(0),
      initial_volume_percent:  new FormControl(0),
      max_amount:  new FormControl(0),
      step_fix:  new FormControl(0),
      step_calc:  new FormControl(''),
      trade_level_up:  new FormControl(0),
      trade_level_down:  new FormControl(0),
      priority_coefficient:  new FormControl(''),
      volume_coeff_up:  new FormControl(0),
      volume_coeff_down:  new FormControl(0),
      close_triger:  new FormControl(0),
      distribution_from_up:  new FormControl(''),
    });

    this.iaForm = this.fb.group({
      exchange: new FormControl('any'),
      group: new FormControl('', []),
      account: new FormControl('', []),
      long_term_priority: new FormControl(0),
      amount:  new FormControl(''),
      revenue:  new FormControl(''),
    });

    this.eaForm = this.fb.group({
      exchange: new FormControl('any'),
      group: new FormControl('', []),
      account: new FormControl('', []),
      long_term_priority: new FormControl(0),
      open_trigger:  new FormControl(''),
      open_trigger_volume_step:  new FormControl(''),
      close_trigger:  new FormControl(''),
      next_trade_timer_min:  new FormControl(0),
      initial_trade_volume:  new FormControl(0),
      max_trades_cap:  new FormControl(0),
      max_exposure:  new FormControl(0),
    });

    this.editForm = this.fb.group({
      grid: this.gridForm,
      ia: this.iaForm,
      ea: this.eaForm,
    });

    this.isHideSub = JSON.parse(localStorage.getItem(`template_collapse_${ this.template.name }`));
  }

  openModal(template: TemplateRef<any>, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

  add(template) {
    this.openModal(template);
  }

  edit(template) {
    this.editForm.reset();
    this.openModal(template);
    this.editForm.patchValue(this.template);
  }

  update(model: any, is_Valid: boolean) {
    if (is_Valid) {
      console.log('template - update', model);
      this.botService.updateBotSettings(model).subscribe(x => console.log(x));
    }
  }

  changeSelect($event, strategy, type) {
    if (type === 'group') {
      this.editForm.patchValue({
        [strategy]: {
          account: '',
        }
      });
    } else {
      this.editForm.patchValue({
        [strategy]: {
          group: '',
        }
      });
    }
  }

  openBot(status) {
    this.isHideSub = status;
    localStorage.setItem(`template_collapse_${ this.template.name }`, status);
  }
}
