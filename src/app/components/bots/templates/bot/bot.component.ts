import { Component, Input, OnInit } from '@angular/core';
import { BotService } from '../../../../services/bot.service';
import { MessageService } from '../../../../services/message.service';

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
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    // console.log(this);
  }

  edit() {
    // console.log('bot edit', this.bot);
  }

  stop() {
    this.botService.stop(this.bot.port).subscribe(() => {
      this.messageService.sendMessage({
        type: 'success',
        msg: `Bot on ${ this.bot.port } stopped successfully`,
      });
    });
  }

  botStatus() {
    this.bot.status_on = !this.bot.status_on;
    if (this.bot.status_on) {
      this.botService.restart(this.bot.port).subscribe(() => {
        this.messageService.sendMessage({
          type: 'success',
          msg: `Bot on ${ this.bot.port } restarted successfully`,
        });
      },error1 => {
        this.messageService.sendMessage({
          type: 'danger',
          msg: `Error msg: ${ error1.message }`,
        });
      });
    } else {
      this.botService.pause(this.bot.port).subscribe(() => {
        this.messageService.sendMessage({
          type: 'success',
          msg: `Bot on ${ this.bot.port } paused successfully`,
        });
      },error1 => {
        this.messageService.sendMessage({
          type: 'danger',
          msg: `Error msg: ${ error1.message }`,
        });
      });
    }
  }

  botVisible() {
    this.bot.visible = !this.bot.visible;
    this.botService.visible(this.bot).subscribe(() => {
      this.messageService.sendMessage({
        type: 'success',
        msg: `Bot on ${ this.bot.port } visible successfully`,
      });
    },error1 => {
      this.messageService.sendMessage({
        type: 'danger',
        msg: `Error msg: ${ error1.message }`,
      });
    });
  }
}
