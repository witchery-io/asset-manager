import { Bot } from './bot';

export class Template {
  id: number;
  name: string;
  bot_type: string;
  bots: Bot[];
  grid: {
    exchange: string;
    account: string;
    group: string;
    pair: string;
    initial_volume: number;
    initial_volume_percent: number;
    max_amount: number;
    step_fix: number;
    step_calc: number;
    distribution_from_up: number;
    priority_coefficient: number;
    volume_coefficient_up: number;
    volume_coefficient_down: number;
    close_trigger: number;
    trade_level_up: number;
    trade_level_down: number;
    long_term_priority: number;
  };
  ea: {
    exchange: string;
    group: string;
    account: string;
    long_term_priority: number;
    open_trigger: number;
    open_trigger_volume_step: number;
    close_trigger: number;
    next_trade_timer_min: number;
    initial_trade_volume: number;
    max_trades_cap: number;
    max_exposure: number;
  };
  ia: {
    exchange: string;
    group: string;
    account: string;
    long_term_priority: number;
    amount: number;
    revenue: number;
  };
}
