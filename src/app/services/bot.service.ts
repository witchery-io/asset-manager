import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  strategy = [
    this.getEmptyTemplate({
      id: '0',
      template: 'Grid',
    }),
    this.getEmptyTemplate({
      id: '1',
      template: 'Arbitrage',
    }),
  ];

  constructor() {
  }

  getStrategy(): Observable<any> {
    return of(this.strategy);
  }

  saveAsTemplate(model: any) {
    console.log(model);
    this.strategy.push(this.getEmptyTemplate(model));
  }

  getEmptyTemplate(tmp = {}) {
    return {
      id: '0',
      account: '',
      active: false,
      close_triger_above: 0,
      close_triger_below: '',
      exchange: '',
      group: '',
      initial_volume: 0,
      initial_volume_percent: 0,
      long_term_priority: 0,
      max_amount: 0,
      pair: '',
      priority1coefficient: '',
      priority2coefficient: '',
      step_calc: '',
      step_fix: 0,
      strategy: '',
      template: '',
      trade_level: 0,
      volume_coeff_down: 0,
      volume_coeff_up: 0,
      ...tmp,
    };
  }
}
