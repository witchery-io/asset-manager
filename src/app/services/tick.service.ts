import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TickService {

  ticks = [
    {
      instrument: 'BTCUSD',
      last: 6591.2,
      vol_usd: 13528.8319216,
    },
    {
      instrument: 'LTCUSD',
      last: 57.913,
      vol_usd: 58329.06901092,
    },
    {
      instrument: 'ETHUSD',
      last: 226.26,
      vol_usd: 143927.42055802,
    },
    {
      instrument: 'ETCUSD',
      last: 10.822,
      vol_usd: 116417.07806702,
    },
    {
      instrument: 'ZECUSD',
      last: 124.53,
      vol_usd: 4464.89014906,
    },
    {
      instrument: 'XMRUSD',
      last: 113.53,
      vol_usd: 10600.59931687,
    },
    {
      instrument: 'XRPUSD',
      last: 0.47048,
      vol_usd: 41807452.2847585,
    },
    {
      instrument: 'IOTUSD',
      last: 0.57911,
      vol_usd: 6957989.4637687,
    },
    {
      instrument: 'EOSUSD',
      last: 5.8884,
      vol_usd: 2486971.745911,
    },
  ];

  constructor() {
  }

  getTicks() {
    return this.ticks;
  }

  getTick(id = 0) {
    return this.ticks[id];
  }
}
