import { Component, Input, OnInit } from '@angular/core';
import { BotService } from '../../../../services/bot.service';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss'],
})
export class BotComponent implements OnInit {

  @Input() bot: any;
  isCollapsed = true;

  constructor(
    private botService: BotService,
  ) { }

  ngOnInit() {
    // console.log(this);
  }

  edit() {
    // console.log('bot edit', this.bot);
  }

  pause() {
    if (this.bot.status_on) {
      this.botService.restart(this.bot.port).subscribe(() => console.log('Success Restart'));
    } else {
      this.botService.stop(this.bot.port).subscribe(() => console.log('Success Stop'));
    }
  }

  stop() {
    this.botService.kill(this.bot.port).subscribe(() => console.log('Success Kill'));
  }

  botStatus() {
    this.bot.status_on = !this.bot.status_on;
    // console.log('bot status', this.bot);
  }

  botVisible() {
    this.bot.visible = !this.bot.visible;
    this.botService.visible(this.bot.port).subscribe(() => console.log('Success Visible'));
  }
}
