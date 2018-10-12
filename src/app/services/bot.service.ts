import { Injectable } from '@angular/core';
import {Bots} from '../models/bots';
import {Template} from '../models/template';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BotService {

  constructor(private http: HttpClient) { }

  public bots: any = [
    { id: 'btifinex', name: 'Btifinex'},
    { id: 'cexio', name: 'CEX.IO'},
  ];

  public template: Template[] = [
    { id: 'tamplate1', name: 'Template-1'},
    { id: 'tamplate2', name: 'Template-2'},
    { id: 'tamplate3', name: 'Template-3'},
  ];

  public getData() {
    return this.bots;
  }

  public createaBot(bot: Bots) {
    this.bots.push(bot);
  }


}
