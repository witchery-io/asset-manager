import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  BotService,
  MessageService,
} from '../../../../services';

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
    this.isCollapsed = JSON.parse(localStorage.getItem(`template_collapse_order_${ this.bot.port }`));
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

  openOrder(status) {
    this.isCollapsed = status;
    localStorage.setItem(`template_collapse_order_${ this.bot.port }`, status);
  }
}
