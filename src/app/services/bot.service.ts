import { Injectable } from '@angular/core';
import {Bots} from '../models/bots';
import {Tamplate} from '../models/tamplate';
import {HttpClient} from '@angular/common/http';
import {Group} from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class BotService {


  public data: any = [];

  constructor(private http: HttpClient) { }

  public bots: any = [
    { id: 'bitfinex', name: 'Btifinex'},
    { id: 'cexio', name: 'CEX.IO'},
  ];

  public tamplate: Tamplate[] = [
    { id: 'tamplate1', name: 'Tamplate-1'},
    { id: 'tamplate2', name: 'Tamplate-2'},
    { id: 'tamplate3', name: 'Tamplate-3'},
  ];

  public getData() {
    return this.bots;
  }

  public createaBot(bot: Bots) {
    this.bots.push(bot);
  }


}
