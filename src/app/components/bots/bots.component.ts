import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Bots} from '../../models/bots';
import {BotService} from '../../services/bot.service';
import {GroupsService} from '../../services/groups.service';
import {Router} from '@angular/router';
import {Group} from '../../models/group';



@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.scss']
})



export class BotsComponent implements OnInit {
  public items: Bots[] = [];
  public group: any = [];
  public groupExchange = [];
  public exchanges: string;
  modalRef: BsModalRef;
  show: boolean = false;

  public bots: any[];

  public botForm: FormGroup;
  public editBotForm: FormGroup;


    constructor(
    private modalService: BsModalService,
    public botService: BotService,
    public groupsService: GroupsService,
    public router: Router
  ) {


    }

  ngOnInit() {

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
      tamplate: new FormControl(0, [<any>Validators.required]),

    });

    this.editBotForm = new FormGroup({
      strategy: new FormControl(0, [<any>Validators.required]),
      long_term_priority: new FormControl(0, [<any>Validators.required]),
      exchange: new FormControl(0, [<any>Validators.required]),
      group: new FormControl(0, [<any>Validators.required]),

    });


    // this.items = this.botService.getData();

    // this.group = this.groupsService.getAll();

  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // filterForeCasts(filterVal: any) {
  //     console.log(filterVal);
  //   if (filterVal == '0')
  //     this.items = this.cacheItems;
  //   else
  //     this.items = this.cacheItems.filter((item) => item.exchanges_name == filterVal);
  // }


  getSelected(filterVal: any) {
      console.log(typeof filterVal);
    if (filterVal === '0') {
      this.groupExchange = this.groupsService.groups;
    } else {
      this.groupExchange = this.groupsService.groups.filter((item) => item.id === 'group1');
    }
  }



  getTamplate(val: any) {
     this.show = val !== '0' ? true : false;
  }


  createBot(model: Bots, isValid: boolean) {
    console.log(model);
    if (isValid) {
      this.botService.createaBot(model);
      this.botForm.reset({
        strategy: '',
        group: '',
        long_term_priority: '',
        exchange: '',
        tamplate: ''
      });
      this.modalRef.hide();
    }
  }
}
