import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bots } from '../../models/bots';
import { BotService } from '../../services/bot.service';
import { GroupsService } from '../../services/groups.service';


@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.scss']
})

export class BotsComponent implements OnInit {
  public groupExchange = [];
  modalRef: BsModalRef;
  show: boolean = false;
  public bots: any[];
  public groups = [];

  public botForm: FormGroup;
  public editBotForm: FormGroup;

    constructor(
    private modalService: BsModalService,
    public botService: BotService,
    public groupsService: GroupsService,
  ) {


    }

  ngOnInit() {

    this.groupsService.getGroups()
      .subscribe((data: any[]) => {
        this.groups = data;
      });

    this.botForm = new FormGroup({
      strategy: new FormControl(0, [<any>Validators.required]),
      active: new FormControl(true, [<any>Validators.required]),
      group: new FormControl('', [<any>Validators.required]),
      account: new FormControl('', [<any>Validators.required]),
      long_term_priority: new FormControl(0, [<any>Validators.required]),
      exchange: new FormControl(0, [<any>Validators.required]),
      pair: new FormControl('', [<any>Validators.required]),
      initial_volume: new FormControl('', [<any>Validators.required]),
      initial_volume_percent: new FormControl('', [<any>Validators.required]),
      max_amount: new FormControl('', [<any>Validators.required]),
      step_fix: new FormControl('', [<any>Validators.required]),
      step_calc: new FormControl('', [<any>Validators.required]),
      trade_level: new FormControl('', [<any>Validators.required]),
      priority1coefficient: new FormControl('', [<any>Validators.required]),
      priority2coefficient: new FormControl('', [<any>Validators.required]),
      volume_coeff_up: new FormControl('', [<any>Validators.required]),
      volume_coeff_down: new FormControl('', [<any>Validators.required]),
      close_triger_below: new FormControl('', [<any>Validators.required]),
      close_triger_above: new FormControl('', [<any>Validators.required]),
      template: new FormControl(0, [<any>Validators.required]),

    });

    this.editBotForm = new FormGroup({
      strategy: new FormControl(0, [<any>Validators.required]),
      long_term_priority: new FormControl(0, [<any>Validators.required]),
      exchange: new FormControl(0, [<any>Validators.required]),
      group: new FormControl(0, [<any>Validators.required]),
      template: new FormControl(0, [<any>Validators.required]),

    });

    // this.items = this.botService.getData();

    // this.group = this.groupsService.getAll();

  }

  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template);
    this.botForm.reset({
      strategy: 0,
      group: 0,
      long_term_priority: 0,
      exchange: 0,
      template: 0,
    });
    this.show = false;
  }

  getTemplate(val: any) {
     this.show = val !== '0';
  }

  getSelected(filterVal: any) {
    console.log(typeof filterVal);
    if (filterVal === '0') {
      this.groupExchange = this.groups;
    } else {
      this.groupExchange = this.groups.filter((item) => item.exchange === filterVal);
    }
  }

  createBot(model: Bots, isValid: boolean) {
    if (isValid) {
      this.botService.createaBot(model);
      this.botForm.reset({
        strategy: 0,
        group: '',
        long_term_priority: 0,
        exchange: 0,
        template: 0,
      });
      this.modalRef.hide();
      console.log(model);
    }
  }
}
