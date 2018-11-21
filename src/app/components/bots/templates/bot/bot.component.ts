import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  BotService,
  NotifierService,
} from '../../../../services';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss'],
})
export class BotComponent implements OnInit {

  @Input() bot: any;
  isCollapsed = true;
  private readonly notifier: NotifierService;

  constructor(
    private botService: BotService,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.isCollapsed = JSON.parse(localStorage.getItem(`template_collapse_order_${ this.bot.port }`));
  }

  edit() {
    // console.log('bot edit', this.bot);
  }

  stop() {
    this.botService.stop(this.bot.port).subscribe(() => {
      this.notifier.notify( 'success', `Bot on ${ this.bot.port } stopped successfully`);
    });
  }

  botStatus() {
    this.bot.status_on = !this.bot.status_on;
    if (this.bot.status_on) {
      this.botService.restart(this.bot.port).subscribe(() => {
        this.notifier.notify( 'success', `Bot on ${ this.bot.port } restarted successfully`);
      },error1 => {
        this.notifier.notify( 'error', `Error msg: ${ error1.message }`);
      });
    } else {
      this.botService.pause(this.bot.port).subscribe(() => {
        this.notifier.notify( 'success', `Bot on ${ this.bot.port } paused successfully`);
      },error1 => {
        this.notifier.notify( 'error', `Error msg: ${ error1.message }`);
      });
    }
  }

  botVisible() {
    this.bot.visible = !this.bot.visible;
    this.botService.visible(this.bot).subscribe(() => {
      this.notifier.notify( 'warning', `Bot on ${ this.bot.port } visible successfully`);
    },error1 => {
      this.notifier.notify( 'error', `Error msg: ${ error1.message }`);
    });
  }

  openOrder(status) {
    this.isCollapsed = status;
    localStorage.setItem(`template_collapse_order_${ this.bot.port }`, status);
  }
}
