import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BotService } from '../../services/bot.service';
import { GroupsService } from '../../services/groups.service';
import { AccountService } from '../../services/account.service';
import { ModalService } from '../../services/modal.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.scss'],
})
export class BotsComponent implements OnInit {
  modalRef: BsModalRef;
  botForm: FormGroup;

  strategy: any;
  templates$: Observable<any>;
  currentStrategy: any;
  groups: any;
  accounts: any;
  editBotForm: FormGroup;

  constructor(
    private modalService: ModalService,
    private botService: BotService,
    private groupsService: GroupsService,
    private accountService: AccountService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.botService.getStrategy().subscribe(strategy => this.strategy = strategy);
    this.templates$ = this.botService.getTemplates();
    this.groupsService.getGroups().subscribe(groups => this.groups = groups);
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);

    this.botForm = this.fb.group({
      strategy: new FormControl('', [<any>Validators.required]),
      template: new FormControl('', [<any>Validators.required]),
      exchange: new FormControl('any', [<any>Validators.required]),
      group: new FormControl('', []),
      account: new FormControl('', []),
      long_term_priority: new FormControl(0, [<any>Validators.required]),
      items: this.fb.array([]),
    });

    this.editBotForm = new FormGroup({
      strategy: new FormControl(0, [<any>Validators.required]),
      long_term_priority: new FormControl(0, [<any>Validators.required]),
      exchange: new FormControl(0, [<any>Validators.required]),
      group: new FormControl(0, [<any>Validators.required]),
    });
  }

  openModal(template: TemplateRef<any>, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  createBot(model: any, is_Valid: boolean) {
    if (is_Valid) {
      console.log(model);
      console.log(is_Valid);
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

    this.items.removeAt(0);
    this.currentStrategy = this.strategy[strategy_id];
    this.botForm.reset({
      strategy: strategy_id,
    });
  }

  chooseTemplate(template_id) {
    if (!template_id) {
      return false;
    }

    this.items.removeAt(0);
    this.botForm.patchValue(this.currentStrategy.template[template_id]);
    this.items.push(this.fb.group(this.currentStrategy.template[template_id].items[0]));
  }

  get items() {
    return this.botForm.get('items') as FormArray;
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
    this.items.removeAt(0);
    this.modalRef.hide();
  }
}
