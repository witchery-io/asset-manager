import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BotService } from '../../services/bot.service';
import { GroupsService } from '../../services/groups.service';
import { Observable } from 'rxjs';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.scss'],
})
export class BotsComponent implements OnInit {
  modalRef: BsModalRef;
  botForm: FormGroup;

  createFormStep1 = false;
  createFormStep2 = false;

  strategy$: Observable<any>;

  groups: any;
  accounts: any;
  editBotForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private botService: BotService,
    private groupsService: GroupsService,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.strategy$ = this.botService.getStrategy();
    this.groupsService.getGroups()
      .subscribe(groups => this.groups = groups);


    this.accountService.getAccounts()
      .subscribe(accounts => this.accounts = accounts);

    this.botForm = new FormGroup({
      template: new FormControl('', [<any>Validators.required]),
      strategy: new FormControl('', [<any>Validators.required]),
      active: new FormControl(true, [<any>Validators.required]),
      group: new FormControl('', [<any>Validators.required]),
      account: new FormControl('', [<any>Validators.required]),
      long_term_priority: new FormControl(0, [<any>Validators.required]),
      exchange: new FormControl('any', [<any>Validators.required]),
      pair: new FormControl('', [<any>Validators.required]),
      initial_volume: new FormControl('', [<any>Validators.required]),
      initial_volume_percent: new FormControl('', [<any>Validators.required]),
      max_amount: new FormControl('', [<any>Validators.required]),

      step_fix: new FormControl('', [<any>Validators.required]),
      step_calc: new FormControl('', [<any>Validators.required]),

      trade_level_up: new FormControl('', [<any>Validators.required]),
      trade_level_down: new FormControl('', [<any>Validators.required]),

      priority_coefficient: new FormControl('', [<any>Validators.required]),

      volume_coeff_up: new FormControl('', [<any>Validators.required]),
      volume_coeff_down: new FormControl('', [<any>Validators.required]),
      close_triger: new FormControl('', [<any>Validators.required]),

      distribution_from_up: new FormControl('', [<any>Validators.required]),
    });

    this.editBotForm = new FormGroup({
      strategy: new FormControl(0, [<any>Validators.required]),
      long_term_priority: new FormControl(0, [<any>Validators.required]),
      exchange: new FormControl(0, [<any>Validators.required]),
      group: new FormControl(0, [<any>Validators.required]),
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createGroup(model: any, is_Valid: boolean) {
    if (is_Valid) {
      console.log(model);
      console.log(is_Valid);
      this.botForm.reset();
      this.modalRef.hide();
    }
  }

  saveAs(model: any, is_Valid: boolean) {
    if (is_Valid) {
      this.botService.saveAsTemplate(model);
      this.botForm.reset();
      this.modalRef.hide();
    }
  }

  chooseValues(template_id, type) {
    if (!template_id) {
      return false;
    }

    switch (type) {
      case 'strategy':
        this.createFormStep1 = true;
        break;
      case 'template':
        this.createFormStep2 = true;
        break;
    }

    return false;
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
}
