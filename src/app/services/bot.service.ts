import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  strategy = [
    this.getEmptyStrategy({
      id: '0',
      name: 'Grid',
      template: [
        this.getEmptyTemplate({
          id: '0',
          name: 'Template 1',
          template: '0',
          grid: {
            pair: '',
            initial_volume: 0,
            initial_volume_percent: 0,
            max_amount: 0,
            step_fix: 0,
            step_calc: '',
            trade_level_up: 0,
            trade_level_down: 0,
            priority_coefficient: '',
            volume_coeff_up: 0,
            volume_coeff_down: 0,
            close_triger: 0,
            distribution_from_up: '',
          },
        }),
        this.getEmptyTemplate({
          id: '1',
          name: 'Template 2',
          template: '1',
          grid: {
            pair: '',
            initial_volume: 0,
            initial_volume_percent: 0,
            max_amount: 0,
            step_fix: 0,
            step_calc: '',
            trade_level_up: 0,
            trade_level_down: 0,
            priority_coefficient: '',
            volume_coeff_up: 0,
            volume_coeff_down: 0,
            close_triger: 0,
            distribution_from_up: '',
          },
        }),
      ],
    }),
    this.getEmptyStrategy({
      id: '1',
      name: 'Internal Arbitrage',
      template: [
        this.getEmptyTemplate({
          id: '0',
          name: 'Template 3',
          template: '0',
          ia: {
            amount: '',
            revenue: '',
          },
        }),
        this.getEmptyTemplate({
          id: '1',
          name: 'Template 4',
          template: '1',
          ia: {
            amount: '',
            revenue: '',
          },
        }),
      ],
    }),
    this.getEmptyStrategy({
      id: '2',
      name: 'External Arbitrage',
      template: [
        this.getEmptyTemplate({
          id: '0',
          name: 'Template 5',
          template: '0',
          ea: {
            open_trigger: '',
            open_trigger_volume_step: '',
            close_trigger: '',
            next_trade_timer_min: 0,
            initial_trade_volume: 0,
            max_trades_cap: 0,
            max_exposure: 0,
          },
        }),
        this.getEmptyTemplate({
          id: '1',
          name: 'Template 6',
          template: '1',
          ea: {
            open_trigger: '',
            open_trigger_volume_step: '',
            close_trigger: '',
            next_trade_timer_min: 0,
            initial_trade_volume: 0,
            max_trades_cap: 0,
            max_exposure: 0,
          },
        }),
      ],
    }),
  ];

  templates = [
    {
      id: '0',
      name: 'Template 1',
      bots: [
        {
          id: '0',
          exchange: 'bitfinex',
          group: '',
          account: '',
          long_term_priority: 0,
          pair: 'BTCUSD',
          initial_volume: 0,
          initial_volume_percent: 0,
          max_amount: 0,
          step_fix: 0,
          step_calc: '',
          trade_level_up: 0,
          trade_level_down: 0,
          priority_coefficient: '',
          volume_coeff_up: 0,
          volume_coeff_down: 0,
          close_triger: 0,
          distribution_from_up: '',
        },
        {
          id: '1',
          exchange: 'cexio',
          group: '',
          account: '',
          long_term_priority: 0,
          pair: 'DASHUSD',
          initial_volume: 0,
          initial_volume_percent: 0,
          max_amount: 0,
          step_fix: 0,
          step_calc: '',
          trade_level_up: 0,
          trade_level_down: 0,
          priority_coefficient: '',
          volume_coeff_up: 0,
          volume_coeff_down: 0.5,
          close_triger: 0,
          distribution_from_up: '',
        },
      ],
    },
    {
      id: '1',
      name: 'Template 2',
      bots: [
        {
          id: '0',
          exchange: '',
          group: '',
          account: '',
          long_term_priority: 0,
          amount: '',
          revenue: '',
        },
        {
          id: '1',
          exchange: '',
          group: '',
          account: '',
          long_term_priority: 0,
          amount: '',
          revenue: '',
        },
        {
          id: '3',
          exchange: '',
          group: '',
          account: '',
          long_term_priority: 0,
          amount: '',
          revenue: '',
        },
      ],
    },
    {
      id: '2',
      name: 'Template 3',
      bots: [
        {
          id: '0',
          exchange: '',
          group: '',
          account: '',
          long_term_priority: 0,
          open_trigger: '',
          open_trigger_volume_step: '',
          close_trigger: '',
          next_trade_timer_min: 0,
          initial_trade_volume: 0,
          max_trades_cap: 0,
          max_exposure: 0,
        },
      ],
    }
  ];

  constructor(
    public http: HttpClient,
  ) { }

  create(body: any): Observable<any> {
    return this.http.post(`https://bots.vitanova.online/api/start/${ body.strategy }`, body);
  }

  getStrategy(): Observable<any> {
    return of(this.strategy);
  }

  getTemplates(): Observable<any> {
    return of(this.templates);
  }

  saveAsTemplate(model: any) {
    this.strategy[model.strategy].template[model.template] = {...this.strategy[model.strategy].template[model.template], ...model};
  }

  getEmptyStrategy(strategy = {}) {
    return {
      id: '',
      name: '',
      template: [],
      ...strategy,
    };
  }

  getEmptyTemplate(template = {}) {
    return {
      id: '0',
      name: '',
      template: '',
      exchange: '',
      group: '',
      account: '',
      long_term_priority: 0,
      ...template,
    };
  }
}
