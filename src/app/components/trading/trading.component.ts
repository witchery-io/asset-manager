import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { GroupsService } from '../../services/groups.service';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TickService } from '../../services/tick.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Margin } from '../../models/margin';
import { Exchange } from '../../models/exchange';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit {

  modalRef: BsModalRef;
  currentType: string;
  currentTypeId: string;
  currentTickId: number;
  exchangeForm: FormGroup;
  marginForm: FormGroup;
  groups: any;

  constructor(
    private modalService: BsModalService,
    private groupsService: GroupsService,
    private accountService: AccountService,
    private tickService: TickService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentType = params['type'];
      this.currentTypeId = params['id'];
    });

    this.groupsService.getGroups().subscribe(
      groups => {
        this.groups = groups;
      }
    );

    this.exchangeForm = new FormGroup({
      o_type: new FormControl('limit', [<any>Validators.required]),
      price: new FormControl('', [<any>Validators.required]),
      amount: new FormControl('', [<any>Validators.required]),
    });

    this.marginForm = new FormGroup({
      o_type: new FormControl('limit', [<any>Validators.required]),
      price: new FormControl('', [<any>Validators.required]),
      amount: new FormControl('', [<any>Validators.required]),
    });
  }

  tickSettings(template: TemplateRef<any>, tickId) {
    this.currentTickId = tickId;
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  get accounts() {
    return this.accountService.getAccounts();
  }

  get ticks() {
    return this.tickService.getTicks();
  }

  get tick() {
    return this.tickService.getTick(this.currentTickId);
  }

  changeType(type, current_type_id) {
    this.currentTypeId = current_type_id;
    this.router.navigate([`/trading/${ type }/${ current_type_id }`]);
  }

  buyExchange(model: Exchange, isValid: boolean) {
    if (isValid) {
      console.log({...model, ...{ context: 'exchange', base_currency: 'buy' }});
      console.log('valid');
    }

  }

  sellExchange(model: Exchange, isValid: boolean) {
    if (isValid) {
      console.log({...model, ...{ context: 'exchange', base_currency: 'sell' }});
      console.log('valid');
    }

  }

  buyMargin(model: Margin, isValid: boolean) {
    if (isValid) {
      console.log({...model, ...{ context: 'margin', base_currency: 'buy' }});
      console.log('valid');
    }

  }

  sellMargin(model: Margin, isValid: boolean) {
    if (isValid) {
      console.log({...model, ...{ context: 'margin', base_currency: 'sell' }});
      console.log('valid');
    }

  }
}
