import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-bot-order-item',
  templateUrl: './bot-order-item.component.html',
  styleUrls: ['./bot-order-item.component.scss']
})
export class BotOrderItemComponent implements OnInit {
  @Input() data: any;
  orderType = ['buy', 'sell'];

  constructor(
  ) { }

  ngOnInit(
  ) { }
}
