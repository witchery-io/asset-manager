import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  url = 'https://bots.vitanova.online/api';

  strategy = [
    {
      id: 'grid',
      name: 'Grid',
    },
    {
      id: 'ia',
      name: 'Internal Arbitrage',
    },
    {
      id: 'ea',
      name: 'External Arbitrage',
    },
  ];

  orders = {
    activeorders: [
      {
        account: '',
        amount: 420,
        close_order_number: '',
        commission: 0,
        current_price: 0,
        deleted_at: '0001-01-01T00:00:00Z',
        exchange: 'bitfinex',
        group: '95b31bc0-dcb5-4f43-9516-6123dd3a7409',
        info: '',
        last_updated: '2018-10-26T12:19:38.8877663+04:00',
        open_order_time: '2018-10-25T00:37:40.2556906+04:00',
        open_price: 2,
        order_number: '',
        pair: 'EOSUSD',
        parent_order_number: '',
        pl: 0,
        plmain: 0,
        plmprc: 0,
        source_order_number: '',
        suborders: [],
        swap: 0,
        type: {
          direction: 0,
          type: 2,
          context: 1
        },
        volume: 0,
      },
    ],
    closedorders: [
      {
        account: '',
        amount: 450,
        close_order_number: '',
        commission: 0,
        current_price: 0,
        deleted_at: '0001-01-01T00:00:00Z',
        exchange: 'bitfinex',
        group: '95b31bc0-dcb5-4f43-9516-6123dd3a7409',
        info: '',
        last_updated: '2018-10-26T12:19:38.8877663+04:00',
        open_order_time: '2018-10-25T00:37:40.2556906+04:00',
        open_price: 2,
        order_number: '',
        pair: 'EOSUSD',
        parent_order_number: '',
        pl: 0,
        plmain: 0,
        plmprc: 0,
        source_order_number: '',
        suborders: [],
        swap: 0,
        type: {
          direction: 0,
          type: 2,
          context: 1
        },
        volume: 0,
      },
    ],
  };

  constructor(
    public http: HttpClient,
  ) {
  }

  create(body: any): Observable<any> {
    return this.http.post(`https://bots.vitanova.online/api/start/${ body.strategy }`, body);
  }

  getStrategy(): Observable<any> {
    return of(this.strategy);
  }

  getTemplates(filters = {}): Observable<any> {
    return this.http.get(`${ this.url }/bots`, filters);
    // return of(this.getTemplatesS);
  }

  getBotTemplates(strategy_id): Observable<any> {
    return this.http.get(`${ this.url }/template/${ strategy_id }`);

    // return of(this.getTemplatesS);
  }

  get getTemplatesS() {
    return [
      {
        id: '0',
        name: 'Template 1',
        bots: [
          {
            botname: 'Bot 1',
            statuson: false,
            visible: true,
            port: '0',
            account: '0.5',
            group: '2',
            volume: '4',
            ve: '2',
            countoc: '1',
            pl: '2',
            plclose: '2',
            pltotal: '2',
            active_orders: [],
            closed_orders: [],
            ...this.orders,
          },
          {
            botname: 'Bot 2',
            statuson: true,
            visible: false,
            port: '1',
            account: '0.5',
            group: '2',
            volume: '4',
            ve: '2',
            countoc: '1',
            pl: '2',
            plclose: '2',
            pltotal: '2',
            active_orders: [],
            closed_orders: [],
            ...this.orders,
          },
        ],
        bottype: 'grid',
        grid: {
          exchange: 'bitfinex',
          pair: '1',
          initial_volume: 0.5,
          initial_volume_percent: 0.5,
          max_amount: 0.1,
          step_fix: 0.9,
          step_calc: 0.4,
          distribution_from_up: 2,
          priority_coefficient: 4,
          volume_coeff_up: 21,
          volume_coeff_down: 41,
          close_triger: 2,
          trade_level_up: 7,
          trade_level_down: 1,
          account: '',
          group: '6a86df61-c190-4347-9b61-34cbd88d38a4',
          long_term_priority: 0,
        },
        ia: {},
        ea: {},
      },
      {
        id: '1',
        name: 'Template 2',
        bots: [
          {
            botname: 'Bot 3',
            statuson: false,
            visible: false,
            port: '2',
            account: '0.5',
            group: '2',
            volume: '4',
            ve: '2',
            countoc: '1',
            pl: '2',
            plclose: '2',
            pltotal: '2',
            active_orders: [],
            closed_orders: [],
            ...this.orders,
          },
          {
            botname: 'Bot 4',
            statuson: true,
            visible: true,
            port: '3',
            account: '0.5',
            group: '2',
            volume: '4',
            ve: '2',
            countoc: '1',
            pl: '2',
            plclose: '2',
            pltotal: '2',
            active_orders: [],
            closed_orders: [],
            ...this.orders,
          },
        ],
        bottype: 'ea',
        grid: {},
        ia: {},
        ea: {
          exchange: 'bitfinex',
          group: '',
          account: 'edc23b04-64d8-4469-bb6a-40da55322d26',
          long_term_priority: 0,
          open_trigger: '0.30',
          open_trigger_volume_step: '20',
          close_trigger: '0.20',
          next_trade_timer_min: 20,
          initial_trade_volume: 400,
          max_trades_cap: 20,
          max_exposure: 20,
        },

      },
      {
        id: '2',
        name: 'Template 3',
        bots: [
          {
            botname: 'Bot 5',
            statuson: false,
            visible: true,
            port: '4',
            account: '0.5',
            group: '2',
            volume: '4',
            ve: '2',
            countoc: '1',
            pl: '2',
            plclose: '2',
            pltotal: '2',
            activeorders: [],
            closedorders: [],
            ...this.orders,
          },
          {
            botname: 'Bot 6',
            statuson: true,
            visible: false,
            port: '5',
            account: '0.5',
            group: '2',
            volume: '4',
            ve: '2',
            countoc: '1',
            pl: '2',
            plclose: '2',
            pltotal: '2',
            activeorders: [],
            closedorders: [],
            ...this.orders,
          },
        ],
        bottype: 'ia',
        grid: {},
        ia: {
          exchange: 'bitfinex',
          group: '6a86df61-c190-4347-9b61-34cbd88d38a4',
          account: '',
          long_term_priority: 0,
          amount: '0.5',
          revenue: '0.7',
        },
        ea: {},
      }
    ];
  }

  saveAsTemplate(model: any) {
    // this.strategy[model.strategy].template[model.template] = {...this.strategy[model.strategy].template[model.template], ...model};
  }

  getOrders(): Observable<any> {
    return of(this.orders);
  }

  update(model: any): Observable<any> { // update method
    return this.http.put(`${ this.url }`, model);
  }

  updateBotSettings(model: any): Observable<any> { // update method
    return this.http.put(`${ this.url }`, model);
  }
}
