import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BotService } from '../../services/bot.service';
import { GroupsService } from '../../services/groups.service';
import { AccountService } from '../../services/account.service';
import { ModalService } from '../../services/modal.service';
import { TickService } from '../../services/tick.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.scss'],
})
export class BotsComponent implements OnInit {
  modalRef: BsModalRef;
  botForm: FormGroup;

  gridForm: FormGroup;
  iaForm: FormGroup;
  eaForm: FormGroup;

  strategy: any;
  bots$: Observable<any>;
  ticks$: Observable<any>;
  currentStrategy: any;
  groups: any;
  accounts: any;

  filter = {
    pair: '',
    group: '',
  };

  constructor(
    private modalService: ModalService,
    private botService: BotService,
    private groupsService: GroupsService,
    private accountService: AccountService,
    private tickService: TickService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.botService.getStrategy().subscribe(strategy => this.strategy = strategy);
    this.bots$ = this.botService.getBots();
    this.groupsService.getGroups().subscribe(groups => this.groups = groups);
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
    this.ticks$ = this.tickService.getTicks();

    this.gridForm = this.fb.group({
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
      amount:  new FormControl(''),
      revenue:  new FormControl(''),
    });

    this.eaForm = this.fb.group({
      open_trigger:  new FormControl(''),
      open_trigger_volume_step:  new FormControl(''),
      close_trigger:  new FormControl(''),
      next_trade_timer_min:  new FormControl(0),
      initial_trade_volume:  new FormControl(0),
      max_trades_cap:  new FormControl(0),
      max_exposure:  new FormControl(0),
    });

    this.botForm = this.fb.group({
      strategy: new FormControl('', [<any>Validators.required]),
      template: new FormControl('', [<any>Validators.required]),
      exchange: new FormControl('any', [<any>Validators.required]),
      group: new FormControl('', []),
      account: new FormControl('', []),
      long_term_priority: new FormControl(0, [<any>Validators.required]),
      grid: this.gridForm,
      ia: this.iaForm,
      ea: this.eaForm,
    });
  }

  openModal(template: TemplateRef<any>, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  createBot(model: any, is_Valid: boolean) {
    if (is_Valid) {
      this.botService.create(model)
        .subscribe(res => {
          console.log('Bot have created', res);
        });
      this.resetForm();
    }
  }

  save(model: any, is_Valid: boolean) {
    if (is_Valid) {
      this.botService.saveAsTemplate(model);
      this.resetForm();
    }
  }

  saveAs(is_Valid: boolean, template: TemplateRef<any>) {
    if (is_Valid) {
      this.openModal(template, { class: 'modal-sm' });
    }
  }

  confirmSaveAs(template_name) {
    if (!template_name) {
      return false;
    }

    console.log(this.botForm.value);
    console.log(template_name);

    this.resetForm();
    this.modalService.closeAllModals();
  }

  chooseStrategy(strategy_id) {
    if (!strategy_id) {
      return false;
    }

    this.currentStrategy = this.strategy[strategy_id];
    this.botForm.reset({
      strategy: strategy_id,
    });
  }

  chooseTemplate(template_id) {
    if (!template_id) {
      return false;
    }

    this.botForm.patchValue(this.currentStrategy.template[template_id]);
  }

  chooseExchange(exchange_id) {
    this.groupsService.getGroups()
      .subscribe(groups => this.groups = groups.filter(group => {
        if (exchange_id === 'any') {
          return group;
        }

        return group.exchange === exchange_id;
      }));
  }

  changeSelect($event, type) {
    if (type === 'group') {
      this.botForm.patchValue({ account: '' });
    } else {
      this.botForm.patchValue({ group: '' });
    }
  }

  resetForm() {
    this.botForm.reset();
    this.modalRef.hide();
  }

  changeFilter(value, type): void {
    this.filter[type] = value;
    this.bots$ = this.botService.getBots(this.filter);
  }
}
