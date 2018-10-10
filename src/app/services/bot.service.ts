import { Injectable } from '@angular/core';
import {Bots} from '../models/bots';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  constructor() { }

  public bots: Bots[] = [
    { id: 'bitfinex', name: 'Btifinex'},
    { id: 'cexio', name: 'CEX.IO'},
  ];

  getData(): Bots[] {
    return this.bots;
  }

  // addData(exchanges_name: string){
  //   this.data.push(new Bots(exchanges_name));
  // }
}
