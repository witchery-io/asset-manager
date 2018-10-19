import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss'],
})
export class BotComponent implements OnInit {

  isCollapsed = true;

  @Input() bot: any;

  constructor(
  ) { }

  ngOnInit(
  ) {
  }

}
