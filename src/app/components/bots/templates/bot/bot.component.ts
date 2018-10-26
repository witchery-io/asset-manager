import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss'],
})
export class BotComponent  {

  @Input() bot: any;
  isCollapsed = true;

  constructor(
  ) { }

  edit() {
    console.log(this);
  }
}
