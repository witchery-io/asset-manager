import { Component, OnInit } from '@angular/core';
import { BotService } from 'src/app/manager/shared/services/bot.service';

@Component({
  selector: 'app-main',
  template: `
    <div>
      Bots
    </div>
  `,
  styleUrls: ['./bots.component.scss']
})
export class BotsComponent implements OnInit {

  constructor(
    private botService: BotService,
  ) { }

  ngOnInit() {
    console.log(this.botService);
  }

}
