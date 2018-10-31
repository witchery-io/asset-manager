import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bot-order',
  templateUrl: './bot-order.component.html',
  styleUrls: ['./bot-order.component.scss'],
})
export class BotOrderComponent implements OnInit {

  @Input() active: any;

  @Input() history: any;

  constructor() { }

  ngOnInit() {
  }
}
